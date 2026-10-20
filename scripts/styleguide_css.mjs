/** Syntax normalization and D-43 value classification, without a page cascade. */
const colors = new Set(
  `aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond
blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue
cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey
darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon
darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet
deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen
fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew
hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon
lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey
lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey
lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine
mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen
mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite
navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen
paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple
rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell
sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan
teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen
accentcolor accentcolortext activetext buttonborder buttonface buttontext canvas
canvastext field fieldtext graytext highlight highlighttext linktext mark marktext
selecteditem selecteditemtext visitedtext activeborder activecaption appworkspace
background buttonhighlight buttonshadow captiontext inactiveborder inactivecaption
inactivecaptiontext infobackground infotext menu menutext scrollbar threedarkshadow
threedface threedhighlight threedlightshadow threedshadow window windowframe windowtext`.split(
    /\s+/,
  ),
);
const colorFunctions =
  /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|device-cmyk)$/;
const knownFunctions =
  /^(?:var|calc|min|max|clamp|round|mod|rem|abs|sign|pow|sqrt|hypot|log|exp|sin|cos|tan|asin|acos|atan|atan2|url|(?:repeating-)?(?:linear|radial|conic)-gradient|color-mix|light-dark|drop-shadow|blur|brightness|contrast|grayscale|hue-rotate|invert|saturate|sepia|opacity|translate[xyz3d]*|scale[xyz3d]*|rotate[xyz3d]*|skew[xy]?|matrix3d?|perspective|repeat|minmax|fit-content|cubic-bezier|steps|local|format|tech|counter|counters|symbols|image-set)$/;
const exemptWords = new Set(["transparent", "currentcolor", "inherit", "none"]);
const dimensionsExempt =
  /^(?:(?:min-|max-)?(?:width|height)|grid-template-columns|grid-auto-columns)$/;
const unitless =
  /^(?:stroke-width|stroke-dasharray|stroke-dashoffset|(?:fill-|stroke-|stop-|flood-)?opacity|font-weight)$/;
export const appearanceAttribute =
  /^(?:style|color|bgcolor|fill|stroke|stroke-width|stroke-dasharray|stroke-dashoffset|fill-opacity|stroke-opacity|opacity|font-family|font-size|font-weight|stop-color|stop-opacity|flood-color|flood-opacity|lighting-color)$/;

export function cssName(name) {
  return name.startsWith("--")
    ? name
    : name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function unescapeCss(text) {
  return text.replace(
    /\\([0-9a-fA-F]{1,6})(?:\r\n|[\t\n\r\f ])?|\\([^\r\n\f])/g,
    (_all, hex, character) =>
      hex
        ? String.fromCodePoint(
            Math.min(Number.parseInt(hex, 16) || 65533, 1114111),
          )
        : character,
  );
}

export function colorLiteral(text) {
  const value = unescapeCss(text).trim().toLowerCase();
  return (
    colors.has(value) ||
    /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(value) ||
    /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|device-cmyk)\(/.test(value)
  );
}

export function diagnostic(facts, collection, line, reason) {
  facts[collection].push({ path: facts.path, line, reason });
}

function valueChildren(node) {
  return [node.group, ...(node.groups ?? [])].filter(Boolean);
}

function assessValue(parser, facts, property, value, line) {
  const normalized = unescapeCss(value);
  const tree = parser.parse(`x{${property}:${normalized}}`);
  if (
    tree.nodes?.length !== 1 ||
    tree.nodes[0].nodes?.length !== 1 ||
    tree.nodes[0].nodes[0].type !== "css-decl"
  ) {
    throw new Error("Value changed the declaration structure");
  }
  const violations = new Set();
  function visit(node, parentFunction = "") {
    if (!node || typeof node.type !== "string")
      throw new Error("Incomplete CSS value AST");
    if (node.unbalanced) throw new Error("Unbalanced CSS value");
    const word = String(node.value ?? "").toLowerCase();
    if (node.type === "value-func") {
      if (word === "url") return;
      if (colorFunctions.test(word)) {
        violations.add("literal color");
        return;
      }
      if (!knownFunctions.test(word)) {
        diagnostic(
          facts,
          "unresolved",
          line,
          `unsupported CSS value function: ${word}`,
        );
      }
      for (const child of valueChildren(node)) visit(child, word);
      return;
    }
    if (node.type === "value-word" && !exemptWords.has(word)) {
      if (colors.has(word) || /^#[\da-f]{3,8}$/i.test(word))
        violations.add("literal color");
      if (
        (property === "font-family" || property === "font") &&
        !word.startsWith("--") &&
        !/^(?:italic|oblique|small-caps|normal|bold|bolder|lighter)$/.test(word)
      ) {
        violations.add("literal font family");
      }
      if (
        /^(?:font-weight|font)$/.test(property) &&
        /^(?:normal|bold|bolder|lighter)$/.test(word)
      ) {
        violations.add("literal font weight");
      }
    }
    if (
      node.type === "value-string" &&
      /^(?:font-family|font)$/.test(property)
    ) {
      violations.add("literal font family");
    }
    if (node.type === "value-number") {
      const number = Number(node.value);
      const unit = (node.unit ?? "").toLowerCase();
      if (!Number.isFinite(number))
        throw new Error("Unsupported CSS numeric value");
      if (
        number !== 0 &&
        /^(?:px|rem|em)$/.test(unit) &&
        !dimensionsExempt.test(property)
      ) {
        violations.add("literal size or spacing");
      }
      if (
        number !== 0 &&
        unit === "" &&
        (unitless.test(property) ||
          property === "font" ||
          parentFunction === "opacity")
      ) {
        violations.add("literal unitless appearance value");
      }
    }
    if (
      !/^(?:value-(?:root|value|comma_group|paren_group|paren|word|string|number|operator|comma|colon|comment))$/.test(
        node.type,
      )
    ) {
      throw new Error(`Unsupported CSS value node: ${node.type}`);
    }
    for (const child of valueChildren(node)) visit(child, parentFunction);
  }
  visit(tree.nodes[0].nodes[0].value);
  for (const reason of violations)
    diagnostic(facts, "violations", line, `${property}: ${reason}: ${value}`);
}

export function declaration(
  parser,
  facts,
  property,
  value,
  line,
  selector = "",
  context = "inline",
) {
  property = cssName(property);
  facts.declarations.push({
    path: facts.path,
    line,
    property,
    value,
    selector,
    context,
  });
  if (value === null) {
    diagnostic(facts, "unresolved", line, `unresolved ${property} value`);
    return;
  }
  if (value.trim() === "") return;
  try {
    assessValue(parser, facts, property, value, line);
  } catch (error) {
    diagnostic(
      facts,
      "unresolved",
      line,
      `CSS value cannot be inspected: ${String(error.message)}`,
    );
  }
}

export function extractCss(parser, facts, text, line = 1, inline = false) {
  const prefix = inline ? "x{" : "";
  try {
    const ast = parser.parse(prefix + text + (inline ? "}" : ""));
    function visit(node, selector = "", context = []) {
      if (!node || typeof node.type !== "string")
        throw new Error("Incomplete CSS AST");
      const originalLine = line + (node.source?.start?.line ?? 1) - 1;
      if (node.type === "css-comment") return;
      if (node.type === "css-decl") {
        declaration(
          parser,
          facts,
          unescapeCss(node.prop),
          node.value?.text ?? node.raws?.value,
          originalLine,
          inline ? "" : selector,
          inline ? "inline" : context.join(" / "),
        );
        return;
      }
      if (node.type === "css-rule") selector = node.raws?.selector ?? "";
      else if (node.type === "css-atrule") {
        const name = unescapeCss(node.name).toLowerCase();
        const parameters =
          node.raws?.params ??
          node.params?.value ??
          (typeof node.params === "string" ? node.params : "");
        context = [...context, `@${name} ${parameters}`];
        if (name === "media") {
          const remainder = unescapeCss(parameters).replace(
            /\(\s*(?:(?:min-|max-)?width\s*:[^)]*|width\s*[<>=][^)]*|[\d.]+(?:px|rem|em)\s*[<>=]+\s*width[^)]*)\)/gi,
            "",
          );
          if (/(?:[1-9]\d*|0*\.\d*[1-9]\d*)(?:px|rem|em)\b/i.test(remainder)) {
            diagnostic(
              facts,
              "violations",
              originalLine,
              "non-width media literal size",
            );
          }
        } else if (name === "supports") {
          for (const match of parameters.matchAll(
            /\(([\w-]+)\s*:\s*([^()]*)\)/g,
          )) {
            declaration(
              parser,
              facts,
              match[1],
              match[2],
              originalLine,
              selector,
              "@supports",
            );
          }
          if (
            parameters.replace(/\(([\w-]+)\s*:\s*([^()]*)\)/g, "").includes(":")
          ) {
            diagnostic(
              facts,
              "unresolved",
              originalLine,
              "unsupported nested @supports value",
            );
          }
        } else if (
          ![
            "font-face",
            "keyframes",
            "-webkit-keyframes",
            "layer",
            "charset",
            "import",
            "namespace",
            "property",
            "starting-style",
          ].includes(name)
        ) {
          diagnostic(
            facts,
            "unresolved",
            originalLine,
            `unsupported CSS at-rule: @${name}`,
          );
        }
      } else if (node.type !== "css-root")
        throw new Error(`Unsupported CSS node: ${node.type}`);
      if (!Array.isArray(node.nodes) && node.type !== "css-atrule")
        throw new Error("Missing CSS child nodes");
      for (const child of node.nodes ?? []) visit(child, selector, context);
    }
    visit(ast);
  } catch (error) {
    diagnostic(
      facts,
      "unresolved",
      line,
      `CSS cannot be parsed: ${String(error.message)}`,
    );
  }
}
