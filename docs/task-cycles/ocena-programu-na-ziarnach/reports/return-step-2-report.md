# Return step 2 — correction 1, task `ocena-programu-na-ziarnach`

**Status:** `done with concerns`

Worktree `.`, branch `task/ocena-programu-na-ziarnach`, from `51015538` to `9b08c13d`. `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink. Method read whole: `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md`, `task-cycle/change/SKILL.md`; `elements/common/way_of_working.md`, `elements/common/rules.md`; for each element `skill/SKILL.md` and the files it names (`read.md`, `decide_entry.md`, `draft.md`, `write.md` where they exist), `template.md` and `examples.md` of decisions, invariants, glossary, part map and environment facts.

The concerns, each detailed below: (1) several parts that tests of the correction hold carry the `decision:` line of a neighbouring decision (D-440, D-441, D-442) rather than of the decision whose clause now names them (D-04, D-165, D-440); (2) the part map holds no row of the external context for the player's browser, whose lasting storage the trust boundary `judging-cache.ts` reads — I wrote none, see *Searches not found or unclear*.

## Commits

| Commit | Files (added/removed) |
|---|---|
| `9b08c13d` docs: :card_file_box: name in the tests clauses of D-04, D-206, D-287, D-441 and D-442 the parts of their sentences the tests of the correction hold, in place of the pairs, keeping a pair for what stays at „Wyloguj” (D-441) and for what the server does with the content revision (D-442); rest D-441 on the facts local-storage-lasting and storage-set-item-refusal, cited at a commit snapshot of the HTML Standard; and have the sentence of browser-view keep the last judging of each character, program and map of a game, as D-441 does | `foundations/decisions.md` 63/40 · `foundations/environment_facts.md` 12/0 · `foundations/part_map.md` 1/1 |

Added by path (`git add foundations/decisions.md foundations/environment_facts.md foundations/part_map.md`), message by `git commit -F`; author address `mariusznn@gmail.com`. No code and no test changed; no `decision:` line touched.

## The foundation compared with the code

| Entry | Compared with | Result |
|---|---|---|
| D-441 (new) | `src/browser/view/judging-cache.ts` whole (key `loop2-judging-1|account|moment|character|program|map`, escaped parts; value of exactly `results`, `equipment`, `revision`, `generation`; `readValue`; `writeTo` and the page's memory; `tidyStorage`, `isAboveLoaded`, `isNotBelow`; `lastingStorageOf`), `src/browser/sim/judging-record.ts` (`recordOfJudging`, `markOfRecord`), `src/browser/sim/saved-game.ts` (`madeAtMs`, no `judgings` key), `git grep localStorage` over `src` and `balance` (only `judging-cache.ts`), the 35 `decision: D-441` lines | binding sentences hold. **Corrected:** *Verification* — the pair's parts the tests hold moved into a `tests:` clause; the pair keeps only „Wyloguj”; the violating „a function of the simulation reading or writing the browser's storage” dropped, since the test of `simulation-isolation` (of D-04) holds it and it is no sentence of D-441. *Based on* named the living page `https://html.spec.whatwg.org/multipage/webstorage.html`, which the publisher moves to newer text, so it was no edition and a platform behaviour the decision rests on takes a fact (environment-facts template, "Which facts are written"; the product does so in D-207): now `local-storage-lasting · storage-set-item-refusal`. |
| D-442 (new) | `src/browser/sim/programs.ts` (`withProgramContent` raising at `:400`, `contentRevision: 0` at `:466`, `:503`, `:755`), `src/browser/sim/game.ts` (`newGame`), `balance/campaign.mjs:173-189`, `git grep contentRevision -- src/server` (none: the server neither gives nor reads it), the 15 `decision: D-442` lines | holds. **Corrected:** *Verification* — the pair turned into a `tests:` clause (made at 0 in every way, the campaign's accounts included; +1 by each of the three saves for each of eight changes and by the first chill, in that program alone; A→B→A twice; kept by a rename, an unchanged save, counters alone, key order, a pick, a send and the deletion of another; refused on the copy and the earning loop's program by the load); a pair kept for the server alone. |
| D-440 (changed) | `judging-record.ts`, `judging-cache.ts`, `maps-entry.ts` through its tests, the 16 `decision: D-440` lines | every sentence holds against the code: the last judging of each triple in the browser that made it, results as kinds and equipment, no cause or minute; a new judging replacing the one of its triple; the badge, the count and the note; erasure in effect by the content revision, the generation number and the deleted program's number. Its `tests:` clause holds; no pair. Nothing changed. Concern (1): the parts „the judging of a deleted program standing beside no program” and „every judging of a character erased … in a manual map run, an earning loop and the catch-up” are held by `tests/sim/judging-record.test.mjs:264`, `:297`, `:397` and `tests/view/maps-screen.test.mjs:1669`, which carry `decision: D-441`, and „the rule the game writes at the first chill” by `judging-record.test.mjs:382`, which carries `decision: D-442`. |
| D-04 (changed) | `src/browser/view/app.ts:93`, `:313`, `src/browser/view/page-game-acts.ts:187` (`newGame(Date.now())`), `balance/engine.mjs:38` (`GAME_MADE_AT_MS = 0`), `saved-game.ts:1280`, `:1382` | holds. The third paragraph speaks of the page; the balance instrument, which is no page, makes its games at the fixed moment 0, which the paragraph neither requires nor forbids. **Corrected:** *Verification* — the two items the foundation step added to *complies* moved into `tests:` (the moment of a new game and each path of the page, held by `decision: D-04` lines at `tests/sim/content-revision.test.mjs:381` and `tests/view/judging-cache-page.test.mjs:212`; the screen Mapy drawing the mark from the lasting storage, held by `tests/view/maps-screen.test.mjs:1606`, `:1633` and `judging-cache-page.test.mjs:298`, `:325`, which carry `decision: D-440` and `D-441` — concern (1)). |
| D-386 (changed) | `game.ts:385-390` (RangeError of `newGame`), `saved-game.ts` (moment and revision read as safe integers) | holds. Its pair („a save time far beyond the present loaded …”) is held by no test (`tests/sim/saved-game.test.mjs:2925-2960` sets the moment far ahead, not the save time); kept. Nothing changed. |
| D-165 (changed) | `judging-cache.ts` (key names the program by its number), `markOfRecord` (a program the list lacks gives no mark), `programs.ts` (numbers never given again) | holds; `tests:` clause holds; no pair. Concern (1): no `decision: D-165` line stands at a test of the remembered judging; the part is held by `judging-record.test.mjs:264`, `:297` and `tests/view/judging-cache.test.mjs:153` under `decision: D-441`. Nothing changed. |
| D-401 (changed) | `src/browser/sim/previous-programs.ts:68-101` (`KEYS_BEFORE_REVISION`, `KEYS_WITH_REVISION`, version 9), `programs.ts:503` | holds; its pair (the reader's place apart from the load) is held by no test; kept. Nothing changed. |
| D-206 (changed) | `judging-cache.ts` `tidyStorage`, `app.ts:93`, `page-game-acts.ts:187` | holds. **Corrected:** the pair (a discarded game's judgings showing no badge in the new game) is held by `judging-cache-page.test.mjs:212` and `:375` (each with `decision: D-206`) and `maps-screen.test.mjs:1633`: moved into `tests:`, pair removed. |
| D-287 (changed) | `src/browser/view/team-lines.ts` (`runWaitingParts`), `maps-screen.tsx` (`RunWaitingNote`) | holds. **Corrected:** the link half of the pair is held by `maps-screen.test.mjs:941` (its `decision: D-287` line quotes the link sentence) and `tests/view/team-lines.test.mjs:261`: moved into `tests:`; the pair keeps Siedziba and the screen Postać. |
| D-243, D-329, D-325, D-22, D-439, D-190 *Rationale* | the lines naming a judging (`foundations/decisions.md` search for `judging`, `judged`, `remember`) | none says that the saved game state holds a judging or that the game state remembers one; „judging remembered (D-440)” in D-329 and in D-243's *Rejected* reads true under D-440 and D-441; D-190's „a judging … shows at no cost …” holds. Nothing changed. |
| D-241, D-246 | — | speak of the loop record, which the saved game of version 9 still holds; nothing of a remembered judging. Nothing changed. |
| D-207 | `maps-entry.ts` through `tests/view/account-screen.test.mjs` (Decision 9 of the spec, review of the whole) | a judging changes no game state, so D-207's „right after each change of it the player makes” sends nothing for it; D-207 names no judging. Holds; nothing changed. |
| D-209, D-402 | `game-view.ts` (cache opened with the refused-save flag), `page-game-acts.ts:187` | hold as the foundation step judged: D-209 names no judging and D-441 carries what a game built after a refused save shows; D-402's new game is made as for an account with no saved game state, at the clock's moment. Nothing changed. |
| D-211 | `git grep` of `localStorage`, `sessionStorage`, `indexedDB` over `src` | the unsaved game state reaches no lasting storage; only `judging-cache.ts` reaches `localStorage`, and it writes no game state. D-441's fourth paragraph and *Rationale* state the relation truly. Nothing changed. |
| D-07, D-117 | as D-441's *Rationale* names them | hold. Nothing changed. |
| Glossary `judging`, `loop record`, `content revision`, `generation number`, `save time` | the code above | hold. „remembered” stands in no glossary entry. Nothing changed. |
| Part map `browser-view` | `judging-cache.ts` | **Corrected:** its sentence read „the judgings the player has made of characters, programs and maps” (review `w2f` N3); D-441 keeps the last judging of each triple, a later one replacing it and the opening dropping some: now „the last judging of each character, program and map of a game”. No decision number written into it: an entry of the map carries no link (`part-map/skill/decide_entry.md`). *Trust boundary* holds `src/browser/view/judging-cache.ts`; *Depends on* `simulation · account-server` covers its imports of `../sim/`. |
| Part map `simulation`, `balance-tools` | `src/browser/sim/**`, `balance/engine.mjs:38` | their sentences hold (the simulation computes the judging, its record and mark, the content revision and the moment; the instrument reads no clock). Nothing changed. |

### Invariants

Compared with the code: `save-version` (`SAVED_GAME_VERSION = 9`, `saved-game.ts:82`; the document holds `madeAtMs` and each program's `contentRevision`, no `judgings`), `simulation-isolation` (no `localStorage`, `sessionStorage`, `indexedDB` or `window.` under `src/browser/sim`), `simulation-inputs` (the act of a judging returns the very state it got, `tests/sim/judging.test.mjs:465`), `previous-save-programs-reader` (`previous-programs.ts:68-101`), `judging-cache-reading` (`readValue`, the guarded calls, the key prefix of the cache's version, the account and the game; 14 `invariant: judging-cache-reading` lines in `tests/view/judging-cache.test.mjs`), `cross-part-imports` (`judging-cache.ts` imports only `../sim/`), `balance-instrument-repeatability` (`GAME_MADE_AT_MS = 0`, `balance/engine.mjs:38`, imported by `balance/campaign.mjs:60`; no clock). All hold; none changed. The invariants of `simulation` and `browser-view` the first run's return step compared stand, as the handoff gives.

## Decisions written or changed

No binding sentence changed. Every change is marked **the cycle's** (no row of *Settlements to record* and no projected entry carries it).

| Entry | Field | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-441 | *Verification* | The tests hold where and how a judging is kept, read, refused and removed; only what stays at „Wyloguj” keeps an example. | Testy trzymają, gdzie i jak ocena jest przechowywana, odczytywana, odrzucana i usuwana; przykład zostaje tylko dla tego, co zostaje po „Wyloguj”. |
| D-441 | *Based on* | The decision rests on two facts of the HTML Standard: `localStorage` lasts beyond the session, and a write it cannot take throws. | Decyzja opiera się na dwóch faktach ze standardu HTML: `localStorage` trwa dłużej niż sesja, a zapis, którego nie da się wykonać, rzuca wyjątek. |
| D-442 | *Verification* | The tests hold how the content revision starts, rises and stays; only what the server does with it keeps an example. | Testy trzymają, jak rewizja treści zaczyna się, rośnie i stoi; przykład zostaje tylko dla tego, co robi z nią serwer. |
| D-04 | *Verification* | The tests hold the moment of a new game, each path of the page that gives it the clock, and the mark drawn from the lasting storage. | Testy trzymają chwilę założenia gry, każdą ścieżkę strony, która podaje jej zegar, i znak rysowany z trwałej pamięci przeglądarki. |
| D-206 | *Verification* | The tests hold that a discarded game's judgings do not show in the game started anew. | Testy trzymają, że oceny odrzuconej gry nie pokazują się w grze zaczętej od nowa. |
| D-287 | *Verification* | The tests hold the link to the open manual map run in every row. | Testy trzymają odnośnik do otwartego przejścia ręcznego w każdym wierszu. |

Pairs written or kept, word for word, for the request:

- D-441 (kept from the foundation step's pair, the rest removed): complies „the judgings of the account kept after „Wyloguj” and shown at the next sign-in”; violates „the judgings cleared at „Wyloguj””. Intro: „For what stays at „Wyloguj”, an agent compares a change with the part no invariant and no test holds:”.
- D-442: complies **added by this step** „a save the server accepts leaving the content revision of each program as the browser wrote it”; violates kept „the server raising it at an accepted save”. Intro: „For what the server does with the content revision, an agent compares a change with the part no test holds:”.
- D-287: the foundation step's added link items removed; the pair stands as at `{fork-point}`, Siedziba and the screen Postać alone.
- D-206: pair removed whole. D-04: the foundation step's two *complies* items removed; the rest of its pair as at `{fork-point}`.

## Invariants written or changed

none

## Environment facts

Both marked **the cycle's**; read and checked word for word on 2026-11-21 in the commit snapshot `https://html.spec.whatwg.org/commit-snapshots/0e292f402d0c3dd17fe00c1bb2ef3a3c94cd8bce/` (the head of `whatwg/html` on that day, `gh api repos/whatwg/html/commits/main`), the passages also found in `https://raw.githubusercontent.com/whatwg/html/0e292f402d0c3dd17fe00c1bb2ef3a3c94cd8bce/source`. Named by D-441's *Based on*; no invariant rests on them (no commit of the product makes `judging-cache-reading` true or false through them).

| Fact | Meaning (EN) | Znaczenie (PL) |
|---|---|---|
| `local-storage-lasting` — § 12.1 Introduction | The storage `localStorage` reaches spans the windows of a site and lasts beyond the current session. | Pamięć, do której sięga `localStorage`, obejmuje okna witryny i trwa dłużej niż bieżąca sesja. |
| `storage-set-item-refusal` — § 12.2.1 The Storage interface | `setItem` throws a `QuotaExceededError` where the value cannot be set, as where storage is disabled for the site or the quota is exceeded. | `setItem` rzuca `QuotaExceededError`, gdy wartości nie da się zapisać, np. gdy pamięć dla witryny jest wyłączona albo przekroczono limit. |

Not written, with why: the size of the storage („a few megabytes”) and its synchronous calls — no sentence of D-441 rests on either (the size appears only in the spec's estimate, not in the decision); per-origin separation („Each site has its own separate storage area.”) — D-441 keys by account and game within the origin and rests on nothing of other origins; the refusal of the `localStorage` getter (§ 12.2.3) — D-441 says what the page does „where the browser refuses its lasting storage” whatever the mechanism, and the code guards every reach.

## Glossary terms

none written or changed. „remembered” stands in no glossary entry; in the decisions „the judgings the browser remembers (D-441)” names exactly the values D-441 keeps, so no use was loose but the part map's, corrected above. „lasting storage” takes no entry: D-441 gives it as `localStorage`, the field's meaning.

## Part-map changes

`browser-view`, its sentence (above). No file, *Depends on* or *Trust boundary* changed.

## Projected entries written whole or in part

none

## Rows of *Settlements to record* written

none; row 4 of the frozen task, which the human's remark 1 changed, stands in D-440 and D-441 as the foundation step wrote them.

## Code that no longer matches an entry (reported, not changed)

none. Two notes on code against no entry, from the reviews and left as they are: the comment of `isAboveLoaded` (`src/browser/view/judging-cache.ts:250-251`, review `w2f` N1) says a triple whose program the loaded game no longer holds is left alone, while its generation half still removes it — D-441 states what the code does; `keysOf` (`:193-204`) passes a key that is no string, which a real `Storage.key` never gives.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at `51015538`, before the edits | 0, „0 errors” |
| the same with `--skip-test-citations`, before the edits | 0, „0 errors” |
| the same, both runs, after the edits and before the commit | 0, „0 errors”; 0, „0 errors” |
| `python -B .the-way/elements/common/foundation_check.py` at `9b08c13d` | 0, „0 errors” |
| the same with `--skip-test-citations` at `9b08c13d` | 0, „0 errors” |
| the check of the three passages, markup dropped and whitespace collapsed, in the commit snapshot (a script in my working directory) | each passage found once |

Not run: the full gate (`npm test`; the handoff's boundary — nothing but the cycle's run or CI runs the whole before the merge); `check_instructions.py` (no instruction file changed); no test of mine (no code or test changed).

## Own-work check

- Requirement most likely missed: „leave a pair only for what no test holds” — that I moved into `tests:` an item no test holds. Check: for each item moved I read the case that holds it (titles and `decision:` lines of every test citing D-04, D-165, D-206, D-287, D-386, D-401, D-440, D-441, D-442, 186 lines, listed by a script; the bodies of `content-revision.test.mjs:150-360`, `judging-cache-page.test.mjs:205-415`, `maps-screen.test.mjs:939-990`, `saved-game.test.mjs:2925-2960` read). Items no test holds stayed: D-441's „Wyloguj”, D-442's server, D-386's save time far ahead, D-401's reader apart from the load, D-287's Siedziba and screen Postać.
- Second: every `decision:` line still quotes a binding sentence — no binding sentence changed, and the check without `--skip-test-citations` gives 0 errors at `9b08c13d`; `judging-cache-reading` is found by its 14 lines in `tests/view/judging-cache.test.mjs`.

## Reaches beyond the dispatch

- `a note in the author's private notes` and `git.md`, the user's rules, before the scripts and the commit.
- The web: `gh api repos/whatwg/html/commits/main` (the head commit), and with `curl` the raw `source` of `whatwg/html` at that commit and its commit snapshot, to cite D-441's facts at an edition.
- Product code named in the table above, and the test bodies named in the own-work check.

## Working copies

- `.runs/return-step-2/` held: the heading list and hit lists of the decision log, the listing script of test citations and its output, the scripts that searched and checked the passages, the downloaded HTML source (8 MB) and commit snapshot (15 MB), the foundation check outputs and the commit message file. Removed with `rm -rf` on that full path (exit 0); `.runs/` then holds `local-start`, `quality-venv` and `task-cycles` only, and the worktree is clean. Nothing kept beside this report: the check outputs are quoted above. No worktree or clone made.

## Unread material

- `foundations/decisions.md`: not read whole, by the method; read whole D-04, D-165, D-206, D-207, D-208, D-209, D-210, D-211, D-212 (first paragraph), D-243, D-287, D-325, D-326, D-327, D-328, D-329, D-386, D-399, D-400, D-401, D-402, D-439, D-440, D-441, D-442; the lines a search for `judging`, `judged`, `remember` found elsewhere (D-22, D-190, D-137, D-173, D-216, D-226, D-255, D-268, D-271, D-284, D-308, D-310, D-311, D-324, D-360, D-371, D-373, D-380, D-390, D-417, D-424, D-425, D-429, D-435, D-44), each a judging of the field's sense or a page's memory, none of a remembered judging. D-241 and D-246 judged by their subject (the loop record) without re-reading whole; D-07 and D-117 by D-441's *Rationale* and the spec's quotations.
- `foundations/invariants.md`: the nine entries named above.
- `foundations/environment_facts.md`: its identifier list and the browser-standard facts (`fetch-keepalive-body-quota`, `visibilitychange-hidden-last-event`, `html-exception-reporting`, `browser-bare-import-resolution`) as examples of form.
- The example entries of the-way (`WAY-03`; the glossary, invariant and part-map examples) were not opened in `.the-way/foundations/`; the product's own entries served as examples of form.
- `plan.md`: read *Foundation entries* (lines 1-65) only. `reports/review-whole-2-report.md`, `review-w2f-report.md`, `whole-2-fix-report.md`, `foundation-2-report.md`, `return-step-report.md`, `spec.md`, `task-frozen.md`, `correction-1-remarks.md`: read whole.

## Searches not found or unclear

- **No row of the external context for the player's browser.** `browser-view` takes in values from the browser's lasting storage at `judging-cache.ts`, a trust boundary, and the map's *External context* holds no partner for the player's browser; the part's other boundaries that read what the browser gives (`screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`, the page's address) have none either, so the map treats the page's own browser as no partner. The part-map skill makes a missing exchange a question in step 4; I wrote no row and raise it here: the ways are a row „the player's browser (its address and lasting storage) | both | untrusted” in this change, or none, as the map has kept it. My recommendation: none in this request — the boundary is recorded, the review aims at crafted input there already, and a row for the browser is a question for the map as a whole, not one this change brought.
- **Concern (1), the citations.** The tests that hold D-165's sentence on the remembered judging, two parts of D-440's third paragraph and D-04's mark from the lasting storage carry `decision: D-441` or `D-442` (and `D-440` for D-04's), not the decision whose clause names them. The template ties a test to a decision by its line; I kept those parts in the clauses, since a test holds them and a pair would claim that none does. A `decision:` line of D-165 at `tests/sim/judging-record.test.mjs:264`, of D-440 at `:397` and `tests/view/maps-screen.test.mjs:1669`, and of D-04 at `maps-screen.test.mjs:1606` would make the tie formal — a change of tests, not mine.
- `git grep contentRevision -- src/server`: no hit (positive control: the same search finds `src/browser/sim/programs.ts`).
- The living page D-441 cited, `html.spec.whatwg.org/multipage/webstorage.html`, was not opened; the passages were checked at the commit snapshot that replaced it.
