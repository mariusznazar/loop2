# Findings of the review of the return step — the blocking finding

Review report: `docs/task-cycles/kronika-z-filtrami/reports/18-return-review-report.md` (first line
`FAIL 638e89e`). The blocking finding below is cut from it in the reviewer's words, unchanged. The review's
Minor findings M1 to M3 are not in this file and are not yours to fix: a Minor finding of the review of the
return step is not fixed and goes to the request's list.

### Important

**I1 — D-348's second binding sentence says every change of the copy is described from the copies
before and after the act; a discard and a save are not, and D-342 forbids it for a discard.**
Place: `foundations/decisions.md:7691-7694` (D-348, second sentence: "The browser view describes a
change the player makes to the copy from the copy before the act and the copy after it, together
with the program rule or rule group the player moved where the program editor names it …").

- In the log's own words a discard, a save and a switch are each "a change of the copy": D-342
  (`foundations/decisions.md:7505-7511`) "Each change of the copy a map run carries out gives an entry
  … „Porzucono zmiany kopii”, „Zapisano kopię w programie „…””, … „Przełączono postać na program
  „…””", and D-131 names "the discard of the copy's unsaved changes" among the changes of the copy.
- The code describes only an edit from the two copies. `src/browser/view/chronicle-entries.ts:307-325`
  (`actEntries`): `case "edit"` → `copyChangeTexts(before.run.copy.program, run.copy.program,
  act.move)`; `case "discard"` → `["Porzucono zmiany kopii"]`, a fixed text whatever the discard
  changed; `case "save"` / `"saveAsNew"` / `"switch"` → a sentence with the program's name from the
  state after. The view knows which act it was from `CopyAct`, which `src/browser/view/game-view.ts:229-261`
  passes at each act site — a source the sentence does not name.
- The reviewed spec says the same as the code and narrower than D-348: D4 (`spec.md:283-291`) "The
  game view gives the chronicle, with each act on the copy, what the act was … a discard: „Porzucono
  zmiany kopii” alone, whatever the discard changed; an edit: one entry for each change between the
  copy's program before and after the act". D-348 drops both the act as a source and the
  qualification "an edit".
- Why it matters: read as written, D-348 requires a discard to be described by comparing the copies
  (entries such as „Usunięto regułę …” for each change reverted), which D-342 and its *Verification*
  rule out, so the two entries collide on a discard with no precedence recorded; and an agent comparing
  the code with D-348 finds the discard and the save non-compliant. This is the case WAY-263 grades
  Important: an entry the change writes restates the code and the spec more broadly, without the
  qualification.
- Evidence: the lines above; `tests/view/chronicle-entries.test.mjs` holds the discard's single text.
- Within the task (the return step's own entry). A wording that matches: "The browser view describes
  an act of the player on the copy from what the act was and, for an edit, from the copy before the
  act and the copy after it, together with the program rule or rule group the player moved where the
  program editor names it, which never enters the simulation, and no event of the simulation describes
  such a change." A complies example such as "„Porzuć zmiany” giving „Porzucono zmiany kopii” alone,
  whatever it reverted" would pin it.
