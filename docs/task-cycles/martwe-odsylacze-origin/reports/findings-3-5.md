# Findings of the review of slices 3–5 (blocking, in the reviewer's words)

Source: `reports/review-3-5-report.md`, first line `FAIL 1879a6d9`. Reviewed range `4605f7e2..1879a6d9`.

## Important

### I-1 — D-03: the accepted costs every library brings, React included, are lost

- **Entry (1879a6d9):** "Lacks of the option chosen: its types stand in a separate package; it comes to
  three packages, 33 with the build tools, and two packages and the types are lifted together; it adds a
  bundler to the build, […]; it adds about 218 KB to the page, which the server does not compress; and
  the tests on the hand-made document model of the screens that move to it lose that model, […]". The
  *Rejected* for the DOM says only "no package and no updates, […] and the tests on the document model
  stay".
- **Note** (`technologia_budowanie_ekranow.md`, § „Konsekwencje”, „Wspólny koszt każdej biblioteki
  (opcja DOM go nie ponosi)”): „D-03 i niezmiennik `browser-view-framework` idą do zmiany. Test […]
  trzeba go przepisać.” · „Dwa strażniki przestaną czytać nowe ekrany, jeśli nie zostaną rozszerzone.
  […] kolor wpisany w `.tsx` przejdzie po cichu.” · „Wspólne kontrolki […] W bibliotece stają się jej
  komponentami albo zostają jako owinięte elementy. Strona kitchen-sink idzie za nimi.” · „Przewodnik
  […] i wzorzec `status-row.ts` trzeba napisać od nowa.” And, against the test cost: „Z drugiej strony
  projekt i tak przepisuje edytor i układ ekranów, więc testy tych ekranów zmieniają się w każdej
  opcji; dotyczy to głównie około 1130 wierszy ekranów gry.”
- **What is lost:** the costs the human accepted with the chosen option (WAY-138 puts them in
  *Rationale*) and the one advantage of the DOM the note names beside them: the framework rule and its
  check rewritten; the checks for values written in place of tokens and for content identifiers
  widened to the new file type, or a colour in a `.tsx` file passes unseen; the shared controls turned
  into components or kept as wrapped elements, the kitchen-sink page following; the browser-module
  guideline and its exemplar written anew — none of which the DOM pays; and the mitigation that the
  screens rewritten anyway change their tests in every option. This is the "lost accepted cost" the
  change exists to prevent.
- **Fix:** add these to "Lacks of the option chosen" in product terms (no file names), and to the DOM's
  *Rejected* that it bears none of them.

### I-2 — D-12: an added sentence states as today's fact a premise the foundation now contradicts

- **Entry (1879a6d9):** "The server holds nothing whose loss the owner fears, the container of the old
  loop game beside it included, so for now the work goes freely; the access needs further securing
  later."
- **Note** (`serwer_testowy_loop2.md`, „Jaki dostęp do serwera dostaje agent?”, 2026-10-12, before any
  account or save existed): „na serwerze nie ma dziś nic, czego utraty Mariusz się obawia, więc na teraz
  działamy swobodnie, a docelowo dostęp trzeba dodatkowo zabezpieczyć.”
- **What is wrong:** the note's „dziś” became a present-tense fact of the log. The server now holds the
  accounts and saved game states the product backs up, encrypts and alerts on (D-228 "Which failure does
  the database backup survive?", D-230 to D-238, D-360). An agent or human weighing D-12 — an agent
  reading through a tool with full rights on that server — reads that there is nothing to lose. The
  reason is carried faithfully but its time is lost, which makes the entry false (check 3 of the
  handoff).
- **Fix:** carry it as the premise the choice was made on, in the past: the access was chosen while the
  server held nothing whose loss the owner feared, the old game's container included, and it was to be
  secured further later. Whether that lapsed premise calls D-12 into question is a matter for the
  human (see *Declined to judge*); the orchestrator may want to raise it.
