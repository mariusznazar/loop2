# Measures of the cycle run

- Calls in all: 1967
- Calls of the orchestrator: 252
- Calls of subagents: 1715
- Mean context per call: 179878
- Mean context per call of the orchestrator: 223834
- Share of the context in calls above 200000 tokens: 54.5%
- Context of the orchestrator's first call: 44721
- Context of the orchestrator's middle call: 320829
- Context of the orchestrator's last call: 230628
- Cache written, 5 minutes: 7253696
- Cache written, 1 hour: 860128
- Cache written again by the orchestrator: 293768
- Calls of the orchestrator with a cache write again: 3
- Cache written again by subagents: 1033789
- Calls of subagents with a cache write again: 4

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator c58815b9-0f0a-42d7-a93e-293a93f2f4a5 | Claude Code | 80 | 45031 | 146056 | 230628 | 0 | 503974 | 293768 | 3 | 13475 | 6 | 0 | 0 |
| Return step of the task cycle (the-way-stage) | Claude Code | 69 | 25599 | 190062 | 232530 | 221468 | 0 | 0 | 0 | 61831 | 30 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 109 | 25861 | 327180 | 501943 | 942348 | 0 | 451467 | 1 | 42720 | 9 | 37775 | 3 |
| Executor slice 19 (watcher flaky test) (the-way-stage) | Claude Code | 89 | 25658 | 217781 | 280253 | 280251 | 0 | 0 | 0 | 15254 | 2 | 0 | 0 |
| Executor slice 20 (backup flaky test) (the-way-stage) | Claude Code | 80 | 25658 | 172474 | 214787 | 786047 | 0 | 582322 | 3 | 10602 | 1 | 0 | 0 |
| Fix 1 of whole-change review findings (the-way-stage) | Claude Code | 112 | 25785 | 183169 | 283308 | 272246 | 0 | 0 | 0 | 19711 | 13 | 0 | 0 |
| Review of the return step commits (the-way-stage) | Claude Code | 44 | 25585 | 100500 | 140837 | 129775 | 0 | 0 | 0 | 53162 | 14 | 0 | 0 |
| Executor slice 22 (image icons flaky test) (the-way-stage) | Claude Code | 139 | 25989 | 221753 | 303009 | 291947 | 0 | 0 | 0 | 13334 | 1 | 0 | 0 |
| Executor slice 21 (container flaky test) (the-way-stage) | Claude Code | 118 | 25745 | 188496 | 243126 | 232064 | 0 | 0 | 0 | 24540 | 4 | 0 | 0 |
| orchestrator fb63c0aa-f3ad-42a3-b7c8-4cebd6ba3acb | Claude Code | 172 | 44721 | 280091 | 376576 | 0 | 356154 | 0 | 0 | 19846 | 15 | 4840 | 1 |
| Executor of slice 12 (the-way-stage) | Claude Code | 68 | 25560 | 216315 | 265200 | 254138 | 0 | 0 | 0 | 11423 | 4 | 0 | 0 |
| Executor of slice 14 (the-way-stage) | Claude Code | 19 | 25622 | 105457 | 116642 | 105580 | 0 | 0 | 0 | 8431 | 3 | 0 | 0 |
| Executor of slice 9 (the-way-stage) | Claude Code | 31 | 25472 | 141425 | 154763 | 143701 | 0 | 0 | 0 | 8780 | 5 | 0 | 0 |
| Executor of slice 16 (the-way-stage) | Claude Code | 9 | 25568 | 95847 | 100819 | 89757 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Planner for the test-gaps task (the-way-stage) | Claude Code | 34 | 25333 | 138286 | 165683 | 165681 | 0 | 0 | 0 | 70722 | 15 | 0 | 0 |
| Executor of slice 11 (the-way-stage) | Claude Code | 40 | 25530 | 169711 | 200142 | 189080 | 0 | 0 | 0 | 16912 | 4 | 0 | 0 |
| Executor of slice 8 (the-way-stage) | Claude Code | 15 | 25442 | 112515 | 121105 | 110043 | 0 | 0 | 0 | 5737 | 2 | 0 | 0 |
| Executor of slice 2 (the-way-stage) | Claude Code | 25 | 25464 | 142331 | 159155 | 148093 | 0 | 0 | 0 | 17648 | 2 | 0 | 0 |
| Reviewer of the spec for item 16 (the-way-stage) | Claude Code | 26 | 25336 | 105807 | 127828 | 116766 | 0 | 0 | 0 | 21936 | 5 | 0 | 0 |
| Second planner with the reviewed spec (the-way-stage) | Claude Code | 101 | 25353 | 260176 | 402054 | 390992 | 0 | 0 | 0 | 106431 | 24 | 0 | 0 |
| Executor of slice 5 (the-way-stage) | Claude Code | 26 | 25434 | 112199 | 124294 | 113232 | 0 | 0 | 0 | 4953 | 4 | 0 | 0 |
| Executor of slice 18 (flaky transport test) (the-way-stage) | Claude Code | 90 | 25628 | 176454 | 227005 | 215943 | 0 | 0 | 0 | 9742 | 3 | 0 | 0 |
| Review of slice 17 (the-way-stage) | Claude Code | 26 | 25518 | 128662 | 155051 | 143989 | 0 | 0 | 0 | 25933 | 2 | 0 | 0 |
| Executor of slice 6 (the-way-stage) | Claude Code | 38 | 25415 | 188498 | 215326 | 215324 | 0 | 0 | 0 | 23753 | 4 | 0 | 0 |
| Executor of slice 10 (the-way-stage) | Claude Code | 47 | 25491 | 200611 | 220196 | 209134 | 0 | 0 | 0 | 26070 | 6 | 0 | 0 |
| Executor of slice 15 (the-way-stage) | Claude Code | 30 | 25595 | 136554 | 154750 | 143688 | 0 | 0 | 0 | 18442 | 3 | 0 | 0 |
| Foundation entries agent (the-way-stage) | Claude Code | 77 | 25334 | 179291 | 245746 | 234684 | 0 | 0 | 0 | 108831 | 29 | 30629 | 2 |
| Executor of slice 1 (the-way-stage) | Claude Code | 24 | 25436 | 118401 | 130998 | 130996 | 0 | 0 | 0 | 26769 | 3 | 0 | 0 |
| Designer of the spec for item 16 (the-way-stage) | Claude Code | 35 | 25306 | 101319 | 140715 | 129653 | 0 | 0 | 0 | 25664 | 10 | 0 | 0 |
| Executor of slice 13 (the-way-stage) | Claude Code | 16 | 25644 | 109647 | 119437 | 108375 | 0 | 0 | 0 | 8936 | 3 | 0 | 0 |
| Executor of slice 17 (flaky mailer test) (the-way-stage) | Claude Code | 78 | 25621 | 140275 | 179101 | 179099 | 0 | 0 | 0 | 13379 | 1 | 0 | 0 |
| Executor of slice 4 (the-way-stage) | Claude Code | 32 | 25415 | 198810 | 217624 | 206562 | 0 | 0 | 0 | 21274 | 3 | 0 | 0 |
| Executor of slice 3 (the-way-stage) | Claude Code | 51 | 25407 | 136823 | 162478 | 151416 | 0 | 0 | 0 | 15135 | 4 | 0 | 0 |
| Executor of slice 7 (the-way-stage) | Claude Code | 17 | 25441 | 191089 | 201626 | 201624 | 0 | 0 | 0 | 21391 | 2 | 0 | 0 |
