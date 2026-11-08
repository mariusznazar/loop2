PASS d3a2559

# Report 20 — review of the fix of I1 (stage: review-change, fix of the return step's review)

Range `638e89e0f6e24e746f9168b82a219b70d95cd4dd..d3a255905b0f20ad99fd4cd0003625a457b041b1`, branch
`task/kronika-z-filtrami`; `git rev-parse HEAD` = `d3a2559…`, worktree clean. One commit, `d3a2559`,
`foundations/decisions.md` +9 −8, D-348 alone. Bounded by `19-findings.md` (I1 only), as `fix.md` gives.

Counts: blocking 0; Minor 1 new (non-blocking); out of scope 0.

## Resolution of I1 — fixed

D-348's second binding sentence now reads (`foundations/decisions.md:7691-7694`): "The browser view
describes an act of the player on the copy from what the act was and, for an edit, from the copy before
the act and the copy after it, together with the program rule or rule group the player moved where the
program editor names it, which never enters the simulation, and no event of the simulation describes
such a change."

Checked against `actEntries` (`src/browser/view/chronicle-entries.ts:299-332`), D-342 and spec D4 for
each act:

- **Edit** — `copyChangeTexts(before.run.copy.program, run.copy.program, act.move)`: from the copies
  before and after with the editor's hint; the sentence says so, limited to an edit. D4: "an edit: one
  entry for each change between the copy's program before and after the act". Matches.
- **Discard** — `["Porzucono zmiany kopii"]`, from the act's kind alone. The sentence no longer asks for
  a comparison; the new complies example "„Porzuć zmiany” giving „Porzucono zmiany kopii” alone, whatever
  it reverted" pins it. D-342 and D4 ("„Porzucono zmiany kopii” alone, whatever the discard changed")
  agree. The collision with D-342 is gone.
- **Save, save as new** — from the act's kind, with the program's name read from the state after; "from
  what the act was" covers the kind, and the sentence does not say "only", so the name read from the game
  state (which D-04 already lets the view draw from) is no contradiction. Matches D-342's „Zapisano kopię
  w programie „…”” and „Zapisano kopię jako nowy program „…””.
- **Switch** — likewise, „Przełączono postać na program „…””. Matches.

Evidence that the code does what the sentence and the example say: `tests/view/chronicle.test.mjs:480-505`
records an edit, a save, an edit, a save as new, a switch, an edit and a discard, and expects the discard
as the single „Porzucono zmiany kopii” though it reverts an added rule, the saves and the switch as their
fixed sentences, and „Dodano regułę …” only for the edits.

The *Rationale* change ("so the view knows what the act was, the copies before and after an edit
describe its changes exactly") follows the new sentence and is traced to spec D1 B ("each act is one
call") and D4. *Rejected* holds no sentence of the old, broader reading; I read it again and agree.

## Findings in the fix diff

### Minor (new, non-blocking)

**N1 — "such a change" at the end of the second sentence has lost its antecedent.** Place:
`foundations/decisions.md:7694`. The sentence used to begin with "a change the player makes to the
copy"; it now begins with "an act of the player on the copy", and the word "change" no longer appears
before "such a change". A reader takes it to mean the act, which is what is meant, so nothing reads
wrongly; "no event of the simulation describes such an act" would be exact. Also cosmetic: the
*Rationale* line at `:7719` was not rewrapped (136 characters).

No Critical or Important finding in the fix diff.

## Checks run

- `git rev-parse HEAD` → `d3a255905b0f20ad99fd4cd0003625a457b041b1`, exit 0; `git status --short` → empty.
- `git log --stat 638e89e..d3a2559`, `git diff 638e89e..d3a2559` → exit 0; only `foundations/decisions.md`.
- `python -B .the-way/elements/common/foundation_check.py` on the head → `0 errors`, exit 0.
- Manual: D-348 read whole on the head against `actEntries` and `tests/view/chronicle.test.mjs:480-505`.
- Not run: product tests (no code changed).

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md` — the method of this review.
- `src/browser/view/chronicle-entries.ts:299-332`, `tests/view/chronicle.test.mjs:480-505` — the claims
  of the new sentence and complies example.
- `spec.md` D1 and D4 and D-342, as read in report 18.

## Searches not found or unclear

none
