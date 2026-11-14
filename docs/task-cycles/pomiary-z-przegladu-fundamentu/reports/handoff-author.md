# Handoff — the one author, whole change

**Delegation.** The human asked for this task cycle (`/the-way-implement-task`) and delegated intermediate choices to the orchestrator. No answer below is the human's approval.

**Worktree.** `the root of the task's worktree`, branch `task/pomiary-z-przegladu-fundamentu`, base `aa0ecd09a1037e3aff0ac2bcfc786f2707352929` (origin/main). Work from the worktree's root. Process root: `.the-way`, pinned at `55afa8e57aa1b83c77108576a36642722e0dda15` (equals the gitlink).

**Method and variant.** `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant: **"the whole change as the one author"**. Read that `SKILL.md` whole; read a file it names only when the step or variant that names it comes.

**Stage and boundary.** Make the change, including the foundation step (`.the-way/task-cycle/skill/foundation_step.md`, read whole): write each of the four rows of *Settlements to record* of the frozen task as a change to the named decision, through the pinned project skill `the-way-record-decision` (read its `SKILL.md` whole and the files it names when their step comes), and make the one-comment change in `tests/view/memory-limit.mjs`. Return before review. Do not run the product's gate (`npm test`) — the orchestrator runs it. Do not push, do not open a request, do not commit anything under `.runs/`. Do not take the return step now; you will be resumed for it.

**Frozen task (the whole of it is your source):** `.runs/task-cycles/pomiary-z-przegladu-fundamentu/task.md` — approved 2026-11-13, `Status: ready for cycle`, independent. Read it whole. Its *Context* section is the only source of the numbers; write them as it gives them, with the conditions it names (machine, concurrent gates, one program, a game that knows everything, deaths ending every run) and with what each measurement does not cover. Do not round, recompute or add a figure; a number the *Context* does not give is a `TODO`, never written from memory. The *Out of scope* list binds: D-03 and D-75 are not changed, the chronicle is not moved into the save, the rarity of a mid-run reload stays unmeasured.

**The four rows to write (copied word for word from the frozen task's *To do*):**

1. D-268: próg ponownego otwarcia mówi „więcej niż czterdzieści plików testów na imitacji dokumentu” zamiast dziesięciu, limit zostaje 2 GiB, a uzasadnienie podaje powód z pomiaru D-268 z *Context* (24 pliki, etap Node około 2,9 GiB bez przypadku samego limitu, największy plik 1076 MiB, komputer z 32 GB); komentarz w `tests/view/memory-limit.mjs:9` podaje ten pomiar zamiast „1.68 GB”.
2. D-04, D-147, D-339 i D-347: każde zdanie o niezmierzonym albo szacowanym rozmiarze kroniki i o dawnym pomiarze (mediana 48, najwięcej 102 wpisy, 13,4 KB) podaje pomiar kroniki z *Context*, z tym, czego nie obejmuje; wybór — kronika tylko w pamięci strony — zostaje, a niezmierzona zostaje jedynie rzadkość przeładowania strony w środku przejścia.
3. D-208: liczby rozmiaru zapisu (2947, 6150, 7075 B) i wyliczenie „about 10 earning loops on Las or 8 on „Las — głębiej”” podają pomiar zapisu gry z *Context* — 3 202, 9 838 i 12 402 B oraz policzone wprost 12 pętli na Lesie i 9 na „Las — głębiej” — z założeniami tego pomiaru.
4. D-247: zdanie o pomiarze „about 0.0068 ms … a lower estimate” podaje zmierzony zakres z *Context*, od 0,001 ms (krótkie przejścia kończone śmiercią) do 0,011 ms („Las — głębiej” z walkami z wilkiem) na minutę gry jednej postaci, bez słów o dolnym oszacowaniu.

Row numbering for your report: rows 1–4 of *Settlements to record*; the *To do* items 1–4 correspond one to one (row 1 = item 1, … row 4 = item 4). Mark each entry `row <n>`.

**Answers of the orchestrator to the two questions at start** (`cycle.md`): trust boundary — no; irreversible operation — no. No open design choice, no spec, no plan. Your class is `same` as the orchestrator's.

**Base facts the orchestrator found.** The task's measurements were made on `fc00c406`; your base `aa0ecd09` is 8 commits ahead (the last is PR #90, the combat-tree thresholds, D-379). Before you write a figure that cites a line of code (`tests/view/memory-limit.mjs:9`, `src/browser/sim/saved-game.ts:78`, `src/browser/sim/loop.ts:576`–`:588`, `scripts/test.py:44`), check on your base that the line still says what the *Context* says it does and name any drift in your report. The numbers themselves are not re-measured by this change. Checks already failing on the base: none — the orchestrator ran the full gate (`npm test`) on the untouched base and it exited 0.

**What you read (selected by the orchestrator):**
- Foundation entries by identifier, each whole: D-268, D-04, D-147, D-208, D-247, D-339, D-347 (the task's *Decisions in play*) and the invariant `document-test-memory-limit`; the entries they link to (*Relations*, *Based on*, *Verification*) as far as the wording needs them. Then select the rest by the method of `the-way-record-decision` step 1 for the parts touched: `product-foundation` (the files `foundations/**`) and `browser-view` (`tests/view/memory-limit.mjs`), including the entries of the part map for both parts and the glossary terms the text uses (chronicle, map run, earning loop, camp, headquarters as the glossary has them).
- Guidelines, each whole: `guidelines/coding.md` and `guidelines/testing.md` (a test helper's comment is changed). No file `guidelines/coding-<kind>.md` matches.
- `AGENTS.md` and `src/browser/AGENTS.md` are not needed; the change touches nothing in `src/browser/`.
- Rule of the product on tests: every test of the repository runs with `npm test`; focused runs of a single file go through `python -B scripts/test.py <file>`. For the foundation use `python -B .the-way/elements/common/foundation_check.py`.

**Commits.** English commit messages in the style of the repository (`docs: :card_file_box: …` for foundation entries, `docs: :memo: …` or `chore:` for the comment; see `git log --oneline -10`). Stage by path (`git add <path> …`), never `git add -A` or `git commit -a`. Check `git log --format='%h %ae'` shows the repository's expected author address. Commit the entries and the comment in commits of your own on the task branch; leave the tree clean.

**Report.** Write your full report to `.runs/task-cycles/pomiary-z-przegladu-fundamentu/reports/author-report.md` as `make-change` gives it, with the sections **Unread material** and **Searches not found or unclear** and the own-work check; for each entry one sentence of its meaning in English and one in Polish, marked `row <n>`, `projected` or `the cycle's`. Return status, commits, a one-line check result naming what failed or did not run, and the report's path. A check you ran carries its command and exit code.
