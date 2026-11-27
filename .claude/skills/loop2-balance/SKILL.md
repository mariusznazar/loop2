---
name: loop2-balance
description: How an agent measures the game's balance with the balance instrument - one npm command with the modes sweep, trace, loop, campaign, programs, check-map and progression, overlays that add or change maps in memory, checking a map before a package is defined, and results printed or written outside the tracked files. Use for a question about balance, for a new map, or to run the instrument.
---

# loop2-balance

The balance instrument runs the game's own simulation outside the browser. It plays map runs from
seeds, traces one run, measures the earning loop, plays a player's campaign over days, checks a
map before a package is defined (D-428), and measures whether each map of the game can be solved
with what the maps before it gave (D-438). Its results never enter the repository (D-429). Its code
is the part `balance-tools`: `balance/` and `tests/balance/`.

Run every command in the repository's root with:

```sh
npm run --silent balance -- <command> [flags]
```

The npm script builds the whole game first, so each call takes about two seconds more than the
measurement itself. Use `--silent`: without it npm puts two banner lines on standard output, and
with it standard output holds the result alone.

## Commands

| Command | What it does | Standard output |
|---|---|---|
| `sweep` | Plays one program on one map over a list of seeds | header and summary; with `--out` the file also holds each seed's row |
| `trace` | Plays one map run of one seed and writes it as lines a person reads | the lines, the last one `end: <outcome> at minute N` with the cause where there is one |
| `loop` | Runs the earning loop through the game's own `startLoop` and `catchUp` for real hours | header and readings per checkpoint; with `--out` also each run |
| `campaign` | Plays one player from an empty account through the game's own actions | header and summary; with `--out` also the log of each campaign |
| `programs` | Lists the reference programs in the words the game shows the player, each headed by its label `P1`, `P2`... and its identifier: the key to the labels of the map check's table | the list; with `--out DIR` one `<identifier>.json` per program and one file of all of them in words |
| `check-map` | Checks the maps an overlay adds against every reference program (below) | one Markdown table |
| `progression` | Measures each map of the game against every reference program, from what the maps before it gave, with no earning loop (below) | one Markdown table, one sentence under it, and a second table that sets each map beside its opener |
| `help` | Lists each command's flags | the usage text |

Each command takes only its own flags. A flag of another command, a missing value, a repeated flag
or an unknown name stops the command with a sentence on standard error and exit code 1.

## Flags

- `--map <id>`: a map of the game, or a map an overlay adds. The game's maps are `forestEdge`
  (Skraj lasu), `forest` (Las), `forestDeep` (Las — głębiej), `forestPack` (Las — wataha), `forestDeep2`,
  `forestDeep3` and `forestDeep4` (Las — głębiej II, III and IV, the rungs of the ladder that Las —
  głębiej opens; the game composes their names from the first map of their line) and `forestLair`
  (Las — matecznik), named as the game shows them.
- `--program <id or path>`: an identifier of the reference programs (`npm run --silent balance -- programs`
  lists them), or the path of a program file of the game's shape.
- `--seeds <list>`: a range `1-500`, a list `3,7,12`, or both `1-5,9`. Default `1-100`; `trace`
  takes one seed, default 1; `progression` defaults to `1-500`.
- `--chest <pairs>`: the pieces in the chest at the start, as `stick=12,berry=3`. `sweep`, `trace`
  and `loop` take the chest only from this flag; `check-map` takes it from each program's take list.
- `--practice <pairs>` and `--ranks <pairs>`: the practice of the character's skills and the bought
  ranks of the branches, as `smallItemGathering=80` and `keenEye=3`.
- `--gear <pairs>`: the gear the measured character holds at the start of each map run, as
  `mainHand=stick`: a slot and an item that fits it. `sweep`, `trace`, `loop`, `check-map` and
  `progression` take it; a slot the game lacks, an item it lacks or an item that does not fit its slot
  stops the command. With no flag the new character's gear is empty, so a stick of a take list goes to
  the main hand at its first strike.
- `--overlay <files>`: overlay files laid on the game's data for the measurement. Repeat the flag or
  list the files with commas.
- `--cap <minutes>`: game minutes after which a map run is given up.
- `--hours <list>`: real hours of the loop's readings, as `8,24,72`.
- `--no-resurrection`: the loop starts with every use of the team's resurrection spent, the uses returning as in the game.
- `--player <id or path>`: a player description. The identifiers are `edge-daily-best`,
  `edge-daily-decent` and `edge-daily-decent-stock` (the files of `balance/players/`). A description
  may name the gear the mage starts with, as `"gear": {"mainHand": "stick"}`: the game's own act puts
  each piece on from a chest that holds exactly those pieces, and a slot the game lacks or an item
  that does not fit its slot stops the command. Without `gear` the mage starts with empty gear.
- `--maps <list>` and `--programs <list>`: narrow the rows of `check-map` (maps an overlay adds)
  and of `progression` (maps of the game, as `forest,forestDeep`).
- `--out <path>`: writes the result to that file and prints nothing (for `programs`, a directory).

## Overlays

An overlay is a JSON file that changes the game's data in memory for the time of one measurement,
and leaves the game's data files untouched. Its keys name tables of the game's data: `MAPS`,
`BALANCE`, `ITEMS`, `CAMPFIRE`, `CREATURES`, `SKILLS`, `BRANCHES`, `ACTIONS` and `TRAITS`. Its
values merge into the table deeply: a number changes in place, and a new key of `MAPS` adds a map.
A `description` text is allowed and is not laid.

`balance/overlays/wasteland.json` is an example: it adds the map `wasteland`, the wasteland after
Las, which opens after `forest`, and changes nothing else. The overlay is checked whole before anything is laid. A key that
names no table, a table that is not an object, or a file that cannot be read stops the command with
nothing changed.

**The limit.** An overlay changes data, not the game's code. A map that needs a new kind of
condition, or an item with an action of its own, needs code of the game, and an overlay cannot add
it. A value that a module of the game reads once when the module loads escapes the overlay too: the
module keeps the value it read. If a laid number seems to have no effect, suspect this limit before
the numbers.

## Checking a map before a package is defined

Every map goes through this check before a package is defined.

1. Write the map as an overlay file: a new key of `MAPS` with the map's numbers. Keep the file where
   you work, under `.runs/`, which git ignores.
2. Run the check:

   ```sh
   npm run --silent balance -- check-map --overlay .runs/<name>.json
   ```

   It prints one row for each map the overlay adds and each reference program (24 programs, about 55
   seconds for one map). Narrow it with `--maps <id>` and `--programs <id,id>`, or write the table
   with `--out <path>` outside the tracked files.
3. The columns are: the map's name in the game's data, the program's label, the share solved on
   seeds 1-500, the median game minutes of the solved runs, the deaths by cause and the runs at the
   cap, and the earning loop over 24 real hours on seeds 1-100, the loop starting with the full
   number of uses of the resurrection: pieces taken from the chest per map run, pieces put into it
   per map run, and the share of map runs that end in death. The label is `P1`, `P2`... : the program's number in the list that `programs` prints, the
   same whichever programs `--programs` narrows to. The table shows no condition, action, rule or
   identifier of any program, because an identifier can state the rules of its program in other
   words: the person who plays the game gets this table, and the programs and the key from label to
   identifier stay with the agent. A row reads:

   ```
   | <map name> | P<n> | <share> % | <minutes> | <cause n, cause n> | <runs> | <pieces> | <pieces> | <share> % |
   ```

   Every row runs with a new character's skills unless `--practice` or `--ranks` say otherwise, and
   with empty gear unless `--gear` says otherwise; those flags apply to all rows alike. The gear
   reaches the sweep's columns (the share solved, the minutes, the deaths and the runs at the cap) and
   the earning loop's columns alike. A program that needs a branch of the skills measures near
   zero without it. Where the comment of a program in `tests/sim/reference-programs.mjs` says it
   depends on a branch, run it again with `--ranks` and `--programs <identifier>`, and tell the
   person only that the row was measured with the skills the program needs. Name no branch, no
   skill and no rank to the person, who is not to learn which of the character's skills passes a
   map. That sentence keeps a row near zero from reading as "the map cannot be passed".
4. The programs in the table are the reference programs. Beyond them, the agent tries to write a
   program that passes the map without the thing the map asks about, for example a map that asks for
   defeated wolf attacks, with a program that avoids the fights. Write each attempt as a file of the
   game's shape under `.runs/`. To see the shape, run `npm run --silent balance -- programs --out
   .runs/<dir>` and copy one of the files written there. Measure the attempt with the overlay and the
   map it adds:

   ```sh
   npm run --silent balance -- sweep --overlay .runs/<name>.json --map <map id> --program .runs/<attempt>.json --seeds 1-500
   ```

   A file that is no program of the game stops the command with its reason. The attempts' programs
   stay with the agent: they go into no table and no request for the person. Their results go to the
   person: for each attempt a row like the table's, with the share solved, the median minutes and
   the deaths by cause, under a neutral label of its own (`A1`, `A2`...), never under the file's
   name or a word of what the attempt does.

## Measuring whether each map can be solved with what the maps before it gave

The progression never requires the player's absence (D-438): each next map can be solved with what
the maps before it gave, with no earning loop. `progression` measures that for the maps of the game:

```sh
npm run --silent balance -- progression --out .runs/<name>.md
```

It measures every reference program on each map on seeds 1-500, the map counting by its best
program, the one that solves the largest share of the seeds. Each map is measured from the state the
maps before it give, built through the game's own functions: the practice that the first solvings of
the maps before it pay, each by the best program of that map (the median of its solved runs, summed
along the maps that open it); the ranks bought from that practice, as far as its points reach, of
the branches the measured program needs (those that open an action its rules use); and the stock of
the program's take list, brought out by manual runs of the solved maps before it within the chest's
capacity, counted. Each of those manual runs is made with the best program of the map it is made on,
so the stock is what that program brings out of the map, not what a player with another program
could bring; where it brings out none of an item the measured program takes, the stock ends "not
gathered in full" after 100 runs, and the row is measured with less than a generous state, so a
failure on it does not yet say the map needs a loop. The character that brings out the stock and
the character that is measured buy ranks from the same practice, so its points are spent twice,
once for each. The first map has no map before it, so a program that takes from the chest goes
in with none of it. A manual run pays no practice and its death is not settled. A branch that a
program needs without opening an action of its rules, as a reference program's comment may name, is
not bought: read such a row as measured without it.

The first table is the map check's without the earning loop's columns: the map, the program's label
(`P1`, `P2`..., the key to it is `programs`), the share solved, the median game minutes of the solved
runs, the deaths by cause and the runs at the cap. Under it stands one sentence that says with what
each map was measured and how many manual runs its stock took.

Then comes a second table, with a row for each map that another map opens: the map, its best share
(`Best share`), whether it can be solved, its opener, the opener's best share, the map's best share
with the opener's character (`Best share with the opener's character`), and `Harder than the opener`.
The opener's character is the one the measurement builds for the opener: the practice and ranks from
the maps before the opener, and its stock. The two shares of a map stand side by side: `Best share` is
measured from the map's own chain of openers, and the verdict reads only the share with the opener's
character against the opener's best share. A map that opens nothing has dashes in the opener's cells.
Both tables go to the person as they are, and name no condition, action, rule, skill, branch, rank or
item. A map can be solved where its best
program, with the character built from what the maps before it gave, solves one seed or more of
1-500. A map is harder than the map that opens it where, measured with the opener's character, its best
program solves a smaller share of the seeds than the best program of the map that opens it does (D-448). Las — matecznik, until the change that sets its
numbers, passes this check where no program solves a seed of it. Read the share of each map's best
row from the table. A failure of the best program says the map needs an earning loop; a pass can
let through a map that a player without an equally good program passes more rarely.

`--maps` and `--programs` narrow the rows; a map measured alone still goes through the maps that
open it, and the best program of each is picked among the programs named, so a narrowed run is no
cut of the whole table. A map the game's data lacks and a program that is no reference program stop the command
before any measurement.

## Adding a rung of the ladder and checking it

A rung is a game map that differs from the map that opens it by its numbers alone (D-448). It stands
in the game maps' data, `src/browser/sim/data/maps.ts`, as a row of its own (D-464), and the game
takes everything the row does not give from the map that opens it. To add a rung:

1. Place the row in the order of the rows (D-466): right after the last map that the rung's opener
   already opens, and after the line of rungs that grows from that map. The line of rungs is the
   rungs that map opens, each followed by the rungs they open in turn. Where the opener opens no map
   yet, the row goes right after the opener.
2. The row names the map that opens it (`opensAfter`) and gives only the numbers in which it differs:
   the grid (`width`, `height`), `entrance`, `ambientTemperature`, `stepMinutes`, the caps of what is
   carried in and out (`carryIn`, `carryOut`), the resources and attackers, each matched to the
   opener's by identifier and given only the numbers that change, and the solving condition's numbers
   of the kind the opener has. A resource the rung does not give stays in the row with density 0, so
   no map run places it. A row that adds a resource, an attacker or a kind of solving condition the
   opener lacks is refused. A row changes no creature.
3. The row writes no name. The game composes it from the name of the first map of the line that is no
   rung, and the Roman numeral of the rung's place in the line: II for the first rung, then III, IV
   and so on (D-465).
4. Write by hand the three sentences of the row: `solvingText` (the sentence of the solving
   condition), `goalText` (one short sentence of what the rung demands) and `completionText` (the text
   after its solving, which names the rung by its composed name, as in `Las — głębiej II rozwiązany`).

Then check the rung before it enters the game through a merge:

```sh
npm run --silent balance -- progression --out .runs/<name>.md
```

Run it on the data of the branch, with no overlay, every reference program and the seeds 1-500 that
are the default. The rung passes where both hold in the two tables:

- its `Can be solved` is `yes`: its best program solves one seed or more of the 500;
- its `Harder than the opener` is `yes`.

While tuning, narrow the run with `--maps <id>` (for example `--maps forestDeep2`, which still
measures the maps that open it) and `--seeds 1-100`; make one full run with every map and the seeds
1-500 at the end. Where the rung fails, change its numbers only as far as the check needs, and say in
the request for the merge which numbers changed and why. The description of that request holds the two
tables with their labels `P1`, `P2`... only; the programs and the attempts stay with the agent (D-428,
D-429).

## Where results go

- Standard output: the result alone, with `--silent`.
- A file: `--out <path>` writes the result there and prints nothing. Use a path outside the tracked
  files, under `.runs/` where git ignores it. The instrument writes into the repository only where a
  flag names a path in it, so keep such a path out of tracked directories.
- `programs --out <dir>` writes each reference program as a file of the game's shape and all of them
  in the game's words, in one Markdown file in the same directory.

## Timing

A `sweep` of 500 seeds takes a few seconds; `check-map` for one overlay takes about 55 seconds, and
two narrowed rows about 6 seconds. Each call also builds the game, so a short measurement costs about
two seconds more.

One run of `progression --maps forest --out .runs/<name>.md` on seeds 1-100 took about 16 seconds of
wall-clock time, the build of about two seconds included, measured once with the `time` command. The
second table adds one more measurement of each map that another map opens, from its opener's
character: a run that names `forest` measures `forest` twice and its opener `forestEdge` once, and
prints the rows of `forest` only. The full run over every map on seeds 1-500 was not timed.
