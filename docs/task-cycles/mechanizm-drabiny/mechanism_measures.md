# Measures of the cycle run

- Calls in all: 1088
- Calls of the orchestrator: 172
- Calls of subagents: 916
- Mean context per call: 211652
- Mean context per call of the orchestrator: 312232
- Share of the context in calls above 200000 tokens: 70.0%
- Context of the orchestrator's first call: 49632
- Context of the orchestrator's middle call: 299484
- Context of the orchestrator's last call: 527242
- Cache written, 5 minutes: 4152342
- Cache written, 1 hour: 494196
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 682fa05a-99fc-40b9-89f9-abe881ca3434 | Claude Code | 172 | 49632 | 299484 | 527242 | 0 | 494196 | 0 | 0 | 9199 | 19 | 45596 | 2 |
| Review of correction 1 (the-way-stage) | Claude Code | 33 | 26419 | 109043 | 174272 | 162927 | 0 | 0 | 0 | 30139 | 5 | 0 | 0 |
| Executor of slice 5 (the-way-stage) | Claude Code | 27 | 26522 | 79438 | 115168 | 103800 | 0 | 0 | 0 | 41522 | 5 | 0 | 0 |
| model probe 1 (the-way-stage) | Claude Code | 1 | 25984 | 25984 | 25984 | 25982 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Correction 1 author (the-way-stage) | Claude Code | 78 | 26395 | 183815 | 234448 | 234446 | 0 | 0 | 0 | 67392 | 10 | 0 | 0 |
| Foundation entries of the plan (the-way-stage) | Claude Code | 76 | 26211 | 204730 | 283268 | 271923 | 0 | 0 | 0 | 130015 | 30 | 0 | 0 |
| Executor of slice 6 (the-way-stage) | Claude Code | 21 | 26427 | 96761 | 109151 | 109149 | 0 | 0 | 0 | 29968 | 4 | 0 | 0 |
| Review of fix 1 (the-way-stage) | Claude Code | 50 | 26513 | 143080 | 198296 | 184771 | 0 | 0 | 0 | 33740 | 5 | 0 | 0 |
| Executor of slice 1 (the-way-stage) | Claude Code | 48 | 26315 | 230609 | 265573 | 265571 | 0 | 0 | 0 | 48989 | 7 | 0 | 0 |
| Fix 1 of the review findings (the-way-stage) | Claude Code | 76 | 26366 | 229554 | 273687 | 262342 | 0 | 0 | 0 | 101936 | 17 | 0 | 0 |
| Review of the return step (the-way-stage) | Claude Code | 52 | 26489 | 163212 | 212245 | 200900 | 0 | 0 | 0 | 48885 | 11 | 0 | 0 |
| Executor of slice 3 (the-way-stage) | Claude Code | 26 | 26653 | 122559 | 158850 | 147482 | 0 | 0 | 0 | 24448 | 3 | 0 | 0 |
| Planner for mechanizm-drabiny (the-way-stage) | Claude Code | 64 | 26171 | 309861 | 469769 | 458424 | 0 | 0 | 0 | 170882 | 15 | 43001 | 1 |
| Executor of slice 2 (the-way-stage) | Claude Code | 42 | 26458 | 165234 | 209347 | 209345 | 0 | 0 | 0 | 3851 | 2 | 0 | 0 |
| Executor of slice 4 (the-way-stage) | Claude Code | 39 | 26575 | 147305 | 176325 | 164957 | 0 | 0 | 0 | 31821 | 4 | 0 | 0 |
| Executor of slice 7 (the-way-stage) | Claude Code | 27 | 26387 | 94315 | 240925 | 240923 | 0 | 0 | 0 | 19262 | 2 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 87 | 26312 | 266094 | 505379 | 505377 | 0 | 0 | 0 | 3812 | 5 | 8061 | 2 |
| Executor of slice 8 (the-way-stage) | Claude Code | 83 | 26288 | 212778 | 262773 | 251428 | 0 | 0 | 0 | 22937 | 4 | 0 | 0 |
| Return step agent (the-way-stage) | Claude Code | 86 | 26366 | 249802 | 363940 | 352595 | 0 | 0 | 0 | 138225 | 23 | 0 | 0 |
