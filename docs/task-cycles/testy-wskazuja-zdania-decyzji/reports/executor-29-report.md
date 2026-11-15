# Report — executor of slice 29 (character skills)

**Status:** done with concerns

Concerns, in short: one remark under R3 (D-195's example name, below); a few lines rest on a part
a test holds incidentally (listed under "Choices"); I edited test files beyond the slice's *Change*
that I read only by case, not whole (listed under "Unread material").

## Commits (range from base `64d65845be91e48bf5e4beca5a9c9b79e7abe8da`)

- `4ddafcf9` test: lines `decision:` at tests of D-191 to D-201 and D-379 (17 test files)
- `f9adf64f` docs: *Verification* of D-191, D-192, D-193, D-194, D-195, D-196, D-197, D-198, D-199,
  D-200, D-201 and D-379
- `05343dab` test: two more lines found by the own-work check (`tests/sim/loop.test.mjs`,
  `tests/sim/rule-signs.test.mjs`)
- Author address after the first commit: `git log -1 --format=%ae` → the private address the
  repository's earlier commits carry.

## Files changed (added / removed lines, base..HEAD)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 101 | 36 |
| `tests/sim/skills.test.mjs` | 39 | 0 |
| `tests/sim/data.test.mjs` | 3 | 0 |
| `tests/sim/death.test.mjs` | 1 | 0 |
| `tests/sim/discovery.test.mjs` | 2 | 0 |
| `tests/sim/encounters.test.mjs` | 2 | 0 |
| `tests/sim/loop.test.mjs` | 2 | 0 |
| `tests/sim/repertoire.test.mjs` | 1 | 0 |
| `tests/sim/rule-signs.test.mjs` | 1 | 0 |
| `tests/sim/saved-game.test.mjs` | 1 | 0 |
| `tests/sim/team.test.mjs` | 2 | 0 |
| `tests/sim/trip.test.mjs` | 5 | 0 |
| `tests/view/account-screen.test.mjs` | 2 | 0 |
| `tests/view/character-screen.test.mjs` | 7 | 0 |
| `tests/view/character-skills.test.mjs` | 10 | 0 |
| `tests/view/program-editor.test.mjs` | 2 | 0 |
| `tests/view/program-panel.test.mjs` | 2 | 0 |
| `tests/view/status-row.test.mjs` | 1 | 0 |
| `tests/view/world-area.test.mjs` | 2 | 0 |

No test's code, name or assertion changed; no mention of a decision number was removed. Each line
stands at the top of its test's body, after the lines `decision:` and `invariant:` already there,
as the earlier slices place them.

## Files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each

- `tests/sim/loop.test.mjs` — part simulation; guidelines `guidelines/testing.md`, `guidelines/coding.md` (read whole); `npm test -- tests/sim/loop.test.mjs` exit 0.
- `tests/sim/trip.test.mjs` — simulation; same guidelines; focused run exit 0.
- `tests/sim/saved-game.test.mjs` — simulation; same; exit 0.
- `tests/sim/team.test.mjs` — simulation; same; exit 0.
- `tests/sim/data.test.mjs` — simulation; same; exit 0.
- `tests/sim/discovery.test.mjs` — simulation; same; exit 0.
- `tests/sim/encounters.test.mjs` — simulation; same; exit 0.
- `tests/sim/repertoire.test.mjs` — simulation; same; exit 0.
- `tests/sim/rule-signs.test.mjs` — simulation; same; exit 0.
- `tests/view/program-panel.test.mjs` — browser-view; `guidelines/styleguide-browser-view.md` read in part (see Unread material); exit 0.
- `tests/view/program-editor.test.mjs` — browser-view; same; exit 0.
- `tests/view/account-screen.test.mjs` — browser-view; same; exit 0.
- `tests/view/world-area.test.mjs` — browser-view; same; exit 0.

## Checks run (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` at the base → 0, `0 errors`; held by
  nothing: D-216, D-217, D-218, D-220 (none of mine).
- Same after the lines, before the log edit → 0, `0 errors` (every quotation matched).
- Same at HEAD (`05343dab`) → 0, `0 errors`; held by nothing: D-216, D-217, D-218, D-220 — none
  of D-191 … D-201, D-374, D-379.
- `npm test -- <file>`, one run per file, each → 0 (pass/fail): `tests/sim/data.test.mjs` 36/0,
  `tests/sim/death.test.mjs` 33/0, `tests/sim/discovery.test.mjs` 49/0,
  `tests/sim/encounters.test.mjs` 29/0, `tests/sim/loop.test.mjs` 46/0 (run twice: before and
  after its second line, both 46/0), `tests/sim/repertoire.test.mjs` 32/0,
  `tests/sim/rule-signs.test.mjs` 40/0, `tests/sim/saved-game.test.mjs` 39/0,
  `tests/sim/skills.test.mjs` 19/0, `tests/sim/team.test.mjs` 7/0, `tests/sim/trip.test.mjs` 29/0,
  `tests/view/account-screen.test.mjs` 131/0, `tests/view/character-screen.test.mjs` 7/0,
  `tests/view/character-skills.test.mjs` 4/0, `tests/view/program-editor.test.mjs` 57/0,
  `tests/view/program-panel.test.mjs` 53/0, `tests/view/status-row.test.mjs` 20/0,
  `tests/view/world-area.test.mjs` 22/0. Every run had ended before I went on; none runs now.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>`
  on each of the 18 changed `.mjs` files → 0 each.
- `git diff -U0 64d65845be91e48bf5e4beca5a9c9b79e7abe8da -- foundations/decisions.md`, read: 12
  hunks, every added and removed line is the line `- **Verification:**` or its indented
  continuation in D-191, D-192, D-193, D-194, D-195, D-196, D-197, D-198, D-199, D-200, D-201 or
  D-379; a filter of the changed lines for anything else printed nothing.
- `git diff --check` → 0.
- Not run: the full gate `npm test` without a file (the cycle's run, not a slice's). Not run, so
  not observed: `test_ruff_source_rules` and `test_shellcheck_source_rules`, which the handoff says
  fail at the base.

## Table of the decisions (item 6)

Line numbers are those of the test case at HEAD.

| Decision | Held by tests | Held by invariants | Held by nothing | *Verification* |
|---|---|---|---|---|
| D-191 | S1 in part (only actions with effect count): `tests/sim/skills.test.mjs:352` „gather miss grants none…”, `:460` „crafting, feeding, item lighting and eating grant one…”, `:502` „combat practice counts damaging effects…”. S2 whole: `tests/sim/skills.test.mjs:88` „new characters own independent zero practice…”, `:108` „all cumulative thresholds of D-379…”, `:141` „purchases charge successive costs…”, `tests/sim/saved-game.test.mjs:2202` „a crafted document of the current version is refused whole as shape” (a skill with a key `level` is refused). S3 whole: `skills.test.mjs:108`, `:141`. | none | S1: a character skill is never bought | pair rewritten |
| D-192 | S1 whole: `tests/sim/team.test.mjs:53` „a created character joins the end of the team's list…”. S2 in part (traits hold carrying capacity alone): `team.test.mjs:53`, `tests/sim/data.test.mjs:327` „a new character's traits hold carrying capacity 15…”. | none | S2: such a number belongs to its skill's tree | pair rewritten |
| D-193 | S1 in part (every action but the kick): `tests/sim/skills.test.mjs:333`, `:352`, `:395`, `:434`, `:460`, `:502`, `:544`, `:664`. S2 whole: `:460` (eating, cut at „even at full satiety”), `:502` (dodge). | none | S1: the kick's practice | pair rewritten |
| D-194 | S1 whole: `tests/sim/skills.test.mjs:586` „completion pays this minute's practice once to the runner…”, `tests/sim/trip.test.mjs:70` „a bought branch acts on entry equipment and completion pays practice and loot once”, `:676` „completing a manual run of a solved map pays no practice…”, `:704` „a run started before another character solved the map still pays practice…”. S2 in part (practice): `skills.test.mjs:586`. | none | S2: bought ranks after a run cut short | pair rewritten |
| D-195 | S1 whole: `tests/sim/discovery.test.mjs:360` „the first finished exploration reveals Idź, Zbierz…”, `:511` „${row.name} reveals exactly its row of the table…”, `tests/sim/encounters.test.mjs:517` „an ending exploration and first wolf produce one catalog-ordered discovery”, `:561` „first chill and attack in one minute…”, `tests/sim/skills.test.mjs:664` „scout discovers neighboring resources and the gathering tree…”, `tests/sim/data.test.mjs:457` „the tree of Eksploracja… is revealed by the first finished exploration…”, `:530` „each revealing event reveals exactly…” (row `treeDiscovered` → „Obchód”). S2 whole: `tests/view/status-row.test.mjs:240` „the text for the first finished exploration names the tree Eksploracja…”. | none | nothing | pair removed |
| D-196 | S1 in part: `tests/sim/repertoire.test.mjs:383` „the editor shows the repertoire of the mage through the Understanding…”, `tests/sim/skills.test.mjs:637` „Obchód is known with its tree but offered only in its owner's run…”, `tests/view/program-panel.test.mjs:1667` „the offer of Programy follows the character of the map run…”. S2 in part: `skills.test.mjs:637`, `program-panel.test.mjs:1667` (run, pause, after death, gone at „Zakończ”), `tests/view/program-editor.test.mjs:1165` „a branch action known and not bought stands greyed…”, `:1338` „the offer follows the character of the map run…”, `tests/sim/rule-signs.test.mjs:601` „the repertoire the signs read is the editor's…”. | none | S1: the predispositions narrowing the offer outside a map run; S2: the copy editor of a paused or ended map run, and a map run ended by completion | pair rewritten |
| D-197 | S1 whole: `tests/sim/skills.test.mjs:395` „Obchód is guaranteed, lasts 40 minutes…”. S2 whole: `:352` „gather miss grants none… full hand respects stock and backpack limits”. | none | nothing | pair removed |
| D-198 | S1 whole: `tests/sim/skills.test.mjs:333` „practice appears at the effect minute, once for all tiles of Zwiad…”. S2 whole: `:664` „scout discovers neighboring resources…”. | none | nothing | pair removed |
| D-199 | S1 in part: `tests/view/character-screen.test.mjs:176` „the section „Umiejętności” is absent before a tree is known…”, `tests/view/character-skills.test.mjs:20` „a skill shows cumulative progress…”. S2 in part: `character-skills.test.mjs:37` „numeric branch shows its current and next effect and price…”, `:59` „the combat branches show their ranks from the data…”, `character-screen.test.mjs:193` „unknown trees are hidden, purchases update existing buttons and refuse unaffordable and maximum ranks”. S3 whole: `character-skills.test.mjs:37`, `:59`. | none | S1: the heading „Umiejętności”; S2: the price alone of „Obchód” and „Czysty płomień” | pair rewritten |
| D-200 | S1 whole: `tests/sim/skills.test.mjs:190` „unknown trees… and every retained run refuse purchase”, `:312` „send and restart take independent rank snapshots…”, `tests/sim/death.test.mjs:427` „a death that takes everything leaves the map run on the screen as it was”, `tests/sim/loop.test.mjs:534` „a rank bought during a loop reaches the next map run and not the one going on”, `:554` „a loop picks its rules by the skills of its own character…”, `tests/sim/trip.test.mjs:70`, `tests/view/character-screen.test.mjs:193`, `:228` „„Kup” is inactive with the sentence under the heading…”, `:263` „a purchase leaves focus on its button…”, `tests/view/account-screen.test.mjs:2577` „each act of the player that changes the game state is saved at once…” (row „buying a branch rank”), `:2697` „a character in a loop shows its line and „Zatrzymaj”… and „Kup” and the program list stay active”. | none | S2 whole: no purchase in the map-run view, no undo | pair rewritten |
| D-201 | S1 in part: `tests/view/character-skills.test.mjs:91` „run practice omits zero values…”, `tests/view/world-area.test.mjs:202` „the world area stands from the top…” (below the body row, after a death). S2 in part: same two (zero values, no line at zero, line after a death). | none | S1: the role `text`; S2: the line after a completion until „Restart” or „Zakończ” | pair rewritten |
| D-374 | none (R1: `tests/sim/skills.test.mjs:211` carries `// invariant: action-duration-minimum` and the invariant states the whole sentence) | action-duration-minimum, whole | nothing | unchanged |
| D-379 | S1 whole: `tests/sim/skills.test.mjs:108`, `tests/view/character-skills.test.mjs:20`. S2 in part: `skills.test.mjs:141`, `:174` „Mocniejszy cios has four ranks…”, `:246` „numeric branches shorten…”, `:281` „meal and walking bonuses…”, `:352`, `:395`, `:460`, `:502`, `:544`, `tests/sim/trip.test.mjs:70`, `tests/view/character-screen.test.mjs:193`, `:263`, `character-skills.test.mjs:37`, `:59`. | none | S2: the size of „Wprawne oko”'s gain and the prices no test checks; S3 whole: the numbers standing in the data of the skills | pair rewritten |

## Pairs added or rewritten (for the human to accept at the merge)

No pair was added to a decision without one; nine were rewritten, three removed (D-195, D-197,
D-198).

- **D-191** — For a character skill never being bought:
  - complies: a level of a character skill reached only through the practice of its actions
  - violates: a shop selling a level of a character skill, or practice in it
- **D-192** — For a number that acts in one action belonging to the tree of that action's character skill:
  - complies: accuracy with a one-handed weapon added as a branch of that weapon's tree
  - violates: a number that acts only in eating held at the archetype or at the action „Zjedz” rather than as a branch of the tree of „Jedzenie”
- **D-193** — For the practice of a kick:
  - complies: a kick that deals damage adding one practice to „Kopanie” in the turn it lands
  - violates: a kick adding one practice for each point of damage it deals
- **D-194** — For the ranks bought after a map run cut short:
  - complies: „Restart” before completion leaving the ranks the character bought as they were
  - violates: „Zakończ” before completion taking from the character a rank it bought
- **D-196** — For the copy editor of a map run that waits in a pause or has ended, a map run ended by its completion, and the archetype's predispositions narrowing the offer outside a map run:
  - complies: „Obchód” offered in the copy editor of a paused map run of its buyer, and in the editor of Programy after that map run's completion until „Restart” or „Zakończ”
  - violates: the copy editor of an ended map run turning to the archetype's offer; an action whose character skill the archetype does not predispose offered outside a map run
- **D-199** — For the heading of the section, and the price alone of „Obchód” and „Czysty płomień”:
  - complies: the section headed „Umiejętności”; „Obchód” at rank 0 reading its description and „cena 3” with no before-and-after values
  - violates: the section standing with no heading „Umiejętności”; „false → true” beside „Czysty płomień”
- **D-200** — For no purchase in the map-run view and no undo of a purchase:
  - complies: the screen of a map run holding no „Kup”; a rank bought staying bought
  - violates: a „Kup” beside the program of a map run; a button on the screen Postać that takes a bought rank back and returns its points
- **D-201** — For the role `text` of the line and the line staying after a completion until „Restart” or „Zakończ”:
  - complies: the same positive practice line, in the role `text`, standing after a completion until „Zakończ”
  - violates: hiding the line immediately on completion; the line drawn in `text-secondary`
- **D-379** — For the size of the gain of „Wprawne oko”, the other prices, and these numbers standing in the data of the character skills:
  - complies: „Obchód” bought for 3 points; „Zwinny odskok” bought to its second rank for 1 and then 1 point; the thresholds read by the simulation from the data of the character skills
  - violates: a rank of „Wprawne oko”, „Pełna garść”, „Szybka ręka” or „Zwinny odskok” bought for a price other than the one listed; „Wprawne oko” adding 4 percentage points; a threshold written into the code of the simulation rather than into the data

## Remarks under R3 (the log's wording against the code; nothing changed)

- **D-195**, second binding sentence: its example reads „Odkryto: Zbierz, drzewo umiejętności
  Zbieranie.”, while the code names the tree by the skill's full name: the case at
  `tests/view/status-row.test.mjs:240` expects „…, drzewo umiejętności Zbieranie małych
  przedmiotów.”. The rule the sentence states (the tree named beside the action, then the sentence
  of the conditions) holds; only the example's name is shorter than what the game shows.
- **D-196**, first binding sentence: „through the archetype's predispositions” cannot be told apart
  by any test while the game has one archetype, whose predispositions are all eight skills
  (`tests/sim/data.test.mjs` „the elemental mage has all listed skills as predispositions”). I kept
  that part in the pair rather than count it held.

## Own-work check

- Requirement most likely missed: "every test that holds one of its binding sentences carries a
  line `decision:`" — a test outside the files I searched first, holding a sentence without citing
  the number.
- Check: a scan of every `tests/**/*.test.mjs` case whose body uses `skillProgress`, `branchText`,
  `skillText`, `practiceText`, `buyBranch`, `branchRank`, `editorRepertoire`, `Kup:`,
  „drzewo umiejętności”, `.practice` or a non-empty `trees: [` and carries no line of D-191…D-201,
  D-374 or D-379 (`python -B .runs/executor-29/unmarked.py` → 0; 42 cases listed).
- What it showed: I read each and judged. Two hold a sentence and got a line in `05343dab`:
  `tests/sim/loop.test.mjs:554` (D-200: a rank bought before the loop acts in the loop's first map
  run) and `tests/sim/rule-signs.test.mjs:601` (D-196: during a map run the editor's repertoire
  lacks a branch the run's character did not buy). The other 40 concern other decisions: an
  earning loop's practice and „Odbierz” (D-189), what a death takes and „Restart” after it (D-190),
  the saved document's round trips (save decisions), what of a row is still new (D-121), the
  Understanding kept (D-119), or a purchase used only as a fixture.

## Choices, with the way rejected

- **Criterion for a line:** a test got a line where it would fail if the code broke that part of
  the sentence, also where that part is not the test's subject — e.g. the focus case
  `tests/view/character-screen.test.mjs:263` (prices of „Wprawny krok” within 3 points; „Kup” on
  Postać), the save table `tests/view/account-screen.test.mjs:2577` (row „buying a branch rank”),
  `tests/sim/data.test.mjs:327` (traits hold carrying capacity alone, which also fails on a trait
  the decision would allow). Rejected: marking only tests whose subject is the sentence. Cost if
  wrong: a reviewer may judge some of these lines as a hold too thin and ask to drop them; the
  *Verification* clauses would stay true, as the subject tests hold the same parts.
- **Not marked:** `tests/sim/saved-game.test.mjs:2851` (round trip of the whole state: it fails on
  any field the save loses, a contract of the save decisions rather than D-191);
  `tests/sim/death.test.mjs:458` and `:627` („Restart” reads the run — D-190's, D-200 says nothing
  of „Restart”); `tests/sim/repertoire.test.mjs:402` (fallback archetype, not in D-196's sentences).
- **D-193, D-201 and D-199**: quotations of the whole sentence where a test holds part of it,
  as the earlier slices did; for the eating case (`tests/sim/skills.test.mjs:460`), which holds
  only the eating half of D-193's second sentence, the quotation stops at „even at full satiety”.
- **D-379's clause `tests:`** names exactly which prices tests pin and which only bound (e.g. „the
  first two of „Zgrabna konstrukcja” together and the third above 1”), so the pair can speak of
  „the other prices”.
- Lines were inserted by a script (`.runs/executor-29/add_lines.py`, now removed) that took every
  quotation from the log's binding sentences by sentence index, so no quotation was typed by hand;
  the foundation check confirmed each.

## Reaches beyond the dispatch

- Test files beyond the *Change*, by case (listed above), to find tests of my decisions'
  sentences, as item 2 of "Work of every slice" asks.
- `tests/sim/traits.test.mjs`, `tests/view/rule-editor.test.mjs` (cases at 1344 and 1415),
  `tests/sim/catch-up.test.mjs` (by search only): candidates judged as not holding my sentences.
- `src/browser/view/program-editor.ts:652` (`actionPick` reads `editorRepertoire`, so the pick of
  both editors is one function) and `src/browser/sim/data/balance.ts:21` (`gatherChance: 0.7`), to
  judge D-196 and „Wprawne oko”; `src/browser/view/world-area.tsx:107` and
  `src/browser/view/character-skills.ts:40` for the practice line.
- The user's rules on scripts and on git (outside the repository), read before the script and the
  commits.

## Working copies

- `.runs/executor-29/` (the insertion script, the scan script, logs of the focused runs, check
  outputs) — removed before return.
- `.runs/executor-29-base-check.txt` (output of the base foundation check, written by mistake
  directly under `.runs/` rather than in my directory) — removed before return.
- No worktree or clone was made.

## Unread material

- `guidelines/styleguide-browser-view.md` — read in part: lines 1-12 (When to read), the list of
  its headings and the lines that mention tests. Reason: the slice adds only comment lines to test
  files; the guide governs what a screen shows.
- `foundations/part_map.md` — read in part: only the lines placing `tests/view/**` and
  `tests/sim/**`.
- `foundations/glossary.md` — read in part: the terms character skill, game minute, map run,
  program, predisposition, archetype, Understanding, repertoire, manual map run, completion, copy,
  practice, trait, trip plan, resurrection, generation number, earning loop, loop.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` — read through its word-for-word
  copy in the handoff, plus lines 16-20 of the file itself.
- Changed test files not read whole: `tests/sim/death.test.mjs` (lines 1-60 by search, 91-310,
  424-483, 624-643), `tests/view/character-screen.test.mjs` (20-276; imports 1-19 by search),
  `tests/view/status-row.test.mjs` (205-294 and the case list), and the files beyond the *Change*
  (each by the cases named above). `tests/sim/skills.test.mjs` and
  `tests/view/character-skills.test.mjs` were read whole.

## Searches not found or unclear

- No test checks the heading text „Umiejętności”, the price of „Obchód”, „Czysty płomień”,
  „Wprawne oko”, „Pełna garść”, „Szybka ręka” or „Zwinny odskok”, a kick's practice, the role
  `text` of the practice line, the line after a completion, the copy editor's offer in a paused or
  ended map run, or the absence of „Kup” in the map-run view (searched `Kup`, `Umiejętności`,
  `run-practice`, `kicking`, `practice` across `tests/`). These parts stand in the pairs.
- Unclear: whether a test that pins a whole constant (`TRAITS` equal to `{ carryingCapacity: 15 }`)
  holds D-192's „never to a trait”; I judged yes, as it fails on a one-action trait.
