/**
 * The menu bar (D-280): at the top of every screen of a signed-in player, and alone with the game's
 * name on a waiting screen (D-262). Over the game it holds the items Siedziba and Programy, as
 * links to their screens and with no icons, the item of the place the player is at marked (D-277),
 * where the page gives it „Wróć do przejścia · {mapa} · minuta {m}”, and the menu „Konto” with the
 * account's address, „Wyloguj” and, for an unconfirmed address, the sentence about it with
 * „Wyślij ponownie” (D-157, D-97).
 *
 * Like the login card, the bar is a screen in React behind one boundary, `createMenuBar` (D-36): an
 * element of its own for the page to place, a first render that is synchronous, `update(props)` and
 * `dispose()`. The page calls them from an event handler or the continuation of an answer, never
 * from render or an effect. The page runs the logout itself, since it saves the game first; the bar
 * only shows the waiting and the sentence the page gives. The bar sends „Wyślij ponownie” itself.
 * Nothing runs when the module is imported.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type {
  Account,
  AccountClient,
  ConfirmationMessage,
} from "../account-api.js";
import { ABOUT } from "../sim/data/about.js";
import { ReactButton } from "./controls/react-button.js";
import { messageSentence, UNCONFIRMED_SENTENCE } from "./email-status.js";
import type { Sentence } from "./email-status.js";
import { markedMenuItem, screenAddress } from "./screen-address.js";
import type { MenuItem, ReturnEntry, Screen } from "./screen-address.js";

/** What the page gives the bar; every call of `update` gives it whole. */
export type MenuBarProps = {
  /** The signed-in player's account; null on a waiting screen, where the bar holds the name alone. */
  account: Account | null;
  /** The screen the player is on, for the bar to mark its item; null marks none. */
  screen: Screen | null;
  /** „Wróć do przejścia”, where the game state holds a map run and the screen is not its own. */
  returnEntry: ReturnEntry | null;
  /**
   * The outcome of the confirmation message sent with a registration, which the menu starts with in
   * place of the unconfirmed sentence; read when the player's menu first stands.
   */
  registrationMessage: ConfirmationMessage | null;
  /** The page's logout: whether it waits for the server, and the sentence of an uncertain end. */
  logout: { waiting: boolean; sentence: string | null };
};

export type MenuBarOptions = {
  client: Pick<AccountClient, "sendConfirmationMessage">;
  /** Called when the player asks for „Wyloguj”; the page then gives the bar `logout.waiting`. */
  onLogout: () => void;
  props: MenuBarProps;
};

export type MenuBar = {
  /** The bar with its screen, for the page to place. */
  element: HTMLElement;
  /** Draws the bar anew from what the page gives; the menu keeps its state, but not for a new player. */
  update(props: MenuBarProps): void;
  /** Unmounts the bar and takes it out of the page; an answer still awaited is then ignored. */
  dispose(): void;
};

/** The items of the bar over the game, with the screens they lead to. */
const ITEMS: readonly {
  item: MenuItem;
  text: string;
  address: string;
}[] = [
  {
    item: "headquarters",
    text: "Siedziba",
    address: screenAddress({ kind: "headquarters" }),
  },
  {
    item: "programs",
    text: "Programy",
    address: screenAddress({ kind: "programs" }),
  },
];

type AccountMenuProps = {
  client: MenuBarOptions["client"];
  account: Account;
  registrationMessage: ConfirmationMessage | null;
  logout: MenuBarProps["logout"];
  onLogout: () => void;
};

/**
 * The menu „Konto”. It stands only for a signed-in player, so a new player gets a menu of their
 * own, closed, with no sentence of the one before.
 */
function AccountMenu({
  client,
  account,
  registrationMessage,
  logout,
  onLogout,
}: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [sentence, setSentence] = useState<Sentence>(() =>
    registrationMessage === null
      ? UNCONFIRMED_SENTENCE
      : messageSentence(registrationMessage, account.email),
  );
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const accountButton = useRef<HTMLButtonElement>(null);
  const resendButton = useRef<HTMLButtonElement>(null);
  const logoutButton = useRef<HTMLButtonElement>(null);
  // Each sending takes the next number and only the last one's answer acts; leaving takes one too.
  const latest = useRef(0);
  const sendingNow = useRef(false);
  // The control to give focus once the commit under way is in the page: a button that waited was
  // disabled, and a disabled button lost the focus.
  const focusAfterCommit = useRef<RefObject<HTMLButtonElement | null> | null>(
    null,
  );
  const wasLoggingOut = useRef(logout.waiting);

  // The document's own events while the menu stands open: Escape, and a click outside it.
  useEffect(() => {
    if (!open) return;
    function close(): void {
      setOpen(false);
      accountButton.current?.focus();
    }
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") close();
    }
    function onClick(event: MouseEvent): void {
      const inside = container.current;
      if (inside !== null && event.composedPath().includes(inside)) return;
      close();
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  // After every commit: focus where a finished wait left it, only while the menu stands open.
  useLayoutEffect(() => {
    const target = focusAfterCommit.current;
    focusAfterCommit.current = null;
    if (open) target?.current?.focus();
    if (wasLoggingOut.current && !logout.waiting && open) {
      logoutButton.current?.focus();
    }
    wasLoggingOut.current = logout.waiting;
  });

  // An answer awaited when the menu leaves the page acts on nothing.
  useEffect(
    () => () => {
      latest.current += 1;
    },
    [],
  );

  function toggle(): void {
    if (open) {
      setOpen(false);
      accountButton.current?.focus();
    } else {
      setOpen(true);
    }
  }

  function resend(): void {
    if (sendingNow.current) return;
    sendingNow.current = true;
    const mine = ++latest.current;
    setSending(true);
    void client.sendConfirmationMessage().then((result) => {
      if (mine !== latest.current) return;
      sendingNow.current = false;
      setSending(false);
      if (result.ok) {
        setSentence(messageSentence(result.value, account.email));
        focusAfterCommit.current = resendButton;
      } else if (
        result.failure.kind === "refused" &&
        result.failure.code === "email-already-confirmed"
      ) {
        setConfirmed(true);
        // The button that waited is gone with its sentence: focus goes to the menu's own button.
        focusAfterCommit.current = accountButton;
      } else {
        setSentence({ text: result.failure.message, role: "warning" });
        focusAfterCommit.current = resendButton;
      }
    });
  }

  const unconfirmed = !account.emailConfirmed && !confirmed;
  return (
    <div className="account-menu" ref={container}>
      <ReactButton
        text="Konto"
        expanded={open}
        buttonRef={accountButton}
        onClick={toggle}
      />
      {open ? (
        <div className="account-menu-block">
          <p className="account-menu-address">{account.email}</p>
          {unconfirmed ? (
            <div className="account-menu-unconfirmed">
              <p
                className={
                  sentence.role === "warning"
                    ? "account-menu-sentence warning"
                    : "account-menu-sentence"
                }
                aria-live="polite"
              >
                {sentence.text}
              </p>
              <ReactButton
                text="Wyślij ponownie"
                waitingText={sending ? "Wysyłanie…" : null}
                buttonRef={resendButton}
                onClick={resend}
              />
            </div>
          ) : null}
          <div className="account-menu-logout">
            <ReactButton
              text="Wyloguj"
              waitingText={logout.waiting ? "Wylogowywanie…" : null}
              buttonRef={logoutButton}
              onClick={() => {
                if (!logout.waiting) onLogout();
              }}
            />
            {logout.sentence === null ? null : (
              <p className="account-menu-sentence warning" aria-live="polite">
                {logout.sentence}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

type MenuBarViewProps = {
  client: MenuBarOptions["client"];
  onLogout: () => void;
  props: MenuBarProps;
};

/** The bar: the name, over the game the items and the menu „Konto”. */
function MenuBarView({ client, onLogout, props }: MenuBarViewProps) {
  const { account, screen, returnEntry } = props;
  if (account === null) {
    return (
      <div className="menu-bar">
        <span className="menu-bar-name">{ABOUT.name}</span>
      </div>
    );
  }
  const marked = screen === null ? null : markedMenuItem(screen);
  return (
    <nav className="menu-bar" aria-label="Nawigacja">
      <span className="menu-bar-name">{ABOUT.name}</span>
      <div className="menu-bar-items">
        {ITEMS.map(({ item, text, address }) => (
          <a
            key={item}
            className="menu-bar-item"
            href={address}
            aria-current={item === marked ? "page" : undefined}
          >
            {text}
          </a>
        ))}
        {returnEntry === null ? null : (
          <a className="menu-bar-item" href={returnEntry.address}>
            {returnEntry.text}
          </a>
        )}
      </div>
      <AccountMenu
        client={client}
        account={account}
        registrationMessage={props.registrationMessage}
        logout={props.logout}
        onLogout={onLogout}
      />
    </nav>
  );
}

/**
 * Builds the bar in an element of its own, for the page to place. The render is synchronous, so
 * the bar stands in the element when this returns. Each bar is a new root: nothing the menu holds
 * outlives `dispose()`.
 */
export function createMenuBar(options: MenuBarOptions): MenuBar {
  const element = document.createElement("div");
  element.className = "menu-bar-host";
  const root = createRoot(element);
  let disposed = false;
  function draw(props: MenuBarProps): void {
    flushSync(() => {
      root.render(
        <MenuBarView
          client={options.client}
          onLogout={options.onLogout}
          props={props}
        />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: MenuBarProps): void {
      if (!disposed) draw(props);
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
