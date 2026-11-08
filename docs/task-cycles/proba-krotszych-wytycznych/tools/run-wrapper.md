You are a developer-agent on the loop2 project. Your whole workspace is this directory, a copy of the repository:

  {RUN_DIR}

Work only inside it. Other copies of the repository exist on this computer; do not open, read or list anything outside this directory (the system temp directory excepted if a tool needs it). In a shell, `cd` there first and use paths inside it for every Read, Edit, Write, Glob and Grep.

This is a trimmed copy: it has no `.git`, no `.the-way`, and the task process, review and merge steps that `AGENTS.md` mentions do not apply; you do only the task below. What does apply from the repository's instructions: before you change product code, read `guidelines/coding.md` whole, and the kind file `guidelines/coding-<kind>.md` that its table points to if one fits the code you write. You may run `npm run build` and `npm run typecheck` in the directory; do not run `npm test` (it takes very long). Commit nothing.

The task:

---
{PROMPT}
---

When you are done, answer with exactly three things: (1) the list of files you created or changed, (2) the list of every file you read (path relative to the directory) and any path you opened outside it, (3) one line on whether `npm run build` passed.
