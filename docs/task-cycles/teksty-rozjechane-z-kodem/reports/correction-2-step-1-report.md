# Correction 2, step 1 — report

**Status:** done (one concern and one reading of a remark stated below; no question blocks the work).

**Worktree and range:** `the task's worktree`, branch `task/teksty-rozjechane-z-kodem`, from `fcc9db2`.

## Commits (one per matter, by path)

| Commit | Remark | Files (added/removed lines) |
|---|---|---|
| `a6187ca` | 1, D-111 | `foundations/decisions.md` (3/3) |
| `be420e7` | 2, D-247 | `foundations/decisions.md` (3/3) |
| `aee1ecd` | 3, trust-boundary row | `guidelines/testing.md` (3/3) |
| `e175b32` | 4, D-01 | `foundations/decisions.md` (1/1) |

## Remark 1 — D-111 and a mail password file of only U+FEFF characters (`a6187ca`)

What I changed, in `foundations/decisions.md` (D-111):

- Binding sentence: the password file "decodes to a password with no control character that is nonempty once every U+FEFF is taken out, so an empty file, a file of byte-order marks and nothing else and a trailing newline are refused while a byte-order mark followed by other characters is accepted with the mark dropped by the decoder, read once". Every other sentence and clause of D-111 is as it was (still three sentences in the paragraph; *Scope*, *Based on*, *Relations*, *Verification*, *Origin* untouched).
- *Rationale*: the last sentence now says a byte-order mark is invisible and the decoding drops a leading one, so a file of marks and nothing else holds no password anyone can see and the mistake shows at startup, not only when the file has no byte; a mark followed by a password still gives that password. It no longer says "the password is empty when what the file decodes to is empty".
- *Rejected*: kept every earlier way (among them "refusing a password file only at zero bytes") and added two: "refusing every file that starts with a byte-order mark" (refuses a mark followed by a password, which the decoder reads as that password, while the rule asks only that the password not be empty — the reason `plan.md` line 452 and `cycle.md` Q-C2 keep) and "accepting a file of two or more byte-order marks and nothing else" (a password of invisible characters, mistake shows at the first login to the mail service — the reason from `reports/slice-4-review.md` out-of-scope note 1 and `reports/whole-review.md` finding 9).
- The message rule ("unreadable or invalid settings report their setting or path rather than contents") and the startup place of the refusal are already in D-111 and stayed as they were.

Search for what derives from D-111 (the invariants `account-startup-configuration` and `account-server-default-address`; decision D-257, which has `derives from D-111`; the other hits of "D-111" and of "password file" across `foundations/`, `guidelines/`, `README.md`, `.claude/skills/loop2-deploy/`): nothing needed a correction.
- `account-startup-configuration` (`foundations/invariants.md`, *Derives from* D-111) says "partial or invalid explicit account settings exit nonzero before listening"; it names no case of the password file and stays true. Not changed.
- `account-server-default-address` and D-257 do not touch the password file rule. Not changed.
- No glossary entry or part-map entry mentions byte-order marks (grep `feff|byte-order|byte order` over `foundations/`, `guidelines/`, `README.md`: only D-111 and `src/server/configuration.ts:112`, the code, which the later executor changes).

## Remark 2 — D-247 and `catch-up-minutes` (`be420e7`)

- D-247's first paragraph now reads: "It runs on its own after each load of a game state, the unsaved game state kept in the page's memory (D-211) included: after a sign-in, after a reload of the page, after a save lost to another browser's (D-209) and after a sign-in to the same account with that unsaved game state." Same four occasions, same meaning; the words are those of D-211, D-213 and the glossary entry `catch-up` (which was not changed).
- The invariant `catch-up-minutes` was **not changed**: its text (`foundations/invariants.md:1149-1157`) says nothing about a load, saved game state or the page's memory; it speaks only of the save time, the reading of the browser's clock and whole real minutes. The finding's claim that it says "a load of a saved game state" does not hold for the text in this tree (grep of "load of a saved" over `foundations/`, `guidelines/`, `README.md`: D-247 at the old line 4992, D-339 at 7464, the invariant `death-settled-once` at 1061, the glossary at 225; no `catch-up-minutes`). Adding a clause on loads to it would add a sentence the invariant never carried; its tests (`tests/sim/catch-up.test.mjs:217` and `:240`, case names "the catch-up passes a loop one game minute for each whole real minute from the save time, and the rest waits" and "a clock turned back before the save time passes nothing …") check the minutes and the clock only, so neither the corrected D-247 sentence nor an unchanged invariant changes what they check.
- Left alone, because the remark names only D-247 and the invariant: D-339 (line 7464, "After a load of a saved game state — a reload of the page, a closed tab, a new sign-in or another device", about the chronicle, which is lost after a sign-in with the unsaved state, so its wording is arguably right) and `death-settled-once` (line 1061, "a load of a saved game state on the screen"). The orchestrator may judge whether either needs the same wording.

## Remark 3 — the trust-boundary row for `src/server/` (`aee1ecd`)

In `guidelines/testing.md` (Polish file, so the text is Polish), the `src/server/` row now holds, after `account-email-nodemailer-starttls` and before `browser-failure-report`: `account-startup-configuration` (D-111), the refusal at startup of the mail password file: the case "the SMTP password file must be a small non-empty UTF-8 regular file without control characters and is refused without echoing its contents" in `tests/startup.test.mjs`, on real files; the refusal is given to an empty file, a file of only byte-order marks (BOM) and a file with a control character, and the message of the real server process names `LOOP2_SMTP_PASSWORD_FILE` and carries no content of the file.

In addition, to keep the rule's two list lines equal to the row (they list every invariant and the decisions the row names), I added `D-111` to the *Decision* line of `### Trust boundaries` and `account-startup-configuration` to its *Invariant* line. The invariant was not in the guidelines before. This is a small step beyond "name it in the row"; it can be dropped by reverting those two list entries.

Two claims of that sentence depend on the code and the test that the later executor writes: today the case has the single mark file (`Buffer.from([0xef, 0xbb, 0xbf])`) in its list of refused files and no file of two or more marks; the row says "samymi znacznikami" (only marks), as the orchestrator's rule has it. The sentence is true once that executor adds a file of two marks to the case (the orchestrator should hand that over, and the reviewer should check the row against the final test).

## Remark 4 — D-01's State of JS figure (`e175b32`)

I fetched `https://2025.stateofjs.com/en-US/other-tools/` with `curl` (HTTP 200, 823 069 bytes) and read only that page's HTML. What it shows:
- In the section "JavaScript Runtimes", the "All Respondents" chart lists rows with a rank, a name and a figure beside a person icon: 1 Node.js 10,062; 2 Browser 9,682; 3 Bun 2,321; 4 Service Workers 1,660; and so on.
- At the foot of the chart stand three items, each beside an icon with no text label: "11,141" (beside the same person icon), "86%" and "2.4". No sentence on the page says what any of the three is.
- The page text has no label for the row figure 10,062 either ("respondents" appears only in the tab name "All Respondents").
- Markup, not visible text: the Node.js bar has `--percentageValue:90.32`, which is 10,062/11,141 to two decimals; the cell of the figure has the class `chart-respondent-count`. This suggests that 11,141 is the base of the percentage, but no text of the page says so, so D-01 does not use it.

What I changed: the *Based on* source of D-01 no longer says "Node.js 10,062 of 11,141 respondents to the runtime question". It now reads: State of JS 2025 runtime survey, Node.js at the top of the chart of runtimes, the first three rows by rank quoted — "1" · "Node.js" · "10,062" · "2" · "Browser" · "9,682" · "3" · "Bun" · "2,321"; "the page's text gives no label to these figures"; read 2026-11-10 (the date of my fetch is the same). The figure 11,141 is no longer cited. The *Rationale* of D-01 never repeated the figures ("a widely used runtime with a published support period"), so it is unchanged.

What D-01 no longer claims: that 11,141 is the number of respondents to the runtime question, and so that Node.js was named by 10,062 of those respondents (about 90 percent). What it claims: Node.js stands first by rank in the chart, with the highest figure, ahead of Browser and Bun. That is what the rationale's "widely used" rests on.

## Meaning of each entry (one sentence in English, one in Polish)

| Entry | Marking | English | Polish |
|---|---|---|---|
| D-111 (changed) | the cycle's (human's decision of 2026-11-10, Q-C2) | A mail password file that holds nothing but byte-order marks, like an empty file, stops the server at startup, while a byte-order mark followed by a password is read as that password. | Plik hasła poczty, w którym są same znaczniki kolejności bajtów, zatrzymuje serwer przy starcie tak samo jak plik pusty, a znacznik z hasłem po nim jest czytany jako to hasło. |
| D-247 (reworded) | the cycle's (review finding 17) | The catch-up runs after each load of a game state, the unsaved game state kept in the page's memory included, with the same four occasions as before. | Doliczanie nieobecności działa po każdym wczytaniu stanu gry, także stanu bez zapisu trzymanego w pamięci strony, w tych samych czterech sytuacjach co dotąd. |
| D-01 (source reworded) | the cycle's (review finding N1/M5) | The source for "widely used" is that the State of JS chart puts Node.js first by rank with 10,062, ahead of Browser and Bun; the decision no longer claims a number of respondents. | Źródłem dla „szeroko używany" jest to, że wykres State of JS stawia Node.js na pierwszym miejscu z liczbą 10 062, przed przeglądarką i Bunem; decyzja nie twierdzi już, ile było respondentów. |
| trust-boundary row `src/server/` | not an entry of the foundation; a guideline row, the cycle's | The row names the startup refusal of the mail password file with its invariant and its case in `tests/startup.test.mjs`. | Wiersz nazywa odmowę przy starcie dla pliku hasła poczty razem z jej niezmiennikiem i przypadkiem w `tests/startup.test.mjs`. |

## Checks

| Command (from the worktree root) | Run after | Exit | Result |
|---|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | D-111 | 0 | `0 errors` |
| same | D-247 | 0 | `0 errors` |
| same | guideline row | 0 | `0 errors` |
| same | D-01 | 0 | `0 errors` |

No failing run of an invariant's test was written or seen: I changed no invariant and wrote no test or code. The cases cited by the invariant `account-startup-configuration` and `catch-up-minutes` were read, not run. The full suite was not run (it is the cycle's run). `git status` after the last commit: clean (the `.runs/` folder is ignored).

## Own-work check

- Requirement most likely unmet: D-111's new binding sentence must refuse "marks and nothing else", accept "mark plus other characters", keep refusing the empty file and the trailing-newline file, and not be read as dropping the "no control character" rule. Check: reread the sentence against the orchestrator's rule and against the current test list (`tests/startup.test.mjs:386-440`): the empty file, `secret\n` and the one-mark file stay refused; `mark + secret` stays accepted. The sentence says all four. It also keeps "decodes to a password with no control character", so `secret\n` is refused by the control-character rule. Showed no gap. A file of one mark followed by another mark and then text decodes (decoder drops the first) to U+FEFF + text: accepted by the sentence as written ("other characters"), consistent with the rule that only an empty remainder is refused.
- Second check: that no quoted passage of D-01 is invented. I fetched the page, extracted the three rows from its HTML, and read their text in the same order as quoted.

## Choices made (way rejected, cost if wrong)

1. D-111 wording keeps the whole rule inside the one binding paragraph, without a fourth sentence. Rejected: a new sentence for the marks. Cost if wrong: none, a reader may find the clause long.
2. D-111 *Rationale* has no sentence about how the human decided (template forbids it); the human's decision lives in the binding sentence. Rejected: citing the decision date. Cost: none.
3. Invariant `catch-up-minutes` left unchanged (see remark 2). Rejected: adding a clause on loads. Cost if wrong: the review finding 17 stays partly open for that invariant; the orchestrator can answer by telling me what text the finding meant.
4. D-01 cites the rank and three figures, not 11,141 and not the markup facts. Rejected: citing the markup (`--percentageValue:90.32`, the class name), because it is not text the reader of the page sees; and keeping 11,141 with "no label", because the decision then claims nothing about it. Cost if wrong: if the human wants the percentage kept, a later writer can cite the markup with the address of the page source.
5. D-247 changed only its first paragraph; its *Verification* examples already say "a state kept in the page's memory" and were left as they were.
6. Added D-111 and the invariant to the two list lines of `### Trust boundaries` (remark 3).

## Reaches beyond the dispatch

- `foundations/invariants.md` lines 505-520, 740-760 and 1139-1160 (the entries `account-server-default-address`, `account-startup-configuration`, `catch-up-minutes`, whole) and the decision D-257 (whole) to see what derives from D-111; D-211, D-213 and D-04's first paragraph (whole or in part) for the wording of the unsaved game state; D-339 and `death-settled-once` by grep hit. Reason: the remarks name them as derived or as wording to match.
- `tests/startup.test.mjs:380-440` and `tests/sim/catch-up.test.mjs:205-265` to confirm what the cited cases check.
- `.runs/.../cycle.md` line 94 and `plan.md` line 452 for the reasons of the two rejected ways of D-111.
- The git log of `foundations/decisions.md` (titles only) for the earlier D-01 change.

## Unread material

- Not read whole: `.the-way/elements/decisions/examples.md`, `.the-way/elements/decisions/skill/projected.md` (projected mode does not apply), `.the-way/elements/invariants/template.md`, `decide_entry.md`, `draft.md` and `write.md` of the invariants skill, and `.the-way/product-guidelines/template.md` (I read only the invariants skill's `SKILL.md`, because I wrote no invariant); `.claude/skills/the-way-record-invariant/SKILL.md` (the wrapper), and from the testing element only `SKILL.md`, `orchestrated_mode.md` and `template.md`, not `settle.md`, `task_document.md`, `hand_back.md` and the others.
- Read whole: the handoff, `make-change` SKILL, `foundation_step.md`, `way_of_working.md`, `rules.md`, the decisions template, the decisions skill with `read.md` and `decide_entry.md`, `elements/invariants/skill/SKILL.md`, `testing/template.md`, D-111, D-247, D-211, D-213 (the first 12 lines), D-01 (whole), the invariants named above.
- Read in part only: `reports/slice-4-review.md`, `reports/whole-review.md`, `reports/plan-report.md`, `reports/whole-fix-review.md` and `reports/slice-1-review.md` by grep of the passages named, not whole; `plan.md` and `cycle.md` by one line each; `guidelines/testing.md` by the Trust boundaries section and the `src/server/` row (lines 140-175), not whole.
- I did not read `a rule file of the author's agent instructions` before the one-off Python snippets I ran for editing and for reading the fetched page; the first read of the page failed on console encoding, then ran with `sys.stdout.reconfigure(encoding='utf-8')`. No file got a wrong ending: `guidelines/testing.md` has LF only, and the edit kept it.

## Searches not found or unclear

- The text "a load of a saved game state" in the invariant `catch-up-minutes`, which finding 17 reports and the handoff repeats: not found (see remark 2).
- A text label for the figure 11,141 (or for 10,062) on the State of JS page: not found; the page's text has none (tooltips are drawn by script and are not in the HTML I fetched).
- `account-startup-configuration` in the guidelines before my change: not found (the invariant is cited by tests and by the foundation only).
- No tool of the mikrus MCP was called; no code was written.

## Problems and concerns for the orchestrator

- The row of `guidelines/testing.md` and D-111 now describe a refusal that `src/server/configuration.ts:112` ("a byte-order mark, which decodes to nothing, is refused") and the test do not yet make (the file of two marks is accepted today). Until the code executor's change lands, the foundation says what the code does not; the cycle's merge must not go ahead without it.
- The deploy skill's table of log texts (`.claude/skills/loop2-deploy/references/troubleshooting.md:24`) says the password file "holds the password alone, non-empty, at most 1 KiB, with no trailing newline"; it stays true and is not mine to change.
