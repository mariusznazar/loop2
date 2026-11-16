/**
 * The waiting screen (D-262): what the start page shows, under the header, while it asks the server
 * whom this browser is signed in as, sends the confirmation token of its address or loads the saved
 * game state, and the warning with „Spróbuj ponownie” when one of those failed.
 *
 * Like the menu bar, it is a root of React of its own behind one boundary, `createWaitingScreen`
 * (D-407, D-36): an element for the page to place, a first render that is synchronous, `update`,
 * `focusRetry` and `dispose`. The element is the `session-check` section itself and stands in every
 * state of the screen, empty in the state `stopped`. The page calls the factory and its methods from
 * an event handler or the continuation of an answer, never from render or an effect. The page holds
 * what the screen shows and the retry: the screen only draws the state it is given and reports the
 * press of „Spróbuj ponownie”. Nothing runs when the module is imported.
 */
import type { RefObject } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ReactButton } from "./controls/react-button.js";
import { ReactFormWarning } from "./controls/react-text-field.js";

/** What the button reads at rest. */
const RETRY_TEXT = "Spróbuj ponownie";
/** What the button reads while its request waits. */
const RETRY_WAITING = "Sprawdzanie…";

/**
 * What the waiting screen shows: `asking` — the text of what the page asks for; `refused` — the
 * sentence of a request that failed or of a load that met an error of the code, with „Spróbuj
 * ponownie” at rest; `retrying` — „Spróbuj ponownie” waiting as „Sprawdzanie…” with no sentence,
 * which lasts through every request until the waiting screen is left; `stopped` — where the page
 * would build a game after an error nothing handled, so that nothing is drawn and the sentence of
 * the failure in the header alone is read (D-323).
 */
export type Waiting =
  | { readonly kind: "asking"; readonly text: string }
  | { readonly kind: "refused"; readonly sentence: string }
  | { readonly kind: "retrying" }
  | { readonly kind: "stopped" };

export type WaitingScreenOptions = {
  /** Called when the player presses „Spróbuj ponownie” at rest. */
  onRetry: () => void;
  waiting: Waiting;
};

export type WaitingScreen = {
  /** The `session-check` section with the screen in it, for the page to place. */
  element: HTMLElement;
  /** Draws the screen anew from what the page gives. */
  update(waiting: Waiting): void;
  /** Moves focus to „Spróbuj ponownie”, where it stands; the button lost it while it waited. */
  focusRetry(): void;
  /** Unmounts the screen and takes its element out of the page. */
  dispose(): void;
};

type WaitingViewProps = {
  waiting: Waiting;
  onRetry: () => void;
  retryRef: RefObject<HTMLButtonElement | null>;
};

/** The screen in one state; the slots keep their places, so the button stays one element. */
function WaitingView({ waiting, onRetry, retryRef }: WaitingViewProps) {
  const retryStands = waiting.kind === "refused" || waiting.kind === "retrying";
  return (
    <>
      {waiting.kind === "asking" ? (
        <p className="session-check-text">{waiting.text}</p>
      ) : null}
      {waiting.kind === "refused" ? (
        <ReactFormWarning sentence={waiting.sentence} />
      ) : null}
      {retryStands ? (
        <ReactButton
          text={RETRY_TEXT}
          waitingText={waiting.kind === "retrying" ? RETRY_WAITING : null}
          buttonRef={retryRef}
          onClick={onRetry}
        />
      ) : null}
    </>
  );
}

/**
 * Builds the waiting screen in an element of its own, for the page to place. The render is
 * synchronous, so the screen stands in the element when this returns.
 */
export function createWaitingScreen(
  options: WaitingScreenOptions,
): WaitingScreen {
  const element = document.createElement("section");
  element.className = "session-check";
  const root = createRoot(element);
  const retryRef: RefObject<HTMLButtonElement | null> = { current: null };
  let disposed = false;
  function draw(waiting: Waiting): void {
    flushSync(() => {
      root.render(
        <WaitingView
          waiting={waiting}
          onRetry={options.onRetry}
          retryRef={retryRef}
        />,
      );
    });
  }
  draw(options.waiting);
  return {
    element,
    update(waiting: Waiting): void {
      if (!disposed) draw(waiting);
    },
    focusRetry(): void {
      if (!disposed) retryRef.current?.focus();
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
