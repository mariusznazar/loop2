# Handoff — reconciliation with the target branch (merge of origin/main)

You are the one author, resumed. Worktree `the worktree's root`, branch
`task/spokojniejszy-wyglad`, head `1355b9106713cdc3f162bc53b2b6255dca82e982`.

## State

The orchestrator started `git merge origin/main --no-commit --no-ff`; it is **in progress, uncommitted**,
with three conflicts: `src/browser/view/credit-lines.ts` (your rename of `footer.ts`),
`src/browser/view/credits-section.tsx`, `tests/view/icons.test.mjs`. `origin/main` (01418389) brought in
PR #77, the task `zbieranie-jako-widowisko` (task 17): it added `PACK_CREDITS` in `src/browser/view/credits.ts`
and a row for the pack Smoke & Fire Animated Particle [16x16] to the footer's credits (`footerCredits()` now
returns the icons' lines and then one line per pack, with a `sourceSite` field), with tests, and foundation
text (for example an invariant `sprite-credits` and entries D-271 and others) that may speak of the footer.

## What the frozen task says about it (word for word, *To do* 2)

"Wiersze wzmianek o paczkach obrazków — o paczce z wilkiem, którą przynosi zadanie 20, i o paczce Smoke & Fire
Animated Particle [16x16], którą przynosi zadanie 17 — stoją tam, gdzie D-27 stawia wzmianki w chwili cyklu
danego zadania. Jeśli któreś z tych zadań wejdzie przed tym zadaniem, to zadanie przenosi jego wiersz ze
stopki do sekcji w Siedzibie razem z resztą wzmianek; jeśli wejdzie po nim, dopisuje swój wiersz od razu do
zwiniętych sekcji w Siedzibie i na karcie logowania."
And *Out of scope*: the rows of the packs and their content are brought by tasks 20 and 17; this task only
moves the rows it finds in the footer. Frozen task: `.runs/task-cycles/spokojniejszy-wyglad/task.md`.

## What you do

1. Resolve the three conflicts so that: there is no footer and no `createFooter`; the one function
   `creditLines()` (your name) returns the icons' lines and then the pack lines, with the type's new
   `sourceSite` field and the pack literal strings as task 17 wrote them; both sections (login card and Siedziba)
   show the pack row through `CreditsSection` (`credit.sourceSite` as the link text). Task 17's tests of the pack
   row (its text `Kurz: „Smoke & Fire Animated Particle [16x16]”, KnoblePersona, opengameart.org, CC BY 3.0,
   zmienione (przekolorowane)` and its two links) are kept, turned from footer tests into tests of the section's
   markup, with the same literals, as you did with the other footer cases; no assertion weakened.
2. Search the whole merged tree for what the merge makes untrue: every remaining `footer`/"stopka" in code, tests,
   `foundations/` (decisions, invariants, environment facts, glossary, part map), `guidelines/`, `README.md`
   — particularly what task 17 wrote about where the pack's credit stands (`sprite-credits`, D-271 and the like).
   Where an entry says the footer holds a pack credit, correct it to the section on the login card and Siedziba,
   through the skill of the element, as the task gives for D-27 and `icon-credits`; where it is a sentence only the
   task 17's cycle may own (its own settlement), make the smallest correction that makes it true and name it in
   your report. Also `tests/invariants/test_icon_credits.py` and any test for `sprite-credits`.
3. Run the affected checks again, with commands and exit codes: `npm run typecheck`, `npm run build`,
   `node --test "tests/view/**/*.test.mjs" "tests/sim/**/*.test.mjs"`, the invariant tests of credits
   (`npm test -- tests/invariants/test_icon_credits.py` and the one of `sprite-credits`),
   `python -B .the-way/elements/common/foundation_check.py`. Not the full `npm test`.
4. Finish the merge: `git add` the resolved files by path and `git commit` (merge commit; message in English, in
   the repository's form, e.g. `Merge origin/main into task/spokojniejszy-wyglad: ...`). Do not push.

Report: `.runs/task-cycles/spokojniejszy-wyglad/reports/merge-report.md` — the commits, each conflict and
how you resolved it, each place of step 2 found and what you did, your checks with exit codes, own-work check,
**Unread material**, **Searches not found or unclear** (`none` where none). Return status, commits, a one-line
check result and the path.
