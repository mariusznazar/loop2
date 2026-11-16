PASS

# Spec review 2 — przejscie-widoku-na-react (the revision)

- Revised spec: `docs/task-cycles/przejscie-widoku-na-react/spec.md`
- Spec as reviewed: `docs/task-cycles/przejscie-widoku-na-react/spec-reviewed.md`, compared line by line with `diff`.
- Designer's report of the revision: `docs/task-cycles/przejscie-widoku-na-react/reports/designer-report-2.md`
- First review: `docs/task-cycles/przejscie-widoku-na-react/reports/spec-reviewer-report.md`
- Method: `.the-way/task-cycle/spec/SKILL.md` and `review.md`, reviewer's variant, review of a revision. No file of the repository changed.

## The earlier findings

| Finding | State | Where the revision settles it |
|---|---|---|
| F1 — four assertions of `tests/view/account-screen.test.mjs` break under Decisions 1 and 2, unlisted | **Fixed** | Decision 7 adds a bullet for `:3386`, `:3391`–`:3395`, `:1325`–`:1327` and `:3340`–`:3350`. It gives one ground for all four: To do 2, settlement row 3 (question 2 a) and Decision 1's hidden host, which is always there. For each assertion it says what the rewrite keeps, with values written out and the decision it protects (D-208, D-280, D-156, D-286, D-96). The `:1712` check stays and still passes in the sentences' host. Decision 3's *Cost if wrong* no longer claims that nothing changes. I checked each rewrite against the stylesheet (`header .save-line, header .failure-line`, `.app-main`): a hidden host takes no box, so "the header's shown children" and "the shown sentences of `<main>`" read what the player sees. |
| F2 — Decision 6's prop, and the open split of the page module, against the styleguide rule "The kitchen-sink page" | **Fixed** (see point 1 below for the way chosen) | Decision 6 drops the prop. *Constraints* quote the rule and require the entry module to keep exporting `PAGE_MARKER`. The split is no longer open: `kitchen-sink.tsx` stays the one entry module. Decision 8 keeps the rule's last paragraph unchanged. Goals 1 and 5 no longer name the prop. |
| F3 — foundation entries without a mark | **Fixed** | *Foundation entries* first says what each mark means, then marks every entry. The D-407 entry separates settlement 3 (separate roots) from the cycle's precision: three roots for the rows of sentences, and the failure row drawn at the start and shown at the error without a render. D-03, D-44, D-275, D-276 and D-381 each name the settlement or To do they follow and mark their wording as the cycle's precision. D-323 is the cycle's precision carrying To do 4. |
| F4 — focus after a retry is refused again | **Fixed** | Decision 3, state refused: focus moves to „Spróbuj ponownie” "at every entry into this state, a refusal after retrying included, … as `askingFailed` does today". This matches `app.ts:318`–`:323`. |
| F5 — the state stopped against the kept `session-check` check | **Fixed** | Decision 3: stopped draws "the element `session-check` drawn empty, with no text and no button". Decision 2 says that element stands in every state of the waiting screen. The check `uncaught-failure.test.mjs:769` stays and passes. An empty `session-check` takes no height (`styles.css:649`–`:654`: flex with a gap, no padding), so it shows nothing. |

## The two points the orchestrator asked about

### 1. The new Decision 6: typing an empty text into the sample through `inputRef`

**Does the way hold the rules?** Yes.
- The styleguide rule "The kitchen-sink page": the typing code stays in the entry module, and the page imports from `src/browser/view/controls/` only `ReactNumberField`, which the game uses. Nothing that only the page needs reaches what `npm run build` writes.
- D-45: the empty state, which applies, now stands on the page, drawn from values made up on the page.
- D-269 as settlement 1 changes it: the sample is the React field the player gets, on a page bundled by the build step.
- D-267: the typing runs outside React's rendering and is not in an Effect.

**Does it work in the browser?** By my reading, yes. React's change handling compares the input's value with the value React last wrote. The native setter goes around that record, so the bubbling `input` event reaches `handleChange` (`react-number-field.tsx:92`–`:95`). That sets an empty draft, which the controlled `value={draft ?? String(value)}` then shows. The page's root must be drawn synchronously before the typing, and Decision 6 says it is. This is reasoned, not run, as the designer also says. The empty draft lasts until the developer focuses the field and leaves it: `handleBlur` then applies the sample's rule. That is how a player's cleared field behaves too.

**Does the revision weigh the first text's rejection of this same way?** Only in part, and it does not say that it reverses its own earlier rejection. The first text rejected the way on two grounds:
- (a) "a change of React's event handling would break silently". The new *Cost if wrong* answers this one: a later React may make the sample show its number; no test catches it, but the developer who opens the page sees it, and the fix stays in the page's module.
- (b) "test-harness technique in product code". The revision does not mention it.

The new way also sits uneasily beside Decision 5. Decision 5 rejects forcing hover and focus by "classes added to React's elements by hand after the render (the page writes into elements React owns)". Decision 6 now writes the value of an input React owns. The two differ in a way the spec does not state: typing through the `input` event goes through React's own handling, so React's state follows, while a class written by hand is unknown to React and lost at the next render.

Neither gap changes what is built. The page never reaches players (D-45), and both decisions say exactly what to do. So I count this as a Minor note, not a finding (N1 below).

### 2. Goal 5 points to "Decision 5" for the new test file

This is a Minor finding and it does not block. Goal 5 sends the reader to Decision 5, which is about the kitchen-sink page and says nothing of tests. Decision 7 names the new file `tests/view/shared-controls.test.mjs` and lists every case it receives. A builder who follows the wrong pointer finds nothing that misleads, and the right content is in the one decision about tests. A wrong guess changes nothing that is built. The fix is one word, in the spec or when the plan is made.

## New problems brought by the revision

None that fails the spec. Goal 1 now says the shared controls are untouched "for the page's sake", which does not contradict To do 5 and 6. Goal 5's "props" unchanged agrees with To do 6: the constant for the warning sentence is no prop, and `ReactFormWarning`'s tree stays the same.

## Minor notes (no finding)

- **N1** (point 1). Decision 6's list of rejected ways could say in one line that the chosen way is the one the first text rejected, and why ground (b) weighs less now. The reason would be that the page is a developer's tool D-45 keeps out of what players load. Decision 5's reason for rejecting hand-written classes could add that typing through the event keeps React's state in step, which is what makes the two cases differ.
- **N2** (point 2). In Goal 5, "Decision 5" should read "Decision 7".
- From the first review, still standing as a note: the screen-reader hypothesis of Decision 1 reads more honestly as a risk accepted (D-42 keeps no criterion on announcements) than as something a browser check or a reviewer can confirm.

## Reaches beyond the dispatch

- `src/browser/styles.css`, rules `header .save-line, header .failure-line`, `.confirmation-notice`, `.page-notice`, `.app-main` and `.session-check` (lines 46–58, 179–209, 649–659). I read these to judge whether the rewritten assertions of F1 and the empty `session-check` of F5 read what the player sees.
- Decision 6's way was checked against what I had read in the first review: `react-number-field.tsx` (whole), D-264 (statement and verification), D-267 (whole) and the styleguide paragraph on the kitchen-sink page.

## Working copies

None made; `.runs/spec-review/` was not created.

**Unread material:**

- From the first review, the parts the revised passages do not rest on stay unread. That covers `guidelines/styleguide-browser-view.md` outside lines 193–215, 389–420 and 955–960; `guidelines/coding.md` beyond its headings; and `guidelines/testing.md` outside lines 80–329.
- Also still unread: `menu-bar.tsx` outside 320–362; `game-view.ts`, `state-store.ts` and `game-saver.ts` beyond searches; `account-card.tsx` 136–579; the bodies of `react-controls.test.mjs`; and `account-screen.test.mjs` outside the excerpts listed in the first report.
- The revised passages rest on the four assertions of F1 (`account-screen.test.mjs:1310`–`:1332`, `:3330`–`:3400`), on `uncaught-failure.test.mjs:766`–`:778`, on `react-number-field.tsx`, on D-264, D-267 and on the styleguide's kitchen-sink paragraph. I had read all of these whole.

**Searches not found or unclear:**

- Whether typing through the native value setter and a bubbling `input` event, outside `act`, on the bundled page, draws the empty draft in a real browser. Reasoned from React's handling of changes and `ReactNumberField`, not run; the maker sees it when opening the page.
- A test that checks focus on „Spróbuj ponownie” after a repeated refusal: none, as before. The spec's sentence now holds it.
