# Return report for the correction (the return step, repeated; head compared `1c9ca88`)

**Status:** `done`, **no commit**. Tree clean at `1c9ca88`. The new Minor findings C1 and C2 of the review of the correction stay for the request's list; I did not touch them.

## Return step (the lists of `record_template.md`)

- **Foundation compared with code:** none to correct. What the correction changed: the paragraph at the head of "Restoring over the server's database" now says the restore over the server was tried once on 2026-11-11 by the owner (steps 1 to 8, weekday file 3), with three corrected places and a list of what was not tried; step 1 loads `STRYCH_HOST` from the installed script; step 2 decrypts under `umask 077`; step 7 explains the marker. Search of the whole foundation (decisions, invariants, environment facts, glossary, part map) and the README for `untried`, `never tried`, `not tried`, `checked restore`, `restore trial`, `trial on`, `restoring over`, `first restore`, `has been tried`, `restor`, `marker`, `age`, `STRYCH_HOST`, `umask`, `readonly`:
  - **D-234** ("What does a checked restore of the database mean?") defines a checked restore as one trial on the owner's computer and says "restoring over the server's database stays a human's documented procedure". It does not say the server restore is untried and rests on no statement of that kind. Its *Rationale* says "backups of later schema versions are not tried", and the new paragraph lists "a backup of a newer schema than the running code" as not tried: they agree. Its *Rejected* line "a sequence of commands in the skill alone ... never run before the trial" is a past event about the owner's-computer trial, unaffected. The trial of 2026-11-11 is the human's documented procedure being run once, not a second "checked restore" in D-234's sense, so the decision's meaning does not change and needs no edit.
  - **D-228** (*Rationale*: "its activation, capacity for real saved games and restore path need a practical check") and **D-230** (*Rationale* on the file's time) agree with the trial; nothing in them states the server restore as untried.
  - **D-230 / D-238 / D-360 / D-361 / the fact `loop2-host-ssh-host-key-options`:** unaffected by the correction (the fetch still names the seven fixed files and lists nothing; the script's host-key options are unchanged; step 8 still ends the restore by the re-reset and re-block text; the counting block is unchanged and still equals the fact's command, checked by script after the correction).
  - **D-12 / D-13:** the load of `STRYCH_HOST` is the human's command, not an agent's, and it prints nothing; the host stays out of the skill (the twin test passes, no `mikr.us` in the skill).
  - **Invariants** (`account-save-backup*`, `unblock-restores-*`): none states that the restore was untried, none rests on the trial; sentences and methods unchanged.
  - **Glossary:** no entry or sentence uses `marker`, `trial` or `tried` in a product meaning; nothing to correct (below).
  - **Part map:** no new file; `agent-workflow` and `product-foundation` entries unchanged and still true.
  - **README:** has no statement about the restore or the backups (the only hits of `restor`/`backup` are the icon-licence lines on `game-icons.net`, unrelated).
- **Decisions written or changed:** none in this return step (D-360, D-361, D-238's *Based on* stand as written in the first cycle).
- **Invariants written or changed:** none.
- **Environment facts:** none. Candidates considered and why none is written: (1) how `age` creates its output file: no decision's *Based on* and no invariant's *Rests on* rests on it, the foundation states nothing about it, and the instruction carries its own visible check (`ls -l` shows `-rw-------`), so the foundation would not state it wrongly; (2) the `readonly STRYCH_HOST=` line of the script: it is a line of the product's own file, not a source outside the product; (3) bash's refusal of a second `readonly` assignment: a tool behaviour nothing in the foundation rests on, and the instruction only warns; (4) the owner's report of the trial (its outputs): a past event, not a state of the world a decision depends on. The reading of the trial is held by the cycle record, not as a fact (the template's reading form is for a state of the host that a decision or invariant needs).
- **Glossary terms:** none. The correction uses "marker" for the name given in the test account in install step 8 and defines it where it first stands in the restore (step 7). No foundation sentence uses the word, so no sentence reads differently for the field's meaning (WAY-95). "Trial" and "tried" are used as the field uses them. No term is used against its entry.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none (the task is `Project relation: independent`).
- **Rows of *Settlements to record* written:** unchanged since the first return step: row 1 → D-360, row 2 → D-361.

## Checks run (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` (without `--skip-test-citations`) — exit 0, "0 errors".
- `python -B tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0.
- `git status --short` — empty; `git rev-parse --short HEAD` — `1c9ca88`.
- `grep -n -i -E "untried|never (been )?tried|not (been )?tried|checked restore|restore trial|trial on|restor(e|ing) over|first restore|has been tried" foundations/*.md README*` — the hits listed above; `grep -n -i "marker" foundations/*.md` — no hit.

## Unread material

- Read whole this step: `correction-handoff`'s result as summarized in my own `correction-report.md` (not re-opened), D-234 whole (the range from its heading to the end of its *Rejected*), and the grep hits of the other decisions by their lines. D-228's and D-230's *Rationale* sentences were read from the hits and from the first round, not re-read whole now.
- Not re-read: `.the-way/task-cycle/skill/return_step.md` and `record_template.md` (read in the previous return step; the lists above follow the same form), the review of the correction (`PASS 1c9ca88`; I know only its two Minor findings C1 and C2 from your message, not their text).
- Environment facts, invariants, part map: searched by grep terms, not re-read whole. The README: searched by grep, not read.

## Searches not found or unclear

- A statement in `foundations/` or the README that the server restore was never tried or is unchecked: not found.
- An entry resting on how `age` creates a file or on the `readonly STRYCH_HOST` line: not found.
- Whether D-234's name "checked restore" should also cover the trial of 2026-11-11: unclear to me, and I decided it does not (D-234 defines it as the owner's-computer trial and sends the server restore to the documented procedure); if the owner wants the server trial to count as a checked restore, that is a change of D-234's meaning for a human to make.
