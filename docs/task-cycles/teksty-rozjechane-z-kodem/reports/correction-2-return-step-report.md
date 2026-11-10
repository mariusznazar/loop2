# Return step report — correction 2 — teksty-rozjechane-z-kodem

**Status:** done
**Head compared:** `b4c2356` (branch `task/teksty-rozjechane-z-kodem`), range `fcc9db2..b4c2356` (files: `foundations/decisions.md`, `guidelines/testing.md`, `src/server/configuration.ts`, `tests/startup.test.mjs`)
**Commits of the return step:** none (nothing in the foundation or the guidelines no longer matched; the worktree is clean)

## Foundation compared with code

What no longer matches: **none**.

| Entry or file | Read against | Result |
|---|---|---|
| D-111 (`foundations/decisions.md:2014-2025`): binding sentence, *Rationale*, *Rejected* | `src/server/configuration.ts:48` (`byteOrderMark = /﻿/gu`) and `:114-146` (`readSmtpPassword`: `length === 0 \|\| length > passwordFileLimit` refused; the file decoded with `TextDecoder("utf-8", { fatal: true })`; refusal when `password.replace(byteOrderMark, "") === ""` or `controlCharacter.test(password)`; `invalid("LOOP2_SMTP_PASSWORD_FILE", error)` with no content); `tests/startup.test.mjs:382-451` | Matches case by case: empty file, one, two and three marks, mark and newline, trailing newline, control characters, invalid UTF-8, 1025 bytes refused (`:392-405`); 1024 bytes, mark and text (mark dropped, `:433-439`) and two marks and text (one mark stays, `:440-449`) accepted. U+FEFF is not a control character (`\p{Cc}`), so the two tests do not collide. "read once" holds (the function is called once at `:204`). |
| Invariant `account-startup-configuration` (`foundations/invariants.md:749-757`; derives from D-111, parts account-server, deployment, build-tools) | the case that carries `// invariant: account-startup-configuration` (`tests/startup.test.mjs:386`) | Sentence ("every startup with partial or invalid explicit account settings exits nonzero before listening or printing readiness") names no password-file case and stays true; the case is one of its tests. No change. |
| Invariant `account-server-default-address` (`invariants.md:511-515`) and D-257 (`decisions.md:5306-5320`), the two other entries deriving from D-111 | their sentences | Neither names the content of the password file. No change. |
| D-247 (`decisions.md:4989-5016`) | `src/browser/view/app.ts:384-421` (`showGame` builds the view from `start.state`, the unsaved state included); `src/browser/view/game-view.ts:839-840` ("The catch-up is the last step of building, so every place of loading goes the same way (D-212)", `clock.catchUp()`); `src/browser/view/clock.ts:53-57`, `:114-117`; `src/browser/sim/loop.ts:525-533` (`catchUp` reads `state.saveTimeMs`) | "It runs on its own after each load of a game state, the unsaved game state kept in the page's memory (D-211) included: after a sign-in, after a reload, after a save lost to another browser's (D-209) and after a sign-in to the same account with that unsaved game state" is what the code does: every build of the game view runs the catch-up. *Verification* lines and *Rationale* stand. |
| Invariant `catch-up-minutes` (`invariants.md:1149-1157`) | `loop.ts` `catchUp`, `loopSpan`; `tests/sim/catch-up.test.mjs` | Sentence holds no phrase about a load; unchanged and true. |
| D-323 (`decisions.md:7124-7137`, narrows D-247), D-242 (`:4819-4844`, shares `catch-up-minutes`) | the new D-247 sentence | D-323 says the catch-up of D-247 does not run after an unhandled error, which agrees (`app.ts:388-392`); D-242 does not state the occasions of the catch-up. No change. |
| Glossary `catch-up` (`foundations/glossary.md:223-225`) | D-247 | Says "after each load of a saved game state and after a sign-in ... with the unsaved game state kept in the page's memory": same meaning as D-247, another sentence shape. This is the review's Minor N2, which the handoff names as left unfixed; not touched. `save time` (`:231`) unaffected. |
| D-01 (`decisions.md:3-15`), its *Based on* | `grep` of `foundations/`, `guidelines/`, `README.md`, `.claude/`, `.agents/`, `src/`, `tests/` for `State of JS`, `stateofjs`, `11,141`, `10,062`, `9,682`, `2,321` | Only D-01's line holds them. The entry cites rank 1 Node.js, rank 2 Browser, rank 3 Bun with the three counts and says the page gives no label to the figures; no claim of a number of respondents remains. *Rationale* ("a widely used runtime with a published support period") is compatible with rank 1. Entries naming D-01 (D-02 `:24`, `:2904`, `:4394`, invariants `account-server-runtime` and `account-server-typecheck`, `invariants.md:5-25`) restate no figure. `README.md:5` ("Node.js 24.15.0 or newer in line 24") is outside the correction and not in conflict. |
| Part map (`foundations/part_map.md`), parts `account-server` (line 64), `build-tools` (86), `simulation`, `browser-view` | `grep` for password, mail, startup, `configuration.ts`, byte-order, BOM | The entries list files and responsibilities; none states the rule on the password file, the catch-up's occasions or a figure of D-01. `tests/startup.test.mjs` stays claimed by `account-server`. No change. `foundation_check.py` reports no unclaimed file. |
| `guidelines/testing.md`, `### Trust boundaries` lines 150-151 (D-111 and `account-startup-configuration` added to the *Decision* and *Invariant* lists) and the `src/server/` row (line 170) | the case at `tests/startup.test.mjs:382-451` and the code | The row says: real files; refusal for the empty file, a file of byte-order marks alone and a file with a control character; the real server process's message names `LOOP2_SMTP_PASSWORD_FILE` and holds no content. The case does exactly that (`refusedStart` at `:425-427`); the case name is quoted word for word. |
| Other guideline files: `guidelines/coding-saved-game.md:177-179` ("the load advances nothing ... a separate step after the load adds the minutes of absence (D-247)"), `coding-mail-sending.md`, the `coding-*.md` files | `grep` for `hasł`, `BOM`, `znacznik`, `configuration.ts`, `SMTP`, `catch-up`, `nadrabian` | `coding-saved-game.md` agrees with D-247. No other guideline file states a rule on the mail password file's content. |
| Deploy skill reference `.claude/skills/loop2-deploy/references/setup_and_secrets.md:211-225` (`## The SMTP password`) and its twin under `.agents/` | the code | "The file holds the password and nothing else: UTF-8, at most 1 KiB, no trailing newline and no control character ... A missing, unreadable, empty or malformed file stops the application before it listens; its log names the setting ... never the contents" stays true (a file of marks alone holds no password). The two skill trees are identical (`diff -r`). Not a guideline file; read for completeness, no change. |

## Decisions written or changed (by me)

None.

## Invariants written or changed

None.

## Environment facts

None written or changed.

## Glossary terms

None. No word of the correction is used against its entry. `byte-order mark` is used in the ordinary meaning of the field; `catch-up` is used as its entry gives.

## Part-map changes

None.

## Projected entries written

None (the task is independent).

## Rows of *Settlements to record* written

None by me.

## Choices of the correction, weighed for an entry that binds after the merge

| Choice | Binds after the merge and not in an entry yet? | What I did |
|---|---|---|
| A mail password file of marks and nothing else is refused; a mark followed by characters is accepted (the human's answer) | No: it stands in D-111's binding sentence, *Rationale* and *Rejected*, written by step 1 of this correction. | Nothing to record. |
| The catch-up runs after each load of a game state, the unsaved one included | No: it stands in D-247. | Nothing to record. |
| D-01 cites rank and figures of the State of JS chart only | No: D-01's *Based on* holds the source word for word; no environment fact holds it, and none is owed (the page is cited inline, as the entry's other sources are). | Nothing to record. |

## Own-work check

- **Requirement most likely not met:** an entry, a guideline row or a part-map line that still states the old rule: "a file of one byte-order mark" as the only refused mark case, "nonempty" of a decoded file read as bytes, "load of a saved game state" as the only occasion of the catch-up, or "11,141 respondents".
- **Check:** `grep` of the whole of `foundations/`, `guidelines/`, `README.md`, `.claude/` and `.agents/` for `D-111`, `D-247`, `D-01`, `byte-order`, `password file`, `account-startup-configuration`, `catch-up-minutes`, `readSmtpPassword`, `U+FEFF`/`FEFF`, `State of JS`, the four figures, `11,141`; I read D-111, D-247, D-01, D-257, D-323, D-242 (verification part), the three invariants and the glossary entry whole, the code `readSmtpPassword` and the case whole, and the call chain of the catch-up (`app.ts`, `game-view.ts`, `clock.ts`, `loop.ts`) at the lines named above.
- **Showed:** every dependent sentence stands against the code at `b4c2356`. No correction made. The only remaining differences are the four Minor findings the handoff names, left untouched.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git status --short` (at start and at end) | 0 | empty |
| `git rev-parse HEAD` | 0 | `b4c235677bb413bf3ef4aafdbd490d37240cc9cc` |
| `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` | 0; 0 | both `e3825a82386a61930a86f8517fc0c5f422fc2833` |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 | identical |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |

Not run: `npm test`, `npm run typecheck` and any other test (the cycle runs the gate; no gate is mine; I did not edit code or tests). No tool of the `mikrus` MCP was called.

## Concerns and observations (not corrected)

1. D-111's *Rationale* and binding sentence say the decoder drops a leading byte-order mark. That is a behaviour of the `TextDecoder` of Node (the WHATWG Encoding Standard: `ignoreBOM` false by default), and no environment fact holds it. It is no new dependence of this correction: the earlier wording of D-111 already said it, the whole-change return step ran the decoder (`reports/return-step-report.md:69`), and the case at `tests/startup.test.mjs:433-449` shows the behaviour on the real decoder, so a change of the decoder would fail the test. I wrote no fact, because the handoff limits me to what the correction made untrue; Mariusz may want a fact, if he sees a source outside the product that the decision rests on.
2. The four Minor findings of `reports/correction-2-review.md` (N1 case title, N2 D-247 against the glossary `catch-up`, N3 length of the D-111 sentence, N4 D-339 and `death-settled-once`) stay unfixed, as the handoff says.

## Unread material

- `foundations/decisions.md`: D-111, D-247 (to its *Rejected*), D-01 (lines 3-15), D-257 (lines 5306-5320 to its *Origin*; *Rationale* not read), D-323 (binding paragraph, *Relations*, *Verification*, *Rationale*, *Rejected*), D-242 (lines 4819-4844, to its *Origin*) read; D-02 and the entries at `:2904` and `:4394` only at their *Relations* line; D-209 and D-211 not read (D-247's references to them were taken as the entry gives them).
- `foundations/invariants.md`: `account-startup-configuration`, `catch-up-minutes`, `account-server-runtime` read whole; `account-server-default-address` only the lines `511-515` the grep matched.
- `foundations/glossary.md`: lines 223-231 only.
- `foundations/part_map.md`: only the lines the grep matched (64, 68, 70, 75, 86, 111); the entries of `simulation` and `browser-view` were searched by `grep` for the words above and not read whole.
- `guidelines/testing.md`: lines 147-151 (cut at 200 characters) and the row at line 170 whole; the rest of the file was searched, not read. Other guideline files: `grep` lines only, plus `coding-saved-game.md:170-185`.
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md`: lines 211-225 only.
- `src/server/configuration.ts`: lines 40-150 (the rest, including `:204`, by `grep`); `tests/startup.test.mjs`: lines 378-462; `src/browser/view/app.ts` lines 375-421; `game-view.ts` lines 180-259 and the lines the grep matched; `clock.ts` lines 40-89; `loop.ts` lines 520-560; none of these files whole.
- `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md`: read whole. `reports/correction-2-step-2-report.md` and `reports/correction-2-review.md` read whole; `reports/correction-2-step-1-report.md` and the earlier return-step reports only by `grep`.

## Searches not found or unclear

- None unclear. Not found, as expected: any foundation entry, guideline row or part-map line that restates the old D-111 wording, the old D-247 wording or the figure "11,141"; any environment fact on the behaviour of `TextDecoder` (see concern 1).
