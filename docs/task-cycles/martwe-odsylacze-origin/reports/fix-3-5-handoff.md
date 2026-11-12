# Handoff — the fix of a review's findings (`make-change`, "the fix of a review's findings")

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human nothing. Questions go
to the orchestrator in your report (status `questions`).

- Worktree (work from its root): `the repository root`, branch `task/martwe-odsylacze-origin`.
  Base of your fix: `git rev-parse HEAD` when you start (write it in your report); the worktree must be clean when you start.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names for a fix when the variant comes.
- What you fix: the two blocking findings (I-1 and I-2) in `docs/task-cycles/martwe-odsylacze-origin/reports/findings-3-5.md`,
  copied from the reviewer's report. They concern decisions D-03 and D-12 of `foundations/decisions.md` (slices 3 and 3).
  The Minor findings of that review are not yours to fix (they go to the request's list); touch no other decision.
- The entries are changed as the slices changed them: only *Rationale*, *Rejected* and *Origin* lines (and their continuation lines);
  the part before *Rationale* stays as it is. "Through the project skill `the-way-record-decision`" means doing the skill's steps
  (its `read.md` reading, deciding what the entry is, drafting, writing — an edit of the file — and the check); say in the report which
  steps you did. For I-2, the reviewer asks to carry the premise in the past tense; read the backup decisions the finding names (D-228,
  D-230 to D-238, D-360) before you write it.
- Private sources: the snapshot `the private snapshot of the notes (not committed)/` (`MANIFEST.md`, `vault/`). The notes the findings quote are
  `technologia_budowanie_ekranow.md` and `serwer_testowy_loop2.md`. Never open, commit, stash or check out anything in the vault
  `the author's notes` or in `the local clone of the old game's repository`. Nothing an entry gains names a note, a task, a question number,
  a path on a disk or a copy of a task document; no secret, host address, account, e-mail address or personal fact. A reason a note
  does not give is not added.
- Answer with evidence a finding you hold wrong, instead of fixing it.
- Run the affected checks again and report each with command and exit code: `python -B .the-way/elements/common/foundation_check.py`
  (exit 0) and `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md`
  (no line inside D-03 and D-12). Do not run the product's gate.
- Commit on the task branch (`git add` by path; message in English, `docs: :memo: …`); do not push.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/fix-3-5-report.md` with the checks, the own-work check, **Unread material**
  (or `none`) and **Searches not found or unclear** (or `none`). Return: status, commits, one-line check result, report path.

## The findings (copied word for word from the reviewer)

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
