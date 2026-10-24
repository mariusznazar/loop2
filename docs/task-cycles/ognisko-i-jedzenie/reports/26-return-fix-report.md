# Return step fix — report, cycle `ognisko-i-jedzenie`

**Status:** done

Base 105e4b9a27ba495bbc1de5da6bf33fb130659aee; range 105e4b9..2c6b28b.

## Commit and files

- `2c6b28b` docs: open the glossary term extinguished campfire with In the MVP, as a term built
  from an MVP choice

| File | Added | Removed |
|---|---|---|
| `foundations/glossary.md` | 2 | 2 |

## Finding I-1 — fixed

The finding holds. The term carries the choice of an MVP task, *To do* 15 (a campfire's row has two
forms only, so a crafted campfire that was never lit reads „wygasłe”). The round's rule for
candidates built from MVP choices (task, *Context*) asks for the opening "W MVP" / "In the MVP", as
`map run restart`, D-61 and D-63 already have.

Fixed through `the-way-record-glossary-term` as the reviewer recommended. The definition now reads:
"In the MVP, an extinguished campfire is a campfire standing on its tile with no minutes of
burning left, whether it has burnt out or has not been lit yet." The meaning is unchanged, it holds
no excluding word, and *Not* stays `none`. No use moves (uses as listed in
`24-return-step-report.md`), so nothing follows from the entry (step 4.4).

Meaning in Polish: W MVP wygasłe ognisko to ognisko stojące na kafelku bez minut palenia,
czy się wypaliło, czy jeszcze nie było zapalone.

Minor findings M-1 to M-3 are not fixed, as instructed.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the commit's change) | 0 (0 errors) |

Not run: the full `npm test`. The fix changes one glossary sentence, and no test reads it.
