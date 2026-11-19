# Selection of the reviewer of the whole change (formatowanie-python-i-bash)

Index of decisions: `.runs/review-whole/decision-index.md`, written by
`python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/decision-index.md
--section "Code rules, exemplars and static checks" --section "The gate, test tools and the local start"
--section "Balance measurement" --part build-tools --part deployment --part agent-workflow
--part product-foundation --part test-helpers --part browser-view --part simulation --part account-server
--decision D-28 --decision D-30 --decision D-31 --decision D-32 --decision D-424 --decision D-433
--decision D-434 --decision D-425 .` (50 in full, 378 by heading).

Parts touched: build-tools, deployment, agent-workflow, product-foundation, test-helpers, browser-view,
simulation, account-server (the reformat reaches tests/invariants files of each), not balance-tools.

Decisions read whole (8): D-28, D-30, D-31, D-32, D-424, D-425, D-433, D-434.
Decisions opened for a passage: D-09/D-11 not opened (deploy.yml read instead), WAY-16, WAY-205, WAY-312 of the pinned the-way.

Invariants read whole: eslint-source-rules, ruff-source-rules, shellcheck-source-rules,
prettier-source-format, function-and-file-size, ruff-source-format, shfmt-source-format.
Environment facts read whole: the four new ones (sources fetched and compared).
Part map read whole. Glossary read whole.
Guidelines read whole: guidelines/coding.md; templates .the-way/product-guidelines/template.md and
.the-way/product-guidelines/coding/template.md read whole.
