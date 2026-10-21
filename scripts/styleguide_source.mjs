/** Non-executing source extraction; optional page operations consume frozen facts. */
import { readFileSync, realpathSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  appearanceAttribute,
  colorLiteral,
  cssName,
  declaration,
  diagnostic,
  extractCss,
  presentationAttribute,
} from "./styleguide_css.mjs";

const toolRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function loadTools() {
  const require = createRequire(path.join(toolRoot, "package.json"));
  const manifest = JSON.parse(
    readFileSync(path.join(toolRoot, "package.json"), "utf8"),
  );
  const lock = JSON.parse(
    readFileSync(path.join(toolRoot, "package-lock.json"), "utf8"),
  );
  for (const [name, version, declared] of [
    ["prettier", "3.9.10", "3.9.10"],
    ["typescript", "6.0.2", "npm:@typescript/typescript6@6.0.2"],
  ]) {
    const metadataPath = require.resolve(`${name}/package.json`);
    const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
    const local = path
      .relative(
        realpathSync(toolRoot),
        realpathSync(path.dirname(metadataPath)),
      )
      .replaceAll("\\", "/");
    if (
      !local.startsWith("node_modules/") ||
      local.includes("../") ||
      metadata.version !== version ||
      lock.packages?.[local]?.version !== version ||
      manifest.devDependencies?.[name] !== declared ||
      lock.packages?.[""]?.devDependencies?.[name] !== declared
    ) {
      throw new Error(`Missing or unpinned local source parser: ${name}`);
    }
  }
  const ts = require("typescript");
  if (ts.version !== "6.0.2")
    throw new Error("Unexpected TypeScript parser API");
  return {
    ts,
    css: require("prettier/plugins/postcss").parsers.css,
    html: require("prettier/plugins/html").parsers.html,
  };
}

function extractHtml(
  tools,
  facts,
  text,
  baseLine = 1,
  initialNamespace = null,
  finitePython = false,
) {
  try {
    let tree;
    try {
      tree = tools.html.parse(text);
    } catch (error) {
      // One bounded malformed-XML control leaves a child open before the final
      // SVG close. Removing only that parser-rejected final closing token loses
      // no attributes, text, style or script and preserves every namespace.
      // All other grammar uncertainty remains inability.
      const closing = text.lastIndexOf("</svg>");
      if (
        !finitePython ||
        !/^<svg(?:\s|>)/.test(text) ||
        closing < 0 ||
        closing + 6 !== text.length ||
        error.cause?.elementName !== ":svg:svg" ||
        error.cause?.span?.start?.offset !== closing
      )
        throw error;
      tree = tools.html.parse(text.slice(0, closing));
    }
    function visit(node, inheritedNamespace = initialNamespace) {
      const line = baseLine + (node.sourceSpan?.start?.line ?? 0);
      let childNamespace = inheritedNamespace;
      if (node.kind === "element") {
        // The parser inherits SVG through HTML integration points. Track their
        // descendants explicitly; an inner <svg> starts foreign content again.
        const namespace =
          inheritedNamespace === "html" && node.name === "svg"
            ? "svg"
            : (inheritedNamespace ??
              (node.namespace === "svg" ||
              /^(?:path|g|text|circle|rect|line|ellipse|polygon|polyline|use|stop|tspan)$/.test(
                node.name,
              )
                ? "svg"
                : "html"));
        const integrationPoint =
          namespace === "svg" &&
          ["foreignObject", "desc", "title"].includes(node.name);
        childNamespace = integrationPoint
          ? "html"
          : inheritedNamespace === null
            ? null
            : namespace;
        if (inheritedNamespace !== null && node.name === "math") {
          diagnostic(
            facts,
            "unresolved",
            line,
            "MathML within an HTML integration point needs namespace analysis",
          );
        }
        facts.sites.push({
          path: facts.path,
          line,
          kind: "html-element",
          expression: text.slice(
            node.startSourceSpan.start.offset,
            node.startSourceSpan.end.offset,
          ),
        });
        for (const attribute of node.attrs) {
          const name = attribute.name.toLowerCase();
          const attributeLine = baseLine + attribute.sourceSpan.start.line;
          if (name === "style")
            extractCss(tools.css, facts, attribute.value, attributeLine, true);
          else if (presentationAttribute(name, namespace))
            declaration(
              tools.css,
              facts,
              name,
              attribute.value,
              attributeLine,
              node.name,
              "html-attribute",
            );
          else if (name.startsWith("on"))
            extractTypeScript(tools, facts, attribute.value, attributeLine);
        }
        if (node.name === "style" || node.name === "script") {
          for (const child of node.children) {
            if (child.kind !== "text")
              throw new Error("Unsupported embedded source node");
            const childLine = baseLine + child.sourceSpan.start.line;
            if (node.name === "style")
              extractCss(tools.css, facts, child.value, childLine);
            else extractTypeScript(tools, facts, child.value, childLine);
          }
          return;
        }
        if (integrationPoint && node.name === "title") {
          // This parser uses HTML title's raw-text treatment even inside SVG.
          for (const child of node.children) {
            if (child.kind === "text")
              extractHtml(
                tools,
                facts,
                child.value,
                baseLine + child.sourceSpan.start.line,
                "html",
              );
            else visit(child, childNamespace);
          }
          return;
        }
      } else if (!["root", "text", "comment", "docType"].includes(node.kind)) {
        diagnostic(
          facts,
          "unresolved",
          line,
          `unsupported HTML node: ${node.kind}`,
        );
      }
      for (const child of node.children ?? []) visit(child, childNamespace);
    }
    visit(tree);
  } catch (error) {
    diagnostic(
      facts,
      "unresolved",
      baseLine,
      `HTML cannot be parsed: ${String(error.message)}`,
    );
  }
}

/** Prove only the local record transports below, never execute a DOM stand-in. */
function recordDOMProof(ts, source, checker, all, member, receiver) {
  const proven = new Map();
  const children = (node) => {
    const result = [];
    ts.forEachChild(node, (child) => {
      result.push(child);
    });
    return result;
  };
  const inside = (node, owner) =>
    node.pos >= owner.pos && node.end <= owner.end;
  const symbol = (node) =>
    ts.isShorthandPropertyAssignment(node.parent)
      ? checker.getShorthandAssignmentValueSymbol(node.parent)
      : checker.getSymbolAtLocation(node);
  // These are finite AST patterns. $ identifiers capture lexical symbols, so
  // renaming a parameter is allowed but changing its binding is not. Member
  // names, operators, calls, arities and all side effects must match exactly.
  function pattern(node, code, select = (n) => n) {
    const template = select(
      ts.createSourceFile(
        "record-pattern.ts",
        `class Proof { ${code} }`,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
      ).statements[0].members[0],
    );
    const captures = new Map();
    function same(actual, expected) {
      if (actual.kind !== expected.kind) return false;
      if (ts.isIdentifier(expected)) {
        if (expected.text.startsWith("$")) {
          const identity = symbol(actual);
          if (!identity) return false;
          if (captures.has(expected.text))
            return captures.get(expected.text) === identity;
          captures.set(expected.text, identity);
          return true;
        }
        if (actual.text !== expected.text) return false;
        if (
          ["String", "Proxy", "undefined"].includes(expected.text) &&
          symbol(actual)?.declarations?.length
        )
          return false;
      } else if ("text" in expected && actual.text !== expected.text)
        return false;
      if (
        ts.isVariableDeclarationList(expected) &&
        actual.flags !== expected.flags
      )
        return false;
      const a = children(actual),
        b = children(expected);
      return a.length === b.length && a.every((child, i) => same(child, b[i]));
    }
    return same(node, template) ? captures : null;
  }
  const stored = [
    "setAttribute($name, $value) { this.attributes[String($name)] = String($value); }",
    "setAttribute($name, $value) { this.attributes[String($name).toLowerCase()] = String($value); }",
  ];
  const toggles = [
    "toggleAttribute($name, $force) { if ($force === false || ($force === undefined && this.hasAttribute($name))) this.removeAttribute($name); else this.setAttribute($name, ''); }",
    "toggleAttribute($name, $force) { const $on = $force === undefined ? !this.hasAttribute($name) : !!$force; if ($on) this.setAttribute($name, ''); else this.removeAttribute($name); return $on; }",
  ];
  const get = `get($target, $prop) {
    if ($prop in $target || typeof $prop === 'symbol') return $target[$prop];
    const $name = $map[$prop] || String($prop).toLowerCase();
    if ($name in $target.attributes) return $target.attributes[$name];
    return undefined;
  }`;
  const sets = [
    `set($target, $prop, $value) {
      if ($prop in $target || typeof $prop === 'symbol') { $target[$prop] = $value; return true; }
      if (typeof $value === 'string' || typeof $value === 'number' || typeof $value === 'boolean') {
        $target.attributes[$map[$prop] || String($prop).toLowerCase()] = String($value);
        return true;
      }
      $target[$prop] = $value; return true;
    }`,
    `set($target, $prop, $value) {
      if ($prop in $target || typeof $prop === 'symbol') { $target[$prop] = $value; return true; }
      if (typeof $value === 'string' || typeof $value === 'number' || typeof $value === 'boolean') {
        const $name = $map[$prop] || String($prop).toLowerCase();
        if ($value === false) delete $target.attributes[$name]; else $target.attributes[$name] = $value === true ? '' : String($value);
        return true;
      }
      $target[$prop] = $value; return true;
    }`,
  ];
  const write = (node) =>
    node.parent &&
    ts.isBinaryExpression(node.parent) &&
    node.parent.left === node &&
    node.parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
    node.parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
  const direct = (node) =>
    ts.isCallExpression(node.parent) && node.parent.expression === node;
  const emptyObject = (node) =>
    ts.isObjectLiteralExpression(node) && node.properties.length === 0;
  const ownAssignment = (node, name) =>
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    member(node.left) === name &&
    receiver(node.left)?.kind === ts.SyntaxKind.ThisKeyword;
  const sensitive = new Set([
    "setAttribute",
    "setAttributeNS",
    "toggleAttribute",
    "hasAttribute",
    "removeAttribute",
    "setProperty",
    "removeProperty",
  ]);
  const constBinding = (node, initializer) =>
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer === initializer &&
    node.parent.flags & ts.NodeFlags.Const;
  const bindingUses = (declaration, accepts) =>
    all.every(
      (node) =>
        !ts.isIdentifier(node) ||
        symbol(node) !== symbol(declaration.name) ||
        node === declaration.name ||
        accepts(node),
    );
  const transportCall = (node) => {
    const access = node.parent;
    if (receiver(access) !== node) return false;
    if (
      ["setAttribute", "setAttributeNS", "toggleAttribute"].includes(
        member(access),
      )
    )
      return direct(access);
    return (
      member(access) === "style" &&
      receiver(access.parent) === access &&
      ["setProperty", "removeProperty"].includes(member(access.parent)) &&
      direct(access.parent)
    );
  };
  // Match the complete factory body. Its local result uses are checked below,
  // with the same obligation as direct allocations.
  function documentAllocation(node) {
    let property = node.parent;
    while (property && !ts.isPropertyAssignment(property))
      property = property.parent;
    if (!property || !ts.isObjectLiteralExpression(property.parent))
      return false;
    const assignment = property.parent.parent;
    if (
      !ts.isBinaryExpression(assignment) ||
      assignment.operatorToken.kind !== ts.SyntaxKind.EqualsToken ||
      assignment.right !== property.parent ||
      !ts.isExpressionStatement(assignment.parent) ||
      member(assignment.left) !== "document" ||
      receiver(assignment.left)?.getText(source) !== "globalThis" ||
      symbol(receiver(assignment.left))?.declarations?.length
    )
      return false;
    const matched = [
      "createElement: ($tag) => new $Class($tag)",
      "createElementNS: ($ns, $tag) => new $Class($tag)",
      "createElementNS: ($ns, $tag) => new $Class($tag, $ns)",
      "createDocumentFragment: () => new $Class()",
      "createDocumentFragment: () => { const $fragment = new $Class('template'); $fragment.nodeType = 11; return $fragment; }",
    ].some(
      (body) =>
        pattern(
          property,
          `probe() { const document = { ${body} }; }`,
          (n) =>
            n.body.statements[0].declarationList.declarations[0].initializer
              .properties[0],
        )?.get("$Class") === symbol(node.expression),
    );
    return matched ? property : null;
  }
  const resultUses = (node) =>
    constBinding(node.parent, node)
      ? bindingUses(node.parent, transportCall)
      : transportCall(node);
  function passiveDocumentMember(node) {
    if (pattern(node, "addEventListener() {}")) return true;
    const captures = pattern(
      node,
      "probe() { const document = { createTextNode: ($text) => new $Text($text) }; }",
      (n) =>
        n.body.statements[0].declarationList.declarations[0].initializer
          .properties[0],
    );
    const identity = captures?.get("$Text");
    const declarations = identity?.declarations;
    if (declarations?.length !== 1 || !ts.isClassDeclaration(declarations[0]))
      return false;
    const textClass = declarations[0];
    const constructors = textClass.members.filter(ts.isConstructorDeclaration);
    const inertFields = (owner) =>
      !owner.modifiers?.length &&
      owner.members.every(
        (member) =>
          !ts.isPropertyDeclaration(member) &&
          !ts.isClassStaticBlockDeclaration(member) &&
          !(member.name && ts.isComputedPropertyName(member.name)) &&
          !["nodeType", "data", "parentNode"].includes(member.name?.text),
      );
    if (!inertFields(textClass) || constructors.length !== 1) return false;
    const heritage =
      textClass.heritageClauses?.flatMap((clause) => clause.types) ?? [];
    if (heritage.length > 1) return false;
    if (heritage.length) {
      const baseDeclarations = symbol(heritage[0].expression)?.declarations;
      if (
        baseDeclarations?.length !== 1 ||
        !ts.isClassDeclaration(baseDeclarations[0])
      )
        return false;
      const base = baseDeclarations[0];
      if (
        base.heritageClauses?.length ||
        !inertFields(base) ||
        base.members.some(ts.isConstructorDeclaration) ||
        !all.every((use) => {
          if (
            !ts.isIdentifier(use) ||
            symbol(use) !== symbol(base.name) ||
            use === base.name
          )
            return true;
          const parent = use.parent;
          if (
            ts.isExpressionWithTypeArguments(parent) &&
            parent.expression === use
          )
            return true;
          return (
            ts.isBinaryExpression(parent) &&
            parent.right === use &&
            parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
            member(parent.left) === "Node" &&
            receiver(parent.left)?.getText(source) === "globalThis" &&
            !symbol(receiver(parent.left))?.declarations?.length
          );
        })
      )
        return false;
    }
    if (
      !pattern(
        constructors[0],
        `constructor($text) {
      ${heritage.length ? "super();" : ""}
      this.nodeType = 3; this.data = String($text); this.parentNode = null;
    }`,
      )
    )
      return false;
    // Rebinding or passing out the constructor could replace the matched body.
    return all.every(
      (use) =>
        !ts.isIdentifier(use) ||
        symbol(use) !== identity ||
        use === textClass.name ||
        (ts.isNewExpression(use.parent) && use.parent.expression === use),
    );
  }
  function documentUses(factories) {
    const propertyName = (node) => node.name?.text;
    const names = new Set([...factories].map((node) => propertyName(node)));
    const assignments = new Set(
      [...factories].map((node) => node.parent.parent),
    );
    const passive = new Set();
    for (const assignment of assignments) {
      const seen = new Set();
      for (const node of assignment.right.properties) {
        const name = propertyName(node);
        if (
          ts.isSpreadAssignment(node) ||
          ts.isComputedPropertyName(node.name) ||
          seen.has(name)
        )
          return false;
        seen.add(name);
        if (factories.has(node)) continue;
        if (!passiveDocumentMember(node)) return false;
        passive.add(name);
      }
    }
    const global = (node, name) =>
      node &&
      ts.isIdentifier(node) &&
      node.text === name &&
      !symbol(node)?.declarations?.length;
    return all.every((node) => {
      const parent = node.parent;
      // A property name is not a reference to the global object or document.
      if (parent?.name === node && receiver(parent)) return true;
      if (
        global(node, "globalThis") &&
        (receiver(parent) !== node || member(parent) === null)
      )
        return false;
      if (member(node) === "document") {
        if (!global(receiver(node), "globalThis")) return false;
      } else if (!global(node, "document")) return true;
      if (write(node)) return assignments.has(parent) && parent.left === node;
      if (receiver(parent) !== node || member(parent) === null) return false;
      if (!direct(parent)) return false;
      if (names.has(member(parent))) return resultUses(parent.parent);
      return passive.has(member(parent));
    });
  }
  for (const owner of all.filter(ts.isClassDeclaration)) {
    const constructor = owner.members.find(ts.isConstructorDeclaration);
    if (
      !constructor?.body ||
      !owner.name ||
      owner.modifiers?.length ||
      owner.members.some(ts.isClassStaticBlockDeclaration)
    )
      continue;
    const statements = constructor.body.statements;
    const assignments = statements
      .filter(ts.isExpressionStatement)
      .map((n) => n.expression);
    const style = assignments.filter((n) => ownAssignment(n, "style"));
    const attributes = assignments.filter((n) =>
      ownAssignment(n, "attributes"),
    );
    if (
      style.length !== 1 ||
      attributes.length !== 1 ||
      !emptyObject(attributes[0].right)
    )
      continue;
    const object = style[0].right;
    if (
      !ts.isObjectLiteralExpression(object) ||
      object.properties.length !== 2 ||
      !object.properties.every(
        (n) =>
          ts.isMethodDeclaration(n) &&
          ["setProperty", "removeProperty"].includes(n.name.getText(source)) &&
          !n.modifiers?.length &&
          !n.asteriskToken &&
          !n.questionToken &&
          n.parameters.length === 0 &&
          n.body?.statements.length === 0,
      ) ||
      new Set(object.properties.map((n) => n.name.getText(source))).size !== 2
    )
      continue;
    // The optional dataset proxy closes over this record. Its callbacks and
    // key conversion must also be the finite scalar transport, not arbitrary code.
    const datasets = assignments.filter((n) => ownAssignment(n, "dataset"));
    let datasetProxy = null;
    if (datasets.length > 1) continue;
    if (datasets.length === 1 && !emptyObject(datasets[0].right)) {
      const dataset = pattern(
        datasets[0],
        `probe() {
        this.dataset = new Proxy({}, {
          get: ($gt, $gp) => $self.attributes['data-' + $kebab($gp)],
          set: ($st, $sp, $value) => { $self.attributes['data-' + $kebab($sp)] = String($value); return true; },
          has: ($ht, $hp) => ('data-' + $kebab($hp)) in $self.attributes,
        });
      }`,
        (n) => n.body.statements[0].expression,
      );
      if (!dataset) continue;
      const alias = dataset.get("$self")?.declarations;
      const convert = dataset.get("$kebab")?.declarations;
      if (
        alias?.length !== 1 ||
        !ts.isVariableDeclaration(alias[0]) ||
        !(alias[0].parent.flags & ts.NodeFlags.Const) ||
        alias[0].initializer?.kind !== ts.SyntaxKind.ThisKeyword ||
        convert?.length !== 1 ||
        !ts.isVariableDeclaration(convert[0]) ||
        !(convert[0].parent.flags & ts.NodeFlags.Const) ||
        !convert[0].initializer ||
        !pattern(
          convert[0].initializer,
          `probe() { const converter = ($s) => String($s).replace(/[A-Z]/g, ($c) => '-' + $c.toLowerCase()); }`,
          (n) =>
            n.body.statements[0].declarationList.declarations[0].initializer,
        )
      )
        continue;
      if (
        all.some(
          (n) =>
            ts.isIdentifier(n) &&
            symbol(n) === dataset.get("$kebab") &&
            n !== convert[0].name &&
            !direct(n),
        )
      )
        continue;
      datasetProxy = datasets[0].right;
    }
    const method = (name) => {
      const found = owner.members.filter(
        (n) => n.name?.getText(source) === name,
      );
      return found.length === 1 && ts.isMethodDeclaration(found[0])
        ? found[0]
        : null;
    };
    const storage = method("setAttribute");
    if (!storage || !stored.some((code) => pattern(storage, code))) continue;
    const forwards = [];
    let valid = true;
    for (const name of ["setAttributeNS", "toggleAttribute"]) {
      const candidate = method(name);
      if (!candidate) continue;
      const options =
        name === "toggleAttribute"
          ? toggles
          : [
              "setAttributeNS($ns, $name, $value) { this.setAttribute($name, $value); }",
            ];
      if (!options.some((code) => pattern(candidate, code))) {
        valid = false;
        break;
      }
      forwards.push(candidate);
    }
    if (!valid) continue;
    if (method("toggleAttribute")) {
      for (const [name, bodies] of [
        [
          "hasAttribute",
          [
            "return String($name) in this.attributes;",
            "return String($name).toLowerCase() in this.attributes;",
          ],
        ],
        [
          "removeAttribute",
          [
            "delete this.attributes[String($name)];",
            "delete this.attributes[String($name).toLowerCase()];",
          ],
        ],
      ]) {
        const candidate = method(name);
        if (
          !candidate ||
          !bodies.some((body) =>
            pattern(candidate, `${name}($name) { ${body} }`),
          )
        )
          valid = false;
      }
    }
    const returned = statements.at(-1);
    const proxy = ts.isReturnStatement(returned) ? returned.expression : null;
    if (
      !valid ||
      !proxy ||
      !ts.isNewExpression(proxy) ||
      proxy.expression.getText(source) !== "Proxy" ||
      symbol(proxy.expression) ||
      proxy.arguments?.length !== 2 ||
      proxy.arguments[0].kind !== ts.SyntaxKind.ThisKeyword ||
      !ts.isObjectLiteralExpression(proxy.arguments[1])
    )
      continue;
    const handlers = proxy.arguments[1].properties;
    if (handlers.length !== 2 || !handlers.every(ts.isMethodDeclaration))
      continue;
    const getter = handlers.find((n) => n.name.getText(source) === "get");
    const setter = handlers.find((n) => n.name.getText(source) === "set");
    const read = getter && pattern(getter, get);
    const writes =
      setter && sets.map((code) => pattern(setter, code)).find(Boolean);
    if (!read || !writes || read.get("$map") !== writes.get("$map")) continue;
    const mapSymbol = read.get("$map");
    const mapDeclaration =
      mapSymbol.declarations?.length === 1 ? mapSymbol.declarations[0] : null;
    if (
      !mapDeclaration ||
      !ts.isVariableDeclaration(mapDeclaration) ||
      !(mapDeclaration.parent.flags & ts.NodeFlags.Const) ||
      !mapDeclaration.initializer ||
      !ts.isObjectLiteralExpression(mapDeclaration.initializer) ||
      mapDeclaration.initializer.properties.length !== 2 ||
      !mapDeclaration.initializer.properties.every(
        (p) =>
          ts.isPropertyAssignment(p) &&
          ts.isIdentifier(p.name) &&
          ts.isStringLiteral(p.initializer) &&
          { className: "class", htmlFor: "for" }[p.name.text] ===
            p.initializer.text,
      )
    )
      continue;
    // Mutable syntax is accepted only with a complete local use inventory. No
    // method/value escape, replacement, reflective mutation or unknown computed
    // dispatch can preserve this proof. Ordinary direct callers remain inspected.
    for (const node of all) {
      if (
        ts.isIdentifier(node) &&
        symbol(node) === mapSymbol &&
        node !== mapDeclaration.name
      ) {
        if (
          !ts.isElementAccessExpression(node.parent) ||
          node.parent.expression !== node ||
          write(node.parent) ||
          ts.isDeleteExpression(node.parent.parent)
        )
          valid = false;
      }
      if (
        ts.isIdentifier(node) &&
        symbol(node) === symbol(owner.name) &&
        node !== owner.name
      ) {
        const parent = node.parent;
        const construction =
          ts.isNewExpression(parent) && parent.expression === node;
        const heritage =
          ts.isExpressionWithTypeArguments(parent) &&
          parent.expression === node;
        const published =
          ts.isBinaryExpression(parent) &&
          parent.right === node &&
          parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          ["Element", "HTMLElement", "SVGElement"].includes(
            member(parent.left),
          ) &&
          receiver(parent.left)?.getText(source) === "globalThis" &&
          !symbol(receiver(parent.left))?.declarations?.length;
        if (!construction && !heritage && !published) valid = false;
      }
      const name = member(node);
      if (
        write(node) &&
        ["Proxy", "String", "Object", "undefined"].includes(name ?? node.text)
      )
        valid = false;
      if (["prototype", "__proto__"].includes(name)) valid = false;
      if (
        node.kind === ts.SyntaxKind.ThisKeyword &&
        inside(node, constructor)
      ) {
        const parent = node.parent;
        if (constBinding(parent, node)) {
          if (
            !bindingUses(parent, (use) => {
              const access = use.parent;
              if (receiver(access) !== use) return false;
              if (member(access) === "attributes") return true;
              return (
                member(access) === "classList" &&
                receiver(access.parent) === access &&
                ["add", "remove"].includes(member(access.parent)) &&
                direct(access.parent)
              );
            })
          )
            valid = false;
        } else if (
          receiver(parent) !== node &&
          !(parent === proxy && proxy.arguments[0] === node)
        )
          valid = false;
      }
      if (ts.isNewExpression(node) && inside(node, constructor)) {
        let scope = node.parent;
        while (scope && scope !== constructor && !ts.isFunctionLike(scope))
          scope = scope.parent;
        if (scope === constructor && node !== proxy && node !== datasetProxy)
          valid = false;
      }
      if (ts.isCallExpression(node) && inside(node, constructor)) {
        let scope = node.parent;
        while (scope && scope !== constructor && !ts.isFunctionLike(scope))
          scope = scope.parent;
        if (scope === constructor) {
          const callee = node.expression;
          const scalar =
            callee.getText(source) === "String" &&
            !symbol(callee)?.declarations?.length &&
            node.arguments.length === 1;
          const lower =
            member(callee) === "toLowerCase" &&
            node.arguments.length === 0 &&
            ((member(receiver(callee)) === "localName" &&
              receiver(receiver(callee))?.kind === ts.SyntaxKind.ThisKeyword) ||
              (ts.isCallExpression(receiver(callee)) &&
                receiver(callee).expression.getText(source) === "String" &&
                !symbol(receiver(callee).expression)?.declarations?.length &&
                receiver(callee).arguments.length === 1));
          const upper =
            member(callee) === "toUpperCase" &&
            node.arguments.length === 0 &&
            member(receiver(callee)) === "localName" &&
            receiver(receiver(callee))?.kind === ts.SyntaxKind.ThisKeyword;
          if (
            !scalar &&
            !lower &&
            !upper &&
            callee.kind !== ts.SyntaxKind.SuperKeyword
          )
            valid = false;
        }
      }
      if (sensitive.has(name) && !direct(node)) valid = false;
      if (name === "style" && write(node) && node !== style[0].left)
        valid = false;
      if (name === "attributes") {
        if (write(node) && node !== attributes[0].left) valid = false;
        const parent = node.parent;
        const copied =
          ts.isSpreadAssignment(parent) ||
          (ts.isCallExpression(parent) &&
            parent.arguments[0] === node &&
            parent.expression.getText(source) === "Object.entries" &&
            !symbol(parent.expression.expression));
        if (
          !write(node) &&
          receiver(parent) !== node &&
          !copied &&
          !(
            ts.isBinaryExpression(parent) &&
            parent.operatorToken.kind === ts.SyntaxKind.InKeyword &&
            parent.right === node
          )
        )
          valid = false;
      }
      if (name === "style" && !write(node) && receiver(node.parent) !== node)
        valid = false;
      if (
        ts.isElementAccessExpression(node) &&
        member(node) === null &&
        (node.expression.kind === ts.SyntaxKind.ThisKeyword ||
          member(node.expression) === "prototype")
      )
        valid = false;
      if (
        ts.isCallExpression(node) &&
        [
          "defineProperty",
          "defineProperties",
          "setPrototypeOf",
          "assign",
          "__defineGetter__",
          "__defineSetter__",
        ].includes(member(node.expression))
      )
        valid = false;
      if (
        ts.isCallExpression(node) &&
        ["eval", "Function"].includes(node.expression.getText(source))
      )
        valid = false;
      if (
        ts.isReturnStatement(node) &&
        inside(node, constructor) &&
        node !== returned
      ) {
        let scope = node.parent;
        while (scope && scope !== constructor && !ts.isFunctionLike(scope))
          scope = scope.parent;
        if (scope === constructor) valid = false;
      }
      if (
        inside(node, owner) &&
        node !== owner &&
        (ts.isPropertyDeclaration(node) ||
          ts.isGetAccessorDeclaration(node) ||
          ts.isSetAccessorDeclaration(node)) &&
        ["style", "attributes", ...sensitive].includes(
          node.name?.getText(source),
        )
      )
        valid = false;
    }
    // An inherited constructor or overridden transport would change this receiver.
    for (const clause of owner.heritageClauses ?? []) {
      for (const type of clause.types) {
        const base = symbol(type.expression)?.declarations?.[0];
        if (
          !base ||
          !ts.isClassDeclaration(base) ||
          base.heritageClauses?.length ||
          base.members.some(
            (n) =>
              ts.isConstructorDeclaration(n) ||
              ["style", "attributes", ...sensitive].includes(
                n.name?.getText(source),
              ),
          )
        )
          valid = false;
      }
    }
    const descendants = new Set([symbol(owner.name)]);
    for (let changed = true; changed;) {
      changed = false;
      for (const child of all.filter(ts.isClassDeclaration)) {
        if (!child.name || descendants.has(symbol(child.name))) continue;
        if (
          !child.heritageClauses?.some((clause) =>
            clause.types.some((type) =>
              descendants.has(symbol(type.expression)),
            ),
          )
        )
          continue;
        descendants.add(symbol(child.name));
        changed = true;
        if (
          child.members.length !== 1 ||
          !ts.isConstructorDeclaration(child.members[0]) ||
          !pattern(
            child.members[0],
            "constructor() { super('#fragment'); this.nodeType = 11; }",
          )
        )
          valid = false;
      }
    }
    const factories = new Set();
    for (const node of all) {
      if (
        ts.isNewExpression(node) &&
        descendants.has(symbol(node.expression))
      ) {
        const factory = documentAllocation(node);
        if (factory) factories.add(factory);
        else if (!resultUses(node)) valid = false;
      }
      if (
        ts.isIdentifier(node) &&
        descendants.has(symbol(node)) &&
        symbol(node) !== symbol(owner.name) &&
        node !== symbol(node)?.declarations?.[0]?.name
      ) {
        const parent = node.parent;
        if (
          !(ts.isNewExpression(parent) && parent.expression === node) &&
          !(
            ts.isExpressionWithTypeArguments(parent) &&
            parent.expression === node
          )
        )
          valid = false;
      }
    }
    if (!valid || (factories.size && !documentUses(factories))) continue;
    proven.set(style[0], "record-dom-style");
    for (const fn of forwards) {
      for (const node of all) {
        if (
          inside(node, fn) &&
          ts.isCallExpression(node) &&
          member(node.expression) === "setAttribute"
        )
          proven.set(node, "record-dom-forward");
      }
    }
  }
  return proven;
}

function extractTypeScript(tools, facts, text, baseLine = 1) {
  const { ts } = tools;
  const source = ts.createSourceFile(
    facts.path,
    text,
    ts.ScriptTarget.Latest,
    true,
    /\.[jt]sx$/i.test(facts.path) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const lineOf = (node) =>
    baseLine + source.getLineAndCharacterOfPosition(node.getStart(source)).line;
  if (source.parseDiagnostics.length) {
    for (const error of source.parseDiagnostics)
      diagnostic(
        facts,
        "unresolved",
        baseLine + source.getLineAndCharacterOfPosition(error.start ?? 0).line,
        ts.flattenDiagnosticMessageText(error.messageText, " "),
      );
    return;
  }
  const all = [];
  function collect(node) {
    all.push(node);
    ts.forEachChild(node, collect);
  }
  collect(source);
  // Bind local names without loading libraries/imports or executing source.
  const program = ts.createProgram(
    [source.fileName],
    { noLib: true, noResolve: true, allowNonTsExtensions: true },
    {
      getSourceFile: (name) => (name === source.fileName ? source : undefined),
      getDefaultLibFileName: () => "",
      writeFile: () => {},
      getCurrentDirectory: () => "",
      getDirectories: () => [],
      fileExists: (name) => name === source.fileName,
      readFile: (name) => (name === source.fileName ? text : undefined),
      getCanonicalFileName: (name) => name,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
    },
  );
  const checker = program.getTypeChecker();
  const member = (node) =>
    ts.isPropertyAccessExpression(node)
      ? node.name.text
      : ts.isElementAccessExpression(node) &&
          ts.isStringLiteral(node.argumentExpression)
        ? node.argumentExpression.text
        : null;
  const receiver = (node) =>
    ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)
      ? node.expression
      : null;
  function binding(identifier) {
    const parent = identifier.parent;
    // Property names are not lexical references, even when spelled like an alias.
    if (
      (ts.isPropertyAccessExpression(parent) && parent.name === identifier) ||
      ((ts.isPropertyAssignment(parent) || ts.isMethodDeclaration(parent)) &&
        parent.name === identifier)
    )
      return null;
    const symbol = ts.isExportSpecifier(parent)
      ? checker.getExportSpecifierLocalTargetSymbol(parent)
      : ts.isShorthandPropertyAssignment(parent)
        ? checker.getShorthandAssignmentValueSymbol(parent)
        : checker.getSymbolAtLocation(identifier);
    const declarations = symbol?.declarations;
    const candidate = declarations?.length === 1 ? declarations[0] : null;
    return candidate &&
      ts.isVariableDeclaration(candidate) &&
      ts.isIdentifier(candidate.name) &&
      candidate.parent.flags & ts.NodeFlags.Const
      ? candidate.initializer
      : null;
  }
  function values(node, seen = new Set()) {
    if (!node || seen.has(node)) return null;
    seen = new Set([...seen, node]);
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isNumericLiteral(node)
    ) {
      return [{ text: node.text, line: lineOf(node) }];
    }
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isSatisfiesExpression(node)
    )
      return values(node.expression, seen);
    if (ts.isIdentifier(node)) return values(binding(node), seen);
    if (ts.isConditionalExpression(node)) {
      const first = values(node.whenTrue, seen),
        second = values(node.whenFalse, seen);
      return first && second ? [...first, ...second] : null;
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(source) === "String" &&
      node.arguments.length === 1
    ) {
      return values(node.arguments[0], seen);
    }
    if (
      ts.isPrefixUnaryExpression(node) &&
      node.operator === ts.SyntaxKind.MinusToken
    ) {
      return (
        values(node.operand, seen)?.map((value) => ({
          ...value,
          text: `-${value.text}`,
        })) ?? null
      );
    }
    if (ts.isTemplateExpression(node)) {
      let result = [{ text: node.head.text, line: lineOf(node) }];
      for (const span of node.templateSpans) {
        const substitutions = values(span.expression, seen);
        if (!substitutions || result.length * substitutions.length > 32)
          return null;
        result = result.flatMap((left) =>
          substitutions.map((right) => ({
            text: left.text + right.text + span.literal.text,
            line: left.line,
          })),
        );
      }
      return result;
    }
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.PlusToken
    ) {
      const left = values(node.left, seen),
        right = values(node.right, seen);
      if (!left || !right || left.length * right.length > 32) return null;
      return left.flatMap((a) =>
        right.map((b) => ({ text: a.text + b.text, line: a.line })),
      );
    }
    return null;
  }
  function styleObject(node, seen = new Set()) {
    if (!node || seen.has(node)) return false;
    seen = new Set([...seen, node]);
    if (member(node) === "style") return true;
    if (ts.isIdentifier(node)) return styleObject(binding(node), seen);
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isSatisfiesExpression(node)
    )
      return styleObject(node.expression, seen);
    return false;
  }
  function namespace(node, seen = new Set()) {
    if (!node || seen.has(node)) return "unknown";
    seen = new Set([...seen, node]);
    if (ts.isIdentifier(node)) return namespace(binding(node), seen);
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node)
    )
      return namespace(node.expression, seen);
    if (
      !ts.isCallExpression(node) ||
      receiver(node.expression)?.getText(source) !== "document" ||
      checker.getSymbolAtLocation(receiver(node.expression))?.declarations
        ?.length
    )
      return "unknown";
    if (member(node.expression) === "createElement") return "html";
    if (member(node.expression) === "createElementNS") {
      const uris = values(node.arguments[0]);
      if (uris?.every((value) => value.text === "http://www.w3.org/2000/svg"))
        return "svg";
      if (uris?.every((value) => value.text === "http://www.w3.org/1999/xhtml"))
        return "html";
    }
    return "unknown";
  }
  const styleElements = new Set(
    all
      .filter(
        (n) =>
          ts.isVariableDeclaration(n) &&
          n.initializer &&
          ts.isCallExpression(n.initializer) &&
          member(n.initializer.expression) === "createElement" &&
          values(n.initializer.arguments[0])?.some(
            (value) => value.text === "style",
          ),
      )
      .map((n) => n.name.getText(source)),
  );
  const handled = new Set();
  function mark(node) {
    if (node) {
      handled.add(node);
      ts.forEachChild(node, mark);
    }
  }
  function styleValue(
    property,
    expression,
    anchor = expression,
    priority = "normal",
  ) {
    mark(expression);
    const variants = values(expression);
    if (variants === null)
      declaration(
        tools.css,
        facts,
        property,
        null,
        lineOf(anchor),
        "",
        "typescript",
        priority,
      );
    else
      for (const value of variants)
        declaration(
          tools.css,
          facts,
          property,
          value.text,
          priority === null ? lineOf(anchor) : value.line,
          "",
          "typescript",
          priority,
        );
  }
  function stylePriority(expression) {
    if (!expression) return "normal";
    mark(expression);
    const variants = values(expression);
    if (!variants) return null;
    const priorities = new Set(
      variants.map((value) =>
        value.text === ""
          ? "normal"
          : value.text.toLowerCase() === "important"
            ? "important"
            : null,
      ),
    );
    return priorities.size === 1 ? [...priorities][0] : null;
  }
  function embedded(expression, kind, anchor = expression) {
    mark(expression);
    const variants = values(expression);
    if (!variants)
      diagnostic(
        facts,
        "unresolved",
        lineOf(anchor),
        `unresolved ${kind} construction`,
      );
    else
      for (const value of variants) {
        // Decoded escape newlines must not manufacture original source lines.
        const rawLines = expression.getText(source).split("\n").length;
        const content =
          rawLines === 1 ? value.text.replaceAll("\n", " ") : value.text;
        if (kind === "html") extractHtml(tools, facts, content, value.line);
        else
          extractCss(tools.css, facts, content, value.line, kind === "style");
      }
  }
  function attribute(
    name,
    expression,
    anchor,
    space = "unknown",
    caseSensitive = false,
  ) {
    const lower = name.toLowerCase();
    if (!caseSensitive && space === "html") name = lower;
    else if (
      !caseSensitive &&
      space === "unknown" &&
      name !== lower &&
      appearanceAttribute.test(lower)
    ) {
      mark(expression);
      diagnostic(
        facts,
        "unresolved",
        lineOf(anchor),
        "attribute casing needs a known receiver namespace",
      );
      return;
    }
    if (name === "style") embedded(expression, "style", anchor);
    else if (presentationAttribute(name, space))
      styleValue(name, expression, anchor);
  }
  function objectProperties(object, style, anchor) {
    if (object && ts.isIdentifier(object)) object = binding(object);
    if (!object || !ts.isObjectLiteralExpression(object)) {
      diagnostic(
        facts,
        "unresolved",
        lineOf(anchor),
        "unresolved appearance-bearing attribute/style object",
      );
      return;
    }
    for (const property of object.properties) {
      if (
        !ts.isPropertyAssignment(property) ||
        ts.isComputedPropertyName(property.name)
      ) {
        diagnostic(
          facts,
          "unresolved",
          lineOf(property),
          "unsupported attribute/style object member",
        );
        continue;
      }
      const name = property.name.text;
      if (style) styleValue(cssName(name), property.initializer);
      else attribute(name, property.initializer, property);
    }
  }
  // Recognize the actual generic SVG helper by its AST operations, not its name.
  const helpers = new Map(),
    genericWrites = new Set();
  for (const fn of all.filter(
    (n) => ts.isFunctionDeclaration(n) && n.name && n.body,
  )) {
    const loops = all.filter(
      (n) =>
        ts.isForOfStatement(n) &&
        n.getStart() > fn.body.getStart() &&
        n.end < fn.end,
    );
    for (const loop of loops) {
      const entries = loop.expression;
      if (
        !ts.isCallExpression(entries) ||
        entries.expression.getText(source) !== "Object.entries" ||
        entries.arguments.length !== 1 ||
        !ts.isVariableDeclarationList(loop.initializer)
      )
        continue;
      const names = loop.initializer.declarations[0]?.name;
      if (
        !names ||
        !ts.isArrayBindingPattern(names) ||
        names.elements.length !== 2
      )
        continue;
      const statement =
        ts.isBlock(loop.statement) && loop.statement.statements.length === 1
          ? loop.statement.statements[0]
          : loop.statement;
      const call = ts.isExpressionStatement(statement)
        ? statement.expression
        : null;
      if (
        !call ||
        !ts.isCallExpression(call) ||
        member(call.expression) !== "setAttribute" ||
        call.arguments.length !== 2 ||
        call.arguments[0].getText(source) !==
          names.elements[0].name?.getText(source) ||
        !ts.isCallExpression(call.arguments[1]) ||
        call.arguments[1].expression.getText(source) !== "String" ||
        call.arguments[1].arguments.length !== 1 ||
        call.arguments[1].arguments[0].getText(source) !==
          names.elements[1].name?.getText(source)
      )
        continue;
      const index = fn.parameters.findIndex(
        (p) => p.name.getText(source) === entries.arguments[0].getText(source),
      );
      if (index >= 0) {
        helpers.set(fn.name.text, index);
        genericWrites.add(call);
        if (
          fn.modifiers?.some(
            (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
          )
        ) {
          diagnostic(
            facts,
            "unresolved",
            lineOf(fn),
            "exported generic attribute helper needs cross-file call resolution",
          );
        }
      }
    }
  }
  const recordDOM = recordDOMProof(ts, source, checker, all, member, receiver);
  for (const node of all) {
    if (recordDOM.has(node)) {
      for (const kind of [
        ts.isCallExpression(node) ? "call" : "assignment",
        recordDOM.get(node),
      ]) {
        facts.sites.push({
          path: facts.path,
          line: lineOf(node),
          kind,
          expression: node.getText(source),
        });
      }
      continue;
    }
    const parent = node.parent ?? source;
    const mutator =
      ["setAttribute", "setAttributeNS"].includes(member(node)) ||
      (["setProperty", "removeProperty"].includes(member(node)) &&
        styleObject(receiver(node)));
    const style = styleObject(node);
    const directCall =
      ts.isCallExpression(parent) && parent.expression === node;
    const propertyUse = receiver(parent) === node;
    const styleAssignment =
      member(node) === "style" &&
      ts.isBinaryExpression(parent) &&
      parent.left === node &&
      parent.operatorToken.kind === ts.SyntaxKind.EqualsToken;
    const alias =
      ts.isVariableDeclaration(parent) &&
      parent.initializer === node &&
      ts.isIdentifier(parent.name) &&
      parent.parent.flags & ts.NodeFlags.Const &&
      !parent.parent.parent.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      );
    const wrapper =
      (ts.isParenthesizedExpression(parent) ||
        ts.isAsExpression(parent) ||
        ts.isNonNullExpression(parent) ||
        ts.isSatisfiesExpression(parent)) &&
      parent.expression === node;
    const declarationName =
      ts.isVariableDeclaration(parent) && parent.name === node;
    const assignTarget =
      ts.isCallExpression(parent) &&
      parent.expression.getText(source) === "Object.assign" &&
      parent.arguments[0] === node;
    if (
      (mutator && !directCall) ||
      (style &&
        !propertyUse &&
        !styleAssignment &&
        !alias &&
        !wrapper &&
        !declarationName &&
        !assignTarget)
    ) {
      diagnostic(
        facts,
        "unresolved",
        lineOf(node),
        "appearance mutator escapes supported direct calls",
      );
    }
    if (ts.isCallExpression(node)) {
      facts.sites.push({
        path: facts.path,
        line: lineOf(node),
        kind: "call",
        expression: node.getText(source),
      });
      const name = member(node.expression),
        target = receiver(node.expression);
      if (genericWrites.has(node)) continue;
      if (helpers.has(node.expression.getText(source))) {
        objectProperties(
          node.arguments[helpers.get(node.expression.getText(source))],
          false,
          node,
        );
      } else if (
        ["setAttribute", "setAttributeNS", "toggleAttribute"].includes(name)
      ) {
        const index = name === "setAttributeNS" ? 1 : 0;
        const names = values(node.arguments[index]);
        if (!names)
          diagnostic(
            facts,
            "unresolved",
            lineOf(node),
            "unresolved attribute name",
          );
        else {
          if (name === "setAttributeNS") {
            const argument = node.arguments[0];
            const uris =
              argument?.kind === ts.SyntaxKind.NullKeyword
                ? [{ text: "" }]
                : values(argument);
            if (!uris) {
              diagnostic(
                facts,
                "unresolved",
                lineOf(node),
                "unresolved attribute namespace",
              );
              continue;
            }
            // Only attributes without a namespace participate in presentation.
            if (uris.every((uri) => uri.text !== "")) {
              mark(node.arguments[index + 1]);
              continue;
            }
          }
          for (const item of names)
            if (name !== "toggleAttribute")
              attribute(
                item.text,
                node.arguments[index + 1],
                node,
                namespace(target),
                name === "setAttributeNS",
              );
        }
      } else if (name === "setProperty" && styleObject(target)) {
        const names = values(node.arguments[0]);
        if (!names)
          diagnostic(
            facts,
            "unresolved",
            lineOf(node),
            "unresolved style property name",
          );
        else
          for (const item of names)
            styleValue(
              item.text,
              node.arguments[1],
              node,
              stylePriority(node.arguments[2]),
            );
      } else if (
        node.expression.getText(source) === "Object.assign" &&
        styleObject(node.arguments[0])
      ) {
        for (const object of node.arguments.slice(1))
          objectProperties(object, true, node);
      } else if (
        ["insertRule", "replaceSync"].includes(name) ||
        (name === "replace" &&
          target &&
          /(?:sheet|stylesheet)/i.test(target.getText(source)))
      )
        embedded(node.arguments[0], "css", node);
      else if (name === "insertAdjacentHTML")
        embedded(node.arguments[1], "html", node);
      else if (name === "write" && target?.getText(source) === "document") {
        for (const argument of node.arguments) embedded(argument, "html", node);
      } else if (
        styleObject(target) ||
        node.arguments.some((argument) => styleObject(argument))
      ) {
        diagnostic(
          facts,
          "unresolved",
          lineOf(node),
          "unsupported style-object operation",
        );
      }
    } else if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
      node.operatorToken.kind <= ts.SyntaxKind.LastAssignment
    ) {
      facts.sites.push({
        path: facts.path,
        line: lineOf(node),
        kind: "assignment",
        expression: node.getText(source),
      });
      const name = member(node.left),
        target = receiver(node.left);
      if (name === "innerHTML" || name === "outerHTML")
        embedded(node.right, "html");
      else if (
        name === "textContent" &&
        target &&
        styleElements.has(target.getText(source))
      )
        embedded(node.right, "css");
      else if (name === "cssText" || name === "style")
        embedded(node.right, "style");
      else if (styleObject(target)) {
        if (name === null)
          diagnostic(
            facts,
            "unresolved",
            lineOf(node),
            "unresolved computed style property",
          );
        else styleValue(cssName(name), node.right);
      } else if (name && appearanceAttribute.test(cssName(name)))
        styleValue(cssName(name), node.right);
    } else if (ts.isPropertyAssignment(node) && !handled.has(node)) {
      const name = node.name.text;
      if (name && appearanceAttribute.test(cssName(name)))
        styleValue(cssName(name), node.initializer);
    } else if (ts.isTaggedTemplateExpression(node)) {
      const kind = /html/i.test(node.tag.getText(source)) ? "html" : "css";
      embedded(node.template, kind);
    } else if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      diagnostic(
        facts,
        "unresolved",
        lineOf(node),
        "JSX appearance construction is not resolved",
      );
    }
  }
  for (const node of all) {
    if (
      !handled.has(node) &&
      ts.isTemplateExpression(node) &&
      /<[a-zA-Z][^>]*>|[.#\w\]]\s*\{\s*[\w-]+\s*:/.test(node.head.text)
    ) {
      embedded(node, /^\s*</.test(node.head.text) ? "html" : "css");
    }
    if (
      ts.isIdentifier(node) &&
      helpers.has(node.text) &&
      !(ts.isFunctionDeclaration(node.parent) && node.parent.name === node) &&
      !(ts.isCallExpression(node.parent) && node.parent.expression === node)
    ) {
      diagnostic(
        facts,
        "unresolved",
        lineOf(node),
        "generic attribute helper escapes direct local calls",
      );
    }
    if (
      handled.has(node) ||
      (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node))
    )
      continue;
    const parent = node.parent;
    const textual =
      ts.isBinaryExpression(parent) &&
      ["textContent", "innerText", "href", "src", "className"].includes(
        member(parent.left),
      );
    const metadata =
      (ts.isPropertyAssignment(parent) &&
        /^(?:label|text|title|description|name|path|href|src|source|changes)$/.test(
          parent.name.text ?? "",
        )) ||
      (ts.isVariableDeclaration(parent) &&
        /(?:label|text|title|description|path|message|prose)/i.test(
          parent.name.getText(source),
        ));
    const colorContext =
      ts.isVariableDeclaration(parent) &&
      /(?:color|fill|stroke|tint|background)/i.test(
        parent.name.getText(source),
      );
    const embeddedCss = /[.#\w\]]\s*\{\s*[\w-]+\s*:/.test(node.text);
    if (
      textual ||
      (metadata && !colorContext && !embeddedCss) ||
      ts.isImportDeclaration(parent) ||
      ts.isExportDeclaration(parent)
    )
      continue;
    if (colorLiteral(node.text) && (colorContext || /^#|\(/.test(node.text))) {
      diagnostic(
        facts,
        "violations",
        lineOf(node),
        `TypeScript literal color: ${node.text}`,
      );
    } else if (/^\s*</.test(node.text) && /<[a-zA-Z][^>]*>/.test(node.text)) {
      extractHtml(tools, facts, node.text, lineOf(node));
    } else if (/[.#\w\]]\s*\{\s*[\w-]+\s*:/.test(node.text)) {
      extractCss(tools.css, facts, node.text, lineOf(node));
    }
  }
}

/** Independently parse original relationship sites, without consuming extracted edges. */
export function inspectImportCoverage(request, tools = loadTools()) {
  const { ts } = tools;
  return {
    schema: 1,
    files: request.files.map((input) => {
      const source = ts.createSourceFile(
        input.path,
        input.source,
        ts.ScriptTarget.Latest,
        true,
        /\.[jt]sx$/i.test(input.path) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );
      const sites = [];
      function visit(node) {
        let site = null;
        if (
          ts.isImportDeclaration(node) ||
          (ts.isExportDeclaration(node) && node.moduleSpecifier) ||
          ts.isImportEqualsDeclaration(node) ||
          ts.isImportTypeNode(node)
        )
          site = node;
        else if (ts.isCallExpression(node)) {
          const expression = node.expression;
          if (
            expression.kind === ts.SyntaxKind.ImportKeyword ||
            (ts.isPropertyAccessExpression(expression) &&
              expression.name.text === "require") ||
            (ts.isElementAccessExpression(expression) &&
              ts.isStringLiteral(expression.argumentExpression) &&
              expression.argumentExpression.text === "require")
          )
            site = node;
        } else if (
          ts.isIdentifier(node) &&
          node.text === "require" &&
          !(
            ts.isPropertyAccessExpression(node.parent) &&
            node.parent.name === node
          )
        ) {
          site =
            ts.isCallExpression(node.parent) && node.parent.expression === node
              ? node.parent
              : node;
        }
        if (site) sites.push({ start: site.getStart(source), end: site.end });
        ts.forEachChild(node, visit);
      }
      visit(source);
      sites.sort((a, b) => a.start - b.start || a.end - b.end);
      return { path: input.path, digest: input.digest, sites };
    }),
  };
}

/** Parse module relationships only; never resolve, load or execute imported code. */
export function inspectImports(request, tools = loadTools()) {
  const { ts } = tools;
  return {
    schema: 1,
    files: request.files.map((input) => {
      const imports = [];
      const unresolved = [];
      if (input.kind !== "typescript")
        return { path: input.path, digest: input.digest, imports, unresolved };
      const source = ts.createSourceFile(
        input.path,
        input.source,
        ts.ScriptTarget.Latest,
        true,
        /\.[jt]sx$/i.test(input.path) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );
      const lineOf = (position) =>
        source.getLineAndCharacterOfPosition(position).line + 1;
      for (const error of source.parseDiagnostics)
        unresolved.push({
          path: input.path,
          line: lineOf(error.start ?? 0),
          reason: `Import grammar: ${ts.flattenDiagnosticMessageText(error.messageText, " ")}`,
        });
      const nodes = [];
      function collect(node) {
        nodes.push(node);
        ts.forEachChild(node, collect);
      }
      collect(source);
      const program = ts.createProgram(
        [source.fileName],
        {
          noLib: true,
          noResolve: true,
          allowJs: true,
          allowNonTsExtensions: true,
        },
        {
          getSourceFile: (name) =>
            name === source.fileName ? source : undefined,
          getDefaultLibFileName: () => "",
          writeFile: () => {},
          getCurrentDirectory: () => "",
          getDirectories: () => [],
          fileExists: (name) => name === source.fileName,
          readFile: (name) =>
            name === source.fileName ? input.source : undefined,
          getCanonicalFileName: (name) => name,
          useCaseSensitiveFileNames: () => true,
          getNewLine: () => "\n",
        },
      );
      const checker = program.getTypeChecker();
      function constURL(argument) {
        if (!argument || !ts.isIdentifier(argument)) return null;
        const symbol = checker.getSymbolAtLocation(argument);
        const binding =
          symbol?.declarations?.length === 1 ? symbol.declarations[0] : null;
        const value = binding?.initializer;
        if (
          !binding ||
          !ts.isVariableDeclaration(binding) ||
          !ts.isIdentifier(binding.name) ||
          !(binding.parent.flags & ts.NodeFlags.Const) ||
          binding.parent.parent.parent !== source ||
          binding.parent.parent.modifiers?.some(
            (m) => m.kind === ts.SyntaxKind.ExportKeyword,
          ) ||
          !value ||
          !ts.isNewExpression(value) ||
          !ts.isIdentifier(value.expression) ||
          value.expression.text !== "URL" ||
          checker.getSymbolAtLocation(value.expression)?.declarations?.length ||
          value.arguments?.length !== 2 ||
          !ts.isStringLiteral(value.arguments[0]) ||
          value.arguments[1].getText(source) !== "import.meta.url"
        )
          return null;
        for (const node of nodes) {
          const reference = ts.isIdentifier(node)
            ? ts.isShorthandPropertyAssignment(node.parent)
              ? checker.getShorthandAssignmentValueSymbol(node.parent)
              : checker.getSymbolAtLocation(node)
            : null;
          if (ts.isIdentifier(node) && reference === symbol) {
            if (node === binding.name) continue;
            const call = node.parent;
            if (
              !ts.isCallExpression(call) ||
              call.expression.kind !== ts.SyntaxKind.ImportKeyword ||
              call.arguments.length !== 1 ||
              call.arguments[0] !== node
            )
              return null;
          }
          if (
            ts.isIdentifier(node) &&
            node.text === "URL" &&
            node !== value.expression &&
            !(
              ts.isPropertyAccessExpression(node.parent) &&
              node.parent.name === node
            )
          ) {
            if (
              !ts.isNewExpression(node.parent) ||
              node.parent.expression !== node ||
              checker.getSymbolAtLocation(node)?.declarations?.length
            )
              return null;
          }
          if (
            ts.isIdentifier(node) &&
            [
              "globalThis",
              "window",
              "self",
              "global",
              "eval",
              "Function",
            ].includes(node.text)
          )
            return null;
          if (ts.isMetaProperty(node)) {
            const property = node.parent;
            const constructor = property.parent;
            if (
              !ts.isPropertyAccessExpression(property) ||
              property.name.text !== "url" ||
              !ts.isNewExpression(constructor) ||
              !ts.isIdentifier(constructor.expression) ||
              constructor.expression.text !== "URL" ||
              constructor.arguments?.[1] !== property
            )
              return null;
          }
        }
        return { literal: value.arguments[0], via: value };
      }
      function edge(node, specifier, kind, via = null) {
        const literal =
          specifier && ts.isStringLiteral(specifier) ? specifier : null;
        imports.push({
          path: input.path,
          line: lineOf(node.getStart(source)),
          start: node.getStart(source),
          end: node.end,
          expression: node.getText(source),
          specifier: literal?.text ?? null,
          specifierStart: literal?.getStart(source) ?? null,
          specifierEnd: literal?.end ?? null,
          kind,
          via: via
            ? {
                start: via.getStart(source),
                end: via.end,
                expression: via.getText(source),
              }
            : null,
        });
      }
      function relation(clause, elements) {
        if (clause?.isTypeOnly) return "type";
        const flags = elements?.map((item) => item.isTypeOnly) ?? [];
        if (flags.length && flags.every(Boolean) && !clause?.name)
          return "type";
        return flags.some(Boolean) ? "mixed" : "runtime";
      }
      function visit(node) {
        if (ts.isImportDeclaration(node)) {
          const bindings = node.importClause?.namedBindings;
          edge(
            node,
            node.moduleSpecifier,
            `import-${relation(
              node.importClause,
              bindings && ts.isNamedImports(bindings)
                ? bindings.elements
                : null,
            )}`,
          );
        } else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
          edge(
            node,
            node.moduleSpecifier,
            `export-${relation(
              node,
              node.exportClause && ts.isNamedExports(node.exportClause)
                ? node.exportClause.elements
                : null,
            )}`,
          );
        } else if (ts.isImportEqualsDeclaration(node)) {
          edge(
            node,
            ts.isExternalModuleReference(node.moduleReference)
              ? node.moduleReference.expression
              : null,
            "unsupported",
          );
        } else if (ts.isImportTypeNode(node)) {
          edge(
            node,
            ts.isLiteralTypeNode(node.argument) ? node.argument.literal : null,
            "import-type",
          );
        } else if (
          ts.isCallExpression(node) &&
          node.expression.kind === ts.SyntaxKind.ImportKeyword
        ) {
          const argument =
            node.arguments.length === 1 ? node.arguments[0] : null;
          const url = constURL(argument);
          edge(
            node,
            url?.literal ?? argument,
            url ? "dynamic-url" : "dynamic-runtime",
            url?.via,
          );
        } else if (
          ts.isCallExpression(node) &&
          ((ts.isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === "require") ||
            (ts.isElementAccessExpression(node.expression) &&
              ts.isStringLiteral(node.expression.argumentExpression) &&
              node.expression.argumentExpression.text === "require"))
        ) {
          edge(
            node,
            node.arguments.length === 1 ? node.arguments[0] : null,
            "unsupported",
          );
        } else if (
          ts.isIdentifier(node) &&
          node.text === "require" &&
          !(
            ts.isPropertyAccessExpression(node.parent) &&
            node.parent.name === node
          )
        ) {
          // CommonJS calls and shadowed/escaping require bindings are not ESM evidence.
          const call =
            ts.isCallExpression(node.parent) && node.parent.expression === node
              ? node.parent
              : node;
          edge(
            call,
            call.arguments?.length === 1 ? call.arguments[0] : null,
            "unsupported",
          );
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
      imports.sort((a, b) => a.start - b.start || a.end - b.end);
      return { path: input.path, digest: input.digest, imports, unresolved };
    }),
  };
}

function validatePythonFragment(input, fragment) {
  const exact = (object, keys) =>
    object &&
    typeof object === "object" &&
    Object.keys(object).sort().join() === [...keys].sort().join();
  const fields = ["text", "line", "dynamic", "kind"];
  if (Object.hasOwn(fragment, "origin")) fields.push("origin");
  if (
    !exact(fragment, fields) ||
    typeof fragment.text !== "string" ||
    typeof fragment.dynamic !== "boolean" ||
    !Number.isInteger(fragment.line) ||
    fragment.line < 1 ||
    fragment.line > input.source.split("\n").length ||
    !["html", "typescript", "css"].includes(fragment.kind)
  )
    throw new Error("Invalid Python fragment");
  if (!Object.hasOwn(fragment, "origin")) return;
  const origin = fragment.origin;
  if (
    !exact(origin, ["template", "call", "inputs"]) ||
    !Array.isArray(origin.inputs) ||
    !origin.inputs.length ||
    fragment.dynamic ||
    fragment.kind !== "html"
  )
    throw new Error("Invalid Python expansion provenance");
  const characters = Array.from(input.source);
  for (const witness of [origin.template, origin.call, ...origin.inputs]) {
    if (
      !exact(witness, ["start", "end", "line", "expression"]) ||
      !Number.isInteger(witness.start) ||
      !Number.isInteger(witness.end) ||
      !Number.isInteger(witness.line) ||
      witness.start < 0 ||
      witness.end <= witness.start ||
      witness.end > characters.length ||
      witness.expression !==
        characters.slice(witness.start, witness.end).join("") ||
      witness.line !==
        characters.slice(0, witness.start).join("").split("\n").length
    )
      throw new Error(
        "Python expansion witness does not match original source",
      );
  }
  if (fragment.line !== origin.call.line)
    throw new Error(
      "Python expansion location must identify its original call",
    );
}

export function inspectSources(request, tools = loadTools()) {
  if (
    request.schema !== 2 ||
    !Array.isArray(request.files) ||
    !Array.isArray(request.dependencies) ||
    !Array.isArray(request.configurations) ||
    !Array.isArray(request.imports) ||
    !Array.isArray(request.unresolved)
  )
    throw new Error("Unsupported source request protocol or missing evidence");
  const files = request.files.map((input) => {
    const facts = {
      path: input.path,
      kind: input.kind,
      source: input.source,
      digest: input.digest,
      declarations: [],
      sites: [],
      unresolved: [],
      violations: [],
    };
    if (input.kind === "css") extractCss(tools.css, facts, input.source);
    else if (input.kind === "html") extractHtml(tools, facts, input.source);
    else if (input.kind === "typescript")
      extractTypeScript(tools, facts, input.source);
    else if (input.kind === "python") {
      for (const fragment of input.fragments) {
        validatePythonFragment(input, fragment);
        const offsets = Object.fromEntries(
          ["declarations", "sites", "unresolved", "violations"].map((key) => [
            key,
            facts[key].length,
          ]),
        );
        if (fragment.dynamic)
          diagnostic(
            facts,
            "unresolved",
            fragment.line,
            "unresolved Python appearance template",
          );
        if (fragment.kind === "typescript")
          extractTypeScript(tools, facts, fragment.text, fragment.line);
        else if (fragment.kind === "html")
          extractHtml(
            tools,
            facts,
            fragment.text,
            fragment.line,
            null,
            Boolean(fragment.origin),
          );
        else extractCss(tools.css, facts, fragment.text, fragment.line);
        // Expanded lines are generated, not locations in the original Python.
        // Attribute all expansion findings to the original call; retain the full
        // template/input witness in the request instead of inventing source lines.
        if (fragment.origin) {
          for (const [key, start] of Object.entries(offsets)) {
            for (const record of facts[key].slice(start))
              record.line = fragment.line;
          }
        }
      }
    } else if (
      !["documentation", "font", "icon-exception", "token-values"].includes(
        input.kind,
      )
    ) {
      diagnostic(facts, "unresolved", 1, "unknown source grammar");
    }
    return facts;
  });
  return {
    schema: 3,
    files,
    dependencies: request.dependencies,
    imports: request.imports,
    configurations: request.configurations,
    unresolved: request.unresolved,
  };
}

function freeze(value) {
  if (value && typeof value === "object") {
    Object.freeze(value);
    for (const child of Object.values(value)) freeze(child);
  }
  return value;
}

async function main() {
  const request = JSON.parse(readFileSync(0, "utf8"));
  if (
    request.schema !== 2 ||
    path.resolve(request.root) !== process.cwd() ||
    !["imports", "coverage", "sources", "focus", "adjacency"].includes(
      request.operation,
    ) ||
    !Array.isArray(request.files) ||
    !Array.isArray(request.dependencies) ||
    !Array.isArray(request.configurations) ||
    !Array.isArray(request.imports) ||
    !Array.isArray(request.unresolved)
  ) {
    throw new Error("Invalid source inspection request");
  }
  const seen = new Set();
  for (const file of [
    ...request.files,
    ...request.dependencies,
    ...request.configurations,
  ]) {
    if (
      typeof file.path !== "string" ||
      !file.path ||
      /[\\:]/.test(file.path) ||
      path.isAbsolute(file.path) ||
      file.path.split("/").includes("..") ||
      seen.has(file.path) ||
      !(file.source === null || typeof file.source === "string") ||
      !Array.isArray(file.fragments)
    ) {
      throw new Error("Unsafe or incomplete source input");
    }
    seen.add(file.path);
  }
  if (request.operation === "imports") {
    process.stdout.write(JSON.stringify(inspectImports(request)) + "\n");
    return;
  }
  if (request.operation === "coverage") {
    process.stdout.write(JSON.stringify(inspectImportCoverage(request)) + "\n");
    return;
  }
  const facts = freeze(inspectSources(request));
  let result = facts;
  if (request.operation !== "sources") {
    const modulePath = path.join(
      toolRoot,
      "scripts",
      `styleguide_${request.operation}.mjs`,
    );
    if (!existsSync(modulePath))
      throw new Error(`Pending source operation: ${request.operation}`);
    const operation = await import(pathToFileURL(modulePath).href);
    if (typeof operation.inspect !== "function")
      throw new Error("Missing operation inspect(facts, context) export");
    result = await operation.inspect(
      facts,
      Object.freeze({ root: request.root }),
    );
  }
  process.stdout.write(JSON.stringify(result) + "\n");
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    process.stderr.write(String(error.stack ?? error) + "\n");
    process.exitCode = 2;
  });
}
