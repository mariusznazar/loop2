// The one way the server and its commands write a log line (D-252): one JSON
// object on one line, through `console`, so a value cannot break a line and a
// search finds a field under one name. A failure names what failed, the kind
// and code of the original error and the place in the code; an event names
// what happened. Fields are a closed list, so no object reaches a line.
//
// Of an error a line reads its `name`, its `code` and SQLite's `errcode`, each
// only in a form that holds no sentence. Its `message`, its `stack` and every
// other field stay out: they quote values, SQLite's message a stored address
// and a library's the server's reply, and that rule prevails (D-252).

export type LineFields = {
  readonly accountId?: string;
  readonly linkPurpose?: string;
  readonly listen?: string;
};

const kindWord = /^[A-Z][A-Za-z0-9]{0,63}$/;
const codeWord = /^[A-Z][A-Z0-9_]{0,63}$/;

// A failure no library's error stands behind: its code names the reason.
export class ReasonedFailure extends Error {
  readonly code: string;

  constructor(code: string, message: string = code) {
    super(message);
    this.name = "ReasonedFailure";
    this.code = code;
  }
}

function errorFields(error: unknown) {
  if (!(error instanceof Error)) return { kind: "none", code: "none" };
  const { name, code, errcode } = error as {
    name?: unknown;
    code?: unknown;
    errcode?: unknown;
  };
  return {
    kind: typeof name === "string" && kindWord.test(name) ? name : "none",
    code: typeof code === "string" && codeWord.test(code) ? code : "none",
    // Every SQLite error has one `code`; this number tells them apart.
    errcode: Number.isSafeInteger(errcode) ? errcode : undefined,
  };
}

export function writeFailure(
  failure: string,
  place: string,
  error: unknown,
  fields: LineFields = {},
): void {
  console.error(
    JSON.stringify({ failure, ...errorFields(error), place, ...fields }),
  );
}

export function writeEvent(event: string, fields: LineFields = {}): void {
  console.log(JSON.stringify({ event, ...fields }));
}

// What no code handled, a rejection included, as the process ends: its default
// print would write the error's message and stack, which may quote values
// (D-253). The exit code is the one Node.js gives such an end.
export function installLastResort(place: string): void {
  process.on("uncaughtException", (error) => {
    writeFailure("uncaught", place, error);
    process.exit(1);
  });
}
