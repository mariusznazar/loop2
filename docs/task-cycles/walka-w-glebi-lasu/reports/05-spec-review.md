FAIL

# Independent spec review

Reviewed `spec.md` against the whole frozen `task.md`, the selected foundation, current integration code, and `reports/02-design-report.md` / `reports/03-design-answers.md`. No implementation, spec edit, foundation edit, test edit or product gate was performed.

## Finding 1 — carry the combat exception back to the cooling decision

Location: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/spec.md:139` (Foundation entries), against `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/foundations/decisions.md:1130` (D-58 binding sentence).

D-58 currently says, in full:

> A character's body cools in each game minute by more, the further the game map's ambient temperature lies below the body's starting temperature, and the ambient temperature stands in the game map's data.

The frozen task To do 6 / Q1 and the spec's minute table at line 78 explicitly stop the body in M+1 through M+5. That accepted exception is correct. However, the Foundation entries table names D-60 and D-61 for limiting the ordinary needs/health step and D-71 for minute ordering, but never names D-58. D-60 addresses health loss and regeneration, not cooling; revising those three decisions leaves D-58's independent requirement to cool in every game minute false. A maker following the enumerated foundation changes would leave the product bound to two contradictory temperature rules, and a later implementation or test author could reintroduce cooling during combat from D-58.

Required correction: add D-58 as a decision changed by this task, with the meaning that its ordinary cooling rule applies outside the combat minutes whose needs stand still. Keep ambient temperature and its effect on the cooling rate unchanged. This is a consequence of already accepted Q1, not a new balance decision or a question for the human. The pinned spec design instructions require Foundation entries to name each entry the change will write or change; relying on a later return step to discover this omitted entry is insufficient here.

## Other checks

No further build-changing finding was found. In particular:

- Attacks are drawn every eligible surviving ordinary minute, including during an unfinished action, after a finishing effect and completion check. This preserves independent first-attack timing and avoids discarding an effect due in the attack minute.
- M+1 through M+4 can complete without rounds or a result. M+5 resolves rounds, death/beaten count and completion before a new ordinary pick; no extra world step or attack draw is introduced.
- Actor-relative health uses points, the wolf acts first, the character chooses after its effect, and death prevents an answer. Group order, repertoire and per-action counts remain applicable. The four combat arithmetic examples are consistent with the accepted wolf retreat threshold and action amounts.
- The inclusive grace boundary and refreshed single dodge reduction are explicitly autonomous interpretations; both fit the task and receive boundary checks. No human approval of those interpretations was assumed.
- Discovery and combat text have explicit ordering and lifetime, including the frozen terminal screen and completion before rounds. Structured state permits rendering without replaying combat.
- Map access, random entrance, separate attack stream and shared Understanding fit the selected foundation. The fixed-entrance layout and existing random streams stay stable.
- The measurement fixes seeds 1–20, the existing 17-rule program plus two combat rules, preparation and a 5000-minute limit. It does not invent a minimum completion rate or authorize balance tuning. Later tasks remain outside scope.

## Read scope and reaches

Read the project write-spec wrapper, pinned spec skill and review variant; the complete task, spec, designer report and answers; selected decisions D-03, D-04, D-18–D-28, D-34–D-36, D-38–D-48, D-50–D-95 and D-118–D-136; all selected invariants; browser-view and simulation part-map entries; the whole product glossary and selected process glossary terms. The glossary extraction also displayed the adjacent process term `invariant test`; no finding relies on that extra term.

Read all six selected guidelines and `src/browser/AGENTS.md`. Grounded the design in the current `sim/run.ts`, `game.ts`, `program.ts`, `types.ts`, `understanding.ts`, `layout.ts`, `random.ts`, `body.ts`, data maps/actions/conditions/revelations/skills/archetypes/items/balance/campfire, and view status-row/headquarters/game-view. Read `program-editor.ts` resource-list helper and the complete acceptance test containing the selected reference program. These are all covered by the review handoff, including its additional designer passages.

One substantive reach beyond the handoff: `.the-way/task-cycle/spec/design.md`, read whole to verify whether Foundation entries is an exhaustive obligation or only examples. It explicitly requires each entry the change will write or change, supporting Finding 1. No approved-source vault file was needed beyond the passages carried by the frozen task. No predecessor code, external source or `cycle.md` was read.

## Commands and limits

- `git ls-files --stage -- .the-way`: exit 0; gitlink `3aee7d958835cc19b95519f4d21b37538b78e3e1`.
- `git -C .the-way rev-parse HEAD`: exit 0; the same commit.
- `Get-Content` and `rg` reads: exit 0. Initial UTF-8 reads without explicit encoding displayed mojibake; substantive reads used `-Encoding UTF8`. Overlong combined outputs were followed by smaller reads of the omitted passages; no absence conclusion depends on a truncated output.
- `rg -n 'D-58|D-60|Ciało stoi|Ograniczyć zwykły' .runs/task-cycles/walka-w-glebi-lasu/spec.md foundations/decisions.md`: exit 0; independently located the cooling decision, combat table and named health-decision update.
- `git status --short`: exit 0, empty before this report; `git diff --stat`: exit 0, empty. This report is the sole reviewer output, under ignored `.runs/`.
- Product tests (`npm test`), foundation gate, mutation tests, browser checks and the 20-seed measurement: explicitly not run. The handoff forbids a product gate in this review stage; these remain obligations of later stages, not passes asserted here.

The verdict concerns the specification's omitted foundation correction, not executable-code quality or a failed product test.
