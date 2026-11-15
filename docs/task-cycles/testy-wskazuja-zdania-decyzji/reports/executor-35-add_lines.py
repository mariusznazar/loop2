"""Insert lines `decision:` at the test cases of slice 35, after any leading lines `decision:`.

Each entry names a file, the line of its `test(` call at the slice's base and the sentences the case
holds. The script checks that the line is a `test(` call, reads the quotations from the log so that
each stands in its decision's binding sentences, and writes the files with their line endings kept.
"""

import re
import sys

ROOT = ""

Q = {
    ("D-311", 1): "The screen of a map run has two columns under one header",
    ("D-311", 2): "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row",
    ("D-311", 3): "The header holds the character's name, the map's name, the clock",
    ("D-311", 4): "After a character's death or a completion that window (D-368) stands over this screen",
    ("D-311", 5): "It opens of itself at the end of the map run once the scene's effect of the death or the completion has played",
    ("D-324", 1): "While the question „Zapisać, odrzucić, wrócić?” of D-173 stands, the map run is paused as „Pauza” pauses it",
    ("D-324", 2): "The rest of the screen works as usual",
    ("D-324", 3): "Leaving the screen of the map run closes the question as „Wróć” does",
    ("D-368", 1): "When a manual map run ends in a character's death or a completion, the end-of-run window opens of itself over the screen of the map run",
    ("D-368", 2): "Each section of why stands only where it has content",
    ("D-368", 3): "The window scrolls in itself while its buttons",
    ("D-369", 1): "A manual map run keeps, in the map run of the game state and so in the saved game state",
    ("D-369", 2): "The record begins at the start of the map run and again at „Restart”",
    ("D-370", 1): "While the end-of-run window (D-368) stands, the header and the three areas of the screen of a map run are not shown",
    ("D-370", 2): "The window takes the focus when it opens",
    ("D-371", 1): "Whether the end-of-run window (D-368) is open is a memory of the page",
    ("D-371", 2): "„Koniec przejścia” stands in the header before „Restart”",
}

S = lambda d, n: (d, n)

SPEC = {
    "tests/view/run-screen.test.mjs": {
        222: [S("D-311", 1), S("D-311", 3)],
        361: [S("D-311", 1)],
        427: [S("D-311", 1)],
        844: [S("D-311", 4), S("D-368", 1), S("D-370", 1)],
        866: [S("D-370", 1)],
        891: [S("D-311", 4), S("D-368", 3), S("D-370", 2)],
        909: [S("D-368", 3)],
        961: [S("D-368", 2)],
        995: [S("D-370", 1)],
    },
    "tests/view/run-screen-state.test.mjs": {
        65: [S("D-311", 4), S("D-368", 3), S("D-371", 1)],
        89: [S("D-311", 5), S("D-368", 1), S("D-371", 1)],
        101: [S("D-311", 5)],
        123: [S("D-311", 5), S("D-371", 1)],
        134: [S("D-311", 4), S("D-371", 1)],
        148: [S("D-324", 1)],
        167: [S("D-324", 2)],
        178: [S("D-324", 2)],
        248: [S("D-370", 2)],
    },
    "tests/view/end-window-game.test.mjs": {
        408: [S("D-311", 4), S("D-311", 5), S("D-368", 1), S("D-370", 1), S("D-371", 2)],
        443: [S("D-311", 4), S("D-368", 1), S("D-368", 3)],
        464: [S("D-311", 5)],
        498: [S("D-311", 5)],
        515: [S("D-371", 2)],
        533: [S("D-311", 5)],
        566: [S("D-311", 4), S("D-368", 3), S("D-371", 1)],
        593: [S("D-311", 5), S("D-368", 3), S("D-371", 1)],
        622: [S("D-370", 1), S("D-370", 2)],
        668: [S("D-368", 2)],
        706: [S("D-311", 3), S("D-311", 4), S("D-368", 3), S("D-370", 2), S("D-371", 1), S("D-371", 2)],
        736: [S("D-311", 3), S("D-371", 2)],
        748: [S("D-324", 2)],
        834: [S("D-311", 4), S("D-371", 1), S("D-371", 2)],
        927: [S("D-371", 1)],
        1019: [S("D-368", 3), S("D-371", 1)],
        1047: [S("D-368", 1), S("D-369", 1)],
    },
    "tests/view/end-window.test.mjs": {
        168: [S("D-368", 1), S("D-370", 2)],
        229: [S("D-311", 4), S("D-368", 1)],
        372: [S("D-368", 2)],
        450: [S("D-368", 2)],
        492: [S("D-368", 2)],
        538: [S("D-368", 2)],
        560: [S("D-368", 3), S("D-370", 1)],
        604: [S("D-368", 3)],
        642: [S("D-368", 3)],
        666: [S("D-368", 3), S("D-370", 2)],
        692: [S("D-370", 2)],
    },
    "tests/view/end-window-lines.test.mjs": {
        71: [S("D-368", 1)],
        105: [S("D-368", 1)],
        232: [S("D-368", 1)],
        267: [S("D-368", 2)],
        289: [S("D-368", 2)],
        360: [S("D-368", 2)],
        392: [S("D-368", 3)],
    },
    "tests/view/run-header.test.mjs": {
        110: [S("D-311", 3)],
        159: [S("D-311", 3)],
        248: [S("D-311", 3)],
        270: [S("D-311", 3)],
        293: [S("D-311", 3), S("D-371", 2)],
        329: [S("D-311", 4), S("D-368", 1), S("D-370", 1)],
        353: [S("D-311", 3)],
    },
    "tests/view/tabs-area.test.mjs": {144: [S("D-311", 1)]},
    "tests/view/chronicle-game.test.mjs": {228: [S("D-311", 1)]},
    "tests/view/world-area.test.mjs": {202: [S("D-311", 2), S("D-311", 4)]},
    "tests/view/trip.test.mjs": {389: [S("D-311", 4)]},
    "tests/view/rule-editor.test.mjs": {1673: [S("D-311", 1)], 1695: [S("D-311", 1)]},
    "tests/view/chronicle.test.mjs": {715: [S("D-368", 2)], 744: [S("D-368", 2)]},
    "tests/view/end-question.test.mjs": {
        344: [S("D-324", 1), S("D-311", 4), S("D-371", 1)],
        558: [S("D-324", 1)],
        608: [S("D-324", 3)],
        632: [S("D-324", 3)],
        655: [S("D-324", 2)],
        708: [S("D-324", 2)],
        783: [S("D-324", 2)],
        875: [S("D-324", 2)],
    },
    "tests/sim/run-record.test.mjs": {
        81: [S("D-369", 1), S("D-369", 2)],
        100: [S("D-369", 1)],
        111: [S("D-369", 1)],
        127: [S("D-369", 1)],
        157: [S("D-369", 1)],
        179: [S("D-369", 1)],
        218: [S("D-369", 1)],
        253: [S("D-369", 1)],
        274: [S("D-369", 1)],
        283: [S("D-369", 1)],
        303: [S("D-369", 1)],
        316: [S("D-369", 1)],
        331: [S("D-369", 1)],
        344: [S("D-369", 2)],
        372: [S("D-369", 1)],
    },
    "tests/sim/saved-game.test.mjs": {
        2214: [S("D-369", 1), S("D-369", 2)],
        2232: [S("D-369", 1)],
        2259: [S("D-369", 2)],
    },
}


def binding_texts():
    """The binding sentences of each decision of the slice, every run of white space one space."""
    with open(ROOT + "foundations/decisions.md", encoding="utf-8", newline="") as handle:
        text = handle.read()
    found = {}
    for number in {d for d, _ in Q}:
        match = re.search(r"^### %s — .*?\n\n(.*?)\n\n- \*\*Scope" % number, text, re.S | re.M)
        found[number] = " ".join(match.group(1).split())
    return found


def main():
    texts = binding_texts()
    for (number, _), quote in Q.items():
        body = texts[number]
        at = body.find(quote)
        if at < 0 or (at > 0 and body[at - 2:at] != ". "):
            print("BAD QUOTE", number)
            return 1
    added = 0
    for path, cases in SPEC.items():
        with open(ROOT + path, encoding="utf-8", newline="") as handle:
            lines = handle.read().split("\n")
        for start in sorted(cases, reverse=True):
            index = start - 1
            if not lines[index].startswith("test("):
                print("NOT A TEST", path, start)
                return 1
            place = index + 1
            while lines[place].lstrip().startswith("// decision:"):
                place += 1
            new = ['  // decision: %s "%s"' % (number, Q[(number, n)])
                   for number, n in cases[start]]
            for line in new:
                if line in lines[index + 1:place]:
                    print("ALREADY", path, start)
                    return 1
            lines[place:place] = new
            added += len(new)
        with open(ROOT + path, "w", encoding="utf-8", newline="") as handle:
            handle.write("\n".join(lines))
    print("added", added)
    return 0


if __name__ == "__main__":
    sys.exit(main())
