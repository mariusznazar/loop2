# Report — spec designer, task `potwierdzenie-adresu`

- Status: done
- Spec: `.runs/task-cycles/potwierdzenie-adresu/spec.md`
- Method: `.the-way/task-cycle/spec/SKILL.md` and `design.md` (pin `3aee7d9`), designer variant.
- Worktree head read: `7a633a7`.

## Questions sent and their answers

None sent. Every open point is a design choice the task hands to the cycle ("sposób wybiera
cykl", *Questions carried to cycle*) or a reading the task and foundation settle; where the
task's words allow two readings I picked one and wrote it down (check 4 below). The orchestrator
may want to confirm these choices of mine, each reversible before code and named with its cost in
the spec:

1. Every attempted message counts towards D-105, also a failed one (spec Decision 1). If only
   successful sends should count, the link row would be removed or excluded on failure.
2. A failed send leaves earlier links valid and its own link usable; earlier links are spent only
   after a successful send (Decision 3) — my reading of K1 "wysłanie nowego odnośnika unieważnia
   wcześniejsze".
3. Confirming spends every confirmation link of the account, so opening an older message after
   confirmation shows „Odnośnik jest nieważny albo wygasł.” (Decision 3).
4. In the header row the outcome sentence replaces „Adres e-mail niepotwierdzony.” and the button
   stays beside every sentence (Decision 10) — reading of To do 6 "stoi tam".
5. The mail settings join the account settings, all-or-nothing in every mode (Decision 7) — reading
   of To do 10 "jak dziś przy kluczach sesji"; every test fixture that configures accounts then
   supplies synthetic mail settings.
6. The schema's purpose constraint admits `password-reset` already (Decision 3), so task 21 needs
   no table rebuild; no reset code is written.

## Ways weighed

- D-105 counters: database rows of the link table (chosen) vs process memory like D-103 (a
  deployment within the hour lets up to 30 more messages through, and it needs D-103's
  bounded-table machinery) vs a separate counter table (duplicates the link rows).
- Token and link: digest-only storage with the token in the fragment of `/` (chosen) vs a query
  parameter (reaches Cloudflare and server request logs, against OWASP) vs a path (logged, and
  `express.static` answers 404, `src/server/app.ts:58`); clear storage and slow hashes rejected.
- Schema version 3: a nullable confirmation time on `accounts` plus one link table with a spent
  mark (chosen); deleting rows on use or block rejected (loses the D-105 record); a
  confirmation-only purpose rejected (task 21 would rebuild the table, which D-112 rejects).
- Outcome at registration: the registration answer waits for a send bounded at 10 s under the
  client's 15 s (chosen; the cost the human named in answer 8) vs a background send with polling
  (state, a route or field and a poll loop for a 1–3 s wait) vs the page requesting the first send
  (no message for a registration whose page did not follow up; against To do 1; a way the human
  never saw).
- Route outcome form: one `confirmationMessage` value in both the 201 and the resend 200 body
  (chosen) vs error statuses on resend and a body value on registration (two representations).
- Roles: „Wysłaliśmy…” and „Potwierdzanie adresu…” in `text-secondary` (chosen; the latter matches
  „Sprawdzanie logowania…”, `src/browser/styles.css:186`) vs `positive` for „Wysłaliśmy…” (reads as
  done while the address is still unconfirmed, D-39).
- Mail configuration: part of the account settings (chosen) vs a separate optional group with a
  mail-off mode outside production (a second incomplete mode beside D-111's one).
- Mailer structure: one file, composition plus SMTP send (chosen) vs composing in the route, or two
  files.
- Testing SMTP: a real loopback SMTP server from the `smtp-server` devDependency for the mailer,
  a stand-in mailer at the seam for route tests (chosen, D-84: controlled outcomes test the route's
  reaction, the mailer's own tests prove the SMTP operation).

## The four checks

1. Placeholders or empty sections: none; `<adres>` and `<token>` are the task's own placeholders.
   Fixed during the check: a dangling cross-reference after renumbering.
2. Contradictions: found and fixed one — the goal and an invariant candidate said a link works
   "only while it is the newest successfully sent one", which contradicted Decision 3 (a failed
   newer send leaves the earlier link and itself usable); both now say "until a later message of
   its account has been sent". No decision contradicts the task or the foundation; two foundation
   texts are read rather than changed and named in the spec: D-96's "immediately enters" read as
   "without a confirmation step" (the bounded wait is answer 8's accepted cost), and D-105's "at
   most" read as counting attempts.
3. Scope: one feature, but large and spanning five parts (account-server, browser-view,
   deployment, agent-workflow, product-foundation) plus three guideline maintenance skills. The
   guideline work (To do 8, 12, 13) and the deploy skill text (To do 11) are separable from the
   code; spec Decision 12 lists units that suggest slices. Not several independent changes: the
   routes, schema, mailer, configuration and browser depend on one another.
4. Two readings, each settled in the spec: the header row's one sentence versus two (Decision 10);
   whether "sending a new link" invalidates on attempt or on success (Decision 3); whether mail
   settings are optional outside production (Decision 7); the body's „ / ” as paragraph breaks with
   the link on its own line (Decision 6); where the confirmation result stands and when it leaves
   (Decision 10).

## Reaches beyond the dispatch

- npm registry, `https://registry.npmjs.org/nodemailer` and `https://registry.npmjs.org/smtp-server`
  — to confirm that Nodemailer 10 exists (latest 10.2.1, 2026-10-22, no runtime dependencies) and
  that `smtp-server` (latest 3.21.1) depends on the same `nodemailer` 10.2.1, for the testing design.
- Nodemailer 10.2.1 package source, `dist/cjs/smtp-connection/index.js` (option comments near lines
  141–147, EHLO/STARTTLS handling near 1516–1537) — the documentation page
  `https://nodemailer.com/smtp/` answered 404; read to confirm that `requireTLS` sends STARTTLS even
  unadvertised and fails without the upgrade, and that its timeouts are per phase. The tarball was
  unpacked to `C:\Users\Mariusz\AppData\Local\Temp\nmcheck-10253`; a session guard refused deleting
  it outside the project, so it stays there for the human to remove.
- Product files beyond the named list, read to design: `src/browser/view/game-view.ts`,
  `src/browser/view/controls/button.ts`, `src/browser/view/controls/text-field.ts`,
  `src/browser/styles.css` (header and waiting-text rules), `src/browser/index.html`,
  `src/browser/main.ts`, `src/browser/AGENTS.md`, `tests/invariants/account_container_support.py`
  and the secret checks of `tests/invariants/test_loop2_host_sharing.py` (they will need the third
  secret and synthetic mail settings), the account fixture of `tests/http.test.mjs`, and
  `.runs/task-cycles/potwierdzenie-adresu/cycle.md`.
- Foundation: D-81, D-84 read whole (named), plus D-82, D-83, D-85–D-87, D-98, D-100, D-106,
  D-113 that fell inside the same read ranges; no entry outside the dispatch was relied on beyond
  those named.
- Not read: the project definition and the Outsider wiki pages — the frozen task quotes every
  passage the design rests on.

## Notes for the orchestrator

- The foundation step has more to write than the task's K-rows: D-109, D-105, D-112 and five
  invariants change (spec *Foundation entries*). The projected `account-email-nodemailer-starttls/1`
  stays task 21's to write per the plan; this change's mailer test proves its confirmation part.
- The new test file of the mailer must be claimed by `account-server` in the part map, or
  `foundation_check.py` fails.
- `D-44`'s waiting labels already differ from the code: `src/browser/view/app.ts` uses
  „Wylogowywanie…” and „Sprawdzanie…”, which D-44 and the styleguide do not list. Outside this
  task's scope; the styleguide maintenance of To do 8 may want to see it.
