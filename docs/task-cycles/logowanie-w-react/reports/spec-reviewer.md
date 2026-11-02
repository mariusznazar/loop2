PASS

# Report — reviewer of the spec, task `logowanie-w-react`

Spec reviewed: `.runs/task-cycles/logowanie-w-react/spec.md`, against the frozen `task.md`.
Worktree `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, HEAD 3d366c8, the-way at the pinned f45ca40. No tracked file changed: `git status --short` is empty.

No finding of the method's four kinds: no requirement dropped or changed, no invented behaviour that matters, no contradiction, no guess that would send the build wrong.

This PASS does not cover the memory danger below. The coordinator's safety rule says the orchestrator brings it into the spec, so I treated it as known and did not design a remedy. The spec's bullet on comparing elements still reads „did not end within 60 s”.

## Checks

| Claim the spec rests on | How checked | Result |
|---|---|---|
| Decision 1: `window.Option` is missing on happy-dom, the reason jsdom wins | Run on happy-dom 21.0.4 | `typeof window.Option` is `undefined`; `new HTMLOptionElement()` throws TypeError |
| Decision 1: D-33, no new advisory | D-33's command, pinned npm, base lockfile against the trial's lockfile (583 entries, jsdom and happy-dom both in it) | 48 advisories each, 0 introduced; `metadata.dependencies` 508 against 582, so each audit read its own lockfile |
| Decision 2: the two forms draw one tree | New check, `spec-trials/react-card/review/parity-client.mjs`, on a client root rather than static markup, which the designer did not compare. It adds an unselected button, a disabled field and a password field | Buttons same; fields differ only in the input's `value` attribute. Output in `review/parity-client.out.txt` |
| Decision 4: bundle size, markers, specifiers | Read `dist/public` of the trial; ran the guard's patterns | One `main.js` of 357,727 bytes beside `index.html`, `styles.css`, `tokens.css`; of the markers only `__REACT_DEVTOOLS_GLOBAL_HOOK__`, 8 times; no import specifier; no `process.env` |
| Decision 4: the build where the gate runs it | Spike copied to a temporary directory with `node_modules` linked by a Windows junction, as `TreeCopy` does. The designer's report shows no such run, and esbuild goes through the junction there | `npm run build`'s script exits 0, same 357,727 bytes |
| Decision 4: lockfile for Linux | Read the trial's lockfile | 26 `@esbuild/` entries, `node_modules/@esbuild/linux-x64` among them |
| Decision 4: 282 lines in 78 files, 54 Node and 24 Python | `git grep` | Exact. Every other `dist/public` literal in `tests/` is accounted for: `:26` and `:30` of `http.test.mjs`, the three constants that change, the three that stay, `GAME_PAGE`, the kitchen-sink line, and test names or docstrings |
| Decision 4: `stryker.config.json` unchanged | Ran Stryker on the spike, `--mutate src/browser/sim/hex.ts:1-12` | Sandbox build emits `dist/browser/view/account-card.js`, no `error TS`. The run then stopped at the dry run, because the trial's `tests/sim` still import `dist/public` (35 files). That is the trial's state, not a defect. Mutants were not run |
| Decision 5: ESLint reads `.tsx` with no change of configuration | Reran on the spike's two `.tsx` files with `--max-warnings 0` | Exit 0 |
| Decision 6: kitchen-sink page without a script change | `cmp` against the base; `--build-only` through the junction | Byte-equal; exit 0, 21 modules. Chromium not reopened |
| Decision 3: the design against `src/browser/view/app.ts` | Read every path | Six `main.replaceChildren` places as stated. `sentence` and the pending notice cannot both stand: a non-null `sentence` comes only from `expire` and logout, both after `showGame` took the notice |
| Constraints: moved lines and counts | Read | `app.ts:268`, `:445`, `:134`, `README.md:25`, `SKILL.md:225` in both skill copies, 69 cases |
| Other tests reaching React | Grep | Only `account-screen.test.mjs` imports `app.js`; no other test or Python driver reaches a `.tsx` module |

## Left unrun under the coordinator's safety rule

I ran no jsdom or happy-dom trial in which `assert.equal` or `assert.deepEqual` on an element can fail, and none was running from this session. Read, not run:

- `tests/view/account-screen.trial.mjs`: the 69 cases on both imitations, so decision 1's 68 passes and its times are the designer's numbers.
- `tests/view/card.trial.mjs`, plain, mutated or with `TRIAL_FIXUP`: the 6 spike cases, „no warning about `flushSync`”, „disposing inside React's click gives no warning”, and the focus mutation behind the harness rule on disabled controls.
- The failing-comparison trial behind the „60 s” bullet.

`trial-order.mjs` and `trial-order2.mjs` (the import order) were not run either. I did not rule on them; I read only the head of `trial-order.mjs`.

My own `parity-client.mjs` holds no assertion. It compares two JSON strings, and it uses jsdom only for that.

## Also not run

The full gate; the `Dockerfile`; `npm ci` on Linux; Stryker's mutants; `scripts/audit_dependencies.py` itself (its command was run by hand); the real browser. The spec's *Left to the maker* names what the change must run.

## Notes that change no verdict

1. **A fourth guard picks by extension.** `tests/sim/rules.test.mjs:16` has `CODE = /\.(ts|mts|cts|js|mjs|cjs)$/`, and its check S2 scans `src/browser/view/`, so it will not read `.tsx`. Neither To do 14 nor the spec's table names it, though the spec's Goals sentence covers every such guard. No protection is lost: `tests/invariants/test_content_identifiers.py:46` already reads `.tsx` for the same identifiers and names. Adding `tsx` is not a one-word change, because `splitSource` takes `</` for the start of a regular expression. The request should say this guard stays as it is, so the Goals sentence is not read as complete.
2. **„The test file imports it first” is not enough on its own.** Measured with three small modules: a module imported after one that has top-level `await` runs before that `await` ends. The trial's harness has such an `await` before it installs `window`, and it gets away with it because its test imports React dynamically. A harness with a static jsdom import is safe. A static import of `react-dom` inside the harness itself would run before `window` too. This costs diagnosis and not a wrong product, since cases that type into a field fail.
3. **Decision 4, stryker row:** „The sandbox holds `node_modules`, so `.tsx` compiles there” has the wrong reason. Stryker's log shows the build running before the link to `node_modules` is made; `react` resolves from the parent directory. The result holds, because `.stryker-tmp` stands inside the repository.
4. **Decision 1:** „a path 44 of the 69 cases walk” is 43 by the report's own numbers (25 pass, then 68), since one case fails either way. The choice does not turn on it.

## Reaches beyond the dispatch

- `tests/invariants/test_browser_view_framework.py`, `test_application_build_output.py`, `test_application_build_kitchen_sink.py`, `test_icon_credits.py`, `test_application_package_layout.py`, `test_content_identifiers.py` (head), `test_browser_view_token_values.py` (head), `loop2_invariant_support.py`, `tests/sim/rules.test.mjs`, `tests/http.test.mjs` (head), `tests/view/account-screen.test.mjs` and `icons.test.mjs` (passages): to check the table of decision 4 and the guards.
- `scripts/build.mjs`, `kitchen-sink.mjs`, `test.py`, the three `tsconfig` files, `stryker.config.json`, `eslint.config.mjs`, `Dockerfile`, `package.json`: what the layout touches. `tsconfig.server.json` matters here: its `types: ["node"]` keeps `@types/react`'s empty `HTMLElement` out of the server's compilation, so that crossed-probe test keeps its meaning.
- `src/browser/view/app.ts`, `account-screen.ts`, `password-reset.ts`, `footer.ts`, `email-confirmation.ts`, `controls/button.ts`, `controls/text-field.ts`, `src/browser/main.ts`, `index.html`, `styles.css` and `kitchen-sink.ts` (passages): the code the choices depend on.
- `guidelines/coding-content-data.md`: the spec names it for the new data file.
- D-34, D-85 and D-46: stood in the ranges read. `foundations/invariants.md`: `public-file-access` and `focused-test-execution` likewise.
- `.the-way/task-cycle/spec/review.md`: named by the method.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and `search.md`: the user's rules before a script and a counted claim.
- The trial's `card-harness.mjs`, `trial-harness.mjs`, `card.trial.mjs`, `trial-parity.mjs`, `trial-probe.mjs`, `trial-audit.mjs`, the spike's `react-controls.tsx` and `build.mjs`.

## Left behind

Under `spec-trials/react-card/review/`: `parity-client.mjs`, `parity-client.out.txt`, `stryker.log`, `tla/`. Stryker's `.stryker-tmp` is removed, its link first, and the trial's `node_modules` is intact. Stryker may also have written under the trial's `.runs/`. The scratchpad holds the temporary copy, without its junction, and the audit reports.

**Searches not found or unclear:**

- `foundations/` holds no wording on where a test imitation's rules stand; the spec's new decision settles it.
- `guidelines/testing.md:174`–`:177`, cited by To do 18, stands at `:175`–`:178` on the base; the same sentence, one line moved.
- `guidelines/styleguide-browser-view.md` lists the deviations of `src/browser/view/controls/button.ts` by path, and says a new shared control goes on the kitchen-sink page in the same change. The spec reads a React form as the same control, so nothing goes on the page, and neither the task nor the spec changes that text. I read this as consistent; the foundation step may judge whether the styleguide should name the second form.
- Whether the words „above the account forms” need a change: the designer's question stands, and I read them as true with S3 saying where.
- Who wrote `dropFocusOfDisabled` in the trial's harness stays unknown, as the designer reports. Its effect is the one in the trial I may not run.
