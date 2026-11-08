done

# Fix report 19 — I1 of the review of the return step

Status: `done`. Commit `d3a2559` on `task/kronika-z-filtrami`; range `638e89e..d3a2559`, one commit,
`foundations/decisions.md` +9 −8, added by path. Worktree clean after it. Nothing else touched: no
code, D-342, D-346 or other entry; M1–M3 not fixed, as the message gives.

## I1 — fixed

Through `the-way-record-decision` (`.claude/skills/the-way-record-decision/SKILL.md` →
`.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`,
`elements/common/way_of_working.md`, `rules.md`, read whole in the return step of this same session),
an edit in place of D-348:

- Second binding sentence, now: „The browser view describes an act of the player on the copy from
  what the act was and, for an edit, from the copy before the act and the copy after it, together
  with the program rule or rule group the player moved where the program editor names it, which never
  enters the simulation, and no event of the simulation describes such a change.” — the reviewer's
  wording. It names the act (`CopyAct`, given at each act site in `game-view.ts`) as a source and
  limits the comparison of copies to an edit, as `actEntries` (`chronicle-entries.ts:307-325`), D-342
  and spec D4 do; no collision with D-342 on a discard is left.
- *Verification*, complies, added: „„Porzuć zmiany” giving „Porzucono zmiany kopii” alone, whatever it
  reverted”.
- *Rationale*: „so the copies before and after it describe the change exactly” → „so the view knows
  what the act was, the copies before and after an edit describe its changes exactly”. *Rejected*
  holds no sentence of the old reading (its items speak of edits and of the simulation describing
  changes), so it stays.

Meaning (`the cycle's`). EN: the view describes the player's act on the copy from what the act was and,
for an edit only, from the copies before and after it, with the moved rule or group as the editor
names it, which never enters the simulation. PL: widok opisuje czynność gracza na kopii z tego, czym
ta czynność była, a przy edycji z kopii przed nią i po niej, z regułą albo grupą przesuniętą wskazaną
przez edytor, która do symulacji nie trafia.

Check that shows it: `tests/view/chronicle.test.mjs:488-505` — a discard that reverts an added rule
gives the one entry „Porzucono zmiany kopii”, while saves and the switch give their fixed sentences
and only edits give „Dodano regułę …”: the code does what the new sentence and example say.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` (worktree root) after the edit: exit 0,
  `0 errors`.
- `git status --short` after the commit: empty.
- No product test run: no code changed.

## Own-work check

Requirement most likely missed: another sentence of D-348 still saying every change of the copy is
read from the two copies. Check: read D-348 whole after the edit (binding part, *Verification*,
*Rationale*, *Rejected*) for „copy before”, „copies” and „change”; each remaining use is about an edit
or about the simulation. Result: none left.

## Reaches beyond this message

- `tests/view/chronicle.test.mjs:485-505` — the discard's single entry, as evidence for the example.

## Searches not found or unclear

none
