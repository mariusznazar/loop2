# Measures of the cycle run

- Calls in all: 290
- Calls of the orchestrator: 60
- Calls of subagents: 230
- Mean context per call: 239326
- Mean context per call of the orchestrator: 193299
- Share of the context in calls above 200000 tokens: 82.1%
- Context of the orchestrator's first call: 44639
- Context of the orchestrator's middle call: 202642
- Context of the orchestrator's last call: 268231
- Cache written, 5 minutes: 598372
- Cache written, 1 hour: 657665
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 281345
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 4d713769-4c0f-49ac-bc49-5d93bccc1842 | Claude Code | 60 | 44639 | 202642 | 268231 | 0 | 247709 | 0 | 0 | 1134 | 1 | 4787 | 1 |
| One author: scene-graphics skill (the-way-author) | Claude Code | 137 | 24962 | 309438 | 420989 | 0 | 409956 | 0 | 0 | 102183 | 22 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 93 | 25204 | 214266 | 328012 | 598372 | 0 | 281345 | 1 | 74280 | 18 | 40278 | 4 |
