# Specification revision report

Status: done

Revised spec: `docs/task-cycles/konta-graczy-i-logowanie/spec.md`
Review addressed: `reports/03-spec-review.md`, R1.
Authority for the clarification: `reports/04-spec-revision-handoff.md`, autonomous orchestrator choice under the accepted task, not a new human approval.

## R1 addressed

The first spec retained the developer default-start case but incorrectly said it preserved the entire existing default-address invariant. The invariant is unconditional with respect to account settings; mandatory configuration refusal would violate its stated domain. The reviewer identified a real contradiction, not a wording preference.

The revised startup section states that the default-address guarantee applies only after startup configuration and resource validation succeeds. Its eligible domain expressly includes wholly unconfigured non-production startup and fully configured startup with valid account settings/resources. It preserves the exact `Loop: http://127.0.0.1:3000` readiness address and the nonzero address-in-use outcome when listen variables are absent. Missing production settings and every partial/invalid explicit account configuration refuse before listening and readiness.

Foundation entries now explicitly requires amendment of account-server-default-address through the-way-record-invariant, including the accepted task's external-secret requirement and startup validation in the derivation. It does not edit that entry in this design stage. The broader occupied-address invariant still promises nonzero/no readiness and is unchanged. D-49 retains its one default-port exception.

The same existing default-address test must remove inherited account/listen settings and explicitly select non-production, establishing the intended precondition. Separate startup cases prove missing/partial/invalid production configuration refuses before readiness. Fully configured success uses ephemeral ports; no second port-3000 case. Existing test scope changes intentionally with its reconciled requirement, never silently to obtain a pass.

Leaving the unconditional statement would misreport the guarantee. Weakening production validation would risk absent secrets/storage. The chosen correction retains the developer address at the cost of an explicit foundation/test amendment; it adds no feature and changes none of the task's account requirements.

## Reads and reaches

Read the revision handoff and independent review whole, then the current spec whole. Reread whole account-server-default-address, account-server-occupied-address and D-49 entries, plus the existing `tests/invariants/test_account_server_default_address.py` whole to verify its inherited environment. These are the only additional code/foundation reads for this revision. No external source, vault document, cycle.md or server was read. Earlier reports remain unchanged.

The existing default-address test only removes LOOP2_LISTEN_HOST/PORT from the inherited environment; this confirms why explicit account/NODE_ENV preconditions are needed. The product/test files were not changed.

## Four specification checks

1. No placeholders or empty sections were introduced; all six required sections remain.
2. R1's contradiction is removed by an explicit eligible-start precondition and a named foundation amendment. Mandatory production refusal, default developer startup and D-49 can now coexist. No other behavior changed.
3. Scope remains the one account task; this correction is necessary reconciliation of its startup behavior, not an independent configuration feature or wider invariant audit.
4. The builder no longer chooses the domain of the default-address promise or guesses whether to weaken tests: settings/resource validation precedes eligibility; default-address and refusal cases have separate explicit preconditions.

## Checks and limits

- `Get-Content -Raw -Encoding UTF8` of revision handoff, review, spec and default-address test; selected whole-entry reads of the two invariants and D-49 — exit 0.
- `git ls-files --stage -- .the-way` — exit 0; 574a37b9ab9572f876298f4cc10754581222d3f0.
- `git -C .the-way rev-parse HEAD` — exit 0; same pin.
- apply_patch updated only ignored spec and added this ignored report successfully. No product, foundation or test mutation.
- Final `rg -n` of the six headings and all amended startup/invariant passages — exit 0; readback agrees with R1 resolution. `git status --short` and `git diff --stat` — exit 0, both empty. Report readback — exit 0.
- Product tests/build/foundation checker were not run: this is a document-only spec revision and the orchestrator owns the running baseline. No borrowed test evidence is claimed.

Return boundary: revised specification for the same independent reviewer's one re-review. No planning or implementation started.
