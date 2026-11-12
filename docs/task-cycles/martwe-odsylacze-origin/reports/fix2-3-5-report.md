# Report — second fix of D-03 (finding N-1)

**Status:** done

Base: bc7367e82d03396b9f7c525f0e5a77ae0a72f4c1 (worktree clean at start), branch task/martwe-odsylacze-origin.

## Finding N-1 — fixed
Checked against the snapshot note `the private snapshot of the notes (not committed)/vault/technologia_budowanie_ekranow.md` (line 129, with line 163 and the test-count paragraph at the head of the note):
"testy tych ekranów zmieniają się w każdej opcji; dotyczy to głównie około 1130 wierszy ekranów gry" — "dotyczy to" refers to the tests that change in every option, not to the loss. The finding is right: the clause "so the loss falls mainly on the tests of the game screens" reversed the note.
Fix: D-03 *Rationale*, the "Lacks" sentence now ends at "... change in every option." (the reviewer's suggested ending). Only that clause was removed. The *Rejected* line of D-03 was left alone. N-2 (Minor) and every other finding not touched.

## Skill steps of `the-way-record-decision` (via .the-way/elements/decisions/skill/SKILL.md)
- 1 Read: done (template.md, common/rules.md, common/way_of_working.md, read.md, decide_entry.md, D-03 whole).
- 2 Decide / search the foundation: done, narrowly. An edit in place of an existing entry; the removed clause appears in no other entry (`grep "loss falls mainly" -r foundations` found only D-03). No binding sentence, field or neighbour changed, so nothing follows.
- 3 Draft: the draft is the deletion of one clause; no new value.
- 4 Ask, show, write: no question (the orchestrator holds the human's delegation). Write = one Edit of `foundations/decisions.md`. Check = foundation_check below.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` - exit 0, 0 errors (also with `--skip-test-citations`, exit 0).
- `git diff` before commit - 1 file, 1 insertion, 1 deletion, line 49 only; read whole: one decision (D-03), one clause removed.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` - exit 0; first hit is at line 3422 (other entries' *Origin* fields, not changed here); no hit on a line of D-03 (lines 39-51).
- Not run: the product's gate (as instructed).

## Commits
See the commit on the task branch with message "docs: :memo: end the test-cost sentence of D-03 where the note ends it" (not pushed).

## Reaches beyond the dispatch
Read `.the-way/task-cycle/change/fix.md`, `.the-way/elements/decisions/skill/{read,decide_entry}.md`, `elements/decisions/template.md`, `elements/common/{rules,way_of_working}.md` as the skills named them.

## Unread material
`.the-way/elements/decisions/examples.md` and the examples it names were not read (no new entry written). The review report was read whole; the snapshot note only in the passages around lines 129, 163 and the test-count paragraph.

## Searches not found or unclear
none
