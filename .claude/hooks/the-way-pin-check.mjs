// SessionStart hook of Claude Code: warns the agent and the human when the submodule .the-way stands
// on another commit than the one this repository records for it, or is not initialized. It prints
// nothing when the two agree, and also where git is missing or the repository pins nothing. Where
// the check itself cannot run, because git fails inside the repository or this script fails, it
// says so instead of falling silent, since silence reads as agreement. It blocks nothing and always
// ends with exit code 0.
//
// The repository root is the place of this file, two directories up, so that a hook run from a
// working directory other than the root checks the same repository. The only commands run are the
// two read-only git commands below, started without a shell, with arguments written here and none
// read from the repository, and with the git variables of the caller that pick a repository
// removed, so that they cannot send the check to another one.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SUBMODULE = ".the-way";
const REPAIR = "git submodule update --init -- .the-way";
const GIT_TIMEOUT_MS = 15000;
const REASON_LIMIT = 200;
const PICKING_REPOSITORY = [
  "GIT_DIR",
  "GIT_WORK_TREE",
  "GIT_INDEX_FILE",
  "GIT_COMMON_DIR",
];

// The result of a git command: its trimmed output, or the failure it ended with.
function git(args) {
  const environment = { ...process.env };
  for (const name of PICKING_REPOSITORY) delete environment[name];
  try {
    const output = execFileSync("git", args, {
      env: environment,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: GIT_TIMEOUT_MS,
      windowsHide: true,
    });
    return { output: output.trim() };
  } catch (failure) {
    return { failure };
  }
}

// One short line saying why a git command or this script failed.
function reasonOf(failure) {
  if (failure?.code === "ETIMEDOUT") {
    return `git did not answer in ${GIT_TIMEOUT_MS / 1000} seconds`;
  }
  const text = String(failure?.stderr || failure?.message || failure)
    .split(/\r?\n/)
    .find((line) => line.trim() !== "");
  return (text ?? "unknown failure").trim().slice(0, REASON_LIMIT);
}

// The commit the repository records for the submodule, as { commit }; { silent } where there is
// nothing to compare with — no repository of its own, git missing, no gitlink; { problem } where
// git fails inside a repository.
function pinnedCommit(root) {
  if (!existsSync(join(root, ".git"))) return { silent: true };
  const listed = git(["-C", root, "ls-files", "--stage", "--", SUBMODULE]);
  if (listed.failure) {
    return listed.failure.code === "ENOENT"
      ? { silent: true }
      : { problem: reasonOf(listed.failure) };
  }
  const match = listed.output.match(
    /^160000 ([0-9a-f]{40,64}) \d\t\.the-way$/m,
  );
  return match ? { commit: match[1] } : { silent: true };
}

// The commit the submodule stands on, or null where it is not initialized or unreadable. The
// directory of an uninitialized submodule is empty, and git run in it finds the repository around
// it and answers with that repository's own commit, so a checkout counts only where it has a .git
// of its own.
function checkedOutCommit(root) {
  const directory = join(root, SUBMODULE);
  if (!existsSync(join(directory, ".git"))) return null;
  const head = git(["-C", directory, "rev-parse", "HEAD"]);
  return head.output && /^[0-9a-f]{40,64}$/.test(head.output)
    ? head.output
    : null;
}

function message(human, agent) {
  return {
    systemMessage: human.join("\n"),
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: agent.join("\n"),
    },
  };
}

function mismatchWarning(pinned, checkedOut) {
  const standing =
    checkedOut ?? "not initialized or unreadable (no checkout of its own)";
  return message(
    [
      "the-way: .the-way is not at the commit this repository pins.",
      `Pinned: ${pinned}`,
      `Checked out: ${standing}`,
      `Repair: ${REPAIR}`,
    ],
    [
      "WARNING from the SessionStart hook of this repository: the submodule .the-way is not at the " +
        "commit this repository pins, so the process of the-way would run on the wrong version.",
      `Pinned commit (git ls-files --stage -- .the-way): ${pinned}`,
      `Commit .the-way stands on (git -C .the-way rev-parse HEAD): ${standing}`,
      `Repair command: ${REPAIR}`,
      "Per AGENTS.md: if initialization fails or the commits differ, stop; never use another copy " +
        "or version of the-way. Tell the human before doing anything that uses the-way.",
    ],
  );
}

function unableWarning(reason) {
  return message(
    [
      "the-way: the check of .the-way could not run, so it is not known whether it is at the " +
        "pinned commit.",
      `Why: ${reason}`,
      `Once git works here again: ${REPAIR}`,
    ],
    [
      "WARNING from the SessionStart hook of this repository: its check of whether the submodule " +
        "the-way is at the commit this repository pins could not run, so nothing says that it is.",
      `Why: ${reason}`,
      "Per AGENTS.md, before use `git -C .the-way rev-parse HEAD` must show the commit " +
        "`git ls-files --stage -- .the-way` records; check it by hand, and if initialization " +
        "fails or the commits differ, stop. Tell the human before doing anything that uses the-way.",
      `Once git works here again, the repair command is: ${REPAIR}`,
    ],
  );
}

// What to print, or null for nothing.
function answer() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
  const pinned = pinnedCommit(root);
  if (pinned.silent) return null;
  if (pinned.problem) return unableWarning(pinned.problem);
  const checkedOut = checkedOutCommit(root);
  if (checkedOut === pinned.commit) return null;
  return mismatchWarning(pinned.commit, checkedOut);
}

function print(output) {
  process.stdout.write(JSON.stringify(output) + "\n");
}

try {
  const output = answer();
  if (output !== null) print(output);
} catch (failure) {
  // This script failed, which the hook tells instead of falling silent; where even that fails, the
  // session goes on with nothing printed, since a hook that fails would only disturb it.
  try {
    print(unableWarning(`the hook failed: ${reasonOf(failure)}`));
  } catch {
    // Nothing is left to tell it with.
  }
}
process.exitCode = 0;
