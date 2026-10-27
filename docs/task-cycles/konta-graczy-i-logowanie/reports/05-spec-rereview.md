PASS

# Independent specification re-review

Reviewed the revised spec under the same pinned the-way-write-spec method, against the original review, autonomous resolution and designer revision report. This is the one re-review of the specification, not an implementation review.

## Earlier finding

**R1 — resolved.** Startup section 6 now states the eligible configuration domain before promising default-address behavior. Missing production settings and partial/invalid explicit account configuration refuse before listening; wholly unconfigured non-production startup and fully configured startup passing settings/resource validation retain the existing default address. The Foundation entries table expressly requires amendment of account-server-default-address through the invariant skill. The foundation remains unchanged during design, as required; the amendment is now planned rather than silently assumed unnecessary.

The existing default-address test must establish its unconfigured non-production precondition instead of inheriting arbitrary account settings. Separate configuration-refusal cases preserve fail-closed startup evidence; configured success uses ephemeral ports. This resolves both the false unconditional promise and the environment-dependent test risk without changing D-49's single default-port exception. The occupied-address invariant only requires nonzero exit and no readiness, so leaving it unchanged introduces no further contradiction.

## Consequences of the revision

No new finding. The correction retains the task's account requirements, external secret, durable storage and production validation. It neither introduces an insecure fallback nor changes the default address. The rest of the specification is consistent with the original review's scope assessment; no implementation, target-host or browser result is inferred from this PASS.

The previously recorded mutation-tool adoption gap remains explicitly unresolved, with the applicable mental-mutation duty retained. Target-image measurement and public browser acceptance remain pending human actions and still block acceptance of the eventual draft request.

## Reads and reaches

Read whole:

- `reports/05-spec-rereview-handoff.md`;
- `reports/03-spec-review.md`;
- `reports/04-spec-revision-handoff.md`;
- `reports/04-spec-revision.md`;
- current `spec.md`.

Reread whole foundation entries account-server-default-address, account-server-occupied-address and D-49 to check the revision's exact consequences. The original review's full task, guidelines, method and source reads remain the context. No new reach beyond those sources, external lookup, vault operation, server read, cycle.md read or product change occurred.

## Checks and limits

- `Get-Content -Raw -Encoding UTF8` for the five documents above and selected whole-entry foundation reads — exit 0.
- `git ls-files --stage -- .the-way` — exit 0; gitlink `574a37b9ab9572f876298f4cc10754581222d3f0`.
- `git -C .the-way rev-parse HEAD` — exit 0; matching pin.
- `git status --short` and `git diff --stat` — exit 0; no tracked changes.
- Document comparison: R1 resolved; no remaining question or new failure from the revision.
- `npm test`, foundation checker, image measurement and browser/target checks — not run by this reviewer for the document re-review. The orchestrator's supplied baseline evidence is not attributed to this review.

Only this ignored report was written. Return boundary reached before planning, code or foundation work.
