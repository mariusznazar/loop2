PASS b4e50b2

# Review of Slice 4, task `potwierdzenie-adresu`: startup requires the mail settings and the SMTP password file

Range `1c335f3..b4e50b2`, one commit `b4e50b2` ("feat: :sparkles: require the mail settings and the SMTP password file at startup"). `git rev-parse HEAD` in the reviewed worktree gave `b4e50b205ee1189e352a0e6ab973828f7117d6e7`, and the worktree was clean. The changed files are exactly the slice's *Change*: `src/server/configuration.ts`, `tests/startup.test.mjs`, `tests/http.test.mjs`, `tests/transport.test.mjs`, `tests/invariants/test_account_server_default_address.py`, `tests/invariants/account_container_support.py`.

Counts: 0 blocking, 2 Minor, 0 out of scope.

## Findings

### Critical

None.

### Important

None.

### Minor

**M1. A password file holding only a UTF-8 byte order mark is accepted as an empty password, and a leading byte order mark is removed without notice.** `src/server/configuration.ts:116-121`.
`readSmtpPassword` checks emptiness on the bytes (`length === 0`) and then decodes with `new TextDecoder("utf-8", { fatal: true })`. That decoder's default `ignoreBOM: false` drops a leading EF BB BF. So a 3-byte file that holds only a BOM passes the byte check, decodes to `""`, contains no control character, and is returned as the password. The slice's Goal and spec Decision 7 both require the file to be "non-empty", and the spec rejects silent changes to the file's content ("refused rather than silently trimmed", "Trimming the password file — hides a rotation mistake until the first failed login"). With a BOM-only file the server starts, and every send then fails at login. That is the late failure the spec chose to prevent, but it only happens for an unlikely file, hence Minor. A BOM before a real password is stripped, which gives the intended password, so that case does no harm; still, the code does not behave as "strict UTF-8, refused rather than altered".
Evidence: a scratch run against the built `dist/server/configuration.js` of `b4e50b2`. `readAccountConfiguration` with a password file of bytes `EF BB BF` returned `mail.password` of length 0 ("bom-only ACCEPTED password-length 0"). With `EF BB BF` followed by `pass` it returned `pass`. The test "the SMTP password file must be a small non-empty UTF-8 regular file…" only covers the byte-empty file `""`.
Possible fix: check that the decoded `password` is non-empty, and refuse a leading BOM or decode with `ignoreBOM: true` so it shows up.

**M2. Login and host validation is looser than D-111's wording.** `src/server/configuration.ts:45-46`.
- D-111 says the login is "printable text … without whitespace". The pattern `/^[^\s\p{Cc}]+$/u` refuses whitespace and Cc controls, but it accepts invisible format characters (Cf), for example U+200B ZERO WIDTH SPACE or U+202E RIGHT-TO-LEFT OVERRIDE. A login made only of `​` (length 1) is accepted.
- D-111 says the host is "a DNS host name". `/^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*$/` accepts labels that begin or end with a hyphen (`-bad-.example`) and labels over 63 characters. This matches the spec's parenthetical "(letters, digits, hyphens, dots)" word for word, and the executor reports it as a choice, so this part is polish.
Effect: such a configuration mistake (most likely an invisible character pasted into a login) shows up as a failed send instead of a refusal at startup. These values come only from the operator, and no header or command injection follows from them: CR, LF and other whitespace are refused.
Evidence: scratch run, "login-rlo ACCEPTED", "login-zwsp ACCEPTED user-len 1", "host-leading-hyphen ACCEPTED", "host-64-label ACCEPTED".

## Against the task, the spec and the foundation

- The nine account settings are required together: if any is supplied, all nine are required, and production always requires all nine (`configuration.ts:30-40,151-156`). The wholly unconfigured non-production mode stays (`readAccountConfiguration({ NODE_ENV: "test" })` returns null, existing test). This matches D-111 and spec Decision 7.
- Validation covers sender, host, port, login and password file. Every refusal is `Invalid or unavailable account configuration: <SETTING>`, and nothing of the value or the file's content is printed: `main.ts:45-47` prints only `error.message`, and `readSmtpPassword` turns every cause into one fixed error. The sender check (printable ASCII, exactly one `@`, none of the specials of Decision 6) uses the same character set as `plainAddress` in `account-mail.ts`. Port: digits only, 1–65535.
- The password file is opened with `O_NONBLOCK`, which guards against a FIFO, must pass `fstat().isFile()`, and is read up to 1025 bytes. A file over 1024 bytes is refused, 1024 bytes are accepted. Decoding is fatal UTF-8, and any `\p{Cc}` character is refused, so LF, CRLF, NUL, TAB and C1 U+0085 are all refused. The file is read once and closed in `finally`. The exception is M1.
- Startup does not contact the mail service. `new SmtpMailer(configuration.mail)` only stores the settings; `send` is the only place that connects (`account-mail.ts:91-98,100-128`).
- `AccountRuntime.mailer` is the seam for stand-in mailers (spec Decision 12). Nothing else builds an `AccountConfiguration` by hand (`git grep` for `publicOrigin:`/`proxyMode:` in `src`, `tests`, `scripts`).
- D-13: the container fixture passes only the path `/run/secrets/loop2_smtp_password` in the environment. The synthetic password lies in the secret volume as root:1000 0440, and the probe checks owner, group and mode. No credential appears in arguments, environment or output.
- Every fixture that opens a runtime supplies the mail settings: `tests/http.test.mjs`, `tests/transport.test.mjs`, `tests/startup.test.mjs`, and the container support. `tests/password-measurement.test.mjs` passes account settings to an entry point that never reads them (its own assertion), so it needs no change. The executor's claim holds. `src/server/account-block.ts` reads only `LOOP2_DATABASE_PATH`, so the block command is unaffected.
- Irreversible operation: this slice holds no schema step. Nothing to prepare here.

Changed invariant tests:
- `tests/startup.test.mjs` (invariant `account-startup-configuration`): the existing partial-set case now iterates all nine names, and there are two new refusal cases.
- `tests/invariants/test_account_server_default_address.py` (invariant `account-server-default-address`): five more stripped variables.
- `tests/invariants/account_container_support.py`: support of the container checks that `test_loop2_one_serving_process_container.py` and `tests/deploy/test_account_storage.py` use.

## Tests

- The new cases fail when the behaviour breaks. With the base `configuration.ts` restored in my scratch worktree, `tests/startup.test.mjs` failed 4 of 15: the partial-set case and the three new cases.
- Expected values come from D-111 and spec Decision 7, as the test comments name. In the full-valid-set case, the password is the fixture's own literal containing non-ASCII characters, so the case also checks UTF-8 decoding.
- The process-level checks start the real entry point (`refusedStart` asserts no readiness line and a non-zero exit) for four settings with sentinel values, and for the password file with a sentinel newline file. Stderr names the setting and does not contain the sentinel. The remaining variants are checked in-process against `readAccountConfiguration`, which is what `main.ts` calls.
- The no-contact check waits a fixed 200 ms after `openAccountRuntime` resolves. For proving that something did not happen there is no signal to wait for, and a loopback connection would arrive well within that time. This is acceptable under `guidelines/testing.md` (integration recipe, Time and randomness), so it is not a finding.
- The directory case of the password file would be refused even without the `isFile()` check, because reading a directory fails anyway. That check only matters for devices and FIFOs, which no test covers. Not graded: the refusal holds either way.

## Author's own-work check

The executor checked that no value is echoed, and that check works. The weaker spot is validation completeness after decoding (M1), which their check would not catch.

## Declined to judge

- `compose.yaml` lacks the five settings and the third secret, so a start of the merged production service from Compose would refuse until Slice 9 adds them. The plan schedules this for Slice 9 and the handoff says so; it is outside this slice.
- The `loop2-deploy` skill's troubleshooting rows for the new settings are To do 11, a later slice.
- The trust-boundary table of `guidelines/testing.md` for the mail boundary is To do 13, a later slice.
- `tests/invariants/test_loop2_one_serving_process.py` fails on the base on this machine, according to the dispatch; not a check of this slice.

## Checks run

All checks ran in a separate detached worktree of `b4e50b2` under my scratchpad, with `node_modules` linked as a junction to the reviewed worktree's. That worktree has been removed and pruned, and the reviewed worktree is untouched.

- `npm test -- tests/startup.test.mjs`: exit 0, 15 pass, 0 fail, 0 skipped.
- The same with `src/server/configuration.ts` from `1c335f3` (failing first): exit 1, 4 fail (the partial-set case and the three new cases), 11 pass. Restored afterwards.
- `npm test -- tests/http.test.mjs`: exit 0, 25 pass, 0 skipped.
- `npm test -- tests/transport.test.mjs`: exit 0, 7 pass, 0 skipped.
- `npm test -- tests/invariants/test_account_server_default_address.py`: exit 0, 1 test OK.
- Docker 29.7.2 answered. `npm test -- tests/invariants/test_loop2_one_serving_process_container.py`: exit 0, 3 tests OK, none skipped; the probe reported "resources verified".
- `npm test -- tests/deploy/test_account_storage.py`: exit 0, 1 test OK, none skipped.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the four JS/TS files: exit 0.
- `prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the same files: exit 0.
- `ruff check --config ruff.toml --ignore-noqa` on the two Python files (venv `.runs/quality-venv`): exit 0.
- `node scripts/build.mjs --check` (typecheck): exit 0.
- Manual scratch probe (`node probe.mjs <worktree>`, a script in my scratchpad importing the built `dist/server/configuration.js`): BOM-only and BOM-prefixed password files, a ZWSP in the password, RLO and ZWSP logins, a leading-hyphen host, a 64-character host label, port `00587`, a sender with a trailing space, and a production full set. Results are quoted in M1 and M2. The sender with a trailing space was refused. Port `00587` and the production full set were accepted.
- Not run: the full gate (the orchestrator's), and `tests/invariants/test_loop2_host_sharing.py` and `compose.yaml`, which are not in this slice.

## Reaches beyond the dispatch

- `src/server/account-block.ts`, its `LOOP2_` and `process.env` uses: to check whether the block command reads the account configuration and would now need mail settings. It does not.
- `tests/password-measurement.test.mjs:60-76`: to verify the executor's claim that its fixture needs no mail settings. It holds.
- `scripts/test.py`: to learn how a single-file run builds, so that it could run in a separate worktree.
- `git grep` for `LOOP2_PROXY_MODE` and `LOOP2_SESSION_SECRET_FILE` across the repository, excluding the foundation and `.the-way`: to find any other fixture or document that configures accounts. Only `compose.yaml`, `test_loop2_host_sharing.py` and the `loop2-deploy` skill remain, all assigned to later slices.
