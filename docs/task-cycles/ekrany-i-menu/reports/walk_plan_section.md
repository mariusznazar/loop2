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

