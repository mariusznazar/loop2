# Report — Slice 12, task `logowanie-w-react`

**Status:** done

## Files and commits

On `task/logowanie-w-react`, base 98bb2a8:

- `8f242a2` style: :lipstick: stand the login card alone in the middle of the window, on the panel, and drop the rules of the two forms side by side

| File | Added | Removed |
|---|---|---|
| `src/browser/styles.css` | 67 | 23 |

`src/browser/view/account-card.tsx`, `src/browser/view/app.ts` and `tests/view/account-screen.test.mjs` stand in the slice's *Change* for a fault the walk might find. It found none, so they did not change.

## What I read

Whole, one per call: the handoff, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `src/browser/tokens.css`, `src/browser/styles.css`, `src/browser/view/account-card.tsx`, `src/browser/view/app.ts`, `reports/slice-11.md`.

`tests/view/account-screen.test.mjs`: the first read stopped at line 1362 of 4378, so I read the rest in three more ranges up to its end.

Each range of the handoff's *Current ranges*: D-42, D-43, D-45, D-47, D-75, D-254, D-257, D-258, `browser-view-token-values`, `browser-view-focus-outline`, D-88, D-261, D-262, and `kitchen-sink.ts:226-345`. No other read was cut short.

## Checks

Commands run from the worktree's root, on the tree of `8f242a2`: nothing changed after them.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | 3 tests OK |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 100 tests, 100 pass, 0 fail, 0 skipped |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |
| `npm run local` as a background command, with `playwright-cli` 0.1.22 | ready line read | https://127.0.0.1:53315; the walk below |
| `npm run build`, during the walk, for the rule added after its first part | 0 | the running game served it: the gap between credit rows showed in a later screenshot |
| `playwright-cli close`; `npm run local:stop` | not recorded | „Local starts stopped: 1”; ports 53314 and 53315 closed afterwards |
| `npm run kitchen-sink` as a background command, its address opened with `playwright-cli` | ready line read | http://127.0.0.1:56965/; stopped by ending the process that held the port, port closed afterwards |

**Not run:** `npm test` without arguments and `python -B .the-way/elements/common/foundation_check.py`: the handoff keeps the product gate for the orchestrator.

**No test written first and no invariant's test changed.** The change is a look: `guidelines/testing.md`, „Not tested on purpose”, D-87, leaves it to being seen in a browser, and the return condition did not fire. A wrong width or a lost centring passes every automatic check here; only the walk below and the person's check see it.

**Safety rule.** No file outside `tests/` loaded jsdom or happy-dom. The walk's scripts held no comparison at all: each only recorded plain text for me to read, and none used an `assert`. The one run on jsdom went through the harness; its log holds no line of the memory limit.

### Runs of the walk's scripts

Each is `playwright-cli --raw run-code --filename .playwright-cli/<script>`. None of the failures below was a fault of the product.

| Script | Exit | What happened |
|---|---|---|
| walk1, first | 1 | `SyntaxError`: my trailing `;`, nothing ran |
| walk1, second | 0 | complete |
| walk2, first, address `agent-12` | 1 | `route.continue: Route is already handled!` from my helper that holds an answer; it stopped after the expired session |
| walk2, second, address `agent-13` | 1 | the same four lines printed, and the whole log returned to its last line. A guessed cause of the exit code: those lines, from the helper |
| walk3 | 0 | complete |
| walk4, first | 1 | a strict-mode error on my locator: two sections carry `.form-samples` |
| walk4, second | 0 | complete |

## The walk

Chromium through Playwright CLI, 1280×720 unless named. Addresses made up at `example.test`.

**Where the card stands** (`getBoundingClientRect`, at 1280×720 on „Zaloguj się”): width 400, gaps left 440 and right 440, top 174.94 and bottom 174.95. Background `rgb(24, 24, 27)`, which is `panel`; text `rgb(212, 212, 216)`, which is `text`. The body's other children are `display: none`. At 360×640 it is 328 wide with 16 at each side, no sideways scrolling. At 1280×320 the page grows to 418 high with the card's top at 24, nothing cut off. Measured with messages under the fields (148.75 and 148.77) and with the credits open (86.95 and 86.97), top and bottom stay even. With the page's sentence I saw it in a screenshot and did not measure it.

| Walked | What was seen |
|---|---|
| The four states | All four seen with their fields and buttons; „Zaloguj się” with no heading and the selected switch, „Załóż konto” with three fields, „Nie pamiętam hasła” and „Ustaw nowe hasło” with a heading and no switch |
| The switch | Empties the fields, focus in „Adres e-mail”, the selected button moves; the page's sentence stays |
| Enter | Sent the form in login, registration, request and reset, by a real key press |
| A click on a label | „Hasło”, „Adres e-mail” and „Nowe hasło” each move focus to their field |
| The lock while waiting | With the answer held back: every field and button locked, „Logowanie…”, „Zakładanie konta…” and „Ustawianie…” shown, the credits still open with a click. After a refusal: fields kept, unlocked, focus back in „Hasło” |
| Field and form messages | Under their fields in `warning`; the refusal under the form in `warning`; the request's sentence in `text-secondary`; „Konto z tym adresem już istnieje.” with focus back on the button |
| Keyboard | Tab: „Zaloguj się”, „Załóż konto”, „Adres e-mail”, „Hasło”, „Zaloguj się”, „Nie pamiętam hasła”, „Autorzy grafiki”, each `:focus-visible`. Enter opens the credits, Tab reaches their first link with the outline, Shift+Tab goes back, Space closes |
| The credits | 10 links, all opening in a new tab with `noopener` |
| Waiting screens | „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, the warning with „Spróbuj ponownie” and the moment after a sign-up, each with header and footer, and no card |
| Sign-up | Led into the game with „Nie udało się wysłać wiadomości. Spróbuj ponownie później.”, which D-257 expects |
| A reload with a session | The waiting screen, then the game, no card |
| Logout | Back to one card, fields empty, focus in „Adres e-mail”, header and footer gone |
| `#reset-password=` | The form at once, no request sent. A short password stopped under the fields. With a valid one the server refused the link: `POST /api/password-reset`, then `GET /api/account`, then the card with „Odnośnik jest nieważny albo wygasł.” above its switch, the fragment gone. „Anuluj” led to the card with no sentence |
| A refused confirmation link | „Potwierdzanie adresu…”, then the same sentence in the card, staying through the switch and in „Nie pamiętam hasła” |
| An expired session | Cookies cleared under a running game, then a new character: the card with „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” A sign-in brought back the game holding that character |
| Hover | Background `rgb(39, 39, 42)`, `highlight`, with frame and text unchanged |
| A long address | The field stays 350 wide, inside the card |

**One name shows.** `checkVisibility()` gives the header's `h1` false and the card's true. My first probe counted 2, since it read the `display` of the `h1` alone.

**Console of the game.** Page errors: none in the second part of the walk, the only one that recorded them. Lines: six 401, the session check with no session and the expired save; two 400, the refused links; one 409, the existing address; one `net::ERR_FAILED`, my own aborted request; and in the first part a 404 on `/favicon.ico`.

**Kitchen-sink page.** All 13 samples stood: the 10 form samples of `kitchen-sink.ts:306-344` with their fields, locks, buttons and sentences, and the 3 rows of an unconfirmed address. No page error, no console line and no failed response, the missing favicon included.

**Screenshots inspected:** „Zaloguj się”, „Załóż konto” with messages, the lock, „Nie pamiętam hasła” with its sentence, „Ustaw nowe hasło” with messages, the card with the page's sentence, the credits open, 360×640, the session check, the warning with its retry, the game, and the first section of the kitchen-sink page. The route is D-254 with `.claude/skills/loop2-play/SKILL.md`. All were deleted with `.playwright-cli/`, as the skill gives; nothing of the walk stays.

**Not walked in a browser:**

- A confirmed address and a successful new password, so „Adres e-mail potwierdzony.” and „Hasło zmienione. Zaloguj się nowym hasłem.” were not seen. Mail reaches nowhere locally; they stay with the human's check.
- „Gra została zaktualizowana. Odśwież stronę.” in the card, and the sentences of a save that did not load.
- The moment after a sign-in with its answer held back; the same moment after a sign-up was.
- A reset link opened by a signed-in player, and a logout with an uncertain outcome.
- Any state but „Zaloguj się” at 360×640 or 1280×320. Any browser but Chromium.

The person's check of D-75 and D-88 remains, and D-254 says this walk replaces none of it.

## The own-work check

**Requirement most likely unmet:** „the card stands in the middle of the window” in a window other than the one I looked at, or in a state that makes the card taller than the window, where centring cuts off its top.

**Check:** the measured box at 1280×720, 360×640 and 1280×320, with messages and with the credits open, and a look at the top of the card in the short window.

**Result:** met. Left and right are equal at every width, top and bottom equal while the card fits. In the short window the card's top stands at 24 and the page grows, because the screen is a flex item in a body with `min-height`, so its height follows the card.

The state's look against the styleguide: disabled text in `text-disabled`, the selected button with `selected`, the error frame in `warning`, one focus rule. No shared control changed, so the states of the page were seen on the card alone.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Rows F15, S3, S4 | `plan.md:23`, `:24`, `:27`, by search | The handoff names them and carries no words for them. They say nothing the handoff's entries do not |
| Spec decisions 9 to 11 | `spec.md:189-244` | The safety rule names them |
| The sketch of the card | `task.md:134-135` by search; `Notes/Projects/(P) Loop/rozpoznanie_mvp2/rozpoznanie_projektant.md:219-254`, `:460-466` | Spec decision 8 calls it material and the handoff does not carry it. Read as material, not as a source |
| The React controls | `src/browser/view/controls/react-button.tsx`, `react-text-field.tsx`, `src/browser/view/credits-section.tsx` | Which elements and classes the rules meet |
| The kitchen-sink page | `src/browser/kitchen-sink/kitchen-sink.css:95-144`, `scripts/kitchen-sink.mjs`, `kitchen-sink.ts` by search | Whether it reads the rules I removed, and how it starts |
| The token check | `tests/invariants/test_browser_view_token_values.py` | How it reads a layout dimension |
| The links' form | `src/browser/view/password-reset.ts`, `email-confirmation.ts`, by search | What opens each state |
| The human's own rules | `.ai/rules/scripts.md`, `.ai/rules/git.md` | Read before the scripts and the commit, as his instructions ask |

His instructions also ask for the Obsidian rulebook before any operation on the vault. I did not read it before the read-only look at the sketch note. Nothing in the vault changed.

## Searches not found or unclear

- `spec.md` and the plan do not say how a submit button stands in the card; the sketch shows it full width, and I took that (see Choices).
- The slice expects „no error but a missing favicon” on the kitchen-sink page. It showed not even that one. Unclear why: no response of 400 or above was recorded at all, so the browser may not have asked for it in that session.

## Choices

- **The submit button takes the card's width**, as the sketch draws it. Rejected: its own width, as `.form` leaves it. Cost if wrong: one selector. It also means the kitchen-sink samples, which have no `.account-form`, show the button at its own width, so that page does not show the card's exact look. Spec decision 6 keeps that page as it is.
- **`.account-form` loses its background, frame and padding**, and keeps its class, which the card and the tests read. Rejected: leaving them, a panel inside a panel. The rule of the two forms' grid, `.account-screen`, and `.account-form:only-child` are gone.
- **All spacing comes from the existing scale**, the card's padding `--space-xl`. No value was missing from the token file, so none is named here. `width: 400px` is a layout dimension D-43 leaves out, within 100% of a narrower window, its frame included by `box-sizing`.
- **„Nie pamiętam hasła” stays a button**, where the sketch draws a plain line. The spec makes it the exit button, and the sketch is material.
- **The credits stand inside the card**, where the sketch draws them outside: D-96 and spec decision 8 bind.
- **A gap between credit rows**, one step of `--space-xs`, added after the first look: in the card each row wraps, and the rows ran together.
- **The comments of `.confirmation-notice`, `.page-notice` and `.app-main` changed**, since they still placed the sentences and the forms where they stood before Slice 11.

## Adaptations

None of section 4: the plan and the code agreed.

## Problems as observed

- **A click on „Autorzy grafiki” moves it from under the pointer.** Opening the credits grows the centred card in both directions, so the summary moved up by 96 px, from y 503 to y 407, and a second click there misses it. It follows from standing in the middle; no requirement speaks of it, so I did not change it. Leaving it costs a mouse move to fold the credits again. Standing the card at a fixed height would remove it and give up the exact middle.
- `npm run kitchen-sink` also opens the address in the default browser of this computer (`scripts/kitchen-sink.mjs:42`). So a tab may stand on the human's desktop, on an address that no longer answers. I could not see that browser.
- Some buttons looked heavier in a full-page screenshot in the states with a heading. Measured: weight 400, size 12 px and the same colour on every button, and crops of two of them look the same. So it is the text's place on the pixel grid, not a style.

## Notes for later slices

- `.claude/skills/loop2-play/SKILL.md:58` still says „Under „Załóż konto”, fill…”, which takes a press of the switch first. Slice 13 changes it, as the handoff gives.
- The comment of `.form-samples` in `src/browser/kitchen-sink/kitchen-sink.css:108` still speaks of the account screen. It is outside this slice's *Change*.
