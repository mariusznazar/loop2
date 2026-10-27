# Fix report: blocking finding of the return-step review

- **Status:** done
- **Fix range:** 4e915e8dcac1e9cb5fcbbaabcbb4754b374e6f07..922ec18935e7b8ac93624cd4bfef4da184d6a860
- **Commits:** 922ec18 "Drop the Review when field from D-104, D-105, D-106 and D-111, which the decision template and WAY-24 do not allow" (one commit)
- **Method:** `.claude/skills/the-way-make-change/SKILL.md` → `.the-way/task-cycle/change/SKILL.md`, the part for fixing review findings; `.claude/skills/the-way-record-decision/SKILL.md` → `.the-way/elements/decisions/skill/SKILL.md`, with the decision template, `rules.md` and `way_of_working.md` (read in the return step of this session).

## Changed paths

| Path | Added | Removed |
|---|---:|---:|
| `foundations/decisions.md` | 0 | 4 |

The line endings stay LF (`git ls-files --eol foundations/decisions.md` → `i/lf w/lf`). I staged by explicit path. There was no server command, push, reset or rebase, and no command was refused.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the commit) | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (at 922ec18) | 0 | `0 errors` |
| `grep -n "Review when" foundations/decisions.md` | 0 | Only D-12 (`:243`) and D-16 (`:319`) remain, as the handoff requires |
| `grep -rln "decisions.md" tests` | 0 | One hit, a comment in `tests/sim/program-counts.test.mjs:16`. No test reads `foundations/decisions.md` |

I did not rerun the full `npm test`. The fix changes only `foundations/decisions.md`, no test reads it, and the handoff allows this. The last full run is in `reports/56-return-step-gate.log`, at 4e915e8: exit 0, Node 429/429, Python OK with the three Windows-only skips, foundation check 0 errors. The only check that reads this file is the foundation check, and I ran it above.

## The finding

**Finding 1 (Important) — fixed.** D-104, D-105, D-106 and D-111 no longer carry *Review when*.

- **The finding is right.**
  - The decision template's entry has no such field (`.the-way/elements/decisions/template.md:22-38`).
  - WAY-24 says "A decision names no date or condition for its review".
  - The base `7012abc` has no *Review when* in the log.
  - In the return step I fixed D-111's *Origin* by the template but missed its *Review when* field.
  - My question for the human left D-111 out. It was also no question the method allows for D-104 to D-106, because I had a recommendation, and the product's precedent supports it: D-01 was projected from the same definition with a *Review when* and entered the foundation without one.
- **What changed.** Four lines were removed:
  - D-104 — "Package installation fails or the configured operation exceeds the intended container's resource budget."
  - D-105 — "The project-owned Store causes recurring session failures or needs a different session database."
  - D-106 — "The game and account server need separate public origins."
  - D-111 — "The password library or measured container profile changes."
- **What did not change.** No binding sentence, no other field, *Rationale* or *Rejected* changed, and D-12 and D-16 stand as they were (handoff boundary). The proposed human question in my report 56 ("Returned to the orchestrator", item 1) no longer covers D-104 to D-106. What remains is D-12/D-16 and K13, which the orchestrator handles as `reports/58-return-review.md` gives.

## Changed decisions, with their meaning in Polish

- **D-104** — Serwer kont haszuje i sprawdza hasła graczy pakietem `argon2` w odmianie Argon2id, z jawnymi ustawieniami kosztu dobranymi po pomiarze w docelowym obrazie; treść decyzji bez zmian, odpada tylko pole warunku przeglądu.
- **D-105** — Serwer kont prowadzi sesje graczy przez `express-session` z własnym magazynem opartym na `node:sqlite`, bez domyślnego `MemoryStore`; treść decyzji bez zmian, odpada tylko pole warunku przeglądu.
- **D-106** — Gra i serwer kont i zapisów dzielą jeden publiczny adres HTTPS, a przeglądarka wysyła żądania kont na względne ścieżki `/api/`; treść decyzji bez zmian, odpada tylko pole warunku przeglądu.
- **D-111** — Wzorcem rodzaju `password-hashing` jest `src/server/passwords.ts`, z jedną ograniczoną bramką dla haszowania i sprawdzania i tymczasowym profilem Argon2id do czasu pomiaru; treść decyzji bez zmian, odpada tylko pole warunku przeglądu.

## Reading and reaches

- I read whole: the handoff `reports/59-return-fix-handoff.md`, `reports/59-return-blocking-findings.md`, and in `reports/58-return-review.md` the Minor finding 2 and "The proposed human question", to keep D-12/D-16 and the Minor finding out of this fix.
- The make-change skill, the record-decision skill, the decision template and WAY-24 were read in the return step of this session and not reread.
- No reach beyond the handoff.
