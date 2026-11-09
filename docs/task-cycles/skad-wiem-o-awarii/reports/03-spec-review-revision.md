PASS

# Review of the revised spec `skad-wiem-o-awarii` (reviewer, second look, once)

Compared: `.runs/task-cycles/skad-wiem-o-awarii/spec.md` (revised) against `spec-reviewed.md` beside it, both read through `tr -d '\r'`, with the designer's "Revision" section in `reports\01-designer-report.md`. My earlier report: `reports\02-spec-review.md`. The orchestrator's two answers (the LIMITED line carries the `failure` word `browser`; A4's filter matches the exact starts `{"event":"account-` and `{"failure":"account-block"`) are the ones the revision applies.

Verdict: all four findings are met, nothing outside them and the smaller points changed in substance, and the residual-risk sentence in A4 is accurate. Two small, non-blocking remarks are at the end.

## The diff, whole

`diff` of the two normalised texts shows changes in these places only: A4, B2, C3 table (two rows), C7, D (route-test bullet), E3 step 6, the trust-boundary row for the dump file, the route and watcher test bullets, *Foundation entries* rows 1, 2 and 4, and the last "Observations" bullet. Goals, non-goals, constraints, A1-A3, A5, B1, B3, B4, C1-C2, C4-C6, E1-E2, the other trust-boundary rows and *Left to the maker* are byte-identical. No line outside the list of findings and smaller points was altered, and nothing was added to the design.

## Findings of the first review

1. **The `failure` word of the LIMITED line: met.** B2 now writes it through `writeFailure` with the word `browser`, kind `ReasonedFailure`, code `LIMITED`, the route's place, "so it begins `{"failure":"browser"` like every line this route causes". The C3 table counts under the server kind only lines whose word is not `browser`, and under the browser kind the accepted reports and the LIMITED line, so a flood moves the browser kind and leaves the server kind free. Two tests were added: a route flood case (first refusal writes one LIMITED line, later refusals none) and a watcher case (a stand-in log with a flood of `browser` lines and the LIMITED line raises the browser kind only, one `pusher` call). The line still fits the patterns of B1 (kind letters, code letters and underscore, place letters with `.` and `-`), so invariant row 6 is not strained by it. The browser kind remains spendable by an anonymous sender; that is the accepted cost of a public report route and the global cap of B2 bounds it.
2. **A4's false claim: met.** The claim that every sentence begins with a letter is gone. The filter is the two exact starts, and the stated reason is the true one (two sentences begin with the address, `account-block.ts` lines 91-92; the address is checked only for one `@` with text on both sides). The trust-boundary row and *Foundation entries* row 1 follow.
3. **Row 4 without exception: met.** Row 4 now reads: a deployment that dumps leaves the log there, and one that cannot dump says so in the deploy log and goes on (the dump is non-fatal, A1), with two test cases, one for each. This agrees with A1.
4. **E3 step 6: met.** The human finds the account that last changed the cron line (`git log -1 -- .github/workflows/check-address.yml`, with the squash-merge caveat), sets the notification on that account, runs the trial from it, and reports the scheduled path as unchecked if the trial cannot be run from it.

## Smaller points

- Numbers: rows 1 and 2 of *Foundation entries* now say they are this design's parameters, not findings of the technology reports, and row 2 names D-105's 30 messages an hour as the one precedent for 30 reports an hour. Met.
- `NOT_ROUTES`: the route-test bullet of D names the workflow, `deploy/loop2-watch`, `deploy/loop2-watch.cron` and `deploy/loop2-app.logrotate` ("it counts all four"). C7 now names only the cron file for `NOT_ROUTES`, where it earlier named the script; the two places do not conflict, since D carries the full list. Met.
- Stale count in `guidelines/testing.md`: noted in the route-test bullet and in *Foundation entries*, as scheduled and not edited. Met (see remark 2 for a wider list).

## The sentence added to A4 (residual risk)

Claim: an address would have to begin with one of the two exact starts to pass the filter, which the exact match leaves "to deliberate imitation and not to accident". Checked against the code: `normalizeEmail` (`src/server/account-policy.ts:60`) trims, lower-cases and demands one `@` with text on both sides, so `{"event":"account-...@x` is a registrable address; both exact starts are already lower case, so normalisation does not break the imitation; the two sentences that begin with the address are the only ones that can carry it. So the sentence is accurate, and the harm is small (the sender's own address text lands on a line of the dump, after the human has blocked that very account and appended its output). Two remarks, neither blocking: see remark 1.

## Do the points I had not read whole change a finding? No

I read whole this time: D-102, D-12, D-13, D-17, D-09, D-15, D-110, D-137, D-235 (and D-16, which the spec cites), the environment fact `mikrus-host-docker-workloads`, `guidelines/coding-browser-api-client.md`, and `guidelines/testing.md` from line 171 to the end. Result:

- D-12, D-16, D-09, D-15, D-13: consistent with the spec (every server change is the human's; the deploy script's installed-copy comparison only warns; no user name or secret in repository files; the deploy-account name is left to the private note). Nothing changes a finding.
- D-17 lists, among the few things a deployment may change on the host, "log and lock" of loop2; the new `/var/log/loop2-app.log` is loop2's own log, so the dump fits it. The foundation step that words row 1 may name the new file under D-17 explicitly. Not a finding.
- D-102 and D-110: the report route's own limit sits beside D-102's login limits without touching them; D-110's rule that account requests need the proxy metadata is the gate the route stands behind. Consistent.
- D-137: the human's `account-block` command is unchanged and stays a human's; consistent. D-235: stand-ins prove reactions, the human's trial proves delivery; the watcher's tests and E3 step 4 follow that.
- `mikrus-host-docker-workloads`: observed Docker 28.1.1 (client version); the spec does not rely on the daemon version beyond what it marks as unchecked.
- `coding-browser-api-client.md`: relative `/api/` path, `credentials: "same-origin"`, `redirect: "error"`, success only for the route's own status, bounded wait, no state in the client. B4 meets all of them (the "written once" memory stays in `last-resort.ts`, not in the client).
- `testing.md` after line 170: found that the stale-count problem is wider than the revision says (remark 2). Nothing else changes a finding; the recipe for integration tests names the backup seam `tests/deploy/backup_script_support.py` with stand-ins, which is what the spec's watcher test uses.

## Remarks (non-blocking)

1. Closing the residual risk in A4 costs one more anchor. Every sentence of `account-block` ends with a full stop, and every JSON line it writes ends with `}`. A filter that matches the whole line (the exact start and an end of `}`) would pass no sentence at all, whatever the address. The maker may take this; the spec need not. Also, A4 says the residual risk "is named in the skill", but the list of skill additions in E1 (the *Blocking a player account* bullet) does not ask for it; if the residual risk stays, add that clause to E1 so the builder writes it.
2. The stale count in `guidelines/testing.md` is wider than "siedmiu tras / ósmej": the *Expected results* rows at lines 218-219 list the eight state-changing routes by name, and line 220 says "na dziewięciu trasach" (nine paths today, ten with the report route). The revision's scheduled item should name those rows too, so whoever updates the guideline does not stop at the Trust-boundaries row.

## Checks I ran

The review runs no product check. Reads only, in `the root of the repository`:

- `tr -d '\r' < spec-reviewed.md > old.md`, `tr -d '\r' < spec.md > new.md`, `diff old.md new.md` (copies in the shell's temp directory, not in the repository) — diff exit 1 (differences found, as expected), listing exactly the places above.
- `tr -d '\r' < reports/01-designer-report.md | sed -n '/Revision/,$p'` — exit 0.
- `grep`/`sed`/`awk` reads of `foundations/decisions.md` (D-12, D-13, D-09, D-15, D-16, D-17, D-102, D-110, D-137, D-235), `foundations/environment_facts.md` lines 27-40, `guidelines/coding-browser-api-client.md`, and a Read of `guidelines/testing.md` lines 171-456 — exit 0 each. One earlier call of this kind printed only a preview of a large output; I re-read the file with the Read tool.
- Re-read `src/server/account-block.ts:86-98` and `src/server/account-policy.ts:60` from the first review for the residual-risk check; no new command.

## Searches not found or unclear

- None that changes the verdict. Still not provable from the repository, as the spec itself says: the `docker logs --since/--until` windows, `State.StartedAt` after a restart by policy or reboot, `logrotate` running daily on the host, GitHub's e-mail for a failed scheduled run, and which account GitHub notifies for a manual dispatch.
