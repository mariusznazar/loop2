# Handoff — classification of the sentences of `guidelines/coding.md` (one of two independent classifiers)

You are one of two agents who classify the same file independently. Do not look for, read or ask
about the other agent's work: its report path is not given to you and you must not search
`.runs/` for any other report. Work from the worktree
`the worktree of the task` (read-only: change no tracked file; write only
your report). Use Read/Grep/Glob and, for history, `git` from that directory.

The person who requested this cycle (Mariusz) delegated intermediate choices to the cycle; this is
a measurement stage of the task, not a code change, and it is not a the-way method stage, so no
`SKILL.md` of the-way is read for it.

## What the measurement is for

The task trials whether `guidelines/coding.md` (361 lines, read whole by every agent of loop2's
cycle before it changes code) can be shortened without agents writing worse code. Before anything is
shortened, every sentence of the file is put into one of five groups. Your classification decides
what a later stage removes or replaces. Where you are unsure, say so in the `confidence` column
instead of rounding to the likelier group.

## The five groups (copied from the task, word for word)

- znana praktyka — zdanie opisuje coś, co model zna pod ogólnie przyjętą nazwą, np. „Awarii nie zamieniaj ani w odpowiedź »wszystko w porządku«, ani w pustą listę” (`coding.md:190`), praktyka znana jako „fail loudly”; na gałęzi zastępuje je nazwa;
- decyzja projektu — zdanie niesie wybór, który zapadł w loop2 i którego żadna znana nazwa nie przekaże, np. „z błędu czytaj tylko jego nazwę i kod oraz numer `errcode` SQLite, nigdy `message` ani `stack`” (`coding.md:237-238`); zostaje;
- przypadek wyprowadzalny z celu — reguła podaje cel, a potem wylicza przypadki, które z niego wynikają, np. „Wiersz spoza przebiegu sprawy […] nie niesie żadnego identyfikatora” (`coding.md:209-211`); zdejmuje się go tylko wtedy, gdy nie powstał dlatego, że agent go z celu nie wyprowadził;
- spis stanu — zdanie wylicza, co już spełnia regułę, np. „`account-database-check`, `measure-passwords`, `deploy/loop2-backup` i `scripts/restore-trial.mjs` już ją mają” (`coding.md:175-177`); wychodzi z reguły;
- powtórzenie decyzji albo konfiguracji — zdanie powtarza decyzję nazwaną w polu *Decision* reguły albo wartość z pliku konfiguracji, np. „Ruff 0.17.1 […]: 393 reguły z domyślnego zestawu 407 reguł bez preview blokują” (`coding.md:51-53`); wychodzi z reguły, a zostaje to, co autor kodu ma zrobić, np. „Naprawiaj zgłoszenie w pliku, zamiast wyciszać blokującą regułę” (`coding.md:67`) i „nowy skrypt Bash dopisz do listy w `tests/quality/test_quality_invariants.py`” (`coding.md:61-62`).

Use the English labels `known-practice`, `project-decision`, `derivable-case`, `state-listing`,
`repeated-decision-or-config`. A unit that is a table row, a list bullet of the logging scope or a
path in *Where in code* is no sentence: label it `structure` and give a one-line reason.

## Rules for the work (task questions 3 and 5, answers copied)

- A mixed sentence — one that starts with a practice and ends with a decision — you split into
  members and classify each member separately, e.g. in `coding.md:190-193` the first sentence
  („Awarii nie zamieniaj […]”) is a known practice and the second („Tryb zdegradowany […] zawsze
  zostawia wiersz w logach”) is a project decision that stays. Name the members `S057a`, `S057b`
  and so on, with the exact words of each.
- The origin of a derivable case you establish from history: `git log -S "<fragment of the sentence>"
  -- guidelines/coding.md` gives the commit that added the sentence; the record of the task cycle
  that made the commit, added and removed from the tree in loop2's history (`git show
  <commit>:docs/task-cycles/<slug>/cycle.md`, `git log --diff-filter=A --name-only -- docs/task-cycles`
  to find it), says whether the case was added after an agent's mistake. A case that the cycle
  record or a review remark ties to an agent's mistake stays (label it `derivable-case` and put
  `origin: agent-mistake` in the provenance column; the later stage keeps it). A case of unknown
  origin gets `origin: unknown`. A case added from the rule's purpose with no mistake behind it gets
  `origin: no-mistake`. Do this for every unit you label `derivable-case`; each such unit may cost a
  few history searches, and that is expected.
- A second property of every unit, `source`: `template` if the sentence is translated or copied
  from the coding-guideline template of the pinned the-way (`.the-way/product-guidelines/coding/template.md`,
  its failures-and-logs rules stand at about lines 184–215, and the template's own words of the
  other rules), or `own` if loop2 wrote it (names of its files, functions, processes, decisions,
  wording that is not in the template). A sentence that mixes both is split like any mixed sentence.
- A sentence that only names a decision or a file is `structure` only if it is a table row, a list
  bullet or a path; otherwise classify it.

## What to read (selected by the orchestrator)

1. `guidelines\coding.md` — whole.
2. The units, with ids and line ranges:
   `docs/task-cycles/proba-krotszych-wytycznych/reports\inputs-sentences.md`.
   Use these ids. If you find a stretch of `coding.md` that no unit covers (check it), report it as
   an extra unit `S9xx` with its text. The `Good`/`Bad` lines of the rules and the fenced examples
   are not units; leave them out unless a unit's classification depends on them.
3. `.the-way\product-guidelines\coding\template.md` — whole.
4. In `foundations\decisions.md`, whole: D-28,
   D-29, D-30, D-31, D-32, D-33, D-252, D-253 (find each by its `### D-nn` heading).
5. The task document, for the meaning of the groups and the questions:
   `docs/task-cycles/proba-krotszych-wytycznych/task.md`
   (sections *To do*, questions 1–5).
6. Config files are named by the units; read the ones a unit's classification depends on
   (`eslint.config.mjs`, `ruff.toml`, `package.json`, `requirements-quality.txt`, `prettier.config.mjs`).

## Report

Write the full report to
`docs/task-cycles/proba-krotszych-wytycznych/reports\classification-<YOUR LETTER>.md`
where `<YOUR LETTER>` is given in the message that dispatched you. The report holds:

1. A table with one row per unit or member, columns:
   `id | lines | rule (section name) | group | source (template/own) | origin (only for derivable-case) | confidence (high/medium/low) | one-line reason | for known-practice: the name of the practice that would replace the sentence`
   Every unit of the units file appears (a split unit appears as its members). Keep the text of a
   member that you split; for the others the id is enough.
2. Counts per group (own sentences and template sentences apart).
3. A list of the sentences you are least sure of, with the two groups you hesitated between.
4. Section **Searches not found or unclear** — each thing you looked for and did not find, or that
   was unclear, or `none`.

Return to the orchestrator only: status (`done` or `questions`), the report path, the counts per
group in one line, and the number of low-confidence rows. The report is the deliverable, not your
message.
