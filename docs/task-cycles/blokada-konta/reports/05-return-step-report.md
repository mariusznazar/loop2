# Return step report — task `blokada-konta` (step 11, the one author resumed)

- **Status:** done
- Method: `.the-way/task-cycle/skill/return_step.md`, written as `foundation_step.md` gives;
  `the-way-record-environment-fact` (`.the-way/elements/environment-facts/skill/SKILL.md` and
  template), `the-way-update-part-map` (`.the-way/elements/part-map/skill/SKILL.md`), and
  `the-way-record-decision` for the one field of D-112.
- Started from `81cb7c6` (reviewed `PASS 81cb7c6`); head now `cb27190`.

## Commit

| Commit | Files (+/−) | What |
|---|---|---|
| `cb27190` | `foundations/environment_facts.md` (+6/−0), `foundations/decisions.md` (+1/−1), `foundations/part_map.md` (+1/−1) | new environment fact `sqlite-wal-concurrency`; D-112's *Based on* names it; the account-server part's responsibility names the operator's command |

## What the comparison with the code found, and what changed

1. **A source outside the product the change rests on, not held by the foundation.** D-112, as
   changed, reasons that a block committed while a login is in progress either deletes the
   session that login stored or makes its write store nothing, and that the operator's second
   connection waits out the server's short transactions. Both rest on SQLite letting readers and
   a writer run together in WAL mode while only one writer at a time writes. In the author report
   I had left this without a fact. The return step writes each such source, so I wrote it.
   - Entry `sqlite-wal-concurrency`: "In SQLite's write-ahead log mode, readers and a writer of
     one database run at the same time, and only one writer at a time writes to it."
     Meaning (pl): *W trybie dziennika zapisu z wyprzedzeniem SQLite czytający i jeden piszący
     działają jednocześnie, a pisać może naraz tylko jeden.*
   - Source: `https://www.sqlite.org/wal.html` is a page without editions, so the entry cites the
     closest existing capture, found through the archive's CDX index (captures 2026-10-06 to
     2026-10-27, all with the same digest): `https://web.archive.org/web/20261027035005/https://www.sqlite.org/wal.html`.
     The section is § 2.2. Concurrency, and the entry quotes one paragraph, read 2026-10-28.
   - Mechanical check: I fetched the live page and the capture (`curl`, `id_` raw form of the
     capture), dropped the markup and collapsed the whitespace. The quoted passage stands word
     for word in both, inside one `<p>`, after the heading "2.2. Concurrency".
   - D-112 *Based on*: `node-sqlite-database · sqlite-wal-concurrency`. D-112's sentences are
     unchanged.
   - *Corrected by the fix `017c860` (`reports/07-return-fix-report.md`):*
     `account-session-storage` and `player-server-session` rest on the fact, and their
     *Rests on* names it. Whether a session of a blocked account is stored, or left
     uninvalidated, by a login racing the operator's block on a second connection depends on
     only one writer writing at a time. `blocked-account-access` and
     `unblock-restores-no-session` do not rest on it: they hold through the authorization check
     and through the removal at the block, whatever the interleaving.
2. **The part map of the touched part.** The account-server responsibility sentence did not name
   the new entry point, while it names the part's other non-HTTP entry point (the password
   measurement). It now reads: "The part is the account and save server: it serves the built game,
   handles the HTTP requests sent to it, owns account and session persistence, gives the operator
   a command that blocks and unblocks a player account, and measures its own password work in
   the image it runs in." Meaning (pl): *Część serwera kont dostaje też polecenie właściciela do
   blokowania i odblokowywania konta.*
   - *Files*, *Depends on* and *Trust boundary* are unchanged. `src/server/**` already holds the
     file, and it is the trust boundary, which covers the address the command takes from its
     arguments.
   - No other entry rests on the old wording.

## Compared and found matching (no change)

- D-129, D-130, D-131, D-100 and D-112 (sentences) against `src/server/account-block.ts`,
  `src/server/database.ts`, `src/server/account-routes.ts` and `src/browser/account-api.ts` at
  `81cb7c6`. All of the following hold:
  - normalization as at login;
  - the outcomes and the refusal that changes nothing;
  - block and session deletion in one transaction, and unblock restoring nothing;
  - 403 `account-blocked` only after the password check, settled by `release()`;
  - the ordered steps up to version 2, and refusal of other versions without change;
  - the guarded session write.
- The invariants `blocked-account-access`, `player-server-session`, `unblock-restores-no-session`,
  `account-schema-lifecycle`, `account-database-schema` and `account-session-storage` against the
  code and their citing tests.
- The glossary term *blocked account* against its uses in the code ("blocked", `account-blocked`)
  and the D-102 lock (`lockedUntil`, `too-many-attempts`).
- The task's four *Settlements to record* and three projected entries: all written by
  `e069f69`, none missed.
- Words: no other word of the change takes a meaning other than the usual one ("operator",
  "migration step", "unblock" are used as a reader of the field reads them).
- Choices that bind after the merge: the command's verbs, output and exit codes are its interface
  to the human. The deploy skill states them (`02c2264`), and D-129 binds the behaviour. No
  further decision is needed; they stay rows of the cycle's choices.
- The review's three Minor findings: they go to the request, as the handoff gives. None is a
  foundation entry.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (on the change, before the commit; tree clean after it) | 0 | 0 errors |
| `curl` of `https://www.sqlite.org/wal.html` and of the capture, passage search | — | passage found word for word in both |
| CDX query `https://web.archive.org/cdx/search/cdx?url=www.sqlite.org/wal.html&output=json&filter=statuscode:200&limit=-5` | 0 | five captures, newest 20261027035005 |

Not run: any test file. The change touches only `foundations/`, which no test of this repository
reads besides `foundation_check.py`. `npm test` without arguments is the orchestrator's run.

## Reaches beyond the dispatch

- `https://www.sqlite.org/wal.html`, its Wayback capture and the CDX index: the source of the
  new fact, which the environment-facts skill requires opening and checking.
- `.the-way/elements/environment-facts/template.md` and its skill, and
  `.the-way/elements/part-map/skill/SKILL.md` with the template's binding-sentence rule: the
  skills of the two elements written.
