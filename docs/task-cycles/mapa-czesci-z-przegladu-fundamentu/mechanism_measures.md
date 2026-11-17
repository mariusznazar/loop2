# Measures of the cycle run

- Calls in all: 394
- Calls of the orchestrator: 115
- Calls of subagents: 279
- Mean context per call: 223369
- Mean context per call of the orchestrator: 216776
- Share of the context in calls above 200000 tokens: 73.3%
- Context of the orchestrator's first call: 44777
- Context of the orchestrator's middle call: 218154
- Context of the orchestrator's last call: 343336
- Cache written, 5 minutes: 714963
- Cache written, 1 hour: 722482
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 178768
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator b9100d66-de38-4c62-9f01-9375b97d59e6 | Claude Code | 115 | 44777 | 218154 | 343336 | 0 | 322914 | 0 | 0 | 512 | 2 | 5313 | 3 |
| Review of the return step (the-way-stage) | Claude Code | 54 | 25431 | 140247 | 227274 | 394980 | 0 | 178768 | 1 | 27880 | 10 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 77 | 25422 | 197153 | 319985 | 319983 | 0 | 0 | 0 | 54082 | 24 | 81327 | 2 |
| One author of the part-map change (the-way-author) | Claude Code | 148 | 25381 | 259915 | 410678 | 0 | 399568 | 0 | 0 | 70035 | 23 | 7547 | 1 |
