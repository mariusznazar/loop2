FAIL caa13ffd5061e2cc60c7406203a6b5cf2045240b

# Review of the whole change — task `ekran-wiedzy`

Range `6caa013e04bafca4c28b540fabccf55201ce49a4..caa13ffd5061e2cc60c7406203a6b5cf2045240b` on `task/ekran-wiedzy` (two commits: `11164840`, `caa13ffd`). `git rev-parse HEAD` in the worktree printed `caa13ffd5061e2cc60c7406203a6b5cf2045240b`, the head given; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records. No spec and no plan: one author made the change without slices, so every blocking finding below comes from no slice; each names the commit it stands in.

The code does what the task asks. The screen, its address, the menu-bar item, the wolf's icon with its credit, the plaque and the icon in „Czyha” all work, and their tests catch each rule broken. I checked this with five mutations of my own, and all five were caught. The three blocking findings are in the foundation entries the change writes.

## Findings

### Critical

none

### Important

**I1. D-416's *Verification* says tests open a tree from the keyboard; no test does.** `foundations/decisions.md:4422`–`:4423` (commit `11164840`): "the known trees in the order of the data as folded rows with their numbers of branches, opened by a click and by the keyboard". This text stands under "tests:". The only tests that open a tree are in `tests/view/knowledge-screen.test.mjs:179`, `:211` and `:213`, and they call `press`, which fires a click inside `act` (`tests/view/page-document.mjs:134`–`:137`). The test file says so itself (`tests/view/knowledge-screen.test.mjs:3`–`:5`): "Real keys, focus and the layout of the two areas are the browser check's (D-88)". D-88's *violates* names exactly this case: "a test on a hand-made document model or on jsdom presented as proof of a real event". D-285 shows the form the log uses when a native button opens something from the keyboard: the keyboard goes under "an agent compares a change with the part no test holds", with a complies example ("Enter and Space on „Konto” opening the menu in the browser, as the browser's own click of a native button") and a violates example. Why it matters: a later reviewer who reads D-416 trusts that a test guards the keyboard. A change that stops Enter or Space on the tree row — for example a key handler on the row, or a row that is no longer a native button — passes every test, and no reviewer looks at it in a browser. The entry this change writes says something about the tests that is not true, so this is Important under WAY-263/WAY-364 (the entry's content does not agree with the files). Fix: in D-416's *Verification*, keep "opened by a click" under tests. Move the keyboard into the agent-compared part, with a complies example (Enter and Space on a tree's row opening it in the browser, as the browser's own click of a native button) and a violates example (a key handler on the row that stops Enter or Space).

**I2. D-416's *Rationale* says "the player sees it nowhere today", which stops being true when this change is merged.** `foundations/decisions.md:4434` (commit `11164840`): "the Understanding is the one gain a death never takes, and the player sees it nowhere today, so after losing a character the player sees only what was lost and not what stayed." After the merge the player sees the Understanding on the screen Wiedza, which this change builds. The task asks for D-416 in the wording of the definition (*Decisions in play*, task line 133), so the task itself mandates the defect; it is still a defect (section 3: "Something the plan or the task mandates is still a finding when it is a defect"). The rule the human chose for this round says the same: question 6, answer A, "każde zadanie poprawia to, co jego własna zmiana czyni nieprawdziwym", and the human's words quoted in question 7, "chyba niepowinno być tak, ze dopuszczamy że coś jest nieaktualne". The log already has a form for reasoning that dates: D-325's *Rationale* opens with "When this was decided, nothing in the game but …". Why it matters: an agent that reads D-416 later reads a false sentence about the game and builds its own reasoning on it. Rated Important under WAY-263: the entry's content does not agree with the code once merged. Fix: reword the sentence, for example "the player saw it nowhere before this screen" or "when this was decided, the player saw it nowhere". Following question 6, the human sees the new wording at the request for the merge; the orchestrator should name it in the request as a departure from the approved wording.

**I3. Row 1 of *Settlements to record* is only half recorded: no binding sentence says that each thing on Wiedza stands with its icon from the data.** Row 1 (task line 176): "Każda rzecz Zrozumienia na ekranie Wiedza stoi z ikoną z danych gry, więc stworzenie też ma w danych ikonę z game-icons.net — wilk `wolf-head`, jak w starym Loop — a ikona czynności stoi też przy czynności na ekranie Wiedza." The change records only the last clause, as the change of D-291 (`foundations/decisions.md`, D-291's binding sentence: "… in the rows „Teraz” and „Potem” under the scene and beside the action on the screen Wiedza"). None of D-416's binding sentences (`foundations/decisions.md:4410`–`:4412`) says that items and creatures on Wiedza stand with their icons, or that a creature has an icon in the data. The phrase "each thing with its icon and its name from the data" appears only in D-416's *Verification*, and *Verification* binds nothing. D-27 says where icons come from, not which things have one. D-322's binding sentence speaks of "each thing discovered that the game's data gives an icon", so it holds whether the wolf has an icon or not. Why it matters: the human accepted row 1 as a decision ("Candidates: 6 shown, 6 accepted"). As written, a later change could drop the icons of items or of the wolf from Wiedza, or drop the wolf's icon from the data, without breaking any binding sentence of the foundation. That is the "nazwa rzeczy bez jej ikony" the styleguide lists as Bad, but the styleguide is no decision. This is a missed requirement of the task (*To do* 9, "zmiany D-291 i D-322 z wierszami 1 i 2"), so it is Important. Fix: write the rest of row 1 as a binding sentence. The task sends row 1 to D-291, but D-291's question is "Which icon stands for an action?", which has no room for items and creatures. The fitting place is a sentence in D-416 right after the sentence about the left area, in the words of *To do* 4 ("każda rzecz stoi z ikoną z danych gry i nazwą"), plus the clause that a creature has its icon in the data. That changes the wording of D-416 beyond *Decisions in play*, so it is the orchestrator's question to the human (WAY-30), and the request should show it.

### Minor

**m1. Within the task. The game's one rule for declining a numeral lives in the program editor's module, and the screen Wiedza now reaches into it.** `src/browser/view/knowledge-lines.ts:19` imports `countedName` from `src/browser/view/program-editor.ts:786`. That file's status in `guidelines/coding-browser-module.md:56` is `do not copy`. The import is allowed: D-265 says a new screen "may import that module's pure functions", `countedName` is pure, and the guideline repeats that the status does not forbid such an import (`guidelines/coding-browser-module.md:208`–`:209`). The cost is where the rule stands. A reader who looks for how the game declines a numeral finds it in the module of the program editor, and two unrelated screens now depend on that module, which also holds the editor's code. Moving `countedName` into a small module of its own, imported by both, would leave one rule in a place named for it. Below any rule of size (the product's `guidelines/coding.md` has none), so Minor (WAY-363). The reuse itself is right: it avoids the second rule of declension that the task's sentence "gra nie ma jeszcze odmiany liczebników" would have led to. That sentence's premise was false (see *Searches not found or unclear*).

**m2. Within the task. D-280's *Verification* lists the screens opened at their addresses without Wiedza.** `foundations/decisions.md:4156`–`:4157`: "the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście at their addresses". The binding sentence now names six screens, and the test „a reload at each of the eight addresses opens its screen and leaves the address as it is” in `tests/view/account-screen.test.mjs` opens Wiedza too. The sentence is not false, only short of what the tests hold. The task tells the change to keep D-280's *Verification* as it stands apart from the four-item example (task line 131), so a fix needs the human's agreement. The cost of leaving it is one screen missing from a list a reviewer reads.

**m3. Within the task. The new registry test for Wiedza runs on the test's own table, so it adds little proof.** `tests/view/screen-registry.test.mjs:465`–`:500` builds its table with `entryOf("knowledge", …)` (`:95`), a stand-in written by the test, not `createKnowledgeEntry`. What it shows — a table missing a kind is refused, and a `while-shown` entry is built on entering and taken down on leaving — is generic behaviour of the registry, which the neighbouring test of the list of accounts already shows. The real entry's life is held elsewhere: `tests/view/account-screen.test.mjs` („the item Wiedza of the bar opens the screen Wiedza, which the bar marks and which is gone when the player leaves it”), and the knowledge-screen test „an open tree stays open when the game state is drawn again, and a screen built anew starts with every tree folded”. The test costs about 40 lines to maintain.

## The points the orchestrator raised

- **a** — D-416's *Rationale* "the player sees it nowhere today": finding I2, Important.
- **b** — D-280's *Verification* still lists five screens opened at their addresses: true but incomplete, finding m2, Minor. D-281's "seven" → "eight addresses" (`foundations/decisions.md`, D-281 *Verification*) is right: the changed binding sentence lists eight addresses, so "seven" would be false, and line 163 of the definition, as the task quotes it, lets the task correct such a field. No finding.
- **c** — reuse of `countedName`: allowed by D-265 and by `guidelines/coding-browser-module.md:208`–`:209`. The added code is tested as the task requires. `tests/view/knowledge-lines.test.mjs:29`–`:51` writes out every form of all four nouns for 0–5, 8, 12–14, 21 and 22, independently of the code, and my mutation M1, which dropped the few form, was caught there and in the screen's test. Where the rule should live: finding m1, Minor.
- **d** — no row for the three new files in `guidelines/coding-browser-module.md`: no finding. The guideline says outright that "Plik dodany po ostatnim audycie tabeli nie ma w niej wiersza i też nie jest wzorem" (`:207`–`:208`), and a status is a verdict of an audit through `the-way-maintain-coding-guidelines`, not of this task.

## Coverage of the task

- *To do* 1 — `src/browser/view/menu-bar.tsx` (`ITEMS`, after Programy, no icon), `src/browser/view/screen-address.ts` (`MenuItem`, `markedMenuItem`); tests `menu-bar.test.mjs`, `account-screen.test.mjs`, `screen-address.test.mjs`. Met.
- *To do* 2 — `screen-address.ts` (`readScreenAddress`, `resolveScreen`, `screenAddress`, kind in `KIND_NAMED`), `game-view.ts` (one line of the table); the other addresses unchanged; crafted fragments `#/WIEDZA`, `#/wiedza/`, `#/wiedza/x`, `#/wiedza#x` read as no screen. Met.
- *To do* 3 — `knowledge-screen.tsx` (heading, two `screen-area`s), `styles.css` (`.screen.knowledge-areas` in the grid of Mapy and in the `@media (max-width: 720px)` rule). Met; the narrow layout is seen in the screenshot `wiedza-narrow.png`.
- *To do* 4 — `knowledge-lines.ts` (`knownGroups`, `knownThingCount`, `thingsCounter`) and the screen. Met in code and tests; the foundation lacks the icon part of row 1 (I3).
- *To do* 5 — `knowledge-lines.ts` (`knownTrees`, counters), `knowledge-screen.tsx` (open trees in component state, `ReactButton` with `expanded`), `knowledge-entry.ts` (`while-shown`, so each entering builds the screen anew). Met. The keyboard works because the row is a native button, which the author checked in a browser; D-416 wrongly claims a test of it (I1).
- *To do* 6 — `assets/icons/wolf-head.svg`, `creatures.ts` (`icon`, `iconTitle`), `credits.ts` (`ICON_CREDITS["wolf-head"]`), `credit-lines.ts`, environment fact `game-icons-wolf-head-title`, `icon-credits` *Rests on*. Met; the trust boundary is checked below.
- *To do* 7 — `scene-picture.ts` (`plaquesOf` takes `discovery.creatures`); tests `scene-picture.test.mjs` („a discovery of the wolf alone shows its head on one plaque in the middle of the row”) and `scene.test.mjs` (the stop at the first attack: the wolf with no run in and one plaque `/icons/wolf-head.svg`). Met.
- *To do* 8 — `map-lines.ts` (`AttackerLines.icon`), `maps-screen.tsx` (the mask in the head of „Czyha”); tests `map-lines.test.mjs`, `maps-screen.test.mjs`. Met.
- *To do* 9 — D-280, D-281, D-416, D-291, D-322, D-327, the environment fact and `icon-credits` are written; findings I1, I2 and I3 concern them.
- *To do* 10 — `guidelines/styleguide-browser-view.md`: the menu-bar rule (lines 504, 515), the new rule "The screen Wiedza" (lines 598–627), the scene rule (lines 812–817); "The screen Mapy" unchanged. Met. The new rule has the fields of `.the-way/product-guidelines/template.md` (*Decision*, *Invariant*, *Good*, *Bad*). Its examples come from the data: „Eksploracja · 3 gałęzie” — Eksploracja has 3 branches; „1 · 1 · 2 pkt” — the prices of Długi krok and Oszczędne dorzucanie.
- Questions 1, 3, 8 — D-416's binding sentences and *Rejected*, which holds the definition's rejected way and the ways not chosen in questions 1 (A, B, C), 3 (B, C and the sentence on the right) and 8. Question 2 — the icon, the credit, the fact, D-291, D-322. Question 4 — D-416 *Origin* `none`, and no file of the change names a note outside the repository (searched, below). Question 5 — D-327. Questions 6 and 7 — the sentences of D-322 and D-327 corrected; D-416's own sentence is not (I2).
- *Settlements to record* — row 1 half recorded (I3); row 2 in D-322's *Rationale* and *Verification*, its binding sentence unchanged as the task says; row 3 in D-327's binding sentence, *Verification* and *Rationale*. *Verification*'s "the creature with no icon" became "the creature's icon". The change is right because the old wording became false; the task's "przykłady *Verification* zostają prawdziwe" speaks of the complies and violates examples, which are unchanged.
- Projected entries carried — D-280 and D-281 (written), D-416 (written), D-282 (made true for Wiedza), D-27 and `icon-credits` (made true for the wolf).
- Source fidelity, word for word where the task quotes: D-416's first binding sentence, *Rationale* and the definition's *Rejected* clause match task line 133. D-280's two changed clauses match task line 131. D-281's address list matches task line 132. D-327's "with its icon" and "four things" and the struck reason match task line 151. D-322's struck words and the added *Verification* clause match task line 150. The Polish sentences of the three settlements are rendered faithfully in D-416. Things the task does not settle and the author chose: the number D-416, its section, *Relations* "derives from D-280 · derives from D-282", and the complies and violates examples of *Verification*. None claims anything the task contradicts.

## Trust boundary `assets/icons/**`

- The file is the source plus the two documented changes, nothing more. I fetched `lorc/wolf-head.svg` from `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/lorc/wolf-head.svg` (HTTP 200; `82d94881…` is `ICON_SOURCE_COMMIT` in `src/browser/view/credits.ts:21`). Removing `<path d="M0 0h512v512H0z"/>` and replacing `fill="#fff"` with `fill="#f4f4f5"` gives a text byte-equal to `assets/icons/wolf-head.svg` (1114 characters each). The file holds one `<svg>` with the SVG namespace and one `<path>` with `fill` and `d`: no script, no `foreignObject`, no `on*` attribute, no reference outside itself. `icon-file-content` and `icon-credits` pass (checks below). The credit's text „wilk: „Wolf head icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)” matches what the file changes.
- Title and author read from the page itself: `https://game-icons.net/1x1/lorc/wolf-head.html` (HTTP 200, 2026-11-16) holds `<h1 id="icon-name" itemprop="name">Wolf head icon</h1>`, `by <a href="https://lorcblog.blogspot.com" rel="author">Lorc</a>` and `CC BY 3.0`. That matches `CREATURES.wolf.iconTitle`, `ICON_CREDITS["wolf-head"].author` and `sourceUrl`, the environment fact `game-icons-wolf-head-title`, and the `TITLES`/`AUTHORS` of `tests/invariants/test_icon_credits.py`.
- **Unverified:** the archived capture the fact cites, `https://web.archive.org/web/20261011095410/https://game-icons.net/1x1/lorc/wolf-head.html`. web.archive.org answered HTTP 429 three times, the last through the raw form `…/20261011095410id_/…`. Whether that capture exists and shows the same heading stays unchecked.
- `loop2-container-icons` I did not run (Docker). The author reports it at exit 0, and the file is one more file under a rule that copies the whole directory.

## The screen in the running game and the screenshots

- I did not run the game myself. I judged the author's evidence. The commit `0904a1fd6dc49e4f18897ac45949468f9b5a29db` of `mariusznazar/screenshots` exists. It is the head of the branch `loop2/ekran-wiedzy` and holds exactly the five files under `loop2/ekran-wiedzy/`, author `mariusznn@gmail.com` (`gh api`, read only). That is the route `.claude/skills/loop2-play/SKILL.md` ("Show a screenshot to the human") gives: a branch per cycle, a directory per cycle, links to the commit, nothing in the repository of loop2.
- I downloaded and looked at all five (`?raw=true` links, HTTP 200). No email address, password or token shows; the menu „Konto” is closed in each.
  - `wiedza-new-game.png`: the bar Siedziba · Mapy · Programy · Wiedza, Wiedza marked; „Zrozumienie · 1 poznana rzecz”, „Czynności · 1”, „Eksploruj” with its icon; no right area.
  - `wiedza-rich.png`: „16 poznanych rzeczy” = 12 + 3 + 1, „8 drzew”, three trees open with their branches and price strings; the focus outline on a row.
  - `wiedza-narrow.png`: the areas one under the other.
  - `wiedza-plaque.png`: four framed plaques, the wolf's head last, in the order of the band; the wolf beside the mage.
  - `mapy-czyha.png`: the wolf's icon before „wilk · 24 zdrowia · cios 7”.
  - Each matches what the task requires.
- No screenshot file is in the range (`git diff --stat`), so WAY-316 has no finding.

## The author's own-work check

The author named the keyboard and the folded trees at each entering as the weakest requirement. That fits: jsdom cannot show the keyboard. The check — Tab and Enter, Tab and Space in a real browser, and leaving and coming back — would catch the requirement unmet. The gap is not in the check but in D-416, which claims a test of the keyboard instead of the browser check (I1).

## Structure of the code the change leaves

`python -B .the-way/task-cycle/change_file_sizes.py 6caa013e caa13ffd` gave the largest growth in source: `knowledge-screen.tsx` +192 (new), `knowledge-lines.ts` +148 (new), `styles.css` 3307 → 3406, `maps-screen.tsx` 470 → 481, `scene-picture.ts` 740 → 744. `guidelines/coding.md` has no rule `### Size of a function and a file`, so there is no test of the invariant to run on the base and the head, and any structure finding is Minor (WAY-363). The functions the diff reaches grow by a line or two each (`plaquesOf`, `attackerLines`, `MapCard`, the three switches of `screen-address.ts`). `KnowledgeView` is about 90 lines of JSX in one component. No code is left without a user. No name stopped being true: `game-view.ts`'s comment, `menu-bar.tsx`'s comment and `plaquesOf`'s comment were updated.

## Declined to judge

- D-43's binding sentence lists where an icon with no text beside it takes `text-strong` (the badge, the flying icon, the drawing of the map) but not the plaque of a discovery. That predates this change, and the wolf's plaque is one more plaque of the same kind: outside the task.
- D-407's complies example, "a new screen … whose factory receives … the memory of its unfolded trees, shared with another screen", describes a shape this screen does not take. Its open trees live in the component, which D-407's own last clause and D-416's "each entering … starts with the trees folded" require. The example predates the task and is no requirement of it: outside the task.
- The switch „Zrozumienie · Umiejętności” of the old Loop on a narrow screen: the task names it out of scope.

## Checks run

All from the worktree root `the root of the task's worktree` unless named.

- `git rev-parse HEAD` → `caa13ffd…`; `git -C .the-way rev-parse HEAD` equals `git ls-files --stage -- .the-way` (`bfb2e109…`).
- `python -B .the-way/elements/common/decision_index.py --output <working dir>/index.txt --section "Browser view: screens, navigation and their code" --section "Look of the browser view: styleguide, controls, pictures and fonts" --section "Discovery and the Understanding" --section "Screen Mapy and Siedziba" --section "Scene" --part browser-view --part simulation --part product-foundation --part agent-workflow --decision D-280 … --decision D-362` — exit 0 (81 listed in full, 282 by heading). The first try, with numbers without `D-`, ended with exit 2: `no decision 280`.
- `python -B .the-way/task-cycle/change_file_sizes.py 6caa013e caa13ffd` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, `0 error, 139 warn, 7 info`.
- `npm run typecheck` — exit 0.
- `npx eslint` on `knowledge-entry.ts`, `knowledge-lines.ts`, `knowledge-screen.tsx`, `scene-picture.ts`, `maps-screen.tsx`, `map-lines.ts`, `screen-address.ts`, `menu-bar.tsx`, `creatures.ts`, `tests/view/knowledge-lines.test.mjs`, `tests/view/knowledge-screen.test.mjs` — exit 0.
- `npm test -- <file>`, each exit 0: `tests/view/knowledge-lines.test.mjs`, `knowledge-screen.test.mjs` (7 pass), `scene.test.mjs`, `scene-picture.test.mjs`, `maps-screen.test.mjs`, `map-lines.test.mjs`, `screen-address.test.mjs`, `menu-bar.test.mjs`, `icons.test.mjs`, `screen-registry.test.mjs`, `account-screen.test.mjs`, `tests/sim/data.test.mjs`, `tests/invariants/test_icon_credits.py`, `test_icon_file_content.py`, `test_content_identifiers.py`, `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_cross_part_imports.py`, `tests/agent_workflow/test_tracked_file_private_paths.py`.
- Mutations of my own, in a worktree of the head under my directory, each applied alone, the source restored after it, `git status --short` empty at the end; each named run exit 1 (caught):
  - M1, the counters losing the few form (`{ one, few: many, many }` in `counted`): `knowledge-lines.test.mjs` 1, `knowledge-screen.test.mjs` 1.
  - M2, the creature line of `plaquesOf` removed: `scene-picture.test.mjs` 1, `scene.test.mjs` 1.
  - M3, every known tree open at the entering (`useState(() => [...props.state.understanding.trees])`): `knowledge-screen.test.mjs` 1.
  - M4, the filter of empty groups removed: `knowledge-lines.test.mjs` 1, `knowledge-screen.test.mjs` 1.
  - M5, the icon url of „Czyha” spoiled: `maps-screen.test.mjs` 1.
  - Controls on the unmutated head: `knowledge-screen.test.mjs` 0, `scene-picture.test.mjs` 0.
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/creatures.ts"` in the head worktree (the one changed `simulation` file; `guidelines/testing.md`, "Mutation testing") — exit 0, "Instrumented 1 source file(s) with 0 mutant(s)". It gave no mutant and so no result. The two new fields are held by the deep equality in `tests/sim/data.test.mjs` („the wolf has its icon, 24 health, bites for 7 and keeps its ordered combat rules”).
- Search of the added lines (`git diff 6caa013e..caa13ffd`, lines starting `+`) for `Brain`, `vault`, `Storage`, `a drive-letter path`, `repos/loop`, `KnowledgeScreen`, `cdc7c0d`, `_zadania`, `obsidian`, `analizy`, `Fable`, `rozstrzygniecia`, `.md`: no name of a note or a private file. Hits only on `KnowledgeScreen*` identifiers of the new module, `+++` headers and the word "notes" in a CSS comment (D-362; `tracked-file-private-names` is a review invariant).
- `curl` of the icon's page (HTTP 200), of the source SVG at `ICON_SOURCE_COMMIT` (HTTP 200) and of the archived capture (HTTP 429, three times). `gh api repos/mariusznazar/screenshots/commits/0904a1fd…` and `…/branches/loop2%2Fekran-wiedzy`, and the five images (HTTP 200).
- Not run: the full gate `npm test` with no file (the orchestrator's); `tests/invariants/test_loop2_container_icons.py` (Docker; not run by me); the game in a real browser (I judged the author's screenshots instead); the archived capture of the environment fact (HTTP 429).

## Reaches beyond the dispatch

- `.the-way/elements/common/way_of_working.md`, "Reading the foundation" — the method of my selection.
- `.the-way/product-guidelines/reading.md` — the method of the selection of guidelines.
- `.the-way/product-guidelines/template.md` (rule fields) — to compare the new styleguide rule.
- `tests/view/page-document.mjs:134`–`:137` (`press`) — to judge I1.
- `src/browser/view/maps-entry.ts`, `screen-registry.ts` (types), `controls/react-button.tsx` (`label`, `aria-expanded`), `program-editor.ts:786`–`:796` (`countedName`), `src/browser/sim/data/skills.ts` (names and prices, for the styleguide examples), `src/browser/tokens.css` (the tokens the new rules read), `src/browser/styles.css:220`–`:248` (`.screen`, `.screen-area`).
- `.claude/skills/loop2-play/SKILL.md`, "Show a screenshot to the human" — to judge point 4.
- Invariants `tracked-file-private-names` (by search) and the list of the *Part* lines of `foundations/invariants.md`.

## Working copies

- `.runs/review-whole/head` — a detached worktree of `caa13ffd` for the mutations and Stryker, with a junction `node_modules` to the reviewed worktree's `node_modules`. The junction was removed first with `rmdir`, which removes the link only (the reviewed worktree's `node_modules` still holds 268 entries). The worktree was then removed with `git worktree remove --force` and `git worktree prune`.
- `.runs/review-whole/` — the index of decisions, the extracts, logs, the fetched page and SVG, the five downloaded screenshots and the scripts. Removed with `rm -rf`. Nothing was kept in `reports/` besides this report; every result it needs is quoted here.
- The `dist/` the focused tests built in the reviewed worktree is the product's own build output, ignored by git, no copy of mine. `git status --short` in the reviewed worktree is empty.

## Unread material

The index of my selection lists 81 decisions in full and 282 by heading. **I read 38 decisions whole:** D-416, D-280, D-281, D-291, D-322, D-327, D-27, D-282, D-408, D-265, D-407, D-285, D-276, D-88, D-264, D-36, D-199, D-200, D-195, D-119, D-120, D-196, D-118, D-283, D-148, D-325, D-328, D-143, D-403, D-396, D-44, D-43, D-40, D-39, D-47, D-45, D-269 and D-362. The other 43 listed in full I read through their binding sentences in the index. Those that bear on the change and stayed unread whole:

- D-316 — read through its *Verification*'s first half; its *Rationale* and *Rejected* unread.
- D-320, D-121, D-312, D-317, D-315 — binding sentences only.
- D-44 — read whole after the first pass, counted above.

Of the 282 listed by heading, I opened none whole beyond those named. By heading, D-264, D-36, D-88, D-143, D-403 and D-396 bore on the change, and I read those whole.

- Guideline files: `guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md`, `testing.md` and `styleguide-browser-view.md`, read whole; `src/browser/AGENTS.md` read whole. No guideline file of a touched part was left unread. `coding-simulation-module.md` was not selected, since `creatures.ts` is content data, which `coding-content-data.md` covers.
- Invariants read whole: `icon-file-content`, `icon-credits`, `loop2-container-icons`, `content-identifiers`, `browser-view-token-values`, `browser-view-focus-outline`, `loop-run-knowledge`, `tracked-file-private-names`. The other invariants whose *Part* names `browser-view`, `simulation` or `every` I read by heading and *Part* line only.
- `foundations/part_map.md` read whole.
- The glossary entry `Understanding` not read whole: only its sentence as the task quotes it (task line 164).
- `.the-way/task-cycle/change/ui_check.md` not read; I judged point 4 by the skill `loop2-play`, which holds the route.
- Environment facts: only `game-icons-wolf-head-title` and the neighbouring `game-icons-wood-pile-title`.

## Searches not found or unclear

- The task says "gra nie ma jeszcze odmiany liczebników, więc to zadanie ją dodaje" (*To do* 5, question 8, *Context* line 97). The game has one, `countedName` in `src/browser/view/program-editor.ts:786`, and `RESOURCES` hold plural forms (`src/browser/sim/data/resources.ts:8`). The task's premise is false; its requirement, counters that decline, is met.
- *Context* and question 1 expect a new game that knows no thing. `newGame()` holds „Eksploruj” already (D-118), so the empty left area appears only in a state made by hand (the test at `tests/view/knowledge-screen.test.mjs:47`).
- The archived capture of the environment fact could not be read (HTTP 429).
- `docs/task-cycles/ekran-wiedzy/task.md:186` (the addendum of 13.11.2026) names notes outside the repository. It is the frozen task, not a file git tracks, so it is no finding under D-362; it is named here only because I met it reading the task.
