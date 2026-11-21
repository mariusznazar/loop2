FAIL

# Spec review 2 — revision 1 of the spec of correction 1, task `ocena-programu-na-ziarnach`

- Compared: `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md` (revision 1) with `spec-reviewed.md` (the spec of review 1, `reports/spec-review-report.md`); the designer's revised report `reports/spec-designer-report.md` was not opened (see *Unread material*); the orchestrator's answer is as the coordinator's message gives it (way a: a content revision per saved program).
- Worktree head `4e4a104b`; `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink.
- Method: `.the-way/task-cycle/spec/review.md`, „For the review of a revised spec”: each earlier finding resolved or not, then only what the revision broke.

## Earlier finding

**Finding 1 (A→B→A shows an erased judging again) — resolved.** The fingerprint is gone; a content revision of each saved program rises by one at every save after which rules, groups with their order or trip plan differ, never at a rename (`spec.md:68`), and a cached judging stands only at the stored revision (`spec.md:70`). A→B→A raises it twice, so the judging of A never stands again (`spec.md:76`), and the tests pin it at the simulation (`spec.md:170-171`) and on the screen (`spec.md:175`, „no mark after an edit of the program that changes its content, also after the content is changed back”). D-440 keeps „erases” (`spec.md:185`). *To do* 6 and the remark's „kasowanie przy zmianie reguł, grup albo planu wyprawy” hold.

## What the revision broke

### Finding 2 — D-401's binding sentence on the previous-save reader is left to an „if needed”, and as the spec builds the reader that sentence becomes false

- The revision makes the previous-save reader take an item of a version-9 document only where its keys are exactly `id`, `name`, `program` and the revision, and one of versions 1–8 only where they are exactly the three (`spec.md:130`, S1), and it rewrites the invariant `previous-save-programs-reader` to match (`spec.md:191`).
- D-401's binding text says the same thing the invariant says, in its own words (`foundations/decisions.md:4283`): „…takes an item only when its keys are exactly `id`, `name` and `program` and its name is not empty after trimming…”. Its *Rejected* rests on one shape too: „items read leniently, any other key ignored — the items had one shape in every version, so strict items skip one by one the same way” (`:4294`). `tests/sim/previous-programs.test.mjs:134`, `:334` and `:382` quote that binding sentence in their `decision:` lines.
- The spec names D-401 only as „changed, if the foundation step finds it needs it: a pulled program takes the content revision 0” (`spec.md:189`). It does not name the sentence about the keys. A foundation step following the spec can add the revision-0 sentence and leave „exactly `id`, `name` and `program`” in place. D-401 would then say the opposite of the code and of the invariant for every version-9 item. The review of the whole change grades that as Important, as it graded D-243's tests clause in the first run (`reports/review-whole-report.md`, I-1).
- Fix in the spec, one line: D-401 changed unconditionally. Its binding sentence on the keys says what the invariant will say: from version 9 the item's keys are exactly `id`, `name`, `program` and the content revision; before 9 they are exactly the first three. Its *Rejected* „the items had one shape in every version” is corrected. A pulled program takes revision 0. The three `decision:` lines of `tests/sim/previous-programs.test.mjs` follow. Cost of leaving it: an entry that contradicts the code it binds, found at the earliest by the review of the whole change, and a fix through `the-way-record-decision` at that late point.

## The orchestrator's points, checked

### Every place that writes content into a listed program raises the revision

Checked against the code:

- `withProgramSaved` (`src/browser/sim/programs.ts:391-403`) is the one function that replaces a listed program's content. Its callers are `editProgram` (`programs.ts:586`), `saveCopyIntoProgram` (`programs.ts:719`), `setProgram` without a map run (`src/browser/sim/game.ts:440`) and the first-chill write of `advanceMinutes` (`game.ts:889-893`, with `withFirstChillRule(owner.program)`).
- `withProgramContent` is called only inside `withProgramSaved` (grep over `src/browser/sim/`).
- The other writers of `programs` make new items or carry an item by spread, so they set or keep the revision as the spec says: `newGame` (`game.ts:386`), `createProgram` (`programs.ts:457`), `appendPrograms` (`:504`), `saveCopyAsNewProgram` (`:750`), `renameProgram` (`:525`, `{ ...saved, name }`, so it keeps the revision), `deleteProgram` (`:553`, filter).
- `setProgram` inside a map run writes the copy (`withCopyProgram`), not the list, and the copy carries no revision, as the spec says. No other file of `src/browser/sim/` writes `programs`. The spec's account (`spec.md:37`, `:68`, `:130`) matches.
- `sameData` (`programs.ts:311-320`) compares own keys and values whatever the order the keys were made in, so the spec's „also where the objects' keys were made in another order” (`spec.md:170`) holds.

### The strict load, D-386 and `guidelines/coding-saved-game.md`

- The load's program list reads each item with `fields(item, ["id", "name", "program"])` (`src/browser/sim/saved-game.ts:486-500`). The spec makes it four exact keys, the revision read as a safe integer from 0 and compared with nothing (`spec.md:130`, `:172`). That is the guideline's „Ścisłe wczytanie” and D-386's „admits every state the game's own functions make”: the game only raises by one from 0.
- The shape changes at version 9, which is not deployed (`main` 8, branch 9). The spec asks for the comment `guidelines/coding-saved-game.md:110-113` requires (`spec.md:172`). D-386 is changed to admit the revision (`spec.md:187`). Consistent.

### The previous-save reader

- The code reads an item with `hasExactKeys(value, ["id", "name", "program"])` (`src/browser/sim/previous-programs.ts:83`), for every readable version (`:58-59`). The spec's version-dependent rule, with the revision's value neither read nor checked and the pull making revision 0, is consistent with the code it changes, with the reset putting a current-version document in the previous save (D-401's rationale), and with the invariant as rewritten (`spec.md:191`).
- What it leaves untrue is D-401's binding sentence: Finding 2.

### The new gap: a revision that repeats after a change whose save is lost

- What happens: the program stands at revision r, content A, on the server. In the page it is saved as B (r+1), the save does not reach the server, and the triple is judged. The page is closed, and the server's game comes back at r. A later save of other content C makes r+1 again; with no judging of the triple between, B's mark stands beside C until the next judging or the next change.
- Judgement: this does not make the build go wrong. It is a rare cost of the chosen design. It needs a save that fails, a judging in that window, the page lost, and later saves that reach exactly the same count with no judging between. Its harm is a stale badge or count. „Puść w pętlę” always judges anew (D-243), so no earning loop starts on it. The spec names it, says how long it lasts and what it would cost to close (`spec.md:85`), and gives it to the new decision's *Rationale* (`spec.md:183`). Against the human's remark it is a failure-path exception to „kasowanie przy zmianie”, so the request has to name it beside the accepted costs (another device, cleared data). It is not a dropped requirement.
- One sentence of the spec's account says more than it covers. „the page removes this game's cached judgings … after a refused save …, which covers the case of D-209” (`spec.md:85`). The removal runs only when the page builds the game with `afterConflict` (`src/browser/view/app.ts:190`, `:275`). A conflict refused at „Wyloguj” lets the logout go on to the forms (D-97). The next sign-in builds the game from an ordinary load, with `afterConflict` false (`app.ts:245`), so that path stays open, like the closed page. This changes nothing to build. It belongs in the cost the request names.
- Optional narrowing, not required. At opening, the cache could also drop this game's entries whose stored revision is above the loaded program's revision, or whose stored generation is above the loaded character's. A loaded state never stands below what this browser saved successfully, so that removal touches only judgings of lost changes. It closes the single-device closed-page path. Only cases needing a second device that reaches the same count stay open. Cost: V1 is given the loaded state at opening, and a test case. Without it, the cost stays as the spec names it.

## Nothing else broken that I found

Goal 1 now lists the version-9 shape whole (`spec.md:15`). The page paths of a new game include a load refused as shape (`spec.md:97`). The balance instrument's two `newGame` calls are named with a fixed moment (`spec.md:99`, `:147`, `:176`). V1 is told of a refused save through the game view's existing `afterConflict` (`spec.md:140-142`; `src/browser/view/game-view.ts:80`). The stored value carries the revision as a safe integer from 0 (`spec.md:113-114`). The rest of the spec is unchanged in meaning from the spec reviewed.

## Reaches beyond the dispatch

- `src/browser/sim/programs.ts:300-410`, `:450-560`, `:705-760`, and its `export function` list; `src/browser/sim/game.ts:420-450`, `:870-900`; `src/browser/sim/types.ts:92`; `src/browser/sim/saved-game.ts:480-510`; `src/browser/sim/previous-programs.ts` by grep (`hasExactKeys`, `readableVersion`, `readItem`); `src/browser/view/app.ts:180-210`, `:240-280`, and a grep for `afterConflict` in `src/browser/view/`; a grep for `sameData` and `SavedProgram` over `src/` — to check the write paths, the load and the reader against the spec.
- `foundations/invariants.md:1378-1386` (`previous-save-programs-reader`), D-401 (`foundations/decisions.md:4281-4294`), a grep of `tests/` for `decision:` lines quoting D-401, and the glossary headings for a term „revision”.

## Unread material

- `reports/spec-designer-report.md` (revised): not opened. I worked from the spec's own revision note (`spec.md:5`, `:85`) and from the coordinator's message, which gives the orchestrator's answer and the designer's new gap.
- `spec.md` read whole; `spec-reviewed.md` compared through `diff` (the output was long and cut by the tool, so I read the revision whole rather than the diff); `guidelines/coding-saved-game.md` and D-386 as read whole in review 1.

## Searches not found or unclear

- No place in `src/browser/sim/` besides `withProgramSaved`'s four callers writes content into a listed program. The grep for `withProgramContent`, `withProgramSaved` and `programs:` found none, and the positive control is the four callers found.
- No glossary term „revision” yet. The spec leaves to the foundation step whether the content revision needs an entry apart from the revision of a save (`spec.md:195`).

## Working copies

None made; `.runs/spec-review/` was not created.
