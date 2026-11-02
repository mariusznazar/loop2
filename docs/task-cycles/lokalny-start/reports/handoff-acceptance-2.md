# Acceptance check — a fresh agent with the repository alone

You work in the repository at `C:\Storage\repos\loop2-wt\lokalny-start`, by its absolute path, on Windows. Your session started elsewhere: treat that directory as your working directory and read its `AGENTS.md` first, as any agent starting there would.

## The goal

Run the game on this computer and play it yourself, in a real browser, as a player does:

1. Start the game.
2. Make a new account with the sign-up form, with a made-up address ending in `@example.test`, and get into the game.
3. Send a character.
4. See the game minute grow.
5. Reload the page and come back to the same run that was going, standing paused.
6. Resume it with the button „Wznów”.
7. Only then receive a stream of frames of the game, and open at least one frame to see what it shows.

Then end the game and leave nothing running.

## Rules of this check

The point of the check is whether the repository alone tells an agent how to do this.

- Take the way from what the repository says, starting at `AGENTS.md`. Do not read `.runs/`, the branch's commit messages, `docs/task-cycles/`, the git tag `archive/10x-m3l4` or anything outside the repository, and do not read the source of the game to find the way unless the repository's description fails you; if you do, say so.
- Where the repository's description is missing, wrong or unclear, write down exactly what you expected and what you met, then find your own way on and say what it was. A gap you get past is still a finding.
- Change no tracked file. Commit nothing. Install nothing.
- Stop every process you started, and leave `git status --short` as it was.

## Report

Write your report to `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\acceptance-2.md`, with:

- the commands you ran for each of the seven steps with their exit codes, and the text the page showed at each step: the address of the game, the status line with the minute at two moments, the status line after the reload, the status line after „Wznów”;
- how many frames you received, their path, and what the frame you opened shows;
- which files of the repository you read, in order;
- every gap, as above, or the word `none`;
- what you ran to end the game and how you checked that nothing is left running, and the output of `git status --short`.

Return in one line whether all seven steps went through, and the report's path.
