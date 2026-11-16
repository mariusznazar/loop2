// SessionStart hook of Claude Code: warns the agent and the human when the submodule .the-way stands
// on another commit than the one this repository records for it, or is not initialized. It prints
// nothing when the two agree, blocks nothing and always ends with exit code 0.
//
// The repository root is the place of this file, two directories up, so a session started in a
// subdirectory still checks the same repository. The only commands run are the two read-only git
// commands below, started without a shell, with arguments written here and none read from the
// repository.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SUBMODULE = ".the-way";
const REPAIR = "git submodule update --init -- .the-way";

// The output of a git command, trimmed, or null where git is missing or the command fails.
function git(args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 15000,
      windowsHide: true,
    }).trim();
  } catch {
    return null;
  }
}

// The commit the repository records for the submodule, or null where it records none or cannot be
// read.
function pinnedCommit(root) {
  const listed = git(["-C", root, "ls-files", "--stage", "--", SUBMODULE]);
  const match = listed?.match(/^160000 ([0-9a-f]{40,64}) \d\t\.the-way$/m);
  return match ? match[1] : null;
}

// The commit the submodule stands on, or null where it is not initialized. The directory of an
// uninitialized submodule is empty, and git run in it finds the repository around it and answers
// with that repository's own commit, so a checkout counts only where it has a .git of its own.
function checkedOutCommit(root) {
  const directory = join(root, SUBMODULE);
  if (!existsSync(join(directory, ".git"))) return null;
  const commit = git(["-C", directory, "rev-parse", "HEAD"]);
  return commit && /^[0-9a-f]{40,64}$/.test(commit) ? commit : null;
}

function warning(pinned, checkedOut) {
  const standing = checkedOut ?? "not initialized (no checkout of its own)";
  const human = [
    "the-way: .the-way is not at the commit this repository pins.",
    `Pinned: ${pinned}`,
    `Checked out: ${standing}`,
    `Repair: ${REPAIR}`,
  ].join("\n");
  const agent = [
    "WARNING from the SessionStart hook of this repository: the submodule .the-way is not at the " +
      "commit this repository pins, so the process of the-way would run on the wrong version.",
    `Pinned commit (git ls-files --stage -- .the-way): ${pinned}`,
    `Commit .the-way stands on (git -C .the-way rev-parse HEAD): ${standing}`,
    `Repair command: ${REPAIR}`,
    "Per AGENTS.md: if initialization fails or the commits differ, stop; never use another copy " +
      "or version of the-way. Tell the human before doing anything that uses the-way.",
  ].join("\n");
  return {
    systemMessage: human,
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: agent,
    },
  };
}

function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
  const pinned = pinnedCommit(root);
  if (pinned === null) return;
  const checkedOut = checkedOutCommit(root);
  if (checkedOut === pinned) return;
  process.stdout.write(JSON.stringify(warning(pinned, checkedOut)) + "\n");
}

try {
  main();
} catch {
  // A hook that fails would only disturb the session; saying nothing is the safe end.
}
process.exitCode = 0;
