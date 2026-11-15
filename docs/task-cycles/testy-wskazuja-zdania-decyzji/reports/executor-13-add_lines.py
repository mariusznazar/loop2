"""Adds the lines `decision:` of slice 13 at the tests that hold the sentences.

Run from the worktree root: python -B .runs/executor-13/add_lines.py [--apply]
Without --apply it writes the plan to .runs/executor-13/plan-out.txt and changes nothing.
"""

import re
import sys

DECISIONS = ["D-96", "D-157", "D-224", "D-225", "D-259", "D-260", "D-261", "D-262", "D-352", "D-381"]
OUT = ".runs/executor-13/plan-out.txt"


def binding_sentences():
    text = open("foundations/decisions.md", encoding="utf-8", newline="").read()
    result = {}
    for number in DECISIONS:
        match = re.search(r"^### " + re.escape(number) + r" — .*?\n(.*?)\n- \*\*Scope", text, re.S | re.M)
        body = " ".join(match.group(1).split())
        parts = body.split(". ")
        sentences = [part + "." for part in parts[:-1]] + [parts[-1]]
        result[number] = sentences
    return result


# (file, unique part of the test's name, [(decision, start of the sentence)])
S = {
    "96.1": ("D-96", "A signed-out visitor"),
    "96.2": ("D-96", "Anyone can create"),
    "96.3a": ("D-96", "The browser constructs"),
    "96.3b": ("D-96", "Spróbuj ponownie.” in `warning`; a saved game state"),
    "96.3c": ("D-96", "Zaczynasz od nowa.” for the first two"),
    "96.3d": ("D-96", "Zaczynasz od nowa.” for the last"),
    "157.1": ("D-157", "A signed-in player whose"),
    "157.2": ("D-157", "Only a signed-in player"),
    "157.3": ("D-157", "Right after registration"),
    "157.3b": ("D-157", "Spróbuj ponownie za godzinę"),
    "157.3c": ("D-157", "Spróbuj ponownie później"),
    "224.1": ("D-224", "The link of a password-reset"),
    "224.2": ("D-224", "The game page reads"),
    "225.1": ("D-225", "The form „Ustaw nowe hasło” holds"),
    "225.2": ("D-225", "After the password is set"),
    "225.2b": ("D-225", "Zaloguj się nowym hasłem.” stands"),
    "225.3": ("D-225", "No connection or a full"),
    "259.1": ("D-259", "The login card opens"),
    "259.2": ("D-259", "The switch stands only"),
    "260.1": ("D-260", "A change of state at the switch"),
    "261.1": ("D-261", "The one sentence of the page"),
    "261.2": ("D-261", "It stays while the card"),
    "262.1": ("D-262", "Nothing stands on the screen"),
    "262.2": ("D-262", "The waiting screens"),
    "262.3": ("D-262", "When React takes the card down"),
    "352.1": ("D-352", "When the fragment of an emailed link"),
    "381.1": ("D-381", "The page opens the login card"),
    "381.2": ("D-381", "The card takes no focus"),
    "381.3": ("D-381", "While a form waits"),
}

AS = "tests/view/account-screen.test.mjs"
PLAN = [
    (AS, "until the server names an account the page has neither", ["96.3a"]),
    (AS, "an answer of no session shows the card on", ["259.1", "96.1"]),
    (AS, "an answer that names no account and is not a refusal of the session", ["96.3a"]),
    (AS, "a sent login waits with the whole card locked, and a refusal leaves one warning under it and focus", ["381.3"]),
    (AS, "a lost connection on registration leaves one warning under that form and focus on its button", ["381.3"]),
    (AS, "a created account enters the game at once, and the page keeps no password", ["381.1"]),
    (AS, "the button under „Zaloguj się” puts in its place one form", ["96.1", "260.1"]),
    (AS, "a request waits with its field and every button of the screen locked", ["381.3"]),
    (AS, "while a login waits, the button „Nie pamiętam hasła” is locked", ["381.3"]),
    (AS, "a well-formed address gets the one sentence of the reset under the form in a status, with the field empty and the form and", ["381.3"]),
    (AS, "a refusal or a lost connection on a request stands as the form's warning", ["381.3"]),
    (AS, "„Wróć do logowania” brings back „Zaloguj się”, and nothing typed", ["96.1", "260.1"]),
    (AS, "a confirmed logout or an expired session removes the game and its clock and brings back the card", ["381.1", "381.2", "259.1"]),
    (AS, "a reload or sign-in with an unconfirmed address shows the sentence", ["157.1"]),
    (AS, "a confirmed address shows no sentence and no Wyślij ponownie", ["157.1"]),
    (AS, "a created account starts the sentence of its menu with the outcome", ["157.3", "157.3b", "157.3c"]),
    (AS, "Wyślij ponownie sends one request for the signed-in account", ["157.3", "157.3b"]),
    (AS, "the result stands as one sentence above the game for a signed-in player", ["259.1", "261.2"]),
    (AS, "a refused link stands in warning above the form in the card", ["259.1", "261.1"]),
    (AS, "with a reset token in the address the page shows the form at once", ["96.1", "224.2", "225.1"]),
    (AS, "a sent form waits with its fields and „Anuluj” locked", ["224.2", "381.3"]),
    (AS, "a change clears the fragment first, then shows a new card", ["225.2", "225.2b", "259.1", "261.1", "381.2"]),
    (AS, "a refused link, whatever its reason, clears the fragment first and then checks the session", ["225.2b", "259.1", "261.1"]),
    (AS, "„Anuluj” clears the fragment first and opens the page as usual", ["225.1", "259.1"]),
    (AS, "a failure that is no change and no refused link keeps the form, the fragment and the link", ["225.3", "381.3"]),
    (AS, "a 401 on a save keeps the state, and a sign-in to the same account", ["259.1"]),
    (AS, "an error of the code in the load of a downloaded save keeps the save", ["96.3a", "96.3b"]),
    (AS, "an error of the code in the load of the kept state keeps it for the retry", ["96.3a", "96.3b"]),
    (AS, "after the session check the page keeps „Sprawdzanie logowania…”", ["96.3a"]),
    (AS, "a save builds the game the load gives", ["96.2"]),
    (AS, "a failed or uncertain answer for the saved game state shows the warning with retry", ["96.3a", "259.1"]),
    (AS, "a refused save starts a new game with its one-time sentence above it", ["96.3b", "96.3c", "96.3d"]),
    (AS, "„Wyloguj” saves first and goes on, stays or ends", ["259.1"]),
    (AS, "a tab that stopped saving as outdated logs out without a save", ["259.1", "261.1"]),
    (AS, "the first screen of each entry", ["96.2"]),
    (AS, "a reload at #/postac/1 while the save holds a map run", ["96.2"]),
    (AS, "a reload at each of the seven addresses opens its screen", ["96.2"]),
    (AS, "a reload at #/mapy/forest stays on Mapy with Las picked", ["96.2"]),
    (AS, "after an emailed link — a confirmation", ["96.2", "225.1", "225.2b"]),
    (AS, "the page's sentence above the first screen leaves at the first change of screen", ["96.3b"]),
    (AS, "a fragment of an emailed link that appears in the address of an open game reloads the page", ["352.1"]),
    (AS, "any other change of the address of an open game goes on as before", ["352.1"]),
    (AS, "the card stands alone in the page's body", ["262.1", "262.2"]),
    (AS, "the card of a reset link stands alone at once", ["262.1", "262.2", "381.2"]),
    (AS, "an error of the code in the load of the kept state closes the card", ["96.3a", "262.2", "381.2"]),
    (AS, "a sign-in that goes straight back to the kept game closes the card", ["381.2"]),
    (AS, "a card opened by the session check or by an expired save takes no focus", ["381.2"]),
    (AS, "the page's sentence stays in the card through a press of the switch", ["260.1", "261.1", "261.2"]),
    (AS, "the card opens on „Zaloguj się” with the name, the sentence", ["96.1", "259.1", "259.2"]),
    (AS, "„Załóż konto” shows address, password and repeated password", ["96.1", "259.2"]),
    (AS, "„Nie pamiętam hasła” shows its heading and an empty address", ["96.1", "259.2", "260.1"]),
    (AS, "a card opened with a reset link shows „Ustaw nowe hasło” with its heading", ["224.2", "225.1", "259.2"]),
    (AS, "every field keeps its label, hint and autocomplete token", ["96.1", "225.1"]),
    (AS, "a press of the switch empties every field", ["260.1"]),
    (AS, "a press of the state already shown clears nothing", ["381.3"]),
    (AS, "the page's sentence stands in the card above the switch, or above the form", ["260.1", "261.1", "261.2"]),
    (AS, "the folded credits stand last in all four states", ["96.1", "381.3"]),
    (AS, "the card stands in its element when createAccountCard returns", ["381.1"]),
    (AS, "the card takes no focus when it opens, and focus() moves it", ["381.1", "381.2"]),
    (AS, "dispose() takes the element out with what it holds", ["381.1"]),
    (AS, "signedIn and finished may dispose the card", ["381.2"]),
    (AS, "a sent login locks the whole card, and a refusal leaves one warning under the form", ["381.3"]),
    (AS, "two sends and a switch before the lock is drawn", ["381.3"]),
    (AS, "a sign-in and a registration hand the account on", ["381.3"]),
    (AS, "a lost connection on a registration leaves one warning, removed by the next send", ["381.3"]),
    (AS, "a request checks its address first and waits with its field and every button locked", ["381.3"]),
    (AS, "a well-formed address gets the one sentence under the form in a status, with the field empty and focus back", ["381.3"]),
    (AS, "a refusal or a lost connection on a request stands as the warning, keeps the address and returns focus", ["381.3"]),
    (AS, "nothing typed and no sentence survives leaving „Nie pamiętam hasła”", ["260.1"]),
    (AS, "a sent „Ustaw nowe hasło” waits with the whole card locked", ["224.2", "381.3"]),
    (AS, "a change and a refused link, whatever its reason, clear the fragment first", ["225.2b"]),
    (AS, "„Anuluj” clears the fragment first and ends the form", ["225.1"]),
    (AS, "a failure that is no change and no refused link keeps the form and the link, with the sentence under the form and focus back", ["225.3", "381.3"]),
    ("tests/view/password-reset.test.mjs", "the fragment's token is read as it stands", ["224.2"]),
    ("tests/view/password-reset.test.mjs", "only a success is a change and only the code invalid-link", ["225.2b", "225.3"]),
    ("tests/view/email-status.test.mjs", "each outcome of a confirmation message has its sentence and role", ["157.3", "157.3b", "157.3c"]),
    ("tests/view/email-status.test.mjs", "a sent message names the address of the account it went to", ["157.3"]),
    ("tests/view/email-status.test.mjs", "an unconfirmed address with no send made in the page", ["157.1"]),
    ("tests/view/menu-bar.test.mjs", "an unconfirmed address shows its sentence in text-secondary", ["157.1"]),
    ("tests/view/menu-bar.test.mjs", "right after registration the sentence is the outcome", ["157.3", "157.3b", "157.3c"]),
    ("tests/view/menu-bar.test.mjs", "a send waits with the button disabled as Wysyłanie…", ["157.3", "157.3b", "157.3c"]),
    ("tests/view/menu-bar.test.mjs", "the menu stays open after the answer to „Wyślij ponownie”", ["157.3", "157.3b", "157.3c"]),
    ("tests/view/menu-bar.test.mjs", "a failure of the client stands in warning with its own sentence", ["157.3", "157.3c"]),
    ("tests/view/menu-bar.test.mjs", "a refusal other than an address already confirmed is a failure too", ["157.3", "157.3c"]),
    ("tests/view/menu-bar.test.mjs", "the server's answer that the address is already confirmed removes", ["157.1"]),
    ("tests/view/menu-bar.test.mjs", "the page's account turning confirmed removes the sentence", ["157.1"]),
    ("tests/view/menu-bar.test.mjs", "an answer that comes while the menu is closed is there", ["157.3", "157.3b"]),
    ("tests/http.test.mjs", "only a valid session of an unblocked account asks for a message", ["157.2"]),
    ("tests/http.test.mjs", "a recorded reset link lives one hour", ["224.1"]),
    ("tests/account-api.test.mjs", "each call sends its documented method, relative path and JSON body", ["224.2"]),
    ("tests/view/uncaught-failure.test.mjs", "a failure the game foresees keeps its own sentence alone", ["96.3a", "96.3b"]),
    ("tests/view/uncaught-failure.test.mjs", "a card that React takes down after an error is replaced", ["262.3"]),
    ("tests/view/uncaught-failure.test.mjs", "a card taken down on the page leaves the sentence alone", ["262.3"]),
    ("tests/view/end-window-game.test.mjs", "a game built on an ended map run opens the window", ["96.2"]),
]


def sentence(sentences, number, start):
    found = [s for s in sentences[number] if s.startswith(start)]
    assert len(found) == 1, (number, start, len(found))
    quote = found[0]
    assert '"' not in quote and len(quote.split()) >= 3, (number, start)
    return quote


def main(apply):
    sentences = binding_sentences()
    report = []
    for number in DECISIONS:
        for index, text in enumerate(sentences[number]):
            report.append(f"{number} [{index}] {text}")
    report.append("")
    by_file = {}
    for path, name, keys in PLAN:
        by_file.setdefault(path, []).append((name, keys))
    total = 0
    for path, cases in by_file.items():
        lines = open(path, encoding="utf-8", newline="").read().split("\n")
        inserts = []
        for name, keys in cases:
            starts = [i for i, line in enumerate(lines) if line.lstrip().startswith(("test(", '"')) and name in line]
            assert len(starts) == 1, (path, name, starts)
            start = starts[0]
            if not lines[start].lstrip().startswith("test("):
                assert lines[start - 1].strip() == "test(", (path, name)
            body = start
            while not lines[body].rstrip().endswith("{"):
                body += 1
            at = body + 1
            while lines[at].strip().startswith(("// invariant:", "// decision:")):
                at += 1
            indent = lines[at][: len(lines[at]) - len(lines[at].lstrip())]
            new = []
            for key in keys:
                number, begin = S[key]
                text = f'{indent}// decision: {number} "{sentence(sentences, number, begin)}"'
                if text.strip() in (line.strip() for line in lines[body + 1 : at]):
                    raise SystemExit(f"already there: {path} {name} {key}")
                new.append(text)
            inserts.append((at, new, name))
            report.append(f"{path}:{start + 1} at {at + 1}: {name} -> {', '.join(keys)}")
            total += len(new)
        for at, new, _ in sorted(inserts, key=lambda item: item[0], reverse=True):
            lines[at:at] = new
        if apply:
            with open(path, "w", encoding="utf-8", newline="") as handle:
                handle.write("\n".join(lines))
    report.append(f"lines: {total}")
    with open(OUT, "w", encoding="utf-8", newline="\n") as handle:
        handle.write("\n".join(report) + "\n")
    print("lines", total, "applied" if apply else "dry run")


if __name__ == "__main__":
    main("--apply" in sys.argv[1:])
