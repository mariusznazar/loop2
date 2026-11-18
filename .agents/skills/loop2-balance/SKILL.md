---
name: loop2-balance
description: How an agent measures the game's balance with the balance instrument - one npm command with the modes sweep, trace, loop, campaign, programs and check-map, overlays that add or change maps in memory, checking a map before a package is defined, and results on standard output or in a file outside the tracked files. Use for a question about balance, for a new map, or to run the instrument.
---

# loop2-balance

The balance instrument runs the game's own simulation outside the browser. It plays map runs from
seeds, traces one run, measures the earning loop, plays a player's campaign over days, and checks a
map before a package is defined (D-428). Its results never enter the repository (D-429). Its code
is the part `balance-tools`: `balance/` and `tests/balance/`.

Run every command in the repository's root with:

```sh
npm run --silent balance -- <command> [flags]
```

The npm script builds the whole game first, so each call takes a few seconds more than the
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
| `help` | Lists each command's flags | the usage text |

Each command takes only its own flags. A flag of another command, a missing value, a repeated flag
or an unknown name stops the command with a sentence on standard error and exit code 1.

## Flags

- `--map <id>`: a map of the game, or a map an overlay adds. The game's maps are `forestEdge`
  (Skraj lasu), `forest` (Las) and `forestDeep` (Las — głębiej), named as the game shows them.
- `--program <id or path>`: an identifier of the reference programs (`npm run --silent balance -- programs`
  lists them), or the path of a program file of the game's shape.
- `--seeds <list>`: a range `1-500`, a list `3,7,12`, or both `1-5,9`. Default `1-100`; `trace`
  takes one seed, default 1.
- `--chest <pairs>`: the pieces in the chest at the start, as `stick=12,berry=3`. `sweep`, `trace`
  and `loop` take the chest only from this flag; `check-map` takes it from each program's take list.
- `--practice <pairs>` and `--ranks <pairs>`: the practice of the character's skills and the bought
  ranks of the branches, as `smallItemGathering=80` and `keenEye=3`.
- `--overlay <files>`: overlay files laid on the game's data for the measurement. Repeat the flag or
  list the files with commas.
- `--cap <minutes>`: game minutes after which a map run is given up.
- `--hours <list>`: real hours of the loop's readings, as `8,24,72`.
- `--no-resurrection`: starts the loop with the team's resurrection spent.
- `--player <id or path>`: a player description. The identifiers are `edge-daily-best`,
  `edge-daily-decent` and `edge-daily-decent-stock` (the files of `balance/players/`).
- `--maps <list>` and `--programs <list>`: narrow the rows of `check-map`.
- `--out <path>`: writes the result to that file and prints nothing (for `programs`, a directory).

## Overlays

An overlay is a JSON file that changes the game's data in memory for the time of one measurement,
and leaves the game's data files untouched. Its keys name tables of the game's data: `MAPS`,
`BALANCE`, `ITEMS`, `CAMPFIRE`, `CREATURES`, `SKILLS`, `BRANCHES`, `ACTIONS` and `TRAITS`. Its
values merge into the table deeply: a number changes in place, and a new key of `MAPS` adds a map.
A `description` text is allowed and is not laid.

`balance/overlays/forest-pack.json` is an example: it adds the map `forestPack`, the wolf pack of
Las, and changes nothing else. The overlay is checked whole before anything is laid. A key that
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

   It prints one row for each map the overlay adds and each reference program (23 programs, about 55
   seconds for one map). Narrow it with `--maps <id>` and `--programs <id,id>`, or write the table
   with `--out <path>` outside the tracked files.
3. The columns are: the map's name in the game's data, the program's label, the share solved on
   seeds 1-500, the median game minutes of the solved runs, the deaths by cause and the runs at the
   cap, and the earning loop over 24 real hours on seeds 1-100 with resurrection ready: pieces taken
   from the chest per map run, pieces put into it per map run, and the share of map runs that end in
   death. The label is `P1`, `P2`... : the program's number in the list that `programs` prints, the
   same whichever programs `--programs` narrows to. The table shows no condition, action, rule or
   identifier of any program, because an identifier can state the rules of its program in other
   words: the person who plays the game gets this table, and the programs and the key from label to
   identifier stay with the agent. A row reads:

   ```
   | <map name> | P22 | <share> % | <minutes> | <cause n, cause n> | <runs> | <pieces> | <pieces> | <share> % |
   ```

   Every row runs with a new character's skills unless `--practice` or `--ranks` say otherwise, and
   those flags apply to all rows alike. A program that needs a branch of the skills measures near
   zero without it: `P22` lives on the branch „Czysty płomień” and on Pustkowie solved 0 of 50
   seeds without it and 47 of 50 with `--ranks cleanFlame=1`. Run such a program again with
   `--ranks` and `--programs <identifier>` and tell the person that its row was measured with the
   branch, before the person reads a row near zero as "the map cannot be passed".
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
a second more.
