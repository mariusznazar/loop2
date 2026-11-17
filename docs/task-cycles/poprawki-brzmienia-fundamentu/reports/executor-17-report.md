# Report - executor of slice 17

**Status:** done

**Commit:** `bcc35f33` (on `task/poprawki-brzmienia-fundamentu`, base `c37e2d4e`)

**Files changed** (21 added, 23 removed): `guidelines/styleguide-browser-view.md` (+11/-14, one more line pair in the same hunks, 33 lines touched in all), `src/browser/program-panel.css`, `security-notes.md`.

## Items

- To do 6.1 - made. In "States of shared controls": the sentence "Formularz stawia pod swoim przyciskiem jedno zdanie w `warning` (...)" now goes on: after an error no code of the game handled, the login card has a second sentence in `warning` under the form, „Coś w grze się zepsuło — odśwież stronę.” (D-323). D-323 added to the rule's *Decision* list.
- To do 6.2 - made. "z dwoma rodzajami ..." became "z trzema rodzajami dołożonymi później: grubością belki i linii zakładki (2026-11-02), wyglądem sceny (2026-11-11) oraz kolorami trzech chwil sceny (2026-11-12):".
- To do 7.13 (styleguide part) - made. In the rule "A name typed by the player breaks in its row" the paragraph that listed today's places (row of the party, "Kto idzie", headings, Programy, menu "Konto", the list of accounts, the sentences) is replaced by one sentence, "Dotyczy to także zdania, które taką nazwę albo taki adres wymienia.", and the exception of the native `select` stays without the list of its places. "adres konta" moved into the opening sentence's "such as" so the kinds of text are not lost. The Good line (examples of uses) is unchanged. The other two entries of 7.13 (D-04, D-57, D-367, tests) are not in this slice.
- To do 7.13 (`src/browser/program-panel.css`) - made. The two comments over `.copy-line` are one: it names the two lines (the changes of the copy not yet saved; the changes of its program that the copy lacks), says that the second names the program, a name typed by the player, so it breaks inside its row (styleguide rule), and that `min-width: 0` lets it, an item of the row `.copy-save`, shrink below its longest word. The old first comment said "something that will be lost or replaced"; the old second said "the line names the program", which is true only of the second line (the first, "Niezapisane zmiany w kopii.", names none). Checked against `src/browser/view/program-panel.tsx` and `copyLacksSentence` in `src/browser/view/end-question.tsx`.
- To do 8.1 - made. `security-notes.md`, "GitHub account": names the second ruleset `main_tests` (requires the check `tests` before a merge; bypass for the repository role administrator, always), says that the operator's account, and so an agent on it, holds that role, so a merge without a green `tests` needs a merge made explicitly with administrator rights, and that `main` still has no bypass. State read with `gh api repos/mariusznazar/loop2/rulesets` and the two rulesets by id (read-only): `main_tests` has the rule `required_status_checks` with context `tests` and `bypass_actors` = `RepositoryRole` 5, mode `always`, `current_user_can_bypass: always`; `main` has `bypass_actors: []`, `current_user_can_bypass: never`. Nothing changed on GitHub.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` - exit 0, `0 errors`; 6 lines `listed:` (all on invariants whose sentence changed in earlier slices with no citing file changed: `account-server-runtime`, `terrain-drawing-numbers`, `player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge`, `sprite-credits`). Same as the base's kind; none is from this slice.
- `npm test -- tests/view/program-panel.test.mjs` - exit 0, 60 pass, 0 fail.
- `python -B .the-way/instruction-files/check_instructions.py` (extra, since the styleguide is read as an instruction file) - exit 0, `0 error, 144 warn, 7 info` (warnings are of size and existing; none introduced by this slice that I saw - count is identical before and after the edits).
- Python quality environment: not needed, not run. Full gate: not run (as instructed).

## Own-work check

Requirement most likely missed: that the rule of the typed name "keeps the rule" and loses only the list of places (To do 7.13), and that the template's ban on stating today's state holds for what I left. Check: read the rule again after the edit; what remains is the principle, the reason, the sentence-naming clause, and the `select` exception without its places. The Good line still names three places as examples of a use, which the template allows ("one line describing a use"). Result: holds. Second likely miss: a wording of D-323 that the guideline repeats wrongly; checked the sentence against the first lines of D-323 (the card under the form, `warning`, the exact sentence) - the guideline sentence agrees.

## Choices

- Reworded the remaining paragraph rather than deleting it whole: the clause that a sentence naming such text counts, and the `select` exception, are rule content, not a list of places. Rejected: deleting the whole paragraph - it would drop the exception and the clause. Cost if wrong: the reviewer may want the exception kept with its places; one paragraph to restore.
- Added "adres konta" to the first sentence's "such as" so that the kinds of text named in the dropped list are not all lost. Cost if wrong: none worth naming (a few words).
- Ran `prettier --write` once on the styleguide, saw it realign the whole Roles table (the base file is not prettier-clean and the repository does not enforce prettier on Markdown), reverted with `git checkout` and redid my edits by script, so the commit holds only the intended lines.
- Security-notes wording: "a merge made explicitly with administrator rights" follows the task's "jawnego scalenia z uprawnieniem administratora".

## Reach beyond the handoff

- `the author's global rules file git.md` and `scripts.md` (the user's global rules named by the hook before a commit and a script): read.
- `gh api repos/mariusznazar/loop2/rulesets/27356301` and `.../27269579` (read-only, by id): to read the bypass actors and the rules, which the list call does not give.
- `src/browser/view/program-panel.tsx` (lines 612-670) and `src/browser/view/end-question.tsx` (`copyLacksSentence`): to make the CSS comment accurate.
- `guidelines/coding-browser-module.md` was found by `git grep D-323` in `guidelines` and not read beyond the matching lines (it needs no change in this slice).

## Working copies

Made: `.runs/executor-17/` was not needed; I made temporary output files `.runs/fc17.txt`, `.runs/pp17.txt`, `.runs/ci17.txt`, `.runs/sg-base.md` and `guidelines/_base.md` (a copy of the base styleguide to test prettier on it). All removed before the commit; `git status` was clean after it.

## Unread material

- `foundations/decisions.md:4521-4537` D-323 - read whole (by `sed` range, with the foundation-entry rule).
- D-262 (`foundations/decisions.md:3049-3099`) and D-39 (`:4717-4731`) - not read; the slice's edits cite only D-323 and the sentence of D-323; D-39's meaning of `warning` is already in the styleguide's own Roles table.
- `guidelines/coding.md`, `src/browser/AGENTS.md`, `.the-way/product-guidelines/template.md` and `styleguide/template.md` - template.md read to the part on rules of writing (first ~150 lines), styleguide/template.md first 120 lines; `guidelines/coding.md` and `src/browser/AGENTS.md` not read (no product code behaviour changed; one CSS comment).
- `guidelines/styleguide-browser-view.md` - read the hunks I changed and their surroundings, lines 1-60, 192-262, 386-400 and 520-560, not whole.
- task.md read lines 60-99 and 185-197, not the rest.

## Searches not found or unclear

- None unclear. Note: To do 6.2 quotes a "2026-11-12" date for "kolorów trzech chwil sceny"; I wrote it as the task gives it and did not verify it in the foundation.
