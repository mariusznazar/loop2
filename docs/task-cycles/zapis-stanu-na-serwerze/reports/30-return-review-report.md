FAIL 188b836ced35005e0b7f98e21e001684cbbc6441

# Review — return step, task `zapis-stanu-na-serwerze`

- **Reviewed:** the return step's commits, range `582e9be..188b836` (one commit, `188b836` docs:
  :memo: name the kept game state among the loads and the logout save in the saving decisions;
  `foundations/decisions.md` only, +15 −10). `git rev-parse HEAD` = `188b836ced35…`, the head
  given. `.the-way` at `a8dfe8a`, equal to its gitlink.
- **Method:** `.the-way/task-cycle/review/SKILL.md`.
- **Judged against:** the frozen task (`.runs/task-cycles/zapis-stanu-na-serwerze/task.md`,
  *Decisions in play* and *Settlements to record* rows 1, 2, 6, 10, with row 5 read for the kept
  state), D-04, D-184, D-185, D-190 whole, and D-97 and D-188 whole as the entries the corrections
  name, against `src/browser/view/app.ts`, `src/browser/view/game-saver.ts`,
  `src/browser/view/game-view.ts`, `src/browser/sim/saved-game.ts`.

## Verdict on the four corrections

All four corrected binding sentences now say what the code does:

- **D-04** (`foundations/decisions.md:59-65`, complying example `:76-79`, rationale `:93-97`):
  `app.ts:234-237` keeps `game.keep()` on a save answered with no session (also from the logout
  save, `app.ts:322-325`); `game-view.ts:242-245` makes it `savedGame(state)`; `app.ts:254-260`
  builds the game from `startFrom(keptGame.document, …)`, i.e. `loadSavedGame`
  (`saved-game.ts:889`), which pauses a map run that goes on (`saved-game.ts:826-827`). The view
  still changes the game state only through a simulation function. Matches.
- **D-190** (`:3545-3549`): `loadSavedGame(value: unknown)` takes both the server's `save` (with
  `revision`) and the kept document (without it), `saved-game.ts:872-878`. Matches.
- **D-184** (`:3327-3331`): a moment during the logout's save is dropped when the logout goes on
  (`game-saver.ts:180-186`, `pending = false`), and sent after the answer when that save failed
  (`:188`). Matches. The other cases where a pending moment is dropped (conflict, outdated, no
  session — `halt`, `:135-147`) are those D-186, D-187 and D-188 govern.
- **D-185** (`:3364-3372`): after a failed logout save the line reads `LOGOUT_FAILED` through the
  retries until a save succeeds (`game-saver.ts:93-94`, `:163`, `:171-172`). Matches.

The blocking findings are not in these sentences but in files of the task's change that still
restate the entries as they stood before this range, so the request now carries two accounts of
D-190 and of D-184.

## Findings

### Critical

None.

### Important

**I-1 — The saved-game guidelines restate D-190 narrower than D-190 now reads.** Within the task
(To do item 12 made the guideline and D-190 in `483f5dc` on this branch).

- **Place:** `guidelines/coding-saved-game.md:8-9` (*When to read*: „…który zamienia stan gry na
  dokument zapisu albo dokument pobrany z serwera na stan gry lub odmowę.”) and the kind's row in
  the index, `guidelines/coding.md:18` (the same words).
- **What is wrong:** both are a near word-for-word repeat of D-190's old binding sentence ("an
  unknown value downloaded from the server into a game state or a refusal"). After `188b836`,
  D-190 says saved-game code turns "an unknown value — a saved game state downloaded from the
  server or kept in the page's memory (D-188) — into a game state or a refusal". The guideline
  that D-190 sends every reader of the kind to now describes the kind's input as the server's
  document only.
- **Why it matters:** WAY-263 grades as Important a change's file that restates an entry the
  change writes or changes differently; its rationale is exactly this — a second account of the
  entry in the request. The concrete risk: the same guideline tells the reader to read the
  document strictly, "każdy klucz obecny i żaden obcy" (`:81`), and names `revision` as a key of
  the server's document (`:122-123`); an agent who takes the load to be for the server's document
  alone can make `revision` required and refuse the kept document (it has no `revision`,
  `game-view.ts:52-55`) as `shape` — the player who signed in again after an expired session would
  get „Zapis był uszkodzony…” and a new game instead of the kept progress. Today
  `tests/view/account-screen.test.mjs:1117` would catch that, which is why this is Important
  rather than Critical.
- **Line 122 on its own** („Dokument z serwera ma obok `version` i `game` klucz `revision`…”) is
  true and does not contradict D-190; it becomes misleading only together with lines 8-9. Adding
  that a document kept in page memory has no `revision` would close it.
- **Evidence:** `git diff 582e9be..188b836` (D-190 widened); `git grep -n "dokument pobrany"`
  finds only these two lines; `git log main..188b836 -- guidelines/coding.md
  guidelines/coding-saved-game.md` → `483f5dc`, a commit of this task.
- **On approval (WAY-172):** aligning lines 8-9 and the index row with D-190 uses the meaning D-190
  already carries, which WAY-172 lets stand without its own approval; but D-190's widened sentence
  is itself an agent's correction for the human to accept at the merge, so the orchestrator should
  name the guideline lines together with D-190 under the changed decisions. Recommended fix: the
  same words as D-190 in both places ("…albo dokument pobrany z serwera lub zachowany w pamięci
  strony po zapisie, który nie zastał sesji, na stan gry lub odmowę").

**I-2 — The saver's module comment restates D-184 without the exception D-184 now carries.** Within
the task (`game-saver.ts` is a file of Slice-era work on this branch, and cites D-184 by name).

- **Place:** `src/browser/view/game-saver.ts:2-4` ("one save request at a time, every moment of
  saving during one coalesced into one more save after its answer") and the doc of `moment()`,
  `:61` ("sends the current state, at once or after the request in flight").
- **What is wrong:** D-184 now reads "a moment of saving during one is sent after its answer,
  unless that request is the save before a logout that goes on (D-97)". The module's header, the
  first account of the saver an agent reads, drops that qualification; only the inline comment at
  `:182` says it.
- **Why it matters:** WAY-263, "another changed file repeats the entry while … dropping a
  qualification". An agent who reads the header as the saver's contract can take `:183-185`
  (`pending = false`) for a bug against D-184 and "fix" it, so a save request goes out after a
  logout that succeeded. The exception has no test of its own (see Minor m-3), so nothing would
  catch that.
- **Evidence:** `git grep -n "after its answer"` outside `foundations/` and `tests/` finds only
  `game-saver.ts:3`; the code path `answered` `:180-188`.
- **Recommended fix:** one clause in the header and in `moment()`'s doc, e.g. "…after its answer,
  except during the save before a logout that goes on (D-97)".

### Minor

- **m-1 — "a saved game state … kept in the page's memory" (D-04 `:64-65`, D-190 `:3547-3548`)
  names as *saved* what D-188 (`:3477`) calls "the unsaved game state". In the code it is a saved
  document (`KeptGame.document: SavedGame`) of progress not saved on the server, so both readings
  are defensible, but the word now means two things across three neighbouring entries, and read
  literally against `saved-state-http-exchange` (`foundations/invariants.md:980`, "The browser
  loads and sends saved game states as JSON through `fetch()` requests") D-04 describes a saved
  game state the browser loads without a request. Wording such as "the saved document of the
  unsaved game state D-188 keeps in the page's memory" would remove both readings. Not blocking:
  the invariant derives from D-181, the exchange with the server, and no reader is misled about
  what the code does.
- **m-2 — D-04's *Origin* (`:85`) names question 10 and row 10 only**, while the new clause rests on
  row 5 (the kept state, D-188). D-188 is cited in the sentence, so the trail exists; adding row 5
  to *Origin* would make it direct.
- **m-3 — D-184's new exception has no test** (no test sends a moment during the logout's save and
  checks it is dropped when the logout goes on; `git grep` over `tests/` for it finds none). The
  whole review graded this as an untested choice (m-3 there); it is now a binding sentence. Not
  within this range's commits, named because I-2 depends on it.
- **m-4 — D-185's "once the save before a logout has failed … until a save succeeds"** reads as
  holding until success, but a too-large refusal in between resets it (`game-saver.ts:167`), so a
  later plain failure shows „…Gra spróbuje ponownie.” again. D-185's own too-large clause takes the
  line meanwhile, so the gap is only after too-large → failure; an edge, no player harm.

### Not a finding, for the orchestrator

- D-04's binding sentence now goes beyond the exact words row 10 approved („zapis stanu gry, który
  przeglądarka pobrała z serwera”). The widening follows from row 5 together with row 10 and keeps
  the meaning the human approved (the view changes the game state only through the simulation), so
  I judge it right; it must still be named for the human at the merge as a changed binding
  sentence, as the return step's report (Concerns 1, Choice 1) says, together with D-184, D-185 and
  D-190.

## Declined to judge

- The 30-second check running even with no map run passing (`game-saver.ts:201`, `setInterval`
  always; D-184 says "while a map run passes") — outside this range's corrections; it sends only a
  changed state, so it is the behaviour the slices' reviews judged.
- D-186's "header line of D-185 until its first successful save" when a failed or too-large save
  follows a conflict (return report, Concerns 3) — an entry this range does not change.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `188b836ced35005e0b7f98e21e001684cbbc6441`, the given head |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | both `a8dfe8ac…` |
| `git log 582e9be..188b836`, `git diff 582e9be..188b836` | one commit, `foundations/decisions.md` only |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| Manual: each corrected sentence traced through `app.ts:220-345`, `game-view.ts:40-74`, `:235-254`, `game-saver.ts` whole, `saved-game.ts:868-899` | matches, as above |
| Manual: `git grep` for restatements of the old D-04/D-190/D-184/D-185 wording outside `foundations/`, `.the-way`, `.runs` | `guidelines/coding-saved-game.md:9`, `guidelines/coding.md:18`, `game-saver.ts:3` (I-1, I-2) |
| Manual: `git grep` in `tests/` for the kept-document load and for a moment during the logout's save | `tests/view/account-screen.test.mjs:1117`, `:1145` cover the kept state; none for the logout exception (m-3) |
| `git status --short` before writing this report | clean |

Not run: `npm test` (no argument) — the cycle's own gate, as the handoff says. No focused test run:
the range changes no code and no test reads the decisions' wording (`git grep decisions.md --
tests` finds only comments).

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/return_step.md` — what the return step is to correct, to place I-1
  and I-2 (they arise from its correction, not from its omissions in the foundation).
- `.the-way/foundations/decisions.md` WAY-263 and WAY-172, whole — the grade of I-1/I-2 and
  whether the guideline's fix needs approval.
- `guidelines/coding-saved-game.md` whole, `guidelines/coding.md:14-25` and its diff on the
  branch — the restated wording.
- `foundations/invariants.md` `saved-state-http-exchange`, `save-version` — for m-1.
- `foundations/glossary.md` headings — whether "saved game state" has an entry (it has none).
- `foundations/decisions.md` D-186 – D-189 whole — what D-184's pending moments and D-04's kept
  path rest on.

## Searches not found or unclear

- A glossary entry for "saved game state" — none; m-1 rests on usage across D-181 – D-190 only.
- Whether D-190's widening is "a changed meaning of a product's guidelines" under WAY-172 (needing
  approval before use) or a correction keeping the kind's meaning — unclear; I read it as keeping
  the meaning (same file, same rules, the description of the input corrected) and leave the call
  to the orchestrator.
