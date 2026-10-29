PASS b00517ae9d4fd6a34c1302c2143edab0abba2529

# Review of the return step's commits — programy-gracza

Reviewer: a fresh agent that made none of the change. Method: `.the-way/task-cycle/review/SKILL.md`
(entry `.claude/skills/the-way-review-change/SKILL.md`), pinned process
`3aee7d958835cc19b95519f4d21b37538b78e3e1` (gitlink and checkout equal). Worktree
`C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`; `git rev-parse HEAD`
= `b00517ae9d4fd6a34c1302c2143edab0abba2529`, the head given. Trust boundary: no; irreversible
operation: no.

Range `03915185a551b00b3a08d0fdabb311ded347db7e..b00517ae9d4fd6a34c1302c2143edab0abba2529`:
`ee9ea92` (`foundations/decisions.md`, D-156 and D-159) and `b00517a` (two comments,
`src/browser/sim/programs.ts:333`, `src/browser/styles.css:105-106`).

## Findings

### Critical

None.

### Important

None.

### Minor

None.

## What was checked and how it came out

1. **D-156 (corrected) against the code.** The entry now says: the heading keeps the name the
   program had; „Zapisz w programie” and „Porzuć zmiany” are gone; the copy counts as unsaved —
   „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is
   saved as a new program. Code:
   - `deleteProgram` (`src/browser/sim/programs.ts:428-452`) sets `programId: null` and
     `deletedName: deleted.name` on the copy — the name at the moment of deletion.
   - `copyHasUnsavedChanges` (`programs.ts:538-545`) is true where the copy's program is not on
     the list, whatever the copy's content.
   - `program-panel.ts:413-424`: heading `Kopia: ${owner ? owner.name : deletedName}`; the unsaved
     line follows `copyHasUnsavedChanges`; `saveCopyButton`/`discardButton` hidden where there is no
     owner; `saveNewButton.disabled = !unsaved`.
   - `saveCopyAsNewProgram` (`programs.ts:597-630`) is allowed with the program gone and resets
     `deletedName` to `null` and `base` to the copy, so after the save the copy is the same as its
     new program: line gone, buttons inactive — "until the copy is saved as a new program" holds.
     `restart` carries `run.copy` as it is, so the deleted state survives a restart, which the entry
     does not contradict; `switchProgram` takes a fresh copy (`deletedName: null`), a different copy.
   - The compliance example "a copy with no edit of its own whose program „Program 2” is deleted
     standing under „Kopia: Program 2” with „Niezapisane zmiany w kopii.” and „Zapisz jako nowy
     program” active" is exercised by `tests/view/program-panel.test.mjs:706-731` (copy with no edit,
     program „Program” deleted, heading „Kopia: Program”, line present, the two buttons absent,
     „Zapisz jako nowy program” enabled, then saved as „Program 3”). Each violation example is one
     this code does not do.
   - Against the inputs: it is exactly Q-D3 of `reports/03-design-answers.md` (heading keeps the
     name, copy counts unsaved, „Zapisz jako nowy program” active) and fulfils task To do 3
     („Zapisz jako nowy program” zostaje) without contradicting To do 8, which speaks of a copy whose
     program exists.
   - The new *Rejected* option (copy measured against the deleted program's content) is a real
     alternative with a true cost: with no edit the save-as-new would be inactive and the copy lost
     at „Zakończ”.
   - *Origin* still cites the vault task's Q2 only. The added clauses rest on the orchestrator's
     Q-D3, whose file lies under `.runs/` and is deleted with the cycle; the decision template's
     *Origin* forbids such a target, and the entry's own *Rationale* now carries the reasoning. Not
     a finding.
2. **D-159 (corrected) against the code.** The measure of the line and the three buttons is now
   scoped to "while the copy's program is on the player's list", and a copy whose program is gone
   is sent to D-156. Read literally on the head, every sentence is true: with the owner present,
   `copyHasUnsavedChanges` reduces to `!sameData(copy.program, copy.base)` — the "as the copy was
   taken from it or last saved into it" measure (Q-D1) — and the three buttons are enabled exactly
   when it holds. The pre-correction wording, read literally, did call for the line gone and the
   save-as-new inactive for an unedited copy of a deleted program, which the code does not do — the
   return step's claim of a mismatch is right, and the correction removes it without moving any
   other meaning. Verification examples unchanged and still true. `copy-save` (derives from D-159)
   is unaffected.
3. **Consistency of the two entries with the rest of the foundation.** D-153's rationale (heading
   keeps the name) agrees. D-161 and D-160 unaffected: `programHasChangesCopyLacks` is false with
   the program gone, so the D-160 line cannot stand beside a deleted program; D-160 needs no
   correction for that case.
4. **D-157 and the comment at `programs.ts:333`.** `programName` implements trimming, the `empty`
   refusal, the case-insensitive `taken` refusal excluding `ownId`, and no length limit — D-157's
   rule; D-156 is about deletion. The corrected citation is right.
5. **D-44 and the comment at `styles.css:105-106`.** D-44 names five destructive buttons —
   „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” — and so does
   `guidelines/styleguide-browser-view.md:196-197`; the comment now lists the same five in the
   same order. Comment only; prettier accepts it.
6. **Wording rules on the step's foundation additions.** No hit for the forbidden words (check
   below).
7. **Scope.** Nothing added that the task or the return step's remit (WAY-11: correct whatever no
   longer matches) does not cover; no behaviour changed; no test changed, so no invariant test
   changed.

The return step's own-work check (every entry's literal sentence true on the head for the
autonomous choices) fits where this range is weakest — a corrected sentence that is still false in
a corner. I repeated it for D-156 and D-159 on the deleted-program path, the restart path, the
save-as-new path and the switch path; nothing false found.

## Declined to judge

- The panel showing the first program of the list after „Zakończ” of a copy whose program was
  deleted (part of Q-D5), left out of D-161 by the return step — outside this range: the return step
  wrote no entry for it, and judging whether one is owed is the whole change's foundation question,
  not a change in these commits.
- The other autonomous choices C3, C6–C9, C15 and their placement in the questions table — the
  return step judged them with no entry written in this range; they belong to the request, not to
  these commits.

## Checks run (from the worktree root, Git Bash)

| Command | Exit |
|---|---|
| `git rev-parse HEAD` | 0 — `b00517ae9d4fd6a34c1302c2143edab0abba2529` |
| `git -C .the-way rev-parse HEAD` / `git ls-files --stage -- .the-way` | 0 / 0 — both `3aee7d95…` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 — `0 errors` |
| `npm test -- tests/view/program-panel.test.mjs` | 0 — 21 tests, 21 pass |
| `npm test -- tests/sim/copy-actions.test.mjs` | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 |
| `npm test -- tests/sim/copy.test.mjs` | 0 |
| `node_modules/.bin/prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css src/browser/sim/programs.ts` | 0 |
| `npm run typecheck` | 0 |
| `git diff -U0 03915185..b00517a -- foundations \| grep "^+" \| grep -i -w -o -E "only\|never\|always\|without\|should\|will\|must"` | 1 — no hit |
| `git status --short` after the checks | 0 — empty, worktree untouched |

A first attempt `npm test -- <four files>` exited 2 ("Expected exactly one test file, or no
argument for the full gate"); the four files were then run one per command, as above.

Not run: the gate `npm test` with no arguments — the cycle's own run, as the handoff gives; the
quality tests (`tests/quality/test_quality_invariants.py`) — the range changes two comments and two
decision entries, no code a quality tool measures differently; no browser run — no behaviour or
appearance changed.

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md` WAY-36 — what a binding choice is, to judge writing Q-D3 into
  D-156.
- `.the-way/elements/decisions/template.md:190-196` (*Origin*) — whether D-156's *Origin* had to
  name the source of the added clauses.
- `.the-way/task-cycle/skill/return_step.md` (opening paragraph) — what the return step corrects.
- `guidelines/styleguide-browser-view.md:196-197` — the list of destructive buttons the CSS comment
  restates.
- `tests/view/program-panel.test.mjs:704-731` and grep of `deletedName` in `tests/` — whether
  D-156's new compliance example is exercised.
- `src/browser/sim/programs.ts` `deleteProgram`, `saveCopyAsNewProgram`, `discardCopyChanges`,
  `switchProgram`, `programHasChangesCopyLacks` — the paths the corrected entries describe.
