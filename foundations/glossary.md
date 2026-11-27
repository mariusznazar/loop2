# Glossary

Terms used by this product's foundation.

## character skill

A character skill is an area of what a character can do that grows apart from the character's other
areas.

- **Not:** none

## game minute

A game minute is the unit of the simulation's time.

- **Not:** none

## map run

A map run is one attempt of one character at one game map, from entering it until a completion,
the character's death or the player stopping it.

- **Not:** none

## program

A program is the written behaviour by which a character acts, made of ordered rule groups whose
program rules are ordered within each group, and holding a trip plan.

- **Not:** none

## deployment

A deployment is the act of building one commit of a game on its server and starting it there as the
game's running instance.

- **Not:** the game and its server installed and running on a host — "instance"

## test server

The test server is the server on Mikrus where loop2 runs for its players while the game is still
being built, and where player accounts are served.

- **Not:** none

## public address

A public address is the HTTPS origin at which players open a game, as opposed to the IP address or
the port at which its server is reached.

- **Not:** none

## program rule

A program rule is a pair held by a program: a condition and an action of a character.

- **Not:** none

## rule group

A rule group is a named set of program rules under a condition of its own.

- **Not:** none

## map run restart

A map run restart is a map run of the same character on the same game map, which the
player starts in place of the map run in progress or of a map run ended in the character's death
or in a completion that still stands on the screen.

- **Not:** none

## free game minute

A free game minute is a game minute of a map run at which the map run starts, or at which the
character's action, waiting or encounter ends and the map run goes on.

- **Not:** none

## extinguished campfire

An extinguished campfire is a campfire standing on its tile with no minutes of burning
left, whether it has burnt out or has not been lit yet.

- **Not:** none

## headquarters

The headquarters is the screen Siedziba, which shows the player's team with its characters and its chest.

- **Not:** the place where a character stands — at the camp

## at the camp

A character is at the camp when it is in no manual map run, going, paused or ended and waiting for „Restart” or „Zakończ”, and in no earning loop.

- **Not:** the picture band at the top of the headquarters with the characters drawn in it, of which it holds only the first that fit — `campDrawing`

## unit test

A unit test executes simulation rules or view logic in memory, possibly across several functions, without network, files holding test data, processes or a browser.

- **Not:** none

## integration test

An integration test checks a specific operation or connection using real files, local HTTP or processes, including scripts checking repository files.

- **Not:** none

## predisposition

A predisposition is a character skill that a character's archetype lets the character learn.

- **Not:** none

## archetype

An archetype is the kind of character that sets its predispositions.

- **Not:** none

## Understanding

The Understanding is the record of the game's actions, items, conditions, creatures and character skill trees, each with all its branches (D-195), that the player has
discovered, together with the condition „Zawsze” and the action „Eksploruj”, which it holds from the start of a new game.

- **Not:** none

## repertoire

A character's repertoire is the subset of the Understanding that the character can use in a program.

- **Not:** none

## manual map run

A manual map run is a map run that the player starts outside an earning loop.

- **Not:** none

## completion

A completion is the end of a map run that meets its map's solving condition.

- **Not:** none

## solved map

A solved map is a map on which a map run of any of the player's characters has had a completion,
whether or not an earning-loop program survives every seed.

- **Not:** none

## streak

A streak is a count of successive game minutes of one map run that a map's solving condition can ask
for.

- **Not:** none

## blocked account

A blocked account is a player account the operator, or an owner from the owner panel, has cut off from signing in and playing, which stays so until the operator or an owner unblocks it.

- **Not:** an email address refused for 15 minutes after five failed logins (D-102) — "locked"

## beaten attack

A beaten attack is an attack in which the creature reaches zero health in combat, as distinct from an attack whose creature departs at the turn limit.

- **Not:** none

## combat turn

A combat turn is an exchange in which each side has at most one action, the character none when it finds no feasible rule whose action it can carry out in combat (D-140, D-146), ending early when either side dies before the other side’s response.

- **Not:** none

## copy

A copy is the program a map run carries out, taken from one of the player's programs at the start of the map run, at a switch of the character to another program or at the start of an earning loop, whose changes reach a program by the player's save and on which a map run restart carries on.

- **Not:** none

## practice

Practice is the accumulated count of a character skill's actions that ended in effect.

- **Not:** none

## trait

A trait is a number describing a character that acts always, not in one action alone.

- **Not:** none

## well fed

A mage is well fed in a game minute in which its satiety, after that game minute's fall, reaches the
threshold the data files give.

- **Not:** none

## trip plan

A trip plan is two ordered lists with counts: what a character takes into a map run and what it brings out of it.

- **Not:** none

## resurrection

A resurrection is what the account has, one for all its characters, with a number of uses, of which the death of a character with practice uses up one while any is left, the use then protecting that practice, its bought ranks and its generation number, the map run ending in death with a use left too; the death of a character with no practice uses none up.

- **Not:** one of its uses — "use"

## generation number

A generation number is a count kept at a character that grows by one at a death that takes the character's practice because no use of the resurrection is left, and at no other, the death of a character with no practice included, the character staying the same character with the number the game gave it at its creation (D-56).

- **Not:** the number the game gives a character at its creation (D-56) — "character's number"

## earning loop

An earning loop is a succession of map runs that one character makes on one map without the player starting each.

- **Not:** none

## loop

The loop is the predecessor game, the game that loop2 starts from.

- **Not:** a succession of map runs that one character makes on one map without the player starting each — earning loop

## catch-up

The catch-up is the computing of the game minutes that passed since the save time, after each load of a saved game state and after a sign-in to the same account with the unsaved game state kept in the page's memory.

- **Not:** none

## save time

The save time is the moment of the browser's clock at which a saved game state was saved, which the game state holds and from which time away counts.

- **Not:** an occasion on which the game sends a save (D-207) — "moment of saving"

## loop clock

The loop clock is the date, kept by the browser view apart from the game state, up to which the whole game minutes of the earning loops have been counted.

- **Not:** none

## reading

A reading is one pass of the browser view in which it reads the browser's clock, passes the real time elapsed to the simulation where game time runs, and draws the screen from the game state it then holds, the previous reading being the pass before it.

- **Not:** a command's output that an environment fact's Source quotes — the third form of `Source` in `.the-way/elements/environment-facts/template.md`

## secondary action

A secondary action is an action of the browser view that opens or leaves a state of a form and
stands under that form, a button drawn as underlined text without a frame.

- **Not:** none

## chronicle

The chronicle is the record the page keeps of a manual map run for the player to read, each entry with its game minute.

- **Not:** the events a function of the simulation returns, which a screen reads as they pass and which nothing keeps — "events"

## previous save

A previous save is the one saved game state the server keeps beside an account's current one: the one an accepted save of a higher version or a reset replaced.

- **Not:** none

## previous-save privilege

The previous-save privilege is the flag the operator, or an owner from the owner panel, sets on a player account that allows the account to pull the programs of its previous save and to start the game from zero.

- **Not:** none

## operator

The operator is the person who reaches the server and runs its commands, such as the block of an account, the grant of the previous-save privilege and the giving of the owner role.

- **Not:** none

## owner

An owner is an account whose role is `owner`, the role that lets its holder use the owner panel of the game and that only a human gives, with the command `account-role`; every other account has the role `player`.

- **Not:** the person who reaches the server and runs its commands — operator

## overlay

An overlay is a file that changes the game's data in memory for the time of one measurement of the balance instrument, such as by adding a game map or changing the numbers of one, and leaves the game's data files untouched.

- **Not:** none

## wall

A map that asks for something new — an item, a spell or another idea of a program.

- **Not:** none

## judging

A judging is twelve runs of one character's program on one game map, each from one of twelve fixed seeds that are the same on every game map, the runs being no map run of the character and each able to end at a cap of game minutes, neither solved nor in a death.

- **Not:** none

## loop record

A loop record is the largest number of map runs of one earning loop completed in a row with no death between them, counted from the start of that earning loop and gone with it.

- **Not:** none

## content revision

A content revision is the count a program of the player's list carries, 0 when the program is made and one higher at each save after which its rules, rule groups or trip plan differ, a rename leaving it as it is, which the game state keeps and the server neither gives nor reads, unlike the revision the server gives each save it accepts (D-209).

- **Not:** none

## phone layout

The phone layout is the look the game takes in every window whose page area, the area of the page inside the browser's window, is narrower than 1280 px, whether the window belongs to a phone or to a computer, and it is made for a phone held upright with a page area 360 px wide (D-396).

- **Not:** none

## computer layout

The computer layout is the look the game takes in every window whose page area, the area of the page inside the browser's window and not the resolution of the screen, is 1280 px wide or wider, its smallest window having a page area of 1280 × 720 px (D-396).

- **Not:** none

## gear

Gear is what a character wears, wields and has at hand, apart from its backpack.

- **Not:** what a trip plan takes from the chest into a map run — "equipment"
