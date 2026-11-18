# Measures of the cycle run

- Calls in all: 239
- Calls of the orchestrator: 54
- Calls of subagents: 185
- Mean context per call: 191264
- Mean context per call of the orchestrator: 165974
- Share of the context in calls above 200000 tokens: 70.8%
- Context of the orchestrator's first call: 45107
- Context of the orchestrator's middle call: 162507
- Context of the orchestrator's last call: 227267
- Cache written, 5 minutes: 356059
- Cache written, 1 hour: 650792
- Cache written again by the orchestrator: 146248
- Calls of the orchestrator with a cache write again: 1
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 6531829e-8818-4e6c-a8f2-1a6baeaffba4 | Claude Code | 54 | 45107 | 162507 | 227267 | 0 | 352876 | 146248 | 1 | 3590 | 5 | 1862 | 1 |
| Review of the return step (the-way-stage) | Claude Code | 13 | 25628 | 60987 | 103399 | 92220 | 0 | 0 | 0 | 7882 | 4 | 0 | 0 |
| One author of the change (the-way-author) | Claude Code | 115 | 25567 | 237716 | 309143 | 0 | 297916 | 0 | 0 | 73630 | 14 | 6705 | 1 |
| Review of the whole change (the-way-stage) | Claude Code | 57 | 25560 | 200338 | 263841 | 263839 | 0 | 0 | 0 | 57058 | 6 | 49907 | 2 |
