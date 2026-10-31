# Report — foundation entries, task `reset-hasla`

**Status:** `done with concerns` (the concerns stand in *Choices and concerns*; no question for the human)

## Commits and files

Branch `task/reset-hasla`, base `95de83b`, `.the-way` not moved (`a8dfe8a`). No push.

| Commit | Message | Files (added / removed lines) |
|---|---|---|
| `d6bbc02` | docs: :memo: record two express-session facts a password reset rests on | `foundations/environment_facts.md` (+12 / −0) |
| `e8755e8` | docs: :memo: record the decisions and invariants of the password reset before its code | `foundations/decisions.md` (+285 / −78), `foundations/invariants.md` (+37 / −7) |

Decisions and invariants share one commit because they name each other in *Verification* and
*Derives from*; split, a commit would fail the check. Commits carry the private address
(`git log`: the private address).

## Plan's labels and their identifiers (the slices' handoffs use this)

| Label | Identifier | New place |
|---|---|---|
| N1 | D-214 — What does a request for a password-reset link answer? | `foundations/decisions.md:3896` |
| N2 | D-215 — Does a request for a password-reset link have a limit of its own per client address? | `:3949` |
| N3 | D-216 — What form does a password-reset link take? | `:3974` |
| N4 | D-217 — What does the form „Ustaw nowe hasło” hold, and how does it end? | `:3996` |
| N5 | D-218 — How does the route that sets a password by a link check its request and bound its password work? | `:4030` |
| N6 | D-219 — Which messages does a password reset send, and what do they say? | `:4071` |
| I1 | `password-reset-verified-email` | `foundations/invariants.md:1038` |
| I2 | `password-reset-link` | `:1048` |
| I3 | `password-reset-ends-sessions` | `:1058` |
| F1 | `express-session-end-of-request` | `foundations/environment_facts.md:358` |
| F2 | `express-session-regenerated-session-saved-again` | `:364` |

**The plan's `Read` line ranges of `foundations/decisions.md` moved**: they name the base. New ranges,
from `D-112` on shifted by two to four lines: D-44 889-902 · D-96 1746-1759 · D-98 1776-1789 ·
D-100 1806-1819 · D-102 1834-1847 · D-105 1877-1890 · D-109 1931-1942 · D-112 1985-1998 ·
D-114 2000-2013 · D-115 2015-2028 · D-116 2030-2043 · D-137 2551-2564 · D-138 2566-2577 ·
D-139 2579-2592 · D-152 2784-2795 · D-153 2797-2810 · D-154 2812-2823 · D-155 2825-2838 ·
D-156 2840-2853 · D-158 2870-2883 · D-160 2900-2911 · D-161 2913-2924 · D-162 2926-2939 ·
D-163 2941-2954 · D-211 3799-3830. A range in `foundations/invariants.md` before line 1038 did not
move: every changed invariant keeps its lines. `environment_facts.md` before line 358 did not move.
A handoff that needs an exact range takes it by a search for the heading.

## Each entry and its meaning (po polsku, do opisu zgłoszenia)

### Decyzje zmienione

- **D-44** — Przycisk „Wyślij odnośnik” czeka z napisem „Wysyłanie…”, a „Ustaw hasło” z napisem „Ustawianie…”; zdanie po prośbie o odnośnik stoi tam, gdzie odmowy, ale w `text-secondary`, a strona wszystkich stanów pokazuje oba nowe formularze i to zdanie.
- **D-96** — Pod „Zaloguj się” stoi przycisk „Nie pamiętam hasła”, który w miejscu obu formularzy pokazuje formularz prośby o odnośnik, a strona otwarta odnośnikiem resetu pokazuje formularz „Ustaw nowe hasło” w miejscu gry i formularzy, także zalogowanemu graczowi, i nie buduje gry.
- **D-98** — Nowe hasło podlega tym samym regułom i zdaniom co przy zakładaniu konta, musi być powtórzone dokładnie i nie jest porównywane ze starym.
- **D-100** (spoza listy planu, patrz *Choices and concerns*) — Logowanie, którego hasło zostało zmienione resetem w trakcie sprawdzania, dostaje zwykłe „Nieprawidłowy adres e-mail lub hasło.” i nie liczy się ani jako nieudane, ani jako udane.
- **D-102** — Udany reset czyści nieudane logowania i blokadę tego adresu e-mail, a licznik na adres klienta zostaje.
- **D-105** — Przy prośbie o odnośnik ponad pułapem „spróbuj później” mówi końcówka wspólnego zdania, a wyczerpanie pułapu godzinowego jest kosztem przyjętym w D-215.
- **D-109** — O odnośnik może poprosić odwiedzający bez sesji, a podany adres wskazuje tylko konto, na którego potwierdzony adres może wyjść odnośnik; sam odnośnik resetu uprawnia do ustawienia nowego hasła swojego konta i do niczego innego.
- **D-112** — Ustawienie hasła odnośnikiem to jedna transakcja, która sprawdza odnośnik i blokadę i albo niczego nie zmienia, albo podmienia skrót hasła, usuwa sesje konta i zużywa jego odnośniki resetu, a zapis sesji, który wskazuje skrót hasła, nic nie zapisuje, gdy konto ma już inny.
- **D-138** — Reset usuwa wszystkie sesje konta w tej samej operacji co zmiana hasła i nikogo nie loguje; gracz loguje się nowym hasłem na formularzu.
- **D-152** (wpisany w całości) — Gracz resetuje zapomniane hasło sam, jednorazowym odnośnikiem wysłanym na wcześniej potwierdzony adres, a potwierdzenie adresu służy odzyskaniu konta.
- **D-153** (wpisany w całości) — Wiadomości resetu idą tą samą drogą co potwierdzające, a samodzielne odzyskiwanie konta działa publicznie dopiero po prawdziwej próbie doręczenia obu rodzajów wiadomości z docelowego kontenera.
- **D-154** (wpisany w całości) — Wiadomości resetu serwer składa i wysyła przez Outsidera Nodemailerem 10 tak samo jak potwierdzające, tylko po przejściu połączenia na TLS.
- **D-155** — Odnośnik resetu zużywa się dopiero razem z nowym hasłem.
- **D-158** — Wiadomość potwierdzająca ma cztery akapity: przed „Jeśli to nie Ty, zignoruj tę wiadomość.” dochodzi zdanie o samodzielnym resecie hasła.
- **D-160** — Odmowa odnośnika resetu konta zablokowanego ma to samo zdanie i to samo miejsce co odmowa odnośnika potwierdzenia.
- **D-211** — Reset jest trzecią przyczyną końca sesji, po której zapis gry kończy się „Sesja wygasła…” i zachowaniem stanu w karcie.

### Decyzja bez zmiany brzmienia

- **D-106** — Obecne „player passwords” obejmuje już hasło ustawione resetem, więc wpis zostaje bez zmian, a jego część urzeczywistnia Slice 6.

### Decyzje nowe

- **D-214** — Każdy poprawnie zapisany adres dostaje tę samą odpowiedź, zanim serwer zacznie cokolwiek robić z kontem, więc ani treść, ani czas nic nie mówią, a zapis i wysyłka idą potem; adres zapisany błędnie dostaje zdanie pod polem i nic nie wychodzi.
- **D-215** — Prośba o odnośnik nie ma własnego limitu na adres klienta, dopóki konta ma tylko właściciel, z przyjętym kosztem wyczerpania pułapu godzinowego i do rewizji przed podaniem adresu gry innym, jeśli nadużycia staną się realne.
- **D-216** — Odnośnik resetu ma postać `<adres gry>/#reset-password=<token>`, token to 32 losowe bajty, baza trzyma tylko jego skrót, a strona czyta token z fragmentu adresu.
- **D-217** — Formularz „Ustaw nowe hasło” ma dwa pola i przyciski „Ustaw hasło” i „Anuluj”, strona nie sprawdza odnośnika przed jego pokazaniem, a decyzja opisuje, co gracz widzi po sukcesie, po odmowie, przy braku połączenia i przy pełnej bramce haseł.
- **D-218** — Trasa ustawiania hasła sprawdza kolejno pola, hasło i odnośnik, zanim zacznie pracę nad hasłem, haszuje przez bramkę haseł bez osobnego limitu prób, sprawdza odnośnik drugi raz w transakcji zapisu i daje jedną odmowę na każdy zły token, nie tykając sesji, z którą przyszło żądanie.
- **D-219** — Wiadomość resetu ma nadawcę i formę wiadomości potwierdzającej, temat „Ustaw nowe hasło w loop2” i ustaloną treść, a po zmianie hasła nie idzie żadna wiadomość, z przyjętym odstępstwem od OWASP.

### Niezmienniki nowe

- **`password-reset-verified-email`** (w całości z definicji) — Odnośnik resetu jest jednorazowy i wychodzi tylko na wcześniej potwierdzony adres konta.
- **`password-reset-link`** — Odnośnik ustawia hasło tylko raz, tylko przed wygaśnięciem, tylko do zapisania późniejszego odnośnika i tylko bez blokady, także po odblokowaniu, odmowa niczego nie zmienia, a hasło nieprzyjęte i pełna bramka haseł go nie zużywają.
- **`password-reset-ends-sessions`** — Żadna sesja, którą konto miało w chwili resetu, nie uprawnia żądania zaczętego po nim, a logowanie albo zakładanie konta trwające w tej chwili nie zostawia sesji.

### Niezmienniki zmienione

- **`account-session-authorization`** — Adres w prośbie wskazuje tylko konto, na którego potwierdzony adres może wyjść odnośnik, a odnośnik resetu uprawnia wyłącznie do ustawienia hasła swojego konta.
- **`player-server-session`** — Serwer unieważnia rekord sesji także przy resecie hasła jej konta.
- **`account-session-storage`** — Magazyn sesji nie zapisuje sesji wskazującej skrót hasła, którego konto już nie ma.
- **`account-attempt-limits`** — Udany reset kasuje historię i blokadę adresu e-mail, a limit na adres klienta liczy dalej.
- **`unblock-restores-no-link`** — Odnośnik zatrzymany blokadą nie ustawia też hasła po odblokowaniu.
- **`account-email-via-outsider`** (w całości z definicji) — Także wiadomości resetu idą z `mariusznazar.com` przez Outsidera.
- **`account-email-nodemailer-starttls`** (w całości z definicji) — Także wiadomości resetu serwer nadaje Nodemailerem 10 tylko po przejściu połączenia na TLS.

### Niezmiennik bez zmiany brzmienia

- **`player-argon2-password-hash`** — Obecne „each player password” obejmuje hasło z resetu; Slice 6 dopisuje test w `tests/http.test.mjs`.

### Fakty środowiska nowe

- **`express-session-end-of-request`** — Express-session 1.19.0 przy `resave` wyłączonym na końcu żądania tylko odświeża sesję wczytaną z ciasteczka, której dane się nie zmieniły, i jej nie zapisuje, więc usunięty wiersz nie wraca.
- **`express-session-regenerated-session-saved-again`** — Express-session 1.19.0 zapisuje sesję zrobioną przez `regenerate` drugi raz na końcu żądania, nawet gdy trasa już ją zapisała, za każdym razem przekazując magazynowi ten sam obiekt sesji.

## Rows of *Settlements to record* and what carries each

| Row | Carried by |
|---|---|
| 1 | D-96; D-44 (the waiting text) |
| 2 | D-109; `account-session-authorization` |
| 3 | D-214; D-44 (place and role), D-105 (the ending as "try later") |
| 4 | D-215; D-105 |
| 5 | D-216 |
| 6 | D-96 |
| 7 | D-98 |
| 8 | D-217; D-44 (the waiting text) |
| 9 | D-217 |
| 10 | D-217; D-160 |
| 11 | D-217; the server's side in D-218 |
| 12 | D-155; D-112 |
| 13 | D-217 |
| 14 | D-138; D-112, D-211, `player-server-session`, `password-reset-ends-sessions` |
| 15 | D-102; `account-attempt-limits` |
| 16 | D-219 |
| 17 | D-158 |
| 18 | D-219 |
| 19 | `password-reset-link`; `unblock-restores-no-link` |

No row turned out already stated by an entry; each needed a new or a changed one. The two parts the
plan left open are tied to what stands: To do 5's hash to D-106 and `player-argon2-password-hash`.

The ways not chosen stand in the entry that carries the row: row 1 in D-96, row 2 in D-109, row 3 in
D-214 (the way „C” also in D-105, whose change it concerns), row 4 in D-215, row 10 and 13 in D-217,
row 14 in D-138, row 15 in D-102, row 17 in D-158, row 18 in D-219. Rows 5, 6, 7, 8, 9, 11, 12 and 16
come from the base of question 4 or from question 7, whose *Source* keeps no way not chosen for
them: D-216 reads `unknown`, as the template gives; the others keep the *Rejected* they had or take
only the ways of the other rows they carry. Spec ways enter only where the plan names their Decision
for the entry: Decision 2 in D-214, Decisions 6 and 7 in D-112, Decisions 4, 5 and 8 in D-218.

## Test files named by the plan, invariant by invariant

The entry's form has no field for a test: *Method* reads `test`, and the test cites the entry at the
test. So the file stands here, not in the entry:

| Invariant | Method | Test (written by) |
|---|---|---|
| `password-reset-verified-email` | test | `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 5) |
| `password-reset-link` | test | `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) |
| `password-reset-ends-sessions` | test | `tests/account-storage.test.mjs` (Slices 1, 2), `tests/http.test.mjs` (Slices 2, 6) |
| `account-session-authorization` | test | `tests/http.test.mjs` (Slices 5, 6) |
| `player-server-session` | test | `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) |
| `account-session-storage` | test | `tests/account-storage.test.mjs` (Slice 2) |
| `account-attempt-limits` | test | `tests/http.test.mjs` (Slices 3, 6) |
| `unblock-restores-no-link` | test | `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) |
| `account-email-via-outsider` | review | the review of Slice 4 |
| `account-email-nodemailer-starttls` | test | the existing cases of `tests/account-mail.test.mjs`, the reset message through the same mailer (Slice 4) |
| `player-argon2-password-hash` | test | `tests/http.test.mjs` (Slice 6) |

## Changed invariants: wording at `{fork-point}` beside the new one, with the tests citing them

The base's wording is in `git show 95de83b:foundations/invariants.md`. Every change only adds to the
sentence; every clause of the base stays, so each citing test below reads a sentence that still
holds for what it exercises, and none has to change.

| Invariant | What is added | Tests citing it at the base |
|---|---|---|
| `account-session-authorization` | the address of `POST /api/password-reset-message` names only the account whose own confirmed address a link may go to; a reset link sent to `POST /api/password-reset` authorizes that one setting | `tests/http.test.mjs:438`, `:515`, `:1820`, `:2318` |
| `player-server-session` | "on logout or account blocking" becomes "on logout, on account blocking or at a password reset of its account" | `tests/http.test.mjs:562`, `:1451` |
| `account-session-storage` | "and none named with a password hash its account no longer holds" | `tests/account-storage.test.mjs:1285`, `:1306`, `:1320`, `:1341`, `:1379`, `:1415`, `:1487` |
| `account-attempt-limits` | "or successful password reset"; "unless a password reset has succeeded since"; the client address's count "whether or not a password reset has succeeded since" | `tests/http.test.mjs:1144`, `:1194`, `:1261`, `:1334` |
| `unblock-restores-no-link` | "and sets no password" | `tests/account-storage.test.mjs:1145`, `:1848`, `tests/http.test.mjs:2087` |
| `account-email-via-outsider` | "and password-reset" | none (method `review`) |
| `account-email-nodemailer-starttls` | "and password-reset" | `tests/account-mail.test.mjs:299` |

No invariant test changed: this stage writes no test.

## Sources of the two facts and of the OWASP citations

The pinned commit `c10b2a383841766899f6dcf53c8aff8c7fd3d2e7` could be reached, so F1 and F2 cite it.
`index.js`, `session/store.js` and `session/session.js` were fetched from
`raw.githubusercontent.com` (HTTP 200). `index.js` and `session/store.js` are byte for byte the
installed `node_modules/express-session` (`diff`, no output). Each passage was checked word for word
with `grep -F`: 16 passages found. Reading the code showed F2 for both ways a route arrives: with no
cookie (`savedHash` unset, `isModified` true because `originalId` differs) and with a cookie (`savedHash`
set, `isSaved` false for the same reason); so `isSaved` and `isModified` both stand in F2's source.

OWASP `Forgot_Password_Cheat_Sheet.md` and `Email_Validation_and_Verification_Cheat_Sheet.md` at
commit `995524d4a18e64672c80c8e13869d29ef850bd43` were fetched (HTTP 200) and the cited passages found
with `grep -F`. The task gave the commit in short form; the full form is the one D-155 cites.

## Checks

| Command | Exit code and result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after both commits) | exit 0, `0 errors` |
| same, with `password-reset-link` misspelled in D-218's *Verification*, as a control that the run reads the new entries, then restored | exit 1, `foundations/decisions.md:4045: password-reset-linkx names no invariant`; after restoring exit 0 |

Not run: `npm test`, which the handoff leaves to the orchestrator. No test was written or run.

Own-work check. The requirement this work most likely missed: the words a player reads, and the
projected sentences, standing word for word. The check: 21 strings of To do 1, 3, 4 and 8 and rows 1,
3, 8, 9, 10, 16 and 17, and the three projected decision texts, searched in `foundations/decisions.md`
with line breaks read as spaces, and the three projected invariant sentences in
`foundations/invariants.md`: all 27 found, none missing. A second search over the added lines for
*should*, *will*, RFC keywords, "spec", "the task" and "slice" found only the quoted OWASP passage.

## Reaches beyond the dispatch

- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`, lines 240-351 and
  1776-1817: the task quotes only the binding sentences, and an entry projected in full needs its
  *Based on*, *Verification*, *Rationale* and *Rejected* as approved.
- `.runs/task-cycles/reset-hasla/plan.md`, Slices 1, 2, 4 and *Choices*; `cycle.md`; reports 03 and 04
  by search: how the slices will use the entries.
- `src/server/account-mail.ts` (the shape of a message's body), `src/server/account-policy.ts` (what a
  success clears, for `account-attempt-limits`), `src/server/database.ts` and
  `src/server/session-store.ts` (`saveSession`, `decode`), `src/server/app.ts` (session options),
  `src/browser/view/account-screen.ts`.
- `.the-way/foundations/`: WAY-03, `gate-exit-code`, `return-step-record`, the first facts and the
  glossary's headings, as the elements' examples and "Two glossaries" ask.

## Search of the whole foundation: what it found

Searched `foundations/*.md` for the reset's words, for the lists a reset joins ("logout or",
"block of the account", "three paragraphs") and for every reference to a changed decision.

- **Finding that became an entry's change:** D-100, see below.
- **Links added:** D-152 derives from D-202 (the projected entry says so; the base's entry had
  `none`); D-109 derives from D-152; D-112 derives from D-138 and D-155; F2 in D-112's *Based on*;
  F1 in D-218's.
- **Read and left as they are:** D-103 (the clear evicts nothing, and hashing passes the one gate),
  D-104, D-106, D-107, D-111 (its *Rationale* speaks of confirmation messages and stays true), D-113,
  D-115 (the hash is kept beside the session, so the narrow payload stands), D-116, D-117, D-137,
  D-139 (a replaced password is no correct password, so it does not collide with D-100's addition),
  D-156, D-157, D-159, D-161, D-162, D-163 (the orchestrator's ruling), D-202, D-203, D-205;
  `email-confirmation-link`, `account-message-limits`, `account-mutation-request-guards`,
  `account-attempt-tracking`, `password-operation-gate`, `expired-session-unsaved-progress`, whose
  sentences reach the new routes as written.
- **Numbers:** `decisions.md` holds no list of withdrawn numbers and ends at D-213, so D-214 is next.
- **Collision with another decision:** none. **What entries wait for:** nothing this change brings.
- **Glossary:** no term. The new entries use no word in a meaning a reader of the field would not
  give it. „Gate” is a word of the-way's glossary, so the entries write "password gate", and "attempt
  admission", the word of D-139, instead of the code's "ticket".
- **Part map:** no change, as the plan says.
- **Texts outside the foundation that say less than the entries now do**, left to their slices:
  `guidelines/styleguide-browser-view.md` (Slice 10), `guidelines/testing.md` and the coding
  guidelines (Slice 11), and `guidelines/coding-mail-sending.md:85` among them.

## Choices and concerns

1. **D-100 changed, beyond the plan's table.** Spec Decision 7 and Slice 2 give a login whose password
   was replaced during its check the common message, a released admission and no look at the block.
   That binds after the merge and no entry of the table says it; D-100 answers the question, and its
   text ("a wrong password") did not cover a password that was right when checked. Way rejected:
   leaving it to `complies` in D-112, where a rule about what a player reads would have no binding
   sentence. Cost if wrong: one sentence to take back. The change stays within what the reviewed spec
   carries, so it raises no question.
2. **D-215's condition.** The template bars a stage of the product in a binding sentence, and row 4
   holds "na czas, gdy konta ma tylko właściciel" and the review condition. I kept the row's meaning
   as a condition on the world, not a named stage: "This holds while only the owner has accounts, and
   the decision is reviewed before…". Way rejected: moving it to *Rationale*, which would make the
   condition bind nothing. Cost if wrong: an edit of one sentence.
3. **`Method: test` before the test exists.** The invariants' template says such an entry reads
   `review` (WAY-61); the handoff's ruling and the plan give `test`, and `foundation_check.py` passes.
   I followed the ruling. Until Slices 1, 2 and 6 stand, these invariants have no result (WAY-63).
4. **D-218 holds one sentence beyond the plan's label:** that the route neither uses nor changes the
   session of its request (Decision 8), since no other decision would carry what F1 is the basis of.
5. **The body of D-219 is written as three paragraphs with the link on the line after the first,**
   following „Nadawca i forma jak w potwierdzeniu adresu” and D-158's shape; question 7 writes the
   parts with slashes. Slice 4's check names the link on its own line, so it agrees. Cost if wrong:
   one blank line in a text.
6. **D-214 reads row 3's "czas" as the time of this answer**, as spec Decision 2 does, and its
   *Rationale* holds the accepted stall of the recording commit.
7. **Projected fields the template no longer has** (`Change`, `Review when`, `Approved by`) stayed out
   of D-152, D-153 and D-154, as in every entry already written. In `Rationale` of D-153 the wording
   "the game" stays for the definition's "the MVP", as the base's entry has it.
8. **No critique of the set.** `way_of_working.md` asks for one before a human reviews a set
   together, but this method forbids dispatching a subagent and the cycle judges these entries with
   Slice 1's review and the whole-change review. Named here for the orchestrator.

The plan's split by kind was not needed: the whole set fit one agent.

## Searches not found or unclear

- The invariants' form has no place for "the test file" the handoff speaks of; it stands in the table
  above.
- The plan's slices still read the labels N1–N6, I1–I3 and F1–F2; the mapping above resolves them.
- Otherwise none.
