// The header row of a signed-in player with an unconfirmed address (task potwierdzenie-adresu,
// To do 6 and 7; spec section 10; D-39, D-44). These tests run the row's logic on a hand-made
// document model: they prove which elements it builds and what it does with the client's answers,
// never real events, focus or rendering, which the browser check covers (D-88).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createEmailStatus,
  messageSentence,
} from "../../dist/public/view/email-status.js";

// --- a document model with just what the row builds ----------------------------------------

class FakeElement {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.parent = null;
    this.attributes = new Map();
    this.listeners = new Map();
    this.className = "";
    this.hidden = false;
    this.ownText = "";
    this.isDisabled = false;
  }

  get disabled() {
    return this.isDisabled;
  }

  // As in a browser, an element that becomes disabled loses keyboard focus.
  set disabled(value) {
    this.isDisabled = Boolean(value);
    if (this.isDisabled && fakeDocument.activeElement === this)
      fakeDocument.activeElement = null;
  }

  get textContent() {
    return this.ownText;
  }

  set textContent(text) {
    this.ownText = String(text);
  }

  get classList() {
    const element = this;
    const names = () => element.className.split(/\s+/).filter(Boolean);
    return {
      add(...added) {
        element.className = [...new Set([...names(), ...added])].join(" ");
      },
      toggle(name, force) {
        const without = names().filter((each) => each !== name);
        element.className = (force ? [...without, name] : without).join(" ");
        return force;
      },
      contains: (name) => names().includes(name),
    };
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  append(...items) {
    for (const child of items) {
      child.parent = this;
      this.children.push(child);
    }
  }

  remove() {
    if (!this.parent) return;
    this.parent.children = this.parent.children.filter(
      (child) => child !== this,
    );
    this.parent = null;
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  fire(type) {
    for (const listener of this.listeners.get(type) ?? []) listener({ type });
  }

  focus() {
    if (!this.isDisabled) fakeDocument.activeElement = this;
  }
}

const fakeDocument = {
  activeElement: null,
  createElement: (tag) => new FakeElement(tag),
};

async function onPage(body) {
  const saved = globalThis.document;
  globalThis.document = fakeDocument;
  fakeDocument.activeElement = null;
  try {
    await body();
  } finally {
    globalThis.document = saved;
  }
}

async function settle() {
  for (let round = 0; round < 5; round += 1) await Promise.resolve();
}

/** A client whose sends the test answers when it chooses. */
function heldSender() {
  const waiting = [];
  return {
    client: {
      sendConfirmationMessage: () =>
        new Promise((resolve) => waiting.push(resolve)),
    },
    waiting,
    async answer(result) {
      assert.ok(waiting.length > 0, "no send is waiting");
      waiting.shift()(result);
      await settle();
    },
  };
}

const UNCONFIRMED = {
  id: "a1",
  email: "ala@example.com",
  emailConfirmed: false,
};
const sentOk = (message) => ({ ok: true, value: message });
const refusal = (code, message) => ({
  ok: false,
  failure: { kind: "refused", status: 409, code, message },
});

const OUTCOMES = {
  sent: [
    "Wysłaliśmy odnośnik potwierdzający na ala@example.com.",
    "text-secondary",
  ],
  limited: ["Za dużo wiadomości. Spróbuj ponownie za godzinę.", "warning"],
  failed: [
    "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
    "warning",
  ],
};

function parts(status) {
  const [sentence, button] = status.element.children;
  return { sentence, button };
}

// --- the sentences --------------------------------------------------------------------------

test("each outcome of a confirmation message has its sentence and role", () => {
  for (const [message, [text, role]] of Object.entries(OUTCOMES))
    assert.deepEqual(
      messageSentence(message, "ala@example.com"),
      { text, role },
      message,
    );
});

// --- the row --------------------------------------------------------------------------------

test("a sign-in or reload starts the row with the unconfirmed sentence in text-secondary and the button beside it", async () => {
  await onPage(() => {
    const status = createEmailStatus(heldSender().client, UNCONFIRMED, null);
    const { sentence, button } = parts(status);
    assert.equal(status.element.hidden, false);
    assert.equal(sentence.textContent, "Adres e-mail niepotwierdzony.");
    assert.equal(sentence.classList.contains("warning"), false);
    assert.equal(button.textContent, "Wyślij ponownie");
    assert.equal(button.disabled, false);
  });
});

test("right after registration the row starts with the registration outcome sentence", async () => {
  await onPage(() => {
    for (const [message, [text, role]] of Object.entries(OUTCOMES)) {
      const status = createEmailStatus(
        heldSender().client,
        UNCONFIRMED,
        message,
      );
      const { sentence, button } = parts(status);
      assert.equal(sentence.textContent, text, message);
      assert.equal(
        sentence.classList.contains("warning"),
        role === "warning",
        message,
      );
      assert.equal(button.textContent, "Wyślij ponownie", message);
    }
  });
});

test("an address already confirmed shows no row", async () => {
  await onPage(() => {
    const status = createEmailStatus(
      heldSender().client,
      { ...UNCONFIRMED, emailConfirmed: true },
      null,
    );
    assert.equal(status.element.hidden, true);
  });
});

test("a send waits with the button disabled as Wysyłanie…, then shows the outcome, restores the button and focuses it", async () => {
  await onPage(async () => {
    for (const [message, [text, role]] of Object.entries(OUTCOMES)) {
      const held = heldSender();
      const status = createEmailStatus(held.client, UNCONFIRMED, null);
      const { sentence, button } = parts(status);
      button.fire("click");
      await settle();
      assert.equal(button.disabled, true, message);
      assert.equal(button.textContent, "Wysyłanie…", message);
      assert.equal(held.waiting.length, 1, message);
      // A second click while waiting sends nothing.
      button.fire("click");
      await settle();
      assert.equal(held.waiting.length, 1, message);

      await held.answer(sentOk(message));
      assert.equal(sentence.textContent, text, message);
      assert.equal(
        sentence.classList.contains("warning"),
        role === "warning",
        message,
      );
      assert.equal(button.textContent, "Wyślij ponownie", message);
      assert.equal(button.disabled, false, message);
      assert.equal(fakeDocument.activeElement, button, message);
    }
  });
});

test("a failure of the client stands in warning with its own message, and the button stays", async () => {
  await onPage(async () => {
    const held = heldSender();
    const status = createEmailStatus(held.client, UNCONFIRMED, null);
    const { sentence, button } = parts(status);
    button.fire("click");
    await settle();
    await held.answer({
      ok: false,
      failure: {
        kind: "unreachable",
        reason: "network",
        message: "Brak połączenia z serwerem. Spróbuj ponownie.",
      },
    });
    assert.equal(
      sentence.textContent,
      "Brak połączenia z serwerem. Spróbuj ponownie.",
    );
    assert.equal(sentence.classList.contains("warning"), true);
    assert.equal(status.element.hidden, false);
    assert.equal(button.disabled, false);
    assert.equal(fakeDocument.activeElement, button);
  });
});

test("the server answer that the address is already confirmed makes the row disappear", async () => {
  await onPage(async () => {
    const held = heldSender();
    const status = createEmailStatus(held.client, UNCONFIRMED, null);
    parts(status).button.fire("click");
    await settle();
    await held.answer(
      refusal("email-already-confirmed", "Adres jest już potwierdzony."),
    );
    assert.equal(status.element.hidden, true);
  });
});

test("an answer that comes after the row left the page is ignored", async () => {
  await onPage(async () => {
    const held = heldSender();
    const status = createEmailStatus(held.client, UNCONFIRMED, null);
    const { sentence, button } = parts(status);
    const page = fakeDocument.createElement("header");
    page.append(status.element);
    button.fire("click");
    await settle();
    status.dispose();
    assert.equal(status.element.parent, null);
    await held.answer(sentOk("sent"));
    assert.equal(sentence.textContent, "Adres e-mail niepotwierdzony.");
    assert.equal(button.textContent, "Wysyłanie…");
    assert.notEqual(fakeDocument.activeElement, button);
  });
});
