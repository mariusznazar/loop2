import {
  createAccountClient,
  type Account,
  type AccountClient,
  type AccountFailure,
  type ConfirmationMessage,
} from "../account-api.js";
import { createAccountScreen } from "./account-screen.js";
import { createButton, setButtonWaiting } from "./controls/button.js";
import { createFormWarning } from "./controls/text-field.js";
import {
  browserAddress,
  confirmFromAddress,
  createConfirmationNotice,
  readConfirmationToken,
  type ConfirmationNotice,
  type PageAddress,
} from "./email-confirmation.js";
import { createEmailStatus, type EmailStatus } from "./email-status.js";
import { createFooter } from "./footer.js";
import { createGameView, type GameView } from "./game-view.js";

/** The server's answer that this browser has no valid session: the player is signed out. */
function signedOut(failure: AccountFailure): boolean {
  return failure.kind === "refused" && failure.status === 401;
}

/**
 * Builds the page in `root`: the header with the title, the place of the screen, and the footer.
 * The page first asks the server whom this browser is signed in as and shows only that it is
 * asking; the game is built only once the server names an account, and the forms only once it
 * says there is none. Any other answer is a warning with „Spróbuj ponownie”, never a guess.
 * „Wyloguj” beside the title ends this browser's session; the game leaves the page only when the
 * server confirms it, and stays with a warning when the outcome is uncertain. One transition runs
 * at a time, and an answer that comes after the page moved on is ignored.
 *
 * Under the title, on a line of its own, a signed-in player with an unconfirmed address sees the
 * row of `email-status.ts`. When the page's address carries a confirmation token, the page first
 * sends it — showing „Potwierdzanie adresu…” where it shows the session check — and only then
 * checks the session; the result stands as one sentence above the first screen that check leads
 * to, and leaves at the next change between forms and game.
 */
export function startApp(
  root: HTMLElement,
  client: AccountClient = createAccountClient(),
  address: PageAddress = browserAddress(),
): void {
  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "Loop";
  const logoutButton = createButton("Wyloguj");
  logoutButton.hidden = true;
  const logoutWarning = createFormWarning();
  header.append(title, logoutButton, logoutWarning.element);

  const main = document.createElement("main");
  main.className = "app-main";

  // The session check: what the page says while it asks, and the warning with its retry.
  const check = document.createElement("section");
  check.className = "session-check";
  const checking = document.createElement("p");
  checking.className = "session-check-text";
  checking.textContent = "Sprawdzanie logowania…";
  const checkWarning = createFormWarning();
  const retryButton = createButton("Spróbuj ponownie");
  retryButton.hidden = true;
  check.append(checking, checkWarning.element, retryButton);

  const accountScreen = createAccountScreen(client, (account, message) =>
    showGame(account, message),
  );
  let game: GameView | null = null;
  let emailStatus: EmailStatus | null = null;
  // The result of a confirmation from the address, until the first screen shows it.
  let pendingNotice: ConfirmationNotice | null = null;
  // Each request of the page takes the next number; an answer counts only while it is the last.
  let latest = 0;

  /** The notice to stand above the screen about to be shown, once; nothing after that. */
  function noticeElements(): HTMLElement[] {
    const notice = pendingNotice;
    pendingNotice = null;
    return notice === null ? [] : [createConfirmationNotice(notice)];
  }

  function showGame(
    account: Account,
    message: ConfirmationMessage | null,
  ): void {
    game?.dispose();
    emailStatus?.dispose();
    game = createGameView();
    emailStatus = createEmailStatus(client, account, message);
    header.append(emailStatus.element);
    main.replaceChildren(...noticeElements(), game.element);
    logoutWarning.set(null);
    logoutButton.hidden = false;
  }

  function showForms(): void {
    game?.dispose();
    game = null;
    emailStatus?.dispose();
    emailStatus = null;
    logoutButton.hidden = true;
    logoutWarning.set(null);
    accountScreen.reset();
    main.replaceChildren(...noticeElements(), accountScreen.element);
  }

  async function checkSession(): Promise<void> {
    const mine = ++latest;
    checkWarning.set(null);
    if (retryButton.hidden) {
      checking.hidden = false;
    } else {
      setButtonWaiting(retryButton, "Sprawdzanie…");
    }
    main.replaceChildren(check);
    const result = await client.currentAccount();
    if (mine !== latest) return;
    setButtonWaiting(retryButton, null);
    if (result.ok) {
      showGame(result.value, null);
    } else if (signedOut(result.failure)) {
      showForms();
    } else {
      checking.hidden = true;
      checkWarning.set(result.failure.message);
      retryButton.hidden = false;
      retryButton.focus();
    }
  }

  retryButton.addEventListener("click", () => {
    if (retryButton.disabled) return;
    void checkSession();
  });

  logoutButton.addEventListener("click", () => {
    if (game === null || logoutButton.disabled) return;
    void (async () => {
      const mine = ++latest;
      logoutWarning.set(null);
      setButtonWaiting(logoutButton, "Wylogowywanie…");
      const result = await client.logout();
      if (mine !== latest) return;
      setButtonWaiting(logoutButton, null);
      if (result.ok || signedOut(result.failure)) {
        showForms();
        accountScreen.focus();
        return;
      }
      // The server may or may not have ended the session: the game stays, and so does „Wyloguj”.
      logoutWarning.set(result.failure.message);
      logoutButton.focus();
    })();
  });

  /** The confirmation from the address, where there is one, then the session check. */
  async function start(): Promise<void> {
    if (readConfirmationToken(address.hash()) !== null) {
      checking.textContent = "Potwierdzanie adresu…";
      main.replaceChildren(check);
      const notice = await confirmFromAddress(client, address);
      checking.textContent = "Sprawdzanie logowania…";
      pendingNotice = notice;
    }
    await checkSession();
  }

  root.append(header, main, createFooter());
  void start();
}
