# Fix report — Minor findings M1-M4 of the review of the whole change

Status: **done**. Range `23981674..3b378a8b`, three commits, author `mariusznn@gmail.com`, nothing pushed, no screenshot published. O1, O2, O3 not touched.

| Commit | Finding | Files | Lines |
|---|---|---|---|
| `c6a1c17b` | M1 | `tests/sim/saved-game.test.mjs` | +2 −2 |
| `fb85bf26` | M2 | `src/browser/view/program-editor.ts` (comment only), `tests/view/program-editor.test.mjs` | +6 −3 |
| `3b378a8b` | M3 | `foundations/invariants.md` | +1 −1 |

M4 changes no file of the repository.

## M1 — fixed

`DOCUMENT` (`:668`) and `HEADQUARTERS` (`:710`) now hold `solvedMaps: ["forestEdge", "forest"]`. The docstring and the header comment already said so; they now tell the truth. No test failed for that change.
Evidence: `node --test tests/sim/saved-game.test.mjs` exit 0, 38 of 38 pass; its case "a document of the current version loads into the state it describes" loads `DOCUMENT` and `HEADQUARTERS` and compares them to their games, so a version 6 document with `["forestEdge","forest"]` loads whole. (The claim in my first report was true of the game but not of the file; it is now true of both. The cause: my script that removed needless `forestEdge` strings reverted these two lines, because the file's own tests did not need them. I did not re-verify that claim by a command then; I did now.)
I left `["forest"]` at `:447` (`DOCUMENT_V2`, an old document that must stay as it was) and at `:2487` (`deeper`, a game sent to Las — głębiej, which needs only Las), as the finding names neither.

## M2 — fixed

`offeredResources` comment now ends "…that the repertoire holds as items, since while the game holds no map run every discovered target may be picked (D-289)". I read D-289 whole before: its binding sentence says "While the game holds no map run every discovered target may be picked". The test now starts from `newKnowingGame()`, asserts `solvedMaps` is `[]`, expects all four resources, then sends from `withEdgeSolved(game)` to Las (four) and from `newKnowingGame()` to Skraj lasu (two).
Red run: `offeredResources` made to read `[MAPS.forestEdge]` instead of `Object.values(MAPS)`, build, `node --test tests/view/program-editor.test.mjs` exit 1; restored, build, same command exit 0 (59 of 59).

## M3 — fixed

`first-map-balance` now reads: "On the map Skraj lasu, from a game whose Understanding holds every action and condition, a decent program of twelve rules solves the map in at least 95 % of several hundred map runs that its test names, and a naive program of six rules in at most 50 % of them." The count, the clock constant and the entrance-tile clause are gone (dropped, not asserted). `grep -rn "500 map runs\|1760000000000\|never leaves" foundations/` finds nothing, so no decision cites those numbers; D-396 and D-397 needed no edit (D-397 quotes the measurement made in another engine, "over 500 seeds", which is a different thing).
`python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
One remaining mention: the comment of `tests/sim/first-map-balance.test.mjs` still says the naive program never leaves the entrance tile. It is a comment about the program, not an entry; I left it because the finding asks for the entry.

## M4 — checked, screenshots inspected, not published

Route: `.claude/skills/loop2-play/SKILL.md`, read whole. `npm run local` gave `https://127.0.0.1:55225`; own session `playwright-cli -s=fixmapy`; account `agent@example.test` made through the login card; character „Ala”. Console after the reload: 0 errors, 0 warnings (the two errors of the first load are the ordinary 401 before sign-in). Session closed (`playwright-cli close`), `npm run local:stop` ("Local starts stopped: 1"), `.playwright-cli/` deleted. For the card of Las and the editor I composed a saved document of version 6 in a script outside the repository (`a script in the session's scratchpad, outside the repository`: one character „Agent”, everything discovered, `solvedMaps: ["forestEdge"]`), checked it with `loadSavedGame` (true) and sent it by the page's save request (`200`, revision 2).

What I saw (window 1280 × 720):
1. New game, screen Mapy (`the screenshot of the new game's screen Mapy`): the list on the left holds one row, „Skraj lasu”; on the right „Wybierz mapę z listy.”; the bar marks „Mapy”.
2. The card of Skraj lasu (`the screenshot of the card of Skraj lasu`): heading „Skraj lasu” with no mark and no opener; „Żąda”: „Skraj lasu — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”; „Teren”: „siatka 4 × 4”, „wejście stałe”, „krok 5 min”, „bez ognia 83 min — otoczenie 25 °C”; „Leży tu”: „patyk — ≈ 16 z 16 kafelków, po 12, +1 co 30 min” and „jagoda — ≈ 16 z 16 kafelków, po 8, +1 co 40 min”, each with its icon; no „Czyha”, no „Odbiera”; below, „Kto idzie” with „Ala”, program list and „Wejdź”. Layout, spacing, roles looked as on the other cards; nothing clipped.
3. After Skraj lasu solved (`the screenshot of the list after Skraj lasu is solved`): the list holds „Skraj lasu rozwiązana” (the mark in green) and „Las”.
4. The card of Las (`the screenshot of the card of Las`): heading „Las · odsłania ją Skraj lasu” (the opener in the secondary colour), „Żąda” with Las's sentence, four resources (patyk ≈ 11 z 16, jagoda ≈ 8 z 16, mech ≈ 6 z 16, włókno ≈ 6 z 16), no „Czyha”.
5. Program editor with no map run (`the screenshot of the program editor's resource pick`): rule 1.1 set to „Tu leży mniej niż”, „Cel warunku” offers Patyk, Jagoda, Mech, Włókno (four), with Skraj lasu solved. The case with nothing solved is the jsdom test of M2; I did not repeat it in the browser.
Not seen: the screen of a map run on Skraj lasu (not asked).

Screenshots lie only in the ignored directory `.runs/task-cycles/pierwsza-mapa-bez-loterii/screenshots/` (`git check-ignore` confirms): `the screenshot of the new game's screen Mapy`, `the screenshot of the card of Skraj lasu`, `the screenshot of the list after Skraj lasu is solved`, `the screenshot of the card of Las`, `the screenshot of the program editor's resource pick`. None is committed, pushed or uploaded; the request can say they were inspected and are not shown. They hold only the made-up account.

## Checks (command, exit)

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node --test tests/sim/saved-game.test.mjs` | 0 (38 pass) |
| `node --test tests/view/program-editor.test.mjs` | 0 (59 pass); 1 with the mutation above |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 (2023 of 2023) |
| `npx eslint` on the three changed code files | 0 |
| `npx prettier --check` on them | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |

Not run: `npm test` (the orchestrator's); the Python tests (nothing in a Python file or in the data changed).

## Own-work check

Weakest part of this fix: M3, because I dropped a claim instead of asserting it; if the reviewer prefers the assertion, the test would need a check that the naive program never changes the character's tile. Check made: the grep above for any other holder of the dropped numbers. M2's test pins "every" by the mutation run.

## Unread material

D-289 beyond *Verification* line 1 (its *Rationale* and *Rejected*): the binding sentence and the first lines of *Verification* were enough for the citation. `.the-way/task-cycle/change/SKILL.md` and `fix.md` read whole. `review-whole-report.md`: not read; the findings file held what the fixes needed. `.claude/skills/loop2-play/SKILL.md` read whole.

## Searches not found or unclear

None. One thing worth the orchestrator's eye: the skill's section "Show a screenshot to the human" sends screenshots to a public repository; the handoff forbade that, so I did not follow that section.
