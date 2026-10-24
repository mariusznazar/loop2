PASS 4a0521d1af348a687036738c995e3a1769af162a

# Review of the return step — task cycle `siedziba-i-druzyna`

- **Reviewed:** the commits of the return step, range `24bbc2d5e1126db971e9135991e894fe1024a183..4a0521d1af348a687036738c995e3a1769af162a` — one commit, `4a0521d` "docs: record D-56, the number by which the game state and its map run tell a character apart", `foundations/decisions.md` +27 / −0.
- **Method:** `the-way-review-change` (`.claude/skills/the-way-review-change/SKILL.md`) → `.the-way/task-cycle/review/SKILL.md` at the pinned `86b78ad` (gitlink and `git -C .the-way rev-parse HEAD` both `86b78ad780aa8e97a9619fb7277cb64da50fb74a`); step 11 of `.the-way/task-cycle/skill/SKILL.md` read whole; `.the-way/elements/decisions/template.md` and `.the-way/elements/decisions/skill/SKILL.md` read whole.
- **Against:** the frozen task `task.md` (read whole), the wording principle for entries from MVP choices (task, *Context*), and the one entry the range writes, D-56. The return step corrects no entry.
- **Head:** `git rev-parse HEAD` = `4a0521d1af348a687036738c995e3a1769af162a`, the head given.

## Findings

### Critical

none

### Important

none

### Minor

**M1 — D-56's *Rationale* and *Rejected* say a character's place on the list moves; D-54's *Rationale*, written by the same request, says no event changes it.**
Place: `foundations/decisions.md:1095`–`1099` (D-56 *Rationale*: "a character's place on the list moves when a character before it leaves"; *Rejected*: "the place on the team's list — it moves when a character before it leaves") against `foundations/decisions.md:1050`–`1052` (D-54 *Rationale*: "the order of creation is one the player sets by creating characters, which no other event of the game changes, so a character keeps its place on the list and the player finds it there again").
What is wrong: the two entries use "place on the list" in two senses — D-54 for the relative order, D-56 for the position counted from the head — and so state opposite things about the same word. In the MVP no character leaves the team (deletion is out of scope of this task, moving between teams out of scope of the MVP), so D-56 argues from an event the game does not have today; that is consistent with the openness the human asked for, but the clash with D-54 stays.
Why it matters: prose only, so no binding sentence collides and no change is judged differently today; an agent reading D-54 and D-56 together for task 16 or 18 meets a contradiction in the reasoning and has to work out that "place" means two things. The fix would be wording in D-56, e.g. "its position counted from the head of the list".
Evidence: the two passages quoted above; `git diff 24bbc2d..4a0521d` adds the D-56 lines; D-54 is unchanged in the range.

**M2 — D-56's binding sentence does not fix the first number.**
Place: `foundations/decisions.md:1078`–`1080`: "each character carries a number the game gives it when the character is created, one more than the number the game state gave last".
What is wrong: for the first character created the game state has given no number yet, so the sentence alone leaves its number open; only the *complies* example "the third character created carrying the number 3" pins the start at 1. The code keeps the number the state gives next, not the one it gave last (`src/browser/sim/types.ts`: `nextCharacterId`, "The id the next created character takes."; `src/browser/sim/game.ts:154` `nextCharacterId: 1`, `:190` `id: state.nextCharacterId`, `:201` `nextCharacterId: state.nextCharacterId + 1`), which the *complies* example "a saved game that keeps the number the game state gives next" matches.
Why it matters: polish — the example pair closes the gap and the code meets both; a sentence such as "the first character carries the number 1 and each next one a number one greater" would be checkable without the example.
Evidence: the lines above; every invariant test sends `characterId: 1` for the first created character (e.g. `tests/invariants/test_map_run_repeatability.py:48`), consistent with the start at 1.

## What I checked and found in order

- **D-56 against the code at the head.** Binding sentence 1: `createCharacter` gives `state.nextCharacterId` and raises it by one (`src/browser/sim/game.ts:186`–`201`); a new game starts it at 1 (`:154`); so two characters of one game differ — true. Binding sentence 2: `MapRun.character` is `{ id: CharacterId; at: Hex }` (`src/browser/sim/types.ts`), set from `ids.characterId` (`src/browser/sim/run.ts:103`); `send` refuses an id no team character holds (`src/browser/sim/game.ts:220`); `restart` keeps `run.character.id` (`:229`); the headquarters sends by `character.id` (`src/browser/view/headquarters.ts:144`). The run holds no copy of the name or the archetype (`MapRun` has neither field) — the *violates* examples are not met. *Scope* simulation, browser-view matches these places.
- **The wording principle (task, *Context*):** the binding paragraph begins "In the MVP", says what the game does now, and contains none of "only", "never", "always", "without" or another word excluding an alternative. Its second sentence carries no "In the MVP" of its own; it stands in the same binding paragraph, as one entry, so I take the opening as covering it — no finding.
- **Template (`elements/decisions/template.md`):** new number D-56 is the next free one after D-55; the question names a choice that can be answered otherwise; 2 binding sentences, present tense, no normative capitals; fields in order; *Based on* `none` — no source outside the product, right; *Relations* `derives from D-52` — D-56 serves D-52's allowance of repeated names (D-52 *Rationale*: "which the game tells apart by something other than the name"; D-52 *violates*: "a map run or a saved game that names its character by its name"), a fitting `derives from`; *Verification* an example pair, no invariant named, and none in `foundations/invariants.md` derives from D-56; *Origin* `none` with the whole reasoning in the entry; *Rationale* and *Rejected* name no file, script or count and do not tell how the decision was reached.
- **Plan test (WAY-36):** the counter and the run naming its character by it bind after the merge — the save of task 16 keeps the number and the next one, the character-by-character time away of task 18 finds characters by it. An entry is due, as step 11 requires.
- **Rejected "a number drawn at random"** against D-22 ("Every random draw of the simulation comes from generators seeded by the seed saved in the map run's state …"): a draw at character creation, outside any map run, has no such generator — the rejection reads D-22 faithfully. D-22 is neither served nor narrowed, so it rightly stands in no relation.
- **No collision and no sentence to move:** D-50 to D-55, the invariant `character-team` and the glossary terms `map run`, `map run restart`, `headquarters` say nothing that D-56 answers in their binding sentences; D-52's *violates* example and D-56 agree.
- **The return step's claim "nothing no longer matched":** my own search found no foundation entry, guideline or instruction speaking of a send panel or of a character held as an archetype in the map run (see Checks); I found no correction the step missed.
- **The return step's non-entries** — glossary "team" and "manual map run", no environment fact, no invariant: each weighed by the rule step 11 names; I agree with each and raise no finding.

## Declined to judge

none

## Checks

| Command / method | Exit | Result |
|---|---|---|
| `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` | 0, 0 | both `86b78ad780aa8e97a9619fb7277cb64da50fb74a` |
| `git rev-parse HEAD` | 0 | `4a0521d1af348a687036738c995e3a1769af162a`, the head given |
| `git log --stat 24bbc2d5e1126db971e9135991e894fe1024a183..4a0521d` and `git diff 24bbc2d5e1126db971e9135991e894fe1024a183..4a0521d` | 0 | one commit, `foundations/decisions.md` +27 / −0, D-56 only |
| `python -B .the-way/elements/common/foundation_check.py` (run from the worktree root) | 0 | `0 errors` |
| `git grep -n -l "decisions.md" -- tests src package.json scripts` | 0 | only `src/browser/AGENTS.md`, an instruction file, no test — no test reads the prose the range changes, so no focused test is affected |
| `git grep -n "D-56\|D-52" -- . ':!.the-way' ':!.runs'` | 0 | D-56 referenced nowhere outside its entry; no stale reference |
| `git grep` for `characterId`, `character.id`, `.id ===`, `characters[`, `indexOf`, `findIndex` in `src/browser` and `tests` | 0 | characters found by id only (`game.ts:220`, `:229`, `headquarters.ts:144`, `run.ts:103`); no lookup by name or list position |
| `grep` of `foundations/glossary.md` terms and of "manual map run" / "earning loop" in `foundations`, `guidelines` | 0 | no term used against its entry |
| `git status --short` (before writing this report) | 0 | clean; this report lies under `.runs/`, ignored by `.gitignore:1` |

The full suite was not run: it is the cycle's own run before the request, and the range changes no code or test.

## Reaches beyond the dispatch

- D-22, D-50, D-51, D-52, D-53, D-54, D-55 in `foundations/decisions.md`, each whole — for D-56's *Relations*, *Rejected* and for collisions (M1 comes from D-54).
- `foundations/glossary.md`, the headings and the entry `headquarters` — to check the step's non-entries and terms against their entries.
- `src/browser/sim/types.ts`, `src/browser/sim/game.ts`, `src/browser/sim/run.ts:95`–`103`, `src/browser/view/headquarters.ts:144`, `src/browser/view/app.ts:75`–`76` — to check D-56's sentences and examples against the code at the head.
- `.the-way/elements/decisions/template.md` and `.the-way/elements/decisions/skill/SKILL.md`, whole — the form D-56 must keep.
