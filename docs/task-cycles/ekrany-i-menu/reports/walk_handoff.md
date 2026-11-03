# Handoff — the walk through the changed screens in a real browser (task `ekrany-i-menu`, plan slice 12)

You walk through the changed screens of the game in a real browser on this computer and take
screenshots of what a player sees. You write **no code, no test, no document of the product and no
commit**. The person who requested this cycle (Mariusz, the product's owner) has delegated every
intermediate choice to the orchestrator, who has delegated this stage to you. You ask no human
anything; a question or a defect goes back in your report.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`. Branch
  `task/ekrany-i-menu`, head `eeb145f` (all slices made). Process pin `.the-way` at
  `f45ca40724251a46965aed69f733d0a35c430048`.
- Your class of model: same as the orchestrator's (Sonnet 5.5): you judge what a screenshot shows.
- Screenshots go to `docs/task-cycles/ekrany-i-menu/screens/` (create it), one PNG per state, named
  `NN-short-name.png` in the order you take them; each at a size that stays readable (a window of about
  1280×800; the narrow and wide ones as the list below says). Report path:
  `docs/task-cycles/ekrany-i-menu/reports/walk.md`.

## How you operate the game

Read `.claude/skills/loop2-play/SKILL.md` whole and follow it: `npm run local` as a background command
and its line `Local game: https://127.0.0.1:…`, Playwright CLI (`playwright-cli --version` first; where it
fails, stop and report — installing it is the human's step; where only a command of the CLI fails, the
skill names Playwright MCP), an account made through the login card with a made-up address at
`example.test`. When you are done: `playwright-cli close`, `npm run local:stop` (check that its output says
a start was stopped), delete `.playwright-cli/`. Nothing of the walk stays in the repository: `git status`
must show no tracked or untracked file outside `.runs/` when you finish.

Do not run `npm test`.

## What to walk through (the plan's slice 12, copied word for word below, and more)

The plan's section is copied at the end of this file. In addition, because tests on a document imitation
cannot show them, look at and report each of these:

1. The menu „Konto”: opened by a click and by Enter; closed by Escape, by a click beside it and by a
   second click; focus back on „Konto” each time (read `document.activeElement`). A click on a text field
   elsewhere on the page while the menu is open: where does the focus go? (The author of the bar followed
   D-285 literally, so the field's focus is taken; say how it feels.) Where the block stands under
   „Konto” and whether it covers the content; whether it leaves the window at the right edge.
2. After a purchase of a branch rank on Postać with „Kup” (where a known tree can be reached by playing;
   if it cannot be reached, say so): where the focus stands.
3. On Programy: pick a program in the list and the address changes; type in the editor without leaving
   the field and press Back or a link of the bar: does the unsaved text commit to the program that was
   shown or go astray? Do the same with a deletion of the program shown.
4. Siedziba while a manual map run waits (paused, and after its end by death or completion where
   reachable): „Wyślij” and „Puść w pętlę” of the run's character are inactive with the sentence
   „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.” under
   the row's lines of sending; Postać with „Umiejętności” and the sentence „Przejście na mapie {mapa} jest
   niezakończone. Stopnie kupisz po jego zakończeniu.” where a tree is known. Programy beside the waiting
   run: „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” above the editor and no „Przełącz postać na
   ten program”; on the screen of the map run itself „Przełącz postać na ten program” stands.
5. The resurrection line on Siedziba and on Postać: its wording „Wskrzeszenie za … min czasu realnego —
   śmierć zabierze wprawę i wykupione stopnie” and that it changes with time while a map run waits (read it
   twice, a minute apart, where a death makes it appear).
6. The page's own sentence above the game (for example after a confirmed address, if you can reach it;
   otherwise say it was not reachable) and the rest of the list below.
7. Windows: 1920 wide and about 900 narrower than 1344 (for example 1000) — the bar and the content
   share one width (at most 1344 px, the whole window when narrower); the columns of Siedziba and of the
   screen of a map run rearrange below 720 px (try 640).

## What you report

`reports/walk.md` holds, for every state: the file name of its screenshot, what the screenshot shows (look
at it with the Read tool, which shows images, and describe what you see, never what the code should draw),
what you did to reach it, and the result — `as the task says`, `differs` (say how, quoting the task's words
or the decision), or `not reached` (say why). A **Defects** section lists each difference that a player
would call a fault (what, where, how to reproduce, screenshot), most serious first; a **Not reached**
section lists states you could not reach and why. A check you ran is a command with its exit code. Add
**Searches not found or unclear** (or `none`).

Return only: status (`done`, `done with concerns`, `blocked`), no commits, a one-line check result naming
what failed or did not run, and the report path.

---

## The plan's slice 12, word for word

### Slice 12 — The changed screens in a real browser

> Orchestrator's note (plan review): this slice changes no file, so it has no range for the mechanical
> check of step 9 and no commit to review. The orchestrator runs it as a walk after Slice 11, by a
> fresh agent that does not make code, with its report in `reports/walk.md` and its screenshots in
> `docs/task-cycles/ekrany-i-menu/screens/`, before the review of the whole change, so that the
> reviewer and the request have its evidence. A defect the walk finds goes to a fix by `make-change`
> on the class of the slice it comes from. Slice 12's *Depends on*, *Checks* and *Goal* below stand as the walk's brief.

- **Goal:** an agent goes through the changed screens in a real browser on this computer, as `.claude/skills/loop2-play/SKILL.md` gives (D-254), and takes screenshots for the request (To do item 18): the waiting screen with the bar holding the name alone; Siedziba with „Gdy cię nie było” where it can be reached, „Drużyna” and „Skrzynka”, the name as a link; Postać, with „Umiejętności” where a known tree can be reached by playing; Programy with the list and the panel, and with the sentence beside a waiting map run; Przejście; the menu „Konto” opened by a click and by Enter, closed by Escape, by a click beside it and by a second click, focus back on „Konto”; leaving a running map run through „Siedziba” and coming back through „Wróć do przejścia · … · minuta …”, the map run paused; a reload at each address; back and forward; the crafted fragments `#/postac/x`, `#/programy/-1` and a long fragment typed into the address; a window narrower than 1344 px and one wider; „Zakończ” leading to Postać. The screenshots go to `docs/task-cycles/ekrany-i-menu/screens/`, and the report lists what each shows and what failed. Nothing of the walk stays in the repository.
- **Change:** none
- **Read:** `.claude/skills/loop2-play/SKILL.md` · `docs/task-cycles/ekrany-i-menu/task.md:28-74` To do · `docs/task-cycles/ekrany-i-menu/task.md:154-159` Questions to settle
  `foundations/decisions.md:1433-1444` D-75 · `foundations/decisions.md:1604-1615` D-88 · `foundations/decisions.md:5126-5153` D-254
  Foundation entries rows E1, E12, E13
- **Model:** cheaper
- **Risk:** none
- **Checks:** `playwright-cli --version` first — where it fails, stop and report, since installing it is the human's step, and go on with Playwright MCP as the skill gives; `npm run local` in the background until its line „Local game: …”; the walk with `playwright-cli`; `playwright-cli close`; `npm run local:stop`
- **Depends on:** Slice 11

