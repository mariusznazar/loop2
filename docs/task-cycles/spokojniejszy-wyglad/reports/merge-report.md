# Merge report — origin/main (01418389, PR #77) into task/spokojniejszy-wyglad

**Status:** `done`. **Commit:** `ce465a2a` (merge commit, parents `1355b910` and `01418389`). Not pushed.

## Conflicts

1. `src/browser/view/credit-lines.ts` (my rename of `footer.ts`; task 17 changed `footer.ts`). Git had carried task 17's changes into the renamed file, with conflict markers at three places. Resolved: the type is `CreditLine` and carries task 17's `sourceSite` field; `creditLines()` returns the icons' lines (typed `CreditLine`, `sourceSite: SOURCE_SITE`) and then one line per `PACK_CREDITS` entry, as task 17 wrote it (pack literals untouched, they live in `credits.ts`, which merged without conflict); `createFooter`, the `link` helper and the footer's doc comment are gone. The merge result had lost the constant `SOURCE_SITE = "game-icons.net"` (I had removed it when `credits-section.tsx` held its own copy; task 17's code reads it again), so I put it back in this file.
2. `src/browser/view/credits-section.tsx`: git had already taken task 17's `credit.sourceSite` as the link text; only the header comment conflicted. Resolved to my text plus task 17's sentence "and after the icons the same line per pack of the scene's pictures". Both screens draw the pack row through this one component.
3. `tests/view/icons.test.mjs`: kept `PACK_LINE`, `PACK_PAGE`, `PACK_LICENCE` with task 17's comment; dropped task 17's two footer cases ("each footer line…", "the footer's last line credits the pack…") because the section cases they correspond to were already merged in with the same literals (`items.length === NAMED.length + 1`, last line equals `PACK_LINE`, its two links `opengameart.org` → `PACK_PAGE` and `CC BY 3.0` → `PACK_LICENCE`); the campfire case and the actions' case take `NAMED.length` as the upper bound as task 17 wrote (`items.slice(6, NAMED.length)`); the title of the section's pack case lost "as the footer does" and now says what it asserts. No assertion weakened or removed: every literal task 17 asserted on the footer is asserted on the section's markup.

## Step 2: what the merge made untrue

Searched the merged tree (all but `node_modules`, `.git`, `.runs`, `.the-way`, `dist`) for `footer` and `stopk`:
- `foundations/decisions.md:5725`, D-271 *Verification* "complies": "with a credit line for the pack in the footer" — **corrected** to "in the folded section of credits" (the pack's line stands in the section on the login card and Siedziba; D-271's binding sentence says only "the game credits each pack"). This sentence is task 17's own, but it is false after this change, so I made the smallest correction. I read D-271 whole; no other sentence of it names the footer.
- `sprite-credits` (invariants): says "The game's credits hold …"; true as it stands, method `review`, no test of its own exists (task 17's test is the icons test). Not changed.
- `foundations/decisions.md:695` and `:5454` (D-27 and D-262 *Rejected*: the footer as a rejected way) and the `tests/view/account-screen.test.mjs` cases asserting that no footer stands: mine, intended.
- Environment facts, glossary, part map, `guidelines/`, `README.md`: no footer or "stopka"; `tests/invariants/test_icon_credits.py`: no change needed — its comparison finds credits by game-icons.net pages, and the pack's line (an OpenGameArt page) neither satisfies nor disturbs it; passes.

## Checks (command → exit code)

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node --test "tests/view/**/*.test.mjs" "tests/sim/**/*.test.mjs"` | 0 (1835 tests, all pass) |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 |
| `npm test -- tests/invariants/test_loop2_container_sprites.py` (the invariant tests of the sprites; `sprite-credits` has none, method `review`) | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |

Not run: the full `npm test`.

## Own-work check

Requirement most likely unmet: the pack row shows on both screens, through the one function, with the pack's literals unchanged. Check: the merged `icons.test.mjs` cases on the section's markup (last line = `PACK_LINE`, its two links), the Siedziba case of `headquarters-screen.test.mjs` (the section stands last; passes with the extra line), the account-screen case for the card, and the invariant test of credits — all exit 0 above. I did not open the merged game in a browser: the merge changed no drawing of mine, and the rendering of the section is the same component as before with one more `<li>`.

## Unread material

The rest of task 17's merged changes (scene sprites, `scene.tsx`, `scene-picture.ts`, `styles.css` scene rules, its foundation entries other than D-271 and `sprite-credits`) were merged without conflict and I read only their text for the words `footer`/"stopka" and credits; I did not review them.

## Searches not found or unclear

None.
