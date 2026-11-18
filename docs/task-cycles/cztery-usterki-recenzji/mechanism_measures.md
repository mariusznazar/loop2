# Measures of the cycle run

- Calls in all: 346
- Calls of the orchestrator: 83
- Calls of subagents: 263
- Mean context per call: 221822
- Mean context per call of the orchestrator: 177532
- Share of the context in calls above 200000 tokens: 77.1%
- Context of the orchestrator's first call: 45093
- Context of the orchestrator's middle call: 179504
- Context of the orchestrator's last call: 285305
- Cache written, 5 minutes: 672641
- Cache written, 1 hour: 702695
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 284611
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 5d6b073d-92d2-482b-9ba5-8938dc6722e7 | Claude Code | 83 | 45093 | 179504 | 285305 | 0 | 264666 | 0 | 0 | 21318 | 6 | 5921 | 2 |
| One author: four defects change (the-way-author) | Claude Code | 146 | 25716 | 298458 | 438031 | 0 | 438029 | 0 | 0 | 116573 | 29 | 0 | 0 |
| Review of the return step (the-way-stage) | Claude Code | 22 | 25735 | 76417 | 88190 | 77011 | 0 | 0 | 0 | 31943 | 10 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 95 | 25694 | 205306 | 311021 | 595630 | 0 | 284611 | 1 | 29976 | 13 | 85857 | 2 |
