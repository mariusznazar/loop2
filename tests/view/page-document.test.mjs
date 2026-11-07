// The harness's own cases (D-264, D-268). Its import stands first, as in every
// test file on jsdom: the limit and the window stand before react-dom loads.
import { assert, inAct, settle, typeInto, withPage } from "./page-document.mjs";
import { spawnSync } from "node:child_process";
import { mock, test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createRoot } from "react-dom/client";

const MIB = 1024 ** 2;
const CHILD_CASE = "PAGE_DOCUMENT_CHILD_CASE";
const FAILING_COMPARISON = "two rendered elements compared and found different";
const GROWING_MEMORY = "memory growing on a stuck main thread";
const OWN_STOP = "the case reached its own stop";
// Above the limit of 2 GiB by what the growth below takes two seconds to reach.
const STOP_BYTES = 4096 * MIB;
// The bound of a short error: what a description and a case's words can take.
const SHORT = 400;

const form = createElement(
  "form",
  { className: "card" },
  createElement("input", { className: "field" }),
  createElement("button", { className: "send" }),
);

/** Draws `element` in a fresh root under the page's body, in act. */
async function drawn(document, element) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  await inAct(() => root.render(element));
  return { container, root };
}

/** What `action` throws. Written without `assert`, the thing these cases check. */
async function failureOf(action) {
  try {
    await action();
  } catch (error) {
    return error;
  }
  throw new Error("the action did not fail");
}

function assertShortAndPlain(error) {
  assert.equal(Object.getPrototypeOf(error), Error.prototype);
  assert.deepEqual(Object.keys(error), []);
  assert.ok(error.message.length < SHORT, `${error.message.length} characters`);
}

// Run by a child of this file alone, each under the limit the harness started,
// because the runner's own report of a failure, or the kill, is what they show.
const childCases = {
  [FAILING_COMPARISON]: () =>
    withPage(async ({ document }) => {
      const { container } = await drawn(document, form);
      assert.equal(
        container.querySelector("input"),
        container.querySelector("button"),
      );
    }),
  [GROWING_MEMORY]: () => {
    // About 1 GiB/s: the thread reads every 100 ms, long before the stop.
    const pause = new Int32Array(new SharedArrayBuffer(4));
    const held = [];
    while (process.memoryUsage.rss() < STOP_BYTES) {
      held.push(Buffer.alloc(64 * MIB, 1));
      Atomics.wait(pause, 0, 0, 50);
    }
    console.log(OWN_STOP);
  },
};

const childCase = process.env[CHILD_CASE];
if (childCase) test(childCase, childCases[childCase]);

function runChildCase(name) {
  const env = { ...process.env, [CHILD_CASE]: name };
  // Inherited, it would make the child report to a runner that is not there.
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(
    process.execPath,
    [`--test-name-pattern=^${name}$`, fileURLToPath(import.meta.url)],
    { encoding: "utf8", env, timeout: 60000, maxBuffer: MIB },
  );
  assert.equal(result.error, undefined, result.error?.message);
  return result;
}

// --- the limit ---------------------------------------------------------------

test("a file that imports the harness is killed above 2 GiB, by the limit the harness started, and says why", () => {
  // invariant: document-test-memory-limit
  const result = runChildCase(GROWING_MEMORY);

  // Windows ends a killed process with 1, Linux reports the signal.
  assert.ok(result.status === 1 || result.signal === "SIGKILL", result.stderr);
  assert.match(result.stderr, /killed .*page-document\.test\.mjs at \d+ MiB/);
  assert.match(result.stderr, /limit of 2048 MiB/);
  assert.doesNotMatch(result.stdout, new RegExp(OWN_STOP));
});

// --- assert ------------------------------------------------------------------

for (const [name, comparison] of [
  ["equal of two numbers", (words) => assert.equal(1, 2, words)],
  ["equal of a number and its text", (words) => assert.equal(1, "1", words)],
  ["equal of 0 and -0", (words) => assert.equal(0, -0, words)],
  ["equal of two like objects", (words) => assert.equal({}, {}, words)],
  ["notEqual of one value", (words) => assert.notEqual(1, 1, words)],
  ["notEqual of NaN and NaN", (words) => assert.notEqual(NaN, NaN, words)],
  ["deepEqual of two arrays", (words) => assert.deepEqual([1], [2], words)],
  [
    "deepEqual of a number and its text in an object",
    (words) => assert.deepEqual({ a: 1 }, { a: "1" }, words),
  ],
  ["ok of 0", (words) => assert.ok(0, words)],
  ["match of another text", (words) => assert.match("ala", /ola/, words)],
  ["match of no text", (words) => assert.match(1, /1/, words)],
  ["doesNotMatch of its text", (words) => assert.doesNotMatch("a", /a/, words)],
  ["doesNotMatch of no text", (words) => assert.doesNotMatch(1, /2/, words)],
  ["fail", (words) => assert.fail(words)],
]) {
  test(`${name} throws a plain short error with the case's words and no value on it`, async () => {
    const error = await failureOf(() => comparison("the case's words"));

    assertShortAndPlain(error);
    assert.match(error.message, /the case's words/);
  });
}

for (const [name, comparison] of [
  ["equal of one object", (one) => assert.equal(one, one)],
  ["equal of NaN and NaN", () => assert.equal(NaN, NaN)],
  ["notEqual of 0 and -0", () => assert.notEqual(0, -0)],
  ["notEqual of two like objects", () => assert.notEqual({}, {})],
  [
    "deepEqual of nested data with its keys in another order",
    () =>
      assert.deepEqual({ a: [1, { b: 2 }], c: 3 }, { c: 3, a: [1, { b: 2 }] }),
  ],
  ["deepEqual of NaN and NaN", () => assert.deepEqual([NaN], [NaN])],
  [
    "deepEqual of data that refers to itself",
    () => {
      const [one, other] = [{}, {}];
      one.self = one;
      other.self = other;
      assert.deepEqual(one, other);
    },
  ],
  ["ok of 1", () => assert.ok(1)],
  ["match of its text", () => assert.match("ala", /l/)],
  ["doesNotMatch of another text", () => assert.doesNotMatch("ala", /o/)],
]) {
  test(`${name} passes`, () => {
    comparison({});
  });
}

test("an Error given as the message is what a failing comparison throws, as Node's does", async () => {
  const given = new RangeError("the case's own error");

  assert.equal(await failureOf(() => assert.equal(1, 2, given)), given);
});

test("a failing equal on two rendered elements ends in a short error that names each by its tag and class", async () => {
  await withPage(async ({ document }) => {
    const { container } = await drawn(document, form);
    const field = container.querySelector("input");
    const button = container.querySelector("button");
    assert.ok(
      Object.keys(field).some((key) => key.startsWith("__reactFiber")),
      "precondition: React has drawn the element",
    );

    const error = await failureOf(() => assert.equal(field, button));

    assertShortAndPlain(error);
    assert.match(error.message, /<input class="field">/);
    assert.match(error.message, /<button class="send">/);
  });
});

test("a failing comparison on rendered elements names its case to the runner, in a short report", () => {
  // invariant: document-test-memory-limit
  const result = runChildCase(FAILING_COMPARISON);
  const output = result.stdout + result.stderr;

  assert.equal(result.status, 1, output);
  assert.match(output, new RegExp(FAILING_COMPARISON));
  assert.match(output, /<input class="field">/);
  assert.doesNotMatch(output, /__reactFiber/);
  assert.ok(output.length < 5000, `${output.length} characters of report`);
});

for (const [name, values] of [
  ["alone", (field) => [field, {}]],
  ["in an array", (field) => [[1, field], []]],
  ["in an object", (field) => [{ a: field }, {}]],
  ["deep in data", (field) => [{ a: [{ b: [field] }] }, {}]],
  ["in the expected value", (field) => [{}, { a: field }]],
  ["on both sides, the same one", (field) => [[field], [field]]],
]) {
  test(`deepEqual refuses a rendered element ${name}`, async () => {
    // invariant: document-test-memory-limit
    await withPage(async ({ document }) => {
      const { container } = await drawn(document, form);
      const [actual, expected] = values(container.querySelector("input"));

      const error = await failureOf(() => assert.deepEqual(actual, expected));

      assertShortAndPlain(error);
      assert.match(error.message, /<input class="field">/);
    });
  });
}

for (const [name, value] of [
  ["a Map", new Map()],
  ["a Set", new Set()],
  ["an object of a class", new (class Fiber {})()],
]) {
  test(`deepEqual refuses ${name}, which its walk does not enter and the comparison behind it would`, async () => {
    const error = await failureOf(() => assert.deepEqual([value], [value]));

    assertShortAndPlain(error);
    assert.match(error.message, /plain data/);
  });
}

// --- the window --------------------------------------------------------------

test("no case's page reaches another's: its listeners, its content and its window stay behind", async () => {
  let heard = 0;
  let earlier;
  await withPage(({ window, document, root }) => {
    earlier = window;
    document.addEventListener("visibilitychange", () => {
      heard += 1;
    });
    root.append(document.createElement("p"));
  });

  await withPage(({ window, document, root }) => {
    document.dispatchEvent(new window.Event("visibilitychange"));

    assert.notEqual(window, earlier);
    assert.equal(heard, 0);
    assert.equal(root.children.length, 0);
  });
});

test("the globals the product reads are the case's page, a shown one, until the case ends", async () => {
  const between = globalThis.document;

  await withPage(({ window, document, root }) => {
    assert.equal(globalThis.window, window);
    assert.equal(globalThis.document, document);
    assert.equal(root, document.body);
    assert.equal(new globalThis.Option("Ala", "a").ownerDocument, document);
    assert.ok(root instanceof globalThis.HTMLElement);
    assert.ok(root instanceof globalThis.Element);
    assert.equal(globalThis.location, window.location);
    assert.equal(globalThis.history, window.history);
    assert.equal(document.visibilityState, "visible");
  });

  assert.equal(globalThis.document, between);
});

test("a case that throws ends in its own error, with the console and the globals back as they were", async () => {
  const thrown = new Error("the case's own");
  const consoleError = console.error;
  const between = globalThis.document;

  const error = await failureOf(() =>
    withPage(() => {
      console.error("a line beside the case's own error");
      throw thrown;
    }),
  );

  assert.equal(error, thrown);
  assert.equal(console.error, consoleError);
  assert.equal(globalThis.document, between);
});

// --- focus -------------------------------------------------------------------

for (const [name, disable] of [
  ["by its property", (control) => (control.disabled = true)],
  ["by its attribute", (control) => control.setAttribute("disabled", "")],
  ["by its fieldset", (control) => (control.parentElement.disabled = true)],
]) {
  test(`a focused control disabled ${name} leaves the focus on the body`, async () => {
    await withPage(async ({ document, root }) => {
      const fieldset = document.createElement("fieldset");
      const control = document.createElement("button");
      fieldset.append(control);
      root.append(fieldset);
      control.focus();
      assert.equal(document.activeElement, control, "precondition");

      disable(control);
      await settle();

      assert.equal(document.activeElement, root);
      assert.equal(document.documentElement.children.length, 2, "head, body");
    });
  });
}

test("a focused field React disables leaves the focus on the body, and takes it back once enabled", async () => {
  await withPage(async ({ document, root }) => {
    const shape = (disabled) => createElement("input", { disabled });
    const { container, root: reactRoot } = await drawn(document, shape(false));
    const field = container.querySelector("input");
    field.focus();

    await inAct(() => reactRoot.render(shape(true)));
    assert.equal(document.activeElement, root);

    await inAct(() => reactRoot.render(shape(false)));
    await inAct(() => field.focus());
    assert.equal(document.activeElement, field);
  });
});

test("focus stays where it is when another control becomes disabled, and when a control is disabled and enabled in one step", async () => {
  await withPage(async ({ document, root }) => {
    const [focused, other] = ["input", "button"].map((tag) =>
      document.createElement(tag),
    );
    root.append(focused, other);
    focused.focus();

    other.disabled = true;
    focused.disabled = true;
    focused.disabled = false;
    await settle();

    assert.equal(document.activeElement, focused);
  });
});

// --- typing ------------------------------------------------------------------

function NameField() {
  const [name, setName] = useState("");
  return createElement(
    "div",
    null,
    createElement("input", {
      value: name,
      onChange: (event) => setName(event.target.value),
    }),
    createElement("p", null, name),
  );
}

test("typing reaches a controlled field's change, so it stands in the field and in what the field drives", async () => {
  await withPage(async ({ document }) => {
    const { container } = await drawn(document, createElement(NameField));
    const field = container.querySelector("input");

    await typeInto(field, "Ala");

    assert.equal(field.value, "Ala");
    assert.equal(container.querySelector("p").textContent, "Ala");
  });
});

test("typing reaches a listener of a field outside React, by a bubbling input event", async () => {
  await withPage(async ({ document, root }) => {
    const field = document.createElement("input");
    root.append(field);
    const heard = [];
    root.addEventListener("input", (event) => heard.push(event.target.value));

    await typeInto(field, "Ala");

    assert.deepEqual(heard, ["Ala"]);
  });
});

// --- React's work ------------------------------------------------------------

function AnsweredLater({ answer }) {
  const [text, setText] = useState("waiting");
  useEffect(() => {
    void answer.then(setText);
  }, [answer]);
  return createElement("p", null, text);
}

test("an answer that comes before settle draws on the page, and React has no update outside act to report", async () => {
  await withPage(async ({ document }) => {
    const { promise, resolve } = Promise.withResolvers();
    const { container } = await drawn(
      document,
      createElement(AnsweredLater, { answer: promise }),
    );
    assert.equal(container.textContent, "waiting", "precondition");

    resolve("answered");
    await settle();

    assert.equal(container.textContent, "answered");
  });
});

test("a mount outside act fails its case in a short error, the one report the trial met", async () => {
  const error = await failureOf(() =>
    withPage(async ({ document, root }) => {
      const container = document.createElement("div");
      root.append(container);
      createRoot(container).render(form);
      await settle();
    }),
  );

  assertShortAndPlain(error);
  assert.match(error.message, /not wrapped in act/);
});

// --- reports through console.error -------------------------------------------

function HooksInOrder({ swapped }) {
  const none = () => {};
  if (swapped) {
    useCallback(none, []);
    useMemo(none, []);
  } else {
    useMemo(none, []);
    useCallback(none, []);
  }
  return null;
}

const held = () => {};

for (const [name, renders, report] of [
  [
    "hooks called in another order",
    [
      createElement(HooksInOrder, { swapped: false }),
      createElement(HooksInOrder, { swapped: true }),
    ],
    /order of Hooks/,
  ],
  [
    "a list without keys",
    [
      createElement(
        "ul",
        null,
        ["a", "b"].map((text) => createElement("li", null, text)),
      ),
    ],
    /unique "key"/,
  ],
  [
    "a field that stops being controlled",
    [
      createElement("input", { value: "a", onChange: held }),
      createElement("input", { value: undefined, onChange: held }),
    ],
    /controlled input to be uncontrolled/,
  ],
]) {
  test(`${name}, reported by React's development build, fails its case in a short error`, async () => {
    const [first, ...later] = renders;

    const error = await failureOf(() =>
      withPage(async ({ document }) => {
        const { root } = await drawn(document, first);
        for (const element of later) await inAct(() => root.render(element));
      }),
    );

    assertShortAndPlain(error);
    assert.match(error.message, report);
  });
}

test("an error thrown in a listener, which jsdom reports through console.error, fails its case", async () => {
  const error = await failureOf(() =>
    withPage(({ document, root }) => {
      const button = document.createElement("button");
      root.append(button);
      button.addEventListener("click", () => {
        throw new Error("the listener's fault");
      });
      button.click();
    }),
  );

  assertShortAndPlain(error);
  assert.match(error.message, /the listener's fault/);
});

test("a report that passes a rendered element fails its case with no word of that element", async () => {
  const error = await failureOf(() =>
    withPage(async ({ document }) => {
      const { container } = await drawn(document, form);
      console.error("a report of %o", container);
    }),
  );

  assertShortAndPlain(error);
  assert.match(error.message, /a report of %o/);
});

test("a line the product writes itself fails no case and still reaches the console", async () => {
  const line =
    "saved-game-load kind=TypeError code=none place=view/app.startFrom accountId=a1";
  const consoleError = mock.method(console, "error", () => {});
  try {
    await withPage(() => console.error(line));

    assert.deepEqual(
      consoleError.mock.calls.map((call) => call.arguments),
      [[line]],
    );
  } finally {
    consoleError.mock.restore();
  }
});

test("the line of the page's last-resort handling fails no case either and still reaches the console", async () => {
  const line =
    "uncaught kind=TypeError code=none place=view/last-resort.installLastResort";
  const consoleError = mock.method(console, "error", () => {});
  try {
    await withPage(() => console.error(line));

    assert.deepEqual(
      consoleError.mock.calls.map((call) => call.arguments),
      [[line]],
    );
  } finally {
    consoleError.mock.restore();
  }
});
