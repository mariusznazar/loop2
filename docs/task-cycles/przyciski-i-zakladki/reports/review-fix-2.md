PASS ebd96c2ed56c32dd924b064ccf98cc1afce90e70

# Review of fix 2 — return step of task `przyciski-i-zakladki`

Range `9f4e5bb..ebd96c2`, one commit, `foundations/glossary.md` +7 −0. Bounded by `.the-way/task-cycle/review/fix.md` and the findings file `reports/findings-2.md`. I wrote finding B1 myself; I did not write the fix.

## The findings file

### B1 — „secondary action” takes a glossary entry — **fixed**

The defect no longer exists on the new head. `foundations/glossary.md:242-247` holds the entry:

> A secondary action is an action of the browser view that opens or leaves a state of a form and stands under that form, a button drawn as underlined text without a frame.
>
> - **Not:** none

- **Form:** a heading with the term as the foundation writes it in running text, held by no other entry of the product's glossary or of the-way's; one sentence (WAY-96); the one field *Not* (WAY-94). The file's order is no rule: it is not sorted, so the place at its end is free.
- **Meaning against D-275:** each clause stands in its binding sentence (`foundations/decisions.md:5747-5750`), and „of the browser view” comes from its second sentence. The difference from my example, „a button drawn as” for „is drawn as”, is an improvement: it keeps D-275's „and a button still”, which my example lost.
- **The left-out `text-secondary`:** right, and not a restatement without a qualification (WAY-263). A secondary action under the pointer stands in `text` and a disabled one in `text-disabled` (`src/browser/styles.css:199-202`, pytanie 1a), so a colour in the definition would be false of its own states. D-275 keeps the colour.
- **Against the code:** `kind="secondary"` stands at `account-card.tsx:314`, `:447` and `:520` and in the kitchen-sink sample; `.button.secondary` draws underlined text with no visible frame (`styles.css:189-197`), and it is one `<button>` in both forms.
- ***Not* `none`:** right. The product's 18 uses show no second meaning, and the reader's meaning is one *Not* never names.
- **The two adjectives left as they are:** the finding left this to the fixer. The reasons given hold: they name in a rejected way what a reader would mean, and they are not uses of the term.
- **Polish sentence for the request:** present in `fix-2.md:23` and `return-step.md`, and it says what the entry says.

The author contests nothing; there is no contested finding to keep or withdraw.

## What the fix itself could have broken

Nothing Critical or Important.

- A definition that holds the look now stands beside uses that describe the action without that look: „the secondary actions left as plain buttons” (`decisions.md:5768`, a rejected way), „only the secondary actions as text” (`:5737`, a rejected way) and „a secondary action given a frame” (`:5759`, a violating example). I weighed these against the template's „a definition true of one is false of the other”. They are no second meaning: a rejected way and a breach each describe the same actions as they must not stand, as „a main button filled” does in D-274. My own example in B1 held the same clause. No finding.
- The entry moves no use, so the search WAY-97 asks of a changed definition has nothing to rewrite; this is a new term, and the 18 uses already carry its meaning.
- `foundation_check.py` ends with `0 errors`, and the commit touches no code.

## Minor and out-of-scope notes

None new. M1 and M2 of `reports/review-return-step.md` stand unfixed, as the fix's handoff gives; both are for whoever writes the request. M1: the list of bare uses left is D-36 and D-47 only, which `fix-2.md:51` already says. M2: the line for the request should also name „main button”.

## Declined to judge

- The four lines of *Declined to judge* of `reports/review-return-step.md` stand; this review, bounded by the findings file, does not reopen them.

## Checks

| Command or method | Exit code | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `ebd96c2ed56c32dd924b064ccf98cc1afce90e70`, the head given |
| `git diff --stat 9f4e5bb ebd96c2` | 0 | `foundations/glossary.md` alone, +7 |
| `git diff --word-diff=porcelain 9f4e5bb ebd96c2 \| grep -E "^[-+][^-+]"` | 0 | the heading and the definition; no removal |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`. It holds no check of WAY-95 or WAY-99, so the judgement above rests on the reading, not on it |
| Python search of `\bsecondary\s+actions?\b` over `git ls-files` outside `.the-way`, line breaks read as spaces | 0 | 20 uses: the entry's 2 and the 18 `fix-2.md` lists, by file the same |
| `grep -n -i -E 'secondary\|lesser' foundations/glossary.md .the-way/foundations/glossary.md` | 0 | hits at the new entry alone: no other entry holds the term or the meaning |
| `git ls-files --eol foundations/glossary.md` | 0 | `i/lf w/lf`; the file ends in one newline |
| `git grep -n -E 'foundations/glossary\|glossary\.md' -- tests scripts package.json` | 1 | no match, which is the result wanted; the same search for `foundations/decisions` finds seven test files, so the search itself works |
| `git status --short \| wc -l` before writing this report | 0 | 0; the report path is ignored by git |
| Manual: `src/browser/styles.css:183-202` and the `kind` uses read against the definition | — | match |

Not run: the product's gate, excluded by the dispatch. No focused test was run: the commit changes one Markdown file that no test or script names; `foundation_check.py` is what reads it.

## Reaches beyond the dispatch

- `reports/findings-2.md`, `reports/handoff-fix-2.md`: the findings file `fix.md` names, and what the fix was told.
- `reports/return-step.md`, section *Fix 2*.
- `src/browser/styles.css:183-202`, `account-card.tsx` by a search for `kind="secondary"`: the definition against the code.
- Entries read in the first review and relied on here: D-274, D-275, WAY-94 to WAY-99, the glossary template.

## Searches not found or unclear

- How a narrowing stands under WAY-95 is said by no sentence of the-way; B1 and this result rest on WAY-95's example „gate” and the product's glossary, as `fix-2.md` also says.
