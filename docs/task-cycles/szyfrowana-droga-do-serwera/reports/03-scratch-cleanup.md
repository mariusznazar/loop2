# Scratch cleanup follow-up

The orchestrator sent this artifact-only follow-up inline while the independent code review ran:

> Przed publikacją porządek artefaktów: w katalogu cyklu są robocze kopie deploy-setup.md, deploy-skill.md, deploy-troubleshooting.md, foundation-edit.py, product-edit.py, tunnel-image-test.py. Skill wymaga skopiowania całego katalogu cyklu i zarazem zabrania kopiowania plików/diffów trzymanych w git. Przenieś swoje te robocze pliki do osobnego ignorowanego .runs/author-scratch/szyfrowana-droga-do-serwera (zweryfikowane ścieżki w tym worktree), pozostawiając cykl z raportami/spec/task/logami. To tylko porządek scratch, bez zmian produktu lub testów. Jeśli któryś jest wymaganym pełnym raportem albo zawiera unikalny dowód, napisz zanim go przeniesiesz. Wróć z listą przeniesionych plików.

Author reported all six files moved after verifying the task worktree paths; they were working copies/scripts with no unique evidence. Full reports and logs stayed in the cycle. No product or test change. The orchestrator subsequently verified `git status --short` exit0 empty and the cycle directory inventory. This did not consume a review fix round.
