# Screenshots report — spokojniejszy-wyglad (head 4d52659a)

**Status:** `done`. Pushed as D-357 and D-358 give: public repository `mariusznazar/screenshots`, directory `loop2/spokojniejszy-wyglad/`, branch `loop2/spokojniejszy-wyglad` (new; not `main`), by me with the `gh` account `mariusznazar` (the repository's owner, already signed in), no step of the human. Both images lie in the commit `9a921743ee0e6aabeea0751f68c8b1ea349d6280` of that repository. Both links answer 200 (checked with `curl -L`).

Taken from the final tree: `npm run build` and `npm run local` at head `4d52659a`, a made-up account `agent@example.test` with a made-up password, a game state composed with the game's own functions (`loadSavedGame` accepted it) and sent through the page's ordinary save request. No real address or personal data on either screen (the menu „Konto”, which shows the address, was closed). I looked at each image before publishing it.

## 1. Siedziba with the section "Autorzy grafiki" opened

![Siedziba with the folded section of credits opened at the bottom](https://github.com/mariusznazar/screenshots/blob/9a921743ee0e6aabeea0751f68c8b1ea349d6280/loop2/spokojniejszy-wyglad/siedziba-autorzy-grafiki.png?raw=true)

Shows: the screen Siedziba (1280 px wide) with the team „Agent”, the creation of a character, „Skrzynka 0/60” and, as the last part of the screen, the section „Autorzy grafiki” opened: one credit row per icon (17 icon files, actions' names joined where they share an icon, the extinguished campfire's „Wood Pile icon” among them) and, last, the row of the pack of the dust, „Kurz: „Smoke & Fire Animated Particle [16x16]”, KnoblePersona, opengameart.org, CC BY 3.0, zmienione (przekolorowane)”. No footer under the screen. File: `loop2/spokojniejszy-wyglad/siedziba-autorzy-grafiki.png`.

## 2. The drawing of a map on the screen of a map run

![The drawing of the map Las with icons in text-strong, a burning and an extinguished campfire and a dimmed stock of 0](https://github.com/mariusznazar/screenshots/blob/9a921743ee0e6aabeea0751f68c8b1ea349d6280/loop2/spokojniejszy-wyglad/rysunek-mapy.png?raw=true)

Shows: the drawing of the map Las (16 tiles, all revealed, the character's tile outlined), shown enlarged to twice its size by the page's zoom so that the icons can be read. Every resource icon (stick, berry, fern, flax) is a mask in `text-strong`; the first tile (top left) has the stick dimmed, the stock at 0 (the role `depleted`), and a burning campfire's icon among its icons; the tile at the start of the second row has the extinguished campfire's icon (a pile of wood). File: `loop2/spokojniejszy-wyglad/rysunek-mapy.png`.

## Closed and removed

Browser closed, the local game stopped (`npm run local:stop`: "Local starts stopped: 1"), the clone of the screenshots repository, the PNG files and the temporary scripts deleted (scratchpad outside the worktree and `.playwright-cli/` of the worktree); nothing of this lies in the repository of loop2 or under `.runs/` but this report. Worktree `git status` clean. The commit in the screenshots repository carries the owner's private e-mail address as author, as `git.md` says it is accepted for a public repository.

## Unread material

D-357 and D-358 read whole; `.the-way/task-cycle/change/ui_check.md` read whole earlier in this task; `.claude/skills/loop2-play/SKILL.md` read whole earlier. None unread.

## Searches not found or unclear

None. (The first attempt to scroll the drawing into view failed on the SVG, and a CSS zoom is how the second image was enlarged, since a device scale factor set through the browser protocol did not change the screenshot; neither affects what the image shows.)
