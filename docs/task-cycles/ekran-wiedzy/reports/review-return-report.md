FAIL 42e15a5daf2a3ecf00da8ff9d5737063802d0531

# Review of the return step's commit — task `ekran-wiedzy`

Range `b67568aa07c51a60bdee8b47fc06329893630510..42e15a5daf2a3ecf00da8ff9d5737063802d0531` (`git log` shows one commit, `42e15a5d`; `git diff` one line of `foundations/decisions.md`). `git rev-parse HEAD` = `42e15a5daf2a3ecf00da8ff9d5737063802d0531`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the pinned commit (`git ls-files --stage -- .the-way`).

## Judgement of the commit's one line (handoff point 1)

The correction is right and within the return step.

- The old example of D-409 (`foundations/decisions.md:8613`, "complies: a new act of the screen Wiedza written as an act of the store …") was written by `0785c763` (the split of the view's controller), before the screen existed. At the head the screen Wiedza has no act: `src/browser/view/knowledge-entry.ts:4` ("The screen only reads the game state, so the entry holds no act and no memory") and `:12` (`store: Pick<StateStore, "get">`, no act of the store reachable); `knowledge-screen.tsx` holds no call to the store or the simulation (grep for `store|act|clock|simulation|dispatch`: only React imports and `ReactButton`). D-416's *Verification* (`decisions.md:4425`–`:4426`) requires "no change of the game state on the screen". The old example therefore named, as a change that complies, an act of a screen that D-416 forbids to have one — misleading to an agent comparing a later change. "A new act of a screen" keeps the example's point and is true.
- `return_step.md` has the step compare the entries the search of the foundation found and correct "whatever no longer matches"; the change (D-416) is what made the example stale, so the line is the return step's.
- D-409's binding sentences (`:8607`) are untouched; the four citations of D-409 in `tests/view/state-store.test.mjs:156`, `:175`, `:310`, `:311` quote the binding sentences only and still match (`foundation_check.py` with test citations: 0 errors).

## Findings

### Critical

None.

### Important

**I1 — D-280 *Rejected* calls the item „Konta” "a fourth item" of a menu bar that now holds four items** (`foundations/decisions.md:4188`).

- What: "*Rejected:* a fourth item „Konta” on the menu bar, only for an account with the owner role — the panel is easier to see, … but D-280's fixed list of items and its tests change and the bar looks different by role". The change (`11164840`) made D-280's binding sentence list four items, „Siedziba, Mapy, Programy and Wiedza” (`:4141`), and `menu-bar.tsx` holds four `ITEMS`. „Konta” added to the bar would now be its fifth item, so the sentence states something untrue at the head; the ordinal came from `f1733cf9` (the owner panel), when the bar held three items.
- Why it matters: the task binds this. Its answer to question 6 (droga A, `task.md:79`) and question 7 (`task.md:84`) says each task corrects what its own change makes untrue, and the human's words quoted there ("chyba niepowinno być tak, ze dopuszczamy że coś jest nieaktualne") reject leaving such a sentence. The task's *Decisions in play* (`task.md:127`, row 163 of the definition) has the task that writes a changed entry correct a field that its changed binding sentence makes untrue — D-280 is such an entry, and `return_step.md` asks the step to correct in the change whatever no longer matches. The return step's report (`return-step-report.md:14`) names "the item lists of the bar" among its searches and reports nothing else in D-280 but the m2 family, so the claim that everything else matched is not true at the head. A reader of D-280 meets "fourth item" two paragraphs under a bar of four and either counts the bar wrong or cannot tell which item list the rejection was weighed against. Graded Important as a missed requirement of the task (section 3: "a missed requirement"); it lies within the task, so it blocks.
- How it differs from m2: m2 (`:4156`, "the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście") is incomplete but true — the tests do open those five — and the task keeps the *Verification* field; this sentence is false.
- Evidence: `grep -n "fourth item" foundations/decisions.md` → `:4188` only; `git log -S "a fourth item „Konta”"` → `f1733cf9`; `git diff main...HEAD -- foundations/decisions.md` shows `:4141` changed to four items and `:4188` untouched.
- Fix suggested: "a fourth item „Konta”" → "a fifth item „Konta”" (or "one more item „Konta”", which does not need correcting at the next screen). One word, in the same kind of `docs` commit as `42e15a5d`.

### Minor

None.

## Point 2 of the handoff — what else the return step compared, checked against the head

- D-416 (`:4408`–`:4438`, read whole) against `knowledge-entry.ts` (read whole): the entry `while-shown`, building the screen anew at each entering, matches "each entering of the screen starts with the trees folded"; no act. The *Verification* pair holds only the keyboard and the layout. Matches.
- D-280 binding sentence, D-281 (binding sentence and *Verification* "eight addresses": `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}`, `#/wiedza`, `#/postac/{n}/przejscie`), D-291, D-322, D-327 against `screen-address.ts`, `menu-bar.tsx`, `game-view.ts`, `creatures.ts` and the test diffs of `scene.test.mjs` and `now-lines.test.mjs`: match. D-280's other parts: the *Rejected* sentence of I1; "Mapy and Wiedza standing on the menu bar at once, inactive — two items with no content" (`:4199`) stays a true description of a rejected alternative.
- D-408 (`:4380`–`:4393`, read whole): its complies example "the screen Wiedza added as its module, an entry file, one line of the registry's table with that entry's import, its address in the module of addresses and its place on the menu bar" matches `game-view.ts` (one import, one line `createKnowledgeEntry({ store })`) and the diffs of `screen-address.ts` and `menu-bar.tsx`.
- D-407 (`:4363`–`:4377`, read whole): its complies example "a new screen … the memory of its unfolded trees, shared with another screen, as a memory of the page" is conditional ("shared with another screen") and names no screen; Wiedza keeps its folding in its component, which D-407's binding sentence ("the state of one screen lives in the component of that screen") allows. No correction needed.
- D-277 (`:4950`–`:4970`, read whole — the one the whole-change reviewer did not read whole): its *Verification* lists "Siedziba on Siedziba, Mapy on Mapy and Programy on Programy" as what the tests show; still true, not exhaustive. No correction needed.
- D-27, D-282, D-325, D-328, D-148 (read whole): each still true. D-27's *Verification* "every icon the game's data names, the actions' and the campfires' included" is not exhaustive and so covers the wolf. D-148 ("appears in the encounter's text and in the scene") holds with the plaque in the scene; its violating example (a wolf icon on the terrain drawing) is not done by the change.
- Environment fact `game-icons-wolf-head-title` and *Rests on* of `icon-credits`: written in the change (diff of `environment_facts.md` and `invariants.md`), consistent with `creatures.ts` (`iconTitle: "Wolf head icon"`).
- Glossary: `Understanding` (`glossary.md:117`) is not contradicted; no screen list in the glossary. Part map: the `browser-view` description (`part_map.md:5`) lists no screens; `foundation_check.py` reports 0 errors, so the new files are claimed.
- Guidelines: `styleguide-browser-view.md:504`, `:515` and the rule "The screen Wiedza" (`:598`) name Wiedza; `coding-browser-module.md:273` agrees with D-408. No other screen lists found.
- Searches of `foundations/` for "no icon", "creatures have none", "creature alone", "has an icon", "fourth item", "three items", "items of the bar", "on the menu bar", "Wiedza": the one stale sentence is I1; the other hits are true.

## Point 3 — m2 and n1

Not graded, as the handoff says: m2 (`decisions.md:4156`, D-280 *Verification* naming five screens) and n1 (D-416's first paragraph holding four binding sentences) stay for the request's list.

## Declined to judge

- The commit message's form (gitmoji `:card_file_box:` and English, as the preceding commits of the branch): not part of what the return step is judged on.

## Checks

- `git rev-parse HEAD` — 0; `42e15a5daf2a3ecf00da8ff9d5737063802d0531`.
- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` — 0; both `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- `git log --oneline b67568aa..HEAD` and `git diff --stat b67568aa..HEAD` — 0; one commit, one line of `foundations/decisions.md`.
- `git log --oneline -S "act of the screen Wiedza" -- foundations/decisions.md` — 0; `0785c763` (wrote) and `42e15a5d` (removed).
- `git log --oneline -S "a fourth item „Konta”" -- foundations/decisions.md` — 0; `f1733cf9`.
- `python -B .the-way/elements/common/foundation_check.py` — 0; "0 errors".
- Not run: any test file (the commit changes no code and no test; the citations of D-409 are checked by `foundation_check.py`); the full gate (the orchestrator's, by the handoff).

## Reaches beyond the dispatch

- D-407 (`decisions.md:4363`), whole — its complies example speaks of a new screen with trees, to see whether it went stale as D-409's did.
- D-277 (`:4950`), whole — the handoff says the whole-change reviewer did not read it whole.
- The foundation-wide word searches listed under point 2, and `guidelines/` and `foundations/part_map.md` by grep — to test the report's claim that nothing else no longer matches.
- The diff `git diff main...HEAD` of `foundations/`, `game-view.ts`, `screen-address.ts`, `menu-bar.tsx`, `creatures.ts`, `now-lines.test.mjs`, `scene.test.mjs` — to compare the entries the change wrote with the code.

## Working copies

None made. The directory `.runs/review-return/` was not created; no worktree, clone, script or screenshot. A temporary output file `.runs/fc.out` of `foundation_check.py` was written and removed in the same command.

## Unread material

- `src/browser/view/state-store.ts`: not read; `knowledge-entry.ts:12` (`Pick<StateStore, "get">`) and the absence of any store call in `knowledge-screen.tsx` settled whether Wiedza has an act. `knowledge-screen.tsx`: read by grep only (lines matching `store|act|clock|simulation|dispatch|onChange|setState`).
- D-283, D-119, D-195, D-199, D-200: not read whole; their binding sentences read as the task quotes them (`task.md:155`–`:160`). The change alters no behaviour they govern (the screen changes no state; no tree or buying logic changed).
- D-291, D-322, D-327: read as the diff hunks show them, not whole.
- D-281: read `:4206`–`:4215` and its *Verification* line in the diff, not whole.
- The invariants `icon-credits`, `icon-file-content`, `loop2-container-icons`, `content-identifiers`, `loop-run-knowledge`: not read; only the *Rests on* line of `icon-credits` in the diff.
- The glossary: the `Understanding` heading and grep hits only. The part map: grep hits only.
- The task: read whole. The return step's report: read whole. `review/SKILL.md` and `return_step.md`: read whole.

## Searches not found or unclear

- Whether a *Rejected* field falls under "Pole zmienianego wpisu" of row 163 of the definition (`task.md:127`) is not said; I1 rests on the task's answers to questions 6 and 7 and on `return_step.md` as well, so the finding stands either way.
