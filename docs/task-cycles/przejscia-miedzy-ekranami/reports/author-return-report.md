**Status:** done

# Return step — task `przejscia-miedzy-ekranami`

Worktree `the worktree's root`, branch `task/przejscia-miedzy-ekranami`, head `caf7a814`. Nothing needed correcting, so **no commit**. Nothing pushed.

## Return step (for the record)

**Foundation compared with code** — every entry below matches the code at `caf7a814`:

| Entry | Compared with | Result |
|---|---|---|
| D-200 (binding sentences, *Verification*, *Rationale*, *Rejected*) | `purchaseOpen` and `buyBranch` in `src/browser/sim/skills.ts`; `restart` in `src/browser/sim/game.ts`; `Branches` in `src/browser/view/character-trees.tsx` | matches |
| D-287 | `character-screen.tsx` (gives `run` only for the run's own character); `character-trees.tsx` (sentence, `!purchaseOpen \|\| unaffordable`); „Wejdź”/„Puść w pętlę” code untouched | matches |
| D-280 (new paragraph, *Verification*, *Rationale*, *Rejected*) | `run-header.tsx` link `#/postac/{n}`; `character-screen.tsx` link `#/`; touch target and `(hover: none)` blocks in `run-screen.css` and `character-screen.css` | matches |
| D-311 (header sentence, *Verification*, *Rationale*) | `run-header.tsx`: the link stands in the first child of the header in every state | matches |
| D-196 (binding sentence, *Rationale*) | `programOf(…, run.character.skills)` — the run's skills of its start | matches |
| Styleguide „The screen Postać” | `character-screen.css` (`text-label`, no underline, `highlight` under the pointer, touch target, no hover background on touch); „Kup” rule; the sentence at the run's character alone | matches |
| Styleguide „Main button, secondary action and tab” | `.run-header-name` / `.run-header-back` in `run-screen.css`: heading size, `text-strong` inherited, no underline, `highlight`, touch target | matches |
| Example „Ekran w Reactcie: Postać” in `guidelines/coding-browser-module.md` | `character-screen.tsx`, `purchaseOpen` | matches |
| Part map `browser-view` and `simulation` | the files the change touches: no new file; every touched file lies under `src/browser/*.css`, `src/browser/view/**`, `tests/view/**`, `src/browser/sim/**` or `tests/sim/**`; trust boundaries `screen-address.ts` and `saved-game.ts` unchanged | matches, no change |

**The reviewer's note on D-200's clause** („Restart” after a death that took the character's practice and ranks starts with what the character was left with, "so not with a rank bought in that wait"). The clause matches the code:
- `restart` reads the team's skills only when the death's settlement is `progressLost` (`src/browser/sim/game.ts`, `const lost = run.deathSettlement?.kind === "progressLost"`).
- In every other case `restart` reads the map run's own skills, which a purchase never writes.
- After a `progressLost` settlement the character holds new skills with no practice, so it has no point to buy with.
- A rank bought before the settlement is taken by the settlement itself.

The sentence states what the code does; the reason it holds is the absence of points, as the reviewer says, not a separate guard. No correction.

**Search by the names and words the code adds or removes** — `purchaseOpen`, `run-header-back`, `character-screen-back`, „← Siedziba”, „← {imię”, „Kupiony stopień”, „Stopnie kupisz”, „outside a manual map run”, „stand inactive”, over `foundations/`, `guidelines/`, `AGENTS.md` and `src/browser/AGENTS.md`:
- The hits are the entries above. No stale occurrence of the old rule or the old sentence is left.
- The one „stand inactive” hit is D-287's sentence about the gear, which is unchanged and true.
- The glossary entry „map run restart” agrees with D-200.

**Written in this step:**
- decisions: none;
- invariants: none — no rule of the task, a decision or the human asks for one;
- environment facts: none — the change rests on no outside source the foundation lacks;
- glossary terms: none — no word is used in a new meaning;
- part-map changes: none;
- projected entries: none;
- rows of *Settlements to record*: none — rows 1–4 were written in the foundation step (row 1 → D-200 with D-287's „Kup” sentence; row 2 → D-287; row 3 → D-280 with D-311's header sentence; row 4 → D-280);
- choices binding after the merge: none.

There is no pair of examples for a test-held part to remove: the change added no pair, and D-200's existing pair covers only the map-run view and undo, which no test holds.

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` → 0 (0 errors)
- `python -B .the-way/instruction-files/check_instructions.py` → 0 (0 error, 0 warn)

Not run: the full `npm test`, which is the orchestrator's or CI's. No code changed in this step, so no test file was run.

## Working copies

`.runs/author-return/` held the check outputs and is removed. No browser or server was started, and no process is left running.

## Reaches

`foundations/glossary.md` (entry „map run restart`), `foundations/part_map.md` (entries `browser-view`, `simulation`), and `restart` in `src/browser/sim/game.ts`, to judge the reviewer's note.

## Unread material

The reviewer's report `reports/review-whole-report.md` was not opened: the handoff quotes the one passage it hands me.

## Searches not found or unclear

none
