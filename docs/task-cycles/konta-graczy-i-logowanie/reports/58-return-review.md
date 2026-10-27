FAIL 4e915e8dcac1e9cb5fcbbaabcbb4754b374e6f07

# Independent review of the return step: player accounts and login

- **Range:** 40977266b5d66825c49fcdd0c6982c1872e8a2c5..4e915e8dcac1e9cb5fcbbaabcbb4754b374e6f07, one commit (4e915e8), six files, +30/-22. `git rev-parse HEAD` = 4e915e8dcac1e9cb5fcbbaabcbb4754b374e6f07, as given. Tree clean before and after the review.
- **Pin:** `.the-way` checkout and gitlink both 574a37b9ab9572f876298f4cc10754581222d3f0.
- **Method:** `.claude/skills/the-way-review-change/SKILL.md` → `.the-way/task-cycle/review/SKILL.md`; step 11 and step 13 of `.the-way/task-cycle/skill/SKILL.md` with the foundation-step paragraph; the user's playbook `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md` (anchor, "To paste", "Why I report it").
- **Judged against:** the frozen `task.md` (To do 9, 11, 15, 17; *Settlements to record* K8, K9, K12, K13; the projected entries under *Decisions in play*), and the entries the return step writes or corrects, compared with the code at the head.

## Summary

Counts: **1 blocking (Important), 1 Minor, 0 out of scope.**

Most of the step holds against the code and the task:

- Both new facts quote their sources word for word. I fetched both sources at their commits myself.
- The D-114 wording now matches `account-attempt-limits` and `account-routes.ts`.
- Clearing `account-save-sqlite-access` is true of the code.
- The copy rows the step dropped restore the table of the base.
- The two test files belong at the integration level.

The blocking finding: decisions the change writes still carry *Review when*, a field the pinned decision template does not hold and WAY-24 forbids. The step left that field on D-111, an entry it edited in this commit to make it fit the template. It then proposed a question to the human that covers five such entries and misses D-111. For three of those five, D-104 to D-106, no question is allowed, because a recommendation and a precedent in the product already exist.

## Findings

### Important (blocking)

#### 1. D-104, D-105, D-106 and D-111 keep a *Review when* field that WAY-24 forbids; the return step edited D-111 to fit the template, left this field, and proposes a human question that omits D-111 (new thread)

**Anchor:** `foundations/decisions.md:1802` (D-104), `:1816` (D-105), `:1830` (D-106), `:1885` (D-111, the entry this commit edits at `:1886`); rule `.the-way/elements/decisions/template.md:22-38` (the entry's fields), `:65` ("A field stays in the template only while someone or something reads it"); WAY-24 in `.the-way/foundations/decisions.md`.

**To paste:** D-104, D-105, D-106 and D-111 still carry *Review when*, which the decision template does not hold. WAY-24 forbids it: "A decision names no date or condition for its review". The four fields should go in this step. D-111 is missing from the question proposed for the human, although this same commit edited D-111's *Origin* to fit the template.

**Why I report it:**

- *What the field does.* A *Review when* condition such as "The password library or measured container profile changes" (`:1885`) asks for a review that nobody is sent to make. WAY-24's rationale names exactly that harm, and its *violates* example is an entry that carries such a field. The foundation check cannot see it: `foundation_check.py` gives `0 errors` on this head, so only a review catches the field.
- *Where the fields come from.* The base `7012abc` has no *Review when* in `foundations/decisions.md` (`git show 7012abc:foundations/decisions.md | grep -c "Review when"` → 0). This task added six: D-12 `:243`, D-16 `:319`, D-104 `:1802`, D-105 `:1816`, D-106 `:1830` and D-111 `:1885`.
- *What the step did.* It corrected D-111's *Origin* by the template's "Origin" section (report entry 8), but left D-111's *Review when* in place. Its question ("Returned to the orchestrator" 1) names D-12, D-16 and D-104 to D-106 only. If the human answers "drop the fields", D-111 keeps its field with no decision behind it.
- *Why D-104 to D-106 are not a question.* The return step's case for asking is that the definition's projected entries carry *Review when* (definition lines 363, 429 and 747 carry them with "check by" dates). The product already settled how such fields are written. D-01 was projected from the same definition with "**Review when:** Node.js 24 has six months of official support left · check by: 2027-10-30" (definition `:548`), and it entered the foundation without the field.
  - WAY-126 brings in the gate-approved wording "with no record of approval copied from the gate". The cycle has already dropped the "check by" half of these fields, so it does not treat them as approved wording either.
  - So the writer has a recommendation: drop the fields. A question with a ready recommendation is one WAY-114 names as a violation ("an agent asks the human to confirm a choice it already recommends"). Step 13 allows only the questions the foundation step allows, and this is none of them.
- *What the fix costs.* Removing the field lines from D-104, D-105, D-106 and D-111 changes no binding sentence and no meaning, and takes about four lines. For D-12 and D-16, see "The proposed human question" below.
- *Grade.* Important, not Minor. Left as it is, the request would ask the human a question the method does not allow, over an incomplete list of entries, and the foundation would gain a field that its template and WAY-24 reject. This lies within the task: the return step answers for the entries the change writes, and D-111 is one it corrects in this range.

### Minor

#### 2. The new D-44 and styleguide wording binds every button that sends a form to the labels „Logowanie…” or „Zakładanie konta…” (new thread)

**Anchor:** `foundations/decisions.md:859` ("the button that sends a form then reads „Logowanie…” or „Zakładanie konta…” for the corresponding form"); `guidelines/styleguide-browser-view.md:177-180` ("przycisk wysyłający formularz zmienia napis na „Logowanie…” albo „Zakładanie konta…” zależnie od formularza").

**To paste:** As worded, any form's button reads „Logowanie…” or „Zakładanie konta…” while it waits. Only the login and registration forms have such a label, so a later form, for example the password reset of task 21, could not meet the sentence. Naming the two forms ("the login form's button then reads „Logowanie…” and the registration form's „Zakładanie konta…”") would keep K12 without binding other forms.

**Why I report it:**

- The rewrite correctly lifts the false claim that the logout button („Wylogowywanie…”, `src/browser/view/app.ts:108`) and the retry button („Sprawdzanie…”, `:80`) read a login label. Both wait through `setButtonWaiting` (`src/browser/view/controls/button.ts:60-78`), disabled and in `text-disabled`.
- The narrowing stops at "a button that sends a form", not at the two forms K12 names. Read literally, task 21's reset form would have to read one of two labels that do not fit it.
- No player sees anything wrong today, since only two forms exist. The cost is that a later task has to reword D-44 before it can add a form. Minor.

### Out of scope

None.

## The proposed human question (*Review when* of D-12, D-16, D-104 to D-106)

The handoff asks whether the request may carry this question. Step 13 allows only the questions the foundation step allows.

- **D-104, D-105, D-106: no.** The writer has a recommendation, and the product's precedent supports it (finding 1). Drop the fields in the fix, with no question.
- **D-111: no.** No question is proposed for it, and it needs none. Drop the field in the fix (finding 1).
- **D-12 and D-16: the question is admissible, but not in a ready request.**
  - K13 (`task.md:206`) keeps D-12 and D-16 "bez zmian treści" (with their content unchanged) and asks that the access review "wraca przed zamknięciem fazy" (comes back before the phase closes). Its *Source* column leaves the place to the cycle, "w zdaniu wiążącym albo w polu, nie w uzasadnieniu" (in a binding sentence or a field, not in the rationale).
  - Under the pinned the-way, neither place is left:
    - The template has no review field, and WAY-24 forbids one.
    - A binding sentence may not name a stage of the product (`.the-way/elements/decisions/template.md:92-94`, WAY-22, WAY-24).
    - Adding one would also change the content that K13 keeps unchanged.
  - So the second half of K13's meaning cannot hold as an entry of its kind. WAY-134 and the foundation-step paragraph treat that as a question for the human, but carried by a blocked draft request ("the cycle asks the human through a blocked draft request rather than write another entry"), not as a *Questions* item of a request marked ready.
  - Recommendation for that question: drop the two fields, and carry the access review before the phase closes in the project plan (`plan_mvp_loop2.md`, phase "Konta na serwerze testowym"), which by WAY-36 holds stage-bound work. That is the return step's second option. Cost if wrong: if the human wants the reminder kept in the foundation, the two fields go back and stay in conflict with WAY-24.
  - Which route the request takes is the orchestrator's call at steps 12 and 13. I name it so that the request does not carry this question while marked ready.

## Judged and found sound (no finding)

- **`docker-volume-lifecycle`** (`foundations/environment_facts.md:292-296`).
  - Both quoted passages stand word for word at docker/docs 62f6d26, `content/manuals/engine/storage/volumes.md:65-71`.
  - The sentence says no more than they do.
  - D-17 *Based on* (`foundations/decisions.md:338`) and `account-save-durable-storage` *Rests on* (`foundations/invariants.md:667`) need it: both promise the database survives replacement of the container.
- **`fetch-origin-header`** (`:298-302`).
  - All five quoted passages stand at whatwg/fetch e9460d1, `fetch.bs` (the Origin algorithm at `:3703-3745`, `fallbackMode` set to "cors" at `:8880`, the call at `:6229`).
  - The sentence is accurate: for a method other than `GET` and `HEAD` in `cors` mode, the referrer-policy switch is skipped and `Origin` is appended with the serialized origin.
  - The client calls `fetch(path, {...})` with a relative string and no `mode` (`src/browser/account-api.ts:147-155`), so its POSTs take `cors`, as the fact says.
  - D-102 *Based on* correctly names it.
- **D-114** (`foundations/decisions.md:1936`).
  - It now reads like `account-attempt-limits` (`foundations/invariants.md:764`): "only after the password work it started has completed".
  - The code agrees. A duplicate registration releases its ticket without hashing (`src/server/account-routes.ts:234-235`, `:248-249`). A capacity refusal releases after the awaited operation rejects (`:240-246`, `:288-293`). Success or failure settles after `verifyPassword` resolves (`:284-301`).
- **`account-save-sqlite-access` `Violated: no`** (`foundations/invariants.md:681`).
  - `node:sqlite` is the only SQLite access under `src/`: `grep -rln sqlite src/` → `src/server/database.ts`. `package.json` and `package-lock.json` hold no SQLite package (`grep sqlite` empty).
  - The method is `review`, so there is no expected-failure test to unmark (WAY-51).
  - The asymmetry with `account-save-durable-storage`, which stays `yes`, is the one D-17's *Verification* writes down (`foundations/decisions.md:340`). The request must name the clearing (WAY-51), as the step's report says.
- **D-111 *Origin* `none`.** The cycle plan lives under the git-ignored `.runs/`. The template forbids pointing to it and forbids recording the task (`.the-way/elements/decisions/template.md:190-196`). Rationale and Rejected stand in the entry.
- **D-17 and D-102 *Based on*, `account-save-durable-storage` *Rests on*.** Each names a fact that, if it stopped being true, would call the entry into question (template `:44-49`; environment-facts template, "Which facts are written").
- **D-44 and the styleguide, apart from finding 2.**
  - K12 and To do 15 settle the waiting look for "kontrolka, która czeka na odpowiedź serwera" (a control that waits for the server's answer). K12's *What the cycle would otherwise guess* column extends it to the save buttons of task 16, which cannot read a login label. So reading the two labels as form-specific keeps K12's meaning rather than narrowing it.
  - The D-44 wording replaced here was written in this same change, not on `main`, so no approved wording changes. The request still names D-44's new meaning against `main` (WAY-114).
  - The styleguide is consistent with it at `:176-184`, `:198-200`, `:201-205`.
- **`guidelines/coding-browser-module.md:13-24`.**
  - `git diff 7012abc..4e915e8 -- guidelines/coding-browser-module.md` shows only the added Examples prose, so the table is again the base's.
  - The removal follows the template (`.the-way/product-guidelines/coding/template.md:166-169`), WAY-200 and WAY-172.
  - The same rule supports leaving out a copy row for `src/server/account-routes.ts`.
- **`guidelines/testing.md:257`, `:328-333`.**
  - `tests/account-api.test.mjs` runs a real `node:http` server (`:1-30`).
  - `tests/password-measurement.test.mjs` spawns processes and uses `mkdtemp` (`:2`, `:22`, `:40`).
  - Both are integration tests under D-81, and both are in `npm test` through `tests/*.test.mjs` (`package.json:15`).
  - Every `tests/*.test.mjs` file is now listed at some level.
- **Minor findings 13 and 17 of `reports/52-whole-review.md`, kept unchanged.**
  - 13: the sentence at `foundations/invariants.md:624` matches `scripts/measure-passwords.mjs:13-17`, `src/server/measure-passwords.ts:18-20` and `compose.yaml:20` (512m). WAY-60 requires naming the bound, statistic and population. The request must name both wordings, as the report says.
  - 17: the launcher's daemon is the human's host. The step may not change tests.
  - I agree with both decisions.
- **No SameSite fact for D-102.** D-102 cites no source on SameSite behaviour, and its guard against foreign requests is the Origin check, which the new fact covers. I set no finding.
- **Wrapping in `guidelines/styleguide-browser-view.md:182`.** The line runs past the file's usual width. It has no effect on a reader or on the code (WAY-221), so there is no finding.

## Declined to judge

- The `## Examples` prose of `guidelines/coding-browser-module.md:77-106`, which describes `app.ts` and `game-view.ts` (not the exemplar) in normative terms: written by slices 10 and 11, outside this range, and accepted by the whole review.
- The near-duplicate invariants `account-schema-lifecycle` and `account-database-schema` the step observed: outside this range.
- D-111 standing before D-110 in the log: the orchestrator's renumbering after PR 31, outside this range.

## Checks

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git rev-parse HEAD`; `git status --short` | 0 | 574a37b… twice; head 4e915e8…; clean |
| 2 | `git log --format='%H %an %ae%n%B' 40977266..4e915e8`; `git diff 40977266..4e915e8`; `git diff --stat` | 0 | one commit, six files, +30/-22 |
| 3 | `git diff 7012abc..HEAD -- foundations/decisions.md \| grep "^[+-].*Review when"`; `git show 7012abc:foundations/decisions.md \| grep -c "Review when"` | 0 | six fields added by the task; 0 at base |
| 4 | `curl -sS -o volumes58.md <docker/docs 62f6d26 volumes.md>`; `curl -sS -o fetch58.bs <whatwg/fetch e9460d1 fetch.bs>` (in the session scratchpad), then reading the quoted passages | 0, 0 (HTTP 200, 200) | every quoted passage found word for word; both sentences hold |
| 5 | `python -B .the-way/elements/common/foundation_check.py` at the head | 0 | `0 errors`; it does not report *Review when* |
| 6 | `grep -rln sqlite src/`; `grep sqlite package.json package-lock.json` | 0 / 1 | only `src/server/database.ts`; no SQLite package |
| 7 | Manual: `src/server/account-routes.ts:215-303`, `src/browser/view/app.ts:38-125`, `src/browser/view/controls/button.ts:55-78`, `src/browser/account-api.ts:135-160`, `scripts/measure-passwords.mjs:10-22`, `src/server/measure-passwords.ts:14-24` against the entries | — | as under "Judged and found sound" |
| 8 | `reports/56-return-step-gate.log` read for its result (not rerun) | — | Node 429 pass, 0 fail; Python 5 + 66 + 176 + 32; `0 errors`; `docker_exit=0` |

Not run: the full `npm test` through the Linux harness. No evidence is disputed that a test could settle; the finding is about the form of foundation entries, which no test checks. Nothing else was left unrun. No command was refused.

## Reading and reaches

Read whole: the handoff `reports/58-return-review-handoff.md`; the review skill and its project entry point; `reports/56-return-step-handoff.md`; `reports/56-return-step-report.md`; `task.md`; the user's code-review playbook.

Read in part:

- step 11, step 13, "The end of a code review", the foundation-step paragraph and the paragraph on `blocked` of `.the-way/task-cycle/skill/SKILL.md`;
- `reports/52-whole-review.md` findings 4, 5, 6, 13 and 17.

Reaches beyond the handoff, each with its reason:

- `.the-way/foundations/decisions.md`, entries WAY-11, WAY-24, WAY-30, WAY-51, WAY-114, WAY-126, WAY-134, WAY-172 and WAY-200: to judge the return step's corrections and the proposed question.
- `.the-way/elements/decisions/template.md:20-109`, `:190-205`: the fields of an entry, *Origin*, and binding sentences that name no stage.
- `.the-way/elements/environment-facts/template.md:1-80`: the form of the two new facts.
- `.the-way/product-guidelines/coding/template.md:160-173`: the copy-row rule.
- The vault definition `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`: a search for "Review when", and lines 535-550 (D-01's projected entry), to test the precedent behind finding 1.
- The foundation entries D-12, D-17, D-44, D-102, D-104 to D-106, D-111, D-114, `account-attempt-limits`, `account-save-durable-storage`, `account-save-sqlite-access` and `player-argon2-deployment-check`, each read whole at the head.
- `guidelines/styleguide-browser-view.md:160-210`, `guidelines/coding-browser-module.md:1-40` with its headings, and `guidelines/testing.md:245-269`, `:300-340`.
- The product files listed under check 7; `package.json:15`; `compose.yaml` (mem_limit).
- The two outside sources fetched with `curl`, kept as `C:/Users/Mariusz/AppData/Local/Temp/claude/C--Storage-repos-loop2/c03d2664-799c-4af1-901d-6528e8909f2c/scratchpad/volumes58.md` and `C:/Users/Mariusz/AppData/Local/Temp/claude/C--Storage-repos-loop2/c03d2664-799c-4af1-901d-6528e8909f2c/scratchpad/fetch58.bs`; the foundation check's output is `C:/Users/Mariusz/AppData/Local/Temp/claude/C--Storage-repos-loop2/c03d2664-799c-4af1-901d-6528e8909f2c/scratchpad/58-foundation-check.txt`.

Not read: `cycle.md`, as instructed.
