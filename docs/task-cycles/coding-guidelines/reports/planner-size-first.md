# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| F1 | 2 | unknown | unknown | unchecked | `.the-way/gate/README.md` names no file under the root |
| F2 | 3 | 129408 | 51764 | fits | — |
| F3 | 3 | 144230 | 57692 | fits | — |
| F4 | 2 | 128819 | 51528 | fits | — |
| F5 | 2 | 177082 | 70833 | fits | — |
| F6 | 3 | 169621 | 67849 | fits | — |
| 1 | 7 | 183937 | 73575 | fits | — |
| 2 | 3 | 132959 | 53184 | fits | — |
| 3 | 3 | 180311 | 72125 | fits | — |
| 4 | 7 | 155995 | 62398 | fits | — |
| 5 | 6 | 125337 | 50135 | fits | — |
| 6 | 5 | 153760 | 61504 | fits | — |
| 7 | 7 | 145801 | 58321 | fits | — |
| 8 | 4 | 129267 | 51707 | fits | — |
| 9 | 10 | 174571 | 69829 | fits | — |
| 10 | 5 | 144612 | 57845 | fits | — |
| 11 | 5 | 183046 | 73219 | fits | — |
| 12 | 1 | 172331 | 68933 | fits | — |
