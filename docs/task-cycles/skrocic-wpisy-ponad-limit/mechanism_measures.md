# Measures of the cycle run

- Calls in all: 227
- Calls of the orchestrator: 61
- Calls of subagents: 166
- Mean context per call: 183411
- Mean context per call of the orchestrator: 146165
- Share of the context in calls above 200000 tokens: 56.0%
- Context of the orchestrator's first call: 45656
- Context of the orchestrator's middle call: 148956
- Context of the orchestrator's last call: 197986
- Cache written, 5 minutes: 306171
- Cache written, 1 hour: 466435
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator dc457cf3-82b8-4e84-a189-e359abeb140f | Claude Code | 61 | 45656 | 148956 | 197986 | 0 | 179129 | 0 | 0 | 3295 | 8 | 0 | 0 |
| Review the whole change (the-way-stage) | Claude Code | 83 | 25721 | 216726 | 306173 | 306171 | 0 | 0 | 0 | 12901 | 14 | 6473 | 2 |
| One author makes the whole change (the-way-author) | Claude Code | 83 | 25697 | 220299 | 298533 | 0 | 287306 | 0 | 0 | 63327 | 33 | 0 | 0 |
