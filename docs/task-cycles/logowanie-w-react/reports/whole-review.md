FAIL 4634e6b4085e8410a96a70dfaabe3e8feb937817

# Review of the whole change — task `logowanie-w-react`

Range `3d366c8..4634e6b`, 22 commits, target `main` at 3d366c8 (`origin/main` still there). `git rev-parse HEAD` in the worktree is the head given. No tracked file of the reviewed worktree changed; `git status --short` is empty after the review. Runs that needed files changed took place in a separate worktree of 4634e6b, removed afterwards.

**Verdict in one line.** The card, the build, the harness, the memory limit, the foundation entries and the guidelines do what the task asks. Two guards the task names by item (To do 13 and To do 14) let through what they are required to stop, and each is a small fix.

Counts: 2 blocking (Important), 0 Critical, 12 Minor, 3 out of scope.

## Findings

### Important (blocking)

**I1. The framework guard no longer fails on another library that comes in under React or on top of it (To do 13).**

- **Place:** `tests/invariants/test_browser_view_framework.py:40-48` (`UI_FRAMEWORKS`), `:181-190` (`test_no_ui_framework_in_runtime_dependencies`), `:192-201` (`test_browser_source_imports_no_ui_framework`).
- **Slice:** Slice 2, commit 35371e0. Slice 7 did not touch this reach. This is Minor 1 of `reports/slice-2-review.md`, graded higher here.
- **What is wrong:** To do 13 says the test „dalej oblewa, gdy taka biblioteka wejdzie do kodu albo zależności uruchomieniowych”. Taking `react` and `react-dom` off the list dropped more than React. On the base every library built on React failed through its `react` dependency, and the name `react` itself was refused whatever it resolved to. At the head:
  - the guard reads only the names of the keys, so `"react": "npm:preact@10.0.0"`, with a lock entry `node_modules/react` of `"name": "preact"`, passes. That is Preact, on the guard's own list and among the options D-03 *Rejected* names, and aliasing is the usual way a React project takes Preact in;
  - a component library on React passes: `@mui/material` in `dependencies`, in a non-dev lock entry and imported by `src/browser/zz-temp.tsx`. The list's comment still says „UI frameworks and component libraries other than React” and holds no component library. The docstring's general „a UI framework absent from the list” was true on the base too, but there this class failed anyway.
- **Why it matters:** the next tasks move the program editor and the other screens to React, so a React library is now the likely way in, and the invariant `browser-view-framework` reads Method `test`. The change opened the hole by removing the name, with nothing in its place.
- **Evidence:** in the separate worktree, `python -B -m unittest test_browser_view_framework.NoUiFramework.test_no_ui_framework_in_runtime_dependencies test_browser_view_framework.NoUiFramework.test_browser_source_imports_no_ui_framework` from `tests/invariants`: exit 0 for each of the two crafted trees (`guard-mui`, `guard-alias`; manifest and lockfile restored after each). On the base `declared & set(UI_FRAMEWORKS)` holds `react` for both.
- **What would close it:** read what a runtime entry really is (the alias's value in `package.json`, `name` of a lock entry), and either name the React component libraries the guard refuses or say in the docstring and the comment that they are outside it, as a decision for the human. A component library is a choice `reserved_choices.md` keeps on a guidelines skill's route, so the second half may be wording, not code. The alias half is code.

**I2. The token guard still skips the rest of a line after a self-closing JSX tag (To do 14).**

- **Place:** `tests/invariants/test_browser_view_token_values.py:304` (`REGEX_AFTER`), `:351-354` (`literal_texts`).
- **Slice:** Slice 8, commit 8d65336, which closed the gap of Q16 for `</` only. The reader reached `.tsx` in Slice 7, commit 50461c1.
- **What is wrong:** `}` stands in `REGEX_AFTER`, so the `/` of `/>` after an attribute in braces starts a „regex” that swallows the rest of the line, the same fault Q16 closed after `</`. `<X y={1} />` is the commonest form of JSX and Prettier keeps short ternaries and arrays on one line. Also, `//` in JSX text, such as an address, reads as a comment to the end of the line.
- **Why it matters:** To do 14 requires the guard to read `.tsx`, and Q16 settled that a known hole in the guard every later screen rests on is not left. A hard-coded colour on such a line passes the invariant `browser-view-token-values`, whose Method is `test`. The controls `a.tsx` hold no case of it.
- **Evidence:** `typescript_findings` called directly on crafted text, in the reviewed tree's test module, nothing changed:
  - `{a ? <X y={1} /> : <X style={{ color: "red" }} />}` gives `[]`;
  - `const b = [<X y={1} />, <X style={{ color: "#fff" }} />];` gives `[]`;
  - `const a = <input value={x} />; const c = "#fff";` gives `[]`;
  - `const a = <p>https://x</p>; const c = "#fff";` gives `[]`;
  - with a string attribute before the `/>`, `{a ? <X y="1" /> : <X style={{ color: "red" }} />}` is flagged, so it is the `}` that does it.

### Minor

**M1. The harness guard does not see the form the harness itself uses.** `tests/view/memory-limit.test.mjs:49-53`. `importedModules` reads `from`, `import` and `require`; `createRequire(import.meta.url)("jsdom")` or `load("jsdom")`, the form at `tests/view/page-document.mjs:14-15`, passes. Evidence: a temporary `tests/view/zz-temp.mjs` holding that text, never executed, with `node --test --test-name-pattern "the tree holds no file" tests/view/memory-limit.test.mjs`: exit 0. The invariant `document-test-memory-limit` says only the harness loads an imitation, and the tree keeps it; the thread and the guidelines rule stand behind it. The known gaps name a computed name, `t.assert` and a helper's assert, not this one. A file going this way runs with no limit, which is what the cycle fears, so the fix is worth its one pattern, but it takes a deliberate copy of the harness's lines. Slice 1.

**M2. The invariant test of `icon-credits` says no card draws the section.** `tests/invariants/test_icon_credits.py:18`: „the check does not yet see a card that draws it, as no card does so yet”, and `:51`. False since Slice 11. Slice 9's report said a later slice should add the scan, and none did. The behaviour is protected: removing `<CreditsSection />` fails 2 cases of `tests/view/account-screen.test.mjs`, but neither carries `invariant: icon-credits`, so the entry's own check does not reach the words „the login card's section”.

**M3. One clearing of a message has no test.** `src/browser/view/account-card.tsx:288`. Removing `setWarning(null)` from `LoginForm.send` fails no case of 100 (compile 0, exit 0). The old refusal would stand through the next send's wait, which To do 5 leaves as it was. The same line of the other three forms is protected (register and reset by their cases, the request by its note and warning).

**M4. A click on „Autorzy grafiki” moves it from under the pointer, by 96 px.** `src/browser/styles.css:254-260`. Confirmed: y 503.25 becomes 407.27 at 1280×720, and a second click at the first place leaves the section open. To do 7 asks for one click to open it, and that holds. The cost is one mouse move to fold it again; the keyboard is unaffected. It follows from To do 8, and fixing it gives up the exact middle, so the human should see it at H1 rather than a cycle guess. `reports/slice-12.md`, *Problems*. Slice 12.

**M5. Comments still speak of the account screen.** `src/browser/kitchen-sink/kitchen-sink.css:108` and `src/browser/kitchen-sink/kitchen-sink.ts:244`, „of the account screen”. The module is gone. The handoff named the first; the second is its twin. Slice 11, whose deletion made them stale.

**M6. Four rules of a file of a kind read `Invariant: none`.** `guidelines/coding-browser-module.md:98`, `:111`, `:126`, `:145`. `.the-way/product-guidelines/coding/template.md:110-112` and `:230-231` give a file of a kind rules a script checks, each with an invariant. Hooks and Effects are mandated by D-267 and the plan, so this is a departure the task itself asks for, named here as such; no code suffers. `tests/view/react-controls.test.mjs` is a cheap test of the two-forms rule, so that one could carry an invariant. Slice 14.

**M7. The rule „Strona wszystkich stanów bez Reacta” has no decision that carries it.** `guidelines/coding-browser-module.md:145-156` cites D-45 · D-265, and neither states the ban; spec decision 6 does. `product-guidelines/template.md:4-7` says guidelines hold no rule of their own. Slice 14 already sends it to the human as its question 2, which is the right route; recording the ban through `the-way-record-decision` at the return step would answer it. Its other question, DOM modules standing as `copy` while D-03 says screens are `.tsx`, I read the same way: `copy` invites a new DOM screen, and only the human can settle the status (WAY-172).

**M8. `tests/view/page-document.test.mjs` starts processes and is no integration test by the guidelines.** `guidelines/testing.md:344` lists `tests/view/memory-limit.test.mjs` for that reason and not this file, whose kill case and report case start a child, and the recipe `unit test` at `:331` says no processes. Slice 15.

**M9. The styleguide's list of deviations names `button.ts` alone.** `guidelines/styleguide-browser-view.md:198`. A reader of `react-button.tsx` is not led to the states that do not apply. `reports/foundation.md` named it for the request; no slice took it. No effect on a player.

**M10. A stale count in a report.** `reports/slice-2.md:21` says `jsdom` brings 29 dev packages; the lockfile and the list beside it hold 32. Minor 2 of the slice's review, kept. Nothing in the product.

**M11. `code_only` reads an apostrophe in JSX text as the start of a string.** `tests/invariants/test_browser_view_framework.py:115`. From the slice review's out-of-scope list; I place it within To do 13's file. Its only use is finding one `document.` call in the source, so an unread rest of a file changes no result today.

**M12. The heading „TypeScript i DOM” stays over a rule of React.** `guidelines/coding-browser-module.md:49`. Slice 14 kept it on purpose, since something might match it. A search of the tree and of the pinned `.the-way` found nothing that does; the heading misleads a reader mildly.

### Out of scope

Each lies beyond the task, whatever its grade.

- **O1.** npm 12 blocks dependency install scripts unless `allowScripts` names them; the image's npm 11.19.1 only warns and runs them. Only esbuild has an install script among the 66 new packages (read from the lockfile). Minor; a later move of the image's npm meets it.
- **O2.** `engines.node` `24.x` admits versions below jsdom's `^24.15.0`. Minor; dev only.
- **O3.** The 48 advisories at the fork point, which D-33 does not block. No new one (audit below).

## Declined to judge

- Password-manager and browser autofill on controlled fields: no requirement, and it takes a real manager to see; left to H1.
- React writing a password into the `value` attribute while typed: the spec names the attribute, the page holds the same text in the field's value, and it goes at `dispose()`.
- The image holding `dist/browser` (`Dockerfile:24` copies all of `dist`): size only, nothing serves it, and `Dockerfile` is left unchanged by the spec.
- `README.md:62` naming only the footer for the credits: still true, and To do 11 is about the build.
- Spec decision numbers in comments, which point at `.runs/`, gone after the cycle: the base does the same.
- The weight of the card's bundle, 360,903 bytes, 112,930 by gzip, with a server that does not compress: accepted by the spec.

## Weighed at the dispatch's or an author's request, no finding

- **Slice 10, outside its *Change*, commit 4f51d7f:** `disabled`, `inputMode` and `spellCheck` are what decision 8 needs; each has a case in `tests/view/react-controls.test.mjs`, as D-265 requires. Sound.
- **Slice 8, sent back:** I judged the code by itself; the test compares tag, attributes, text and children for every kind and state the card uses, the selected and locked button included.
- **The kill case at 2 GiB on every gate** (`tests/view/page-document.test.mjs:99`, Slice 5 asked for it to be weighed): a moment a little above 2 GiB, about 4 s, inside the sum of decision 9, and it is the one test of the default limit. Keep it.
- **Spec decision 11 and its corrections:** the rule stands in `guidelines/testing.md:290-299` and D-268; the proof clears `NODE_TEST_CONTEXT` and asserts the sentence on both routes (`tests/view/memory-limit.test.mjs:26-28`, `:104-117`). The two named files are gone. Other trial files that load jsdom stand under `spec-trials/react-card/`, such as `trial-focus.mjs` and `trial-peak.mjs`, ignored by git and leaving with the cycle; I neither ran them nor read whether they take the limit. Sound. The rule stands on memory, as D-268 says.
- **Q13, Q17:** the minified import has its control, and `loop2-play` is the same in both copies. Sound.
- **Selected and locked switch:** `.button.selected` and `.button:disabled` have one specificity and the second stands later, so its text is in `text-disabled`, as D-44 asks.

## Trust boundary

- **`package-lock.json`:** 66 entries added, none changed, none removed. Each new entry resolves from `https://registry.npmjs.org/` with a `sha512-` integrity. New packages outside development: `react`, `react-dom` and `scheduler` alone. Install scripts: `esbuild` alone. 26 esbuild platform packages, `@esbuild/linux-x64` and `@esbuild/win32-x64` among them. `happy-dom` absent.
- **Crafted input at that boundary as it stands:** I1 is the one way through I found, and it is the guard, not the lockfile.
- **`scripts/kitchen-sink.mjs`:** unchanged (`git diff --stat` empty, as for `tsconfig.kitchen-sink.json`, `Dockerfile`, `.dockerignore`, `stryker.config.json`, `eslint.config.mjs`, `src/server/`, `src/browser/index.html`). It serves `dist/kitchen-sink/` by `express.static`, on 127.0.0.1, at a port the system picks, so D-76 holds. The built page holds no import of React.
- **Bundle:** one script, no bare import, no `process.env`, no kitchen-sink code, 5 React licence comments, no source map.

## Coverage of the task

### To do

| Item | Met | Where |
|---|---|---|
| 1 | yes | `src/browser/view/account-card.tsx:579-624`; `src/browser/sim/data/about.ts`; seen in a browser |
| 2 | yes | the four forms; a signed-in player's reset link walked by me: no request, no game, „Anuluj” then `GET /api/account` and `GET /api/saved-game` |
| 3 | yes | `:565`, `:576`, headings by state |
| 4 | yes | `:569-573`; an unmounted form takes everything typed with it |
| 5 | yes, one gap of a test | requests compared line by line with the old code: same calls, sentences and checks; M3 |
| 6 | yes | `sentence` prop of the card; `app.ts:304-316` |
| 7 | yes | `src/browser/view/credits-section.tsx`, from `footerCredits()`; M4 |
| 8 | yes | `app.ts:186-214`, `styles.css:254-260`; measured 440 either side at 1280×720 |
| 9 | yes | `.tsx` components; other screens stay in DOM |
| 10 | yes | `scripts/build.mjs`, `tsconfig.browser.json`; image tests ran |
| 11 | yes | `README.md:3`, `:25` |
| 12 | yes | built with `--build-only`, no React in its modules; samples unchanged |
| 13 | **no** | I1 |
| 14 | **partly** | the three guards read `.tsx`, each with a control; I2 |
| 15 | yes | 69 cases accounted for by name in `reports/slice-11.md`; `guidelines/testing.md` rows, recipe and exclusion |
| 16 | yes | `guidelines/coding-browser-module.md`; M6, M7, M12 |
| 17 | yes | both copies, identical by `diff -r` |
| 18 | yes | D-76, `guidelines/testing.md:175-180`, no test, invariant at review |

### Acceptance criteria

| Criterion | State |
|---|---|
| Agent walks the card locally | done in `reports/slice-12.md`; I walked the parts it left out: a reset link for a signed-in player, logout, 360×640 with field errors |
| Person walks it on the test server | H1, not done yet, the human's |
| Mail locally | stays with H1 |
| `#reset-password=` locally | walked by Slice 12 and by me |

### Settlements to record

| Row | Written as | Met by code |
|---|---|---|
| S1 | D-259 | yes |
| S2 | D-260 | yes |
| S3 | D-261 | yes |
| S4 | D-262 | yes |
| S5 | D-76 | yes, `scripts/kitchen-sink.mjs` unchanged |
| S6 | D-263 | yes |

### Projected entries

| Entry | State |
|---|---|
| D-03, D-06 | written whole, binding sentences word for word |
| D-36 | written whole, with the path in place of „named by the task that builds it”, as the spec gives; *Rationale* changed (FC2) |
| browser-view-framework | written word for word; its test falls short, I1 |
| D-96 | written in part, without the picture; D-213's clause and „headquarters” stay, as the spec gives |
| D-27, icon-credits | written in part, footer kept; M2 |
| browser-view (part map) | no file `src/browser/*.tsx`, so no change, as question 10 gives |
| Spec's entries | D-88, D-264, D-265, D-266, D-267, D-268, `application-build-output`, `document-test-memory-limit`, `node-assert-failure-inspect` all stand and say what the code does |

## Slices without a review of their own

Each is judged with its own-work check. Blocking findings come from Slices 2 and 8 only.

| Slice | Judgment | Its own-work check |
|---|---|---|
| Foundation entries | sound; M7 | fits, and its concern on D-267's fourth clause is honest |
| 1 | sound; M1 | strong: found a real Linux fault |
| 3 | sound | strong: browser and image |
| 4 | sound | thin, but the move is verbatim; the later slices walked it |
| 5 | sound | strong; 17 mutations |
| 6 | sound | strong: 17 breaks against both versions of the file |
| 7 | sound; its concern became Q16 | fits; missed the `/>` of I2 |
| 8 | I2 | fits for the controls; did not ask what else `/` can begin |
| 9 | sound; M2 | fits |
| 10 | sound; M3 | strong: a real browser and 16 mutations |
| 11 | sound; M5 | strong: 15 mutations, a real browser |
| 12 | sound; M4 | fits; measured three windows |
| 13 | sound | fits |
| 14 | sound; M6, M7, M12 | fits |
| 15 | sound; M8 | thin: one grep; the file reads true |

## Checks

### Ran, in a separate worktree of 4634e6b

| Command | Exit | Result |
|---|---|---|
| `npm ci` | 0 | 30 s |
| `npm test -- tests/view/memory-limit.test.mjs` | 0 | 37 pass |
| `npm test -- tests/view/page-document.test.mjs` | 0 | 55 pass |
| `npm test -- tests/view/react-controls.test.mjs` | 0 | 24 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 100 pass, no line of the memory limit |
| `npm test -- tests/view/password-reset.test.mjs` | 0 | |
| `npm test -- tests/view/icons.test.mjs` | 0 | |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | changed invariant test, see I1 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | changed invariant test, see I2 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | |
| `npm test -- tests/invariants/test_application_package_layout.py` | 0 | changed invariant test |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | changed invariant test, see M2 |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | |
| `npm test -- tests/invariants/test_application_build_output.py` | 0 | changed invariant test |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 | changed invariant test |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 1, then 0 | first run: 2 errors, `FileNotFoundError`, since the separate worktree had no `.runs/quality-venv`, so Ruff and ShellCheck could not start. With a link to the worktree's environment: 5 tests OK. ESLint and Prettier passed on both runs. A fault of my setup, not of the change |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | |
| `npm test -- tests/deploy/test_loop2_image_icons.py` | 0 | image built, Docker answering |
| `npm test -- tests/invariants/test_loop2_container_icons.py` | 0 | |
| `python -B scripts/audit_dependencies.py` | 0 | no advisory beyond the fork point |
| `npm run typecheck` | 0 | |
| `npm run kitchen-sink -- --build-only` | 0 | no module of it reaches React |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/about.ts"` | 0 | **0 mutants**: Stryker instruments none in that `as const` file, and the dry run of 33 test files passed. So nothing to classify, and this run says nothing of the file's protection; the sentence is protected by a mutation below |
| 2 crafted trees, unittest of two cases of the framework guard | 0 each | I1: the guard let them through |
| `node --test --test-name-pattern "the tree holds no file" tests/view/memory-limit.test.mjs`, with a crafted file | 0 | M1: the guard let it through |

### Ran in the reviewed worktree, reading only

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `git diff --stat 3d366c8..4634e6b` over the files that must not change | 0 | empty |
| `typescript_findings` on crafted text | 0 | I2 |

### Mutations of the product, one at a time, compiled by `tsconfig.browser.json`, run by `node --test tests/view/account-screen.test.mjs`, each restored

19 ran, on top of the authors' 16 and 15. Each failing run named its cases, so none was a killed file.

| Mutation | Failing cases |
|---|---|
| the sentence changed in `about.ts` | 1 |
| login: warning not cleared at a send | **0, M3** |
| request: note not cleared | 2 |
| reset: warning not cleared | 2 |
| page's sentence always `status` | 3 |
| login field `new-password` | 1 |
| switch standing in „Nie pamiętam hasła” | 2 |
| register switch not locked | 3 |
| „Nie pamiętam hasła” not locked | 3 |
| credits gone from the card | 2 |
| `noValidate` removed | 1 |
| whole answer passed on | 1 |
| `focus()` does nothing | 3 |
| late answer acted on | 1 |
| request keeps the address | 2 |
| request: focus not returned | 4 |
| page's sentence not drawn | 11 |
| expired sentence in `positive` | 2 |
| no waiting text | 11 |

### Manual, in a real browser

`npm run local` in the separate worktree, Chromium through `playwright-cli` 0.1.22, by `.claude/skills/loop2-play/SKILL.md`; a made-up address at `example.test`; ended by `playwright-cli close` and `npm run local:stop`; nothing of it stays.

| Walked | What it showed |
|---|---|
| Card at 1280×720, screenshot inspected | x 440, width 400, top 174.94, height 370.11: in the middle, on `panel`, with nothing beside it |
| Credits, screenshot inspected | open with one click, five rows, the summary moved, M4 |
| Switch | focus in the address field |
| Sign-up | into the game, no card |
| Signed-in player, `#reset-password=` and a reload | heading „Ustaw nowe hasło”, no request, header hidden, no game; Slice 12 left this unwalked |
| „Anuluj” | fragment gone, session and save asked for, the game |
| Logout | card, focus in the address field |
| 360×640, empty „Załóż konto” sent, screenshot inspected | messages in `warning` under the fields, focus outline on the first, no sideways scrolling, width 328 |
| Page errors | none |

### Did not run

- `npm test` without arguments and the whole gate: the dispatch forbids it. So the other Node and Python tests, the 2-GiB kill alongside a full Node stage, and the five other Docker tests stayed unchecked here.
- H1, with mail: the human's.
- The passages of the five new environment facts and of D-03's *Based on* against their addresses: taken from `reports/foundation.md`, not read again.
- D-03 to D-96's *Rationale* and *Rejected* against `definicja_mvp2_loop2.md`: the task quotes binding sentences only, and those I compared; the vault was not opened.
- Linux behaviour of a real failing comparison: not run, by the safety rule. Slice 1's 12 Linux runs of the proof were not repeated.
- A failing comparison on a rendered element by Node's `assert`: never run, as the safety rule says. Nothing here loaded jsdom outside `tests/`.

## Reaches beyond the dispatch

The review of the whole change selects its own reading. By „Reading the foundation”, 166 of the 268 decisions name `browser-view` in *Scope*. I listed those headings and read whole the entries this change writes or changes, those the task's *Decisions in play* quotes, D-83, D-84, D-152, and the invariants the diff changes or adds; the entries on the game's screens that the change does not reach I judged from their headings. That is narrower than the method's letter, which asks for each. Named so it can be weighed.

| What | Where | Why |
|---|---|---|
| Whole guidelines | `guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md`, `testing.md`, `styleguide-browser-view.md`; `src/browser/AGENTS.md` | the parts touched |
| Templates | `.the-way/product-guidelines/template.md`, `coding/template.md`; `testing/template.md:1-110` | section 2, changed guidelines |
| `.the-way/project-level/technology/reserved_choices.md` | whole | the reserved-choice check: none taken; jsdom is a test tool |
| `.the-way/task-cycle/change/ui_check.md` | whole | the screenshot evidence, deleted by its author, so I took my own |
| All executors' reports | `reports/foundation.md`, `slice-1.md` to `slice-15.md` | own-work checks |
| The user's rule on scripts | `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` | before the scripts of this review |
| The base's guard | `git show 3d366c8:tests/invariants/test_browser_view_framework.py` | what To do 13's „dalej” compares with |

## Searches not found or unclear

- **Stryker on `about.ts`:** 0 mutants, with no line saying why. The file ends `as const`; I did not confirm that this is the reason. `guidelines/testing.md` does not say what a reviewer does with a run of no mutants.
- **What „Reading the foundation” asks in a product where most decisions name the part:** step 2 says read each found entry whole and also „the whole log is not read”; with 166 of 268 both cannot quite hold. See above.
- **To do 13's „taka biblioteka”:** whether a component library on React counts is not settled by the task, and `reserved_choices.md` puts one on a guidelines skill's route. The alias is clear either way, and that alone makes I1 blocking.
- **Which test first runs the card's bundle in the gate:** none does; only a person or an agent sees the bundle run (D-75, D-88). Expected, named so it is not taken for coverage.
- **`Files of this kind`, status of a module awaiting its move to React:** the template's three statuses do not name that case (M7).
