# Measures of the cycle run

- Calls in all: 1291
- Calls of the orchestrator: 140
- Calls of subagents: 1151
- Mean context per call: 203591
- Mean context per call of the orchestrator: 274410
- Share of the context in calls above 200000 tokens: 67.1%
- Context of the orchestrator's first call: 45719
- Context of the orchestrator's middle call: 285920
- Context of the orchestrator's last call: 422177
- Cache written, 5 minutes: 5841489
- Cache written, 1 hour: 401233
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 1248273
- Calls of subagents with a cache write again: 5

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 54f8e36c-afad-4b49-905f-0d7b067dba02 | Claude Code | 140 | 45719 | 285920 | 422177 | 0 | 401233 | 0 | 0 | 1187 | 5 | 0 | 0 |
| Slice 4: measurement mode of three maps (the-way-stage) | Claude Code | 74 | 25722 | 259583 | 304854 | 304852 | 0 | 0 | 0 | 31843 | 4 | 0 | 0 |
| Review slice 2 (trust boundary) (the-way-stage) | Claude Code | 38 | 25672 | 137418 | 162385 | 151206 | 0 | 0 | 0 | 30179 | 7 | 0 | 0 |
| Slice 3: solved-map run takes from chest (the-way-stage) | Claude Code | 69 | 25674 | 200042 | 260736 | 481008 | 0 | 230815 | 1 | 38165 | 7 | 0 | 0 |
| Review slices 8-10 together (the-way-stage) | Claude Code | 90 | 25913 | 230981 | 332667 | 608878 | 0 | 276213 | 1 | 44852 | 6 | 0 | 0 |
| Review slice 1 foundation rules (the-way-stage) | Claude Code | 45 | 25647 | 141009 | 193505 | 193503 | 0 | 0 | 0 | 61602 | 15 | 0 | 0 |
| Review slice 7 (trust boundary) (the-way-stage) | Claude Code | 66 | 25776 | 194360 | 244812 | 244810 | 0 | 0 | 0 | 29507 | 12 | 0 | 0 |
| Slice 5: view reads resurrection via function (the-way-stage) | Claude Code | 36 | 25726 | 182640 | 205205 | 194026 | 0 | 0 | 0 | 20704 | 4 | 0 | 0 |
| Slice 7: tests of the load v8 (the-way-stage) | Claude Code | 90 | 25758 | 223926 | 287456 | 545291 | 0 | 268378 | 1 | 34306 | 12 | 0 | 0 |
| Slice 8: tests of death and completion (the-way-stage) | Claude Code | 46 | 25799 | 201591 | 237440 | 226261 | 0 | 0 | 0 | 23393 | 8 | 3829 | 1 |
| Fix findings of slices 8-10 review (the-way-stage) | Claude Code | 65 | 25999 | 164955 | 239954 | 239952 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Slice 9: catch-up and loops on uses (the-way-stage) | Claude Code | 73 | 25893 | 237360 | 288219 | 277040 | 0 | 0 | 0 | 19926 | 4 | 0 | 0 |
| Review slices 3-4 together (the-way-stage) | Claude Code | 68 | 25716 | 201030 | 264650 | 264648 | 0 | 0 | 0 | 30641 | 5 | 0 | 0 |
| Slice 1: foundation rules (the-way-stage) | Claude Code | 64 | 25670 | 170272 | 232023 | 453268 | 0 | 221247 | 1 | 98361 | 60 | 0 | 0 |
| Plan the slices of the task (the-way-stage) | Claude Code | 92 | 25629 | 329788 | 496334 | 496332 | 0 | 0 | 0 | 143994 | 19 | 54761 | 3 |
| Slice 2: load admits deposit (the-way-stage) | Claude Code | 32 | 25648 | 142118 | 166223 | 155680 | 0 | 0 | 0 | 21902 | 9 | 2932 | 2 |
| Slice 10: balance instrument counts uses (the-way-stage) | Claude Code | 73 | 25936 | 187594 | 253354 | 242175 | 0 | 0 | 0 | 14496 | 6 | 0 | 0 |
| Slice 6: resurrection uses in state (the-way-stage) | Claude Code | 77 | 25743 | 220530 | 260927 | 512545 | 0 | 251620 | 1 | 36867 | 6 | 0 | 0 |
| Review slices 5-6 (trust boundary) (the-way-stage) | Claude Code | 53 | 25726 | 209276 | 250016 | 250014 | 0 | 0 | 0 | 41861 | 7 | 0 | 0 |
