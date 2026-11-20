# Measures of the cycle run

- Calls in all: 129
- Calls of the orchestrator: 71
- Calls of subagents: 58
- Mean context per call: 122024
- Mean context per call of the orchestrator: 156896
- Share of the context in calls above 200000 tokens: 17.9%
- Context of the orchestrator's first call: 45507
- Context of the orchestrator's middle call: 160584
- Context of the orchestrator's last call: 223679
- Cache written, 5 minutes: 111195
- Cache written, 1 hour: 299747
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator c5cf5bfa-224e-499a-881c-3282f49bfb11 | Claude Code | 71 | 45507 | 160584 | 223679 | 0 | 202813 | 0 | 0 | 1000 | 1 | 1874 | 1 |
| Author: add wall glossary entry (the-way-author) | Claude Code | 28 | 25635 | 78927 | 96936 | 0 | 96934 | 0 | 0 | 9211 | 4 | 0 | 0 |
| Review whole change (opus) (the-way-stage) | Claude Code | 30 | 25565 | 78942 | 111197 | 111195 | 0 | 0 | 0 | 26202 | 11 | 19552 | 2 |
