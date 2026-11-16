// The menu bar (D-97, D-157, D-277, D-280, D-285) on jsdom through tests/view/page-document.mjs (D-264): which elements the bar
// builds, what it does with the events a case fires and with the client's answers, never real
// keyboard handling, focus order or rendering, which the browser check covers (D-88). Enter and
// Space on „Konto” are the browser's own click of a native button; here a click stands for them.
import { assert, inAct, press, settle, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { ABOUT } from "../../dist/browser/sim/data/about.js";
import { createMenuBar } from "../../dist/browser/view/menu-bar.js";

// --- the page ------------------------------------------------------------------------------

const SIGNED_IN = { id: "a1", email: "ala@example.com", emailConfirmed: true };
const UNCONFIRMED = { ...SIGNED_IN, emailConfirmed: false };
const HEADQUARTERS = { kind: "headquarters" };
const NO_LOGOUT = { waiting: false, sentence: null, unavailable: false };
const RETURN_ENTRY = {
  text: "Wróć do przejścia · Las · minuta 212",
  address: "#/postac/3/przejscie",
};

function propsOf(overrides = {}) {
  return {
    account: SIGNED_IN,
    screen: HEADQUARTERS,
    returnEntry: null,
    registrationMessage: null,
    logout: NO_LOGOUT,
    ...overrides,
  };
}

/** A client whose sends the case answers when it chooses. */
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

const sentOk = (message) => ({ ok: true, value: message });
const refusal = (code, message) => ({
  ok: false,
  failure: { kind: "refused", status: 409, code, message },
});

/** Builds the bar in the page's body; `logouts` counts what the bar handed the page. */
async function openBar(
  { root, document },
  { props = propsOf(), held = heldSender() } = {},
) {
  const logouts = [];
  let bar = null;
  const outside = document.createElement("button");
  outside.textContent = "poza paskiem";
  const field = document.createElement("input");
  root.append(outside, field);
  await inAct(() => {
    bar = createMenuBar({
      client: held.client,
      onLogout: () => {
        logouts.push(true);
      },
      props,
    });
    root.prepend(bar.element);
  });
  return { bar, held, logouts, outside, field };
}

function pressKey(target, key) {
  assert.ok(target, "what the case presses a key on stands");
  const { KeyboardEvent } = globalThis.window;
  return inAct(() => {
    target.dispatchEvent(
      new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
    );
  });
}

const all = (root, selector) => [...root.querySelectorAll(selector)];
const buttonNamed = (root, text) =>
  all(root, "button").find((button) => button.textContent === text);
const active = () => globalThis.document.activeElement;
const isOpen = (root) =>
  buttonNamed(root, "Konto").getAttribute("aria-expanded") === "true";
const blockOf = (root) => root.querySelector(".account-menu-block");
const sentenceOf = (root) => root.querySelector(".account-menu-sentence");

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

const isWarning = (sentence) => sentence.classList.contains("warning");

// --- the bar --------------------------------------------------------------------------------

test("a waiting screen's bar holds the game's name alone, with no item and no „Konto”", async () => {
  // decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy, Programy and Wiedza, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: null, screen: null }) });
    const bar = page.root.querySelector(".menu-bar");
    assert.equal(bar.textContent, ABOUT.name);
    assert.equal(all(page.root, "a").length, 0);
    assert.equal(buttonNamed(page.root, "Konto"), undefined);
  });
});

test("over the game the bar holds the name, „Siedziba” to #/, „Mapy” to #/mapy, „Programy” to #/programy, „Wiedza” to #/wiedza and „Konto”, in that order and without icons", async () => {
  // decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy, Programy and Wiedza, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
  await withPage(async (page) => {
    await openBar(page);
    const bar = page.root.querySelector(".menu-bar");
    assert.equal(
      bar.querySelector(".menu-bar-name").textContent,
      ABOUT.name,
      "the name",
    );
    const links = all(bar, "a");
    assert.deepEqual(
      links.map((link) => [link.textContent, link.getAttribute("href")]),
      [
        ["Siedziba", "#/"],
        ["Mapy", "#/mapy"],
        ["Programy", "#/programy"],
        ["Wiedza", "#/wiedza"],
      ],
    );
    assert.equal(all(bar, "img, svg").length, 0, "no icon");
    // The bar's children in order: name, items, menu „Konto” at the end.
    const order = [...bar.children].map((child) => child.className);
    assert.deepEqual(order, [
      "menu-bar-name",
      "menu-bar-items",
      "account-menu",
    ]);
  });
});

test("the item of the place the page gives is marked with aria-current, and none on a map run's screen", async () => {
  // decision: D-277 "The menu bar marks the place the player is at"
  // decision: D-280 "The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item"
  // D-277, D-280: Siedziba on Siedziba and on Postać, Mapy on Mapy and on a map, Programy on Programy
  // and on a program, Wiedza on Wiedza, none on the screen of a map run; the page gives the screen, the bar reads the
  // item from it.
  const cases = [
    [{ kind: "headquarters" }, "Siedziba"],
    [{ kind: "character", characterId: 2 }, "Siedziba"],
    [{ kind: "maps" }, "Mapy"],
    [{ kind: "map", mapId: "forest" }, "Mapy"],
    [{ kind: "programs" }, "Programy"],
    [{ kind: "program", programId: 5 }, "Programy"],
    [{ kind: "knowledge" }, "Wiedza"],
    [{ kind: "run", characterId: 2 }, null],
    [null, null],
  ];
  for (const [screen, marked] of cases) {
    await withPage(async (page) => {
      await openBar(page, {
        props: propsOf({ screen, returnEntry: RETURN_ENTRY }),
      });
      const current = all(page.root, "[aria-current]");
      assert.deepEqual(
        current.map((link) => [
          link.textContent,
          link.getAttribute("aria-current"),
        ]),
        marked === null ? [] : [[marked, "page"]],
        JSON.stringify(screen),
      );
    });
  }
});

test("the bar follows the page's update: the marked item moves, and the open menu stays open", async () => {
  // decision: D-277 "The menu bar marks the place the player is at"
  // decision: D-280 "The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item"
  await withPage(async (page) => {
    const { bar } = await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    await inAct(() => {
      bar.update(propsOf({ screen: { kind: "programs" } }));
    });
    const current = all(page.root, "[aria-current]");
    assert.deepEqual(
      current.map((link) => link.textContent),
      ["Programy"],
    );
    assert.equal(isOpen(page.root), true);
    await inAct(() => {
      bar.update(propsOf({ screen: { kind: "map", mapId: "forest" } }));
    });
    assert.deepEqual(
      all(page.root, "[aria-current]").map((link) => link.textContent),
      ["Mapy"],
    );
  });
});

test("„Wróć do przejścia” stands as a link to the map run's address when the page gives it, after „Wiedza”, and not otherwise", async () => {
  // decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy, Programy and Wiedza, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
  await withPage(async (page) => {
    const { bar } = await openBar(page, {
      props: propsOf({ returnEntry: RETURN_ENTRY }),
    });
    const links = all(page.root, ".menu-bar a");
    assert.deepEqual(
      links.map((link) => [link.textContent, link.getAttribute("href")]),
      [
        ["Siedziba", "#/"],
        ["Mapy", "#/mapy"],
        ["Programy", "#/programy"],
        ["Wiedza", "#/wiedza"],
        ["Wróć do przejścia · Las · minuta 212", "#/postac/3/przejscie"],
      ],
    );
    await inAct(() => {
      bar.update(propsOf({ returnEntry: null }));
    });
    assert.deepEqual(
      all(page.root, ".menu-bar a").map((link) => link.textContent),
      ["Siedziba", "Mapy", "Programy", "Wiedza"],
    );
  });
});

// --- the menu „Konto”: opening and closing (D-285) -------------------------------------------

test("„Konto” is a native button that says whether the menu stands open, and the menu starts closed", async () => {
  // decision: D-285 "The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”"
  await withPage(async (page) => {
    await openBar(page);
    const konto = buttonNamed(page.root, "Konto");
    assert.equal(konto.getAttribute("type"), "button");
    assert.equal(konto.getAttribute("aria-expanded"), "false");
    assert.equal(blockOf(page.root), null);
  });
});

test("a click on „Konto” opens the menu with the account's address and „Wyloguj”", async () => {
  // decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy, Programy and Wiedza, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
  // decision: D-285 "The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”"
  await withPage(async (page) => {
    await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    assert.equal(isOpen(page.root), true);
    const block = blockOf(page.root);
    assert.ok(block, "the menu stands");
    assert.ok(block.textContent.includes("ala@example.com"), "the address");
    assert.ok(buttonNamed(block, "Wyloguj"), "„Wyloguj”");
    // The account is confirmed: nothing about an address to confirm.
    assert.equal(sentenceOf(page.root), null);
    assert.equal(buttonNamed(block, "Wyślij ponownie"), undefined);
  });
});

test("Escape closes the menu and focus lands on „Konto”", async () => {
  // decision: D-285 "The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”; after Escape and after a second click on „Konto” focus returns to „Konto”, after a click outside it focus stays where the player clicked, and where that place takes no focus it returns to „Konto”"
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: UNCONFIRMED }) });
    const konto = buttonNamed(page.root, "Konto");
    await press(konto);
    // Focus stands in the menu, where the player tabbed to.
    buttonNamed(blockOf(page.root), "Wyloguj").focus();
    await pressKey(globalThis.document, "Escape");
    assert.equal(isOpen(page.root), false);
    assert.equal(blockOf(page.root), null);
    assert.equal(active(), konto);
  });
});

test("a click outside the menu closes it; focus stays where the player clicked, and on a bare background it lands on „Konto”", async () => {
  // decision: D-285 "The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”; after Escape and after a second click on „Konto” focus returns to „Konto”, after a click outside it focus stays where the player clicked, and where that place takes no focus it returns to „Konto”"
  await withPage(async (page) => {
    const { field } = await openBar(page);
    const background = page.document.createElement("div");
    page.root.append(background);
    const konto = buttonNamed(page.root, "Konto");
    await press(konto);
    // A browser focuses the field it clicks before the click reaches the page.
    field.focus();
    await press(field);
    assert.equal(isOpen(page.root), false);
    assert.equal(active(), field, "a click on a field leaves the caret in it");

    await press(konto);
    // The menu's own control holds the focus, and the click lands on a place that takes none.
    buttonNamed(blockOf(page.root), "Wyloguj").focus();
    await press(background);
    assert.equal(isOpen(page.root), false);
    assert.equal(active(), konto, "focus is not left in the hidden menu");

    await press(konto);
    // A browser leaves the focus on the body when a click lands on a place that takes none.
    active().blur();
    await press(background);
    assert.equal(isOpen(page.root), false);
    assert.equal(active(), konto, "focus is not left on the body");
  });
});

test("a click on an item of the bar, which stands outside the menu, closes it", async () => {
  // decision: D-285 "The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”"
  await withPage(async (page) => {
    await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    await press(all(page.root, ".menu-bar a")[1]);
    assert.equal(isOpen(page.root), false);
    assert.equal(active(), buttonNamed(page.root, "Konto"));
  });
});

test("a second click on „Konto” closes the menu and focus lands on „Konto”", async () => {
  // decision: D-285 "The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”; after Escape and after a second click on „Konto” focus returns to „Konto”, after a click outside it focus stays where the player clicked, and where that place takes no focus it returns to „Konto”"
  await withPage(async (page) => {
    await openBar(page);
    const konto = buttonNamed(page.root, "Konto");
    await press(konto);
    // A browser that does not focus a button on click leaves focus where it was.
    page.root.querySelector("input").focus();
    await press(konto);
    assert.equal(isOpen(page.root), false);
    assert.equal(active(), konto);
    await press(konto);
    assert.equal(isOpen(page.root), true, "a third click opens it again");
  });
});

test("a click inside the menu keeps it open", async () => {
  await withPage(async (page) => {
    await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    await press(blockOf(page.root).querySelector("p"));
    assert.equal(isOpen(page.root), true);
  });
});

test("a closed menu takes no focus: Escape and a click outside leave focus where it is", async () => {
  await withPage(async (page) => {
    const { outside, field } = await openBar(page);
    const konto = buttonNamed(page.root, "Konto");
    // Open and close once, so that the document's listeners of an open menu have stood and left.
    await press(konto);
    await press(konto);
    field.focus();
    await pressKey(globalThis.document, "Escape");
    assert.equal(active(), field, "Escape");
    await press(outside);
    assert.equal(active(), field, "a click outside");
    // The menu that was never opened does the same.
  });
  await withPage(async (page) => {
    const { outside, field } = await openBar(page);
    field.focus();
    await pressKey(globalThis.document, "Escape");
    await press(outside);
    assert.equal(active(), field);
  });
});

test("no arrow key moves anything: they neither open the menu nor move focus in it", async () => {
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: UNCONFIRMED }) });
    const konto = buttonNamed(page.root, "Konto");
    konto.focus();
    for (const key of ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"])
      await pressKey(konto, key);
    assert.equal(isOpen(page.root), false);
    assert.equal(active(), konto);
    await press(konto);
    const resend = buttonNamed(blockOf(page.root), "Wyślij ponownie");
    resend.focus();
    for (const key of ["ArrowDown", "ArrowUp"]) await pressKey(resend, key);
    assert.equal(isOpen(page.root), true);
    assert.equal(active(), resend);
  });
});

test("the controls of the open menu stand after „Konto” in the order Tab walks them: „Wyślij ponownie”, then „Wyloguj”", async () => {
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: UNCONFIRMED }) });
    await press(buttonNamed(page.root, "Konto"));
    const walk = all(page.root, "a, button").map((each) => each.textContent);
    assert.deepEqual(walk, [
      "Siedziba",
      "Mapy",
      "Programy",
      "Wiedza",
      "Konto",
      "Wyślij ponownie",
      "Wyloguj",
      "poza paskiem",
    ]);
  });
});

// --- the sentence about the address and „Wyślij ponownie” (D-157, D-44) ------------------------

test("an unconfirmed address shows its sentence in text-secondary above „Wyślij ponownie”; a confirmed one shows neither", async () => {
  // decision: D-157 "A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed."
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: UNCONFIRMED }) });
    await press(buttonNamed(page.root, "Konto"));
    const sentence = sentenceOf(page.root);
    assert.equal(sentence.textContent, "Adres e-mail niepotwierdzony.");
    assert.equal(isWarning(sentence), false);
    const resend = buttonNamed(page.root, "Wyślij ponownie");
    assert.equal(resend.disabled, false);
    assert.ok(
      sentence.compareDocumentPosition(resend) &
        globalThis.window.Node.DOCUMENT_POSITION_FOLLOWING,
      "the sentence stands above the button",
    );
  });
});

test("right after registration the sentence is the outcome of the registration's message", async () => {
  // decision: D-105 "Above either limit no message is sent and the player is told to try later, by the sentence of D-157 for a confirmation message"
  // decision: D-157 "Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości."
  // decision: D-157 "Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości."
  // decision: D-157 "Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”."
  for (const [message, [text, role]] of Object.entries(OUTCOMES)) {
    await withPage(async (page) => {
      await openBar(page, {
        props: propsOf({ account: UNCONFIRMED, registrationMessage: message }),
      });
      await press(buttonNamed(page.root, "Konto"));
      assert.equal(sentenceOf(page.root).textContent, text, message);
      assert.equal(
        isWarning(sentenceOf(page.root)),
        role === "warning",
        message,
      );
      assert.ok(buttonNamed(page.root, "Wyślij ponownie"), message);
    });
  }
});

test("a send waits with the button disabled as Wysyłanie…, the menu stays open, then the outcome stands, the button is restored and focused", async () => {
  // decision: D-105 "Above either limit no message is sent and the player is told to try later, by the sentence of D-157 for a confirmation message"
  // decision: D-157 "Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości."
  // decision: D-157 "Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości."
  // decision: D-157 "Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”."
  // decision: D-44 "A control awaiting a server response is disabled with text in `text-disabled`, „Zacznij od zera” while its reset waits for the server among them; the button that sends a form then reads „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” or „Ustawianie…” for the corresponding form — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła” or „Ustaw nowe hasło” — and that form's fields are disabled, and the button „Wyślij ponownie” then reads „Wysyłanie…”"
  // decision: D-285 "It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read"
  for (const [message, [text, role]] of Object.entries(OUTCOMES)) {
    await withPage(async (page) => {
      const { held } = await openBar(page, {
        props: propsOf({ account: UNCONFIRMED }),
      });
      await press(buttonNamed(page.root, "Konto"));
      const resend = buttonNamed(page.root, "Wyślij ponownie");
      await press(resend);
      assert.equal(held.waiting.length, 1, message);
      assert.equal(resend.disabled, true, message);
      assert.equal(resend.textContent, "Wysyłanie…", message);
      assert.equal(isOpen(page.root), true, `${message}: open while it waits`);
      // A second click while it waits sends nothing.
      await press(resend);
      assert.equal(held.waiting.length, 1, message);

      await held.answer(sentOk(message));
      assert.equal(sentenceOf(page.root).textContent, text, message);
      assert.equal(
        isWarning(sentenceOf(page.root)),
        role === "warning",
        message,
      );
      assert.equal(resend.textContent, "Wyślij ponownie", message);
      assert.equal(resend.disabled, false, message);
      assert.equal(active(), resend, message);
      assert.equal(
        isOpen(page.root),
        true,
        `${message}: open after the answer`,
      );
    });
  }
});

test("the menu stays open after the answer to „Wyślij ponownie” until the player closes it", async () => {
  // decision: D-157 "Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości."
  // decision: D-157 "Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości."
  // decision: D-157 "Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”."
  // decision: D-285 "It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read"
  await withPage(async (page) => {
    const { held, outside } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    await press(buttonNamed(page.root, "Konto"));
    await press(buttonNamed(page.root, "Wyślij ponownie"));
    await held.answer(sentOk("failed"));
    assert.equal(isOpen(page.root), true);
    assert.equal(
      sentenceOf(page.root).textContent,
      "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
    );
    await settle();
    assert.equal(isOpen(page.root), true, "nothing closes it by itself");
    await press(outside);
    assert.equal(isOpen(page.root), false, "the player closes it");
  });
});

test("a failure of the client stands in warning with its own sentence, and the button stays", async () => {
  // decision: D-157 "Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości."
  // decision: D-157 "Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”."
  await withPage(async (page) => {
    const { held } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    await press(buttonNamed(page.root, "Konto"));
    await press(buttonNamed(page.root, "Wyślij ponownie"));
    await held.answer({
      ok: false,
      failure: {
        kind: "unreachable",
        reason: "network",
        message: "Brak połączenia z serwerem. Spróbuj ponownie.",
      },
    });
    assert.equal(
      sentenceOf(page.root).textContent,
      "Brak połączenia z serwerem. Spróbuj ponownie.",
    );
    assert.equal(isWarning(sentenceOf(page.root)), true);
    const resend = buttonNamed(page.root, "Wyślij ponownie");
    assert.equal(resend.disabled, false);
    assert.equal(active(), resend);
  });
});

test("a refusal other than an address already confirmed is a failure too: its sentence in warning and the button stays", async () => {
  // decision: D-157 "Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości."
  // decision: D-157 "Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”."
  await withPage(async (page) => {
    const { held } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    await press(buttonNamed(page.root, "Konto"));
    await press(buttonNamed(page.root, "Wyślij ponownie"));
    await held.answer(refusal("unauthenticated", "Sesja wygasła."));
    assert.equal(sentenceOf(page.root).textContent, "Sesja wygasła.");
    assert.equal(isWarning(sentenceOf(page.root)), true);
    assert.ok(buttonNamed(page.root, "Wyślij ponownie"));
  });
});

test("the server's answer that the address is already confirmed removes the sentence and the button, and keeps the address, „Wyloguj” and the open menu", async () => {
  // decision: D-157 "A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed."
  // decision: D-285 "It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read"
  await withPage(async (page) => {
    const { held } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    const konto = buttonNamed(page.root, "Konto");
    await press(konto);
    await press(buttonNamed(page.root, "Wyślij ponownie"));
    await held.answer(
      refusal("email-already-confirmed", "Adres jest już potwierdzony."),
    );
    assert.equal(sentenceOf(page.root), null);
    assert.equal(buttonNamed(page.root, "Wyślij ponownie"), undefined);
    assert.ok(buttonNamed(page.root, "Wyloguj"));
    assert.ok(blockOf(page.root).textContent.includes("ala@example.com"));
    assert.equal(isOpen(page.root), true);
    assert.equal(active(), konto, "focus does not fall to the page");
  });
});

test("the page's account turning confirmed removes the sentence and the button", async () => {
  // decision: D-157 "A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed."
  await withPage(async (page) => {
    const { bar } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    await press(buttonNamed(page.root, "Konto"));
    await inAct(() => {
      bar.update(propsOf({ account: SIGNED_IN }));
    });
    assert.equal(sentenceOf(page.root), null);
    assert.equal(buttonNamed(page.root, "Wyślij ponownie"), undefined);
  });
});

test("an answer that comes while the menu is closed is there when the player opens it, and takes no focus", async () => {
  // decision: D-105 "Above either limit no message is sent and the player is told to try later, by the sentence of D-157 for a confirmation message"
  // decision: D-157 "Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości."
  // decision: D-157 "Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości."
  await withPage(async (page) => {
    const { held, field } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    const konto = buttonNamed(page.root, "Konto");
    await press(konto);
    await press(buttonNamed(page.root, "Wyślij ponownie"));
    await press(konto);
    field.focus();
    await held.answer(sentOk("limited"));
    assert.equal(active(), field, "focus is not taken");
    await press(konto);
    assert.equal(
      sentenceOf(page.root).textContent,
      "Za dużo wiadomości. Spróbuj ponownie za godzinę.",
    );
    assert.equal(buttonNamed(page.root, "Wyślij ponownie").disabled, false);
  });
});

test("an answer that comes after the bar was disposed, or the player signed out, is ignored", async () => {
  await withPage(async (page) => {
    const { bar, held, field } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    await press(buttonNamed(page.root, "Konto"));
    await press(buttonNamed(page.root, "Wyślij ponownie"));
    field.focus();
    await inAct(() => {
      bar.dispose();
    });
    assert.equal(bar.element.parentNode, null);
    await held.answer(sentOk("sent"));
    assert.equal(active(), field);
    // Its document listeners left with it: Escape moves nothing.
    await pressKey(globalThis.document, "Escape");
    assert.equal(active(), field);
  });
  await withPage(async (page) => {
    const { bar, held } = await openBar(page, {
      props: propsOf({ account: UNCONFIRMED }),
    });
    await press(buttonNamed(page.root, "Konto"));
    await press(buttonNamed(page.root, "Wyślij ponownie"));
    await inAct(() => {
      bar.update(propsOf({ account: null, screen: null }));
    });
    await held.answer(sentOk("sent"));
    assert.equal(page.root.querySelector(".menu-bar").textContent, ABOUT.name);
    // The next player of the same bar starts with a menu of their own.
    await inAct(() => {
      bar.update(propsOf({ account: UNCONFIRMED }));
    });
    assert.equal(isOpen(page.root), false, "a new sign-in starts closed");
    await press(buttonNamed(page.root, "Konto"));
    assert.equal(
      sentenceOf(page.root).textContent,
      "Adres e-mail niepotwierdzony.",
    );
    assert.equal(buttonNamed(page.root, "Wyślij ponownie").disabled, false);
  });
});

// --- „Wyloguj” (D-97) ---------------------------------------------------------------------

test("„Wyloguj” hands the page one request and does nothing else itself", async () => {
  // decision: D-285 "It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read"
  await withPage(async (page) => {
    const { logouts } = await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    await press(buttonNamed(page.root, "Wyloguj"));
    assert.equal(logouts.length, 1);
    assert.equal(isOpen(page.root), true, "the click does not close the menu");
  });
});

test("while the page's logout waits „Wyloguj” reads Wylogowywanie…, disabled, and sends nothing more; the menu stays open and on the answer the sentence and focus come back", async () => {
  // decision: D-97 "The shared „Wyloguj” button stands in the menu „Konto”, first saves the current game state on the server while it reads „Wylogowywanie…”"
  // decision: D-285 "It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read"
  await withPage(async (page) => {
    const { bar, logouts } = await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    const logout = buttonNamed(page.root, "Wyloguj");
    await press(logout);
    await inAct(() => {
      bar.update(propsOf({ logout: { waiting: true, sentence: null } }));
    });
    assert.equal(logout.textContent, "Wylogowywanie…");
    assert.equal(logout.disabled, true);
    assert.equal(isOpen(page.root), true);
    await press(logout);
    assert.equal(logouts.length, 1, "a click while it waits asks nothing");

    // The server's answer leaves the outcome uncertain: the page gives its sentence.
    await inAct(() => {
      bar.update(
        propsOf({
          logout: {
            waiting: false,
            sentence: "Brak połączenia z serwerem. Spróbuj ponownie.",
          },
        }),
      );
    });
    assert.equal(logout.textContent, "Wyloguj");
    assert.equal(logout.disabled, false);
    const sentence = sentenceOf(page.root);
    assert.equal(
      sentence.textContent,
      "Brak połączenia z serwerem. Spróbuj ponownie.",
    );
    assert.equal(isWarning(sentence), true);
    assert.equal(isOpen(page.root), true, "open after the answer");
    assert.equal(active(), logout);
  });
});

test("while the page says the logout is unavailable „Wyloguj” keeps its text, is disabled and hands the page nothing; the waiting text is the logout's alone", async () => {
  // decision: D-97 "The shared „Wyloguj” button stands in the menu „Konto”, first saves the current game state on the server while it reads „Wylogowywanie…”"
  await withPage(async (page) => {
    const { bar, logouts } = await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    const logout = buttonNamed(page.root, "Wyloguj");
    await inAct(() => {
      bar.update(
        propsOf({
          logout: { waiting: false, sentence: null, unavailable: true },
        }),
      );
    });
    assert.equal(logout.textContent, "Wyloguj");
    assert.equal(logout.disabled, true);
    assert.equal(isOpen(page.root), true, "the menu stays open");
    await press(logout);
    assert.equal(
      logouts.length,
      0,
      "a click while it is unavailable asks nothing",
    );

    // A logout that waits meanwhile shows its own text, still disabled.
    await inAct(() => {
      bar.update(
        propsOf({
          logout: { waiting: true, sentence: null, unavailable: true },
        }),
      );
    });
    assert.equal(logout.textContent, "Wylogowywanie…");
    assert.equal(logout.disabled, true);

    await inAct(() => {
      bar.update(propsOf());
    });
    assert.equal(logout.textContent, "Wyloguj");
    assert.equal(logout.disabled, false);
    await press(logout);
    assert.equal(logouts.length, 1);
  });
});

test("the page giving no account while „Wyloguj” waits turns the bar into the name alone and takes no focus", async () => {
  await withPage(async (page) => {
    const { bar, field } = await openBar(page);
    await press(buttonNamed(page.root, "Konto"));
    await inAct(() => {
      bar.update(propsOf({ logout: { waiting: true, sentence: null } }));
    });
    field.focus();
    await inAct(() => {
      bar.update(propsOf({ account: null, screen: null }));
    });
    assert.equal(page.root.querySelector(".menu-bar").textContent, ABOUT.name);
    assert.equal(active(), field);
  });
});

// --- the owner's link „Panel właściciela” (D-280, D-281, D-410) -----------------------------

const OWNER = { ...SIGNED_IN, role: "owner" };
const PLAYER = { ...SIGNED_IN, role: "player" };
const PANEL_TEXT = "Panel właściciela";
const BAR_ITEMS = [
  ["Siedziba", "#/"],
  ["Mapy", "#/mapy"],
  ["Programy", "#/programy"],
  ["Wiedza", "#/wiedza"],
];
const menuLinksOf = (root) => all(blockOf(root), "a");
const barItemsOf = (root) =>
  all(root, ".menu-bar-items a").map((link) => [
    link.textContent,
    link.getAttribute("href"),
  ]);

// decision: D-280 "An account with the owner role (D-410) has one more screen, the list of accounts (D-411), of the same content width, which is no item of the bar: the menu „Konto” of such an account holds, after the address and before its buttons, the link „Panel właściciela” to `#/konta` (D-281)"
test("the open menu of an owner holds the link „Panel właściciela” to #/konta, after the address and before the buttons", async () => {
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: OWNER }) });
    await press(buttonNamed(page.root, "Konto"));
    const links = menuLinksOf(page.root);
    assert.equal(links.length, 1, "one link in the menu");
    assert.equal(links[0].textContent, PANEL_TEXT);
    assert.equal(links[0].getAttribute("href"), "#/konta");
    const children = [...blockOf(page.root).children];
    assert.equal(children[0].className, "account-menu-address", "the address");
    assert.equal(children[1], links[0], "the link right after the address");
    assert.ok(buttonNamed(children[2], "Wyloguj"), "„Wyloguj” after the link");
  });
});

// decision: D-280 "The items of the bar and the bar itself are the same for a player and for an account with the owner role, and the menu „Konto” of a player holds no such link"
test("the open menu of a player holds no link „Panel właściciela”", async () => {
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: PLAYER }) });
    await press(buttonNamed(page.root, "Konto"));
    assert.equal(menuLinksOf(page.root).length, 0);
    assert.ok(buttonNamed(blockOf(page.root), "Wyloguj"), "„Wyloguj” stays");
  });
});

// decision: D-280 "The items of the bar and the bar itself are the same for a player and for an account with the owner role"
test("following „Panel właściciela” closes the menu, and the bar's items are the same for an owner and a player", async () => {
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: OWNER }) });
    await press(buttonNamed(page.root, "Konto"));
    await press(menuLinksOf(page.root)[0]);
    assert.equal(isOpen(page.root), false, "the menu is closed");
    assert.equal(blockOf(page.root), null);
    assert.deepEqual(barItemsOf(page.root), BAR_ITEMS, "an owner's bar");
  });
  await withPage(async (page) => {
    await openBar(page, { props: propsOf({ account: PLAYER }) });
    assert.deepEqual(barItemsOf(page.root), BAR_ITEMS, "a player's bar");
  });
});
