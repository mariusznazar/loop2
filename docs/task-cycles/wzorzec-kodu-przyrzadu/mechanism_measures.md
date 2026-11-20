# Measures of the cycle run

- Calls in all: 317
- Calls of the orchestrator: 85
- Calls of subagents: 232
- Mean context per call: 230581
- Mean context per call of the orchestrator: 217854
- Share of the context in calls above 200000 tokens: 81.6%
- Context of the orchestrator's first call: 45524
- Context of the orchestrator's middle call: 220521
- Context of the orchestrator's last call: 328810
- Cache written, 5 minutes: 725237
- Cache written, 1 hour: 700119
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 292408
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 1092541c-972a-418c-88dd-92290f7a3681 | Claude Code | 85 | 45524 | 220521 | 328810 | 0 | 307942 | 0 | 0 | 6886 | 3 | 0 | 0 |
| Review return step after correction (the-way-stage) | Claude Code | 22 | 25823 | 94585 | 128231 | 117052 | 0 | 0 | 0 | 17131 | 5 | 28019 | 2 |
| Whole-change review of wzorzec-kodu-przyrzadu (the-way-stage) | Claude Code | 79 | 25738 | 231231 | 315779 | 608185 | 0 | 292408 | 1 | 17748 | 7 | 32385 | 2 |
| Author of wzorzec-kodu-przyrzadu change (the-way-author) | Claude Code | 131 | 25691 | 277529 | 403404 | 0 | 392177 | 0 | 0 | 35079 | 10 | 28794 | 2 |
