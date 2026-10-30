# Findings to fix — return step review (`FAIL 188b836`), task `zapis-stanu-na-serwerze`

Copied word for word from `reports/30-return-review-report.md`, § Important. The review's Minor findings are not fixed (they go to the request).

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
