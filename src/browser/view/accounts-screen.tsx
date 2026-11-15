/**
 * The screen of the list of accounts (D-411, D-281; `#/konta`, for an account with the owner role):
 * every account the server lists, in the order it gives them, each in a row with its address, its
 * blocked state, its previous-save privilege and its role, and the four buttons of D-411 — „Zablokuj”
 * (not at an account with the owner role), „Odblokuj”, „Nadaj uprawnienie do poprzedniego zapisu” and
 * „Odbierz uprawnienie do poprzedniego zapisu”. „Zablokuj” opens a confirmation under its row, as
 * „Zacznij od zera” does on Programy (D-402); the other three act at once. Of each pair of buttons the
 * one that makes no sense for the row's state is disabled. While an answer is awaited every button of
 * the list is disabled and keeps its text (D-44), and the commit that brings the answer gives focus
 * back to the control the player started from, or to its counterpart where the answer made that
 * control useless.
 *
 * The screen draws what the entry gives it and performs nothing: the page holds the state of the read
 * and of the operations (`accounts-entry.ts`) and hands it over whole in `props`; the screen's acts
 * go back through `controls`. It stands behind one boundary, `createAccountsScreen` (D-36), as the
 * screen Mapy does: an element of its own for the page to place, a first render that is synchronous,
 * `update(props)`, `focus()` and `dispose()`. The page calls them from an event handler or the
 * continuation of an answer, never from render or an effect. Nothing runs when the module is imported.
 *
 * Classes the style rules read (`src/browser/styles.css`), and what each holds:
 * `accounts-screen-host` the element of the screen; `accounts-screen` the screen's root, beside
 * `screen`; `accounts-area` its one area; `accounts-loading` the line while the list is read;
 * `accounts-empty` the sentence of a list with no account; `accounts-retry` the block of „Spróbuj
 * ponownie” beside the sentence of a failed read; `accounts-list` the list; `accounts-row` one
 * account; `accounts-summary` what the row shows of the account; `accounts-email` its address;
 * `accounts-field` a label with its value; `accounts-label` the label; `accounts-state` the blocked
 * state, with `accounts-state-blocked` where the account is blocked; `accounts-privilege` the
 * privilege; `accounts-role` the role; `accounts-actions` the four buttons; `accounts-confirm` the
 * confirmation of „Zablokuj”; `accounts-confirm-text` its sentence of effects.
 */
import { useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { PanelAccount } from "../account-api.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactFormWarning } from "./controls/react-text-field.js";

/** The four operations of a row. */
export type AccountAction = "block" | "unblock" | "grant" | "revoke";

/** What the page gives the screen; every call of `update` gives it whole. */
export type AccountsScreenProps = {
  /** `loading` — the list is being read; `failed` — it could not be read; `ready` — it stands. */
  phase: "loading" | "failed" | "ready";
  /** The one sentence in `warning` above the list, or null where there is none. */
  sentence: string | null;
  /** Whether „Spróbuj ponownie” stands beside the sentence of a failed read. */
  canRetry: boolean;
  /** The accounts, in the order the server gave them. */
  accounts: readonly PanelAccount[];
  /** The operation whose answer is awaited, and the address it was asked for; null where none is. */
  waiting: { email: string; action: AccountAction } | null;
  /** The address whose confirmation of „Zablokuj” stands, or null. */
  confirming: string | null;
};

/** What the screen asks of the page; the page turns each into a request or a change of its state. */
export type AccountsScreenControls = {
  /** Reads the list again after a failed read. */
  retry: () => void;
  /** „Zablokuj” of the account at the address: opens its confirmation and sends nothing. */
  askBlock: (email: string) => void;
  /** The confirmation's „Tak, zablokuj”: sends the block. */
  confirmBlock: (email: string) => void;
  /** The confirmation's „Wróć”: closes it and changes nothing. */
  withdrawBlock: () => void;
  /** „Odblokuj”, „Nadaj uprawnienie do poprzedniego zapisu” and „Odbierz uprawnienie do poprzedniego zapisu”: each sends its request at once. */
  unblock: (email: string) => void;
  grant: (email: string) => void;
  revoke: (email: string) => void;
};

export type AccountsScreenOptions = {
  controls: AccountsScreenControls;
  props: AccountsScreenProps;
};

export type AccountsScreen = {
  /** The screen with its element, for the page to place. */
  element: HTMLElement;
  /** Draws the screen anew from what the page gives. */
  update(props: AccountsScreenProps): void;
  /** Moves keyboard focus to the screen, for the page to call when the screen is opened. */
  focus(): void;
  /** Unmounts the screen and takes it out of the page. */
  dispose(): void;
};

const LOADING_TEXT = "Wczytywanie listy kont…";
const EMPTY_TEXT = "Nie ma żadnych kont.";
const RETRY_TEXT = "Spróbuj ponownie";
const BLOCK_CONFIRMATION =
  "Blokada kończy sesje gracza w każdej przeglądarce i unieważnia jego odnośniki z maili, a odblokowanie nie przywraca ani sesji, ani odnośników.";
const BLOCK_CONFIRM_TEXT = "Tak, zablokuj";
const BLOCK_WITHDRAW_TEXT = "Wróć";

/** The text of each of the four buttons (D-411). */
const BUTTON_TEXT: Record<AccountAction, string> = {
  block: "Zablokuj",
  unblock: "Odblokuj",
  grant: "Nadaj uprawnienie do poprzedniego zapisu",
  revoke: "Odbierz uprawnienie do poprzedniego zapisu",
};

/** The button that takes the place of one the answer made useless: its opposite in the pair. */
const COUNTERPART: Record<AccountAction, AccountAction> = {
  block: "unblock",
  unblock: "block",
  grant: "revoke",
  revoke: "grant",
};

/** Whether an operation makes no sense for the state of the account: it is already as the operation leaves it. */
function useless(account: PanelAccount, action: AccountAction): boolean {
  switch (action) {
    case "block":
      return account.blocked;
    case "unblock":
      return !account.blocked;
    case "grant":
      return account.previousSaveAllowed;
    case "revoke":
      return !account.previousSaveAllowed;
  }
}

/** The key a row's button is kept under, to move focus to it. */
function buttonKey(email: string, action: AccountAction): string {
  return `${email}|${action}`;
}

/** What a row gets from the screen to move focus: the ref callback of a button and the asking of a move. */
type FocusPlumbing = {
  keep: (
    email: string,
    action: AccountAction,
  ) => (element: HTMLButtonElement | null) => void;
  /** Records the control the focus is owed to once the answer to the click comes. */
  owe: (email: string, action: AccountAction) => void;
  /** Records that the confirmation's „Wróć” is owed focus when the confirmation opens. */
  oweWithdraw: () => void;
  withdrawRef: (element: HTMLButtonElement | null) => void;
  /** Moves focus to the button of a row now. */
  focusNow: (email: string, action: AccountAction) => void;
};

type RowProps = {
  account: PanelAccount;
  props: AccountsScreenProps;
  controls: AccountsScreenControls;
  focus: FocusPlumbing;
};

/** One account: what is shown of it, the four buttons and, where it was asked for, the confirmation of „Zablokuj”. */
function AccountRow({ account, props, controls, focus }: RowProps) {
  const { email } = account;
  const busy = props.waiting !== null;
  const press =
    (action: AccountAction, act: (address: string) => void) => () => {
      focus.owe(email, action);
      act(email);
    };
  const button = (action: AccountAction, act: (address: string) => void) => (
    <ReactButton
      text={BUTTON_TEXT[action]}
      label={`${BUTTON_TEXT[action]}: ${email}`}
      buttonRef={focus.keep(email, action)}
      disabled={busy || useless(account, action)}
      onClick={press(action, act)}
    />
  );
  return (
    <li className="accounts-row">
      <div className="accounts-summary">
        <span className="accounts-email">{email}</span>
        <span className="accounts-field">
          <span className="accounts-label">Blokada:</span>{" "}
          <span
            className={
              account.blocked
                ? "accounts-state accounts-state-blocked"
                : "accounts-state"
            }
          >
            {account.blocked ? "zablokowane" : "odblokowane"}
          </span>
        </span>
        <span className="accounts-field">
          <span className="accounts-label">
            Uprawnienie do poprzedniego zapisu:
          </span>{" "}
          <span className="accounts-privilege">
            {account.previousSaveAllowed ? "tak" : "nie"}
          </span>
        </span>
        <span className="accounts-field">
          <span className="accounts-label">Rola:</span>{" "}
          <span className="accounts-role">
            {account.role === "owner" ? "właściciel" : "gracz"}
          </span>
        </span>
      </div>
      <div className="accounts-actions">
        {account.role === "owner" ? null : (
          <ReactButton
            text={BUTTON_TEXT.block}
            kind="destructive"
            label={`${BUTTON_TEXT.block}: ${email}`}
            buttonRef={focus.keep(email, "block")}
            disabled={busy || useless(account, "block")}
            onClick={() => {
              focus.oweWithdraw();
              controls.askBlock(email);
            }}
          />
        )}
        {button("unblock", controls.unblock)}
        {button("grant", controls.grant)}
        {button("revoke", controls.revoke)}
      </div>
      {props.confirming !== email ? null : (
        <div className="accounts-confirm">
          <p className="accounts-confirm-text">{BLOCK_CONFIRMATION}</p>
          <ReactButton
            text={BLOCK_CONFIRM_TEXT}
            kind="destructive"
            label={`${BLOCK_CONFIRM_TEXT}: ${email}`}
            onClick={() => {
              focus.owe(email, "block");
              controls.confirmBlock(email);
            }}
          />
          <ReactButton
            text={BLOCK_WITHDRAW_TEXT}
            kind="secondary"
            label={`${BLOCK_WITHDRAW_TEXT}: ${email}`}
            buttonRef={focus.withdrawRef}
            onClick={() => {
              controls.withdrawBlock();
              focus.focusNow(email, "block");
            }}
          />
        </div>
      )}
    </li>
  );
}

type AccountsViewProps = {
  controls: AccountsScreenControls;
  props: AccountsScreenProps;
  focusHost: () => void;
};

/** The screen: the sentence above, then the line of the read, the retry or the list. */
function AccountsView({ controls, props, focusHost }: AccountsViewProps) {
  const { phase, sentence, canRetry, accounts, waiting, confirming } = props;
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const withdraw = useRef<HTMLButtonElement | null>(null);
  // Set by a click, so the commit of its answer moves focus: a disabled button has lost it.
  const owed = useRef<{ email: string; action: AccountAction } | null>(null);
  // Set by „Zablokuj”, so the commit that opens its confirmation moves focus to „Wróć”.
  const withdrawOwed = useRef(false);

  // After every commit, so the move follows the commit that answers the click that asked for it.
  useLayoutEffect(() => {
    if (withdrawOwed.current && confirming !== null) {
      withdrawOwed.current = false;
      withdraw.current?.focus();
      return;
    }
    const asked = owed.current;
    if (asked === null || waiting !== null) return;
    owed.current = null;
    for (const action of [asked.action, COUNTERPART[asked.action]]) {
      const element = buttons.current.get(buttonKey(asked.email, action));
      if (element !== undefined && !element.disabled) {
        element.focus();
        return;
      }
    }
  });

  const focus: FocusPlumbing = {
    keep: (email, action) => (element) => {
      const key = buttonKey(email, action);
      if (element === null) buttons.current.delete(key);
      else buttons.current.set(key, element);
    },
    owe: (email, action) => {
      owed.current = { email, action };
    },
    oweWithdraw: () => {
      withdrawOwed.current = true;
    },
    withdrawRef: (element) => {
      withdraw.current = element;
    },
    focusNow: (email, action) => {
      buttons.current.get(buttonKey(email, action))?.focus();
    },
  };

  return (
    <div className="screen accounts-screen">
      <section className="screen-area accounts-area">
        {sentence === null ? null : <ReactFormWarning sentence={sentence} />}
        {phase === "loading" ? (
          <p className="accounts-loading" role="status">
            {LOADING_TEXT}
          </p>
        ) : null}
        {phase === "failed" && canRetry ? (
          <div className="accounts-retry">
            <ReactButton
              text={RETRY_TEXT}
              onClick={() => {
                controls.retry();
                focusHost();
              }}
            />
          </div>
        ) : null}
        {phase === "ready" && accounts.length === 0 ? (
          <p className="accounts-empty">{EMPTY_TEXT}</p>
        ) : null}
        {phase === "ready" && accounts.length > 0 ? (
          <ul className="accounts-list" aria-label="Konta">
            {accounts.map((account) => (
              <AccountRow
                key={account.email}
                account={account}
                props={props}
                controls={controls}
                focus={focus}
              />
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}

/**
 * Builds the screen in an element of its own, for the page to place. The render is synchronous, so
 * the screen stands in the element when this returns. Each screen is a new root: nothing it holds
 * outlives `dispose()`. The element takes focus when the page gives it, as the screen a change of
 * screen opens, and stands outside the keyboard's order otherwise.
 */
export function createAccountsScreen(
  options: AccountsScreenOptions,
): AccountsScreen {
  const element = document.createElement("div");
  element.className = "accounts-screen-host";
  element.tabIndex = -1;
  const root = createRoot(element);
  let disposed = false;
  function draw(props: AccountsScreenProps): void {
    flushSync(() => {
      root.render(
        <AccountsView
          controls={options.controls}
          props={props}
          focusHost={() => element.focus()}
        />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: AccountsScreenProps): void {
      if (!disposed) draw(props);
    },
    focus(): void {
      element.focus();
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
