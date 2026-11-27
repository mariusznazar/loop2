# Measures of the cycle run

- Calls in all: 311
- Calls of the orchestrator: 63
- Calls of subagents: 248
- Mean context per call: 310607
- Mean context per call of the orchestrator: 166983
- Share of the context in calls above 200000 tokens: 88.6%
- Context of the orchestrator's first call: 47163
- Context of the orchestrator's middle call: 166242
- Context of the orchestrator's last call: 225644
- Cache written, 5 minutes: 419803
- Cache written, 1 hour: 719094
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator f5ea6cfb-68f6-4403-9889-5819e252f650 | Claude Code | 63 | 47163 | 166242 | 225644 | 0 | 204612 | 0 | 0 | 411 | 2 | 2251 | 1 |
| Review whole change (the-way-stage) | Claude Code | 71 | 25901 | 323859 | 415530 | 404821 | 0 | 0 | 0 | 83016 | 13 | 6332 | 2 |
| model probe 1 (the-way-stage) | Claude Code | 1 | 25691 | 25691 | 25691 | 14982 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Author: Wiedza screen change (the-way-author) | Claude Code | 176 | 25947 | 402918 | 525875 | 0 | 514482 | 0 | 0 | 58369 | 14 | 72936 | 1 |
