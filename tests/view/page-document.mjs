// The page a test of a screen in React runs on (D-264, D-268): a window of jsdom
// with what jsdom leaves out, and an assert that stays small on a rendered
// element. A test file imports this module first, so that the limit and the
// window stand before react-dom loads.
import { createRequire } from "node:module";
import { isDeepStrictEqual } from "node:util";
import { startMemoryLimit } from "./memory-limit.mjs";

startMemoryLimit();

// Required, not imported: an import would run before the limit starts, and an
// await here would let the test file's next import, react-dom, load meanwhile
// with no window, and then a controlled field's change never fires, silently.
const load = createRequire(import.meta.url);
const { JSDOM } = load("jsdom");
const { act } = load("react");

// With it React reports an update outside act, which fails the case.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// What the product and React read as globals, each from the case's window.
const PAGE_GLOBALS = [
  "window",
  "document",
  "Element",
  "HTMLElement",
  "Option",
  "location",
  "history",
];
// React's reports carry no mark of their own, so lines are told apart by what
// the product writes, and any other line on console.error fails the case.
const PRODUCT_LINE = /^(saved-game-load|uncaught) /;
const REPORT_LIMIT = 300;

/**
 * Leaves the focus on the body, where a browser leaves it. jsdom keeps it on a
 * disabled control, whose blur() does nothing, so it goes to an element outside
 * `body`, which no case walks, and that element's removal hands it to the body.
 */
function moveFocusAway(document) {
  const outside = document.createElement("div");
  outside.tabIndex = -1;
  document.documentElement.append(outside);
  outside.focus();
  outside.remove();
}

function openWindow() {
  // Without pretendToBeVisual document.visibilityState reads "prerender".
  const { window } = new JSDOM("<!doctype html>", {
    url: "https://localhost/",
    pretendToBeVisual: true,
  });
  const { document, MutationObserver } = window;
  new MutationObserver(() => {
    if (document.activeElement.matches(":disabled")) moveFocusAway(document);
  }).observe(document, { attributeFilter: ["disabled"], subtree: true });
  return window;
}

function install(window) {
  for (const name of PAGE_GLOBALS) globalThis[name] = window[name];
}

const betweenCases = openWindow();
install(betweenCases);

/**
 * Keeps each report through console.error, in text alone: a value beside it may
 * be an element, which nothing here may write out. Returns the way to stop.
 */
function watchConsole(reports) {
  const { error } = console;
  console.error = (...values) => {
    if (typeof values[0] === "string" && PRODUCT_LINE.test(values[0])) {
      error(...values);
      return;
    }
    const texts = values.filter((value) => typeof value === "string");
    reports.push(texts.join(" ").slice(0, REPORT_LIMIT));
  };
  return () => {
    console.error = error;
  };
}

/**
 * Runs one case on a window of its own, so that nothing left on a page can
 * answer another case. `body` gets `{ window, document, root }`, `root` being
 * the page's body. Rejects on a report through console.error.
 */
export async function withPage(body) {
  const window = openWindow();
  const reports = [];
  install(window);
  const stopWatching = watchConsole(reports);
  try {
    const { document } = window;
    await body({ window, document, root: document.body });
  } finally {
    stopWatching();
    install(betweenCases);
    window.close();
  }
  if (reports.length > 0) {
    throw new Error(`Reported through console.error: ${reports[0]}`);
  }
}

/** Awaits `action`, a mount or an event among them, inside React's act. */
export async function inAct(action) {
  let result;
  await act(async () => {
    result = await action();
  });
  return result;
}

/** Lets the page act on an answer that has just come. */
export function settle() {
  return inAct(async () => {
    for (let round = 0; round < 5; round += 1) await Promise.resolve();
  });
}

/**
 * Sets a field's value past React's own record of it and fires what a browser
 * fires, because a plain assignment leaves React seeing no change.
 */
export function typeInto(field, text) {
  const { Event } = field.ownerDocument.defaultView;
  const { set } = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(field),
    "value",
  );
  return inAct(() => {
    set.call(field, text);
    field.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

// --- assert ------------------------------------------------------------------

const TEXT_LIMIT = 120;

/** A value in a few words. Enters no object, so a rendered element stays small. */
function described(value) {
  if (typeof value === "string") {
    return JSON.stringify(value.slice(0, TEXT_LIMIT));
  }
  if (typeof value === "function") return `function ${value.name}`;
  if (typeof value !== "object" || value === null) return String(value);
  if (typeof value.nodeType !== "number") {
    return Object.prototype.toString.call(value);
  }
  const className = value.getAttribute?.("class")?.slice(0, TEXT_LIMIT);
  const tag = value.nodeName.toLowerCase();
  return className ? `<${tag} class="${className}">` : `<${tag}>`;
}

/** Plain data in a few words; only a value `notPlain` passed may come here. */
function plainText(value) {
  try {
    return JSON.stringify(value)?.slice(0, TEXT_LIMIT) ?? String(value);
  } catch {
    return described(value);
  }
}

function refuse(message, description) {
  if (message instanceof Error) throw message;
  throw new Error(message ? `${message}: ${description}` : description);
}

/** The first object in `value` other than an array or a plain object. */
function notPlain(value) {
  const seen = new Set();
  const waiting = [value];
  while (waiting.length > 0) {
    const item = waiting.pop();
    if (typeof item !== "object" || item === null || seen.has(item)) continue;
    seen.add(item);
    const prototype = Object.getPrototypeOf(item);
    const plain =
      Array.isArray(item) ||
      prototype === Object.prototype ||
      prototype === null;
    if (!plain) return item;
    waiting.push(...Object.values(item));
  }
  return undefined;
}

// Node's assert writes out both values before it throws, which on a rendered
// element takes the machine's memory (node-assert-failure-inspect). None of
// these does, and none puts a value on its error.
export const assert = {
  equal(actual, expected, message) {
    if (Object.is(actual, expected)) return;
    refuse(
      message,
      `expected ${described(expected)}, got ${described(actual)}`,
    );
  },
  notEqual(actual, expected, message) {
    if (!Object.is(actual, expected)) return;
    refuse(message, `expected anything but ${described(expected)}`);
  },
  // isDeepStrictEqual can walk the same paths as Node's message, so nothing but
  // plain data reaches it (spec decision 10).
  deepEqual(actual, expected, message) {
    for (const value of [actual, expected]) {
      const found = notPlain(value);
      if (found !== undefined) {
        refuse(
          message,
          `deepEqual takes plain data, and met ${described(found)}`,
        );
      }
    }
    if (isDeepStrictEqual(actual, expected)) return;
    refuse(
      message,
      `expected ${plainText(expected)}, got ${plainText(actual)}`,
    );
  },
  ok(value, message) {
    if (value) return;
    refuse(message, `expected a true value, got ${described(value)}`);
  },
  match(text, pattern, message) {
    if (typeof text === "string" && pattern.test(text)) return;
    refuse(message, `expected a match of ${pattern}, got ${described(text)}`);
  },
  doesNotMatch(text, pattern, message) {
    if (typeof text === "string" && !pattern.test(text)) return;
    refuse(message, `expected no match of ${pattern}, got ${described(text)}`);
  },
  fail(message) {
    refuse(message, "the case failed by its own call");
  },
};
