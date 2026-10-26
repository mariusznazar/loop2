# Foundation step report

Status: done

Worktree: C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki
Branch: task/grupy-regul-i-liczniki
Base: 9a5f3605f73da87fc5c87089c8166d2658c0add6
Commit: e5ea04757c56bf80e84059ee403c854b7087ea3a — Record rule groups and firing count decisions

The foundation stage is complete. No implementation slice or return step was executed. The
orchestrator's go-ahead was provisional, not human approval. The foundation's new behaviour is
not yet implementation evidence: the following slices implement groups and counts, and task 8
implements combat while keeping the recorded firing meaning.

## Files

| File | Added | Removed |
|---|---:|---:|
| foundations/decisions.md | 106 | 7 |
| foundations/glossary.md | 8 | 2 |
| foundations/invariants.md | 4 | 2 |
| foundations/part_map.md | 1 | 0 |
| tests/invariants/program_fixture.py | 5 | 0 |

## Entries and the settlements they cover

Line ranges refer to the committed worktree above. F-numbers are the plan's foundation rows.

| Plan row | Actual entry and current lines | Task settlement or projection |
|---|---|---|
| F1 | D-90, foundations/decisions.md:1582–1600 | Settlement row 1, whole |
| F2 | D-91, foundations/decisions.md:1601–1618 | Settlement row 2, whole |
| F3 | D-92, foundations/decisions.md:1619–1640 | Settlement row 3, whole, combat included |
| F4 | D-93, foundations/decisions.md:1641–1671 | Settlement row 4, whole |
| F5 | D-93, foundations/decisions.md:1641–1671 | Settlement row 5, whole |
| F6 | D-23, foundations/decisions.md:490–525 | Assigned projected “How does a character act by its program?”, whole |
| F7 | D-93, foundations/decisions.md:1641–1671 | Assigned projected “What does a program rule show the player?”, interpreted by accepted rows 3–5 |
| F8 | rule group, foundations/glossary.md:59–64 | Assigned projected glossary entry, whole |
| F9 | program-rule-pick, foundations/invariants.md:234–247 | Revised grouped meaning of D-23; existing test path tests/invariants/test_program_rule_pick.py retained |
| F10 | simulation, foundations/part_map.md:27–55 | Exact ownership of tests/invariants/program_fixture.py; tests/sim/** already owns the JS helper |
| Consequence of F1/F8 | program, foundations/glossary.md:25–31 | Ordered groups with ordered rules made explicit; existing trip-plan clause preserved |

No existing entry already stated any of the five new settlement rows. Rows 4 and 5 belong with
the projected count-display question in D-93: the entry records what count the player sees and
when that count resets, rather than repeating those binding sentences under extra numbers.
D-23 retains its existing number and existing invariant links. Its simulation-chosen item piece
is supported by src/browser/sim/program.ts:itemFor (lines 74–85): the data's order and backpack
content select the piece, and program rules do not choose the piece. This reading did not alter
the item-selection implementation.

### Meaning sentences for the request

- D-90: Program jest uporządkowaną listą grup, a każda reguła należy do dokładnie jednej z nich.
- D-91: Nowa gra zaczyna z jedną pustą grupą „Program” z warunkiem „Zawsze”.
- D-92: Zadziałanie reguły liczy rozpoczęcie jej akcji raz, także w każdej turze walki, w której reguła rozpoczyna czynność walki.
- D-93: Przy regule widać liczbę zadziałań ze znakiem „×”, zachowaną przez przestawienia i zmiany grupy oraz po końcu przejścia, zerowaną po zmianie treści reguły i na starcie kolejnego przejścia, a przed pierwszym przejściem liczby nie ma.
- D-23: Postać wybiera pierwszą spełnioną i wykonalną regułę z kolejnych grup o spełnionym warunku, przepuszcza grupy bez wykonalnej reguły, korzysta z jednego piętra grup i zamkniętej listy warunków, a sztukę zużywanego przedmiotu wybiera symulacja.
- program-rule-pick: W każdej wolnej minucie gry wybór respektuje kolejność grup i reguł oraz oba warunki i wykonalność akcji, a przy braku takiej reguły postać żadnej nie rozpoczyna.
- rule group: Grupa reguł to nazwany zestaw reguł programu pod własnym warunkiem.
- program: Program opisuje zachowanie postaci przez uporządkowane grupy z uporządkowanymi regułami i zawiera plan wyprawy.
- simulation: Część symulacji obejmuje również pomocnik przygotowujący programy jako dane wejściowe testów niezmienników.

## Checks

All commands ran from the worktree root.

| Command | Exit | Result |
|---|---:|---|
| git ls-files --stage -- .the-way | 0 | Gitlink 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c |
| git -C .the-way rev-parse HEAD | 0 | Same pin |
| python -B .the-way/elements/common/foundation_check.py | 0 | 0 errors after helper ownership |
| python -B .the-way/elements/common/foundation_check.py | 0 | 0 errors after glossary entries |
| python -B .the-way/elements/common/foundation_check.py | 0 | 0 errors after D-23 |
| python -B .the-way/elements/common/foundation_check.py | 0 | 0 errors after program-rule-pick |
| python -B .the-way/elements/common/foundation_check.py | 0 | 0 errors after D-90/D-91 |
| python -B .the-way/elements/common/foundation_check.py | 0 | 0 errors after D-92 |
| python -B .the-way/elements/common/foundation_check.py | 0 | 0 errors after D-93 |
| git diff --check | 0 | No whitespace errors |
| python -B .the-way/elements/common/foundation_check.py | 0 | Final staged change: 0 errors |
| git status --short | 0 | Empty after commit |

Not run: npm test. This stage changes foundation prose and introduces only the trivial input
builder authorized below; the orchestrator assigned its full gate to Slice 1. No product test
result is claimed here. No separate helper test is added under D-73's rule for copying data.
No invariant test was modified in this stage, and no failing-first result is claimed. In
particular the current program-rule-pick test still checks its flat scenarios; the grouped
scenarios, failing controls and failing/passing npm test evidence are required in Slice 5.
Docker coverage remains unchecked here; its availability is to be verified by the next full gate.

Own-work check: the most likely omission was losing a settlement when combining the count
entries, or omitting the simulation's item choice from D-23. I compared all five accepted rows,
all three assigned full projections, and F1–F10 with the committed entries (mapping above), read
itemFor, and inspected the complete diff. All are represented; the combat sentence remains
whole and the accepted post-Stop interpretation replaces the projected ambiguity. Structural
validity was checked by the final foundation command (exit 0); this does not prove future game
behaviour.

## Reaches, choices and follow-on work

1. F10 initially named a file that Slice 3 had yet to create; the map rules reject a pattern
   matching no tracked file. The orchestrator explicitly expanded this stage to create the
   actual tiny program_from_rules input builder, returning {"rules": rules} unchanged. It was
   added and staged before the ownership check. Rejected: a knowingly invalid map until Slice 3,
   or an empty placeholder. Cost if wrong: the helper is introduced before its consumers; Slice 3
   must use it and Slice 5 changes its representation once. Read the coding/testing guidelines,
   the simulation kind guideline, and the existing Python helper conventions before writing it.
2. D-93 combines F4, F5 and F7 under one question about the count shown beside a rule. Rejected:
   three decisions repeating or splitting the same lifecycle. Cost if wrong: later independent
   changes require separating the question; the current complete row-to-entry mapping makes that
   visible. D-92 independently defines firing, including combat; it prescribes no combat engine.
3. The glossary program now explicitly names the grouped structure. The search of tracked uses
   found the same domain meaning, ordinary software uses in tooling, and flat implementation
   details already assigned to Slices 1–7, not another product meaning needing a renamed term.
   README's old flat editor description belongs to Slice 7. The trip-plan clause is preserved;
   removing it would revise a separate meaning not authorized by this task.
4. Existing D-20, D-25, D-26, D-65, D-71, action-in-progress and program-closed-lists were checked
   against the enlarged D-23 and remain consistent. program-closed-lists already covers every
   condition a program holds; Slice 5 must add refusal and acceptance evidence for group
   conditions. No guideline rules, role meanings, token values or rule/group identity scheme
   were added to the foundation.
5. The extra verification examples and rationale/rejected-option wording are the writer's
   recommendations within the accepted meanings, not new human approvals. New decision origins
   read none where their full reasoning is in the entry; the accepted projected origins remain
   on D-23 and D-93. No external effect, external file edit, push or PR was performed.

Required next work: Slice 1 includes this commit in its review range and runs the full gate;
Slice 3 consumes the existing Python builder; Slice 5 implements groups and updates the existing
program-rule-pick test with grouped scenarios and negative evidence; Slices 6–7 implement count
lifecycle and group editing with real-browser evidence. The request must map all five rows to
the decisions above and name tests/invariants/test_program_rule_pick.py when Slice 5 changes it.
The future combat task 8 must increment counts per started combat action under D-92.

Questions: none.
