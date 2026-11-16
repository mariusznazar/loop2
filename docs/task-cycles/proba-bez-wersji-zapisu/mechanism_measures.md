# Measures of the cycle run

- Calls in all: 149
- Calls of the orchestrator: 60
- Calls of subagents: 89
- Mean context per call: 134729
- Mean context per call of the orchestrator: 161845
- Share of the context in calls above 200000 tokens: 15.8%
- Context of the orchestrator's first call: 44203
- Context of the orchestrator's middle call: 171436
- Context of the orchestrator's last call: 220105
- Cache written, 5 minutes: 183364
- Cache written, 1 hour: 321064
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator d6bdbbbc-64ba-48e4-bc93-3aa41474cbc8 | Claude Code | 60 | 44203 | 171436 | 220105 | 0 | 198096 | 0 | 0 | 23163 | 8 | 0 | 0 |
| Review whole change D-234 (the-way-stage) | Claude Code | 52 | 24899 | 146648 | 194349 | 183364 | 0 | 0 | 0 | 63297 | 16 | 19161 | 2 |
| Author: D-234 trial condition (the-way-author) | Claude Code | 37 | 24743 | 112615 | 134001 | 0 | 122968 | 0 | 0 | 83270 | 19 | 0 | 0 |
