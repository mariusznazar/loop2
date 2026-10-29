# Spec revision report

Status: done

Spec: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/spec.md`

## Addressed finding

Addressed Finding 1 of `reports/05-spec-review.md`. The Foundation entries table now explicitly names D-58 as a decision to change: its ordinary body-cooling rule applies outside combat minutes, while ambient temperature remains map data and continues to determine the cooling rate in the same way.

The previous list covered health and minute ordering through D-60, D-61 and D-71 but missed D-58's independent requirement to cool in each minute. Keeping that omission would leave a contradiction after implementation; naming D-58 resolves it as a consequence of accepted task To do 6 / Q1, with no new balance or behavior choice. The correction is one additional table row, at `spec.md:139`. All accepted requirements and autonomous answers remain as written. Original designer and reviewer reports were preserved.

## Read scope and questions

Read the revision handoff and full review report, re-read the pinned spec skill and its design variant applicable to revisions, and re-read D-58 whole. The frozen task and other selected material remain the same as in the original designer stage. No reach beyond the revision handoff was needed. No new question arose; answers in `reports/03-design-answers.md` remain in force.

## Four design checks

1. No placeholder, empty section or provisional requirement was added; the original complete sections remain.
2. The specified stationary body in M+1 through M+5 now has all named cooling, health and minute-order foundation corrections. The map's temperature and rate are expressly preserved. No other design section changed or contradicts the correction.
3. Scope remains the single accepted deeper-map/combat task; the correction does not introduce a separate feature or implementation step.
4. The new row names exactly which behavior changes and which temperature behavior stays. No choice or ambiguity is passed to the maker by this correction.

## Checks and limits

- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way`: combined invocation exit 0, both identify `3aee7d958835cc19b95519f4d21b37538b78e3e1`.
- `rg -n 'D-58|Ciało stoi|## ' .runs/task-cycles/walka-w-glebi-lasu/spec.md`: exit 0; confirms the new D-58 row, the stationary-body rule and all required section headings.
- `git status --short`: exit 0, empty; the revision only changes ignored task-cycle artifacts.
- Product tests, foundation gate, mutation tests, browser checks and the 20-seed measurement: not run, as required for this stage. No product or foundation file was changed. The independent reviewer's re-review remains pending.
