# Report of correction 1 (the human's remarks on the open request)

**Status:** `done`. Head at the start: `3b4cc2a6`. Not pushed. The product's full gate was not run. No code and no stylesheet changed.

## Commits

| Commit | File | Lines +/- | What |
|---|---|---|---|
| `c25e09b1` | `foundations/decisions.md` | 8 / 8 across both | remark 1 in D-421, remark 3 in D-40 |
| `bf0f4bc3` | `guidelines/styleguide-browser-view.md` | 11 / 8 across both | remark 1 in the styleguide |
| `370abc76` | `src/browser/styles.css` | 6 / 4 | the orchestrator's addition: the head comment of `styles.css` carries the same qualification (comment lines only) |

(The first two commits together: 2 files, 11 insertions, 8 deletions: `git diff --stat 3b4cc2a6 bf0f4bc3`.)

## The remarks

### Remark 1 — N1 of the review of fix 1: made

The foundation changes follow `elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md` and `template.md` (read in the fix before; the entry is edited in place, binding sentences still three, no field outside what the sentence touches).

**D-421** (`foundations/decisions.md`, its heading `### D-421 — Which stylesheets …`):
- *Second binding sentence.* The criterion now reads: "… and each rule that the elements of several screens need, that cannot be divided without changing its text and that belongs to no part with a stylesheet of its own, as the rules of the credits that name the login card and Siedziba belong to `credits.css`: a rule whose selector list names classes of more than one screen, or the rule of a sentence that several screens draw, which today are, besides those columns, the sentence `trip-warning` and the animation of the frames of the sprites of the scene and of the camp." Under it the four rules of `src/browser/credits.css` (lines 12-35) are outside the exception (they belong to the part with its own file); the "today are" list is true: the columns are named earlier in the same sentence as the common layout ("besides those columns" says so, since the columns rule also fits the criterion), and `trip-warning` and the frames rule belong to no part with its own file. I searched the stylesheets of the screens and parts for selector lists naming classes of two screens: only the four rules of the credits (the review's own finding) and the two in `styles.css`; I did not repeat the whole search beyond reading the review's evidence and `credits.css`.
- *Third binding sentence.* Now begins "Each screen and every other part that several screens use has a stylesheet of its own, …", as the finding words it. The rest of that sentence is as it was.
- *Verification.* The *complies* example of the frames gained "and which no part with a stylesheet of its own holds", and a second example in the same line: "the rules of the folded credits that name the login card and Siedziba in `src/browser/credits.css`, the stylesheet of that part". The *violates* examples are unchanged and true under the new wording (a rule of two screens written into the stylesheet of one of them; the rules of a screen in `styles.css` or in another screen's file).
- *Rationale / Accepted with it.* The two phrases that restated the exception now carry the same qualification ("that no part with a stylesheet of its own holds"; "and which belongs to no part with a stylesheet of its own"). *Rejected* is unchanged.

**The styleguide** (`guidelines/styleguide-browser-view.md`, the rule "A stylesheet of its own for each screen and each shared part", the paragraph on what `styles.css` keeps): the sentence now says the rule is one "której potrzebują elementy kilku ekranów, której nie da się podzielić bez zmiany jej tekstu i która nie należy do żadnej części z własnym arkuszem — tak jak reguły sekcji „Autorzy grafiki”, które nazywają kartę logowania i Siedzibę, należą do `src/browser/credits.css`", and "Dziś to, poza wymienionymi kolumnami, zdanie `trip-warning` i animacja klatek …". The summary „Autorzy grafiki” is the section the credits file styles (`credits-section.tsx:23`), the Polish name the game shows. Nothing else of the rule changed: its first paragraph ("Każdy ekran i każda część, której używa kilka ekranów, ma własny arkusz …", which was already true of the excepted screens), its *Good* and *Bad* lines, and the closing sentences. *Good* ("reguły części, której używają dwa ekrany, w pliku tej części") and *Bad* are true under the new wording.

**Search that every place restating the exception holds the same words:** `git grep -n "no part with a stylesheet of its own\|żadnej części z własnym arkuszem\|credits.css" -- foundations/decisions.md guidelines` finds: D-421 (second sentence; *complies*; *Rationale*; *Accepted with it*, the four places that restate the exception) and the styleguide paragraph (one place). D-408 and the rest of the styleguide do not restate the exception. `styles.css`'s head comment and the two comments at the columns rule and at `trip-warning` say the rules "stand there by the exception D-421 gives"; the stylesheets were not changed by the first two commits (the handoff forbade it), and the head comment's list lacked the qualification "that belongs to no part with a stylesheet of its own" that the entry holds; the addition below gave it. **That comment of `styles.css:6-12` was therefore one step wider than D-421; the orchestrator's addition (below) changed it.**

### The orchestrator's addition: the head comment of `styles.css` — made (`370abc76`)
The comment (lines 6-13) now reads "By the exception D-421 gives it holds also each rule that the elements of several screens need, that cannot be divided without changing its text and that belongs to no part with a stylesheet of its own: the columns of the screens Programy, Mapy and Wiedza …; the sentence `trip-warning` …; and the rule that runs the frames … with the keyframes `scene-frames`. The rules of the credits that name the login card and Siedziba belong to the part credits.css." The three examples are as they were and true under the qualification. A comment-only change: `git diff -U0` holds no changed line outside the comment (counted 0 lines not starting ` *`), no selector, declaration or rule moves. Checks: `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css` exit 0 (`All matched files use Prettier code style!`); `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`. I did not run a test of the product (a comment).

### Remark 2 — let through: nothing made
As the remark says; the states not covered by the recording stay for the queued task. Nothing in the files.

### Remark 3 — D-40: made
D-40's first paragraph (`foundations/decisions.md`, `### D-40 — What do the neutral roles of the browser view mean?`), the sentence about the badge, now reads "… and so do the icons of the drawing of the map, on `tile-revealed`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either. The bar of a requirement …": the words of D-43, in the grammar of D-40's sentence, added after the existing words, so the beginning of the sentence the three tests quote (`tests/view/scene.test.mjs`, `tests/view/world-area.test.mjs`, `tests/view/run-header.test.mjs`, each by a line `decision: D-40`) is unchanged; their quotations end before the new words. Nothing else of D-40 changed: *Rationale*, *Verification* and *Relations* untouched. The element's `SKILL.md` and `template.md` do not require *Verification* or *Rationale* to follow a binding sentence that gains a clause: the *Verification* names the tests that hold parts of the sentences, and I did not verify that a test holds the plaque's icon in D-40's words (I did not search for one), so no field was changed.

## Checks (commands and exit codes)

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the commits and after them) | 0 | `0 errors`; no `listed:` line (`grep -c "listed:"` gives 0) |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 142 warn, 7 info` (the number the review of fix 1 gives for the same files; warnings do not stop the gate) |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore guidelines/styleguide-browser-view.md` | 1 | warns on the file. **The same command on the file at `HEAD` (`3b4cc2a6`), checked by restoring it for the run and putting my version back, also exits 1 with the same warning**, so the failure is not from this change; the repository's own configuration (`npx prettier --check guidelines/styleguide-browser-view.md`) warns too. The repository's gate does not seem to cover Markdown by Prettier; I did not look for where it would. A copy of my version checked outside the repository's configuration showed no difference to its own formatting, which I note and do not rely on. |
| the `git grep` search for the restated exception | 0 | above |

## Reaches beyond the dispatch

- `src/browser/view/credits-section.tsx` (search for `credits` and `summary`): the Polish name of the section, „Autorzy grafiki”, for the styleguide's sentence.
- `git grep "decision: D-40 "` in `tests/` (the lines): to see the end of each quotation of D-40.
- `.runs/task-cycles/porzadki-widoku-po-react/reports/correction-1-handoff.md`, `correction-1-remarks.md`: whole. `review-fix-1-report.md`: whole of N1, the checks table and the closing sections; the part before N1 (Important 1, Important 2 and Minor findings' verdicts) by its summary lines only.

## Choices

- **"besides those columns"** in the "today are" list rather than listing the columns rule there: the columns of Programy, Mapy and Wiedza are already in the same sentence as the common layout and also fit the criterion. Rejected: adding the columns to the list (they would stand twice); dropping the "today are" list (the finding asks to keep it true). Cost if wrong: a few words.
- **The credits example in D-421's *complies*** (not asked): the finding says the examples "must stay true"; one added example keeps the next reader from the reading the review fears. Cost if wrong: one clause to remove.
- **The qualification in *Rationale*/*Accepted with it* too**: they restated the exception; leaving them with the broad wording would make the entry say two things. Rejected: leaving them; the handoff asked for the entry's wording to stay consistent.

## Unread material

- `guidelines/styleguide-browser-view.md`: **not read whole**; read the rule "A stylesheet of its own for each screen and each shared part" (lines 336-375), the table of roles (lines 8-30), and by search for `credits`, `podziękowa`, `D-421`, `arkusz` (lines found: 86, 131, 150, 333, 338-372, 784, 804, 857, 1104). The handoff names it whole; the correction touches one rule.
- `src/browser/credits.css`: first 45 lines (the whole file is 45 lines): read whole. The head comment of `styles.css` (lines 1-16) read whole and changed by the addition, the rest of that file not read again; the head comments of the other stylesheets not read (nothing to change there). The head comments of `styles.css` (lines 1-13) and `index.html` (by search for `stylesheet`, lines 7-19): `index.html` not read beyond that.
- D-421, D-40, D-43 (D-43 only the last sentence, by search): D-421 and D-40 read whole; D-43 not reread whole (read whole in fix 1, unchanged). D-407: not reread (not touched; named by the handoff). D-47 and D-265: not reread (read in fix 1).
- `.the-way/task-cycle/change/SKILL.md`, `fix.md`: read in fix 1 in this session, not reread for the "correction" row; its text reads "a correction for the human's remarks": the report holds each remark as made, and how, which this report does.

## Searches not found or unclear

- none. (One check I did not do: a full search of the stylesheets for further selector lists of two screens; I relied on the review's own `grep` and on `credits.css`.)

## Working copies

- `.runs\correction-1\` (copies of the styleguide for the Prettier check): **removed** before I returned. Nothing kept beside this report. No game started, no screenshot made.
