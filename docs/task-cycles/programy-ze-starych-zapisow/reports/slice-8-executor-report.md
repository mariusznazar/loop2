# Slice 8 — executor report: the reset control with its confirmation on Programy

- Status: done with concerns
- Worktree: `the task's worktree`, branch `task/programy-ze-starych-zapisow`
- Base: `72a395c729ed3c20f3f51373d11935a3fdb86d7e`
- Method: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice"; `slice.md`; `ui_check.md`

## Commits

- `8cac0a43` feat: :sparkles: add the reset of the game, with its confirmation, beside the pull on the screen Programy

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/program-list.tsx` | 103 | 4 |
| `src/browser/view/game-view.ts` | 127 | 6 |
| `src/browser/styles.css` | 21 | 0 |
| `src/browser/view/previous-save-lines.ts` | 8 | 0 |
| `tests/view/program-list.test.mjs` | 160 | 0 |
| `tests/view/previous-save.test.mjs` | 155 | 1 |
| `guidelines/styleguide-browser-view.md` | 1 | 1 |

`previous-save-lines.ts` is not in the slice's Change list; see "Reach beyond the handoff".

## What the change does

- `program-list.tsx`: `ProgramListProps` gains an optional `reset` (`null`/absent draws nothing). With it the list draws the destructive button „Zacznij od zera” after the pull's line, the failed-reset sentence beside it (`form-warning`), and, when open, a block with the question, „Tak, zacznij od zera” (destructive) and „Wróć” (plain). The three new callbacks `onResetAsk`, `onResetConfirm`, `onResetWithdraw` go to the game view. Focus: the confirmation opens on „Wróć”; after a withdraw focus returns to the reset control; after the wait it returns to the control at rest.
- `game-view.ts`: new option `onReset?: () => void`; new method `setReset({ waiting, sentence })` on the view. The control shows only when `previousSaveAllowed === true` and `onReset` is given. A click on the control only opens the confirmation. Confirm sets `waiting` itself, then calls `onReset` once; a second press does nothing while waiting. `setReset` sets the page's answer (`waiting`, a failure sentence, or clear). Leaving Programy closes the confirmation. The game makes no request for the reset.
- `previous-save-lines.ts`: two exported sentences for the page's answers, `RESET_NOT_ALLOWED` (403) and `RESET_FAILED` (other failure). `RESET_FAILED` is used by a test; `RESET_NOT_ALLOWED` is not used yet and waits for the page slice.
- `styles.css`: `.program-reset-confirm` (flex row) and `.program-reset-text` (warning text with a bar in `currentColor`, the same look as `.end-question-text`). Tokens only.
- Styleguide: „Zacznij od zera” added to the list of destructive buttons in the States of shared controls rule (lines 251–252), E24.

## Checks (command, exit code)

Red runs, before the implementation, with the new cases:

- `npm test -- tests/view/program-list.test.mjs`: exit 1, 5 of 23 failing, each on an assertion for the missing control: "at rest the reset is an enabled destructive button…", "opened, the confirmation names what the reset does…", "while the reset waits the control is disabled…", "a failed reset stands beside its control…", "the focus goes to withdraw…". The case "without a reset state the list has no reset control and no confirmation" passed in the red run, since absence is correct before the change.
- `npm test -- tests/view/previous-save.test.mjs`: exit 1, 5 of 27 failing, each on an assertion: "the reset control stands only for a privileged account…", "the click that opens the confirmation sends nothing…", "the confirmation names the replacement…", "a confirmed reset calls the page once…", "leaving Programy closes the confirmation…".

Green runs, after the implementation and the formatting, and again after the mutation runs and the restore:

- `npm test -- tests/view/previous-save.test.mjs`: exit 0, 27/27.
- `npm test -- tests/view/program-list.test.mjs`: exit 0, 23/23.
- `npm test -- tests/view/react-controls.test.mjs`: exit 0, 56/56.
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0, 4 tests OK.
- `npm run typecheck`: exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` (formatter gate, Prettier and the lint rules): exit 0, 5 tests OK. A first `prettier --check` with the gate's flags reported exit 1 on three files; I ran `prettier --write` on those three, checked the removed lines of the diff (only my own lines), and the check passed with exit 0.

Not run by me: the full `npm test` and `python -B .the-way/elements/common/foundation_check.py`. Those are the orchestrator's (the handoff says so). The foundation check's one expected error for `src/browser/sim/previous-programs.ts` is the orchestrator's to see.

One-line check result: all five named checks and the quality gate pass (exit 0); full gate and foundation check not run by me.

## Own-work check

Requirement the work most likely does not meet: the control must appear only for a privileged account whose page gives a callback, and a click must change nothing but the confirmation. Checks: the test cases above, and four deliberate breaks, each in the worktree, run, then restored.

| Break | Command | Exit | Failing cases |
|---|---|---|---|
| M1: privilege guard removed from `resetView` (`game-view.ts:974`, `sed` deleting `options.previousSaveAllowed !== true || `) | `npm test -- tests/view/previous-save.test.mjs` | 1 | 1: "the reset control stands only for a privileged account…" |
| M2: `options.onReset?.();` added after `setResetState(... confirming: true)` in `askReset` (opening calls the page) | `npm test -- tests/view/previous-save.test.mjs` | 1 | 4: "the click that opens…", "the confirmation names…", "a confirmed reset calls…", "leaving Programy closes…" |
| M3: `options.onReset?.();` duplicated in `confirmReset` | `npm test -- tests/view/previous-save.test.mjs` | 1 | 1: "a confirmed reset calls the page once…" |
| M4: `onResetConfirm();` added after `onResetWithdraw();` in `withdrawReset` (`program-list.tsx`) | `npm test -- tests/view/program-list.test.mjs` | 1 | 1: "opened, the confirmation names…" |

After each break the file was restored from a backup copy in the scratchpad, and the SHA-256 of the restored file was compared with the backup: `game-view.ts` `7470ea4c…` before and after each break, `program-list.tsx` `f896290a…` before and after. The worktree was clean after the commit.

Own-work limits: jsdom does not show focus rings, hover or real layout; these were checked in the browser (see below) for the states, not for focus ring look.

## Browser check (ui_check, decision D-357 route)

- Start: `npm run local` (game on `https://127.0.0.1:58397`). Account made through the registration card (`reset-check@example.test`, made up). Privilege granted with `LOOP2_DATABASE_PATH=<start's accounts.sqlite> node dist/server/account-previous-save.js grant reset-check@example.test`: exit 0, event line `account-previous-save-granted`. Page reloaded so the account answer carried the flag.
- The control is absent in the running product as the code stands: `app.ts` does not yet pass `onReset` (the page slice does). To see the real look I made one temporary line `onReset: () => {}` in `src/browser/view/app.ts` (at `createGameView`), rebuilt with `npm run build`, looked, and reverted it. `app.ts` was clean before the commit and is not in the commit.
- Observed: at rest, the control is neutral (Screenshot 1); the confirmation shows the warning sentence with its bar, „Tak, zacznij od zera” in destructive and „Wróć” plain, with focus on „Wróć” (Screenshot 2); the pointer over the control shows the danger look (D-44, hover). After one confirm: „Zacznij od zera” is disabled and the confirmation has closed (waiting state, read from the accessibility snapshot).
- Screenshots pushed by the D-358 route to `mariusznazar/screenshots`, branch `loop2/programy-ze-starych-zapisow` (the branch already existed at `797ffbf`, from the slice-7 screenshots; the push was a fast-forward), commit `8421f0fbb89bbb291355554fa09a06819f887ac8`. The screenshots show only the made-up account's Programy screen, no address or token. Local copies in `.playwright-cli/` and the clone in `.runs/screenshots/` were removed after the push.

Screenshot 1, the control at rest: ![Zacznij od zera at rest beside Usuń on Programy](https://github.com/mariusznazar/screenshots/blob/8421f0fbb89bbb291355554fa09a06819f887ac8/loop2/programy-ze-starych-zapisow/programy-reset-rest.png?raw=true)

Screenshot 2, the confirmation open: ![The confirmation of the reset on Programy](https://github.com/mariusznazar/screenshots/blob/8421f0fbb89bbb291355554fa09a06819f887ac8/loop2/programy-ze-starych-zapisow/programy-reset-confirm.png?raw=true)

Not checked in the browser: the focus ring look on the new buttons; the layout in a narrow window; the waiting state with a real server answer (the page slice does that).

## Choices made, with the way rejected and its cost if wrong

1. Withdraw is the plain button „Wróć”, as in the question „Zapisać, odrzucić, wrócić?”. Rejected: the secondary action (D-275), which the styleguide reserves for form states. Cost if wrong: a `kind` change in one line.
2. The confirmation's sentence is in `warning` with a bar, as the end-question sentence is. Rejected: `text`. Cost if wrong: one class.
3. The confirm button is labelled „Tak, zacznij od zera”, so that two buttons do not share a label with the control. Rejected: the same label. Cost if wrong: a label change.
4. The waiting state is "disabled, same text" (D-44 names „Zacznij od zera” among the controls that wait and keep their text). Rejected: a „Resetowanie…” text. Cost if wrong: a `waitingText`.
5. The view sets `waiting` itself on confirm, before calling `onReset`, so the button is never pressable between the click and the page's answer; the page may also set it through `setReset`. Rejected: waiting only when the page calls back. Cost if wrong: none found.
6. The confirmation's open state is held by the game view and passed as a prop, so that leaving Programy can close it; it is not in the list's own state. Rejected: list state (the view could not close it on leave). Cost if wrong: a move of one field.
7. Dispose: no separate state change; the list unmounts with the element, so the confirmation leaves with it.
8. The control shows on Programy during a map run, as the pull does; the spec is silent on this.

Adaptations of section 4 of `slice.md`: none needed; the plan and the code agreed except for the handoff's remark that the reset control's sentences were the maker's to word.

## Reach beyond the handoff

- Read beyond the named list: `.claude/skills/loop2-play/SKILL.md` (whole, for the browser route); `foundations/decisions.md` D-357 and D-358 (the screenshot route the ui check names); `src/browser/view/end-question.tsx` (the confirmation pattern); `src/browser/view/controls/react-button.tsx` and `react-text-field.tsx` (the shared controls and sentence components); `src/browser/account-api.ts` (grep: `resetSavedGame` at lines 136 and 507, unused here); `src/browser/styles.css` around the destructive, form-note and end-question rules; `the author's rule file on writing scripts` and `git.md` (read when a hook asked, before the next write and push).
- Edited beyond the Change list: `src/browser/view/previous-save-lines.ts` (two exported sentences, `RESET_NOT_ALLOWED` and `RESET_FAILED`; the page's wording for the 403 and for other failures, decision 6). Reason: the spec's sentences for the reset's answers, which the page slice needs. `RESET_NOT_ALLOWED` is unused until that slice.
- Test helpers: `mount` in `tests/view/program-list.test.mjs` gained three callback keys; `viewOf` in `tests/view/previous-save.test.mjs` gained an `onReset` option. No assertion was weakened.
- The game view's header comment gained one paragraph about the reset (D-396).

## Unread material

- `tests/view/end-question.test.mjs`: lines 41–150 not read (1–40 read).
- `tests/view/page-document.mjs`: lines 61–243 not read (1–60 read).
- `src/browser/view/game-view.ts`: read 1–260 and 790–1060 with my edits; lines 261–789 and 1060–end not read.
- `src/browser/view/app.ts`: only lines 390–401 read (the `createGameView` call); the rest not read.
- `tests/view/program-list.test.mjs`: lines 281–348 (the name-field tests) not read; not affected by the change.
- `tests/view/react-controls.test.mjs`: not read; run only.
- `project-level/technology/reserved_choices.md`: not read; the slice needed no unsettled choice.
- Read whole: `slice.md`, `SKILL.md` (make-change), `ui_check.md`, `task.md`, `spec.md`, the styleguide, `testing.md`, `coding.md`, `coding-browser-module.md`, `src/browser/AGENTS.md`, `program-list.tsx`, `previous-save-lines.ts`, `end-question.tsx` (the handoff's named foundation entries: D-44, D-166, D-207, D-209, the `browser-view` part entry, the glossary entry "previous save").

## Searches not found or unclear

- The styleguide has no rule for the layout or the look of a confirmation of a destructive act; the handoff says so too. I built the block from the end-question pattern and the shared controls. Unclear whether the review will want a rule; that is the styleguide's, not this slice's.
- The destructive-button list is named only at lines 251–252 of the styleguide (`grep` for „Porzuć zmiany” and „Przełącz postać”); no second list found.
- No `onReset` in `src/browser/view/app.ts` (expected: the page slice wires it).
- Whether the reset control should hide during a map run: the spec is silent.
- Foundation entry for the confirmation's layout: none found.
- Whether the withdraw should be secondary (D-275): read D-275 as limited to form states; kept plain.

## Questions (none blocks the commit)

1. The page slice should pass `onReset` in `app.ts` and call `setReset` with the two sentences of `previous-save-lines.ts`. Recommended: yes, in that slice.
2. Withdraw as plain „Wróć” rather than the secondary action (D-275). Recommended: keep plain; a one-line change if the review disagrees.
3. The screenshots are public on `mariusznazar/screenshots` (D-358), pushed by the agent. Recommended: keep them; they show only the made-up account. This is an outside action taken under D-358, and the orchestrator should know.
