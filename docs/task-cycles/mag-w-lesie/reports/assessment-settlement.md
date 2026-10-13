# Settlement of the independent assessment (assessed commit bec4d25, range 1701186..bec4d25)

| Remark | Settlement | Why |
|---|---|---|
| A1 cut `game minute`, `character skill` | rejected | both are projected glossary entries approved at the readiness gate; `game minute` is assigned to item 3, `character skill` is a projected term D-08/1 uses (WAY-126 brings projected terms an entry uses) |
| A2 bare words map/action/choices/tests (WAY-104) | accepted in part: the cycle's own entries (D-09–D-11, D-17, the invariants the cycle wrote other than the two projected, the term `restart`) get qualifiers; projected entries and their parts keep the gate wording — collision WAY-104 vs WAY-126 goes to the human (Q29) | WAY-25: the agent does not settle a collision between two decisions |
| A3 undefined/inconsistent words | concern only: "free game minute", "known" tile, "creatures/items", "restart of a map run" all stand in gate-approved wording or its parts; "known tile" = revealed tile (Q12); named in the request | WAY-126 |
| A4 D-04/3 adds new rules under an existing question (WAY-19); *Rejected* counts entries | rejected | the readiness gate approved "What is the game built with?" as one entry with these sentences, and the plan assigns its completion to item 3 |
| A5 "the generator" singular vs D-12 "generators"; layout order covered by no invariant | concern only; named in the request (projected invariant wording); fixed order is pinned by the golden-value unit test | WAY-126 |
| A6 icon-credits over-demands relative to CC BY 3.0; Rests on cuttable; fact covers Delapouite only | accepted: cut icon-credits *Rests on*; D-17 rationale states what CC BY 3.0 §4(b) asks and that stating the change is the product's choice; the four icons are Delapouite's | WAY-73; source of the fact |
| A7 D-17/D-09 level-2 parts checkable | concern only | level 2 accepted for the drawing's interaction (needs a browser) |
| A8 sentences joining two rules; simulation-isolation Rests on none | concern only: each sentence states one property of one behaviour; splitting doubles checks for no gain | cost |
| A9 duplicated helper code in checks | rejected | each check stays readable alone; a shared helper couples checks and refactoring them reruns every deliberate break |
| A10 checks computing expected values (WAY-69) | accepted for map-run-tiles and content-identifiers (they read the expected values at run time from the data file their invariant is about — WAY-69's violates example): write the values out; walk-target and program-rule-pick: concern only (they compute from their own written-out rules or fixed scenarios, never by calling the code) | WAY-69 |
| A11 checks asserting more than the sentence | concern only | each extra assertion follows from the sentence's terms |
| A12 Part every vs simulation; dependency by build output | concern only | — |
| A13 overlap between D-14/D-08 and D-10/D-13/D-15 | concern only (gate wording) | — |
| A14 docstrings cite a spec not in the repository | accepted: cite the foundation entries instead | the spec leaves with the cycle record |
| A15 unit tests overlap invariant checks | concern only | — |
| A16 "trip plan" in `program` | concern only (current entry, task 13) | — |
| A17 D-11 rationale rests on loop unsourced | accepted: *Origin* names the source (loop's data `src/sim/data/balance.ts`, the task document) | WAY-29 |

## Applied — foundation

Commit 3093356 (foundations/decisions.md, foundations/invariants.md; not pushed).

Changed entries:
- D-10/1 (A2) — heading and binding sentences: "an action the character is carrying out" → "the character's action in progress"; "that action ends" → "the character's action ends". New fingerprint a03f8b53. Meaning: Ani zmiana programu, ani warunek innej reguły programu nie przerywa czynności, którą postać właśnie wykonuje; program wybiera regułę ponownie dopiero, gdy ta czynność się skończy (znaczenie bez zmian).
- action-in-progress/1 (A2) — sentence: "The character's action in progress lasts its full duration, …"; *Derives from* D-10@a03f8b53. Meaning: Czynność, którą postać właśnie wykonuje, trwa do końca, nawet gdy program się zmieni albo spełni się warunek innej reguły (znaczenie bez zmian).
- icon-credits/1 (A6) — *Rests on*: none (every demand stands in the sentence); sentence unchanged. Both facts stay named by D-17/1's *Based on*, so neither is left with nothing resting on it; no fact withdrawn.
- D-17/1 (A6) — *Rationale* rewritten: the licence asks to include the licence or its address (§4(a)), credit the original author and identify the use of the work in the changed work (§4(b)); saying how each file differs is the product's own choice. *Based on* gains a quoted citation of CC BY 3.0 §4(a) (read today), because no fact holds the licence-copy requirement. Binding sentences unchanged.
- D-11/1 (A17) — *Origin* adds: mag_w_lesie_loop2.md "Context" (pace from loop's data) · loop's `src/sim/data/balance.ts`, `gameMinutesPerRealSecond: 1`.

Not changed after reading: D-09/1, glossary `restart`, and the other cycle invariants hold no bare process word in a domain meaning ("game map" is already qualified; "file" keeps its ordinary meaning; "`script` or `foreignObject` element" carries its qualifier).

Invariants whose sentence changed (check to re-confirm): action-in-progress/1. The docstring of tests/invariants/test_action_in_progress.py (lines 1, 12) still quotes the old wording.

Guards: decisions — only the 13 `<request link>` placeholder errors/warnings; invariants, environment facts, glossary — 0/0/0; part map (`--base`) — 0 errors, 1 unchecked (dependency graph). Gate: 76 tests OK, all 25 invariants pass.

Questions:
1. D-11's Origin names loop's file without a commit; loop was not read (prohibited), so the value is transcribed from the task document only. Pin a loop commit?
2. Accept the §4(a) quotation in D-17's *Based on* as a plain citation, or should cc-by-3-adaptation-credit gain it (a fact change through the facts skill)?
