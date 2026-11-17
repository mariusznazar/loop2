# Measures of the cycle run

- Calls in all: 309
- Calls of the orchestrator: 70
- Calls of subagents: 239
- Mean context per call: 198855
- Mean context per call of the orchestrator: 162886
- Share of the context in calls above 200000 tokens: 63.0%
- Context of the orchestrator's first call: 44777
- Context of the orchestrator's middle call: 169974
- Context of the orchestrator's last call: 233277
- Cache written, 5 minutes: 487691
- Cache written, 1 hour: 561269
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator b9100d66-de38-4c62-9f01-9375b97d59e6 | Claude Code | 70 | 44777 | 169974 | 233277 | 0 | 212855 | 0 | 0 | 512 | 2 | 5313 | 3 |
| Review of the return step (the-way-stage) | Claude Code | 40 | 25431 | 126698 | 178770 | 167708 | 0 | 0 | 0 | 27880 | 10 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 77 | 25422 | 197153 | 319985 | 319983 | 0 | 0 | 0 | 54082 | 24 | 81327 | 2 |
| One author of the part-map change (the-way-author) | Claude Code | 122 | 25381 | 244281 | 359524 | 0 | 348414 | 0 | 0 | 70035 | 23 | 7547 | 1 |
