PASS 615847227e764d28cae54d6a5d7d4485f2324211

# Review of the return step — kafelek-postaci-w-siedzibie

Range `aeb2711a686afbdd93e6ab6375a66fc7f0f7dc47..61584722`, one commit `61584722` (`git rev-parse HEAD` = `615847227e764d28cae54d6a5d7d4485f2324211`, the head given). `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the commit the gitlink records. The diff changes only `foundations/decisions.md`, D-42 *Verification* (two lines): the clause `tests:` gains "the frame of the card of a character in an earning loop on Siedziba in `positive`, on a card with no background of its own, so that it touches `panel` at rest and `highlight` under the pointer, through the real stylesheet", and the complies item with the same content plus "on both of which `positive` keeps the 4.5:1 of its text" is removed.

Counts: blocking 0, Minor 1, out of scope 0 (Declined to judge: 2 lines).

## Findings

### Critical

none

### Important

none

### Minor

1. **`foundations/decisions.md:5104` (D-42 *Verification*, clause `tests:`) — the clause says a little more than the test of D-42 reads.**
   What is wrong: the clause names one test case, "so that it touches `panel` at rest and `highlight` under the pointer". The case that cites D-42, `tests/view/headquarters-screen.test.mjs:459` („a card whose character's earning loop goes on has a frame in positive …”), reads through the real stylesheet two things: the frame of the looping card is `var(--positive)` (line 484), and no card has a background of its own (lines 489–494). It reads neither the `panel` of the block behind the card nor the background under the pointer. The background `highlight` under the pointer is read by the next case, `tests/view/headquarters-screen.test.mjs:501`, which cites D-280 and uses a card that is not in a loop (Ala). The hover rule `src/browser/headquarters.css:193` does not depend on `.looping`, so that case covers the looping card too. No case I found reads that the block behind the cards is `panel`.
   Why it matters, and why only Minor: the contrast itself is held by the invariant design-token-contrast, which this *Verification* names, because `positive` keeps 4.5:1 against all five backgrounds (`foundations/invariants.md:500`). If the section „Drużyna” stood on another of those five backgrounds, the frame would still keep 3:1. So the gap in the test changes nothing the player sees and leaves no unguarded part of the binding sentence. The sentence can only mislead a reader into thinking one test reads both touched colours. A wording such as "…on a card with no background of its own, through the real stylesheet; the background `highlight` of a card under the pointer as D-280's test reads it" would be exact. The author's report (`reports/author-return-report.md:8`) says the test "reads the frame and the absent background through the real stylesheet", which is correct; only the entry's "so that" goes beyond it.
   Evidence: `tests/view/headquarters-screen.test.mjs:459-496`, `:501-524`; `src/browser/headquarters.css:178-195`.

## What was judged and found sound

- **The move follows the method.** `.the-way/task-cycle/skill/return_step.md:18-20` says: a part of a sentence the change writes that a test holds leaves the pair of examples and goes into the clause `tests:`. The D-42 sentence on the green frame is the change's own: row 5 of *Settlements to record*, To do 5. The removed complies item is that part. Its last clause ("on both of which `positive` keeps the 4.5:1 of its text") is held by the invariant design-token-contrast, which stays in the clause `invariants:`. Nothing the old example held is now unguarded, apart from the `panel` behind the card in finding 1, which has no consequence.
- **The named test exists and checks the claimed case.** It loads the game's real stylesheets with `gameStylesheetText()` (`tests/view/game-stylesheets.mjs:41`). It mounts a team of two with one character in a loop and checks that the frame of the looping card is `var(--positive)` and the other card's is `control-border`. It also checks that neither card declares a background. The case would fail if `.team-member.looping` took another role or `.team-member` took a background. It does not compute its own expected value. It cites the binding sentence of D-42 word for word (line 461), which matches `foundations/decisions.md:5097`.
- **No binding sentence changed.** The diff touches only the *Verification* line and the complies line. The two paragraphs of D-42 (`foundations/decisions.md:5097`, `:5099`), its rationale and *Rejected* are byte-identical to `aeb2711a`. The violates line is unchanged.
- **Consistency with the rest of the foundation.** D-39's *Verification* (`foundations/decisions.md:5051`) names the same frame in its clause `tests:`, in the same form. D-42's rationale (`:5109`) and *Rejected* (`:5110`) still say the frame adds no pair to the contrast test, which matches the invariant and row 5. A search of `foundations/*.md` and `guidelines/*.md` for "frame of the card", "green frame" and "card with no background" finds no other place still holding the frame as an example.
- **Sample of the author's comparisons.** The glossary entries "headquarters" and "at the camp" (`foundations/glossary.md:87-97`) agree with the change, as the report says. D-44's *Verification* (`foundations/decisions.md:5142`) already names the dashed „+ postać” in its clause `tests:`. Its violates item "a `<button>` of the screen with a dashed frame of its own" is held by no test, so it rightly stays. D-217's complies item stays for the role of the line while a use is left, which its *Verification* says no test holds (`foundations/decisions.md:6594-6596`). No glossary, part-map or invariant entry needed a correction that the step missed.
- **Reserved choices, trust boundaries, code made for a test:** not applicable, since no code changed in the range.

## Declined to judge

- The other complies items of D-42 (the pulse of satiety down to 40 %, the gap in `panel` between the zones) and whether tests now hold them. Those sentences predate this change and the return step's rule reaches only the sentences the change writes. Out of scope.
- `lastDeclared` in `tests/view/headquarters-screen.test.mjs:149` skips rules inside `@media`, so a background a media query gave a card at rest would not fail the case at line 459. This test file is not changed in this range, and the whole change's review already passed it. Out of scope.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | „0 errors” |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 error, 0 warn, 122 info |
| `python -B scripts/test.py tests/view/headquarters-screen.test.mjs` | 1 | did not run the test: `KeyError: 'npm_execpath'`, since the script's build step needs to be started through npm. No result; it was rerun through npm, next row. |
| `npm test -- tests/view/headquarters-screen.test.mjs` (builds, then runs the one file) | 0 | 37 pass, 0 fail |
| `git status --short` after the checks | — | empty; the worktree is clean |

Not run: the full gate (`npm test` without an argument), by the handoff; the cycle runs it before the request.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/return_step.md`, whole: to judge whether the move of the example into the clause `tests:` is what the return step's method requires.
- `foundations/invariants.md`, entry design-token-contrast (line 498): the invariant D-42's *Verification* names, to see what holds the 4.5:1 of `positive`.
- `src/browser/headquarters.css:168-199`, the rules of the card: to see what the test reads.
- `tests/view/game-stylesheets.mjs:41` and `lastDeclared` (`tests/view/headquarters-screen.test.mjs:149`): to judge whether the case reads the real stylesheet.
- D-39 *Verification* line (`foundations/decisions.md:5051`), D-44 whole (`:5127-5148`), D-217 entry text and *Verification* up to its complies line (`:6581-6596`): to sample the author's comparisons of the other pairs.
- `foundations/glossary.md`: the entries "headquarters" and "at the camp", and the headings matching card/tile/headquarters/camp/secondary action/dashed.
- `package.json` and `scripts/test.py`: to run one test file without the full gate.

## Working copies

None made. `.runs/review-return/` was not created, since no check needed a changed file. `npm test -- <file>` runs the product's build, whose output is the product's own and outside the rule on working copies. No background process was started, and no browser was opened.

## Unread material

- `foundations/decisions.md`, D-217: read its binding paragraph and its *Verification* up to the start of the first complies item (lines 6581-6596), not the rest of the entry.
- `reports/author-return-report.md`: read whole. `task_frozen.md`: *To do* (all items), *Decisions in play* and *Settlements to record* read whole; *Need*, *Acceptance criteria*, *Questions to settle*, *Context* and *Out of scope* not read, as the handoff names only the first three.
- The styleguide rule "Contrast of every pair" (`guidelines/styleguide-browser-view.md:174-215`): read from its head through the item on the fills of the body row. Its item on the green frame (lines 194-197) agrees with the moved *Verification*: the frame adds no pair, since `positive` keeps 4.5:1 on `panel` and `highlight`. The rest of the rule was not read. The diff does not touch the styleguide.
- The entries D-42 links to: D-42 has the *Relations* "none". Its *Based on* names environment facts (wcag-*), which I did not open, since the diff changes no sentence resting on them.

## Searches not found or unclear

- I found no test case that reads the background of the block behind the cards of „Drużyna” as `panel` (search of `tests/view/headquarters-screen.test.mjs` for `panel`: only comments and the picture band's case at line 1103). See finding 1.
- `python -B scripts/test.py <file>` cannot run outside npm (`KeyError: 'npm_execpath'`). The author's report gives the npm form, which works.
