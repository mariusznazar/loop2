# Report — executor of slice 7 (the screen of the list of accounts)

**Status:** done with concerns (the concerns are in "Questions and concerns"; none blocks).

## Commits

Base `57e03bc9`, branch `task/panel-wlasciciela`.

- `e89c7333` — `feat: :sparkles: add the screen of the list of accounts and its entry, with the confirmation of Zablokuj and the four operations of a row (D-411, D-410, D-281, D-44)`
- `861b6c9c` — `test: :white_check_mark: quote the sentences of D-411 from where each begins in the tests of the screen of the list of accounts (D-411)`

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/accounts-screen.tsx` (new) | 385 | 0 |
| `src/browser/view/accounts-entry.ts` (new) | 217 | 0 |
| `tests/view/accounts-screen.test.mjs` (new; the second commit changes 3 lines) | 676 | 0 |

(Counts from `git show --stat e89c7333 861b6c9c`.)

## What was made

- `accounts-screen.tsx`: `createAccountsScreen({ controls, props })` returns `element`, `update(props)`, `focus()`, `dispose()`; the first draw is synchronous (`flushSync`, one root, like `maps-screen.tsx`). It draws what the entry gives it whole (`phase`, `sentence`, `canRetry`, `accounts`, `waiting`, `confirming`) and performs nothing; its acts go out through `controls` (`retry`, `askBlock`, `confirmBlock`, `withdrawBlock`, `unblock`, `grant`, `revoke`).
- `accounts-entry.ts`: `createAccountsEntry({ client, onSignedOut })` (kind `accounts`, `lives: "while-shown"`, key `"accounts"`). It holds the state of the read, of the operation awaited and of the confirmation, makes the requests through the five client methods, and reads the list again after each operation. Numbered chains of requests make a late answer (after dispose or after a later chain) count for nothing.
- Tests: 21 cases on the real entry and the real screen on jsdom, with a stand-in of the account client only (the network is the one thing outside).

## Checks

| Check | Command | Exit |
|---|---|---|
| Failing run of the tests written first (against an empty stub of the entry: 20 of 21 fail on their assertions, the 21st, the late answer after dispose, passes trivially on the stub) | `npm test -- tests/view/accounts-screen.test.mjs` | 1 (evidence: `reports/executor-7-evidence/executor-7-first.txt`) |
| Typecheck | `npm run typecheck` | 0 |
| The slice's tests | `npm test -- tests/view/accounts-screen.test.mjs` | 0 (21 of 21; `executor-7-evidence/executor-7-final.txt`) |
| The shared controls | `npm test -- tests/view/react-controls.test.mjs` | 0 (56 of 56; `executor-7-evidence/executor-7-rc.txt`) |
| Prettier (handoff) | `npx prettier --check src/browser/view/accounts-entry.ts src/browser/view/accounts-screen.tsx tests/view/accounts-screen.test.mjs` | 0 |
| ESLint (handoff) | `npx eslint src/browser/view/accounts-entry.ts src/browser/view/accounts-screen.tsx tests/view/accounts-screen.test.mjs` | 0 (it first failed with 3 `unbound-method` errors on the `controls` type written with method syntax; fixed by writing the members as function-typed properties, then 0) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | `0 errors` (it first reported 3 errors: three `// decision: D-411 "…"` lines of my test quoted a part that does not begin a sentence; fixed in `861b6c9c`) |

The product's gate (bare `npm test`) was not run, as the handoff says.

## Own-work check (section 3)

- Requirement most likely not met: the reviewer's mutations named in the handoff, and the task's items 4 and 5 (the row shows the four things and the four operations act as D-411 gives, with the confirmation only on „Zablokuj”).
- Check: eight mutations applied one at a time to the source with the slice's test run after each (a script in `.runs/executor-7/`, since removed): the button shown at an owner's row; the confirmation skipped (`askBlock` sending the block); the block sent from „Wróć”; the unblock sent with the first row's address; no read of the list after an operation; the rows sorted; the buttons not locked while an answer is awaited; the confirmation not closed when the block is sent.
- Result: seven of the eight failed the tests at once; the eighth (the confirmation left standing while the block waits) first passed, and I added to the test of the confirmation's request the assertions that, while the answer is awaited, no confirmation stands and „Zablokuj” is disabled with its text; the mutation then failed (`exit 1`). The sources were restored from the backup and diffed identical before the commit.
- Screenshot: **unchecked, reason: the screen has no address in the product yet (slice 9 adds `#/konta` and the registration) and no style rules (slice 8), so the running product cannot show it.** States were checked in code and in the tests on jsdom, which show no rendered appearance, real focus order or real events (D-88).

## Words I chose (the handoff left them to me)

| Where | Text |
|---|---|
| line while the list is read | „Wczytywanie listy kont…” |
| empty list | „Nie ma żadnych kont.” |
| failed read (`warning`, with „Spróbuj ponownie”) | „Nie udało się wczytać listy kont. Spróbuj ponownie.” |
| `owner-forbidden`, at the read and at an operation (`warning`, no retry) | „To konto nie ma prawa do listy kont.” |
| `owner-not-blockable` | „Konta z rolą właściciela nie można zablokować.” |
| `unknown-account` | „Konta o tym adresie już nie ma.” |
| any other failed operation | „Nie udało się wykonać operacji. Spróbuj ponownie.” |
| confirmation of „Zablokuj” (one sentence, `warning`) | „Blokada kończy sesje gracza w każdej przeglądarce i unieważnia jego odnośniki z maili, a odblokowanie nie przywraca ani sesji, ani odnośników.” |
| row labels and values | „Blokada:” zablokowane / odblokowane; „Uprawnienie do poprzedniego zapisu:” tak / nie; „Rola:” gracz / właściciel |

The confirmation's buttons: „Tak, zablokuj” (destructive, as „Zablokuj”) and „Wróć” (secondary action, as the styleguide's rule "The list of accounts" says; the confirmation of „Zacznij od zera” in `program-list.tsx` uses a plain „Wróć”, which I did not copy).

## Classes for slice 8 (`class → what it styles`)

All are named in the header comment of `src/browser/view/accounts-screen.tsx`.

- `accounts-screen-host` — the element of the screen (the host, `tabIndex -1`)
- `screen accounts-screen` — the root, beside the existing `screen` (content width as the other screens: `src/browser/styles.css:203-211` lists `.screen.programs-screen` and `.screen.maps-screen` for it, so `.screen.accounts-screen` probably wants adding there)
- `screen-area accounts-area` — the one area
- `accounts-loading` — the line while the list is read (the styleguide gives it no role; I would give it `text-secondary`)
- `accounts-empty` — the sentence of the empty list (`text-secondary` by the styleguide)
- `accounts-retry` — the block holding the shared „Spróbuj ponownie” button
- `accounts-list` — the `ul` of rows
- `accounts-row` — one account (`li`)
- `accounts-summary` — what a row shows of the account (address and the three fields)
- `accounts-email` — the address (`text-strong`)
- `accounts-field` — a label with its value
- `accounts-label` — the label (`text-label`)
- `accounts-state` — the blocked state (`text`); with `accounts-state-blocked` where the account is blocked (`warning`)
- `accounts-privilege`, `accounts-role` — the two values (`text`)
- `accounts-actions` — the row of the four buttons
- `accounts-confirm` — the confirmation under a row; `accounts-confirm-text` — its sentence (`warning`)
- The sentences of a failed read or operation use the shared `form-warning` (already `warning`); no rule of mine is needed for them.

## Choices, with the way rejected and the cost if wrong

1. **Of each pair the button that makes no sense for the state of the row is disabled** (Zablokuj at a blocked account, Odblokuj at an unblocked one, Nadaj at a privileged one, Odbierz at an unprivileged one). The plan says "disabled or left out as the styleguide of Slice 6 gives", but the styleguide's rule "The list of accounts" gives neither; D-411 says each account has four buttons. Rejected: all four always enabled, leaving the server's idempotent outcomes (`already-blocked` and the like) to say it. Cost if wrong: one line (`useless` in `accounts-screen.tsx`), and the tests of the disabled pairs.
2. **Focus after an answer:** it returns to the control the player started from, and where the answer made that control useless (disabled), to its counterpart in the pair (Zablokuj ↔ Odblokuj, Nadaj ↔ Odbierz). Rejected: leave focus on the body. Cost if wrong: the `COUNTERPART` table.
3. **While an answer is awaited every button of every row is disabled,** not only the one pressed (D-411 requires only the pressed one to wait). Rejected: only the pressed one, which allows a second operation to start while the list is about to be read again. Cost if wrong: `busy` in `AccountRow`.
4. **After every operation the list is read again, except on 401 and on `owner-forbidden`;** the button keeps waiting through the read. If the read after an operation fails, the screen stands in the failed state with its retry (the list is not left stale beside a warning).
5. **A 401 at the read or at an operation calls `onSignedOut` once and shows no sentence;** the page replaces the screen.
6. **The state lives in the entry, the screen is a pure drawing** (as `programs-entry.ts` and `program-list.tsx` split it; D-267 forbids the data requests in an effect).

## Questions and concerns

1. **Plan and code disagree (small mismatch, adapted).** The plan has the entry hold kind `accounts`, but `Screen["kind"]` in `src/browser/view/screen-address.ts` has no such kind until slice 9, and `ScreenEntry.kinds` is typed by it, so `npm run typecheck` (this slice's check) would fail on `kinds: ["accounts"]`. I wrote `const KIND: string = "accounts"` and `kinds: [KIND as Screen["kind"]]`, with a comment. Recommendation: slice 9, when it adds the kind to `Screen`, replaces this with `kinds: ["accounts"]` and drops `KIND` and the cast (the file is named in slice 9's *Read*).
2. The handoff and the plan say the styleguide gives how the two senseless buttons are shown; it does not (see choice 1). The styleguide also gives the line while the list is read no role.
3. Slice 8 should add `.screen.accounts-screen` to the rule of the content width at `src/browser/styles.css:210-211`, and a rule for the `accounts-confirm` block like `.program-reset-confirm` (`:781`).
4. Not covered by a test, as `guidelines/testing.md` allows for jsdom: real keyboard focus order and the look. The hand check of the focus (Wróć on opening, back on „Zablokuj” on withdrawing, the counterpart after an operation) needs slice 9 first.

## Reach beyond the handoff (section 1)

- `.the-way/task-cycle/change/slice.md`, `.the-way/task-cycle/change/ui_check.md`: named by the method.
- `src/browser/view/programs-entry.ts` (lines 40-330): how the page's signed-out handling and an entry's state are written; the handoff names `maps-entry.ts` and `character-entry.ts`, which have no 401 case.
- `src/browser/view/screen-address.ts` whole: to find out whether the kind `accounts` exists (it does not; concern 1).
- `src/browser/view/controls/react-text-field.tsx` (`ReactFormWarning`): the shared sentence in `warning`.
- `tests/view/maps-screen.test.mjs:1-150`: the pattern of a screen's test.
- `.runs/task-cycles/panel-wlasciciela/plan.md` lines 1-35 and 96-125 (slices 8 and 9 and the foundation table): to see what slices 8 and 9 take from my files.
- `.runs/task-cycles/panel-wlasciciela/task-frozen.md:20-44` (the handoff gives 29-38).
- `foundations/glossary.md:270-277`, `foundations/decisions.md:10894-10925` (D-410, D-411): named.
- `.the-way/elements/common/foundation_check.py:779-825`: the rule by which a `// decision:` quotation must begin a sentence (my first quotations did not).
- The rules files the hooks of this session required (scripts, git).

## Working copies

- `.runs/executor-7/` (backup of the two sources and the mutation script) stood in the worktree; **removed**. The scratch outputs `.runs/executor-7-*.txt` were moved to `.runs/task-cycles/panel-wlasciciela/reports/executor-7-evidence/` (first failing run, final run, `react-controls` run) and removed from `.runs/`. No worktree, clone or screenshot was made.

## Unread material

none (every file and passage the *Read* names was read whole; `tests/view/page-document.mjs` and the styleguide, which the tool gave in two pages, in both; `foundations/decisions.md` D-280, D-281, D-44, D-402 whole).

## Searches not found or unclear

- The styleguide's statement of how "the two that make no sense for the state of the row" are shown: not found (the rule "The list of accounts" has none); chose disabled (choice 1).
- The kind `accounts` in `Screen`: not found in `src/browser`; it comes with slice 9 (concern 1).
- A role for the line shown while the list is read: not found in the styleguide; named in the class list as my suggestion.
