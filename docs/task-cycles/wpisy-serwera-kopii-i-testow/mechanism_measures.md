# Measures of the cycle run

- Calls in all: 240
- Calls of the orchestrator: 76
- Calls of subagents: 164
- Mean context per call: 201173
- Mean context per call of the orchestrator: 180956
- Share of the context in calls above 200000 tokens: 67.8%
- Context of the orchestrator's first call: 46765
- Context of the orchestrator's middle call: 188157
- Context of the orchestrator's last call: 274297
- Cache written, 5 minutes: 331892
- Cache written, 1 hour: 554896
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator f0956bd0-f111-4c25-8345-f27faf7df949 | Claude Code | 76 | 46765 | 188157 | 274297 | 0 | 252590 | 0 | 0 | 10522 | 6 | 5504 | 1 |
| Review of the whole change (the-way-stage) | Claude Code | 80 | 25422 | 251738 | 331894 | 331892 | 0 | 0 | 0 | 48734 | 14 | 63049 | 3 |
| One author of the change (the-way-author) | Claude Code | 84 | 25389 | 228931 | 313416 | 0 | 302306 | 0 | 0 | 93341 | 33 | 57343 | 1 |
