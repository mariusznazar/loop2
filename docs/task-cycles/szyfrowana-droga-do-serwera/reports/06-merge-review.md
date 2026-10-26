PASS fa915cc2ffd9836465ba09fe5badd1f69f689d8b

# Reconciliation review

Reviewed range: `581b71a139f9dd9ab24fa21549e9a19a77a18ab0..fa915cc2ffd9836465ba09fe5badd1f69f689d8b`. The dispatched HEAD matches. The merge brings main at `db0b3b68d8741bf5441bbc2a0bc2b8391d299dc8`; its only tree change is `.the-way`, from `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c` to `574a37b9ab9572f876298f4cc10754581222d3f0`. The checkout matches the new gitlink.

The verdict covers reconciliation of this tunnel task, not deployment acceptance. The task's previously reviewed product code, tests, foundation entries and operator instructions are byte-for-byte unchanged by the merge. H1-H5 and their human observations remain outstanding; the request remains a blocked draft for them.

## Findings by grade

- Critical: none.
- Important within this task: none.
- Minor: none.
- Out-of-scope findings: one Important guideline-adoption discrepancy, below. It comes from the independent process update already merged into main, not from the tunnel implementation. No fix is requested inside this task.

### 1. The new testing template has no corresponding product mutation-testing decision or rule

**Grade / scope:** Important, out of scope of the frozen tunnel task. New thread.

**Anchor:** `guidelines/testing.md:200`, where Flaky tests immediately follows AI in tests; related adoption at `foundations/decisions.md:1339` (D-73), and the newly pinned requirement at `.the-way/product-guidelines/testing/template.md:207`.

**Do wklejenia:** Nowo przypięty szablon wymaga decyzji o narzędziu do testowania mutacyjnego i objętych nim częściach albo jawnego odstępstwa, lecz przewodnik loop2 pomija tę regułę. D-73 przyjmuje cały szablon przypiętej wersji, a żadne z sześciu odstępstw nie dotyczy mutacji; trzeba uzgodnić tę decyzję i dopisać regułę w osobnej pracy nad przewodnikiem testów.

**Dlaczego to zgłaszam:** Przewodnik ma mówić autorowi i recenzentowi, jakie sprawdzenie chroni zmianę. Nowy WAY-252 wymaga wyboru narzędzia dla części, w których trudność leży w obliczeniach, lub decyzji o odstępstwie. WAY-253 powierza uruchomienie przyjętego narzędzia recenzentowi. D-73 przyjmuje szablon przypiętego the-way w pełni, wyliczając dokładnie D-74-D-79 jako odstępstwa. Przeczytałem te sześć wpisów: dotyczą danych generowanych, całych ścieżek, dwóch granic zaufania, sposobu uruchamiania testów, kształtu przypadku i kontraktu rejestru npm; żaden nie rozstrzyga mutacji. Cały obecny przewodnik nie ma reguły Mutation testing ani przyjętego narzędzia. Przykładowo późniejsza zmiana granicy obliczenia symulacji z `>` na `>=` nie ma ustalonego narzędzia ani decyzji uzasadniającej pozostanie przy ocenie autora. To luka zgodności przewodnika z przyjętym szablonem, nie dowód, że konkretny test symulacji przepuszcza taki błąd.

Remediation requires a product choice through maintain-testing-guidelines, with a decision adopting the tool and parts or a reasoned departure, then the corresponding rule/command. It must not be invented by this reviewer or silently imposed as an extra dependency of the tunnel task. This task changes deployment, build-tools, agent-workflow and product-foundation; the guideline table places their complexity in connections/file agreement, not computation, and none has an adopted mutation tool. Consequently WAY-253 does not require an unconfigured tool run for this merge or invalidate the tunnel author's existing manual mutation check. The missing product-level settlement affects future guideline use, including computational parts, and should be carried explicitly as an out-of-scope finding rather than waived or reported as a missed execution of this task.

## Declined to judge

None. The discrepancy above is judged and explicitly marked out of scope. Human deployment checks are unrun required checks, not excluded findings.

## Merge and compatibility evidence

I made two separate passes: first the actual tree/submodule diff and its possible execution effect; then the process instructions and product guidelines that consume it.

1. The product diff contains only one gitlink. A second comparison excluding `.the-way` returns no differences. Thus the approved two-service route, source guards, secret boundary, safe reads, exact-script installation, rollback and no-other-merges window are preserved; this merge introduces no external action or altered deployment input.
2. The six incoming process files are its decision log, three guideline-maintenance skills, testing template and make-change method. The complete incoming diff was read. The foundation checker, gate runner, review skill and implement-task skill have no diff. The handoff's changed checker *version* is a changed enclosing pin; its executable source is unchanged.
3. The guideline-maintenance changes distinguish refresh from extension and clarify human technology choices/research. They neither rerun a completed refinement nor change the frozen tunnel requirements. No new kind, exemplar, guideline discipline or UI surface is introduced by this merge.
4. Make-change's added exception only skips the author's mental mutation check where the product has adopted a mutation tool, leaving that run to the reviewer. There is no such tool in the current product guidelines. The old obligation still applies to the task's parts; the merger has no newly written product logic to mutate. The independent author's report and whole-change review already explain the intended-failure cases, two-service refusals and the real probe/image checks. I do not count those earlier runs as my own.
5. The product guideline-adoption discrepancy is recorded above. A passing foundation checker cannot settle it: the existing withdrawn `guidelines-form` and `guidelines-reference-current` rows explicitly say guideline form is reviewed, while the script checks referenced entries.

No invariant-test file changes in this review range. The seven changed invariant-test files of the implementation remain exactly as reviewed before reconciliation. No trust-boundary claim is weakened by the merge. The gate is still required on the final tree and new pin, even though its runner/checker source has not changed.

## Checks and commands

Commands ran in `C:/Storage/repos/loop2/.runs/worktrees/szyfrowana-droga-do-serwera`.

| Command | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0; `fa915cc2ffd9836465ba09fe5badd1f69f689d8b`, also checked at the end. |
| `git status --short` | 0; empty before and after review reads. |
| `git ls-files --stage -- .the-way` | 0; gitlink `574a37b9ab9572f876298f4cc10754581222d3f0`. |
| `git -C .the-way rev-parse HEAD` | 0; identical checkout. |
| `git diff 581b71a139f9dd9ab24fa21549e9a19a77a18ab0..fa915cc2ffd9836465ba09fe5badd1f69f689d8b` | 0; only the gitlink above. |
| `git log --oneline 581b71a139f9dd9ab24fa21549e9a19a77a18ab0..fa915cc2ffd9836465ba09fe5badd1f69f689d8b` | 0; merge and incoming main process-update commits. |
| `git diff --exit-code 581b71a139f9dd9ab24fa21549e9a19a77a18ab0..fa915cc2ffd9836465ba09fe5badd1f69f689d8b -- . ':!.the-way'` | 0; all other product files identical. |
| `git diff --check 581b71a139f9dd9ab24fa21549e9a19a77a18ab0..fa915cc2ffd9836465ba09fe5badd1f69f689d8b` | 0; no whitespace errors. |
| `git -C .the-way diff --stat 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c..574a37b9ab9572f876298f4cc10754581222d3f0` and same with `--name-only` | 0 each; six files. |
| `git -C .the-way diff 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c..574a37b9ab9572f876298f4cc10754581222d3f0 -- task-cycle/change/SKILL.md product-guidelines/testing/template.md product-guidelines/coding/SKILL.md product-guidelines/testing/SKILL.md product-guidelines/styleguide/SKILL.md` | 0; complete method/template changes read. |
| `git -C .the-way diff 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c..574a37b9ab9572f876298f4cc10754581222d3f0 -- foundations/decisions.md` | 0; complete decision changes read. |
| `git -C .the-way diff --exit-code 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c..574a37b9ab9572f876298f4cc10754581222d3f0 -- elements/common/foundation_check.py gate task-cycle/review task-cycle/skill` | 0; execution/check/review/orchestration paths unchanged. |
| `python -B .the-way/elements/common/foundation_check.py` | 0; 0 errors on the final merge tree. |

Source reads used `Get-Content -Encoding UTF8` and `rg -n`; read batches exited 0. Truncated combined output was filled by separate complete report reads and smaller passage reads. The discrepancy search was checked against the full testing guidelines and all six explicit departure entries rather than inferred from a zero-match count. Manual comparison of the full incoming diff with the product's D-73, guideline table and rules produced the evidence above.

## Unrun checks

- No full or selected repository test run by this reviewer: the review method leaves the full suite to the cycle, the handoff reserves its final run for the orchestrator, and D-77 permits only full `npm test`. The final merge-tree gate remains unrun here; the prior exact-head Linux passes are evidence for the prior head only.
- No mutation tool run: no product tool/parts/command has been adopted, and this merge changes no computational product file. The missing adoption rule is reported above, not treated as a passing mutation check.
- No final Windows gate. The known baseline Get-NetTCPConnection observation error remains, and the three Windows-only quality cases skipped in the previous Linux runs remain explicitly unverified by Linux.
- No token, authenticated connector, server file permission, enforced host memory, public HTTPS/API, outside-host IPv6 closure or unchanged-neighbour observation was checked. Those remain H1-H5 human work. No server, Cloudflare, key, secret, DNS or firewall was changed.

## Reading and reaches

Read the project review entry point and complete pinned review method, shared foundation-reading procedure and guideline-reading procedure; vault rulebook and code-review playbook; frozen task and complete spec; author, whole-change review and return reports. Did not read cycle.md. Read complete coding/testing guidelines, part map and both glossaries.

For this reconciliation the touched part is agent-workflow through `.the-way`. The selective foundation reach beyond the concrete handoff was D-28 (existing-kind deferral), D-73 and D-74-D-79 (template adoption and all explicit departures); pinned WAY-34, WAY-173 and WAY-240 (version/adoption/part complexity), plus every changed incoming decision in the complete submodule diff, including WAY-251-WAY-254. Each selected entry was read whole. Reached the withdrawn guideline-check rows to explain why the script's success does not contradict the missing-rule finding. No kind-specific or UI guideline applies to this gitlink-only change.

Only this ignored report was written. No reviewed file, index, branch or product commit was changed. Review ends before fixes and publication.
