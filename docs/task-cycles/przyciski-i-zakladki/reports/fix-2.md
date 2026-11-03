# Report — Fix 2, return step of task `przyciski-i-zakladki`

**Status:** done

## Commits

- `ebd96c2` — docs: :memo: record the secondary action in the glossary, a narrower meaning than the field gives the words. On `claude/lucid-ptolemy-jl068t`, on the reviewed head `9f4e5bb`; not pushed.
- Files: `foundations/glossary.md` +7 −0.
- Range for the reviewer: `9f4e5bb..ebd96c2`.

## Finding B1 — fixed

**I accept the finding; my three grounds do not hold.** „Gate” in WAY-95 shows that a narrowing takes an entry. An entry rewrites no sentence, so WAY-95's *Rejected* does not stand against it. The term carries one meaning: my own count of its uses agrees with the reviewer's (below), and the two places I cited are adjectives, not uses of the term. The three quotes of the field's sources stand in `C:\Storage\repos\loop2\.runs\styleguide\browser-view\button-hierarchy.md:118`, `:164` and `:294` as the finding gives them.

**The entry**, written through `the-way-record-glossary-term`, at the end of `foundations/glossary.md`:

> A secondary action is an action of the browser view that opens or leaves a state of a form and stands under that form, a button drawn as underlined text without a frame.
>
> - **Not:** none

- **Definition:** from D-275's binding sentence, as the skill's step 3 gives. It differs from the finding's example in one way: it says „a button drawn as” rather than „is drawn as”, so the entry also keeps D-275's „a button still”, which D-275's *Verification* depends on („„Nie pamiętam hasła” made a link with an address” violates).
- ***Not*:** `none`. The uses show no second meaning, and the reader's meaning is one *Not* never names.
- **Meaning, in Polish, for the request:** Akcja poboczna to wyłącznie działanie widoku w przeglądarce, które otwiera albo opuszcza stan formularza i stoi pod tym formularzem — przycisk narysowany jako podkreślony tekst bez ramki, a nie każde mniej ważne działanie.

**What follows from the entry:** nothing. A new entry moves no use. Each of the 18 uses already carries this meaning.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` on the tree of `ebd96c2` | 0 | `0 errors` |
| ripgrep, multiline, case-insensitive, `\bsecondary\s+actions?\b`, outside `.the-way` (the Grep tool) | not reported by the tool | 18 lines hit, in `decisions.md` (7), `styleguide-browser-view.md` (1), `styles.css` (3), `react-controls.test.mjs` (3), `kitchen-sink.css` (1), `kitchen-sink.ts` (1), `button.ts` (1), `react-button.tsx` (1); each read as D-275's meaning; the tool hid `decisions.md:914` as too long, and `grep -o -E 'the secondary action \(D-275\)' foundations/decisions.md` shows the use there |
| `grep -n -i 'secondary\|lesser' .the-way/foundations/glossary.md foundations/glossary.md` before the entry | not captured, it ran inside a longer command | no hit: no entry under this word or another holds the meaning |
| `git ls-files --eol foundations/glossary.md` | 0 | `i/lf w/lf`, line endings kept |

Not run: the product's gate (`npm test` with no argument), which the handoff excludes; focused tests, because the commit touches one Markdown file. `foundation_check.py` holds no check of WAY-95 or WAY-99, so it says nothing on the finding itself; the search above does.

## Own-work check

- **Requirement most likely not met:** an entry whose definition is wider or narrower than D-275.
- **Check:** the definition read clause by clause against D-275's binding sentence and against the violating examples of its *Verification*.
- **Showed:** each clause stands in D-275 („opens or leaves a state of a form”, „stands under that form”, „underlined text”, „without a frame”, „a button”). „In `text-secondary`” is left out: a colour belongs to the decision, and a definition carries what the word names. „Of the browser view” comes from D-275's second sentence.

## Choices, with the way rejected and the cost if wrong

- **The two adjectives stay.** The finding leaves it to the fixer whether „wherever an action is secondary” (`foundations/decisions.md:5769`) is a use of the term. I read it as the adjective, in a rejected way that names what a reader would mean, quoted from pytanie 1b. So is „choćby poboczne” (`guidelines/styleguide-browser-view.md:343`). Rejected: rewriting them to „lesser” — a change of D-275 for no meaning gained, and the sentence loses the contrast it exists to draw. Cost if wrong: one clause, changed at the merge.
- **The entry stands last in the file.** The glossary has no order, and the template gives none.

## Left as the handoff gives

- The reviewer's Minor findings M1 and M2 are not fixed. M1 is a wrong line in my report on D-268; the bare uses left are D-36 and D-47 only. Whoever carries that list into the request needs the corrected one.
- `reports/return-step.md`: only the section *Fix 2* added.
- The line for the request on „tab” is the orchestrator's.

## Reaches beyond the handoff

- WAY-96 in `.the-way/foundations/decisions.md:2041-2060`: how a definition is written.
- `button-hierarchy.md:118, 164, 294`, in the main checkout, ignored by git: to verify the finding's quotes before accepting it.

## Searches not found or unclear

- How a narrowing stands under WAY-95 is said by no sentence of the-way; I accept the reviewer's reading from WAY-95's example „gate” and the product's glossary.
