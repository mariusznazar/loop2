// What the scripts of this skill share for their command line: a refusal ends a script with a
// message and exit code 1, and the options of a command are read by a table.

/** An input or a request the script refuses; its message is printed and the exit code is 1. */
export class Refusal extends Error {}

/** Runs the body of a script; a refusal is printed as `error: ...`, any other error is the runtime's. */
export async function runCli(main) {
  try {
    await main(process.argv.slice(2));
  } catch (error) {
    if (!(error instanceof Refusal)) throw error;
    console.error(`error: ${error.message}`);
    process.exitCode = 1;
  }
}

/**
 * Splits `argv` into positional words and options. `kinds` maps each option name (without the
 * dashes) to "value" (one value, the last wins), "list" (repeatable) or "flag".
 */
export function parseArgs(argv, kinds) {
  const positional = [];
  const options = {};
  for (let at = 0; at < argv.length; at++) {
    const word = argv[at];
    if (!word.startsWith("--")) {
      positional.push(word);
      continue;
    }
    const name = word.slice(2);
    const kind = kinds[name];
    if (kind === undefined) throw new Refusal(`unknown option ${word}`);
    if (kind === "flag") {
      options[name] = true;
      continue;
    }
    at++;
    if (at >= argv.length) throw new Refusal(`option ${word} needs a value`);
    if (kind === "list") (options[name] ??= []).push(argv[at]);
    else options[name] = argv[at];
  }
  return { positional, options };
}

/** Reads "3,4" or "672x304" style text as a list of `count` whole non-negative numbers. */
export function parseNumbers(text, count, separator, what) {
  const parts = text.split(separator);
  const numbers = parts.map((part) =>
    /^\d+$/.test(part) ? Number(part) : NaN,
  );
  if (parts.length !== count || numbers.some((n) => !Number.isSafeInteger(n)))
    throw new Refusal(
      `${what} must be ${count} whole numbers joined by "${separator}", got "${text}"`,
    );
  return numbers;
}
