# Foundation report — "panel właściciela" (the plan's *Foundation entries*)

**Status:** done with concerns (concerns and one question in the sections *Questions* and *Concerns*; none blocks the slices)

Worktree `the task's worktree`, branch `task/panel-wlasciciela`, base `b1904c5b167971064df508c4eac8025341378198`.

## Commits

| Commit | Content |
|---|---|
| `f1733cf9` | `foundations/decisions.md` (D-137, D-400, D-109, D-202, D-112, D-280, D-281, D-252, D-253, D-354 changed; D-410 and D-411 new) and the 12 quoting lines in three test files |
| `1d833c7e` | `foundations/glossary.md` (term `owner`; `blocked account` and `previous-save privilege` name the owner panel) and `foundations/part_map.md` (`account-server` sentence) |

Files changed (added/removed lines, from `git diff` at base): `foundations/decisions.md` +106/-44, `foundations/glossary.md` +8/-2, `foundations/part_map.md` +1/-1, `tests/account-backup.test.mjs` 4/4, `tests/account-storage.test.mjs` 6/6, `tests/startup.test.mjs` 2/2.

## Check

`python -B .the-way/elements/common/foundation_check.py` — exit 0, output `0 errors` (no listing). The base gave the same (`0 errors`, exit 0). No other check run; `npm test` not run (the orchestrator's). The check needed no `--skip-test-citations`. It reports no path that does not exist yet: the *Verification* clauses name tests in words, with no path (the template gives no path), so the new test files of the slices are not read by the check.

## Quoting lines changed (comment text only, nothing else in those files)

All 12 are lines `// decision: D-nnn "…"`; the exception of the plan's amended bullet (D-112, D-253, D-354 name the commands one by one):

- D-112 (the role command added to the list of commands that open a short connection; in `tests/startup.test.mjs:580` also "current version 5" became "6"): `tests/account-backup.test.mjs:239`, `tests/account-storage.test.mjs:2783`, `tests/account-storage.test.mjs:3074`, `tests/startup.test.mjs:580`
- D-354 (`account-role` added to the list): `tests/account-backup.test.mjs:412`, `tests/account-backup.test.mjs:462`, `tests/account-storage.test.mjs:2878`, `tests/account-storage.test.mjs:3156`
- D-253 (`account-role` added to the list): `tests/account-backup.test.mjs:509`, `tests/account-storage.test.mjs:2906`, `tests/account-storage.test.mjs:3188`, `tests/startup.test.mjs:630`

Method: a one-off script (`.runs/foundation/fix_quotes.py`, now removed) replaced three exact strings only in lines that begin a comment and hold `decision: D-`; the diff shows 12 lines changed in 3 files. All other quoting lines of the changed decisions (D-137, D-400, D-109, D-202, D-280, D-281, D-252, D-104, and the other sentences of D-112, D-253, D-354) stay valid, because every change to those is an added sentence or a change after a quoted prefix: I searched `tests/` and the rest of the repository for `decision: D-<n>` of each (list of the quoted sentences read before editing) and the check confirms.

## Entries, with their meaning

Marks: `row n` = a row of *Settlements to record*; `projected` = none here; `the cycle's` = an entry or a choice no row carries.

| Entry | Mark | Meaning in English | Znaczenie po polsku |
|---|---|---|---|
| D-137 (changed; heading renamed to "How is a player account blocked and unblocked?") | row 1, 3, 4 | A new paragraph: an account with the owner role also blocks and unblocks from the panel by `POST /api/owner/block` and `/unblock`, with the command's effects in one transaction, answers `blocked`, `already-blocked`, `unblocked`, `not-blocked`, 404 `unknown-account`, and 409 `owner-not-blockable` for an account with the owner role (the caller's own too, also when the role was given just before); the command stays as the emergency way. *Rejected* loses the owner panel and gains the ways the task keeps (panel with the list only, no change, everything allowed, commands removed); the rationale names the accepted risk (five accounts, all the human's, D-12; to be judged again when the game opens to others). | Konto z rolą właściciela blokuje i odblokowuje konta z panelu tą samą transakcją co komenda, nigdy konta z rolą właściciela (też własnego); komenda zostaje jako droga awaryjna; ryzyko przejęcia konta właściciela przyjęte przy pięciu kontach Mariusza i do ponownej oceny, gdy gra otworzy się dla innych. |
| D-400 (changed) | row 1, 3, 4 | A new paragraph: an account with the owner role grants and revokes the privilege of any account, an owner's too, by `POST /api/owner/grant-previous-save` and `/revoke-previous-save` (`granted`, `already-granted`, `revoked`, `not-granted`, 404 `unknown-account`), with no confirmation; "no HTTP route grants or revokes it" is gone; the command stays. | Konto z rolą właściciela nadaje i odbiera uprawnienie do poprzedniego zapisu każdemu kontu, też właścicielowi, z panelu, od razu; komenda zostaje. |
| D-109 (changed) | row 1, 8 | A new paragraph: a valid session of an account with the owner role, the role read from the database at each request and never from the session, authorizes the list and the four operations; the five routes answer 401 `unauthenticated` without a session and 403 `owner-forbidden` to a session without the role, after the session and before the body is read, with nothing changed. | Sesja konta z rolą właściciela, której rolę serwer czyta z bazy przy każdym żądaniu, uprawnia do listy i czterech operacji; sesja bez roli dostaje 403 `owner-forbidden`, bez sesji 401, przed odczytem treści. |
| D-202 (changed) | row 1, 2 | A new paragraph: a new account is a `player`, no registration and no request gives the owner role, and an account with the owner role can also block from the panel. | Nowe konto jest graczem; konto z rolą właściciela może też blokować z panelu. |
| D-112 (changed) | row 2 | The role joins the account's columns; current version 6, one step at the end that leaves every account a `player`; the role command opens a short connection beside the server; giving and taking the role is one write by address that ends no session; the block of the panel reads the role in its own transaction. The three command lists and "version 5" changed in place (the quoting lines follow, above). | Konto ma rolę (gracz albo właściciel); schemat w wersji 6, jeden krok na końcu, każde istniejące konto zostaje graczem; komenda roli otwiera krótkie połączenie obok serwera. |
| D-280 (changed) | row 5 | A new paragraph: an account with the owner role has one more screen, the list of accounts, of the same content width, not an item of the bar; its menu „Konto” holds, after the address and before its buttons, the link „Panel właściciela” to `#/konta`; the bar is the same for both roles. The sentence about the bar's items is untouched. *Rejected* gains the fourth item „Konta” (the task's cost kept). | Menu „Konto” właściciela ma odnośnik „Panel właściciela” pod `#/konta`, pasek menu jest taki sam dla gracza i właściciela. |
| D-281 (changed) | row 5 | A new paragraph: `#/konta` names the list screen for an account with the owner role; for any other account it falls under "any other" and opens Siedziba. The seven-address sentence is untouched. | Adres `#/konta` otwiera listę kont właścicielowi, a graczowi Siedzibę jak każdy nieznany adres. |
| D-252 (changed) | row 2; task *Decisions in play* | The command list gains `account-role`; a change of role and each operation of the panel is a change of an account the product logs: one line with the target's account number, after a change only, no address and no number of the acting owner. "the owner's commands" in its *Verification* became "the operator's commands". | Lista komend serwisowych dostaje komendę roli; zmiana roli i operacje panelu są zmianami konta, które produkt loguje numerem konta docelowego, bez numeru właściciela, który działał. |
| D-253 (changed) | row 2; the plan's reach | `account-role` is a process that touches account data and has a last-resort handler of its own. | Komenda roli ma własną ostatnią obsługę błędu jak pozostałe komendy na danych kont. |
| D-354 (changed) | row 2; task *Decisions in play* | The list gains `account-role`; *Relations* gains D-410; its *Verification* pair names it. | Zdanie komendy roli dla operatora nie jest linią dziennika, jak przy pozostałych komendach. |
| D-104, D-12 | unchanged | Read; they bind the four POST routes (D-104) and the human who runs the role command (D-12, named in D-410); no edit. | Bez zmian; wiążą cztery trasy POST i człowieka uruchamiającego komendę roli. |
| D-410 (new) | row 2 (and the read of the role per request, row 8) | Every account has a role, `player` or `owner`, stored with the account; a new account is a player; the owner role is given and taken by the command `account-role`, run by a human in the container, which reports made owner, made player, already so or unknown address, changes nothing on refusal and ends no session; the server reads the role from the database at each request, never from the session, and no request gives a role; the account answers carry `"role":"owner"` for an owner and no field for a player. | Rola konta (gracz albo właściciel) jest zapisana w bazie, nadaje ją człowiek komendą w kontenerze, serwer czyta ją z bazy przy każdym żądaniu, nigdy z sesji; nowe konto jest graczem. |
| D-411 (new) | row 6, 7 (4); the fourth field is the cycle's (A1) | The list screen shows every account sorted by address with address, blocked state, privilege and role; four buttons; "Zablokuj" is destructive, opens a confirmation (ends the player's sessions in every browser, makes the emailed links useless, unblocking restores neither), the other three act at once; no "Zablokuj" at an account with the owner role. The rationale gives the reason of the role as a fourth field (the screen cannot leave the button out without it; with three fields the button would be shown and always refused). | Lista kont pokazuje adres, stan blokady, uprawnienie i rolę (rola — czwarte pole, wybór orkiestratora A1), posortowane po adresie; „Zablokuj” pyta o potwierdzenie, pozostałe trzy działają od razu; przy koncie właściciela nie ma „Zablokuj”. |
| glossary `owner` (new) | row 9 | An owner is an account whose role is `owner`, which lets its holder use the owner panel and which only a human gives with `account-role`; *Not*: the person who reaches the server and runs its commands, "operator". `blocked account` and `previous-save privilege` now name "an owner from the owner panel" beside the operator. | „Właściciel” to rola konta, nie osoba z dostępem do serwera, którą dziennik nazywa „operator”. |
| part map `account-server` (changed) | the task's *Decisions in play*; the planner's handoff | Its sentence gains the role command and the owner routes, answered only to a session of an account with the owner role. *Files* unchanged (slices 2 and 4 add their test files). | Opis części `account-server` zawiera komendę roli i trasy panelu właściciela. |

*Rejected* of D-137, D-400, D-280, D-410, D-411 holds the ways not chosen that the task's questions 1 to 7 keep, each with the cost the task kept. The fourth field (A1) is in the *Rationale* of D-411 and not in its *Rejected* — the template (WAY-134) lets only the ways the row's source keeps into *Rejected*, and the way "three fields, button shown, server refuses" is the orchestrator's, not the source's.

## Choices made

- **D-137 heading renamed** from "How does the operator block and unblock a player account?" to "How is a player account blocked and unblocked?", since two actors now block. Rejected: keep the heading — it would name one actor of two. Cost if wrong: none for the tests (they quote binding sentences, not the heading; the check passes); a reference by title would break, none found.
- **The role command is `account-role`** (file `src/server/account-role.ts`, built `dist/server/account-role.js`), as the plan says; the decisions name the command `account-role` and the usage `owner|player` only in D-410's *Verification* pair.
- **In-list edits for D-112, D-253, D-354** (the role command written into each list of commands, the 12 quoting lines changed), as the plan's amended bullet gives; rejected: a trailing clause "and so does the command for the role", which would have left most of the 12 lines untouched but leaves a list the reader has to join in the head.
- **Added sentences, not edits, everywhere else** (D-137, D-400, D-109, D-202, D-280, D-281, D-252): one exception in D-400, where the tail ", and no HTTP route grants or revokes it" of the second sentence was removed (no test quotes it) and the panel put in a paragraph of its own.
- **D-410 and D-411 carry both the `tests:` clause (end state, in words) and a pair of `complies`/`violates`**: the handoff asks for the clause naming the slices' tests; the skill of decisions says a clause stands "once their lines `decision:` stand" and that a pair holds the part for now; with no test line the check would report the new decision as held by nothing, so the pair is needed now. The return step removes the pair's part the tests hold. Rejected: only the pair (the handoff's end state missing) or only the clause (the check errors).
- **"Owner" in the new and the changed binding sentences is always written "an account with the owner role" / "the owner role" / "owner panel"**, never the bare "owner" for a person, so that the glossary term reads one way there.
- **The panel's confirmation text, the buttons' names and `#/konta`** are written as the task has them (Polish literals in an English entry, as D-280 does).

## Questions to the orchestrator (with the answer I recommend)

1. **Many uses of "owner" in the foundation mean the human who runs the server** (about 70 lines of `foundations/decisions.md` of the base, among them the rationales of D-12, D-233 and D-356; the code comments `src/server/account-block.ts:10`, `src/server/account-previous-save.ts:9`, `src/server/account-backup.ts:9`, `src/server/database.ts:487`; the skills `loop2-deploy`, `loop2-play`). The new glossary term gives "owner" the other meaning (a role of an account), which the template's rule on two meanings of one word asks to rename on one side, the human choosing the word; the task's row 9 says only "the person the log calls 'operator' or 'owner'" and gives no list of uses to rewrite. I left every such use in entries I did not otherwise change, and rewrote it to "operator" only in the lines I edited in D-137, D-400, D-252 (so that one entry does not say both). Recommended: a separate small task renames those uses to "operator" (the word D-137 and D-400 already use), after the merge. If nothing is done, "owner" stays ambiguous in the old rationales, with the glossary entry stating the role meaning.
2. **Slice 4's writer of the invariant `owner-panel-authorization`** must also add it to *Verification* (`invariants:`) of D-109 and D-137, and write its *Derives from* as D-109 · D-137. I did not name it there: it does not exist yet and the check reports an unknown invariant as an error.

## Concerns

- **The glossary *Not* for the code variable `owner` of `src/browser/view/app.ts` is not written**: the template's *Not* lists meanings of English text, each with a carrier that does not hold the term; the variable is code, and the only carrier I could name would be an invented word. Recommended: leave it to the code (slice 10 names the new value `role`). If the human wants it in *Not*, give the word.
- **D-408** says a new screen adds "its position on the menu bar"; the list screen has none (as the screen of a map run has none, D-280). D-408 was not in the brief and I did not change it; the slice 9 reviewer may read it as a collision. Recommended: no change to D-408 (its example says "added … its place on the menu bar", an example of one screen, not a rule for every screen); a later wording of "the menu bar position, if any" is the orchestrator's to call.
- **D-411 holds the confirmation sentence's content, not its wording**; the Polish wording of the sentence is the screen's (slice 7).
- **The invariants named in *Verification* of the changed decisions** (account-schema-lifecycle, account-database-schema, blocked-account-access, player-server-session, unblock-restores-no-session, unblock-restores-no-link, player-save-isolation, account-session-authorization, account-mutation-request-guards, player-self-registration, account-client-outcomes) were read; none says anything the change contradicts (`account-schema-lifecycle` and `account-database-schema` still hold: a version-5 database moves to 6 keeping its rows); none was changed.

## Reach beyond the handoff

- `foundations/decisions.md` D-139, D-160 (heading only), D-353, D-401/D-402/D-206/D-211 (headings only), `.the-way/elements/decisions/template.md`, `rules.md`, `way_of_working.md`, each element's `template.md`, `decide_entry.md`, `read.md`, `write.md`: the decisions' elements and the glossary and part-map skills' files, as the handoff names the element skills; D-139 and D-353 because the search of the foundation touches blocked accounts and expected refusals (D-353: the panel's refusals are not failures, D-252 says a refusal has no line; no change).
- `.the-way/elements/common/foundation_check.py` lines 695–760, to learn when a changed or new decision counts as held (a `decision:` line that names it, an invariant, or a pair); the reason for the pair in D-410 and D-411.

## Working copies

`.runs/foundation/fix_quotes.py` and `.runs/foundation/check.txt` stood in `.runs\foundation\` (ignored); removed before returning. No worktree or clone made.

## Unread material

- Decisions that the entries link to and whose heading or relation I saw but did not read whole: D-99, D-96, D-97, D-101, D-152, D-156, D-157, D-204, D-231, D-399, D-401, D-402, D-206, D-211, D-160 (read only the heading), D-277, D-332.
- `foundations/glossary.md` read in part (its first lines, the entries `blocked account`, `previous save`, `previous-save privilege` and the tail, and a search of the file for "owner" and "operator"), not whole.
- `foundations/part_map.md` read the entries `browser-view` (first lines) and `account-server` whole, and the headings; the other parts not read.
- `foundations/invariants.md`: each of the eleven named invariants read whole (11 lines each); the rest of the file not read.
- `.the-way/elements/decisions/examples.md` names D-03 of the-way's own log; not opened (the form was taken from the template and from this repository's entries).
- `.the-way/elements/glossary/examples.md`, `part-map/examples.md`: read; the entries of the-way's own glossary and map they name were not opened.
- The plan and the task: read whole. The tests quoting the decisions: only the lines that quote them (not the test files).

## Searches not found or unclear

- The plan's table gives for D-137 `:3074-3092` and so on; on the base these ranges are correct (the handoff's warning about the task's older line numbers applied only to the task document).
- The handoff says each *Verification* names the tests "as the template gives, which the foundation check may accept only once the files exist": the template gives the clause without paths, and the check reports no missing path; unclear what path the handoff expected; I wrote the clause in words.
- No entry of the foundation states that an account with the owner role plays like a player; I wrote it in D-410 from the task's To do 3 ("the same login card") and 5 (the privilege to every account, an owner too).
