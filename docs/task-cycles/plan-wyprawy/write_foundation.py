from pathlib import Path
import re

root = Path.cwd()
path = root / "foundations/decisions.md"
text = path.read_text(encoding="utf-8")

def change(number, old, new):
    global text
    pattern = rf"(?ms)^### D-{number} —.*?(?=^### |\Z)"
    found = re.search(pattern, text)
    assert found and old in found.group(), number
    updated = found.group().replace(old, new, 1)
    text = text[:found.start()] + updated + text[found.end():]

change(50, "The chest belongs to a team. Each character belongs to exactly one team, and a character has no\nchest of its own.", "The chest belongs to a team and has a cap on the total count of pieces, by the same rule of capacity as the backpack. Each character belongs to exactly one team and uses its chest, and a character has no chest of its own.")
change(50, "invariants: character-team.", "invariants: character-team · trip-transfer.")
change(50, "a character outside every team", "a character outside every team; a chest capped per kind of item")
change(90, "A program is an ordered list of rule groups", "A program holds an ordered list of rule groups")
change(131, "an edit after which the copy differs from the copy before it", "an edit after which the copy's rules or rule groups differ from those before it")
change(131, "act of the program editor after which the copy is the same as before it, a save of the copy and an edit of a saved program", "act of the program editor after which the copy is the same as before it, an edit or discard changing the trip plan alone, a save of the copy and an edit of a saved program")
change(131, "invariants: streak-program-change · saved-program-edit · copy-save.", "invariants: streak-program-change · saved-program-edit · copy-save · trip-plan-progress.")
change(131, "so a program that differs starts the streak again", "so changed rules or rule groups start the streak again")
change(136, "program, sets it to zero, on every map.", "program, sets it to zero, on every map, while a change of the trip plan alone leaves it.")
change(136, "invariants: streak-program-change.", "invariants: streak-program-change · trip-plan-progress.")
change(136, "so a change of the program starts the streak again", "so a change of the program's rules or rule groups starts the streak again")

origin = 'plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, '
definition = 'definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, '

def decision(number, question, binding, scope, relations, verification, source, rationale, rejected):
    global text
    assert f"### D-{number} —" not in text
    text = text.rstrip() + f'''\n\n### D-{number} — {question}

{binding}

- **Scope:** {scope}
- **Based on:** none
- **Relations:** {relations}
- **Verification:** {verification}
- **Origin:** {source}

*Rationale:* {rationale}
*Rejected:* {rejected}
'''

decision(179, "How do items go into a map run and out of it?",
"The trip plan is a field of the program, both its lists are bound at the start of a map run — the list of what comes out as a frozen snapshot — and at a completion only what that list names goes to the chest. Reality cuts the trip plan down and never up: outside a manual map run of a map already solved, what the chest lacks does not go into the backpack, what the backpack lacks does not come back, and where items compete for one budget — the backpack, the map's cap, the free room in the chest — as many go in from the top of the list as fit. The backpack is the cap on both sides, a map may add a stricter cap of its own down to zero, and a trip plan over the map's cap does not keep the character from entering the map: it goes in cut, and the player is told so beforehand.",
"simulation · browser-view", "derives from D-50 · derives from D-64 · derives from D-164",
"invariants: trip-transfer. An agent compares a change with the decision:\n  - complies: an item added to the trip plan during a map run that comes out only from the next map run; a trip plan over the map's cap entering cut, with a notice shown before the start; a character switched to another program in the middle of a map run bringing out at completion what the trip plan of the program it entered with names\n  - violates: a backpack filled beyond what the chest held; an item lower on the list taking room before one above it; entering refused for a trip plan over the map's cap",
definition + '"How do items go into a map run and out of it?"',
"The frozen snapshot keeps an item added in the last minute from paying out at once, which would get round the streak, since editing the trip plan does not break it.",
"a choice made by a click before each start — the earning loop could not carry it out without the player.")
decision(180, "Where does the player arrange the trip plan?",
"The program panel shows a section „Plan wyprawy” below the rule groups, with the lists „Zabierz” and „Wynieś”. Each position holds an item select list, a number field, „↑”, „↓” and „Usuń”, and „Dodaj przedmiot” stands below each list.",
"browser-view", "derives from D-44 · derives from D-166 · derives from D-173 · derives from D-179", "none", origin+'"Q2"',
"The plan stays with the program the player edits, at the cost of scrolling past a long program.",
"the section above the rule groups; the plan in the headquarters character row — the running copy could not be edited there.")
decision(181, "Which entries does a trip list accept?",
"The game currently accepts an item once on each trip list, and the same item can stand on both lists. A position's count is an integer from 1 up, with its upper range currently left to reality's clipping of the plan; an invalid entry keeps the previous count in the position and stays visible in the field, whose frame and message „Wpisz liczbę całkowitą od 1.” below it take the role `warning` until the player enters a valid count.",
"simulation · browser-view", "derives from D-119 · derives from D-120 · derives from D-179", "none", origin+'"Q3" and "Q11", part a',
"The plan expresses desired quantities and the transfer finds what fits; an invalid draft stays visible beside a count the game still holds.",
"all game items offered from the start — contradicts discovery; restoring the previous count in the field at once — hides the invalid draft the player entered.")
decision(182, "What trip plan does a new program hold?",
"The program of a new game and a newly created program have both trip lists empty.",
"simulation · browser-view", "derives from D-91 · derives from D-167 · derives from D-179", "none", origin+'"Q3"',
"The first plan belongs to the player, and before an item is discovered the chest is empty as well.", "unknown")
decision(183, "What happens to carried items when the player stops a run or completes with items outside its plan?",
"When „Zakończ” or „Restart” ends a map run before completion, its carried items — brought in and gathered — are lost. At completion, the items outside the frozen bring list are lost.",
"simulation", "derives from D-179", "invariants: trip-run-end.", origin+'"Q6"',
"Equipment is spent on an attempt and loot leaves through the plan at completion; stopping the attempt costs its contents.", "unknown")
decision(184, "How does the headquarters show the chest's capacity?",
"The headquarters shows the chest section heading as „Skrzynka {pieces}/{cap}”, such as „Skrzynka 12/60”, and for an empty chest as „Skrzynka 0/60” above „Skrzynka jest pusta.”.",
"browser-view", "derives from D-50", "none", origin+'"Q4", part 2',
"The shared space is visible where the player prepares the next attempt; the heading changes with its contents.", "the cap kept out of the headquarters — its remaining room would be hidden.")
decision(185, "Where does the player read what completion deposited?",
"After completion the line „Do skrzynki: {item} {count}, …” or „Do skrzynki nic nie trafiło.” in `text-secondary` stands below the discovery line and last-encounter paragraph when present and above the body and backpack, directly below the status row when neither is present, until „Restart” or „Zakończ”.",
"browser-view", "derives from D-122 · derives from D-147 · derives from D-179", "none", origin+'"Q8" and "Q12"',
"The transfer remains readable with the final state, even when discovery and a long encounter place it further below the status.",
"placing it above discovery — changes the established order; placing it under the backpack — changes the accepted placement below the status; showing nothing beyond the earlier screen — leaves the transfer unreported.")
decision(186, "What does the running map show of the frozen bring plan?",
"During a map run, below the backpack, „Wyniesie: {item} {count}, …” in `text-secondary` gives what completion in that game minute would put in the chest from the frozen bring list, clipped by the backpack, free chest room and the map's exit cap. The line stands when the snapshot lists something or differs from the copy's bring list, reads „Wyniesie: nic” when that transfer is empty, and disappears after death and completion.",
"browser-view", "derives from D-179", "none", origin+'"Q8", "Q10", part c, and "Q11", parts c–e',
"The player sees which plan applies to this attempt, at the cost of another line recomputed each game minute and a different text role beside the practice record.",
"a completion line alone — the running snapshot stays hidden; a line hidden for an empty snapshot — an item added during the run looks as though it could leave; a line from minute zero for every empty plan — persistent empty information; keeping the preview after the run ends; the role `text`.")
decision(187, "How does a map cap equipment and loot?",
"A map's data can set two independent whole-piece caps from zero up, one for entry and one for exit, each optionally unset. The entry cap clips the trip plan when the character enters and the exit cap at completion; gathering during the run is currently bounded by the character's carrying capacity, which the map cap currently leaves unchanged.",
"simulation", "derives from D-18 · derives from D-64 · derives from D-179", "invariants: trip-transfer.", origin+'"Q1" and "Q10", part a',
"A map can ask for different equipment at entry and loot at exit, while carrying capacity describes the character during the attempt; this keeps two boundaries to check even where current maps leave them unset.",
"one cap for both directions — zero at entry would also prevent loot at exit; giving a current map a cap — adds a balance value beyond the accepted definition; removing caps from the definition — reopens readiness and the plan; leaving the definition intact and omitting the mechanism.")
decision(188, "Where does the player learn that a map cuts the trip plan?",
"In the headquarters, at a character's map, „Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej {n} sztuk.” in `warning` stands when its entry cap is below the smaller of the take list's requested total in that row's chosen program and the character's carrying capacity. The same line stands in the status row beside „Restart” for the current copy and map; when carrying capacity itself clips the plan and the map does not, this line is currently absent.",
"browser-view", "derives from D-170 · derives from D-179 · derives from D-187", "none", origin+'"Q10", part b',
"The player can see the cut before either kind of start, at the cost of keeping the same comparison at two places.", "a warning confined to the headquarters — omits the next restart.")
decision(189, "Which current runs take equipment and pay loot?",
"Earned loot reaches the chest on completion. The game currently takes equipment from the chest at each map run's start and deposits according to its frozen bring list at each completion, including a manual map run of an already solved map.",
"simulation", "derives from D-179", "invariants: trip-transfer · trip-run-end.", definition+'"What pays, and what takes from the chest?" · '+origin+'"Q5", "Q6" and § Settlements to record, row 11',
"The current run lifecycle spends equipment and deposits completed loot alike for solved and unsolved maps; repeated manual completions therefore pay too.", "unknown")
decision(190, "What does a character's death take?",
"A character's death takes what it carried, including pieces taken from the chest, and leaves the chest as it stood.",
"simulation", "derives from D-179", "invariants: trip-run-end.", definition+'"What does a character\'s death take?"',
"Items carried are at risk on the attempt; items left with the team survive it.", "unknown")
path.write_text(text, encoding="utf-8", newline="\n")

path = root / "foundations/glossary.md"
text = path.read_text(encoding="utf-8")
assert "## trip plan" not in text
path.write_text(text.rstrip() + "\n\n## trip plan\n\nA trip plan is two ordered lists with counts: what a character takes into a map run and what it brings out of it.\n\n- **Not:** none\n", encoding="utf-8", newline="\n")

path = root / "foundations/invariants.md"
text = path.read_text(encoding="utf-8")
entries = [
    ("trip-transfer", "At each map-run start equipment is removed from the chest in take-list order up to stock, carrying capacity and entry cap, and at completion items are deposited once from the entry-bound bring snapshot in its order up to backpack stock, carrying capacity, exit cap and free chest room, including on an already solved map.", "D-50 · D-179 · D-187 · D-189"),
    ("trip-run-end", "Death, ending or restarting an unfinished map run returns none of its carried items to the chest, while completion deposits the frozen bring list's clipped contents and leaves the remaining items unavailable to subsequent runs.", "D-179 · D-183 · D-189 · D-190"),
    ("trip-plan-progress", "Editing or discarding changes to the copy's trip plan alone leaves the run's streak, defeated-attack count and program-rule firing counts as they stood.", "D-93 · D-131 · D-136"),
]
for identifier, sentence, derives in entries:
    assert f"## {identifier}\n" not in text
    block = f"## {identifier}\n\n{sentence}\n\n- **Method:** test\n- **Rests on:** none\n- **Derives from:** {derives}\n- **Part:** simulation\n- **Violated:** no\n\n"
    if "## Withdrawn identifiers" in text:
        text = text.replace("## Withdrawn identifiers", block + "## Withdrawn identifiers")
    else:
        text = text.rstrip() + "\n\n" + block
path.write_text(text, encoding="utf-8", newline="\n")
