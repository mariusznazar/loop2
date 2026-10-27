FAIL bf36040ed5f916a01fea53af4ae0bc3c779bad5b

# Independent review of the whole change: player accounts and login

- Range: `7012abcfb55b4ba2b2836b574a2275eb1551df28..bf36040ed5f916a01fea53af4ae0bc3c779bad5b` (32 commits, 61 files). `git rev-parse HEAD` = bf36040ed5f916a01fea53af4ae0bc3c779bad5b. `.the-way` checkout and gitlink both 574a37b9ab9572f876298f4cc10754581222d3f0.
- Method: `.claude/skills/the-way-review-change/SKILL.md` → `.the-way/task-cycle/review/SKILL.md` (sections 1–6, with section 5 for the whole change), and the user's playbook `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md` for the shape of each finding.
- Counts: **blocking 1** (Important), **Minor 16**, **out of scope 5** (one finding plus four lines of Declined to judge).

## Summary

The server code holds up against crafted input. I checked HTTP bodies and headers, session and cookie forgery, Origin and proxy spoofing, limits and capacity, and persistence. I found no defect a hostile client can use:

- The transport gate (`router.all`) stands before every method of the four account paths.
- The session middleware runs only for requests whose transport is verified.
- The Origin, media-type and body guards come before any password work or write.
- Identity comes only from the stored session.
- Admission reservations are taken before asynchronous work.
- The unique-email race resolves to 409 through `ON CONFLICT DO NOTHING`.
- `touch` cannot resurrect a destroyed row.

The change also only prepares the operations that cannot be undone. Nothing in the range runs on the server. The measurement launcher runs only on the daemon the human points it at, and it refuses an image whose revision label is not the given commit.

The one blocking finding is in the human sequences of the `loop2-deploy` skill (slice 13). The rotation and retirement blocks are guarded by a `case` line that prints `STOP` and does not stop. Pasted as written, the retirement block turns a one-key file into invalid JSON and installs it over the live file. I reproduced this in a scratch shell. The next deployment, which any push to `main` starts, then stops the application with exit 8.

## Findings

### Important (blocking)

#### 1. The STOP guard of the key rotation and retirement blocks prints a warning and runs the remaining lines anyway; retirement on a one-key file installs invalid JSON (new thread)

**Slice:** 13 (`19695d6..bf36040`, commit bf36040).

**Anchor:** `.claude/skills/loop2-deploy/references/setup_and_secrets.md:153` and `:160` (rotation); `:181` and `:188` (retirement). Byte-identical twin: `.agents/skills/loop2-deploy/references/setup_and_secrets.md`, same lines.

**To paste:** The `case … *) echo "STOP…" ;; esac` line does not stop the block, so the `mktemp`, `printf` and `chown … && mv` lines that follow it still run. On a file with one key, the retirement block writes `["<key>"]]` over `/etc/loop2/session-secrets`. The next deployment then refuses to start the application (exit 8). Making the guard abort — for example `*) echo "STOP…"; false ;; esac &&` chained into the remaining lines, as the creation block already chains with `&&` — closes this.

**Why I report it:**

- *What the code is for.* Task To do 16 and K11 have the skill tell the human how to rotate and retire session keys without signing players out. The handoff asks whether the human sequences are safe and correct. The blocks are fenced shell, written to be pasted into a root shell on the server.
- *Mechanism.* The guard is an `echo` inside `case`. Nothing makes the later lines depend on it. A block pasted into bash is read line by line from the paste buffer, so every line runs whatever the guard printed. The prose under each block ("When it printed STOP, do not run the last three/four lines") assumes the human runs the lines one at a time and reads the output in between. The fence invites the opposite. The creation block (`:131-135`) shows the author knew the safe form, because there every step is chained with `&&` behind `test ! -e`.
- *Example, reproduced (scratch check 4 below).*
  - The file holds `["AAAA…A"]`, one key of 43 characters.
  - The retirement block runs as one script. It prints `STOP: fewer than two keys, or not the one-line form`, exits 0 and leaves `["AAAA…A"]]` in the file. `JSON.parse` rejects it.
  - The rotation block's guard has the same flaw. Its realistic outputs stay valid JSON for the one-line and pretty-printed forms. A `[]` file gives `["<new>",]`, which is invalid.
- *Consequence.*
  - The running container keeps the old file through its bind mount (the old inode), so nothing shows at once.
  - The next `loop2-deploy` force-recreates `app`. Pushes to `main` start one automatically. `readSecrets` (`src/server/configuration.ts:36-78`) then throws `Invalid or unavailable account configuration: LOOP2_SESSION_SECRET_FILE`, health fails and the deployment ends with exit 8. Exit 8 is documented as possible partial availability.
  - Recovery needs the human to rebuild the file from the private note. The prose then says "Update the private note". A human following it after the block has run copies the broken content into the note too. The key text is still recoverable from it, but only by hand.
- *Grade.* Important, not Critical: no data is lost, and the outage needs the human to run the retirement on a one-key file (or the rotation on an unexpected form). It blocks because the defect is in the safety mechanism the task asked this slice to provide (To do 16). The guard claims to protect and does not.
- *Possible fix* (`:178-185`, the same shape for rotation):

  ```sh
  f=/etc/loop2/session-secrets
  ( umask 077
    current=$(cat "$f") &&
    case $current in '["'*'","'*'"]') ;; *) echo "STOP: fewer than two keys, or not the one-line form"; false ;; esac &&
    tmp=$(mktemp /etc/loop2/.session-secrets.XXXXXX) &&
    printf '%s]\n' "${current%,\"*}" > "$tmp" &&
    chown root:1000 -- "$tmp" && chmod 0440 -- "$tmp" && mv -T -- "$tmp" "$f" )
  stat -c '%U %g %a' "$f"
  ```

  The subshell also keeps `umask 077` out of the human's root shell; today `umask 077` at `:151` and `:179` stays set for the rest of that session. Then drop the "do not run the last N lines" sentences, or reword them to "nothing was changed".

### Minor

#### 2. `account-request-transport` is tested only on `GET /api/account`; a regression that removes the gate from `POST` routes passes the suite (new thread)

**Slice:** 8 (`9490083..f34ed3f`; recorded as review-kept in `guidelines/testing.md:165`), with the test from slice 5.

**Anchor:** `tests/transport.test.mjs:160-210`; gate `src/server/account-routes.ts:153-164`.

**To paste:** The invariant says refusal comes "before session authorization or password work", but the only cited case sends `GET /api/account`. Changing `router.all` to `router.get` at `account-routes.ts:153` would let `POST /api/session` without proxy metadata run Argon2 verification and still leave every test green. One `POST /api/session` variant in the existing loop would catch it.

**Why I report it:**

- I verified by source that the gate is `router.all` over all four paths, so the code is right today. `guidelines/testing.md:165` openly assigns the POST half to review, so this is not hidden.
- *Mechanism of the regression.* Without the gate, `response.locals.accountClientAddress` is null. The session middleware is skipped (`app.ts:43`). The mutation guards pass, admission keys on `null`, `verifyPassword` runs, and only `regenerate` on the missing session fails, with a 500.
- The fix costs one more request per variant in an existing loop.
- Minor, because the fault needs a later code change and the behaviour today is correct.

#### 3. The registration branch of `account-attempt-tracking` is untested (regrades `reports/40-credentials-review.md` Minor 4)

**Slice:** 7 (`480309c..9490083`).

**Anchor:** `src/server/account-policy.ts:186`; case `tests/http.test.mjs` "full limiter tables refuse newcomers without evicting a live restriction".

**To paste:** The capacity check of `admitRegistration` (`account-policy.ts:186`) is reached by no test, so removing it leaves the suite green, although the invariant covers "an attempt that needs a new key". One registration from a third address in the existing capacity-2 case would cover it.

**Why I report it:** I agree with the slice reviewer's analysis, and I verified the check by source. Harm is bounded: an admitted registration that releases is forgotten at once, and growth needs created accounts at five per hour per address. The testing guideline already records this as review-kept. Minor.

#### 4. `account-save-sqlite-access` stays `Violated: yes`, though the server uses `node:sqlite` only and its sentence names nothing beyond that (new thread)

**Slice:** foundation step and slice 8 (kept); none fixed it.

**Anchor:** `foundations/invariants.md:672-681` (Violated at `:680`).

**To paste:** The sentence says only that the server reaches its SQLite database through `node:sqlite` rather than an external driver. That is true of `src/server/database.ts:2`, `package.json` and the production image (`tests/deploy/test_account_storage.py`). What keeps it violated? If nothing, the return step could clear it through `the-way-record-invariant`, naming the clearing in the request.

**Why I report it:**

- Slice 8 kept it with "the sentence also covers the save server, and the plan puts image evidence in a later slice" (`reports/43-evidence-report.md:86`).
- Slice 12 then supplied the image evidence. The save server is the same process and has no other driver.
- A `yes` that is not true sends a later task looking for a violation that does not exist. This errs toward caution, so Minor.

#### 5. D-44 and the styleguide say the waiting state applies only to a button that sends a form, reading „Logowanie…” or „Zakładanie konta…”; the code also puts „Wyloguj” and „Spróbuj ponownie” into it with other labels (new thread)

**Slices:** 10 (be82211, styleguide and D-44) and 11 (9c2173d, `app.ts`).

**Anchor:** `foundations/decisions.md:859` (D-44 binding sentence); `guidelines/styleguide-browser-view.md:176-185`, `:198-200`; code `src/browser/view/app.ts:80`, `:108`.

**To paste:** D-44 binds the waiting button's label to „Logowanie…” or „Zakładanie konta…” "for the corresponding form", and the styleguide says loading applies only to "zwykłego przycisku, który wysyła formularz". Yet the header button shows „Wylogowywanie…” and the retry button „Sprawdzanie…”, neither of which sends a form. Could the decision and the styleguide name the waiting state of any button that waits for the server, with these two labels?

**Why I report it:**

- The spec requires a waiting state for logout (§7). The look is the same: disabled, with `text-disabled`. So players see nothing wrong.
- The cost is the foundation. Task 16 will read D-44 to decide how save buttons wait (K12, "What the cycle would otherwise guess"). The present wording says such a button cannot wait, or must read a login label.
- The kitchen-sink page also shows only the two form samples, so the styleguide's rule "every state of every shared control on the page" covers the logout and retry waiting states only through the same button control.

#### 6. `copy` rows were added to the browser-module table without the audit WAY-200 requires, including two files this task never changed (new thread)

**Slices:** 10 (be82211: `controls/button.ts`, `controls/number-field.ts`, `controls/select-list.ts`, `controls/text-field.ts`) and 11 (9c2173d: `account-screen.ts`, `game-view.ts`). Slice 10's rows were mandated by the plan's Goal ("update existing browser-module copy listings"). This is a defect the plan mandated.

**Anchor:** `guidelines/coding-browser-module.md:16-25`; rule `.the-way/product-guidelines/coding/template.md:166-169`.

**To paste:** The template says a file added after the audit "takes no row until the guidelines are refreshed or extended" through `maintain-coding-guidelines`, which judges and compares each file before giving it `copy`. Nobody compared `number-field.ts` and `select-list.ts`, which this task did not touch, yet they now read as good models. Could these rows wait for that audit?

**Why I report it:**

- A `copy` row is advice to future authors ("write yours like this").
- Under WAY-200 it rests on a comparison and on the human's approval of the exemplar decision. Here it rests on neither.
- No user effect; the cost is unearned authority in a guideline. Minor.

#### 7. The skill overstates what removes the account volume, and states as fact an exit code that was not checked (new thread)

**Slice:** 13 (bf36040).

**Anchor:** `.claude/skills/loop2-deploy/references/setup_and_secrets.md:208-209`; `.claude/skills/loop2-deploy/SKILL.md:119-120` and `:123-124`; twins under `.agents/skills/loop2-deploy/`.

**To paste:** `docker compose down` removes named volumes only with `-v`, so the sentence "`docker compose down` … remove it when no loop2 container references it" is not right as written. Whether `docker volume prune` and `docker system prune --volumes` touch a named volume depends on the Docker version (since 23.0, only with `--all`). The executor's report also says that Compose's behaviour on a missing secret file was not checked (`reports/51-deploy-skill-report.md:55`), yet `SKILL.md:120` states exit 8 as fact.

**Why I report it:**

- The direction is cautious: the skill forbids all of these commands, and the task's own cost note (Q15) states the prune hazard. So nobody loses data by following it.
- The facts are still wrong or unverified, in a skill that agents cite back to the human as diagnosis.
- Minor. A fix is "with `-v`", "on Docker before 23.0 or with `--all`", and "the deployment fails (exit 8 expected)".

#### 8. The assertion message says "touches", but the assertion checks only "not rewritten" (regrades `reports/36-session-review.md` Minor 2)

**Slice:** 6. **Anchor:** `tests/http.test.mjs:392`.

**To paste:** As in report 36: the message claims a renewal, but only `data` is compared, and `expires_at` is never checked.

**Why I report it:** It still stands at head. The renewal itself is covered by the transport test of rolling static responses, so this is a message that claims more than it checks. Minor.

#### 9. The race and parallel-reservation cases do not assert that their requests overlapped (regrades `reports/40-credentials-review.md` Minor 3)

**Slice:** 7. **Anchor:** `tests/http.test.mjs`: the duplicate race in "one normalized address holds one account…", the twentieth/twenty-first attempts in "one client address is admitted twenty failed logins…", and the fifth/sixth registrations in "one client address creates five accounts…". `inFlight` is asserted only in the disconnect case (`:1289-1303`).

**To paste:** As in report 40: on a slow runner the pairs run one after the other, and the cases stay green without exercising the lost-insert branch or the reservations.

**Why I report it:** It still stands. Overlap is near certain locally against more than 100 ms of Argon2, so this is Minor.

#### 10. Unpaired UTF-16 surrogates reach Argon2 as U+FFFD, so passwords that differ only there verify each other (regrades `reports/40-credentials-review.md` Minor 5)

**Slice:** 7. **Anchor:** `src/server/account-policy.ts:29-32`.

**To paste:** As in report 40: refusing `!password.isWellFormed()` as `invalid-password` would keep D-96's "content preserved" true for crafted clients.

**Why I report it:** It still stands; there is no `isWellFormed` anywhere in `src/server`. A browser cannot produce such a string, and the collision is only with the attacker's own odd password. Minor.

#### 11. A table full of live entries costs a full sweep for every refused newcomer (regrades `reports/40-credentials-review.md` Minor 6)

**Slice:** 7. **Anchor:** `src/server/account-policy.ts:232-241`.

**To paste:** As in report 40.

**Why I report it:** It still stands. This is an availability cost after the table is first filled, and the sweep time is unmeasured. Minor.

#### 12. The container resource probe still checks `/app/data`, while its helper takes the mount point as a parameter (regrades `reports/48-measure-review.md` Minor 2)

**Slice:** 12. **Anchor:** `tests/invariants/account_container_support.py:29-38` against `:110-131`.

**To paste:** As in report 48.

**Why I report it:** It still stands, but it bites only if `compose.yaml` moves the mount. Minor.

#### 13. `player-argon2-deployment-check` no longer carries the wording the readiness gate approved (regrades `reports/48-measure-review.md` Minor 3)

**Slice:** 12. **Anchor:** `foundations/invariants.md:622-631`; source `task.md:165` ("Zadanie zapisuje w całości").

**To paste:** The task carries the projected sentence "…within its memory budget" to be written whole. The entry now fixes "two at a time", "512 MiB" and "below 80%", which the spec itself calls engineering choices (§6). The request must name the old and new wording, so the owner accepts the changed meaning at the merge.

**Why I report it:**

- Section 5 of the method asks for fidelity to the task's sources. This is the only one of the ten projected invariants and three projected decisions whose wording changed; I compared all thirteen with `task.md:156-170`.
- The new wording is a refinement, not a reversal, and the request is where the human accepts foundation changes. So it is Minor on the condition that the request names it.

#### 14. When docker fails, the launcher reports the step but not docker's reason (regrades `reports/48-measure-review.md` Minor 4)

**Slice:** 12. **Anchor:** `scripts/measure-passwords.mjs:65-76`, `:178-187`, `:223-232`.

**To paste:** As in report 48.

**Why I report it:** It still stands, and it matters most over `DOCKER_HOST=ssh://`, where the likely failures are authentication and permission. Minor.

#### 15. An interrupted launcher leaves its container on the shared host, and the skill gives no way to find it (regrades `reports/48-measure-review.md` Minor 5)

**Slices:** 12 and 13. **Anchor:** `scripts/measure-passwords.mjs:199-240`; the skill's "What it changes on the server" at `.claude/skills/loop2-deploy/references/setup_and_secrets.md` (the paragraph after step 3 of the measurement section). That paragraph promises removal "also after a failure", which does not hold if the launcher process itself is stopped.

**To paste:** As in report 48, plus: the skill should say `docker ps -a --filter name=loop2-password-measure-` and `docker rm -f <name>` for a stopped launcher.

**Why I report it:** It still stands, now also in the human text. The container is bounded at 512 MiB by the entrypoint's own deadline. Minor.

#### 16. The label test pins the exact problem text (regrades `reports/48-measure-review.md` Minor 6)

**Slice:** 12. **Anchor:** `tests/password-measurement.test.mjs:270-272`.

**To paste:** As in report 48.

**Why I report it:** It still stands. This is a detail of the implementation (`guidelines/testing.md:139-140`). Minor.

#### 17. The part map does not list the launcher among the trust boundaries of build-tools (regrades `reports/48-measure-review.md` Minor 7)

**Slice:** 12. **Anchor:** `foundations/part_map.md:102-104`.

**To paste:** As in report 48: `scripts/measure-passwords.mjs` takes in the answers of the server's Docker daemon, and its verdict is what clears an invariant.

**Why I report it:** It still stands. Minor.

### Earlier Minor findings that no longer stand (not counted)

- `reports/36-session-review.md` Minor 3 (sessionless logout with a body gets 400): fixed. The invariant now reads "for `POST /api/logout` that meets the Origin, media-type and body requirements" (`foundations/invariants.md:692-701`), and the table row says the same (`guidelines/testing.md:181`).
- `reports/36-session-review.md` Minor 4 (comment naming a later slice): fixed. The comment is gone from `account-routes.ts`.
- `reports/40-credentials-review.md` Minor 2 (settlement wording for attempts without password work): fixed. The invariant reads "the password work it started" (`foundations/invariants.md:764`). D-114 still reads "when its password work has completed" (`foundations/decisions.md:1936`); the orchestrator will align it at the return step, and I agree.
- `reports/48-measure-review.md` finding 8 (`tests/password-measurement.test.mjs` missing from `guidelines/testing.md`): the orchestrator will add it at the return step, together with `tests/account-api.test.mjs` and the copy row for `account-routes.ts`. I judge these the same way and do not count them.

### Out of scope

#### 18. The Polish meaning of `account-attempt-limits` in the report text narrows its window (regrades `reports/42-slice7-rereview.md` Minor note)

**Anchor:** `reports/39-credentials-report.md:251`, `reports/41-slice7-fix-report.md` ("Corrected Polish meaning").

**Why I report it:** It still stands, but it lives in report text, not in a commit of the range, so it is outside this review's code. It must be right in the request text the human reads. I keep it as out of scope.

## Declined to judge

- A table of client addresses filled by IPv6 rotation refuses legitimate newcomers for 15 minutes. D-101 accepts this in its rationale ("a full table can refuse legitimate newcomers"), and task Q7 accepts the cost of easily bypassed IPv6 limits.
- Cloudflare Workers, transforms removing the visitor's IP headers, and Pseudo IPv4 on the real zone. They cannot be inspected from the repository; D-108 assigns them to target acceptance.
- Preservation of saved game states in `account-save-durable-storage`. That belongs to task 16, and the entry correctly stays `Violated: yes`.
- The human's public journey, the target-image Argon2 measurement and the Windows gate. They are human or orchestrator actions after this review, and the request stays blocked until they exist.

## Other judgments made (not findings)

- **Slice 11 cleared Violated** on `player-self-registration`, `player-password-login`, `email-verification-nonblocking` and `loop2-shared-public-origin`. These are review-method sentences about the product's behaviour. Code, tests and the local HTTPS journey meet them, and `compose.yaml:14` sets the origin that D-10 names. I accept the clearing. Under WAY-51 the request must name each clearing, and the public journey stays an acceptance criterion of the request, not of these entries.
- **Polish sentences that the task does not fix** (slices 9 and 11): „Sesja wygasła albo nie istnieje. Zaloguj się.”, „Brak połączenia z serwerem. Spróbuj ponownie.”, „Serwer nie mógł obsłużyć żądania. Spróbuj ponownie.”, „Podaj adres e-mail w postaci nazwa@domena.”, „Hasło musi mieć od 12 do 128 znaków.”, „Powtórzone hasło różni się od hasła.”, „Nie udało się zalogować. Spróbuj zalogować się ponownie.”, „Nie udało się wylogować. Spróbuj ponownie.”, „Sprawdzanie logowania…”, „Sprawdzanie…”, „Wylogowywanie…”.
  - The spec leaves "warning text beyond required messages" to the maker (§ Left to the maker).
  - The three required messages are verbatim (K5, K7).
  - The registration-failure message does not claim the account never existed (spec §2).
  - I find none misleading. They still belong in the request for the human to see.
- **Slice 10 left `decisions.md` and `part_map.md` unchanged with a reason; slice 12 left the Dockerfile unchanged.** I found nothing the slices needed there that is missing.
- **Changed invariant tests**, named under section 2:
  - `tests/invariants/test_account_server_default_address.py`: the explicit non-production, no-account-settings precondition of the D-109 amendment.
  - `tests/invariants/test_loop2_host_sharing.py` and `tests/invariants/test_loop2_container_isolation.py`: the own volume and the app-only secret are allowed. `volumes` moved from the forbidden service keys to `volume_problems`, which allows only `accounts:/app/data` on `app`.
  - `tests/invariants/test_loop2_one_serving_process_container.py` and `tests/invariants/test_loop2_container_icons.py`: production resources through `start_production_container`, still `--init` and 512 MiB.
  - `tests/startup.test.mjs`.
  - I found no weakened assertion. Each change has a cause on the requirement side (D-109, D-17, D-13).
- **Own-work checks of the slices without their own review** (8, 9, 10, 11, 13):
  - Slice 8 named its two weakest points itself (findings 2 and 3 above).
  - Slices 9, 10 and 11 checked their client and UI contracts with mutations (logs 44, 46) and screenshots. I inspected the screenshots of the forms, login waiting, headquarters with „Wyloguj” beside the title, uncertain logout and local registration errors. Each shows the state that D-44, the styleguide, K1 and K2 require.
  - Slice 13 checked paths, decisions and twin bytes, but did not run its own shell sequences. That is exactly where its weakest point lies (finding 1).

## Checks

| # | Command or method | Exit / result |
|---|---|---|
| 1 | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0; bf36040…; 574a37b… twice |
| 2 | `git log --oneline 7012abc..bf36040`; `git diff --stat 7012abc..bf36040`; per-path `git diff` of `src/server/**`, `src/browser/**`, `compose.yaml`, `Dockerfile`, `package.json`, foundations, guidelines, the deploy skill, and the changed invariant tests | 0 |
| 3 | `python -B .the-way/elements/common/foundation_check.py` (read-only, at head, in the reviewed worktree; `git status --short` empty before and after) | 0, `0 errors` |
| 4 | Scratch shell in the session scratchpad: the retirement block of `setup_and_secrets.md:177-185` copied verbatim except the `chown`/`chmod`/`stat` steps (non-root) and with the file path pointed at a scratch file holding one 43-character test key; run as `bash keys/retire.sh`, then `node -e "JSON.parse(…)"` on the result. The same for the rotation block on a one-key file and on `[]`. | retire: exit 0, printed STOP, file became `[…]]`, `INVALID JSON`. Rotate on one key: valid two-key array. Rotate on `[]`: STOP printed and `["<new>",]` written. The keys were synthetic, not secrets. |
| 5 | Manual: screenshots `reports/46-shell-forms.png`, `46-shell-login-waiting.png`, `46-shell-headquarters.png`, `46-shell-logout-uncertain.png`, `46-shell-register-local-errors.png` | They show what each name says (see above) |
| 6 | Source inspection (not executed evidence) of the trust boundary: `src/server/app.ts`, `transport.ts`, `account-routes.ts`, `account-policy.ts`, `database.ts`, `session-store.ts`, `passwords.ts`, `configuration.ts`, `main.ts`, `scripts/measure-passwords.mjs`, `src/browser/account-api.ts`, `src/browser/view/app.ts`, `account-screen.ts`, `game-view.ts`, `clock.ts`, `controls/button.ts`, `controls/text-field.ts` | Findings above; no crafted-input defect found |

Not run, each unverified:

- **`npm test` through the Linux harness.** No evidence is disputed. The cycle's own gate at this head passed (`reports/51-deploy-skill-final.log`: 279 Python tests in 4 directories, foundation check 0 errors; Node 429/429 per report 51), and the method and handoff leave the full suite to the cycle. Finding 1 is a text-against-behaviour finding shown by check 4, which needs no product test.
- **Compose's behaviour on a missing `file:` secret.** No Docker daemon was used here, so finding 7's exit-8 point stays unverified either way.
- **Any server, Cloudflare or target-image command.** Forbidden by the handoff and D-12.
- **The Windows gate.**

## Reading and reaches

Read whole:

- the handoff;
- `task.md`, `spec.md` and `plan.md`;
- the review method;
- the playbook;
- `guidelines/testing.md` and `guidelines/coding.md`;
- every new and changed decision, invariant, environment fact and part-map entry of the range, read through the range's diff with full entry text;
- `.the-way/product-guidelines/reading.md` (opening sections);
- "Reading the foundation" in `.the-way/elements/common/way_of_working.md`.

Selection limit: the touched parts (account-server, browser-view, build-tools, deployment, agent-workflow) together cover almost the whole decision log. I read every decision and invariant the range writes or changes, and those the task names in *Decisions in play* through their quoted text. I did not reread unchanged older decisions of those parts whole (for example D-28 to D-33 and D-73 to D-89). I also did not read the new kind guidelines (`coding-password-hashing.md`, `coding-database-access.md`, `coding-session-store.md`, `coding-account-policy.md`, `coding-browser-api-client.md`) whole. Their slice reviewers and the foundation check covered them, and I found no finding that depends on them. This is a stated limit of this review, not a pass of those files.

Reaches beyond the dispatch:

- `.the-way/foundations/decisions.md` WAY-200, and `.the-way/product-guidelines/coding/template.md:166-169`: to judge the copy rows (finding 6).
- `reports/36`, `40`, `42` and `48`, at the Minor findings the dispatch lists: to regrade them.
- `reports/43-evidence-report.md:86`: the reason for keeping `account-save-sqlite-access` violated (finding 4).
- `reports/46-shell-report.md:124`, `:152` and `reports/45-controls-report.md`: the WAY-200 tension and the controls' rows.
- `reports/47-measure-report.md:203-216` and `reports/51-deploy-skill-report.md` (Checks and the human sequences): what slices 12 and 13 claimed and ran.
- `reports/51-deploy-skill-final.log` tail: the last gate result at head.
- `deploy/loop2-deploy`, `grep` for `compose`, `exit` and `fail`: the exit codes the skill cites and the probe path.
- `tests/invariants/account_container_support.py`, `grep`: `--init` and the probe path (finding 12).
