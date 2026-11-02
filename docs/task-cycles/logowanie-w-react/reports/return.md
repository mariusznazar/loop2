# Report — the return step, task `logowanie-w-react`

**Status:** `done with concerns`. Every point of the handoff is judged and written; no question arose. The concerns are three, under *For the orchestrator and the request*.

## Files and commits

Commit `c0337587b1174b28e2dea170c55755da630f4097` on `task/logowanie-w-react`, `docs: :memo: record the return step's entries of the login card: the kitchen-sink page without React, libraries built on React, and the sources the change rests on`, on b415368.

| File | Added | Removed |
|---|---:|---:|
| `foundations/decisions.md` | 73 | 20 |
| `foundations/environment_facts.md` | 36 | 0 |
| `foundations/invariants.md` | 4 | 4 |
| `guidelines/coding-browser-module.md` | 1 | 1 |

No test and no product code changed.

## Foundation compared with code

Compared at b415368, by reading the code each entry speaks of, not by running it.

| Entry | Compared with | Result |
|---|---|---|
| D-03, `browser-view-framework` | `package.json`, `src/browser/view/**/*.tsx`, `tests/invariants/test_browser_view_framework.py` | D-03 stands, narrowed by D-265. The invariant's words stand; the guard refuses more than they say, so D-270 holds the condition and the invariant links to it |
| D-06 | `scripts/build.mjs`, `tsconfig.browser.json` | stands; *Based on* gains `react-entry-format`; „one more step” became „one more build step”, see the glossary |
| D-27, D-96 | `src/browser/view/credits-section.tsx`, `src/browser/view/account-card.tsx:579-624`, `src/browser/sim/data/about.ts` | stand |
| D-36 | `guidelines/coding-browser-module.md:15` | stands |
| D-45, D-44, D-47 | `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`, `src/browser/kitchen-sink/kitchen-sink.ts:11-30` | stand; the page's imports reach no `.tsx` file |
| D-76, D-88 | `scripts/kitchen-sink.mjs` unchanged by the range; `tests/view/page-document.mjs` | stand |
| D-259, D-260 | `account-card.tsx:565-602`, `:437`, `:510` | stand |
| D-261, D-262 | `src/browser/view/app.ts`: `showPage`, `placeCard`, `showForms`; `PageSentence` | stand |
| D-263, D-266 | `scripts/build.mjs:13-17`, `:34-46`, `package.json:36` | stand |
| D-264 | `tests/view/page-document.mjs` | each rule stands in the harness; *Based on* changes |
| D-265 | `src/browser/view/controls/react-*.tsx`, `tests/view/react-controls.test.mjs` | stands; its sentence on the kitchen-sink page moved to D-269 |
| D-267 | `guidelines/coding-browser-module.md:98-124` | stands; *Based on* gains a fact |
| D-268, `document-test-memory-limit` | `tests/view/memory-limit.mjs`, `tests/view/page-document.mjs:9`, tests below | stand; *Based on* of D-268 gains three facts |
| `application-build-output`, `application-build-layout`, `application-package-layout`, `application-build-kitchen-sink`, `preview-server-access`, `eslint-source-rules` | `scripts/build.mjs`, their tests by reading | stand |
| `icon-credits` | `tests/invariants/test_icon_credits.py` | sentence corrected, see *Invariants* |
| D-18, D-29, D-33, D-42, D-43, D-97 to D-100, D-139, D-156, D-157, D-160, D-211, D-222, D-224, D-225 | the card's forms and `app.ts`, read; no sentence of theirs names what the change moved | stand; the whole review compared the requests and sentences line by line |

The search of the foundation for `dist/public`, `account-screen`, `status-row`, `hand-made`, „DOM”, `UI framework`, „runtime dependenc”, „footer” and „on every screen” found nothing else the change makes untrue. `status-row` and `account-screen` stand in no entry. D-157's „on every screen” is untouched: no status row stands on the card today either, since it is made with the game.

### Points of the handoff

1. **„Strona wszystkich stanów bez Reacta”.** Written as **D-269**, a new number: the ban is a new rule next to D-45 and D-265, and a new rule next to a decision is a new question. D-265 answered part of it in passing, so its sentence „The kitchen-sink page shows the DOM form”, the clause of its *Rationale*, its rejected way of bundling the page and its `derives from D-45` moved to D-269, as the template's „Changing a decision” gives. `guidelines/coding-browser-module.md:147` now cites D-269 alone.
2. **The framework guard.** It binds later work beyond the invariant's words: a dependency that draws nothing but declares a peer on `react` fails the invariant's test while the sentence stays true. The task commands those words, so they stay, and **D-270** holds the condition, which the template's „The sentence” allows once the invariant links to it; `browser-view-framework` reads `Derives from: D-03 · D-270`. The test needs no change: `react_libraries` at `tests/invariants/test_browser_view_framework.py:136` is what D-270 says.
3. **`document-test-memory-limit`, Method `test`.** True at the head, so choice 3 of `reports/foundation.md` is closed.
   - `tests/view/memory-limit.test.mjs:130` holds the first two clauses. Its text guard does not read the form `load("jsdom")` (M1), yet the tree keeps the sentence: only `tests/view/page-document.mjs:15` loads jsdom.
   - `tests/view/memory-limit.test.mjs:104` holds „fails the run with a sentence saying so”, on both routes.
   - `tests/view/page-document.test.mjs:99` holds the 2 GiB of the default, and cites the invariant.
   - The 100 ms stands in `tests/view/memory-limit.mjs:12`, and no test reads the value itself; the kill before the case's own stop at 4 GiB at about 1 GiB/s bounds it from above only. The sentence is true of the code.
   - Failing runs: `reports/slice-1.md:19`, *Failing first*.
4. **`icon-credits` and M2.** See *Invariants*.
5. **Part map.** See *Part-map changes*.
6. **Environment facts.** See below, with the finding of `reports/slice-3.md`.
7. **Glossary.** See below.

## Decisions

Polish sentences are for the request.

| Entry | State | Znaczenie |
|---|---|---|
| D-269 | new | Strona wszystkich stanów nie zawiera Reacta: pokazuje każdą wspólną kontrolkę w postaci DOM, a żaden moduł, który importuje, nie sięga do pliku `.tsx`, dopóki jej skrypt nie składa paczki; zadanie, które potrzebuje tam Reacta, zmienia krok budowania skryptu, nigdy linie podające pliki. |
| D-270 | new | Biblioteka zbudowana na React, czyli pakiet inny niż `react` i `react-dom` z zależnością równorzędną od `react` w pliku blokady, liczy się jako inny framework widoku, także gdy nic nie rysuje; zadanie, które jej potrzebuje, wymienia ją w tej decyzji i przepuszcza przez test w tej samej zmianie. |
| D-265 | changed | Wspólna kontrolka ma formę React i formę DOM o tym samym drzewie elementów DOM, a test pilnuje, że są takie same; zdanie o stronie wszystkich stanów przeszło do D-269. |
| D-264 | *Based on* changed | Bez zmiany znaczenia: decyzja opiera się teraz na tym, że React w wersji rozwojowej zgłasza zmianę kolejności Hooków i że tę wersję ładuje, gdy `NODE_ENV` nie jest `production`. |
| D-267 | *Based on* changed | Bez zmiany znaczenia: dołącza fakt o zgłoszeniu zmiany kolejności Hooków. |
| D-268 | *Based on* and wording changed | Bez zmiany znaczenia: dołączają fakty o wątkach Node, o `SIGKILL` i o `rss`, a „element” stał się „elementem DOM”. |
| D-06 | *Based on* and one word changed | Bez zmiany znaczenia: dołącza fakt, że plik wejściowy pakietu Reacta jest modułem CommonJS, a w uzasadnieniu stoi „krok budowania”. |

**Considered and not written: `createAccountCard` as the boundary between the DOM page and a React screen** (spec decision 3, the one question carried to the cycle with no entry of its own). The exemplar of D-36 and the *Examples* of `guidelines/coding-browser-module.md:162-168` carry it, and it goes when `src/browser/view/app.ts` moves, so a later task can change it alone. Rejected: a decision restating the exemplar. Cost if wrong: a later screen may mount differently and a review has no decision to cite.

## Invariants

| Identifier | On {fork-point} | Now | Tests that cite it, against the new wording |
|---|---|---|---|
| `icon-credits` | … the game's footer shows a credit that names … | … the game's footer and the game's section of credits each hold a credit that names … | `tests/invariants/test_icon_credits.py` reads the footer and `CreditsSection`, which is the sentence whole |
| `browser-view-framework` | sentence on {fork-point} as `reports/foundation.md` gives it; *Derives from* D-03 | sentence as the task gives it, unchanged here; *Derives from* D-03 · D-270 | `tests/invariants/test_browser_view_framework.py` holds, read against D-270 |

`icon-credits`: Wzmianka o każdej ikonie stoi i w stopce gry, i w sekcji wzmianek gry; to, że sekcja stoi na karcie logowania, niesie D-27.

The sentence read „the login card's section of credits”, while its citing test says it does not cover whether the card draws the section (`tests/invariants/test_icon_credits.py:51`), and a citing test's pass is the invariant's result. So a commit taking the section off the card would give the invariant a pass with its sentence false. Two cases of `tests/view/account-screen.test.mjs` catch that, and neither cites the invariant. With no test to change here, the sentence comes to what its test checks, in the projected entry's own words, „the game's section of credits”, and D-27 keeps the card. Rejected: leaving the sentence, whose Method `test` then promises more than the test holds. Cost if wrong: the invariant no longer names the card, and D-27 with those two cases carries that.

`document-test-memory-limit`, `application-build-output`: no change. No new invariant: nothing the task, a decision or the human sets asks for one. D-269 could take one, but no test may be written here, and a `review` entry would repeat the decision.

## Environment facts

Each new, each passage checked word for word against the file downloaded from its address, by a search with markup dropped: 12 passages, 0 missing.

| Identifier | Named by | Znaczenie |
|---|---|---|
| `react-hook-order-report` | D-264, D-267 | Wersja rozwojowa Reacta zgłasza przez `console.error` zmianę kolejności Hooków. |
| `react-entry-build` | D-264 | Plik wejściowy pakietu Reacta ładuje wersję produkcyjną, gdy `process.env.NODE_ENV` to `production`, a inaczej rozwojową. |
| `react-entry-format` | D-06 | Plik wejściowy pakietu Reacta jest modułem CommonJS. |
| `node-worker-threads` | D-268 | Moduł `node:worker_threads` daje wątki wykonujące JavaScript równolegle. |
| `node-sigkill-termination` | D-268 | `SIGKILL` bezwarunkowo kończy Node.js na każdym systemie, a na Windows `process.kill()` to emuluje. |
| `node-process-rss` | D-268 | `process.memoryUsage.rss()` zwraca w bajtach, ile miejsca proces zajmuje w pamięci operacyjnej. |

**Not written, with the reason.**

- **esbuild at `minify: true` leaves no `process.env` (`reports/slice-3.md:83`).** No entry rests on it: `scripts/build.mjs:45` sets the value itself, so a change in esbuild changes nothing, and a fact stands only while an entry names it. What the value does in React stands in `react-entry-build`.
- **esbuild as one package per system.** D-263 names it as a cost it accepted, not a reason; the decision would stand without it.
- **jsdom's and happy-dom's behaviours in D-264.** They are measurements of the trial on the product's own runs, and a fact takes a published passage or a reading of a host the product's people run; those rules would only become needless if the behaviour changed.
- **React reading `window` when it loads.** The same: if it changed, the harness's order becomes needless, and no decision falls.

## Glossary terms

None written. One meaning, each ordinary to a reader who knows the product's field; a word with several such meanings takes no entry.

| Word | Uses read | Judgment |
|---|---|---|
| card | D-96, D-27, D-259 to D-262, `icon-credits` before this change, styles, skills | A panel holding one thing, as a reader of web interfaces takes it. Not the-way's word |
| harness | D-264, D-268 only | A test harness, as a reader of tests takes it. Not the-way's word |
| switch | D-96, D-259 to D-261 as a control; D-93, D-131, D-136 and D-174 as the act of switching a character's program | Two meanings, both ordinary. The glossary's `copy` uses the second. Neither is a meaning of the product's own |

**A term used against its entry, corrected.** `element` is a term of the-way's glossary, a division of the foundation, and a word of the product's domain takes a qualifier there. D-265 and D-268, written in this change, used it bare; they now read „DOM element”. The same rule on the last word of a term gave „build step” in D-06. Left: „static elements” of D-36, word for word as the gate approved it and older than this change.

## Part-map changes

None. Against the code:

- `git ls-files` holds no `src/browser/*.tsx`; the four `.tsx` files stand under `src/browser/view/**`, so question 10 leaves the pattern out.
- `tests/view/**` claims the new test files and `src/browser/sim/**` claims `about.ts`.
- `foundation_check.py` holds every file to one part.
- The responsibilities of `browser-view`, `simulation`, `build-tools` and `agent-workflow` read true. `about.ts` imports nothing, so `simulation` keeps `Depends on: none`. `account-card.tsx` reaches `simulation` only through `sim/data/about.js`, which `browser-view` may.

## Projected entries

Written by this task, whole: D-03, D-06, D-36, `browser-view-framework`. In part: D-96, D-27, `icon-credits`. Each realized by the code at the head. `browser-view (changed)` needs no entry yet, and task 3 writes it. No projected entry the code makes true was missed: the plan's rows naming task 2 are these eight.

D-97's projected change moves „Wyloguj” into the menu „Konto”, which this task's code does not bring and the plan gives to no row of task 2.

## Rows of Settlements to record

| Row | Entry | Compared with the code |
|---|---|---|
| S1 | D-259 | met |
| S2 | D-260 | met |
| S3 | D-261 | met |
| S4 | D-262 | met |
| S5 | D-76 | met, `scripts/kitchen-sink.mjs` unchanged |
| S6 | D-263 | met |

None missed.

## For the orchestrator and the request

1. **D-270 is a meaning the human has not read.** It records what the fix put in the guard: a router, a state library or a library for dragging fails `browser-view-framework` until a task lets it in on purpose. `reports/whole-review-fix.md` N2 asked that the human know this before the next screens, and D-03's *Rationale* names dragging in the program editor as a risk. If nothing is done, the entry stands and the first such task meets a loud failure with its way out written down. If the human wants narrower, the guard must read only libraries that draw, which no lock entry tells apart, and the condition goes back to a list of names. It needs naming under *What this request settles*; the human accepts it at the merge.
2. **`tests/invariants/test_icon_credits.py:1-2` now quotes an older wording of `icon-credits`** beside its stale `:18`. Neither is mine under the handoff. The comment says „the login card's section”; nothing reads it. It is a mismatch this step made, named so it is not taken for an oversight.
3. **N1 of `reports/whole-review-fix.md`:** D-270's words reach „the browser view's code”, and its violating example names a library on React taken as a development dependency and imported by a screen, which the test passes. The review kept it Minor and it is not mine to fix, so for that route an agent compares, as the entry's *Verification* gives.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `python -B .the-way/elements/common/foundation_check.py`, after the writes and on commit c033758 | 0 | `0 errors` both times |
| Each new passage searched in the file downloaded from its address, with `curl` and `grep -F` after dropping markup | 0 | 12 of 12 found |
| `git status --short` after the commit | 0 | empty |

**Not run:** the product's gate and every test, as the handoff says; no test or product code changed. `foundation_check.py` does not compare a *Method* with its citing tests.

## Own-work check

- **Requirement most likely unmet:** an entry with a meaning its source does not carry, here D-270, the only one no task, spec or human wrote first.
- **Check:** each clause read against `tests/invariants/test_browser_view_framework.py:136-151`, `reports/fix-1.md`, `reports/fix-1-handoff.md` and `reports/whole-review-fix.md`; *Rejected* read against the two ways those reports keep.
- **Result:** the definition of the class is the code's. The clause „in the browser view's code” goes one route past the test (concern 3); the clause „a task … names it in this decision” is mine, and it follows the docstring's „refused until the guard is changed on purpose”.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `.the-way/elements/common/way_of_working.md`, `rules.md`, each element's `template.md`, its skill files, `.the-way/project-level/technology/reserved_choices.md`, `.the-way/product-guidelines/template.md:68-80` | `.the-way` | the skills' step 1; the citation of a rule |
| `reports/fix-1.md`, `reports/fix-1-handoff.md`, `reports/slice-1.md`, `reports/slice-5.md` | `.runs/` | what the fix chose; the failing runs of the invariant's test |
| `.the-way/foundations/glossary.md` | headings and `element` | the glossary rule of two glossaries |
| `plan_mvp2_loop2.md` *Projected entries*, `definicja_mvp2_loop2.md` entries D-03, D-06, D-97, `browser-view-framework` | the vault, read only | projected entries of task 2 |
| `logowanie_w_react_loop2.md` | the vault, read only | that the question D-269's *Origin* quotes stands there |
| react and Node.js sources at tags `v19.3.1` and `v24.17.0` | raw.githubusercontent.com, read 2026-11-02 | the facts |
| `C:\Storage\The Brain\The Brain\.ai\rules\git.md`, `scripts.md`, `knowledge_artifacts.md` | the user's rules | before the commit and the shell lines |

## Searches not found or unclear

- **Whether „element” in D-36 should change:** the rule of two glossaries would give it a qualifier, and the sentence is word for word as approved. Left, as above.
- **Whether `sentence`, the last word of the-way's „binding sentence”, needs a qualifier wherever the log writes „the sentence” of a message:** the log does so across hundreds of lines, before and after this change, and every use I read is a sentence shown to a player. Not touched.
- **`react-entry-format` against D-03's quoted UMD passage:** D-03 keeps its passage as the foundation step wrote it; the fact serves D-06, which held no source.
- **A source for „working set” in D-268's *Rationale*:** Node's documentation says Resident Set Size and the main memory device; the words „working set” for Windows come from the spec, and I did not find them in Node's documentation. The sentence of `node-process-rss` says only what the page says.
- **`Node.js 24.17.0`:** the sources stand at that tag because `node-assert-failure-inspect` and this machine do; D-01's *Based on* cites Node.js 24.21.0 for another matter. I did not settle which release the image runs.

## Choices, each with the way rejected and its cost if wrong

1. **D-269 as its own number,** with the sentence and the rejected way moved from D-265. Rejected: a clause in D-45, whose question is where the page stands, or in D-265, whose question is how a control stands in a screen. Cost: one entry to merge later.
2. **D-270 as a decision, the invariant's words left.** Rejected: rewording the invariant, which To do 13 commands word for word; leaving it to the request alone, since the handoff asks for the entry the rules give. Cost if wrong: see concern 1.
3. **`icon-credits` reworded,** see *Invariants*. Rejected: leaving it, or stretching the test, which the handoff forbids.
4. **Six facts rather than the one the handoff named.** Each is a reason its decision would fall or lose its teeth without. Rejected: `Based on: none` where a decision says so in its *Rationale*. Cost if wrong: six short entries that a later task withdraws with their dependant.

## Problems

None observed in the checks.
