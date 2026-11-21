# Report — executor of slice 11 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done

## Commits

- `969d4c60` feat: the second part of the sentence of an open manual map run is a link to the screen of that map run (D-287, D-281). Base `57ed451a`.

## Files changed (added / removed lines)

- `src/browser/view/maps-screen.tsx` +31 / -1 (new component `RunWaitingNote` and the constant `RUN_LINK_TEXT`; the row's `<p class="maps-who-run-note">` is now drawn by it)
- `src/browser/maps-screen.css` +7 / -0 (rule `.maps-who-run-link`, see "Reach beyond the handoff")
- `tests/view/maps-screen.test.mjs` +55 / -0 (new case)
- `guidelines/styleguide-browser-view.md` +4 / -3 (rule "The screen Mapy": the line of the sentence of D-287, and D-281 added to its Decision field)

## The first check of the slice: the base of the first run

`git show c36e2739:src/browser/view/maps-screen.tsx` (lines 346-348 there): the row of a character in „Kto idzie” held, near the sentence, only `<p className="maps-who-run-note">{runWaitingSentence(run.mapId)}</p>` — plain text in a plain paragraph. The only link in the row was the character's name (`screenAddress({ kind: "character", … })`, line 275). So no link to the screen of the open manual map run stood in the row at the base, and the first run did not lose one. The menu bar's „Wróć do przejścia · {mapa} · minuta {m}” (D-280) did lead to that screen at the base, as the orchestrator's notes say. The slice therefore went on to the change.

## What was made

- In every row of „Kto idzie” where the sentence stands, the sentence is now `Przejście na mapie {mapa} jest niezakończone. ` followed by a link whose text is the second sentence, „Wróć do niego i je zakończ, żeby wysłać postać.”, with `href` from `screenAddress({ kind: "run", characterId: run.character.id })` — the map run's character, not the row's character, so the target is the same in each row (`#/postac/2/przejscie` when Bob holds the run). The text of the whole paragraph is unchanged (`textContent` equals `runWaitingSentence`'s text), so the existing case in `tests/view/account-screen.test.mjs` reads it as before.
- The link keeps the sentence's role: colour `var(--text-secondary)`; it keeps the browser's underline for a link (the character's name in „Kto idzie” is likewise an unstyled link with the underline) and has no weight change. No role, value or meaning of a role changed; no token added.
- The text of the sentence stays `runWaitingSentence`'s: the component cuts `RUN_LINK_TEXT` off its end. If the wording in `team-lines.ts` changes, the new test fails on the link text (the plain paragraph would then read wrong, never silently).
- Styleguide, rule "The screen Mapy": the line of the sentence now says its second part is a link to the screen of that map run (D-281), the same in each row, in the same role `text-secondary`; D-281 added to the rule's Decision field.

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| The new case written first, failing | `npm test -- tests/view/maps-screen.test.mjs` | 1 — 49 passed, 1 failed: „one link in the sentence: expected 1, got 0" (assertion at the link count, the expected reason) |
| Same, after the change | `npm test -- tests/view/maps-screen.test.mjs` | 0 — 50 passed |
| `npm test -- tests/view/team-lines.test.mjs` | | 0 — 19 passed |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | | 0 — 4 tests OK |
| Test of the other file that reads the sentence | `npm test -- tests/view/account-screen.test.mjs` | 0 — 132 passed |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | first run 1: "tests/view/maps-screen.test.mjs:942: the quotation does not begin a sentence of `D-287`" (my first quote began at the sentence "Wherever …", which the check does not see as a sentence start because the sentence before it ends with `.”`); fixed by quoting the paragraph from its start; second run 0 — "0 errors" |
| ESLint | `npx eslint src/browser/view/maps-screen.tsx tests/view/maps-screen.test.mjs` | 0 |
| Prettier | `npx prettier --check` on the tsx, css and test | 0 for those three; the `.md` styleguide fails Prettier, and fails it at HEAD too (`git show HEAD:guidelines/styleguide-browser-view.md \| npx prettier --stdin-filepath guidelines/x.md --check` → 1), so not from this change; Prettier is not a check of `.md` files under D-32 |
| Typecheck | `npm run typecheck` | 0 |
| Size rules | `node tests/quality/eslint-size-rules.mjs` | 0 — "0 functions and files over a threshold in 338 files" |

No full gate was run.

## The own-work check

- **Requirement most likely not met:** „the link stands in every row, and leads to the map run's screen” — a wrong implementation would take the row's own character for the address (the sentence then leads to the screen Postać of the row's character, which D-287 names as a violation) or link the first sentence.
- **Check:** the new case holds two characters, makes the run's character the second (Bob, id 2) and reads both rows: the link text is exactly the second sentence, `href` is `#/postac/2/przejscie` in Ala's row as in Bob's; it also covers a waiting run and an ended run of character 1 (`#/postac/1/przejscie`), `getComputedStyle(link).color === "var(--text-secondary)"`, and after „Zakończ”-state (no run) no note and no link but the two names. It fails on a row-character address and on a link over the whole paragraph (text differs).
- **Mutations in my head:** href from the row's character — caught; link over the wrong part — caught (text); class missing from the stylesheet (blue UA colour) — caught by the colour assertion; link left after the run ends — caught.

## The walk (walkthrough.md, UI check)

The change alters what a user sees on the screen Mapy. Walk against the real game (`npm run local`, `https://127.0.0.1:62065`, Playwright CLI, Chromium; made-up account at `example.test`):

| Case | By what | Verdict |
|---|---|---|
| Two characters (Ala, Bob), Bob sent on Skraj lasu by „Wejdź”; back on `#/mapy/forestEdge`: each of the two rows holds the sentence with its second part as a link to the run's screen | the screen in the browser, reading `.maps-who-run-note` | pass: both rows, link text „Wróć do niego i je zakończ, żeby wysłać postać.”, `href` `#/postac/2/przejscie` in both rows, colour `rgb(159, 159, 169)` equal to the sentence's colour, `text-decoration-line: underline` |
| The link in Ala's row is clicked | the screen in the browser | pass: address `#/postac/2/przejscie`, the screen of Bob's run (heading „Bob”, buttons „Wznów”, „Zakończ”) |
| After „Zakończ” on that screen, back to the card | the screen in the browser | pass: no `.maps-who-run-note`, the only links in the rows are the names `#/postac/1`, `#/postac/2` |
| Look of the sentence | my own screenshot (inspected, not shown, none kept, no push) | the sentence reads as before, its second part underlined in the same grey, beside the names (bold, white, underlined) of the characters; no visual fault seen |
| Side observation | console | only the two ordinary entries (401 of the account request before sign-in, 404 of the favicon) |

Not checked: a map run that has ended in a death (the screen opens the end-of-run window there) — covered in jsdom by the `endedRun` state of the new case, not in the browser; the narrow-window wrap of the long sentence with a link. Screenshot: looked at, no place for it is shown by this slice (the handoff says push none, keep none), and the file was removed. Browser closed with `playwright-cli close`, `npm run local:stop` ended the start (1 stopped); `.playwright-cli/` removed.

## Reach beyond the handoff

- `src/browser/maps-screen.css` is not in the slice's *Change*; I changed it (rule `.maps-who-run-link { color: var(--text-secondary); }`). Without it the link takes the browser's default link colour, which is no role of the styleguide. It is the file of the screen's own stylesheet (D-421), so the rule stands where the styleguide asks. Orchestrator: add it to the part's list of the slice's files if the review compares the slice's files with its *Change*.
- Read `foundations/decisions.md` D-281 (whole entry, lines 4594-4606) to quote it and to check the address; and `tests/view/account-screen.test.mjs:2920-2980` and `.the-way/elements/common/foundation_text.py` `begins_sentence` (to learn why my first quote was refused). The handoff's D-281 is named only in the slice text, not in the *Read*.
- The decision comment of D-287 in the new test quotes the whole paragraph up to the link clause, because the check accepts a quotation only from the start of a paragraph or after `. ` outside quotation marks, and the sentence that holds the link begins after `.” `. It is a long line; a shorter quotation of that sentence is not possible with the check as it stands.

## Choices

- The link in a `<p>` beside plain text in the paragraph (rejected: the whole sentence as the link — D-287 says the second part only; a separate paragraph for the link — the existing cases read one `maps-who-run-note` per row with the whole sentence). Cost if wrong: one component and one css rule to revert.
- Splitting the text by `RUN_LINK_TEXT` in `maps-screen.tsx` instead of adding a second function to `team-lines.ts` (rejected: `team-lines.ts` is not in the slice's *Change*). Cost: the wording stands in two places (the test fails if they drift).
- No hover rule for the link: the plan says the link takes the look the styleguide gives a link of the screen, and the name of a character (the example named) has none beyond the underline.

## Unread material

none — all files and passages named by the handoff were read whole except the ranges below.
- `foundations/decisions.md` D-280 read whole (lines 4522-4593); D-287 read whole from its heading (line 10292).
- `guidelines/testing.md` was read whole in two pages; `guidelines/styleguide-browser-view.md` whole in two pages.
- The walk report (`reports/walk-report.md:65`) and `reports/correction-1-remarks.md` were not opened: the handoff copies remark 3 word for word and says the walk missed the link. Read in part: none else.

## Searches not found or unclear

- The plan's *Foundation entries* row 13 is not a file I opened; I read D-287 as it stands in `foundations/decisions.md` (the sentence about the link is there). Nothing unclear.
- The handoff names two directories for working copies (`.runs/executor-11/` in the text, `.runs/executor-c1-11/` in the dispatch message); I used `.runs/executor-c1-11/` for logs.

## Working copies

- `.runs/executor-c1-11/` (logs of the focused runs and one screenshot) stood in the worktree; removed after the report's contents were taken. `.playwright-cli/` removed. No remainder.
- The class `same` did not prove too weak.
