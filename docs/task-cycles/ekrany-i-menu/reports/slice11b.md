# Slice 11b report — Documents that describe the old page

Status: `done with concerns` (two questions below; neither blocks the commit).
Worktree: `C:/Storage/repos/loop2-wt/ekrany-i-menu`, branch `task/ekrany-i-menu`.
Start head: `d034bbf`. Commit: `f9eff8c`.

## What changed and why

| File | Lines | Change |
|---|---|---|
| `README.md` | 76 | The browser-check sentence now says the page shows the screen Siedziba and „Wyloguj” in the menu „Konto”, and that a send leads to the screen of the map run. |
| `.claude/skills/loop2-deploy/references/setup_and_secrets.md` | 329–331 | „Create the account” now says the logout stands in the menu „Konto” (was: the header). „Reload” now says it applies at the address with no fragment. |
| `.agents/skills/loop2-deploy/references/setup_and_secrets.md` | 329–331 | Identical edit to the `.claude` copy. `cmp` exit 0. |
| `tests/sim/death.test.mjs` | 263 | Comment only: „at the headquarters” → „the chest the screen Siedziba shows after the end”. No code, assertion or title changed. |

Diff size: 4 files, 12 insertions, 10 deletions (the two skill copies 9 lines each, README 2 lines, test comment 2 lines).

Sources used (only these, per the handoff): D-96, D-97, D-280 and D-53 (`foundations/decisions.md`), D-157 read and found to say nothing about sending or reloading (no sentence changed from it). Task passage `task.md:30-39` as named, plus `task.md:53` (see reaches).

## Commits

- `f9eff8c` docs: :memo: say in the README and the loop2-deploy skill that an account opens the headquarters and Wyloguj stands in the menu Konto

## Checks (command → exit code)

- `cmp .claude/skills/loop2-deploy/references/setup_and_secrets.md .agents/skills/loop2-deploy/references/setup_and_secrets.md` → 0
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` → 0 (5 tests OK)
- `npm test -- tests/sim/death.test.mjs` → 0 (26 pass, 0 fail)
- `npm test -- tests/quality/test_quality_invariants.py` → 0 (5 tests OK)
- `python -B .the-way/elements/common/foundation_check.py` → 1. The one error is `tests/view/character-screen.test.mjs:120`: the invariant reference `resurrection-renewal` cites no identifier. That file and line are not in this slice; the same line is identical at `d034bbf`, so the failure predates this slice and this change did not cause it. Nothing from this change is reported.

Not run: `npm test` without a file argument (the full gate, as the handoff forbids); the orchestrator runs it.

## Own-work check (section 3)

Requirement most likely missed: the two skill copies must stay byte-identical, and the death edit must change only the comment.
- Check: `cmp` on the two copies → exit 0. `git show f9eff8c -- tests/sim/death.test.mjs` shows one comment line changed, no code.
- Second requirement: no fact in the new text that the named decisions do not give. Checked each new sentence against D-96 (account → Siedziba; reload at no fragment → Siedziba or the map run), D-97 („Wyloguj” in the menu „Konto”), D-280 (menu bar, screen of a map run, the screen Siedziba), and `task.md:53` (send leads to the screen of the map run).

Test-first: not applied. The edits are prose and a comment; the existing deploy-skill test covers the copies' identity and the byte-equality of the two files; I ran it once, after the edit (exit 0), and did not run it before the edit.

## Reaches beyond the handoff

- `task.md:53` (under item 6): „Wysłanie postaci prowadzi na ten ekran.” This is the only source I found for the send destination. The handoff's passage (`task.md:30-39`) does not contain it, and D-53 only says the player sends from the headquarters. I used it for the README sentence because the handoff goal states that a send leads to the screen of the map run.
- `foundations/glossary.md` `headquarters` entry (line 87): „The headquarters is the screen Siedziba, which shows the player's team with its characters and its chest.” This is the basis for the death-test comment wording.
- `src/browser/sim/game.ts:396` (`end`): confirmed that `end` drops the run and leaves the team unchanged, which is what the comment's assertion checks.
- `guidelines/coding.md` and `guidelines/testing.md`: read the first 150 lines of each; they set Prettier and ESLint rules for test files. No rule was changed or needed a change for a comment edit (the quality test passed).
- `foundations/part_map.md:84-133`: not read. The handoff lists it; this docs-only change edits no file that a part's trust boundary names, and the handoff states no trust boundary. Flag it if the orchestrator wants it checked.
- `ui_check.md`: not read. The change alters text, not what a screen shows.

## Choices made beyond the handoff

1. README: I dropped the clause „panel „Program”, siedzibę i stopkę z wzmiankami” and the clause „wiersz stanu z minutą rosnącą co sekundę oraz panel terenu z listą kafelków”. The named decisions give no fact about the footer („stopka”), and they do not say where the status row and the terrain panel stand. Rejected alternative: keep both clauses unchanged — it would leave the old page's header and program panel described as current, which D-280 and D-96 contradict. Cost if wrong: a browser check loses a visible cue until restored. See question 1.
2. Skill: the phrase for the logout changed from „the header shows the logout button” to „the logout button „Wyloguj” stands in the menu „Konto””. The word „header” appears nowhere else in these lines.
3. Skill: „Reload” now says „at the address with no fragment”. The text otherwise already matched D-96.
4. Skill line 334 („the same session still reaches the headquarters”) was kept. It is still true for the test account (no map run), and „headquarters” is the glossary's term for the screen Siedziba. Rejected: rewriting it to „the screen Siedziba”, which would change a line the handoff said to keep when it was still correct.
5. Death comment: the new wording names the chest on the screen Siedziba after the end, which is what the glossary entry and the assertion support. Rejected: „at the headquarters after the end” — it reads the same and is still true, but the handoff asks for the glossary term used exactly.
6. One commit for all four files, since the slice is one change.

## Searches not found or unclear

- Where a send leads: not in any named decision. Found only at `task.md:53`. Not found in D-53, D-96, D-97, D-280 or D-157.
- Whether the status row and terrain panel stand on the screen of a map run: not found in the named decisions or task passage. See question 1.
- The footer („stopka”) and any footer wording on signed-in screens: not found in the named decisions.
- Stale line outside this slice: `.claude/skills/loop2-deploy/references/setup_and_secrets.md:328` (and the `.agents` copy, same line) reads „the page shows the login card alone, on „Zaloguj się”, and no game or Program panel.” The phrase „Program panel” is not in the named decisions as a current element. Outside 329–334, so unchanged per the handoff. See question 2.

## Questions

1. Should the browser check in `README.md:76` (and the skill's bullets) say that the screen of the map run shows the status row with the minute and the terrain panel with the tile list? I left both out because no named decision places them. Recommendation: leave them out until the task (or D-280's wording of the map run screen) says where they stand; restoring them is a one-line edit.
2. Should `setup_and_secrets.md:328` (both copies) drop „and no game or Program panel”, since Programy is now a screen of its own and the task passage does not name a program panel on the signed-out page? Recommendation: yes, as a follow-up slice, because it is outside this slice's lines and the handoff says to keep the other lines as they are.
