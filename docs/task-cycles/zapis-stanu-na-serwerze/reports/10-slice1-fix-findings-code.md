# Findings to fix — Slice 1 review (`FAIL b4c3687`), task `zapis-stanu-na-serwerze`

Copied word for word from `reports/08-slice1-review-report.md`, § Findings › Important. The review's Minor findings are not fixed (they go to the whole-change review).

This file holds the findings about Slice 1's code and tests (`2923c3c`).

**I1. The load refuses the server's `save` object, which spec decision 5 names as its input.**
`src/browser/sim/saved-game.ts:883` reads the document with `fields(value, ["version", "game"])`,
which refuses any key besides those two. Spec decision 5 (`spec.md:195-196`): "A function from an
unknown value (the `save` object the client hands over, or the document kept in page memory)".
That `save` object is, by spec decision 1 (`spec.md:83-86`) and Slice 4 of the plan
(`plan.md:297-300`, "hands `save` on as received"), an object of exactly `version`, `revision` and
`game`. So the one input the spec names first is refused as `shape`. Why it matters: if Slice 6
passes the client's `save` on, as the spec and the plan's Slice 6 ("a save the load function of
Slice 1", `plan.md:405`) read, every saved game state from the server is refused as damaged; the
page then starts a new game and saves it at once over the real one (spec decision 7), so the
player's whole saved game state is lost at the first sign-in. Nothing in Slice 1, its test or the
executor's report names this; the test's only top-level extra key is `savedAtMs` (refused, rightly).
Evidence: scratch probe (below) — `loadSavedGame({ ...savedGame(state), revision: 3 })` →
`{ ok: false, reason: "shape" }`; the same without `revision` → `ok`. Fix within the slice: admit
the `save` object as spec decision 5 gives it — e.g. an optional top-level `revision` checked as a
positive safe integer and not carried into the state — with a test of the server's `save` shape;
or the orchestrator settles in the plan that Slice 6 passes `{ version, game }` and corrects spec
decision 5's sentence. The first keeps one contract for both inputs.

**I3. The tests never load a map run whose activity is a wait or a `walkTo`/`walkToCampfire` move,
so a load that refuses the commonest running states passes the suite**
(`tests/sim/saved-game.test.mjs`; code `src/browser/sim/saved-game.ts:283-287`, `:461-465`, `:496`).
StrykerJS on `saved-game.ts` (guidelines/testing.md § Mutation testing) leaves these survived or
uncovered: the whole `wait` branch of `ACTIVITIES` (`:462-464`, NoCoverage — `return {}`, `fields(value, [])`
and the emptied block all live), `MOVES.walkTo: false` and `MOVES.walkToCampfire: false` (`:285-286`,
survived — each makes every in-progress `walkTo`/`walkToCampfire` with its `stepTo` refused), and
`doing.kind === "rule"` → `true` (`:496`). A wait is what every character does under the empty
„Program” of a new game (D-91) and whenever no rule applies; walking to a resource or a campfire is
in nearly every program. A regression in either path refuses the save of a running map run as
damaged, the new game is saved over it (spec decision 7), and the suite stays green. The written
document holds a gather, the moving case a wander, and "a game state the simulation made loads
back" uses only the FIGHTING program, which always picks a rule. Today's code is right for them
(scratch fuzz below: 0 refusals in about 590 000 real states, waits and walks included); the gap is
the test's. Fix: add to the loads-back case a state sent with the empty program (a wait in
progress) and one walking with `walkTo` (and `walkToCampfire`), or written-out variants of the
document. testing.md: "Autor dodaje asercję tylko dla rzeczywistej luki w wymaganym zachowaniu" —
this is one.
