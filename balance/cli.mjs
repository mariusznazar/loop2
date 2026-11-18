// The command line of the balance instrument: `npm run balance -- <command> [flags]`, which builds
// the game and runs this file. The commands are `sweep`, `trace`, `loop`, `campaign` and `programs`;
// `node balance/cli.mjs help` lists the flags of each. A command prints its result on standard
// output, or writes it to the file the flag `--out` names; the instrument writes nothing else and
// nothing into the repository unless a flag names a path there (D-429). A command lays the
// overlays of `--overlay` on the game's data in memory before the measurement and restores them
// after it, so the data files stay as they are.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ITEMS } from "../dist/browser/sim/data/items.js";
import { MAPS } from "../dist/browser/sim/data/maps.js";
import { checkProgram } from "../dist/browser/sim/programs.js";
import { REFERENCE_PROGRAMS } from "../tests/sim/reference-programs.mjs";
import { campaignSweep, programsOf } from "./campaign.mjs";
import { describePrograms } from "./describe.mjs";
import { buildSkills, seedRange, sweep } from "./engine.mjs";
import { loopSweep } from "./loop.mjs";
import { applyOverlay, readOverlay } from "./overlay.mjs";
import { trace } from "./trace.mjs";

/** A refusal of what a person typed: its message is a sentence for them, with no stack. */
class UsageError extends Error {}

/** The seeds a command takes where `--seeds` names none. */
const DEFAULT_SEEDS = { text: "1-100", from: 1, to: 100 };
/** The seed of a trace where `--seeds` names none. */
const DEFAULT_TRACE_SEED = 1;

const MEASURE_FLAGS = [
  "map",
  "program",
  "seeds",
  "chest",
  "practice",
  "ranks",
  "overlay",
  "cap",
  "out",
];

/** What each command's flags are; a flag of another command is refused. */
const COMMAND_FLAGS = {
  sweep: MEASURE_FLAGS,
  trace: MEASURE_FLAGS,
  loop: [
    "map",
    "program",
    "seeds",
    "chest",
    "practice",
    "ranks",
    "overlay",
    "hours",
    "no-resurrection",
    "out",
  ],
  campaign: ["player", "seeds", "overlay", "out"],
  programs: ["out"],
};

/** The flags that stand alone, with no value after them. */
const SWITCH_FLAGS = ["no-resurrection"];

const USAGE = `npm run --silent balance -- <command> [flags]

commands and their flags
${Object.entries(COMMAND_FLAGS)
  .map(
    ([command, flags]) =>
      `  ${command}: ${flags.map((flag) => `--${flag}`).join(" ")}`,
  )
  .join("\n")}

--map         a map of the game, or one an overlay adds
--program     an identifier of the reference programs, or the path of a program file of the game's shape
--seeds       a range (1-500), a list (3,7,12) or both (1-5,9); default ${DEFAULT_SEEDS.text}
--chest       the pieces in the chest, as stick=8,berry=7
--practice    the practice of the character's skills, as smallItemGathering=80
--ranks       the bought ranks of the branches, as keenEye=3
--overlay     overlay files laid on the game's data for the measurement; repeat the flag or list them
--cap         game minutes after which a map run is given up
--hours       real hours of the loop's readings, as 8,24,72
--no-resurrection  start the loop with the team's resurrection spent
--player      a player description: an identifier of balance/players/ or a file
--out         a file for the result (a directory for programs); with it nothing is printed
`;

/** A positive whole or fractional number, or a refusal naming the flag. */
function positiveNumber(text, flag) {
  const value = Number(text);
  if (text.trim() === "" || !Number.isFinite(value) || value <= 0)
    throw new UsageError(`${flag}: "${text}" is no number above 0`);
  return value;
}

/** A whole number of `from` or more, or null where the text is none. */
function wholeNumber(text, from = 0) {
  return /^\d+$/.test(text) && Number(text) >= from ? Number(text) : null;
}

/**
 * Seeds from a range (`1-500`), a list (`3,7,12`), one number (`40`) or a list whose items are
 * ranges (`1-5,9`), in the order written.
 */
export function parseSeeds(text) {
  const seeds = [];
  for (const part of String(text).split(",")) {
    const [from, to, ...extra] = part.split("-");
    const start = wholeNumber(from);
    const end = to === undefined ? start : wholeNumber(to);
    if (start === null || end === null || extra.length > 0)
      throw new UsageError(
        `--seeds: "${part}" is no whole number or range of whole numbers`,
      );
    if (end < start)
      throw new UsageError(`--seeds: the range "${part}" runs backwards`);
    seeds.push(...seedRange(start, end));
  }
  return seeds;
}

/** Names with numbers from `stick=12,berry=3`; no text is no pair. `flag` names the flag in a refusal. */
export function parsePairs(text, flag = "pairs") {
  if (text === undefined || text === "") return {};
  const pairs = {};
  for (const pair of text.split(",")) {
    const [name, value, ...extra] = pair.split("=");
    const number = value === undefined || value === "" ? NaN : Number(value);
    if (
      name === "" ||
      extra.length > 0 ||
      !Number.isFinite(number) ||
      number < 0
    )
      throw new UsageError(
        `${flag}: pair "${pair}" is no name=number with a number of 0 or more`,
      );
    if (Object.hasOwn(pairs, name))
      throw new UsageError(`${flag}: pair "${name}" is given twice`);
    pairs[name] = number;
  }
  return pairs;
}

/** The real hours of the loop's readings from `8,24,72`. */
function parseHours(text) {
  return text.split(",").map((hours) => positiveNumber(hours, "--hours"));
}

/** The options a command reads, from the flags as typed. */
function readOptions(raw) {
  return {
    map: raw.map,
    program: raw.program,
    seeds: raw.seeds === undefined ? undefined : parseSeeds(raw.seeds),
    seedsText: raw.seeds,
    chest: parsePairs(raw.chest, "--chest"),
    practice: parsePairs(raw.practice, "--practice"),
    ranks: parsePairs(raw.ranks, "--ranks"),
    overlays: raw.overlay ?? [],
    cap: raw.cap === undefined ? undefined : positiveNumber(raw.cap, "--cap"),
    hours: raw.hours === undefined ? undefined : parseHours(raw.hours),
    resurrection: raw["no-resurrection"] !== true,
    player: raw.player,
    out: raw.out,
  };
}

/**
 * The command and the options of a command line (the arguments after the program's name). A word
 * that is no command, a flag that is none of the command's, a flag with no value or given twice
 * (the overlay excepted) and a value that is no number where one is due are refused.
 */
export function parseArgs(argv) {
  const [command, ...rest] = argv;
  if (command === undefined)
    throw new UsageError(
      `no command given; the commands are ${Object.keys(COMMAND_FLAGS).join(", ")}`,
    );
  if (["help", "--help", "-h"].includes(command))
    return { command: "help", options: {} };
  if (!Object.hasOwn(COMMAND_FLAGS, command))
    throw new UsageError(
      `unknown command ${command}; the commands are ${Object.keys(COMMAND_FLAGS).join(", ")}`,
    );
  const raw = {};
  for (let at = 0; at < rest.length; at += 1) {
    const word = rest[at];
    if (!word.startsWith("--"))
      throw new UsageError(`unexpected word ${word}; a flag starts with --`);
    const flag = word.slice(2);
    if (!COMMAND_FLAGS[command].includes(flag))
      throw new UsageError(`${word} is no flag of ${command}`);
    if (SWITCH_FLAGS.includes(flag)) {
      raw[flag] = true;
      continue;
    }
    const value = rest[at + 1];
    if (value === undefined || value.startsWith("--"))
      throw new UsageError(`${word} needs a value`);
    at += 1;
    if (flag === "overlay")
      raw.overlay = [...(raw.overlay ?? []), ...value.split(",")];
    else if (Object.hasOwn(raw, flag))
      throw new UsageError(`${word} is given twice`);
    else raw[flag] = value;
  }
  return { command, options: readOptions(raw) };
}

/** `value`, or a refusal naming the flag that was due. */
function required(value, flag) {
  if (value === undefined) throw new UsageError(`${flag} is needed`);
  return value;
}

/** The program a `--program` text names: a reference program by identifier, or a program file. */
function loadProgram(text) {
  if (Object.hasOwn(REFERENCE_PROGRAMS, text)) return REFERENCE_PROGRAMS[text];
  if (!existsSync(text))
    throw new UsageError(
      `--program: ${text} is no reference program (the programs command lists them) and no file`,
    );
  try {
    return checkProgram(JSON.parse(readFileSync(text, "utf8")), null);
  } catch (error) {
    throw new UsageError(
      `--program: ${text} is no program of the game: ${error.message}`,
    );
  }
}

/** The measurement the flags of sweep, trace and loop describe, checked against the data in memory. */
function measurementOf(options) {
  const mapId = required(options.map, "--map");
  if (!Object.hasOwn(MAPS, mapId))
    throw new UsageError(
      `--map: no map ${mapId} in the game's data or in the overlays given`,
    );
  const program = loadProgram(required(options.program, "--program"));
  const chest = options.chest ?? {};
  for (const item of Object.keys(chest))
    if (!Object.hasOwn(ITEMS, item))
      throw new UsageError(`--chest: no item ${item} in the game's data`);
  let skills;
  try {
    skills = buildSkills({ practice: options.practice, ranks: options.ranks });
  } catch (error) {
    throw new UsageError(`--practice or --ranks: ${error.message}`);
  }
  return { mapId, program, chest, skills };
}

/** The fields of the header every measurement's result starts with, as the flags gave them. */
function headerOf(command, options) {
  return {
    command,
    map: options.map,
    program: options.program,
    seeds: options.seedsText ?? DEFAULT_SEEDS.text,
    chest: options.chest,
    skills: { practice: options.practice, ranks: options.ranks },
    overlays: options.overlays,
    cap: options.cap ?? null,
  };
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

/** The result as it leaves: printed, or in the one file `--out` names with `whole` in it. */
function delivered(options, printed, whole = printed) {
  if (options.out === undefined) return { printed, files: [] };
  return { printed: "", files: [{ path: options.out, content: whole }] };
}

function seedsOf(options) {
  return options.seeds ?? seedRange(DEFAULT_SEEDS.from, DEFAULT_SEEDS.to);
}

function runSweep(options) {
  const { mapId, program, chest, skills } = measurementOf(options);
  const { summary, results } = sweep({
    mapId,
    program,
    seeds: seedsOf(options),
    skills,
    chest,
    capMinutes: options.cap,
  });
  const header = headerOf("sweep", options);
  return delivered(
    options,
    json({ header, summary }),
    json({ header, summary, results }),
  );
}

function runTrace(options) {
  const { mapId, program, chest, skills } = measurementOf(options);
  const seeds = options.seeds ?? [DEFAULT_TRACE_SEED];
  if (seeds.length !== 1)
    throw new UsageError(
      `a trace takes one seed; --seeds gave ${seeds.length}`,
    );
  const traced = trace({
    mapId,
    program,
    seed: seeds[0],
    skills,
    chest,
    capMinutes: options.cap,
  });
  const cause = traced.cause === null ? "" : `, cause ${traced.cause}`;
  const end = `end: ${traced.outcome} at minute ${traced.minute}${cause}`;
  return delivered(options, `${[...traced.lines, end].join("\n")}\n`);
}

function runLoop(options) {
  const { mapId, program, chest, skills } = measurementOf(options);
  const { perCheckpoint, runs } = loopSweep({
    mapId,
    program,
    seeds: seedsOf(options),
    skills,
    chest,
    checkpoints: options.hours,
    resurrectionReady: options.resurrection,
  });
  const header = {
    ...headerOf("loop", options),
    hours: options.hours ?? null,
    resurrection: options.resurrection,
  };
  return delivered(
    options,
    json({ header, perCheckpoint }),
    json({ header, perCheckpoint, runs }),
  );
}

/** The player description a `--player` text names: an identifier of `balance/players/`, or a file. */
function loadPlayer(text) {
  const named = fileURLToPath(
    new URL(`./players/${text}.json`, import.meta.url),
  );
  const file = /^[\w-]+$/.test(text) && existsSync(named) ? named : text;
  if (!existsSync(file))
    throw new UsageError(
      `--player: ${text} is no player of the instrument and no file`,
    );
  return JSON.parse(readFileSync(file, "utf8"));
}

function runCampaign(options) {
  const player = loadPlayer(required(options.player, "--player"));
  const { summary, logs } = campaignSweep({
    player,
    programs: programsOf(player, REFERENCE_PROGRAMS),
    seeds: seedsOf(options),
  });
  const header = {
    command: "campaign",
    player: player.name ?? options.player,
    seeds: options.seedsText ?? DEFAULT_SEEDS.text,
    overlays: options.overlays,
  };
  return delivered(
    options,
    json({ header, summary }),
    json({ header, summary, logs }),
  );
}

function runPrograms(options) {
  const words = describePrograms(REFERENCE_PROGRAMS);
  if (options.out === undefined) return { printed: words, files: [] };
  const files = Object.entries(REFERENCE_PROGRAMS).map(([id, program]) => ({
    path: path.join(options.out, `${id}.json`),
    content: json(program),
  }));
  files.push({ path: path.join(options.out, "programs.md"), content: words });
  return { printed: "", files };
}

const COMMANDS = {
  sweep: runSweep,
  trace: runTrace,
  loop: runLoop,
  campaign: runCampaign,
  programs: runPrograms,
};

/** Lays the overlay files on the game's data in order, runs `work`, and restores the data in reverse. */
function withOverlays(files, work) {
  const restores = [];
  try {
    for (const file of files) {
      let overlay;
      try {
        overlay = readOverlay(file);
      } catch (error) {
        throw new UsageError(
          `--overlay: ${file} cannot be read: ${error.message}`,
        );
      }
      restores.push(applyOverlay(overlay));
    }
    return work();
  } finally {
    for (const restore of restores.reverse()) restore();
  }
}

/**
 * Runs one command on its options, with the overlays laid for its time. Gives what is to be printed
 * and the files to be written, `{ printed, files: [{ path, content }] }`, and does neither itself:
 * a result goes to a file only where `--out` named one.
 */
export function runCommand(command, options) {
  if (!Object.hasOwn(COMMANDS, command))
    throw new UsageError(`unknown command ${command}`);
  return withOverlays(options.overlays ?? [], () => COMMANDS[command](options));
}

function main(argv) {
  const { command, options } = parseArgs(argv);
  if (command === "help") {
    process.stdout.write(USAGE);
    return;
  }
  const { printed, files } = runCommand(command, options);
  for (const file of files) {
    mkdirSync(path.dirname(file.path), { recursive: true });
    writeFileSync(file.path, file.content, "utf8");
  }
  process.stdout.write(printed);
  if (files.length > 0)
    process.stderr.write(
      `wrote ${files.length} file${files.length === 1 ? "" : "s"}, the first ${files[0].path}\n`,
    );
}

/** True where this file is the program node was started with, not a module another file imports. */
function isEntryPoint() {
  return (
    process.argv[1] !== undefined &&
    realpathSync.native(process.argv[1]) ===
      realpathSync.native(fileURLToPath(import.meta.url))
  );
}

if (isEntryPoint()) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    if (!(error instanceof UsageError)) throw error;
    process.stderr.write(`balance: ${error.message}\n`);
    process.exitCode = 1;
  }
}
