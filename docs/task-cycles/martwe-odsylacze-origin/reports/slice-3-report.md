# Slice 3 report — reasoning of D-03 to D-27 into the entries

- **Status:** done with concerns (two questions for the orchestrator below; nothing blocked)
- **Slice base:** `4605f7e2dc71cc55a8e9195e3cb1c174980661a3` (HEAD was still it at the start; worktree clean)
- **Commit:** `43f74d26` — `docs: :memo: carry the whole reasoning of D-03 to D-27 in the entries and read their Origin as none`
- **Files changed:** `foundations/decisions.md` (+177 / -79 lines by `git diff --stat`, before the last small edits)

## Checks

| Check | Command | Exit |
|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| No note names inside the slice's decisions | `git grep -nIE 'in the vault\|_loop2\.md\|koncepcja_\|rozpoznanie_\|technologia_\|zadanie_\|Notes/Projects\|_zadania' -- foundations/decisions.md` | first hit is at line 945 (D-38), after D-27 which ends near line 790; none inside the slice |
| Diff read whole | `git diff 4605f7e2 -- foundations/decisions.md` | every changed line is a `*Rationale*`, `*Rejected*` or `*Origin*` line or a continuation of one, of D-03, 04, 05, 06, 07, 09, 11, 12, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27; binding sentences, Scope, Based on, Relations and Verification untouched |

The product gate (`npm test` with no argument) was not run, as instructed. The entries were written by direct edit of
`foundations/decisions.md` following `the-way-record-decision` (read: SKILL, `read.md`, `decide_entry.md`, template, examples,
`rules.md`, `way_of_working.md`, `foundation_step.md`); the skill's step 4.3 check is the foundation check above.

## Own-work check

- Requirement most likely missed: "a reason a note does not give is not added, one it gives is not lost." Check: after writing, I
  compared each added clause with its source passage (the note, line by line) and found one place where I had first written
  something the current entry contradicts: I had added "the same generator draws the direction of wandering" to D-22 from the
  old single-stream wording of the concept; D-22's binding sentence now has a generator per kind of draw, so I removed it, and
  also removed a sentence about splitting the generators that restated an existing Rejected item.
- A second pass checked every figure copied from the technology note (package counts, downloads, throttling, 48 runs, 144 drags,
  98.5%, 368 ms, 218 KB, 20 dependencies) against the note's tables and its critique section; the critique's caveats (trial screen is
  not the real editor, throttling is no laptop model) are carried in D-03.
- Decision references added (D-07, D-33, D-104, D-147, D-206, D-207) exist in the log; `foundation_check.py` reports no missing reference.

## One line per decision: what moved, from which passage

- **D-03** — from the technology note (whole note; it names this decision): the focus fault of the DOM editor, the trial (conditions, results, idiomorph exception, the critique's caveats), React's costs (packages, bundler/format, types, page weight, traps, store fit, majors, move to Preact), the loss of the hand-made document model and need for jsdom/happy-dom, the partial-library option, and a per-option *Rejected* (DOM, Preact, lit-html, Solid, Svelte, Vue, Angular, Mithril, VanJS, Inferno, Alpine, idiomorph, uhtml/htm, htmx/engines/morphdom). Origin `none`.
- **D-04** — from the concept's D10/§7/§9 "Wskrzeszenie…": simulation not knowing the world as a picture, how the earning loop/catch-up/function of a game minute get real time, Godot "sensible if movement and collisions become the heart" (*Rejected*); from the save-on-server note Q10 / row 10: refusal causes and the accepted cost of a function reading untrusted data; from the settlement-of-passages note Q11: the browser's clock for the renewal of a resurrection with the accepted cost, and the rejected server clock; from the chronicle note Q1: why the chronicle stays out of the save (save version, unmeasured size, 64 KiB limit), what a load leaves of it, the two unmeasured hypotheses, and the rejected options A, B, B2. The MVP2 definition's D-04 passage and the scene note's "Decisions in play" add nothing the entry did not already carry. Origin `none`.
- **D-05** — the MVP definition's entry was already whole in the entry; moved only its condition for the choice (serving through Express stays easy to operate, the API needs no process of its own). Origin `none`.
- **D-06** — from the technology note: why the compiler alone is not enough (package names left in `import`), tools only at build time and no new process/service/fee, the checked failure of React under an import map and that lit-html/Preact load that way. Origin `none`.
- **D-07** — from the concept's D23: the whole game as a JSON saved state with the browser counting the time away, the version number the server compares, nothing for a server to compute with no browser open, the rejected save without a version number; from the MVP definition: the list of what would end the acceptance of forgeable progress. Origin `none`.
- **D-09** — from the concept §7 "Wdrożenie": the key shut into one command that checks the commit belongs to the branch; "a dozen or so seconds" of break. Origin `none`.
- **D-11** — from the server note: a separate deployment step with its own test environment may be added later. Origin `none`.
- **D-12** — from the server note: nothing the owner fears to lose on the server, the old game's container included, so free work for now and later securing; "for now" on the rejected options. Origin `none`.
- **D-14** — the note gives only a "yes" to a proposal and no reason; nothing to move. Origin `none`.
- **D-18** — from the concept D10/§7/principle 4 and D17: what stands in data files, cheap swap of skin and names for the author's own IP, a map is a row of data and each further map teaches or challenges. Origin `none`.
- **D-19** — from the terrain-panel question, concept §5 and the proportions note (To do 2, Decisions in play): the drawing's icons without numbers and dimmed at zero, only draws what it is given, where the area with the list stands and the accepted cost in a low window, and the rejected placements (under the program in a joined column; as a third tab "Program | Kronika | Teren"). Origin `none`.
- **D-20** — from the program-change question: no interruption by a program change or another rule's condition even for a long action, effect from the next free minute, and the solving condition that assumes changes during a map run (*Rejected*). Origin `none`.
- **D-21** — from the pace question, the Context line on loop's 1×, loop's balance data (snapshot file `old-loop/cdc7c0d/src/sim/data/balance.ts`), the forest-solution questions 2/3/13 and the concept's D22: puzzle vs income split, loop's data value, the five buttons and that 2×/4×/8× are a proposal, 3.2 minutes per refresh, and the rejected shared pace control. Origin `none`.
- **D-22** — from the concept's D19 and §9: restart/new map seed rule, seed for the catch-up, rolls meant to enter combat, order of the layout draws is a contract; from the earning-loop note Q10/row 9: first run's seed is real random in the old game. Origin `none`.
- **D-23** — from the concept's D14/D15/D9: the seven slider settings that ended identically in the old game, the reversed fear, the condition of a rule being single, the combat use of groups, "separate editor or tab". Origin `none`.
- **D-24** — from the concept's D32/D17/§5: finite resource as a challenge of its own, a map leaving a resource off, the data-only challenges, a map as a row opened by the previous, the consequence of random layout (sweeping, every balance number shifts), squares make the map smaller than it looks. Origin `none`.
- **D-25** — from the concept's D33/§5 and the MVP definition's entry: an attack interrupts a move, same rule fires again, the principle that the program decides each action, exploring a revealed tile would grind practice. Origin `none`.
- **D-26** — from the concept's D34: several campfires, one to a tile, "nearest" as the one stable reference, the accepted inability to point at a farther one. Origin `none`.
- **D-27** — from the concept §7 "Grafika" and the MVP2 definition's entry: outside packs under commercial licences, sources outside the served directory, credits in the footer; "with dozens of icons". Origin `none`.

## Questions for the orchestrator

1. **D-27 *Rejected*: "the credits open in a footer of every screen — dozens of rows standing below the game"** is in the MVP2 definition's passage but I did not carry it. The current binding sentence says "The game's footer and a section of credits on the login card, folded and opened with one click, each credit each icon"; the invariant `icon-credits` also puts credits in the footer. Whether the footer's credits are folded is not clear from the sentence, and the definition's *Rejected* may now contradict it. I changed nothing in the binding sentence. Recommendation: the human decides whether the footer is folded; if yes, add the rejected option to D-27; if not, it stays out.
2. **D-03: the existing "lit-html — its templates are not checked by types"** comes from the MVP2 definition's projected entry, not from the technology note (which says lit-html types are in the package and its templates are text in a `.ts` file). I kept it and added the note's own facts beside it. Nothing contradicts a binding sentence.

## Reach beyond the dispatch

- Read the MVP2 definition's `## Technology` section and its projected D-03/D-06/D-27 entries (not named for D-03/D-06, named for D-27) to see where the choice of React was recorded: it holds "Wybór Mariusza: React zamiast rekomendowanego Preact, 'zamiast kombinować', po pytaniu o dodatkowy krok budowania". That passage is not named by D-03's *Origin*, and the human's reason is not in the existing entry beyond its rejected-Preact line; I did not add it. If the orchestrator wants it carried, it is a one-sentence addition to D-03's *Rejected* for Preact.
- Read `foundations/decisions.md` D-104/D-147/D-206/D-207/D-339 headings and D-147's text only to check the references I added. D-339 already holds the chronicle's place and what stands after a load.
- Not carried because it does not bear on the decision: the technology note's finding that a bar animated by `transition` on `width` cost more than any library (independent of the option) — it may belong to the styleguide, not here.

## Unread material

- The scene note (`scena_z_ludzikiem_loop2.md`) was read at the passages D-04 names (Decisions in play and the lines about the scene's previous reading); the rest of it, and the rest of the other notes, were not read, by the plan's rule (passage, not whole note). The technology note, the server note and the forest note `mag_w_lesie_loop2.md` were read whole; the rest were read by passage: concept (D9, D10, D14, D15, D17, D19, D22, D23, D32–D34, §5 lines 321–385, §7, §8, §9 lines 1252–1262 and 1314–1340), save-on-server (Q10, row 10, Context lines, Questions carried), passages-settlement note (Q11, Questions carried), MVP definition (the seven projected entries and "How fast does the earning loop go?"), MVP2 definition (Technology, D-03/D-04/D-06/D-27 entries), chronicle note (Q1, D-04 mentions), earning-loop note (Q10, Questions carried, row 9), proportions note (read whole), forest-solution note (Q2, Q3, Q4 context, Q13).
- Not read: `.the-way/foundations/decisions.md` WAY-03 and WAY-27 were read (their passages); `task.md` passages of the handoff were read as copied in the handoff; the files of the slice's *Read* list not read in full: none other.

## Searches not found or unclear

- None missing from the snapshot. Unclear: question 1 above (footer folded or not).
