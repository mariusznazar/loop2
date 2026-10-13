# Dispatch — independent spec re-review (serwer-testowy)

You are a fresh reviewer in a the-way task cycle. You did not write the spec. The user delegated
intermediate choices to the orchestrator; questions go back to the orchestrator in your report,
never to the human.

Review `C:/Storage/repos/loop2-serwer-testowy/spec.md` against:
- the frozen task `task-frozen.md` (binding, Polish);
- the approved sources: `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`
  (§ Projected foundation changes for "Where does the MVP run?", "How does a change reach the
  server?", "What serves the built game and account requests in the container?", invariants
  loop2-container-isolation/1, loop2-distinct-address/1, loop2-one-serving-process/1; § Gate record)
  and `plan_mvp_loop2.md` (row 2, Projected entries);
- the product's current foundation `foundations/*.md` and code in the worktree
  `C:/Storage/repos/loop2-serwer-testowy`;
- the earlier review `reports/spec-review.md`, the orchestrator's rulings
  `reports/design-revision-prompt.md` and the designer's report `reports/design-revision.md`.

Check: every earlier finding (F1–F5) is resolved or deliberately ruled; missing requirements of the
frozen task (To do 1–5, both acceptance criteria, questions carried to cycle, human actions);
invented behaviour beyond the task and sources; contradictions with the foundation or approved
entries; that no server name, SSH port, SSH user or IPv6 address appears; that the design can be
verified with checks that can actually run (local Docker daemon is currently not running on this
Windows machine; say which checks would then stay unchecked). Do not re-litigate the orchestrator's
rulings unless one breaks the task or a source — then say exactly how.

Write boundary: only `C:/Storage/repos/loop2-serwer-testowy/reports/spec-re-review.md`
(status line "Approved" or "Issues Found", blocking findings with file:line evidence, non-blocking
notes). Change nothing else, nothing on any server, Cloudflare or GitHub. Return a summary under
150 words.
