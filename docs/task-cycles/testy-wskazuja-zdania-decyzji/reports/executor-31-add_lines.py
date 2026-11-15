"""Insert lines `decision:` at the test cases of slice 31; prints ASCII counts only."""

import sys

ROOT = ""

Q = {
    "07a": ("D-07", "The server holds the players' accounts and each player's saved game state, and computes nothing of the game"),
    "07b": ("D-07", "The browser computes the whole game — the map runs, the earning loops and the catch-up — and sends the saved game state to the server"),
    "55": ("D-55", "The game holds one manual map run at a time: while one character is in a manual map run, the game sends no other on a manual map run"),
    "206a": ("D-206", "A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one"),
    "206b": ("D-206", "The game discards a saved game state of any other version, loading none of it as a game, and starts the player anew"),
    "206b+": ("D-206", "The game discards a saved game state of any other version, loading none of it as a game, and starts the player anew; the server keeps the document that a save of a higher version replaces as the previous save (D-399), and an account with the previous-save privilege (D-400) can append its programs one by one (D-401)"),
    "206c": ("D-206", "A saved game state whose character names an archetype missing from the data is also discarded whole"),
    "212go": ("D-212", "A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”"),
    "212end": ("D-212", "A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and with the end-of-run window (D-368) open again, holding all it held but „Ostatnie minuty”, which stand only where the chronicle holds the entries (D-339)"),
    "212all": ("D-212", "A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and with the end-of-run window (D-368) open again, holding all it held but „Ostatnie minuty”, which stand only where the chronicle holds the entries (D-339), and the screen the page opens on is the one D-96 gives"),
    "212b": ("D-212", "No time that passed between the save and the load advances it, the computing of time away included"),
    "213b": ("D-213", "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"),
    "213c": ("D-213", "An error of its own code is no refusal: it leaves the load as a thrown error, which the browser view writes to the console without its text, and the saved game state on the server and the unsaved game state in the page's memory stay as they stand, while the player gets the sentence of D-96"),
    "386a": ("D-386", "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"),
    "386b": ("D-386", "A moment of real time that the game state stores, the save time and the moment the account's resurrection is ready, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"),
}

# (file, a substring of the test's name, unique in the file, [keys])
SPEC = [
    ("tests/sim/saved-game.test.mjs", "a document of the current version loads into the state it describes", ["206a", "213b"]),
    ("tests/sim/saved-game.test.mjs", "the server's save of the current version loads into the game it holds", ["206a", "213b"]),
    ("tests/sim/saved-game.test.mjs", "a map run that goes on comes back paused, at its game minute", ["212go"]),
    ("tests/sim/saved-game.test.mjs", "a map run that ended comes back as it ended", ["212end"]),
    ("tests/sim/saved-game.test.mjs", "the load changes nothing passed to it, and the state it gives shares nothing", ["213b"]),
    ("tests/sim/saved-game.test.mjs", "the team's moment of readiness below zero loads", ["386b"]),
    ("tests/sim/saved-game.test.mjs", "a document of another version is refused as version, whatever its game holds", ["213b"]),
    ("tests/sim/saved-game.test.mjs", "a document whose character's archetype the data lacks is refused as archetype", ["206c", "213b"]),
    ("tests/sim/saved-game.test.mjs", "a value that is no object with a whole version is refused as shape", ["213b"]),
    ("tests/sim/saved-game.test.mjs", "a crafted document of the current version is refused whole as shape", ["213b"]),
    ("tests/sim/saved-game.test.mjs", "the record loads back whole from a map run that goes on, one that died", ["212end"]),
    ("tests/sim/saved-game.test.mjs", "no value a document can hold, at any place of it, throws out of the load", ["213b"]),
    ("tests/sim/saved-game.test.mjs", "an error of the code in the load is no refusal", ["213c"]),
    ("tests/sim/saved-game.test.mjs", "a document at the edges of what the earning loops, the report and the save time admit loads", ["386a", "386b"]),
    ("tests/sim/saved-game.test.mjs", "a moment that is no safe integer gives no save time", ["386b"]),
    ("tests/sim/saved-game.test.mjs", "a state stamped by a clock set before 1970 loads back", ["386a", "386b"]),
    ("tests/sim/saved-game.test.mjs", "the saved document of a state is the current version beside a copy of the state", ["206a", "213b"]),
    ("tests/sim/saved-game.test.mjs", "a game state the simulation made loads back from its saved document", ["212go", "386a"]),
    ("tests/sim/saved-game.test.mjs", "the largest trip count the game accepts loads back", ["386a"]),
    ("tests/sim/previous-programs.test.mjs", "a document of each version from 1 to 7, the current one included", ["206b+"]),
    ("tests/sim/catch-up.test.mjs", "the catch-up and the open game read neither the manual map run nor the pause", ["212b"]),
    ("tests/sim/catch-up.test.mjs", "each character's line holds its own change of the chest with no zero kept", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a covered death in the catch-up gives the loop its next map run", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a loop that stops in the catch-up writes its line with the minutes it worked", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a loop that stops in the first minute of the catch-up opens the report", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a further return adds to the line of a loop still going", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a later loop of a character whose line stopped opens a line of its own", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a loop that stops in the open game writes a line of 0 minutes", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a loop that stops in the open game closes the line of an earlier return", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a stop in the catch-up closes the line of an earlier return with the minutes added", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "with one resurrection for two deaths the catch-up gives it to the character earlier", ["386a"]),
    ("tests/sim/catch-up.test.mjs", "a loop of a character with no practice dies on and on with no loss", ["386a"]),
    ("tests/sim/death.test.mjs", "a resurrection used up is ready again at its moment after a save and a load", ["386a"]),
    ("tests/sim/death.test.mjs", "a moment below zero settles as any other", ["386b"]),
    ("tests/sim/death.test.mjs", "a settled death saved and loaded on its screen is left as it stood", ["386a"]),
    ("tests/sim/death.test.mjs", "with nothing to settle the very state comes back, whatever the moment", ["386b"]),
    ("tests/sim/death.test.mjs", "a moment that is no safe integer is refused at a death to settle", ["386b"]),
    ("tests/sim/completion.test.mjs", "a completion to settle takes a safe integer moment", ["386b"]),
    ("tests/sim/completion.test.mjs", "a first completion at a moment below zero makes the used-up resurrection ready", ["386b"]),
    ("tests/sim/loop.test.mjs", "a death is settled once: the state the end leaves holds no end", ["386a"]),
    ("tests/sim/loop.test.mjs", "taking an end reads the moment only when there is an end to settle", ["386b"]),
    ("tests/sim/loop.test.mjs", "every state a loop makes over a whole map run, an end and the next map run loads back", ["386a"]),
    ("tests/sim/loop.test.mjs", "the states of a loop through a death, its settling and the next map run", ["386a"]),
    ("tests/sim/loop.test.mjs", "a loop beside a manual map run of another character loads back", ["386a"]),
    ("tests/sim/program-list.test.mjs", "the game state after an append is saved and loaded again whole", ["386a"]),
    ("tests/sim/discovery.test.mjs", "a saved document of the paused state, loaded again, gives the same name", ["386a"]),
    ("tests/sim/flow.test.mjs", "a send while a map run exists is refused", ["55"]),
    ("tests/view/maps-screen.test.mjs", "a manual map run going on, waiting and ended keeps „Wejdź” inactive", ["55"]),
    ("tests/view/account-screen.test.mjs", "after the end of a map run every character's „Wejdź” is inactive under the sentence why", ["55"]),
    ("tests/view/account-screen.test.mjs", "a 401 on a save keeps the state, and a sign-in to the same account sends it", ["212go"]),
    ("tests/view/account-screen.test.mjs", "an error of the code in the load of a downloaded save keeps the save", ["213c"]),
    ("tests/view/account-screen.test.mjs", "an error of the code in the load of the kept state keeps it for the retry", ["213c"]),
    ("tests/view/account-screen.test.mjs", "a save builds the game the load gives: a map run that went on comes back paused", ["212end"]),
    ("tests/view/account-screen.test.mjs", "a loaded game catches its loop up once, and a catch-up that ended a map run", ["07b"]),
    ("tests/view/account-screen.test.mjs", "a refused save starts a new game with its one-time sentence above it", ["206b", "206c"]),
    ("tests/view/account-screen.test.mjs", "a conflict drops the game, asks for the server's save and builds from it", ["212go", "206b"]),
    ("tests/view/account-screen.test.mjs", "the first screen of each entry: the sign-in form and a reload with no fragment", ["212all"]),
    ("tests/view/account-screen.test.mjs", "a reload at #/postac/1 while the save holds a map run opens the screen Postać", ["212all"]),
    ("tests/view/account-screen.test.mjs", "a reload at each of the seven addresses opens its screen", ["212all"]),
    ("tests/view/end-window-game.test.mjs", "a game built on an ended map run opens the window", ["212end"]),
    ("tests/view/end-window-game.test.mjs", "„Ostatnie minuty” are the last entries of the chronicle up to the entry of the death", ["212end"]),
    ("tests/view/end-window-game.test.mjs", "the window stands in no game state and no saved document", ["212end"]),
    ("tests/view/end-window-game.test.mjs", "a reload of the screen of an ended map run opens the window with its longest streak", ["212end"]),
    ("tests/view/end-window-game.test.mjs", "a reload of the screen of an ended map run holds the line of a death with no practice", ["212end"]),
    ("tests/view/end-question.test.mjs", "the question lives in the page alone: a game built from the kept document", ["212go"]),
    ("tests/view/uncaught-failure.test.mjs", "a failure the game foresees keeps its own sentence alone", ["213c"]),
    ("tests/view/previous-save.test.mjs", "a pull fetches the previous save again and appends its programs in order", ["206b+"]),
    ("tests/view/previous-save.test.mjs", "skipped programs stand in one sentence by their names, and the others are appended", ["206b+"]),
    ("tests/account-api.test.mjs", "loadSavedGame sends a bodiless GET on the relative saved-game path", ["07b"]),
    ("tests/http.test.mjs", "each account's session reads and replaces only its own saved game state", ["07a"]),
    ("tests/http.test.mjs", "the save routes answer null with no save, count revisions from 1", ["07a"]),
    ("tests/http.test.mjs", "a privileged account reads null, then the document of its slot; a save of a higher version fills it", ["206b+"]),
    ("tests/account-storage.test.mjs", "a save of a higher version moves the stored save into the previous slot", ["206b+"]),
]


def insert(path, name, keys, dry):
    with open(ROOT + path, encoding="utf-8", newline="") as handle:
        lines = handle.read().split("\n")
    starts = [i for i, line in enumerate(lines) if name in line]
    if len(starts) != 1:
        return f"FAIL {path}: {len(starts)} lines hold the name {name[:40]!r}"
    i = starts[0]
    while not (lines[i].rstrip().endswith("{") and "=>" in lines[i]):
        i += 1
    j = i + 1
    while lines[j].strip().startswith(("// decision:", "// invariant:")):
        j += 1
    body = next(line for line in lines[i + 1:] if line.strip())
    indent = body[: len(body) - len(body.lstrip())]
    standing = [line.strip() for line in lines[i + 1:j]]
    new = []
    for key in keys:
        number, quote = Q[key]
        text = f'// decision: {number} "{quote}"'
        if text in standing:
            return f"FAIL {path}: line already stands for {key}"
        new.append(indent + text)
    lines[j:j] = new
    if not dry:
        with open(ROOT + path, "w", encoding="utf-8", newline="") as handle:
            handle.write("\n".join(lines))
    return f"ok {path} +{len(new)} at {j + 1}"


def main():
    dry = "--apply" not in sys.argv
    out = [insert(path, name, keys, dry) for path, name, keys in SPEC]
    with open(ROOT + ".runs/executor-31/add_lines.log", "w", encoding="utf-8") as handle:
        handle.write("\n".join(out) + "\n")
    fails = [line for line in out if line.startswith("FAIL")]
    print(f"cases {len(out)} fails {len(fails)} lines {sum(len(k) for _, _, k in SPEC)} dry {dry}")


main()
