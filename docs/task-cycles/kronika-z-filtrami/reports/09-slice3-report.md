# Report — slice 3 (the chronicle memory and the composing of its entries)

- **Status:** done
- **Commits:** `416c10d` feat: :sparkles: add the chronicle memory of a map run and the composing of its entries, with the band's text shared with the discovery's entry
- **Range:** `6392714..416c10d`
- Worktree clean after the commit; files added by path.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/chronicle.ts` (new) | 211 | 0 |
| `src/browser/view/chronicle-entries.ts` (new) | 411 | 0 |
| `src/browser/view/discovery-band-text.ts` (new) | 33 | 0 |
| `src/browser/view/discovery-band.tsx` | 6 | 23 |
| `src/browser/view/now-lines.ts` | 11 | 2 |
| `tests/view/chronicle.test.mjs` (new) | 612 | 0 |
| `tests/view/chronicle-entries.test.mjs` (new) | 196 | 0 |

All file names are the plan's; no file beyond the slice's *Change*.

## What the slice gives (interfaces for Slices 4 and 5)

- `chronicle-entries.ts` (pure): types `ChronicleKind` (`action`, `discovery`, `combat`, `change`,
  `streak`, `world`), `ChronicleRole`, `ChronicleEntry` {kind, minute, text, role}, **`MoveHint`**
  (`{kind:"rule"; ruleId} | {kind:"group"; groupId}` — the hint Slice 4 carries from the editor's
  three move sites), `CopyAct` (`{kind:"edit"; move: MoveHint|null} | discard | save | saveAsNew |
  switch`); `copyChangeTexts(before, after, move)`, `actEntries(act, before, after)`,
  `eventEntry(event, after)`.
- `chronicle.ts` (no React, no DOM): `createChronicle(state)` → `record(result, before, act?)`,
  `pickTab("chronicle"|"terrain")`, `pickFilter("all"|kind)`, `snapshot()` → {version, tab, filter,
  paragraph: {seq, minute}|null} (same object while the version stays), `window(filter, size)` →
  {rows, more}; a row is `{kind:"entry"; key; entry}` (key = the entry's place in the whole order,
  stable through the map run) or `{kind:"paragraph"; minute}`. „Walka” gives the paragraph alone;
  „Wszystko” gives it at its place where the window reaches it. No `subscribe` is given — how the
  screen reads the memory is Slice 5's choice (spec, *Left to the maker*).
- `discovery-band-text.ts`: `discoveryBandText(state)` — the band's text without buttons, null
  without a discovery; `discovery-band.tsx` now uses it (behaviour unchanged; its tests pass).
- `now-lines.ts`: exports `WAIT_TEXT` and `deathText(cause)`; „Teraz” reads them as before.

## Checks (command — exit code)

Written first, seen failing on stubs that returned nothing (assertion failures, not missing modules):

- `npm test -- tests/view/chronicle-entries.test.mjs` — 1 (13 tests, 12 failed; the one passing was "an edit after which the copy is the same gives nothing", which an empty stub satisfies)
- `npm test -- tests/view/chronicle.test.mjs` — 1 (23 tests, 20 failed; passing on the stub: „Zakończ” clears, a loaded state with no attack holds nothing, an edit of a saved program gives no entry — each an "absence" case)

After the code:

- `npm test -- tests/view/chronicle-entries.test.mjs` — 0 (13/13)
- `npm test -- tests/view/chronicle.test.mjs` — 0 (23/23; run again after one added assertion in the „Zakończ” case and the window change below — 0)
- `npm test -- tests/view/discovery-band.test.mjs` — 0 (9/9)
- `npm test -- tests/view/now-lines.test.mjs` — 0 (9/9)
- `npm test -- tests/view/run-screen.test.mjs` — 0 (13/13)
- `npm run build` — 0, then `npm test -- tests/invariants/test_content_identifiers.py` — 0 (4 tests)
- `npm run typecheck` — 0
- `npm test -- tests/quality/test_quality_invariants.py` — 0 (5 tests)

Not run: the full `npm test` and `foundation_check.py` — the orchestrator's gate, as the handoff gives.

## Own-work check

- **Requirement most likely missed:** that entries come out right through a real map run of many
  results — the wait recorded once across many readings, the discovery written with the band's text
  including the rule the game wrote, the loss of the streak only where the streak was above zero, and
  the death in „Teraz”'s words.
- **Check:** a one-off script (`death-check.mjs` in the session's scratchpad) ran a new game on Las
  through the real simulation, recording every result and every „Wznów” into the chronicle, to the
  death; `node … death-check.mjs` — 0.
- **What it showed:** death of cold at minute 243; rows newest first: `243 world „Mag zamarzł”`,
  `104 action Czeka…`, `104 discovery „Odkryto: Idź, Zbierz, Obchód, Jagoda, Mech, drzewo
  umiejętności Zbieranie małych przedmiotów. W regułach…”`, `84 action Eksploruj`, `84 discovery
  „Odkryto: Eksploruj, Wędruj, … Gra dopisała regułę w grupie „Program”: Zawsze → Eksploruj.”`,
  `84 streak „Passa 83 przerwana: zdrowie spadło od zimna”`, `0 action Czeka…`. No loss entry at the
  death, as the streak stood at 0 since 84 (D-341). As required.

## Choices made (way rejected, cost if wrong)

- **Moved rule or group without a hint (spec D4, left to the maker):** a rule whose group changed is
  moved; within a group, of the rules in both copies, all but a longest set kept in the same order
  (longest increasing subsequence) are moved; the same for groups. A hinted rule or group whose place
  changed is moved and left out of that set. Rejected: comparing numbers (names every rule whose
  number shifted). Cost if wrong: for a swap with no hint the rule named is fixed by the search
  order, so it may be the other one — exactly the case the hint exists for.
- **Order of entries of one edit:** groups removed, added, changed, moved; rules removed, added,
  changed, moved; trip plan. The spec gives no order; one act of today's editor gives one change.
- **A rule changed and moved in one act** gives both entries; „Zmieniono regułę” uses the number
  after the act. The spec gives {numer} without saying before or after for this case.
- **Rules of an added group** each give „Dodano regułę …” (D4 exempts only a removed group's rules);
  today's editor adds empty groups, so this does not arise.
- **The discovery's entry** is composed from the state returned with the event, with its `discovery`
  set to what the event revealed, so the entry holds the event's content even if a state held another.
- **The number of D2** also changes where only the wait mark changes at a clearing, to follow D2's
  "every change of the above" literally; it never changes for a record that changes nothing.
- **Window:** reads only the rows it returns (no pass over the chronicle); the paragraph of
  „Wszystko” is included where its place is at or after the oldest entry of the window. The window's
  size is the caller's (Slice 5).
- **Hint type name** `MoveHint`, act type `CopyAct` — names of my choosing (spec leaves names to the maker).

## Reaches beyond the handoff

- `src/browser/sim/programs.ts` (`sameData`, `saveCopyIntoProgram`, `saveCopyAsNewProgram`,
  `discardCopyChanges`, `switchProgram`, around lines 300–772): to compare rules and trip plans with
  the simulation's own equality and to know which program name each act leaves on the copy.
- `src/browser/sim/data/maps.ts`, `src/browser/sim/data/campfire.ts`, `src/browser/sim/data/actions.ts`
  (labels): for the completion text, the campfire's name and the expected words in tests.
- `src/browser/view/game-view.ts:190-300` and `src/browser/view/program-editor.ts:60-330` (move
  functions): to shape `record` and the hint for Slices 4 and 5.
- `the author's rule on writing scripts`: the user's rule before writing the one-off script.

## Adaptations of section 4

none — no mismatch between the plan and the code.

## Searches not found or unclear

- D2 lists the wait mark among what the number follows, while nothing draws it; read literally (see
  choices). Unclear, not blocking.
- Whether {numer} in „Zmieniono regułę” is the number before or after when the same act also moves
  the rule — not settled by the spec; number after taken. Not reachable with today's editor.
