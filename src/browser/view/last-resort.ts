/**
 * The last-resort handling of the browser (D-323, D-253): what no code of the game handled — an
 * error thrown out of an event handler, a timer or a render, and a promise rejected with no
 * handler — reaches the window, and this module cancels it, so that the browser prints nothing
 * itself, and writes one line of its own in the console: plain text with the kind and code of the
 * error and the place that handled it, never its message or its stack, which may quote what a save
 * or a request holds (D-252). A line written once is not written again until the page is
 * reloaded, so an error that comes back at every tick or every save leaves one line. Nothing here
 * runs when the module is imported.
 */

/** The one sentence the player reads at an error nothing handled, in the role `warning` (D-323). */
export const FAILURE_SENTENCE = "Coś w grze się zepsuło — odśwież stronę.";

/** What of an error may stand in a console line; its message may quote what a save holds. */
const LINE_WORD = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;

const PLACE = "view/last-resort.installLastResort";

/** A word of a console line: the value where it is one plain word, else `none`. */
function lineWord(value: unknown): string {
  return typeof value === "string" && LINE_WORD.test(value) ? value : "none";
}

/** The kind and the code of an error as the words of a console line; anything but an `Error` has none. */
export function errorWords(error: unknown): { kind: string; code: string } {
  const { name, code } = (error instanceof Error ? error : {}) as {
    name?: unknown;
    code?: unknown;
  };
  return { kind: lineWord(name), code: lineWord(code) };
}

export type LastResortOptions = {
  /** The window whose `error` and `unhandledrejection` events this handles. */
  readonly target: Window;
  /** Called at every error nothing handled, after its line; the page has to take it once. */
  onUncaught(): void;
};

export type LastResort = {
  /**
   * Handles an error that came by another way than the window, such as the handling of a root of
   * React that has its own, at `place`: writes its line, unless the same line was written, and
   * tells the page.
   */
  report(error: unknown, place: string): void;
  /** Stops listening to the window; the lines already written stay counted. */
  remove(): void;
};

/**
 * Listens to the window's `error` and `unhandledrejection`: each event is cancelled, its error
 * written as a line of `uncaught kind=… code=… place=…` once, and `onUncaught` called.
 */
export function installLastResort(options: LastResortOptions): LastResort {
  const { target } = options;
  const written = new Set<string>();

  function report(error: unknown, place: string): void {
    const { kind, code } = errorWords(error);
    const line = `uncaught kind=${kind} code=${code} place=${place}`;
    if (!written.has(line)) {
      written.add(line);
      console.error(line);
    }
    options.onUncaught();
  }

  const onError = (event: ErrorEvent): void => {
    event.preventDefault();
    report(event.error, PLACE);
  };
  const onRejection = (event: PromiseRejectionEvent): void => {
    event.preventDefault();
    report(event.reason, PLACE);
  };
  target.addEventListener("error", onError);
  target.addEventListener("unhandledrejection", onRejection);
  return {
    report,
    remove(): void {
      target.removeEventListener("error", onError);
      target.removeEventListener("unhandledrejection", onRejection);
    },
  };
}
