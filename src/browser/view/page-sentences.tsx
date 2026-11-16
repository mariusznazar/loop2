/**
 * The page's sentences (D-286, D-261, D-96): the one sentence of the page that stands in the login
 * card or above the first screen of the game, and the sentence of a saved game state that did not
 * load. `PageSentence` is the one component of such a sentence, which the card draws in its own root
 * and the row of sentences draws in this one.
 *
 * Like the menu bar, the row is a root of React of its own behind one boundary,
 * `createPageSentences` (D-407, D-36): an element for the page to place, a first render that is
 * synchronous, `update(sentences)` that renders synchronously, and `dispose()`. The page calls the
 * factory and `update` from an event handler or the continuation of an answer, never from render or
 * an effect. The page holds which sentences stand and when they leave: the row only draws the list
 * it is given. Nothing runs when the module is imported.
 */
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { ConfirmationNotice } from "./email-confirmation.js";

/** The sentence of a saved game state that did not load, standing once above the new game (D-96). */
export type RefusedLoad = {
  readonly text: string;
  readonly role: "refused-load";
};

/** One sentence of the page: the result of a confirmation in its role, or a refused load. */
export type PageSentenceValue = ConfirmationNotice | RefusedLoad;

/**
 * One sentence of the page. A result in `positive` stands as a status and one in `warning` as an
 * alert, each with the class `confirmation-notice` and its role's class; a refused load stands as an
 * alert in `page-notice` (D-39).
 */
export function PageSentence({ notice }: { notice: PageSentenceValue }) {
  if (notice.role === "refused-load")
    return (
      <p className="page-notice" role="alert">
        {notice.text}
      </p>
    );
  return (
    <p
      className={`confirmation-notice ${notice.role}`}
      role={notice.role === "warning" ? "alert" : "status"}
    >
      {notice.text}
    </p>
  );
}

export type PageSentencesOptions = {
  /** The sentences that stand now, in the order they stand; none draws nothing. */
  sentences: readonly PageSentenceValue[];
};

export type PageSentences = {
  /** The host of the row, a block that holds the sentences and is empty where there are none. */
  element: HTMLElement;
  /** Draws the row anew from the list the page gives. */
  update(sentences: readonly PageSentenceValue[]): void;
  /** Unmounts the row and takes its host out of the page. */
  dispose(): void;
};

/** The row: each sentence in the order given. */
function SentencesView({
  sentences,
}: {
  sentences: readonly PageSentenceValue[];
}) {
  return (
    <>
      {sentences.map((notice, index) => (
        <PageSentence key={index} notice={notice} />
      ))}
    </>
  );
}

/**
 * Builds the row in an element of its own, for the page to place. The render is synchronous, so the
 * sentences stand in the element when this returns.
 */
export function createPageSentences(
  options: PageSentencesOptions,
): PageSentences {
  const element = document.createElement("div");
  element.className = "page-sentences";
  const root = createRoot(element);
  let disposed = false;
  function draw(sentences: readonly PageSentenceValue[]): void {
    flushSync(() => {
      root.render(<SentencesView sentences={sentences} />);
    });
  }
  draw(options.sentences);
  return {
    element,
    update(sentences: readonly PageSentenceValue[]): void {
      if (!disposed) draw(sentences);
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
