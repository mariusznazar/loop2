/** Bounded, non-executing page construction and authored-style cascade evidence. */
import path from "node:path";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { createHash } from "node:crypto";
import ts from "typescript";
import { parsers as htmlParsers } from "prettier/plugins/html";
import { parsers as cssParsers } from "prettier/plugins/postcss";
import { inspectSources } from "./styleguide_source.mjs";
import { cssName } from "./styleguide_css.mjs";

const unknown = Symbol("unresolved source value");
const located = (source, line, reason) => ({ path: source.path, line, reason });
const inherited =
  /^(?:color|font(?:-.+)?|line-height|visibility|fill|stroke(?:-.+)?|text-align)$/;

function within(root, relative) {
  const absolute = path.resolve(root, relative);
  const local = path.relative(root, absolute);
  if (local.startsWith("..") || path.isAbsolute(local)) return null;
  if (!existsSync(absolute)) return null;
  const actual = path.relative(realpathSync(root), realpathSync(absolute));
  return actual.startsWith("..") || path.isAbsolute(actual) ? null : absolute;
}

function compilerMount(root) {
  const file = within(root, "tsconfig.browser.json");
  if (!file) return null;
  const parsed = ts.parseConfigFileTextToJson(file, readFileSync(file, "utf8"));
  const options = parsed.config?.compilerOptions;
  if (parsed.error || !options?.rootDir || !options?.outDir) return null;
  return { source: options.rootDir, output: options.outDir };
}

/** Every inventoried HTML document gets an independent page; no shared success cache. */
export function analyzePages(facts, { root }) {
  if (facts.schema !== 2)
    throw new Error("Page analysis requires source schema 2");
  const sources = new Map(facts.files.map((file) => [file.path, file]));
  const mount = compilerMount(root);
  const pages = facts.files
    .filter((file) => file.kind === "html" && file.path.endsWith(".html"))
    .map((source) => buildPage(source, sources, root, mount));
  return { schema: 1, inventory: facts.files.map((file) => file.path), pages };
}

function buildPage(source, sources, root, mount) {
  const page = {
    path: source.path,
    loaded: [],
    elements: [],
    declarations: [],
    unresolved: [],
  };
  const issue = (file, line, reason) =>
    page.unresolved.push(located(file, line, reason));
  const element = (tag, file, line, attributes = {}, parent = null) => {
    const node = {
      id: page.elements.length,
      tag,
      attributes,
      parent,
      path: file.path,
      line,
      unknownAttributes: [],
      inline: [],
      attached: parent !== null,
    };
    page.elements.push(node);
    return node;
  };
  const html = element("html", source, 1);
  html.attached = true;
  const head = element("head", source, 1, {}, html.id);
  const body = element("body", source, 1, {}, html.id);
  const inlineOwners = new Map();
  const embeddedDeclarations = new Set();
  const order = (declarations, target = null, condition = "") => {
    for (const declaration of declarations) {
      if (target !== null) {
        if (
          inlineOwners.has(declaration) &&
          inlineOwners.get(declaration) !== target
        )
          issue(
            declaration,
            declaration.line,
            "original line cannot distinguish inline declaration owners",
          );
        inlineOwners.set(declaration, target);
      }
      page.declarations.push({
        ...declaration,
        target,
        order: page.declarations.length,
        condition,
      });
    }
  };
  const loaded = (file, via) => {
    page.loaded.push({ path: file.path, via });
    page.unresolved.push(...file.unresolved);
  };
  function resolve(reference, from, kind, line) {
    if (
      typeof reference !== "string" ||
      /^(?:[a-z][\w+.-]*:|\/\/)|[\\\0]/i.test(reference)
    ) {
      issue(from, line, "unresolved or nonlocal loading reference");
      return null;
    }
    const clean = reference.split(/[?#]/, 1)[0];
    let relative = path.posix.normalize(
      clean.startsWith("/")
        ? path.posix.join(mount?.source ?? "", clean.slice(1))
        : path.posix.join(path.posix.dirname(from.path), clean),
    );
    if (relative.startsWith("../")) {
      issue(from, line, "loading reference escapes the repository");
      return null;
    }
    const candidates = [relative];
    if (kind === "module") candidates.push(relative.replace(/\.js$/, ".ts"));
    for (const candidate of candidates)
      if (sources.has(candidate)) return sources.get(candidate);
    // Generated CSS is read only through an actual reference and an actual output file.
    if (kind === "style" && mount) {
      if (relative.startsWith(mount.source + "/"))
        relative = mount.output + relative.slice(mount.source.length);
      const physical = within(root, relative);
      if (physical) {
        const bytes = readFileSync(physical);
        const extracted = inspectSources({
          files: [
            {
              path: relative,
              kind: "css",
              source: bytes.toString("utf8"),
              digest: createHash("sha256").update(bytes).digest("hex"),
              fragments: [],
            },
          ],
        }).files[0];
        extracted.generated = true;
        return extracted;
      }
    }
    issue(from, line, `missing ${kind} loading target: ${reference}`);
    return null;
  }
  function sheet(file, via, chain = [], condition = "") {
    if (chain.includes(file.path)) {
      issue(file, 1, "cyclic stylesheet import");
      return;
    }
    loaded(file, via);
    if (file.generated)
      issue(
        source,
        via.line,
        `generated stylesheet origin mapping is pending: ${file.path}`,
      );
    let tree;
    try {
      tree = cssParsers.css.parse(file.source);
    } catch {
      issue(file, 1, "stylesheet structure cannot be parsed");
      return;
    }
    checkNesting(tree, file, 1);
    // The extractor owns declarations/priority. This parse reads loading edges only.
    for (const node of tree.nodes) {
      if (node.type !== "css-atrule" || node.name.toLowerCase() !== "import")
        continue;
      const params = node.raws?.params ?? "";
      const match =
        /^\s*(?:["']([^"']+)["']|url\(\s*["']?([^\s"')]+)["']?\s*\))\s*(.*)$/.exec(
          params,
        );
      const line = node.source?.start?.line ?? 1;
      if (!match) {
        issue(file, line, "unresolved stylesheet import");
        continue;
      }
      const imported = resolve(match[1] ?? match[2], file, "style", line);
      if (imported)
        sheet(
          imported,
          located(file, line, "CSS import"),
          [...chain, file.path],
          [condition, match[3] ? `@media ${match[3]}` : ""]
            .filter(Boolean)
            .join(" / "),
        );
    }
    order(file.declarations, null, condition);
  }
  function checkNesting(node, file, line, ruleDepth = 0) {
    if (node.type === "css-rule") {
      if (ruleDepth)
        issue(file, line, "nested CSS selector composition is unresolved");
      ruleDepth++;
    }
    for (const child of node.nodes ?? [])
      checkNesting(child, file, line, ruleDepth);
  }
  function checkEmbedded(text, file, line) {
    try {
      checkNesting(cssParsers.css.parse(text), file, line);
    } catch {
      issue(file, line, "embedded stylesheet structure cannot be parsed");
    }
  }
  function attach(parent, child, file, line) {
    if (!child || typeof child.id !== "number") {
      issue(file, line, "unresolved appended element");
      return;
    }
    child.parent = parent.id;
    child.attached = parent.attached;
    if (["link", "script"].includes(child.tag) && child.attached)
      issue(file, line, "dynamically attached loading element is unresolved");
    if (child.tag === "style" && child.attached) {
      if (!child.styleDeclarations)
        issue(file, line, "unresolved generated style content");
      else order(child.styleDeclarations);
    }
    for (const descendant of page.elements.filter(
      (node) => node.parent === child.id,
    ))
      attach(child, descendant, file, line);
  }
  function declarationsIn(file, first, last, inline) {
    return file.declarations.filter(
      (d) =>
        d.line >= first &&
        d.line <= last &&
        (inline
          ? !d.selector &&
            ["inline", "typescript", "html-attribute"].includes(d.context)
          : !!d.selector || d.context.startsWith("@")),
    );
  }
  const modules = new Map();
  function module(file, via) {
    if (modules.has(file.path)) return modules.get(file.path);
    loaded(file, via);
    const tree = ts.createSourceFile(
      file.path,
      file.source,
      ts.ScriptTarget.Latest,
      true,
    );
    const env = new Map();
    modules.set(file.path, env);
    if (tree.parseDiagnostics.length) {
      issue(file, 1, "module cannot be parsed");
      return env;
    }
    const lineOf = (node) =>
      tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1;
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
    const isNode = (value) =>
      value && typeof value.id === "number" && typeof value.tag === "string";
    const functionValue = (node, scope) => ({ fn: node, scope, call: invoke });
    let depth = 0;
    function invoke(callable, args) {
      if (++depth > 24) {
        depth--;
        issue(
          file,
          lineOf(callable.fn),
          "recursive helper exceeds analysis bound",
        );
        return unknown;
      }
      const local = new Map(callable.scope);
      callable.fn.parameters.forEach((parameter, index) =>
        local.set(parameter.name.getText(tree), args[index] ?? unknown),
      );
      const result = ts.isBlock(callable.fn.body)
        ? statements(callable.fn.body.statements, local)
        : value(callable.fn.body, local);
      depth--;
      return result;
    }
    function value(node, scope) {
      if (!node) return unknown;
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
        return node.text;
      if (ts.isNumericLiteral(node)) return Number(node.text);
      if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
      if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
      if (ts.isIdentifier(node)) return scope.get(node.text) ?? unknown;
      if (
        ts.isAsExpression(node) ||
        ts.isParenthesizedExpression(node) ||
        ts.isNonNullExpression(node)
      )
        return value(node.expression, scope);
      if (ts.isArrowFunction(node) || ts.isFunctionExpression(node))
        return functionValue(node, scope);
      if (ts.isObjectLiteralExpression(node)) {
        const result = {};
        for (const property of node.properties) {
          if (ts.isPropertyAssignment(property))
            result[property.name.getText(tree).replace(/^["']|["']$/g, "")] =
              value(property.initializer, scope);
          else if (ts.isShorthandPropertyAssignment(property))
            result[property.name.text] =
              scope.get(property.name.text) ?? unknown;
          else if (ts.isMethodDeclaration(property))
            result[property.name.getText(tree)] = functionValue(
              property,
              scope,
            );
        }
        return result;
      }
      if (ts.isPropertyAccessExpression(node)) {
        if (node.expression.getText(tree) === "document")
          return (
            { body, head, documentElement: html }[node.name.text] ?? unknown
          );
        const object = value(node.expression, scope);
        if (isNode(object)) {
          if (node.name.text === "style" || node.name.text === "classList")
            return { owner: object, kind: node.name.text };
          return object.attributes[node.name.text] ?? unknown;
        }
        return object?.[node.name.text] ?? unknown;
      }
      if (ts.isBinaryExpression(node)) {
        if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
          const assigned = value(node.right, scope);
          if (ts.isIdentifier(node.left)) scope.set(node.left.text, assigned);
          else
            write(
              value(receiver(node.left), scope),
              member(node.left),
              assigned,
              node.right,
            );
          return assigned;
        }
        if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
          const left = value(node.left, scope),
            right = value(node.right, scope);
          return left === unknown || right === unknown ? unknown : left + right;
        }
      }
      if (ts.isConditionalExpression(node)) {
        const condition = value(node.condition, scope);
        if (typeof condition === "boolean")
          return value(condition ? node.whenTrue : node.whenFalse, scope);
        return unknown;
      }
      if (!ts.isCallExpression(node)) return unknown;
      const name = member(node.expression),
        receiverNode = receiver(node.expression);
      const args = node.arguments.map((argument) => value(argument, scope));
      const line = lineOf(node);
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        issue(file, line, "dynamic module loading is unresolved");
        return unknown;
      }
      if (
        receiverNode?.getText(tree) === "document" &&
        ["createElement", "createElementNS"].includes(name)
      ) {
        const tag = args[name === "createElement" ? 0 : 1];
        if (typeof tag !== "string") {
          issue(file, line, "dynamic element name");
          return unknown;
        }
        return element(tag, file, line);
      }
      const object = receiverNode ? value(receiverNode, scope) : null;
      if (isNode(object)) {
        if (["append", "appendChild", "replaceChildren"].includes(name)) {
          if (name === "replaceChildren")
            for (const child of page.elements.filter(
              (e) => e.parent === object.id,
            ))
              child.attached = false;
          for (const child of args) attach(object, child, file, line);
          return args[0];
        }
        if (name === "setAttribute") {
          write(object, args[0], args[1], node.arguments[1]);
          return unknown;
        }
        if (name === "addEventListener") {
          issue(
            file,
            line,
            "event-driven element mutation needs state analysis",
          );
          return unknown;
        }
      }
      if (object?.kind === "classList") {
        const current = object.owner.attributes.class ?? "";
        if (name === "add" && args.every((arg) => typeof arg === "string"))
          object.owner.attributes.class = [current, ...args].join(" ");
        else object.owner.unknownAttributes.push("class");
        return unknown;
      }
      if (object?.kind === "style" && name === "setProperty") {
        addInline(object.owner, args[0], node);
        return unknown;
      }
      const callable = value(node.expression, scope);
      if (callable?.fn) return callable.call(callable, args);
      issue(
        file,
        line,
        "unresolved helper call may change page construction or styles",
      );
      return unknown;
    }
    function addInline(target, property, node) {
      const first = lineOf(node),
        last = tree.getLineAndCharacterOfPosition(node.end).line + 1;
      const declarations = declarationsIn(file, first, last, true).filter(
        (d) => d.property === cssName(String(property)),
      );
      if (!declarations.length)
        issue(
          file,
          first,
          "style assignment lacks extracted declaration evidence",
        );
      order(declarations, target.id);
    }
    function write(object, name, assigned, node) {
      if (!node) return;
      if (object?.kind === "style") {
        addInline(object.owner, name, node);
        return;
      }
      if (!isNode(object)) {
        issue(file, lineOf(node), "assignment receiver is unresolved");
        return;
      }
      if (name === "textContent" && object.tag === "style") {
        if (object.attached)
          issue(
            file,
            lineOf(node),
            "replacement of an attached stylesheet is unresolved",
          );
        const first = lineOf(node),
          last = tree.getLineAndCharacterOfPosition(node.end).line + 1;
        object.styleDeclarations = declarationsIn(file, first, last, false);
        if (assigned === unknown || !object.styleDeclarations.length)
          issue(file, first, "generated CSS content is unresolved");
        else checkEmbedded(assigned, file, first);
      } else if (
        name === "innerHTML" ||
        name === "outerHTML" ||
        name === "style"
      ) {
        issue(
          file,
          lineOf(node),
          "DOM replacement or whole style assignment needs construction analysis",
        );
      } else if (!["textContent", "innerText"].includes(name)) {
        const attribute = name === "className" ? "class" : name;
        if (typeof attribute !== "string" || assigned === unknown)
          object.unknownAttributes.push(attribute ?? "*");
        else if (
          typeof assigned === "boolean" &&
          [
            "disabled",
            "hidden",
            "checked",
            "selected",
            "multiple",
            "required",
          ].includes(attribute)
        ) {
          if (assigned) object.attributes[attribute] = "";
          else delete object.attributes[attribute];
        } else object.attributes[attribute] = String(assigned);
      }
    }
    function statements(nodes, scope) {
      for (const node of nodes)
        if (ts.isFunctionDeclaration(node) && node.name && node.body)
          scope.set(node.name.text, functionValue(node, scope));
      for (const node of nodes) {
        if (ts.isImportDeclaration(node)) {
          if (node.importClause?.isTypeOnly) continue;
          const specifier = node.moduleSpecifier.text;
          const imported = resolve(specifier, file, "module", lineOf(node));
          if (!imported) continue;
          if (imported.kind === "css") {
            sheet(imported, located(file, lineOf(node), "module style import"));
            continue;
          }
          const exports = module(
            imported,
            located(file, lineOf(node), "module import"),
          );
          const bindings = node.importClause?.namedBindings;
          if (bindings && ts.isNamedImports(bindings))
            for (const binding of bindings.elements)
              if (!binding.isTypeOnly)
                scope.set(
                  binding.name.text,
                  exports.get(
                    binding.propertyName?.text ?? binding.name.text,
                  ) ?? unknown,
                );
        } else if (ts.isVariableStatement(node))
          for (const declaration of node.declarationList.declarations)
            scope.set(
              declaration.name.getText(tree),
              value(declaration.initializer, scope),
            );
        else if (ts.isExpressionStatement(node)) value(node.expression, scope);
        else if (ts.isReturnStatement(node))
          return value(node.expression, scope);
        else if (
          ts.isIfStatement(node) ||
          ts.isForOfStatement(node) ||
          ts.isForStatement(node) ||
          ts.isWhileStatement(node)
        )
          issue(
            file,
            lineOf(node),
            "conditional or repeated construction needs state analysis",
          );
        else if (
          ![
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.InterfaceDeclaration,
            ts.SyntaxKind.TypeAliasDeclaration,
            ts.SyntaxKind.EmptyStatement,
          ].includes(node.kind)
        )
          issue(
            file,
            lineOf(node),
            "unsupported module statement needs construction analysis",
          );
      }
      return unknown;
    }
    statements(tree.statements, env);
    return env;
  }
  loaded(source, { path: source.path, line: 1, reason: "page document" });
  const scripts = [];
  function markup(node, parent) {
    if (node.kind !== "element") {
      for (const child of node.children ?? []) markup(child, parent);
      return;
    }
    const line = (node.sourceSpan?.start?.line ?? 0) + 1;
    const attrs = Object.fromEntries(
      node.attrs.map((attr) => [attr.name.toLowerCase(), attr.value]),
    );
    const target =
      { html, head, body }[node.name] ??
      element(node.name, source, line, attrs, parent.id);
    Object.assign(target.attributes, attrs);
    if (
      ["style", "link"].includes(node.name) &&
      scripts.some((script) => !script.deferred)
    )
      issue(
        source,
        line,
        "classic script execution relative to later styles is unresolved",
      );
    if (node.name === "base")
      issue(source, line, "HTML base URL is unresolved");
    if (attrs.style !== undefined) {
      const attr = node.attrs.find(
        (attribute) => attribute.name.toLowerCase() === "style",
      );
      order(
        declarationsIn(
          source,
          attr.sourceSpan.start.line + 1,
          attr.sourceSpan.end.line + 1,
          true,
        ),
        target.id,
      );
    }
    if (
      node.name === "link" &&
      attrs.rel?.split(/\s+/).includes("stylesheet")
    ) {
      const file = resolve(attrs.href, source, "style", line);
      if (file)
        sheet(
          file,
          located(source, line, "HTML stylesheet link"),
          [],
          attrs.media ? `@media ${attrs.media}` : "",
        );
      if ("disabled" in attrs || attrs.rel.includes("alternate"))
        issue(
          source,
          line,
          "alternate or disabled stylesheet loading is unresolved",
        );
    }
    if (node.name === "style") {
      const declarations = declarationsIn(
        source,
        line,
        node.sourceSpan.end.line + 1,
        false,
      );
      for (const declaration of declarations) {
        if (embeddedDeclarations.has(declaration))
          issue(
            source,
            line,
            "original line cannot distinguish embedded stylesheet owners",
          );
        embeddedDeclarations.add(declaration);
      }
      for (const child of node.children)
        if (child.kind === "text") checkEmbedded(child.value, source, line);
      order(declarations, null, attrs.media ? `@media ${attrs.media}` : "");
      return;
    }
    if (node.name === "script") {
      if ("async" in attrs)
        issue(source, line, "asynchronous script loading order is unresolved");
      if (attrs.src)
        scripts.push({
          reference: attrs.src,
          line,
          deferred: attrs.type === "module" || "defer" in attrs,
        });
      else if (node.children.some((child) => child.value?.trim()))
        issue(
          source,
          line,
          "inline module execution needs construction analysis",
        );
      return;
    }
    for (const child of node.children ?? []) markup(child, target);
  }
  try {
    markup(htmlParsers.html.parse(source.source), body);
  } catch {
    issue(source, 1, "page markup cannot be parsed");
  }
  for (const script of scripts) {
    const file = resolve(script.reference, source, "module", script.line);
    if (file)
      module(file, located(source, script.line, "HTML script reference"));
  }
  return page;
}

function compound(selector, node, states) {
  let remaining = selector,
    score = [0, 0, 0],
    uncertain = false,
    matches = true;
  const tag = /^(\*|[a-zA-Z][\w-]*)/.exec(remaining);
  if (tag) {
    if (tag[1] !== "*") {
      score[2]++;
      matches &&= node.tag.toLowerCase() === tag[1].toLowerCase();
    }
    remaining = remaining.slice(tag[0].length);
  }
  while (remaining) {
    let match = /^([.#])([\w-]+)/.exec(remaining);
    if (match) {
      const attr = match[1] === "." ? "class" : "id";
      score[attr === "id" ? 0 : 1]++;
      if (
        node.unknownAttributes.includes(attr) ||
        node.unknownAttributes.includes("*")
      )
        uncertain = true;
      else
        matches &&=
          attr === "class"
            ? (node.attributes.class ?? "").split(/\s+/).includes(match[2])
            : node.attributes.id === match[2];
    } else if (
      (match = /^\[([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([\w-]+)))?\]/.exec(
        remaining,
      ))
    ) {
      score[1]++;
      if (
        node.unknownAttributes.includes(match[1]) ||
        node.unknownAttributes.includes("*")
      )
        uncertain = true;
      else
        matches &&=
          match[1] in node.attributes &&
          ((match[2] === undefined &&
            match[3] === undefined &&
            match[4] === undefined) ||
            node.attributes[match[1]] === (match[2] ?? match[3] ?? match[4]));
    } else if (
      (match =
        /^:(root|focus-visible|focus|hover|active|disabled|enabled)(?![\w(-])/.exec(
          remaining,
        ))
    ) {
      score[1]++;
      if (match[1] === "root") matches &&= node.tag === "html";
      else if (["disabled", "enabled"].includes(match[1])) {
        if (node.unknownAttributes.includes("disabled")) uncertain = true;
        else
          matches &&=
            match[1] === "disabled"
              ? "disabled" in node.attributes
              : !("disabled" in node.attributes);
      } else matches &&= states.includes(match[1]);
    } else return { matches: null, score };
    remaining = remaining.slice(match[0].length);
  }
  return { matches: matches ? (uncertain ? null : true) : false, score };
}

function selectorMatch(page, selector, node, states) {
  // Splitting only outside attribute strings avoids treating their spaces as combinators.
  const pieces = selector.trim().match(/(?:\[[^\]]*\]|[^\s>+~])+|[>+~]/g) ?? [];
  if (!pieces.length || pieces.includes("+") || pieces.includes("~"))
    return { matches: null, score: [0, 0, 0] };
  let current = node,
    result = compound(pieces.pop(), current, states);
  while (pieces.length && result.matches !== false) {
    const direct = pieces.at(-1) === ">";
    if (direct) pieces.pop();
    const part = pieces.pop();
    if (!part) return { matches: null, score: result.score };
    let found = false,
      uncertain = result.matches === null;
    current = page.elements[current.parent];
    while (current) {
      const tested = compound(part, current, []);
      if (tested.matches !== false) {
        result.score = result.score.map(
          (number, index) => number + tested.score[index],
        );
        uncertain ||= tested.matches === null;
        found = true;
        break;
      }
      if (direct) break;
      current = page.elements[current.parent];
    }
    result.matches = found ? (uncertain ? null : true) : false;
  }
  return result;
}

const shorthands = {
  outline: ["outline-color", "outline-width", "outline-style"],
  border: [
    "border-color",
    "border-width",
    "border-style",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
  ],
  background: ["background-color", "background-image"],
  font: ["font-family", "font-size", "font-weight", "line-height"],
};
const affects = (written, requested) =>
  written === requested ||
  (written === "all" && !requested.startsWith("--")) ||
  shorthands[written]?.includes(requested) ||
  shorthands[requested]?.includes(written);
const compare = (left, right) => {
  for (let i = 0; i < left.length; i++)
    if (left[i] !== right[i]) return left[i] - right[i];
  return 0;
};

/** Query one actual construction, preserving unknown loading/applicability and var origins.
 * states applies to the queried element. conditions maps exact at-rule contexts to booleans.
 * resolved is a bounded authored value, not a browser computed value or an invariant verdict.
 */
export function effectiveStyle(
  page,
  elementId,
  property,
  { states = [], conditions = {} } = {},
) {
  const target = page.elements.find((element) => element.id === elementId);
  if (!target) throw new Error("Query element does not belong to the page");
  const unresolved = (reason, evidence = [], references = []) => ({
    status: "unresolved",
    value: null,
    evidence,
    references,
    unresolved: [{ path: target.path, line: target.line, reason }],
  });
  if (page.unresolved.length)
    return {
      ...unresolved("page loading or construction is unresolved"),
      unresolved: page.unresolved,
    };
  if (!target.attached)
    return unresolved("queried element is not attached to the page");
  function query(node, name, trail = []) {
    const key = `${node.id}:${name}`;
    if (trail.includes(key))
      return unresolved("cyclic custom-property reference");
    const candidates = [];
    for (const declaration of page.declarations) {
      if (!affects(declaration.property, name)) continue;
      let match;
      if (declaration.target !== null)
        match = {
          matches: declaration.target === node.id,
          score: [1, 0, 0, 0],
        };
      else {
        const variants = declaration.selector
          .split(",")
          .map((selector) =>
            selectorMatch(page, selector, node, node === target ? states : []),
          );
        const applicable = variants.filter(
          (variant) => variant.matches !== false,
        );
        if (!applicable.length) continue;
        match = applicable.sort((a, b) => compare(b.score, a.score))[0];
        match = { ...match, score: [0, ...match.score] };
      }
      if (match.matches === false) continue;
      const context = [declaration.condition, declaration.context]
        .filter(
          (entry) =>
            entry &&
            !["inline", "typescript", "html-attribute"].includes(entry),
        )
        .join(" / ");
      if (context && conditions[context] === false) continue;
      const unknownCondition = !!context && conditions[context] !== true;
      const rank = [
        declaration.priority === "important" ? 1 : 0,
        ...match.score,
        declaration.order,
      ];
      candidates.push({
        declaration,
        rank,
        unknownSelector: match.matches === null,
        uncertain:
          match.matches === null ||
          unknownCondition ||
          declaration.priority === null,
      });
    }
    candidates.sort((a, b) => compare(b.rank, a.rank));
    const winner = candidates[0];
    if (!winner) {
      if (
        node.parent !== null &&
        (name.startsWith("--") || inherited.test(name))
      )
        return query(page.elements[node.parent], name, [...trail, key]);
      return {
        status: "missing",
        value: null,
        evidence: [],
        references: [],
        unresolved: [],
      };
    }
    if (
      winner.uncertain ||
      candidates.some(
        (entry) => entry.unknownSelector || entry.declaration.priority === null,
      )
    )
      return unresolved(
        "declaration applicability, condition or priority is unresolved",
        candidates.map((entry) => entry.declaration),
      );
    const declaration = winner.declaration;
    if (declaration.value === null || declaration.property !== name)
      return unresolved("value or shorthand expansion is unresolved", [
        declaration,
      ]);
    if (
      ["revert", "revert-layer", "initial", "unset"].includes(declaration.value)
    )
      return unresolved("CSS-wide reset needs computed-value analysis", [
        declaration,
      ]);
    if (declaration.value === "inherit") {
      if (node.parent === null)
        return unresolved("inherit has no authored parent value", [
          declaration,
        ]);
      const result = query(page.elements[node.parent], name, [...trail, key]);
      return { ...result, evidence: [declaration, ...result.evidence] };
    }
    let text = declaration.value,
      evidence = [declaration],
      references = [];
    const variable = /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g;
    let failed = false;
    text = text.replace(variable, (_expression, reference, fallback) => {
      references.push(reference);
      const result = query(node, reference, [...trail, key]);
      references.push(...result.references);
      evidence.push(...result.evidence);
      if (result.status === "resolved") return result.value;
      if (result.status === "missing" && fallback !== undefined)
        return fallback.trim();
      failed = true;
      return "";
    });
    if (failed || /var\(/.test(text))
      return unresolved(
        "custom-property value cannot be resolved",
        evidence,
        references,
      );
    return {
      status: "resolved",
      value: text,
      evidence,
      references,
      unresolved: [],
    };
  }
  return query(target, property);
}
