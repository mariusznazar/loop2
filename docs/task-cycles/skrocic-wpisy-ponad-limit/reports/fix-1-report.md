# Fix 1 report — Minor findings of the whole-change review

## Status

`done`. Findings 1, 3 and 4 of `reports/fix-1-findings.md` fixed; none contested. Finding 2 of the review was not touched (outside the task).

## Commit

`d5e02cd0` (on top of the reviewed head `3e5018a8`, added by path only): `foundations/decisions.md` +1 −1 (the *Relations* line of D-115 only), `src/server/account-backup.ts` +3 −3 (comment text only). Finding 4 changes no file of the commit: it changes `reports/author-report.md`, which is under the ignored `.runs/`.

## Findings

1. D-115 *Relations*: now `derives from D-28 · derives from D-107 · derives from D-112 · derives from D-435` (D-112 kept, D-435 added, as the reviewer's fix says). Only that line changed; the foundation check passes. D-114 *Relations* looked at once as the handoff says and left unchanged: its binding sentences name the connection, schema initialization, bound values and disposal (D-112 sentences); the cleanup timer stands only in its *Verification* clause, and the finding names no second reference for it, so the reasoning of finding 1 gives no second case.
3. `src/server/account-backup.ts` lines 20–23 re-wrapped so that the comment's longest line is 78 columns (was 85 at line 21); the words are the same (a re-wrap of three lines: `… and refuses a` / `file in which … missing file,` / `writing nothing in it; it backs …`). Comment text only.
4. The meaning sentence of D-435 in `reports/author-report.md` ("Foundation entries written") replaced; the entry itself is unchanged.
   - First wording, English: each write to the account database reads the block, version, revision, role or link state it depends on inside its own transaction, and expired sessions and emailed links are pruned in bounded batches. Polish: każdy zapis do bazy kont czyta w swojej transakcji to, od czego zależy (blokadę, wersję, rewizję, rolę, stan odnośnika), a wygasłe sesje i odnośniki z maila są sprzątane porcjami.
   - New wording, English: Each write to the account database reads, in the transaction that writes, what it depends on — the account's blocked state, the stored version and revision of a saved game state, the privilege, the role — and blocking, a password reset by a link and the reset of the game change the account's sessions, emailed links and saved game states in that same transaction; a session write for a blocked account or for a replaced password hash stores nothing, the privilege and role writes report whether the account was changed, already was so or does not exist (the role write ending no session and stopping no link), expired sessions and emailed links are pruned at startup and periodically, and blocking keeps the account's saved game state and its previous save.
   - New wording, Polish: Każdy zapis do bazy kont czyta w swojej transakcji to, od czego zależy — stan blokady konta, zapisaną wersję i rewizję stanu gry, uprawnienie, rolę — a blokada, ustawienie hasła odnośnikiem i reset gry zmieniają w tej samej transakcji sesje, odnośniki z maila i zapisane stany gry konta; zapis sesji dla konta zablokowanego albo ze zmienionym skrótem hasła niczego nie zapisuje, zapisy uprawnienia i roli zgłaszają, czy konto zmieniono, już tak miało albo nie istnieje (zapis roli nie kończy żadnej sesji i nie zatrzymuje żadnego odnośnika), wygasłe sesje i odnośniki są sprzątane przy starcie i okresowo, a blokada zostawia zapisany stan gry konta i jego poprzedni zapis.
   - Taken from the binding sentences of D-435 (sentences 1–9) and not from the reviewer's wording; it is longer than the reviewer's, because it keeps the three outcomes of the privilege and role writes and the two stores that write nothing.

## Checks

| Check | Command | Exit |
|---|---|---|
| foundation check, test citations included | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Prettier on the touched file | `node node_modules/prettier/bin/prettier.cjs --check src/server/account-backup.ts` | 0 |
| width of the comment of `account-backup.ts` | `awk` over lines 15–30 for lines over 80 columns | 0 lines over |
| the full gate | `npm test` | not run (the orchestrator's) |

## Own-work check

Requirement most likely not met by this fix: that finding 1 changes only the *Relations* line and leaves D-115 consistent with the rest of the foundation. Check: `git diff` shows one changed line in `decisions.md`, and the foundation check finds D-115 and its invariant `account-session-storage` (*Derives from* `D-435 · D-115`) without error. Shown: exit 0, one line changed.

## Concerns

None new. The concern of the first report about D-114 stays as a judgment of the reviewer, who made no finding of it.

## Reach beyond the handoff

None. `.the-way/task-cycle/change/fix.md` was read as the method names it.

## Unread material

None of this handoff's material: the findings file and handoff were read whole; the review's full report `review-whole-report.md` was not read (the findings file carried its evidence, and the handoff says "may").

## Searches not found or unclear

None.

## Working copies

None made in this fix (`.runs/author/` was removed at the end of the first return and was not recreated).
