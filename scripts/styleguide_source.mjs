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

function extractHtml(tools, facts, text, baseLine = 1) {
  try {
    const tree = tools.html.parse(text);
    function visit(node) {
      const line = baseLine + (node.sourceSpan?.start?.line ?? 0);
      if (node.kind === "element") {
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
          else if (appearanceAttribute.test(name))
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
      } else if (!["root", "text", "comment", "docType"].includes(node.kind)) {
        diagnostic(
          facts,
          "unresolved",
          line,
          `unsupported HTML node: ${node.kind}`,
        );
      }
      for (const child of node.children ?? []) visit(child);
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
    for (let scope = identifier.parent; scope; scope = scope.parent) {
      if (
        !ts.isBlock(scope) &&
        !ts.isSourceFile(scope) &&
        !ts.isFunctionLike(scope)
      )
        continue;
      if (
        ts.isFunctionLike(scope) &&
        scope.parameters.some((p) => p.name.getText(source) === identifier.text)
      )
        return null;
      const declarations = all.filter(
        (node) =>
          ts.isVariableDeclaration(node) &&
          ts.isIdentifier(node.name) &&
          node.name.text === identifier.text &&
          (() => {
            let owner = node.parent;
            while (owner && !ts.isBlock(owner) && !ts.isSourceFile(owner))
              owner = owner.parent;
            return owner === scope;
          })(),
      );
      if (declarations.length)
        return declarations.length === 1 &&
          declarations[0].parent.flags & ts.NodeFlags.Const
          ? declarations[0].initializer
          : null;
    }
    return null;
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
  const styleAliases = new Set(
    all
      .filter(
        (n) =>
          ts.isVariableDeclaration(n) &&
          n.initializer &&
          member(n.initializer) === "style" &&
          ts.isIdentifier(n.name),
      )
      .map((n) => n.name.text),
  );
  const styleObject = (node) =>
    node &&
    (member(node) === "style" ||
      (ts.isIdentifier(node) && styleAliases.has(node.text)));
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
  function styleValue(property, expression, anchor = expression) {
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
      );
    else
      for (const value of variants)
        declaration(
          tools.css,
          facts,
          property,
          value.text,
          value.line,
          "",
          "typescript",
        );
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
  function attribute(name, expression, anchor) {
    if (name === "style") embedded(expression, "style", anchor);
    else if (appearanceAttribute.test(name))
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
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ((!ts.isIdentifier(node.name) && styleObject(node.initializer)) ||
        ["setAttribute", "setAttributeNS", "setProperty"].includes(
          member(node.initializer),
        ))
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
        else
          for (const item of names)
            attribute(item.text, node.arguments[index + 1], node);
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
            styleValue(item.text, node.arguments[1], node);
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
      } else if (styleObject(target) || node.arguments.some(styleObject)) {
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

export function inspectSources(request, tools = loadTools()) {
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
          extractHtml(tools, facts, fragment.text, fragment.line);
        else extractCss(tools.css, facts, fragment.text, fragment.line);
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
  return { schema: 1, files };
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
    request.schema !== 1 ||
    path.resolve(request.root) !== process.cwd() ||
    !["sources", "focus", "adjacency"].includes(request.operation) ||
    !Array.isArray(request.files)
  ) {
    throw new Error("Invalid source inspection request");
  }
  const seen = new Set();
  for (const file of request.files) {
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
