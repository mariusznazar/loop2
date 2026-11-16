# Report of the return step — task `decyzje-niezgodne-z-gra`

**Status:** `done`. **Commits:** none (the step found nothing that no longer matches and wrote no entry). Head stays `e22516f9`; the worktree is clean.

## Foundation compared with code

Compared, each by reading the code place and the entry's sentence:

| Entry | Code | Result |
|---|---|---|
| D-03 exception for the waiting screens | `src/browser/view/app.ts:172-190` builds the header, the session-check section and its text with `document.createElement` (“Sprawdzanie logowania…”, the warning with „Spróbuj ponownie”) | matches |
| D-14 “loop2's containers, the application's and the connector's” | `compose.yaml`: `container_name: loop2` (service `app`) and `container_name: loop2-cloudflared` | matches |
| D-17 “at or above thresholds” | `deploy/loop2-deploy:277, 280` stop only for `mem_kb < MIN…` and `free_kb < MIN…`; equality builds | matches |
| D-28 example | `guidelines/coding.md` “Kinds of code” table holds 11 kinds; the example now names no count | matches |
| D-61 “the cause combat” | `src/browser/sim/types.ts:232` `DeathCause = "cold" \| "hunger" \| "combat"` | matches |
| D-189 mark “on the card of the map, under „Wejdź” at the character in „Kto idzie”” | `src/browser/view/maps-screen.tsx:329` `rehearsal-mark` | matches |
| D-195 example “…Zbieranie małych przedmiotów.” | `src/browser/sim/data/skills.ts:30`; `src/browser/view/status-row.ts:101` writes “Odkryto: …” | matches |
| `loop2-container-sprites` with the login-card picture | `assets/sprites/login-backdrop.png` exists; `src/browser/styles.css:682` asks for `/sprites/login-backdrop.png` | matches |
| `player-argon2-deployment-check` (+D-113), `nature-energy-range` (+D-377), the four decision lists | read against the invariants; the comparison script reports 0 mismatches | matches |
| `cross-part-imports` *Rests on* `git-path-patterns` | `tests/invariants/loop2_invariant_support.py` `file_owners` matches the part map's patterns with `git check-attr` on an attributes file | matches |
| the old decisions with `owner` → `operator` | the persons named are the human who runs the server, as the glossary's `owner` entry (*Not: … "operator"*) says; every changed line was read in context in the first stage | matches |

Search of the whole foundation (WAY-33) for entries that held the old wording or depend on a changed sentence: the old wordings (“list of maps” for the mark, `cause „walka”`, “four kind guidelines”, “above thresholds”, “Zbieranie.”) stand in no other entry of the decisions, invariants, glossary, guidelines or part map; the other entries that say “the loop2 container” (decisions at `foundations/decisions.md:171, 184, 275`, invariants at `foundations/invariants.md:57, 345, 1210`) mean the application container and stay true beside D-14; the invariant `browser-view-framework` (“renders its screens with React and browser APIs, with no other UI framework”) is not contradicted by the D-03 exception, since `app.ts` uses browser APIs only; D-03's pair of examples still holds (a *new* screen as a `.ts` module with `document.createElement` is not a waiting screen of D-262). The part map has no line about the mark, the login picture, the waiting screens, the kind guidelines, `.tsx` or the fact file; its two lines with “owner” (`foundations/part_map.md:89`, `:156`) are the reviewer's O1 and go to the request's list, not fixed here.

Nothing no longer matches, so nothing was corrected.

## Entries written or changed by the return step, by kind

- **Decisions:** none new. (The first stage wrote the changes of D-03, D-04, D-14, D-17, D-28, D-61, D-108, D-113, D-179, D-189, D-190, D-195 and the word of about 50 older decisions.)
- **Invariants:** none new. (First stage: `loop2-container-sprites`, `player-argon2-deployment-check`, `nature-energy-range`, `cross-part-imports` changed.)
- **Environment facts:** none new. (First stage: `git-path-patterns`.) Searched for another source outside the product that the change rests on and the foundation does not hold: the changes rest on the product's own code, the task's answers and the-way's documents; the one outside source is the Git page of `git-path-patterns`, already written. None other.
- **Glossary terms:** none (judgment below).
- **Part-map changes:** none.
- **Projected entries:** none.

## The word `operator` (WAY-95)

The rule (`.the-way/elements/glossary/template.md`, “Which words take an entry”): a word takes an entry when it means, in the product, something other than a reader who knows the product's field takes it to mean; a word whose every meaning is one such a reader gives takes none.

The uses (`git grep -i -w operator` over the tracked files except `.the-way/` and the lock file: 270 uses in 37 files, read by group, not one by one in the tests): the person who reaches the server and runs its commands (the decisions, the deploy skill and its references, `src/server/account-*.ts`, `deploy/loop2-watch`, the glossary entries `blocked account` and `previous-save privilege` and the *Not* of `owner`, `guidelines/coding.md`, the tests' titles and comments), and, in two comments of tests (`tests/invariants/test_account_save_sqlite_upgrade.py:30`, `tests/invariants/test_account_server_typecheck.py:89`) and a loop variable (`tests/owner-routes.test.mjs`), shell operators and a variable name.

Judgment: **no entry.** The person who reaches a server and runs its commands is what a reader who knows the field (operating a hosted service) means by “operator”; the product uses the word in that meaning in every sentence about the person, so no use reads wrongly for the field's meaning. The shell-operator uses are the field's meaning of another word-sense of programming, in code comments about shell syntax, not a second meaning in the product's decisions: no sentence the files hold is true in one reading and false in the other of a use of the person. The glossary already carries the contrast that matters, `owner` (an account with the role) with *Not: the person who reaches the server and runs its commands — "operator"*, a word between quotation marks as the template's *Not* allows. The word for the person who runs the server was the human's own and the glossary of the-way holds no `operator` (checked by search). Writing an entry for a word the field gives the same meaning would break the template's own rule.

## Settlements: where each row went

| Row | Settlement | Place it went |
|---|---|---|
| 1 | *Verification* D-04 names `minute-span-split` | sentence (field *Verification*) of D-04, the decision log |
| 2 | D-108 names `account-client-requests` | D-108, the decision log |
| 3 | D-179 names `trip-run-end` | D-179, the decision log |
| 4 | D-190 names `catch-up-state` | D-190, the decision log |
| 5 | D-113 does not name `player-argon2-password-hash` | D-113, the decision log |
| 6 | `player-argon2-deployment-check` derives also from D-113 | the invariant, `foundations/invariants.md` |
| 7 | `nature-energy-range` derives also from D-377 | the invariant, `foundations/invariants.md` |
| 8 | `loop2-container-sprites` covers the login-card picture | the invariant, `foundations/invariants.md`, and the docstring of its test |
| 9 | D-195 example names the tree by the full skill name | sentence of D-195, the decision log |
| 10 | D-61 names the cause “combat” | sentence of D-61, the decision log |
| 11 | D-17 builds at or above the thresholds | sentence of D-17, the decision log |
| 12 | D-189 mark on the card of the map under „Wejdź” | sentence and *Rationale* of D-189, the decision log |
| 13 | D-14 both containers | sentence of D-14, the decision log |
| 14 | D-03 exception for the waiting screens | sentence of D-03, the decision log |
| 15 | D-28 example without the count | field *Verification* of D-28, the decision log |
| item 8 (not a row) | the fact under `cross-part-imports` | environment fact `git-path-patterns`, `foundations/environment_facts.md`, and *Rests on* of the invariant |

No row and no choice goes nowhere. Choices that bind after the merge: the use of `operator` for the person who runs the server (in about 150 lines of the log, skills, comments and titles), which stays as the wording and takes no entry (the glossary judgment above); no other choice of the change binds later. The task excludes no entry.

No pair of examples of a decision the change wrote has a part that a test holds and the pair still carries: the pairs of D-03 and D-28 are the ones the task settled (the sentence of D-28 stays, its example changed), and no test of the change holds a part of them, so none is removed.

Not fixed here, going to the request's list: N1 (`tests/deploy/test_loop2_backup.py:17, 119`, “operator” where “the human” is exact), N2 (`tests/sim/encounters.test.mjs:726`, a line that repeats the first line of its comment), O1 (`foundations/part_map.md:89`, `:156`).

## Checks (none is the gate)

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 140 warn, 7 info` (the 140 are the `dead-path` warnings of server paths in the deploy skill and its twin, as in the first stage) |
| `python -B .runs/task-cycles/decyzje-niezgodne-z-gra/reports/inv-names-check.py .runs/author/inv-ret.txt` | 0 | 0 mismatches |

## Unread material

none beyond what the first report names (`guidelines/styleguide-browser-view.md`, not read; this step changes no file). I did not read the 270 uses of `operator` one by one in the tests; I read the uses outside the tests and the non-person uses found by search.

## Searches not found or unclear

none.

## Working copies

No worktree, clone or screenshot made. The outputs of this step (`fc-ret.txt`, `ci-ret.txt`, `inv-ret.txt`) stand in `.runs/author/` (ignored). `node_modules/` and `dist/` of the first stage stay in the worktree (ignored; made by the product's tools).
