from pathlib import Path
import re

root = Path(__file__).resolve().parents[4]
path = root / 'foundations/decisions.md'
with path.open(encoding='utf-8', newline='') as handle:
    original = handle.read()
newline = '\r\n' if '\r\n' in original else '\n'
text = original.replace('\r\n', '\n')
def entry(number):
    return re.search(r'(?ms)^### D-' + str(number).zfill(2) + r' — .*?(?=^### |\Z)', text).group()
def change(number, body=None, replacements=()):
    global text
    old = entry(number)
    new = old
    if body:
        new = re.sub(r'(?s)(^### [^\n]+\n\n).*?(\n\n- \*\*Scope:)', lambda m: m[1] + body + m[2], new, count=1)
    for before, after in replacements:
        assert before in new, (number, before)
        new = new.replace(before, after)
    text = text.replace(old, new)

change(20, "An attack interrupts the character's action still in progress, and that action is lost; a change of the program or the condition of another program rule leaves that action running. The program chooses again at the next free game minute, and before the character's action in each combat turn.", [
    ("*Rationale:* the player changes the program during a map run without ending it, and the change takes\neffect from the next free game minute, once the character's action in progress has ended; the\nprogram picks a program rule only in such a game minute, so the end of the character's action is\nthe one moment at which both a change of the program and a program rule whose condition has come to\nhold take effect.", "*Rationale:* editing a program leaves the work already begun intact, while an attack makes the character respond to the creature instead; the program as it stands at each next choice controls that response. Losing the interrupted work makes an attack matter even when the character survives it.")])
change(23, replacements=[("in each free game minute it carries out the first program\nrule", "in each free game minute and immediately before its action in each combat turn it carries out the first program\nrule")])
change(24, "A map is a grid of hexagonal tiles whose dimensions, entrance — fixed, or drawn by the map run —,\ncost of a move, attacking creatures with how often they attack, and resources stand in the map's\ndata, each resource with its density, stock per tile and time to renew one piece, no time meaning a\nresource that does not renew. What is not on the map's list of resources cannot be gathered or\nrevealed there. Which tile gets what is drawn by the map run from its seed, within the bounds the\nmap sets.", [
    ("resources; Las with a fixed entrance", "resources; Las with a fixed entrance, Las — głbiej with a drawn one"),
    ("*Rationale:* six neighbours at an equal distance make a move always mean the same. New challenges\ncome from the game map's settings alone — dimensions, densities, stocks, renewal, cost of a move.\nThe first game map has a fixed entrance because its first map run is a tutorial. Accepted with it: a\nrandom layout widens the spread between seeds.", "*Rationale:* six neighbours at an equal distance make a move always mean the same. A resource that\nruns out makes wandering matter; without it a program finds one good tile and the rest of the map\nrun looks as before. New challenges come from the map's settings alone — dimensions, densities,\nstocks, renewal, cost of a move. The first map has a fixed entrance because its first map run is a\ntutorial. Accepted with it: a random layout widens the spread between seeds."),
    ("but tests nothing in the game.", "but tests nothing.")])
change(58, replacements=[("in each game minute by more", "in each game minute outside combat by more")])
change(60, "Outside combat, a character loses health in each game minute in which it is chilled — its body temperature below the threshold of chill — and loses it again, apart, in each game minute in which it is starving — its satiety below the threshold of hunger; in a game minute in which it is neither, its health comes back by itself, up to full health. During the game minutes of combat the character's needs and health stand still until the combat actions change its health.", [("its health comes back", "its health comes back")])
change(61, replacements=[("and hunger otherwise.", "and hunger otherwise. A character whose health reaches zero through combat dies with the cause „walka” in the game minute of the combat turns."), ("The character's action in progress lasts its full duration while the map run goes on; death ends the map run, and the character's action with it, as the player ending a map run does.", "Death ends the map run and any action in progress, as the player ending a map run does; an attack can also cut an action short while the map run goes on."), ("and a death of another kind, such as of wounds, takes a cause of its own.", "and combat has its own cause rather than borrowing cold or hunger from the body's state.")])
change(71, "Outside combat a game minute takes effect in this order: the character's body cools by the map's ambient temperature and warms by what burns on its tile, satiety falls, health changes for cold and hunger or recovers, and the streak follows D-136; health at zero ends the map run in death at that point, otherwise burning loses a minute, tiles renew, the ending action takes effect, completion is checked, and a continuing run tries an eligible attack before the ordinary program pick, with an attack replacing that pick and interrupting any action still running. In each game minute of combat the body stands still, the streak grows, burning loses a minute and tiles renew, then in the last combat minute all combat turns resolve, their result and cooldown are recorded, a beaten attack is counted and death ends the run before completion is checked; completion is checked in the earlier combat minutes too and ends the encounter with its attack description and no turns or outcome, while a surviving run after the final combat minute picks its next ordinary action in that same minute. Discoveries enter the Understanding where their cause occurs — body, ending action or attack — and the following effects and picks read that updated Understanding and program, a rule written by a discovery included, with discoveries collected once for the whole minute and the pause taken after that minute has finished.", [
    ("derives from D-136", "derives from D-136 · derives from D-140 · derives from D-141 · derives from D-142 · derives from D-146"),
    ("*Rationale:* The world passes", "*Rationale:* Outside combat the world passes"),
    ("so every effect of an action of the character acts from the next game minute", "so an ordinary action's effect acts from the next game minute"),
    ("the order of a game minute grows longer by the streak and the completion.", "combat adds an ordering of turns inside the final game minute, and an earlier completion can leave an encounter unresolved."),
    ("before what burns, the tiles and the action ending in that minute have taken effect.", "before what burns, the tiles and the action ending in that minute have taken effect; a completion checked before combat turns in their final minute; an attack tried again after those turns."),
    ("a completion right after the character's body, as death comes — the effect of an action ending in that game minute would be lost.", "a completion right after the character's body, as death comes — the effect of an action ending in that game minute would be lost; completion before the final combat turns — the encounter's result would be skipped; waiting another game minute for the ordinary pick after combat — an extra idle minute beyond the combat's fixed cost.")])
change(118, replacements=[("item and condition enters", "item, condition and creature enters")])
change(122, replacements=[("minute in one line, and it stands until the player goes on.", "minute in one line, and it stands until the player goes on; where the last encounter has a line, it stands below the discovery line and above the body and backpack."), ("and the screen after a completion holds two lines.", "and the screen after a completion can keep both discovery and encounter text.")])
change(128, replacements=[("Where does what reveals an action, an item or a condition stand?", "Where does what reveals an action, an item, a condition or a creature stand?"), ("each action, item and condition", "each action, item, condition and creature"), ("action, item or condition, as", "action, item, condition or creature, as"), ("the first chill or the first gathered piece of an item", "the first chill, the first gathered piece of an item or an attack naming its creature"), ("An action, an item or a condition revealed", "An action, an item, a condition or a creature revealed"), ("so an action, an item or a condition is", "so an action, an item, a condition or a creature is"), ("apart from the actions, items and\nconditions", "apart from the actions, items, conditions and creatures")])
change(131, replacements=[("Which edits of the program set a map run's streak to zero?", "Which edits of the program reset a map run's solving progress?"), ("the streak of the map run in progress to zero", "the streak and the number of beaten attacks of the map run in progress to zero"), ("stands.\n\n- **Scope:", "stands, together with the number of beaten attacks. A map run starts with zero beaten attacks, and a game minute with health lost to cold or hunger leaves their count as it stands.\n\n- **Scope:"), ("program the same included, as the predecessor game, loop, did — the player would lose the streak for\nan act that changes nothing.", "program the same included, as the predecessor game, loop, did — the player would lose the streak for\nan act that changes nothing; keeping beaten attacks through a changed program — different programs would supply the two kinds of progress; clearing beaten attacks after cold or hunger — the streak already accounts for those losses."), ("though the player touched the program.", "though the player touched the program; the same program has to supply the beaten attacks and the streak, which can lengthen the attempt after an edit.")])
change(132, replacements=[("„Minuta 480 · Las rozwiązany”, in the role `positive`.", "„Minuta 480 · Las rozwiązany”, and in Las — głębiej „Minuta {game minute} · Las — głębiej rozwiązany”, in the role `positive`.")])
change(133, "During a map run the status row shows progress for the requirements present in the map's solving condition beside the game minute and the character's activity: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present, as „Minuta 312 · Eksploruje · Passa 120/540 · Pokonane napaści 1/2”. The headquarters shows by each available map the sentence of its solving condition from the map's data, as „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu” or „Las — głębiej — 540 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz dwie pokonane napaści wilka”.", [("a progress bar in place of „Passa 120/480”;", "a progress bar in place of „Passa 120/480”; a streak target shown for a map that asks for beaten attacks alone;")])
change(136, "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten,\nalone or together — and a map opens when the map its data names as its opener is solved. A streak\ncounts the successive game minutes in which the character loses no health to cold or hunger: a game\nminute with such a loss sets it to zero, wounds taken in combat do not, and every change of the\nprogram rules or rule groups the map run carries out sets it to zero, on every map.", [
    ("How is a map solved?", "How is a map solved, and what opens the next one?"),
    ("- complies: Las asking for a streak of 480 game minutes, written in its row of the game maps'\n    data", "- complies: Las — głębiej asking for a streak and two beaten attacks, written in its data"),
    ("leaving the streak as it stood", "leaving the streak as it stood; a streak broken by a wolf's bite"),
    ("it, so a change of the program starts the streak again. The condition differs from map to map, so it\nlives in the map's data.", "it, so a change of the program starts the streak again. Wounds from combat do not break it: a\nprogram is to handle an attack, not avoid it. The condition differs from map to map, so it lives in\nthe map's data, and so does the map that opens it.")])

def add(number, question, body, scope, relations, rationale, rejected, complies, violates, origin='none', verification=None):
    global text
    text += f'\n### D-{number} — {question}\n\n{body}\n\n- **Scope:** {scope}\n- **Based on:** none\n- **Relations:** {relations}\n- **Verification:** ' + (verification + '. ' if verification else '') + f'an agent compares a change with the decision:\n  - complies: {complies}\n  - violates: {violates}\n- **Origin:** {origin}\n\n*Rationale:* {rationale}\n*Rejected:* {rejected}\n'

add(140, 'How does combat go?',
    'Combat goes in turns, the sides exchanging one action each, and the side that attacked strikes\nfirst; the needs stand still during combat, and the whole combat costs a fixed number of game\nminutes. Combat verbs can be carried out only in combat, and only they can be carried out in it. A\ncreature acts by pairs of condition and action kept in its data, of the same form as program rules,\nand an attack interrupts the action under way, which is lost.',
    'simulation', 'derives from D-23',
    "a fixed cost keeps a long fight from eating half a day and mixing into hunger and cold.\nA creature's behaviour can be read, so the player writes a counter to it: combat is the reading of\nanother's behaviour, not the guessing of rolls. With combat verbs bound to combat, a rule group of\ncombat stays silent outside it. The attacker striking first gives a branch that grants the first\nstrike something to do.",
    'combat in game minutes — a fight would last half a day and spoil the needs; a finer tick\nof the simulation — gives the program nothing new to choose and multiplies the work; the first strike\nalways to the character — branches granting it would give nothing.',
    'a new creature added to data together with its pairs of condition and action',
    "a wolf's behaviour written as a branch of the engine; a turn of combat costing game minutes of its own; eating during combat",
    'the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does combat go?" · koncepcja_projektowa.md there, D18 and D53', 'invariants: action-in-progress')
add(141, 'When do combat turns take effect?',
    'An encounter occupies five game minutes after its attack minute M, with its turns resolved together in M+5 using the program as it stands then, and the player reads their record afterwards. During M+1 through M+5 the needs and automatic health recovery stand still, burning and resource renewal continue and the streak grows; the turns change health in M+5. Editing the program during the encounter leaves its resolution minute, attack generator and cooldown intact, and resets solving progress as D-131 gives.',
    'simulation · browser-view', 'derives from D-140 · derives from D-131',
    'The player has time to write combat rules after the first attack reveals them, while the game minute remains the unit of time; the cost is reading the actions afterwards instead of watching them unfold.',
    'turns paced by real time — introduces finer simulation time; resolving in the attack minute — the first encounter resolves before the player can write combat rules.',
    'an attack in minute 200 resolving its turns in minute 205 with the program edited during the pause',
    'an attack resolving before its discovery pause or automatic recovery raising health during its waiting minutes')
add(142, 'When can a creature attack a map run?',
    "An attack uses the per-game-minute chance and cooldown in its map's data, with the cooldown counted from the start of the map run and from the end of each encounter; for Las — głębiej the chance is 0.01 and the cooldown protects the full 180 minutes after either point, so the first eligible minute is 181 or E+181 after an encounter ending in E. Each eligible ordinary game minute tries its attack after the ending action's effect and the completion check, including a minute inside a longer action; an action still running is lost on an attack, while a finished action keeps its effect. The attack generator is a separate stream seeded by the map run, advanced by the eligible trials, with cooldown, active combat, death and completion leaving it as it stands, so two continuing runs on one seed meet their first attack in the same minute.",
    'simulation', 'derives from D-22 · derives from D-24 · derives from D-140',
    'Independent trials make a difference of programs a difference of behaviour rather than luck; the full cooldown makes its boundary explicit, at the cost of delaying the next chance until the following minute.',
    'trials at action ends — action length changes the first encounter; a stream shared with walking or gathering — those choices shift attacks; a trial on the last protected minute — shortens the protected interval; attack before an ending action — loses its earned effect.',
    'a trial in minute 181 and E+181, after a gathering finishing in that minute gives its item',
    'a trial in minute 180, during combat or in a minute ending in completion')
add(143, 'What does the first wolf attack reveal?',
    'The first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej” and „Przeciwnik ma poniżej” into the Understanding, with the game paused after the attack minute and before the first combat turn. The discovery leaves writing combat rules to the player; the game currently adds no rule at this attack, and later attacks of an already known creature leave time running unless the minute discovers something else.',
    'simulation · browser-view', 'derives from D-118 · derives from D-128 · derives from D-141',
    'The encounter teaches the player what its counter can use; keeping the program theirs accepts that resuming with no combat rule can kill the character.',
    'adding a combat rule automatically — changes the program on the player’s behalf and resets progress; revealing the health conditions at another occasion — separates the counter from the encounter that needs it.',
    'the first wolf opening the combat actions and health conditions while the player can edit in the pause',
    'the attack writing „Zawsze → Uderz — patyk” into the program')
add(144, 'What actions does a character use in combat?',
    'The character currently uses „Uderz — patyk”, which requires a stick in the backpack and deals 6 damage, „Kopnij”, which deals 3 damage and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of 5 damage for the next damaging enemy strike. Another dodge refreshes that reduction, the strike consumes it with damage floored at zero, a creature’s dodge leaves it pending, and the encounter’s end clears it. The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection.',
    'simulation', 'derives from D-140',
    'A held weapon, a fallback kick and a dodge give a program different responses; a single pending reduction describes the next strike rather than a store of protection.',
    'stacking dodges — adds a protection resource beyond the next strike; another initial balance — departs from the accepted predecessor numbers, whose different weapon and healing behaviour can make the present balance harsh.',
    'repeated dodges leaving one reduction, and a wolf below 8 health choosing its dodge',
    'a wolf dodge consuming the character’s protection or protecting the wolf from the next strike')
add(145, 'How do weapon wear and wound dressing work today?',
    'A stick currently stays in the backpack after a strike, with its condition unchanged, and the game currently has no action for dressing wounds.',
    'simulation', 'derives from D-144',
    'The current combat uses the accepted damage values with a reusable stick and natural recovery outside combat; this costs a different balance from one with breakage and healing.',
    'importing weapon breakage or wound dressing together with combat — adds behaviour outside the accepted scope.',
    'successive strikes keeping the same stick available',
    'a strike consuming or breaking its stick while this decision stands')
add(146, 'What ends an encounter?',
    'The encounter ends immediately when either side reaches zero health: a creature at zero makes a beaten attack, and a character at zero dies of combat in the minute of the turns, before it can answer a lethal strike. The current data limits an encounter to 40 combat turns, each an exchange with at most one action of each side; if both survive that limit the creature leaves and the attack remains unbeaten. A character that finds no feasible combat rule gives up its action of that turn; every resolved encounter starts the cooldown again, and combat wounds leave the streak as it stands.',
    'simulation', 'derives from D-140 · derives from D-61 · derives from D-136',
    'Immediate death makes the recorded result reflect the actions actually survived, and a limit ends a duel in which neither side can finish the other; the limit does not save a helpless character from lethal strikes.',
    'an unlimited exchange — two dodging sides can hold the encounter forever; counting the sides’ actions together as the limit — halves the accepted number of exchanges.',
    'a lethal first strike stopping the exchange before the character acts, or two surviving sides parting after 40 exchanges',
    'a departed creature counted as a beaten attack or a dead character answering its killer')
add(147, 'What record of an encounter does the player read?',
    'From an attack the map run keeps its last encounter’s facts and shows a wrapping paragraph in `text`, below any discovery line and above the body and backpack: before the turns it gives the creature’s starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter’s result. The line stands through „Wznów”, editing and the frozen death or completion screen until another attack replaces it or „Restart” or „Zakończ” removes its map run; a completion before the turns keeps the attack description and leaves the outcome absent. The status activity is „Walczy z wilkiem” throughout the combat minutes, including the resolution minute even if the next ordinary action starts there, while death or completion takes precedence and combat death reads „Minuta {minute} · Mag zginął w walce”.',
    'simulation · browser-view', 'derives from D-04 · derives from D-40 · derives from D-122 · derives from D-141',
    'The player can read the opponent and the reason for the result, even after death; keeping facts lets the view show what happened under the program then in force, at the cost of space for a long paragraph.',
    'replaying combat to draw its record — a changed program could change the account; hiding it on death — removes the evidence of defeat; putting it above discovery — moves the explanation of the pause.',
    '„Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.” before turns, and „Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 · … · Wilk pokonany.” after them',
    'a completion before the turns displaying an invented victory, defeat or departure')
add(148, 'Where is an attacking creature pictured today?',
    'An attacking creature currently appears in the encounter’s text, and the terrain drawing currently has no picture of it.',
    'browser-view', 'derives from D-147',
    'The text supplies the behaviour and result the player needs to write a counter; the terrain stays a picture of its existing contents.',
    'adding the wolf to the terrain drawing — adds a visual feature outside the accepted presentation.',
    'the wolf named in the encounter line while the terrain keeps its current tiles and character',
    'a wolf icon added to the character’s tile while this decision stands')
add(149, 'When does the headquarters offer a map opened by another map?',
    'A map whose opening map is still unsolved is currently absent from the headquarters, and from the opening map’s first completion each character has „Mapa: {map}”, „Wyślij” and its solving-condition sentence beside that map. The same availability determined from the game’s solved maps governs sending in the simulation, and a map that requires an unsolved opening map refuses a send.',
    'simulation · browser-view', 'derives from D-136 · derives from D-53',
    'A shared availability check makes the visible offer and the simulation’s permission agree; the player learns of the next map on returning to headquarters.',
    'showing the locked map with an inactive send — reveals it before opening; a new-map message on completion — adds another announcement; filtering in the view alone — allows sending to an unavailable map through the simulation.',
    'solving Las opening Las — głębiej for every character',
    'the simulation sending to Las — głębiej before Las is solved')
add(150, 'Which character skills open the current combat actions?',
    '„Uderz — patyk” grows „Walka bronią jednoręczną”, „Kopnij” grows „Kopanie”, and „Odskocz” grows „Unik przed ciosem”, all present among the elemental mage’s predispositions.',
    'simulation', 'derives from D-120 · derives from D-144',
    'Combat actions belong to skills like other learned actions, so predispositions already govern their availability even before practice is counted.',
    'making the combat actions skill-free — opens them to every archetype rather than through its predispositions.',
    'the mage’s repertoire admitting the discovered combat actions through its three combat skills',
    '„Kopnij” treated as an action that grows no skill')
add(151, 'Whose health do combat conditions compare?',
    'The condition „Zdrowie poniżej” compares the acting side’s current health points, and „Przeciwnik ma poniżej” compares its opponent’s current health points, with strict less-than comparison; both offer 0–100 in steps of 1, with defaults 50 and 10 respectively. A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program. Outside combat the own-health condition still reads the character’s health and the opponent-health condition is false, while ordinary world conditions keep their meaning in combat.',
    'simulation · browser-view', 'derives from D-23 · derives from D-119 · derives from D-140',
    'One meaning for a shared condition lets each side read its own situation; health points keep the wolf’s threshold tied to its wounds, and the explicit actor context costs careful handling.',
    'a separate language of creature conditions — duplicates rule meanings; percentages — changes the accepted wolf threshold; a full player program for a creature — adds groups and player knowledge to its ordered pairs.',
    'a wolf at 6/24 satisfying its own threshold 8, with the character choosing after the wolf’s action',
    'the wolf’s own-health condition reading the character’s health or 25 percent')

# Durable origins keep reasoning local when the source task is retired.
for number in [20,23,58,60,61,71,118,122,128,131,132,133]:
    old = entry(number)
    # Existing origins remain valid pointers for the inherited reasoning; additions are fully explained here.
    assert '- **Origin:**' in old
text = text.replace('Las — głbiej', 'Las — głębiej')
with path.open('w',encoding='utf-8',newline='') as handle:
    handle.write(text.replace('\n',newline))

path = root/'foundations/invariants.md'
with path.open(encoding='utf-8',newline='') as handle: text=handle.read()
text=text.replace('unless its map run ends first, even where', 'unless its map run ends first or an attack interrupts it, even where')
text=text.replace('In each free game minute of a map run, the character starts to carry out the first program rule', "In each free game minute of a map run and immediately before the character's action in each combat turn, the character starts to carry out the first program rule")
text=text.replace('D-20 · D-23\r\n', 'D-20 · D-23 · D-140\r\n').replace('D-20 · D-23\n', 'D-20 · D-23 · D-140\n')
with path.open('w',encoding='utf-8',newline='') as handle: handle.write(text)
path=root/'foundations/glossary.md'
with path.open(encoding='utf-8',newline='') as handle: text=handle.read()
newline='\r\n' if '\r\n' in text else '\n'
text=text.replace("character's action or the character's waiting ends", "character's action, waiting or encounter ends")
text=text.replace("game's actions, items and conditions", "game's actions, items, conditions and creatures")
text += ("\n## beaten attack\n\nA beaten attack is an attack in which the creature reaches zero health in combat, as distinct from an attack whose creature departs at the turn limit.\n\n- **Not:** none\n\n## combat turn\n\nA combat turn is an exchange in which each side has one action, ending early when either side dies before the other side’s response.\n\n- **Not:** none\n").replace('\n',newline)
with path.open('w',encoding='utf-8',newline='') as handle: handle.write(text)
print('Updated three foundation files.')
