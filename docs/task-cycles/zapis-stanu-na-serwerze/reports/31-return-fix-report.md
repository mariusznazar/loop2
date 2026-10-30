# Fix report — return-step review `FAIL 188b836`, task `zapis-stanu-na-serwerze`

- **Status:** done
- **Base:** `188b836` · **Commits:** `dbd0fa6` (guidelines), `3bd8f3f` (saver comments and test),
  on `task/zapis-stanu-na-serwerze`, author the private author address
- **Method:** `.the-way/task-cycle/change/SKILL.md`, the fix of a review's findings (`fix.md`); for
  I-1, the project skill `the-way-maintain-coding-guidelines` →
  `.the-way/product-guidelines/coding/SKILL.md` and `template.md` § "Writing the files"

## Files changed

| File | Added | Removed | Commit |
|---|---|---|---|
| `guidelines/coding-saved-game.md` | 4 | 2 | `dbd0fa6` |
| `guidelines/coding.md` | 1 | 1 | `dbd0fa6` |
| `src/browser/view/game-saver.ts` | 6 | 2 | `3bd8f3f` (comments only) |
| `tests/view/game-saver.test.mjs` | 24 | 0 | `3bd8f3f` |

## I-1 — the saved-game guidelines restate D-190 narrower than it reads: fixed

I accept the finding. Both places now use D-190's meaning in the reviewer's recommended words:

- `guidelines/coding-saved-game.md:8-9`, *When to read*: „…który zamienia stan gry na dokument
  zapisu albo dokument pobrany z serwera lub zachowany w pamięci strony po zapisie, który nie zastał
  sesji, na stan gry lub odmowę.”
- `guidelines/coding.md:18`, the kind's row in the index: the same words.
- `guidelines/coding-saved-game.md:122-124`, as the finding suggested: „Dokument z serwera ma obok
  `version` i `game` klucz `revision`, którego stan gry nie zawiera; dokument zachowany w pamięci
  strony go nie ma, a wczytanie przyjmuje oba.” This matches the code:
  `src/browser/sim/saved-game.ts:872-878` (`savedDocument` reads `revision` only when it is present)
  and the kept document `{ document: savedGame(state), revision }` (`game-view.ts:52-55`), whose
  document holds no `revision`.

On approval (WAY-172): the maintain-coding-guidelines skill says "Using a meaning that a decision of
the product's log already carries takes no approval". The text uses D-190's meaning. D-190's widened
sentence is itself this cycle's correction, so the orchestrator names these three guideline lines
together with D-190 under the changed decisions of the request, for the human at the merge.

Check: `git grep -n "dokument pobrany z serwera"` now finds only the two widened lines, and both
carry „lub zachowany w pamięci strony”. `python -B .the-way/elements/common/foundation_check.py`
gave exit 0, "0 errors" (it also checks the guidelines' index and fields).

## I-2 — the saver's comments drop D-184's logout exception, and no test covers it: fixed

I accept the finding.

- **Comments** (`src/browser/view/game-saver.ts:2-6` and the doc of `moment()`, `:61-64`): the header
  now reads "…every moment of saving during one coalesced into one more save after its answer, except
  during the save before a logout that goes on, after which nothing more is sent (D-184); …". The doc
  of `moment()` now reads "…at once or after the request in flight, except when that request is the
  save before a logout that goes on (D-184)." No code changed (`git diff 188b836..3bd8f3f --
  src/browser/view/game-saver.ts` shows comment lines only).
- **Test**: in `tests/view/game-saver.test.mjs`, „a moment during the save before a logout that
  goes on is not sent after its answer”. It runs for each outcome after which logout goes on and
  `answered` reaches the exception, `saved` (revision 4) and `too-large`. For each, it starts the
  save before logout and makes an act (pace 4). It asks for a moment while that save is in flight,
  then answers the save. It asserts that the logout's report is that outcome and that exactly one
  save request was sent. `conflict`, `outdated` and `signed-out` stop the saver in `halt`, which
  already clears `pending`, so the break below cannot show on them.
  - The break the test catches: a saver that sends the moment anyway, which is a save request going
    out beside the logout that ends the session. The break would be a bug against D-184 as it now
    reads.
- **Seen failing:** I removed the block `if (outcome.kind !== "failed") { pending = false; return; }`
  (`game-saver.ts:187-190` after the comment change, `:183-186` at `188b836`) and ran
  `npm test -- tests/view/game-saver.test.mjs`: **exit 1**. The new case failed with
  `AssertionError: saved: nothing more is sent` (16 pass, 1 fail). I restored the file from a copy
  in the session scratchpad and ran the same command: **exit 0** (17 pass).

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/view/game-saver.test.mjs` (new test, code intact) | 0 (17 pass) |
| `npm test -- tests/view/game-saver.test.mjs` (block `:187-190` removed) | 1 (new case fails) |
| `npm test -- tests/view/game-saver.test.mjs` (restored) | 0 (17 pass) |
| `npm test -- tests/quality/test_quality_invariants.py` (first run) | 1: `test_prettier_source_format`, Prettier style in `tests/view/game-saver.test.mjs` (one long `assert.equal` line) |
| `npx prettier --write tests/view/game-saver.test.mjs`, then `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npm test -- tests/view/game-saver.test.mjs` (after the formatting) | 0 (17 pass) |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |

Not run: `npm test` with no argument (the cycle's gate). No test reads the guidelines' text
(`git grep -ln "coding.md\|coding-saved-game" -- tests` finds nothing), so `foundation_check.py` is
the only check for I-1.

## Searches not found or unclear

- The project skill `the-way-maintain-coding-guidelines` leads the refinement of a guidelines task.
  It writes no guideline file itself ("Never writes … the coding guidelines"). What applies to a
  cycle's author is the coding template's § "Writing the files" and the skill's rule that a meaning
  a decision already carries takes no approval. I followed those, and ran none of the skill's
  refinement steps (research, trial run, settling with the human). The handoff's "change them
  through the project skill" was unclear on this point.
- The finding names the break as `:183-185`. At `188b836` the block is `:183-186` (the `if`, the
  `pending = false`, the `return`, the closing brace); after the header comment grew by one line and
  the `moment()` doc by three, it is `:187-190`. I broke the whole block. Removing only
  `pending = false` would change nothing anyone can see, because the `return` still stops the send.
