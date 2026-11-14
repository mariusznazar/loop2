FAIL 3767fd3d15f3c1c8efc65987fe3817f6d9240a7c

# Review of the whole change — zmiany-decyzji-gry-z-przegladu

Range `5159e8c475a5faa77529020a51b21e271c695132..3767fd3d` (commits `2e5c2a80`, `285a210c`, `3767fd3d`), worktree the task's worktree, the repository's root. `git rev-parse HEAD` = `3767fd3d15f3c1c8efc65987fe3817f6d9240a7c`, as dispatched. `.the-way` is at `55afa8e57aa1b83c77108576a36642722e0dda15`, equal to the gitlink; the pin is not changed by the range. The route is one author without a plan: no slice reviews, no spec, no plan. I changed nothing in the worktree (`git status --short` empty before and after my checks).

Counts: blocking 1 · Minor within the task 3 · Minor out of scope 5.

## Verdict on the task

| Item / row | Verdict |
|---|---|
| 1 (D-369, comment of `SAVED_GAME_VERSION`, guideline rule) | Met. The claims are true: `MINUTE_KINDS` in `src/browser/sim/run-record.ts:16-22` is the keys of `ACTIONS` without combat actions plus `wait` and `combat`, and `fields` rejects another key set. One residual inconsistency in the guideline (Minor 1). |
| 2 (D-346, D-383) | Met. `src/browser/view/chronicle.ts:124-125` holds `tab` and `filter` as plain `let`; no `localStorage`/`sessionStorage` anywhere in `src/browser`. |
| 3 / row 3 (`streak-program-change`) | Met. Wording "A change, in a map run that has not ended, of the program rules or rule groups of the copy it carries out, and every switch … during that map run …" matches `programs.ts` `withCopyProgram` (`!mapRunEnded(run) && ruleContentChanged`) and D-131. The game-written rule exception is not named, as the task's *Out of scope* requires. Test `tests/invariants/test_streak_program_change.py` run: 5 tests OK. |
| 4 (D-120) | Met, with Minor 2. Data: `src/browser/sim/data/skills.ts` `campfireCrafting` "Wytwarzanie ogniska" holds `craftCampfire`; `actions.ts` "Wędruj" belongs to no skill; one archetype only (`archetypes.ts`). D-379 does hold the practice curve of "Wytwarzanie ogniska" (20, 55, 110, 190). "the common campfire" is gone; *Rejected* holds the ognisko-for-every-archetype way as Q4 answers. |
| 5 (D-186, D-179) | Met. `trip-lines.ts:88-90` (`visible` = non-empty snapshot or snapshot differs from the copy's bring list), `programs.ts` `switchProgram` (keeps `run.bringPlan`, replaces the copy), `withCopyProgram` (trip-plan-only change leaves the streak), `program-panel.tsx:634-641` (`TripPlanView` only when `mode === "programs"`). `trip-plan-progress` untouched. |
| 6 (D-311) | Met. `styles.css:279` `@media (min-width: 1074px)` gives two columns; narrower, `grid-template-areas: "world" "program" "tabs"` (`:257-260`), so the chronicle stands under the whole program. 1074 = 706 + 16 + 320 + 32 (comment `styles.css:247-249`). The order matches D-282's *Verification*. Refers to D-393 and D-282. |
| 7 (D-367) | Met. `scene.tsx:618` clears a running effect when `drawing === null || started`, which is "the map run is left or a new one starts"; the place is `current.x`, the mage's place at the previous reading. The clause is smoothed. |
| 8 (earning loop) | Met; see the sampling below. |
| 9 / row 1 (D-393) | Content matches row 1 and Q1/Q2; one blocking collision (Finding 1). |
| Row 2 (glossary `loop`) | Met in content; see Minor 5 on the form of *Not*. |
| Q1–Q4 | Answered as the task gives (page area; Chromium daily checks, Firefox and Edge by hand with the cost; sentence in the guideline through the guideline's own rule form; D-120 *Rejected*). |
| *Out of scope* | Nothing of it was done: no save variant, no game-written-rule exception, `trip-plan-progress` and `withCopyProgram` untouched, no CSS or D-282 change, no code keeping the chronicle pick across a reload. |

Trust boundary (`src/browser/sim/saved-game.ts`, part `simulation`): confirmed a comment alone. `git diff 5159e8c4..3767fd3d -- src/browser/sim/saved-game.ts` filtered for lines that are not comment lines is empty; the only changed lines are the doc comment above `SAVED_GAME_VERSION` (still `= 5`). No other file of any trust boundary is in the range (files: `foundations/decisions.md`, `foundations/glossary.md`, `foundations/invariants.md`, `guidelines/coding-saved-game.md`, `src/browser/sim/saved-game.ts`). Irreversible operation: none (no deploy, migration or deletion). Reserved choice: none taken. No screenshot file, no UI change, no test written or changed (no invariant test changed).

## Item 8 — sampling and search

I extracted every standalone `loop`/`loops`/`Loop` of `foundations/decisions.md` at the head that is not preceded by "earning" (also across a line break) and not followed by "clock" (script `python -I`, 202 candidates; the author counted 201 after D-136, the difference is a counting detail of the edge cases, not a place) and read each in context. All 202 are the previous game ("as in loop", "than loop", "the old Loop game", "the end of loop"), the event loop (D-112), the Hooks rule (D-267), a restarting crash loop (D-355), the animation sense (D-316, D-322, D-364, D-389 "no loop of drawing") or `Earning loops` already complete (D-55, D-242). None means the earning loop. I read in full the changed decisions D-93, D-164, D-189, D-239, D-241, D-246, D-247, D-251, D-329, D-369, D-389, D-136 and the changed words in D-208 by their hunk: every changed place is the earning loop (checked against the surrounding sentences: catch-up of an earning loop, `loops` map, "Puść w pętlę", the line of the earning loop), none was the previous game. Positive control: the script matches the bare words of the previous-game uses (about 150 hits) and none of the "earning loop" ones; I did not run it on the base, so the author's count of 25 changed places is checked by reading the diff hunks (26 with D-136), not by a count of mine.

D-136 "keeping the earning loop going" (commit `3767fd3d`, the orchestrator's reading): accepted. With the new glossary entry a bare "loop" can only be the predecessor game, which makes the sentence false; the sentence sits in a rationale that opens "a map checks whether a program survives on its own", and Las's solving condition is a streak without cold or hunger, which is what an earning loop needs to go on. The source of the phrase gives no sharper meaning (the text came with commit `7e3aa5e8`, which moved reasoning into the entries). The binding sentence of D-136 is untouched.

## Findings

### Blocking

**1. Important — D-393 collides with D-280 and D-389 (and sits next to D-288, D-349) with no precedence recorded.**
Place: `foundations/decisions.md:9641-9654` (D-393: *Relations: none*, *Verification* `complies` "a remark that the look breaks in Safari, or in a window 1000 px wide, set aside as outside the set and below the smallest window", *Rationale* "a window below the smallest, such as one narrower than 1074 px (D-311), is no fault to fix") against `foundations/decisions.md:6539-6541` (D-280 *Verification* `complies`: "the content of Siedziba and of Programy 1344 px wide in a window 1920 px wide and as wide as a window 1000 px wide") and `foundations/decisions.md:9551-9553` (D-389 *Verification* `complies`: "in a window 400 px wide the clearing cropped at the sides around the fire and as many whole characters as the band holds"); D-280's binding sentence "the full width of a narrower window" and D-389's "a window narrower than the picture crops it at the sides" are binding sentences about windows below 1280 × 720.
What is wrong: D-393 says that a fault in a window below 1280 × 720 is set aside, and a remark about a window 1000 px wide is its own `complies` example. Two older decisions bind behaviour in exactly such windows, with the 1000 px and 400 px windows as their own examples. An agent that compares a change with D-393 will drop a defect that D-280 or D-389 calls a violation; an agent that compares with D-280 will fix it. The two entries disagree and D-393 records no relation (no `narrows`), so the collision is "settled silently" by whichever agent reads first, which WAY-25 forbids (`.the-way/elements/decisions/template.md`, "Relations and precedence"). The sentence that carries the consequence ("no fault to fix", "set aside") stands in *Rationale* and *Verification* only, while the binding sentences hold the set and the window; the template says what a decision forces on later work stands in a binding sentence or a field, never in prose (WAY-05). The task's own row 1 answers "is a remark about a 1000 px window a bug to fix" with no, so the intent is in the task, but the task did not weigh D-280 and D-389, and the change had to record precedence or stop (WAY-25).
Why it matters: D-393 is meant to end the recurring question about narrow windows; as written it starts a different one, and it weakens two decisions that were not changed.
Evidence: the quoted lines; D-311's own *Accepted with it* (written in this change) takes the narrow layout as an accepted cost, which is consistent, but D-280 and D-389 have no such clause.
Slice: none (one author, no plan).
Recommended answer for the fix (the human's decision on precedence is not mine): keep what the task settled for remarks about look, and say in D-393's binding sentence or its *Relations* which decisions keep their meaning below the smallest window — either "decisions that define the behaviour of a narrower window (D-280, D-282, D-311, D-389) stay as they are; a fault of the look in a window below the smallest, where no decision defines it, is not fixed", or a recorded `narrows` with the area where D-393 prevails. Move the consequence out of *Rationale* prose into the binding sentence. Drop "or in a window 1000 px wide" from the `complies` example or tie it to "where no decision defines the behaviour".

### Minor, within the task

**1. `guidelines/coding-saved-game.md:117-121` (second paragraph after the rule) contradicts the new sentence.** The paragraph lists "identyfikatory … rodzajów działań" among what the load checks against the data and says "Zmiana którejś z tych rzeczy nie podnosi wersji sama". The new sentence at `:102-105` says that adding or removing an ordinary action does raise the version. The first paragraph's "choć zmiana danych niżej wersji sama nie podnosi" points at the exception but the second paragraph, which an agent reads next, names action kinds with no exception. Effect: an agent can read "action kinds: no bump" and skip the bump the item asks for. Fix: one clause in the second paragraph ("poza dodaniem albo usunięciem zwykłej czynności, które podnosi wersję"). Author's finding 3; graded here Minor because the first paragraph names the exception.

**2. `foundations/decisions.md:2339` D-120 *Rationale* still says "One verb, „Wytwórz”, makes both a campfire and an archetype's goods".** The data hold one target of "Wytwórz", the campfire (`actions.ts` `craftCampfire`, label "Wytwórz — ognisko"; no other "Wytwórz" in `src/browser/sim/data/`). Item 4 asks the *Rationale* sentence to match the data; only "common" went. The sentence is read as a design statement (D-120's *Rejected* says a filter on verbs "cannot express „Wytwórz”"), so a reader is not misled about behaviour, but it names a target the data lack. Fix: "makes a campfire and, in later data, an archetype's goods", or drop the second half.

**3. `foundations/decisions.md:9647-9650` D-393 *Verification* `complies` holds "a remark … set aside" as an example.** The template (`.the-way/elements/decisions/template.md`, "Verification") says `complies` is a change that keeps the decision. A remark set aside is no change. The first half of the example ("a check of a change in Chromium at a page area of 1280 × 720 px") is a change. Fix together with Finding 1 (rewrite the pair so each side is a change, or `none`).

### Minor, outside the task

**4. `tests/invariants/test_streak_program_change.py:1-3` still quotes the old sentence of `streak-program-change` in its docstring** (author's finding 1). The task changes no test; nothing compares the docstring with the sentence (`foundation_check.py` checks identifiers only). The test itself covers the new wording (ended-run case at its line 34) and passes. Outside the task; the orchestrator may carry it into the fix round since it is one line.

**5. Glossary `loop`, *Not* carrier `earning loop`** (`foundations/glossary.md:223-227`; author's finding 4). The glossary template says what carries a meaning is "the term of another entry … never one holding the term or its forms"; "earning loop" holds "loop". The task orders this exact carrier, so the entry follows the task and conflicts with the template; `foundation_check.py` passes because it checks that *Not* is present. Outside the task: the choice of another carrier or a template change needs the human. Reported so the conflict is known.

**6. D-136 binding sentence lacks "has not ended"** (`foundations/decisions.md:2845-2855`; author's finding 2). It has the same gap that the invariant had; D-131 says "the map run in progress". D-136 is in the task only for one word. Outside the task.

**7. Bare "loop" meaning the earning loop remains in English comments of code** (for example `src/browser/sim/loop.ts:183-216` "the loop is dropped", "no loop of that character"). The glossary template's "A changed meaning" asks the author to rewrite each such use in every tracked English file; item 8 is limited to decisions, and WAY-104 lets the code keep the domain word. Outside the task; a decision on whether to touch code comments belongs to the human.

**8. D-393 *Rejected* rests on a statement about a tool ("it did not install with WebKit") while *Based on* is `none`.** The environment-facts file holds no fact on it (`grep` found none); the task's *Not chosen* carries the statement and the template makes *Rejected* hold what the source keeps (WAY-134), so the author was right to keep it there. If the tool later installs Firefox the reason falls, which is what an environment fact is for (`the-way-record-environment-fact`). Outside the task.

### Author's findings graded

1 → Minor 4 (out of scope); 2 → Minor 6 (out of scope); 3 → Minor 1 (within the task); 4 → Minor 5 (out of scope); 5 (D-393 *Scope* `browser-view, agent-workflow`) → no finding: the decision binds how an agent checks (`.claude/**` and `guidelines/**` are `agent-workflow` in `foundations/part_map.md`) and `browser-view` for the screens; D-254 carries both scopes too. The author's reach into `invariants.md` (`loop-practice-payment`, one word) is right by the glossary template's "A changed meaning" and changes no *Method*, link or test.

## Claims of the new D-393 checked

- "window = page area 1280 × 720": `.claude/skills/loop2-play/SKILL.md:240` sets `page.setViewportSize({ width: 1280, height: 720 })`; `styles.css:243-249` counts "a window 1280 px wide" from the media query width. Consistent. D-311 (`1280 × 720` as "a low window") and the examples at 1280 × 800 (login card) stand above the line.
- "Chromium for the agent's daily checks": not stated in the skill, in `.playwright/cli.config.json` or in D-254 (they name Playwright CLI/MCP, no engine); it is the task's Q2 answer and the Playwright default. I could not confirm it from the repository (see Searches).
- "Firefox and Edge by hand in a real browser in a session of its own": consistent with D-254 (the inspection adds to what a person checks and replaces none of it), D-75 and D-88.
- Collision with D-311: none (D-311's new clause points at D-393 and D-282 and agrees with it). With D-282: none (the narrow order is bound by D-282 and kept). With the skill `loop2-play`: none. With D-280, D-389: Finding 1. With D-04 ("runs on a phone as well", in a rationale about pure functions) and D-282 ("a layout for a phone … come later"): no conflict with "on a computer".

## Declined to judge

- Whether the set Chrome, Edge, Firefox (Safari out) and the 1280 × 720 line are the right product choices: settled by the human in the task.
- The behaviour of the game at windows narrower than 1280 px in a real browser: the task changes decisions, not code; I did not run the game.
- Whether D-136's reading of "loop" is the historical one: no source pins it; I judged only that the new reading is sound (above).
- The wording of D-120 *Rejected* "with one archetype it gives nothing": the claim is the task's (Q4); the data show one archetype.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `3767fd3d15f3c1c8efc65987fe3817f6d9240a7c` |
| `git diff --check 5159e8c4..3767fd3d` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` (from the worktree root) | exit 0, `0 errors` |
| `npx prettier --check src/browser/sim/saved-game.ts` | exit 0 |
| `python -B -m unittest test_streak_program_change` (run in `tests/invariants`) | exit 0, 5 tests OK |
| `git diff 5159e8c4..3767fd3d -- src/browser/sim/saved-game.ts` filtered for non-comment changed lines | empty |
| `python -I` script over `foundations/decisions.md`: standalone `loop`/`loops` not after "earning" and not before "clock" | 202 candidates, all read in context (above) |
| `git grep -w -i loops?` over `src`, `tests`, `scripts`, `guidelines`, `*.md` outside `foundations` | read for Minor 7 |
| `git status --short` after all of it | empty |

Not run: `npm test` (the orchestrator's gate), `eslint` on `saved-game.ts` (the author ran it; the file's change is a comment), the game in a browser.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` (to line 200), `.the-way/elements/glossary/template.md` (whole), `.the-way/elements/invariants/template.md` (searched for the sentence rules), `.the-way/product-guidelines/coding/template.md` (to line 140), `.the-way/product-guidelines/reading.md` (whole): to judge the entries and the guideline the change writes.
- Code of the base: `src/browser/styles.css:228-300, 1610-1625`, `src/browser/view/scene.tsx:560-680`, `trip-lines.ts:60-110`, `program-panel.tsx:625-645`, `chronicle.ts`, `src/browser/sim/programs.ts:550-775`, `run-record.ts:1-45`, `data/actions.ts`, `data/skills.ts`, `data/archetypes.ts`, `saved-game.ts:60-100`: to check each new claim.
- `.claude/skills/loop2-play/SKILL.md` (lines 1-60, 225-262) and `.playwright/cli.config.json`: for D-393.
- The invariants `streak-program-change`, `loop-practice-payment`, `save-version` (whole), `saved-program-edit` (its first lines), and `tests/invariants/test_streak_program_change.py:1-40`.
- The decisions D-131, D-136, D-206, D-207, D-208, D-213, D-254, D-280, D-282, D-339, D-343, D-346, D-359, D-379, D-386, D-212, D-242, D-75, D-88 and the changed ones, by heading: to judge collisions and cited claims.
- The review note `foundation_review_2026-11-13.md`: only `### F-1`, `F-8`, `F-12`, `F-19`, `F-20`, `F-22`, `F-27`, `F-38`, `F-40` of section 1, each to the next `###`; the last one, F-40, runs on to the end of the file by that rule, so my extract also held the weak-point table of section 2, which I looked at only for the rows naming D-179, D-186, D-206 and D-369.

## Unread material

- Decisions of my selection: the log holds 393 decisions; 348 name `browser-view`, `simulation`, `agent-workflow` or `product-foundation` in *Scope* (the parts the change touches by "Reading the foundation"); the other 45 name only `account-server`, `build-tools` or `deployment`. **Read whole: 38** (D-75, D-88, D-93, D-120, D-131, D-136, D-164, D-179, D-180, D-186, D-189, D-206, D-207, D-208, D-212, D-213, D-239, D-241, D-242, D-246, D-247, D-251, D-254, D-280, D-282, D-311, D-329, D-339, D-343, D-346, D-359, D-367, D-369, D-379, D-383, D-386, D-389, D-393). **By title only: 355** (the titles of all 393 were skimmed in one list; the 45 outside the selection by title and Scope alone). D-04 was read for its rationale (lines 86-112) and the hunk, not whole.
- Decisions that bear on the change and stayed unread whole: D-288 and D-349 (both state behaviour in a "narrow window" and a 1280 px window; found by search, relevant to Finding 1), D-310 (line 7354 "a narrow column"), D-368 and D-370 (the end-of-run window in "one column under 1074 px"), D-278 (login card at 1280 × 800), D-338 and D-348 (chronicle), D-316, D-322. I read the passages my searches for "narrow", "window", "1074" and "1280" returned, not the decisions.
- Invariants: read whole the four named above; the other invariants of the parts `simulation`, `browser-view`, `agent-workflow`, `product-foundation` and `every` were not read (none cites the changed words; `foundation_check.py` passes). Part-map entries: read whole `browser-view`, `simulation`, `account-server`, `build-tools`, `agent-workflow`, `product-foundation`; `deployment` was read to its first lines only.
- Glossary: read the entries from `resurrection` to `save time` (lines 205-250) and the head; not the whole product glossary. The glossary of the-way: searched by heading for "loop", "window", "browser", "map": no hit; not read whole.
- Guidelines: read whole `guidelines/coding.md` and `guidelines/coding-saved-game.md`. Not read: `guidelines/coding-simulation-module.md` (the saved-game file is read by `coding-saved-game.md` instead, per its *When to read*), the styleguide and testing guidelines (no screen or test changed). Of the-way's guideline template only the first 140 lines.
- Templates: the decisions template was read to its *Verification* section (line 200 of the file); the rest ("Origin", "Recovered decisions") was not read.
- The review note: only the nine sections named; nothing else of its ~290 KB.

## Searches not found or unclear

- "Chromium for the agent's daily checks": no file of the repository names the engine of Playwright CLI/MCP (`.claude/skills/loop2-play/SKILL.md`, `.playwright/cli.config.json`, D-254, `foundations/environment_facts.md`: `grep` for chromium/webkit/firefox gave no hit). The claim stands on the task's Q2 answer only.
- `WebKit` and `Playwright` in `foundations/environment_facts.md`: no entry (also reported by the author).
- The origin of "keeping the loop going" in D-136: `git log -S` finds only `7e3aa5e8` (text moved) and `3767fd3d`; the meaning stays an inference.
- A test or script that compares a test docstring with the sentence of its invariant: none found.
- The author counts 25 places in 12 decisions plus D-136 (26 in 13); I counted the changed hunks of the diff (26 places) and did not recount the base. The F-38 "about 10 places in about 8 decisions" was a rough count of the review, as the author says.
