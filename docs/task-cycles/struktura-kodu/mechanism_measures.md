# Measures of the cycle run

- Calls in all: 758
- Calls of the orchestrator: 104
- Calls of subagents: 654
- Mean context per call: 180324
- Mean context per call of the orchestrator: 222465
- Share of the context in calls above 200000 tokens: 58.2%
- Context of the orchestrator's first call: 44737
- Context of the orchestrator's middle call: 236626
- Context of the orchestrator's last call: 325075
- Cache written, 5 minutes: 2404666
- Cache written, 1 hour: 304653
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 19d88f4e-8dfc-4480-ad8f-aac8b833ecb2 | Claude Code | 104 | 44737 | 236626 | 325075 | 0 | 304653 | 0 | 0 | 4099 | 11 | 56162 | 2 |
| Make slice 1 (the-way-stage) | Claude Code | 32 | 25317 | 126599 | 148022 | 136960 | 0 | 0 | 0 | 17102 | 4 | 0 | 0 |
| Make slice 2 (Scene) (the-way-stage) | Claude Code | 116 | 25328 | 241694 | 293152 | 293150 | 0 | 0 | 0 | 14232 | 5 | 0 | 0 |
| Write foundation entries (the-way-stage) | Claude Code | 28 | 25303 | 132861 | 148904 | 138478 | 0 | 0 | 0 | 67295 | 13 | 0 | 0 |
| Review the whole change (the-way-stage) | Claude Code | 92 | 25528 | 225296 | 426346 | 426344 | 0 | 0 | 0 | 28223 | 7 | 9955 | 2 |
| Review the return step (the-way-stage) | Claude Code | 20 | 25440 | 87438 | 105964 | 94902 | 0 | 0 | 0 | 18438 | 6 | 0 | 0 |
| Make slice 3 (RuleListView) (the-way-stage) | Claude Code | 54 | 25376 | 148457 | 183745 | 173319 | 0 | 0 | 0 | 10170 | 3 | 0 | 0 |
| Make slice 5 (ProgramPanelView) (the-way-stage) | Claude Code | 68 | 25704 | 177184 | 228684 | 217622 | 0 | 0 | 0 | 16454 | 7 | 0 | 0 |
| Take the return step (the-way-stage) | Claude Code | 40 | 25432 | 104163 | 133551 | 122489 | 0 | 0 | 0 | 31655 | 12 | 0 | 0 |
| Plan the task slices (the-way-stage) | Claude Code | 63 | 25298 | 224658 | 316476 | 316474 | 0 | 0 | 0 | 40313 | 10 | 50680 | 1 |
| Fix the Minor findings (the-way-stage) | Claude Code | 34 | 25578 | 78293 | 113956 | 103530 | 0 | 0 | 0 | 17266 | 11 | 0 | 0 |
| Make slice 6 (transport test) (the-way-stage) | Claude Code | 29 | 25752 | 117764 | 143933 | 132871 | 0 | 0 | 0 | 7807 | 7 | 0 | 0 |
| Make slice 4 (RulePanelView) (the-way-stage) | Claude Code | 78 | 25464 | 191288 | 248529 | 248527 | 0 | 0 | 0 | 14602 | 4 | 0 | 0 |
