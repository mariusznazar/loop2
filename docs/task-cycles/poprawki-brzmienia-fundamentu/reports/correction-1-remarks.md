Uwagi doradcy dnia w imieniu Mariusza

Fix or let through, item 1 — fix in this request:

- **a.** The "not this" line of the new glossary word "reading" contains the word itself, which the glossary template forbids — reword that line without the term. The relation line of the decision about how the browser view is built says "narrowed by" a later decision, which is not one of the two relation words the template allows — the later decision (D-265) says it narrows the earlier one (D-03), and D-03 loses the line.
- **b.** Two copies of an agent skill about the pictures of the scene still call the picture band "the camp" (`.claude/skills/loop2-scene-art/SKILL.md:9`, `.agents/skills/loop2-scene-art/SKILL.md:9`) — they say "the picture band", and the two copies stay equal.
- **e.** The word "deployment" still names the memory limit of the container in a skill reference of the deployment skill (two copies, `setup_and_secrets.md`) and in one test title (`tests/password-measurement.test.mjs:382`) — they say "the container's memory limit", as the foundation now does; the two copies stay equal.
- **f.** One comment of the simulation code still says "defeated-attack count" (`src/browser/sim/game.ts:369`) — it says "count of beaten attacks", as the foundation now does.

Let through: c (the readme check never lets a wrong pack pass), d (D-322's "less than three seconds" — no measured case passes it), g, and the second half of a's first point (the word "reading" keeping its everyday senses in other entries).

Item 2 — let through: each changed passage was read in full and nothing was found wrong.

