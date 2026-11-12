FAIL 1879a6d9

# Review of slices 3–5 — range `4605f7e2..1879a6d9`

Reviewed: commits `43f74d26` (slice 3, D-03 to D-27), `cc0c6eec` (slice 4, D-38 to D-55), `1879a6d9`
(slice 5, D-57 to D-71). Every entry was read from `git show 4605f7e2:foundations/decisions.md` and
`git show 1879a6d9:foundations/decisions.md`, never from the working tree (its HEAD moved to `c0e12bc`
during the review, with `foundations/decisions.md` modified — another agent's slice 6).

Blocking: 2 (Important). Minor: 10. Out of scope: 3 (the lines of *Declined to judge*).

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

## Minor

### M-1 — D-03: facts and numbers the note gives for the rejected options are not carried

The entry carries the main reason of each option; these items of the note's tables are missing
(entry wording quoted where the option stands):

- lit-html (entry: "two packages and no new build tool […]") — note, upkeep column: „Jeden pakiet,
  ostatnie wydanie 14.05.2026 [N1]; Lit 3 prawie bez zmian łamiących [L6]”; change column:
  „Przepisanie ekranów, choć szablon to tekst w pliku `.ts`”.
- Mithril (entry: "types outside the package, 90.8 thousand downloads a month, the last stable release
  in November 2025") — „1 pakiet, 29 z esbuildem i typami”, „bundler w przykładach”,
  „`3.0.0-next.102` w rejestrze”.
- Inferno (entry: "not measured, its way of compiling JSX not read") — „Jeden pakiet z 3 zależnościami”.
- Vue (entry: "23 packages, 75 with Vite and `vue-tsc` […]") — „Da się bez kroku budowania, lecz wtedy
  bez plików `.vue` i `<script setup>`; ten tryb nie był mierzony”; „W rejestrze 3.6 beta”.
- Svelte (entry: "19 packages, 71 with Vite and `svelte-check` […]") — „Kompilator, wtyczka i narzędzie
  sprawdzające do podnoszenia razem”; „format `.svelte` działa tylko tutaj”; „Obsługi `.svelte` w
  Prettierze nie sprawdziłem”.
- Angular (entry: "[…] so building the page would go down to 6.0") — „repozytorium ma 6.0.2 do
  narzędzi, a próba tak się zbudowała”; „Angular obejmuje układ projektu, budowanie i testy […], więc
  zmiana dotyka ich wszystkich”.
- idiomorph — „DOM zostaje pod spodem, ale szablony tekstowe trzeba przepisać”.
- DOM — „W próbie 10,4 KB źródła wobec 4,9–7,2 KB w pozostałych, zgrubnie” and the page weights of the
  table (DOM 12 KB, Preact 28–29 KB, lit-html 21 KB against React 231 KB), of which the entry keeps only
  React's 218 KB more.

The handoff counts a lost number as lost; each is small beside the reason the entry already gives for
its option, hence Minor. Fix: add them to the option's *Rejected* item.

### M-2 — D-03: the human's reason for React over Preact stays only in a note

- **Entry:** "Preact — […] it saves weight at the price of a way of loading it that nobody else uses and
  of a version changing fast".
- **Note** (`definicja_mvp2_loop2.md`, § Technology, the item that projects this question): „Wybór
  Mariusza: React zamiast rekomendowanego Preact, „zamiast kombinować”, po pytaniu o dodatkowy krok
  budowania.” and „Preferencja Mariusza: „nie wiem czy tu nie będziemy o reacta zahaczać”.”
- **Judgment (executor's question 3):** To do 1 binds the notes the old *Origin* names, and D-03's named
  only the technology note, so this is no missed requirement. But this passage is the only place the
  decisive reason lives — Preact was the option recommended, and React was taken over it with its
  extra build step, so as not to tinker with a less-trodden way of loading — and the definition's own
  projection of D-03 is where the entry's text came from. Once every *Origin* reads `none`, nothing
  points to it. Fix: one sentence in *Rationale* (the decider's own motive may stand there, without
  naming the human or the document).

### M-3 — D-04: "the sweep of the clock" is a mistranslation

- **Entry:** "the catch-up passes the moment of the save; the function that passes a game minute and the
  sweep of the clock know neither."
- **Note** (`koncepcja_projektowa.md`, §9 „Wskrzeszenie a doliczanie nieobecności”): „doliczanie podaje
  chwilę zapisu. `tick` i przemiatanie zegara nie znają.”
- **What is wrong:** „zegara” is the object of „nie znają” (genitive after negation): `tick` and the sweep
  (running a program over many seeds, „przemiatanie”, as D-24 now says "sweeping over many seeds") know
  no clock. "The sweep of the clock" is a thing neither the note nor loop2 has. Fix: "the function that
  passes a game minute and the sweep over many seeds know no clock."

### M-4 — D-04: the rejected way B1 of the chronicle question is lost

- **Entry *Rejected*:** "the whole chronicle in the save — the version of the save rises and the size is
  unmeasured, as above; raising the server's limit of 64 KiB for it — changes D-104 and D-207 and is
  work in the account server".
- **Note** (`kronika_z_filtrami_loop2.md`, Pytanie 1, Not chosen B): „wyjście B1, limit wpisów, przy
  którym najstarsze znikają, czyni nieprawdziwym zdanie o kronice z wiersza 286 definicji i kosztuje
  zmianę definicji”.
- **What is lost:** the way of a chronicle in the save capped by a number of entries, the oldest
  dropped. Its reason is stated against a document, but its product reading is in the log: D-338 "A
  manual map run keeps a chronicle of what happened in it" would stop holding. Fix: add "a chronicle in
  the save capped at a number of entries, the oldest dropped — the chronicle would no longer hold what
  happened in the map run (D-338)". In the same *Rejected*, "the approved sentence of D-147" can read
  "the sentence of D-147": "approved" points at the approval of a document the reader cannot see.

### M-5 — D-40: a process cost restated as a veiled pointer to the definition

- **Entry *Rejected*:** "changing this decision to give frames and bars a place of their own — a line at
  a text is part of that text, and the change would add another departure from the entries approved
  before it; writing nothing about frames and bars — the question would come up in the review of a
  change and could stop it."
- **Note** (`zadanie_hierarchia_przyciskow_i_karta_logowania.md`, Pytanie 3b, Not chosen): „nic nie
  zapisywać — sprawa wypłynie w przeglądzie zmiany i cykl może stanąć” · „zmienić D-40 — D-40 dołącza
  do rozjazdu z definicją, plan dostaje kolejny wpis, a zadanie 11, które pisze tę decyzję, musi o nim
  pamiętać”.
- **Judgment (executor's question on D-40):** the first item is reasoning about the product's foundation
  (an unsettled point stops the review of changes) and stays. The second's cost is wholly the process —
  the definition's divergence, a plan entry, a task to remember — and "another departure from the
  entries approved before it" keeps that cost while hiding what it points to: a reader cannot tell which
  entries. Keep the way and the product reason the note gives for the answer chosen ("a line at a text
  is part of that text"); drop "and the change would add another departure from the entries approved
  before it". D-279 already carries both ways with the process wording; that is for its own slice.

### M-6 — D-43: a filler in place of a cost the note does not keep

- **Entry *Rejected*:** "colouring every icon from a token instead of leaving the colour of the other
  icons in their files — the other way open for those icons".
- **Note** (`styleguide_loop2.md`, Q15, Source): „na propozycję definicji z wyjątkami i wariantami dla
  ikon (zostawić kolor w plikach albo barwić ikony z tokenu) z rekomendacją zostawienia: „przyjmuje””
  — no cost is kept for the way not chosen.
- **What is wrong:** "the other way open for those icons" reads as a reason and says nothing. The executor
  reported "no cost recorded in the note"; the entry should say so rather than fill the place. Fix: name
  the way without a dash-reason, or state that it was weighed and no cost of it was kept.

### M-7 — D-51, D-52, D-54, D-55: "a choice for the needs of the MVP, open to a change"

- **Entries:** D-51 "It is a choice for the needs of the MVP, expected to change later, so the entry
  holds what is true today and stays open to a change."; D-52, D-54, D-55 "It is a choice for the needs
  of the MVP, open to a change."; D-55 "The rule holds for the whole MVP".
- **Note** (`siedziba_i_druzyna_loop2.md`, Pytanie 1): „Zastrzeżenie człowieka do wszystkich ośmiu
  odpowiedzi: to wybory na potrzeby MVP, docelowo się zmienią, a żadna decyzja nie może kategorycznie
  zabraniać alternatyw.” The same reservation, recorded for its effect in `ognisko_i_jedzenie_loop2.md`,
  Context: „Brzmienie kandydatów zbudowanych z wyborów na MVP wyznacza zasada […]: kandydat mówi, co gra
  robi dziś, nie nazywa etapu produktu, takiego jak „w MVP”, i nie zawiera słów „tylko”, „nigdy”,
  „zawsze”, „bez” […] — jest to brzmienie jego zastrzeżenia”.
- **What is wrong:** the notes record the reservation as a rule of wording, which the binding sentences
  already keep; the sentence adds a stage name the template keeps out of binding sentences and the
  glossary does not hold, and says nothing every decision does not already hold (a decision binds until
  a change replaces it). "The rule holds for the whole MVP" can be read as a limit in time the binding
  sentence does not have, now that the first version is behind the product. Slices 4 and 5 also differ:
  `ognisko_i_jedzenie_loop2.md`, Q9, puts the same reservation on Q7–Q12 („odniesione przy tej partii
  także do Q7–Q12”), and D-57 to D-69 carry nothing of it, while D-64 and D-66 replaced "MVP" by "the
  scope accepted for the first version of the game". Fix: drop the sentence in the four entries (or, if
  the orchestrator holds it reasoning, write it in one wording in every entry the reservation covers,
  without the stage name), and write D-55's "for the whole MVP" as what Q12 settled: the rule holds also
  beside earning loops.

### M-8 — D-55: "until the map runs are rebuilt around the character" reads as a cost that ends

- **Entry:** "the cost is that characters do not walk side by side in manual map runs until the map runs
  are rebuilt around the character; if earning loops later call for manual map runs side by side too,
  this entry is changed openly."
- **Note** (`siedziba_i_druzyna_loop2.md`, Pytanie 5, cost): „postacie nie chodzą równolegle aż do
  zadania 18, które i tak przebuduje przejścia na postać”; Pytanie 12: „w całym MVP jedno ręczne
  przejście naraz, a zadanie 18 dokłada obok niego pętle zarobkowe, które chodzą równolegle”.
- **What is wrong:** Q12 settled that the rule stays after that rebuild; "until …" tells the reader the
  cost ends with it. Fix: "characters do not walk side by side in manual map runs, also once map runs
  are kept for each character; earning loops go side by side beside the one manual map run".

### M-9 — D-40 (and D-39): an accepted cost of the badge is lost

- **Entries:** D-40 "The badge over the mage's head is a block set apart, so it takes `panel` […]"; its
  *Rejected* carries "the icon and the bar laid straight on the picture of the forest — on a light tree
  the icon could vanish, and no test would catch it".
- **Note** (`scena_z_ludzikiem_loop2.md`, Pytanie 6, named by both *Origin*s): „Mała plakietka na pełnym
  tle `panel` […]. Plakietka zasłania kawałek lasu nad głową.”
- **What is lost:** the cost accepted with the badge on a full `panel` background. Fix: "Accepted with it:
  the badge hides a piece of the forest above the mage's head" in D-40.

### M-10 — D-48: *Origin* keeps a pointer that holds no reasoning the entry lacks

- **Entry:** "**Origin:** the names of the tokens other than the roles were chosen by the cycle, not by an
  answer of the human: Decision 1 of the spec in `docs/task-cycles/styleguide-loop2/spec.md` at commit
  b0c4d44".
- **Source** (`git show b0c4d44:docs/task-cycles/styleguide-loop2/spec.md`, § Decisions, "1. The token
  file is `src/browser/tokens.css`"): "Every other value Q15 counts is a custom property of its own,
  named by what it is for, never by a colour or a number alone"; its *Rejected* concerns the file's
  format (a JSON token file, a TypeScript module), not the names.
- **What is wrong:** the spec states the naming rule and no reason for it, so the whole reasoning is in
  the entry and the template has *Origin* read `none`; "chosen by the cycle, not by an answer of the
  human" tells how the decision was reached. The plan told the executor to keep the pointer, and the
  pointer is allowed (a loop2 file at a fixed commit), so this is Minor; a defect still. Fix: `none`.

## Executors' and the orchestrator's questions — held

1. **Slice 3, D-27, "credits open in a footer of every screen":** not carried — the executor is right.
   The binding sentence keeps the credits in the game's footer, and the footer as built at `1879a6d9` is
   an open list (`src/browser/view/footer.ts`, `createFooter`, an unfolded `<ul class="credits">`; only
   `credits-section.tsx`, on the login card, is folded). Carried as rejected, the way would describe what
   the product does today. The note's reason (dozens of rows below the game) is no cost the human
   accepted either; `koszty_i_stan_ogniska_loop2.md`, Context, says a later task moves the credits into
   folded sections and removes the footer, which is the plan's, not this entry's.
2. **Slice 3, D-03, lit-html "not checked by types":** keep. The technology note says lit-html ships its
   types („Tak, w pakiecie”) and that its template is text in a `.ts` file („szablon to tekst w pliku
   `.ts`”); the clause in its new form, "its templates are text in a `.ts` file, which types do not
   check", speaks of the markup in the template text, not of the package's types, so the two agree. The
   clause comes from the MVP2 definition's own projection of D-03, a note, so it is not invented.
3. **Slice 3, D-03, the human's reason in the definition's Technology section:** should be carried — see
   M-2.
4. **Slice 4, D-44, ways of other decisions left out:** right. Q1's ways of the button-hierarchy note stand
   in D-275 (checked: "leaving every button as it is", "the secondary actions left as plain buttons",
   "text wherever an action is secondary"), the tab ways in D-276 ("a green underline …"); the
   password-reset note's Q1 (a third form always on screen) and Q4 B (checking the link by a separate
   request) answer the sign-in and reset questions, not D-44's. Their carrying falls to the slices of
   those decisions. D-44's *Rejected* "text in place of a button for every action that is secondary"
   now repeats D-275's; harmless.
5. **Slice 4, D-40, process costs in product terms:** the first is product reasoning, the second is not —
   see M-5.
6. **Slice 4, D-48, the spec not opened:** opened here; it holds no further reasoning — see M-10.
7. **Slice 5, D-64, "the scope accepted for the first version of the game":** acceptable: it states what
   that scope fixes (15 pieces taken together) and points to no document. It differs from slice 4's
   "MVP" — one wording across the log, see M-7.
8. **Slice 5, old *Rejected* clauses no note gives:** leave them. The handoff's rule keeps a clause the old
   entry held and no note repeats; none looks wrong against the notes read. Whether they meet WAY-134 is
   outside this task (*Declined to judge*).
9. **Slice 5, D-70, one icon then two:** right. The binding sentence follows the later note (two icons);
   the earlier answer is now the *Rejected* "one icon for both states" with the earlier note's own weak
   point as its reason.
10. **Orchestrator — a skipped step of `read.md` that matters:** `read.md` asks to select and read the
    current entries by "Reading the foundation". One entry shows that reading missed what matters: D-12's
    added premise (I-2) is contradicted by the backup decisions D-228 to D-238, which a reading of the
    entries on the same server would have met. Elsewhere the added references were checked against the
    log and agree (D-07, D-33, D-104, D-147, D-206, D-207, D-249, D-279, D-338, D-339); D-40 and D-44
    repeat ways D-279 and D-275 already carry — no harm.

## Decisions compared against a note passage

All 52 decisions of the range, each against every note its old *Origin* named (read in the snapshot
`the private snapshot of the notes (not committed)/vault/`): D-03, D-04, D-05, D-06, D-07, D-09, D-11, D-12,
D-14, D-18, D-19, D-20, D-21, D-22, D-23, D-24, D-25, D-26, D-27 (slice 3, 19); D-38 to D-55 (slice 4,
18); D-57 to D-71 (slice 5, 15). No invented reason was found: every added clause traced to a note
passage or to the old entry. Entries with nothing found beyond the findings above: D-05, D-06, D-07,
D-09, D-11, D-14, D-18, D-19, D-20, D-21, D-22, D-23, D-24, D-25, D-26, D-27, D-38, D-39 (save M-9),
D-41, D-42, D-44, D-45, D-46, D-47, D-49, D-50, D-53, D-57 to D-71. No pointer to a note, task, question
number or disk place and no secret, host, account, e-mail or personal fact entered a decision of the
range; "the owner" (D-12) names a role, not a person.

## Declined to judge

- The old *Rejected* clauses of D-57 to D-71 (and D-49) that no note's *Not chosen* gives, against WAY-134
  ("A way the writer derives […] never enters it") — this task moves reasoning and changes no meaning; a
  separate pass. Out of scope.
- Whether D-12's lapsed premise (the server now holds player data) calls the decision itself into
  question — a choice for the human, not this task. Out of scope.
- The open footer of credits beside a scope that rejected it (D-27, question 1) — the product's state and
  a later task's work. Out of scope.

## Checks run

| Check | Command / method | Result |
|---|---|---|
| Head of the range | `git rev-parse HEAD` in the worktree | `1879a6d9` at the start; `c0e12bc` with `foundations/decisions.md` modified later (another agent), so every later check ran on a clone at `1879a6d9` |
| Range | `git log --oneline 4605f7e2..1879a6d9`; `git diff --stat 4605f7e2..1879a6d9` | exit 0; three commits; only `foundations/decisions.md` changed (+262/−150) |
| Other files untouched | `git diff --stat 4605f7e2..1879a6d9 -- . ':!foundations/decisions.md'` | exit 0, empty |
| Mechanical comparison | own Python (`python -I`, stdin) over both versions: the part before *Rationale* with the *Origin* line excluded, the set of changed decisions, the *Origin* values, the presence of *Rationale* and *Rejected* | exit 0; 52 decisions changed, exactly D-03…D-27 (the 19), D-38…D-55, D-57…D-71; no change before *Rationale*; every *Origin* `none` but D-48 (the spec at `b0c4d44`); every entry has both fields |
| Clean copy at the head | `git clone -q --shared --no-checkout <worktree> <scratchpad>/clone`; `git checkout -q 1879a6d9` | exit 0 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py <clone>` (the script of the pinned `.the-way`, gitlink `e9a0f92` at `1879a6d9`) | exit 0, `0 errors` (a first run in the worktree is void: HEAD had moved) |
| Note names in the range | `git grep -nIE 'in the vault\|_loop2\.md\|koncepcja_\|rozpoznanie_\|technologia_\|zadanie_\|Notes/Projects\|_zadania' -- foundations/decisions.md` in the clone | first hit line 1547 (D-73); D-71 ends before D-72 at line 1524 — none in the range |
| Private paths | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` in the clone | exit 0; 436 files checked, 0 listed |
| Spec of D-48 | `git cat-file -e b0c4d44:docs/task-cycles/styleguide-loop2/spec.md`; `git show` of it, Decision 1 | exit 0; read |
| Added lines for pointers and leaks | grep of the added lines of the diff for definition, task, note, question, Q-numbers, names, vault, paths, hosts, e-mail, cycle, approved, MVP | method; hits judged in M-4, M-5, M-7, M-10 and I-2 |
| Linked entries | read D-206, D-207, D-104, D-147, D-33, D-279, D-275, D-276, D-338 and the headings D-228–D-238 at `1879a6d9` | method; references agree; D-228–D-238 contradict D-12's added premise |
| Footer as built | `git grep` and `git show 1879a6d9:src/browser/view/footer.ts` | method; open list, for question 1 |
| Glossary | `git show 1879a6d9:foundations/glossary.md \| grep -i "mvp\|first version"` | no entry; log uses "MVP" 12 times at the head, 9 at the base |

Not run: `npm test` (the cycle's run before the request; this range changes one Markdown file).

## Reaches beyond the dispatch

- `src/browser/view/footer.ts`, `credits-section.tsx`, `account-card.tsx` at `1879a6d9` — to judge question 1.
- Decisions D-104, D-147, D-206, D-207, D-228–D-238 (headings), D-275, D-276, D-279, D-33, D-338 and the
  invariant `icon-credits` at `1879a6d9` — references added by the range, and the contradiction in I-2.
- The spec at `b0c4d44` — question 6.
- `.the-way/elements/decisions/skill/read.md` and `SKILL.md` — the orchestrator's question.
- `foundations/glossary.md` (grep) — M-7.
- The plan's slice sections 3–5 (`plan.md:41-69`) — the executors' selection.

## Unread material

- Of the executors' selection (the slices' *Read*): `.the-way/elements/common/way_of_working.md`,
  `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/elements/decisions/examples.md`,
  `.the-way/elements/decisions/skill/decide_entry.md`, `.the-way/foundations/decisions.md` WAY-03,
  `.claude/skills/the-way-record-decision/SKILL.md` and `task.md:81-90` (Context) — not read; the
  template, `rules.md`, WAY-27 and `read.md` were read whole.
- Notes read whole: `technologia_budowanie_ekranow.md`, `serwer_testowy_loop2.md`, `mag_w_lesie_loop2.md`,
  `zadanie_proporcje_sceny_i_programu_loop2.md`, `styleguide_loop2.md`, `ognisko_i_jedzenie_loop2.md`,
  `koszty_i_stan_ogniska_loop2.md`. Read by passage: `koncepcja_projektowa.md` (D9, D10, D14, D15, D17,
  D19, D22, D23, D32–D34, D37, §4 „przedmioty krążą”, §5 map and character passages, §7, §9 the two
  named items), `definicja_mvp_loop2.md` (projected entries of D-05, D-07, D-22, D-25, D-26, D-50),
  `definicja_mvp2_loop2.md` (Technology; projected D-03, D-04, D-06, D-27, D-44, D-53),
  `zapis_stanu_na_serwerze_loop2.md` (To do, question 10, row 10), `rozliczenie_przejsc_loop2.md` (Q11,
  row 7, Questions carried), `kronika_z_filtrami_loop2.md` (Pytania 1–6), `petla_zarobkowa_loop2.md` (Q5,
  Q9, Q10, Q11, Q17, rows 7, 9, 16, 20, Questions carried), `rozwiazanie_lasu_loop2.md` (answers 1–17,
  Q8 whole), `scena_z_ludzikiem_loop2.md` (To do 6, Pytania 6, 7, 12, 13, row 9),
  `stan_i_powod_przy_regule_loop2.md` (To do, Pytania A–G and 1–8), `teraz_i_potem_loop2.md` (To do 3
  and 6, Pytanie 5), `zadanie_hierarchia_przyciskow_i_karta_logowania.md` (To do, all questions,
  settlements), `edytor_programu_loop2.md` (To do 12–15, Pytania 5, 9, 15), `programy_gracza_loop2.md`
  (Q5, Q16), `potwierdzenie_adresu_loop2.md` (question 3, row K4), `reset_hasla_loop2.md` (To do 11,
  questions 1, 4, 13, rows 1, 3, 8), `pytanie_przy_zakoncz_loop2.md` (To do and questions 1–7),
  `testy_bez_portu_3000_loop2.md` (questions, settlements), `siedziba_i_druzyna_loop2.md` (questions,
  Context, settlements), `ekrany_i_menu_loop2.md` (Pytanie 6), `karty_i_katalog_map_loop2.md` (To do 7),
  `plomyk_loop2.md` (Q1, Q3, Q7, Q10), `wprawa_i_drzewa_loop2.md` (Q9, Q10, rows 5–12, the collisions),
  `odkrywanie_loop2.md` (question 11).
- `old-loop/cdc7c0d/src/sim/data/balance.ts` (named by D-21's old *Origin*) — not read; the note's Context
  quotes the value the entry carries.

## Searches not found or unclear

- My first scratch files (`old.md`, `new.md`, `range.diff`) were written into the scratchpad's root
  `the session scratchpad\`,
  which holds the orchestrator's working files, before I moved them into `rev35\`; whether files of
  those names existed there before and were overwritten cannot be told. If the orchestrator kept files
  named `old.md`, `new.md` or `range.diff` there, they are gone.
- The worktree's HEAD moved during the review (`c0e12bc`); this report judges `1879a6d9` only.
- Unclear whether the human's reservation of `siedziba_i_druzyna_loop2.md` is reasoning or a wording rule
  (M-7); held a wording rule on the evidence of `ognisko_i_jedzenie_loop2.md`, Context.
