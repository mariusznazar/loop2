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
  for (const node of all) {
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
      } else if (name === "setAttribute" || name === "setAttributeNS") {
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
