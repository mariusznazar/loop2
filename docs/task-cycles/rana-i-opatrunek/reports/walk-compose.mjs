// Composes walk states of the task rana-i-opatrunek from the game's own functions (not played into).
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { writeFileSync } from "node:fs";
const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (n) => import(pathToFileURL(join(sim, n)).href);
const { newGame, createCharacter, send, withSaveTime } = await load("game.js");
const { savedGame, loadSavedGame } = await load("saved-game.js");
const { SKILLS } = await load("data/skills.js");
const { ACTIONS } = await load("data/actions.js");
const { CONDITIONS } = await load("data/conditions.js");
const { ITEMS } = await load("data/items.js");

const variant = process.argv[2];
const opts = JSON.parse(process.argv[3] ?? "{}");

function base(solved, chars) {
  let s = newGame(Date.now());
  for (const c of chars) s = createCharacter(s, c.name).state;
  s = {
    ...s,
    solvedMaps: solved,
    understanding: {
      trees: Object.keys(SKILLS),
      actions: Object.keys(ACTIONS),
      conditions: Object.keys(CONDITIONS),
      items: Object.keys(ITEMS),
      creatures: ["wolf"],
    },
    team: {
      ...s.team,
      chest: { pieces: { bandage: 3, moss: 4, stick: 6, berry: 3 } },
      characters: s.team.characters.map((ch, i) => ({
        ...ch,
        skills: {
          ...ch.skills,
          tending: { practice: chars[i].tending, ranks: {} },
        },
        gear: { ...ch.gear, ...(chars[i].gear ?? {}) },
      })),
    },
  };
  return s;
}
const rule = (id, condition, action) => ({ id, condition, action });
function programWith(groups, take) {
  return {
    tripPlan: { take: take ?? [], bring: [] },
    groups,
    nextGroupId: groups.length + 1,
    nextRuleId: 20,
  };
}
const always = { kind: "always" };
let s;
if (variant === "tree") {
  s = base(["forestEdge", "forest", "forestDeep"], [
    { name: "Agent", tending: 110 },
    { name: "Medyk", tending: 110, gear: { mainHand: "stick", pocket1: "bandage" } },
    { name: "Uczen", tending: 20 },
  ]);
  const p2 = programWith(
    [
      { id: 1, name: "Walka", condition: always, rules: [
        rule(1, { kind: "healthBelow", value: opts.below ?? 50 }, { kind: "pressure", item: "bandage" }),
        rule(2, always, { kind: "strikeWithStick" }),
      ] },
      { id: 2, name: "Poza walka", condition: always, rules: [rule(3, always, { kind: "explore" })] },
    ],
    [{ item: "bandage", count: 1 }, { item: "stick", count: 3 }],
  );
  s = { ...s, programs: [...s.programs, { id: 2, name: "Ucisk", program: p2, contentRevision: 0 }], nextProgramId: 3 };
} else if (variant === "practice") {
  s = base(["forestEdge"], [{ name: "Uczen", tending: 20 }]);
  const p = programWith(
    [{ id: 1, name: "Opatrunek", condition: always, rules: [
      rule(1, always, { kind: "craft", item: "bandage" }),
      ...(opts.noTend ? [] : [rule(2, { kind: "healthBelow", value: 100 }, { kind: "tend", item: "bandage" })]),
      rule(3, always, { kind: "explore" }),
    ] }],
    [{ item: "moss", count: 2 }],
  );
  const uc = s.team.characters[0];
  s = { ...s, programs: [{ ...s.programs[0], name: "Opatrunek", program: p }], team: { ...s.team, characters: [{ ...uc, skills: { ...uc.skills, tending: { practice: 20, ranks: opts.noRank ? {} : { deftHand: 1 } } } }] } };
  const sent = send(s, { mapId: "forest", characterId: 1 }, 0).state;
  const near = opts.near ? { minute: 400, streak: 400, attackCooldownStart: 400, ...(opts.fire ? { campfires: [{ at: sent.run.character.at, minutesLeft: 400 }] } : {}), current: sent.run.current && { ...sent.run.current, startMinute: 400, endMinute: 400 + (sent.run.current.endMinute - sent.run.current.startMinute) } } : {};
  const mba = { ...sent.run.minutesByAction }; if (opts.near) { const k = Object.keys(mba)[0]; mba[k] = (mba[k] ?? 0) + 400; }
  s = { ...sent, run: { ...sent.run, ...near, ...(opts.near ? { longestStreak: 400, minutesByAction: mba } : {}), body: { ...sent.run.body, health: 60 } } };
} else if (variant === "fight") {
  s = base(["forestEdge", "forest", "forestDeep"], [
    { name: "Medyk", tending: 110, gear: { mainHand: "stick", ...(opts.noBandage ? {} : { pocket1: "bandage" }) } },
  ]);
  const ch = s.team.characters[0];
  s = { ...s, team: { ...s.team, characters: [{ ...ch, skills: { ...ch.skills, tending: { practice: 110, ranks: { pressure: 1, ...(opts.roll ? { strongerRoll: opts.roll } : {}) } } } }] } };
  const p = programWith(
    [{ id: 1, name: "Walka", condition: always, rules: [
      rule(1, opts.always ? always : { kind: "healthBelow", value: opts.below ?? 50 }, { kind: "pressure", item: "bandage" }),
      rule(2, always, { kind: "strikeWithStick" }),
    ] }],
    [...(opts.noBandage ? [] : [{ item: "bandage", count: 1 }]), { item: "stick", count: 3 }],
  );
  s = { ...s, programs: [{ ...s.programs[0], name: "Ucisk", program: p }] };
  const sent = send(s, { mapId: "forestPack", characterId: 1 }, 0).state;
  const run = sent.run;
  const combat = { creatureId: "wolf", attackMinute: run.minute, resolveMinute: run.minute + (opts.minutes ?? 6) };
  s = { ...sent, run: { ...run, current: null, activeCombat: combat, lastCombat: { ...combat, result: null }, body: { ...run.body, health: opts.health ?? 30 } } };
} else if (variant === "pack") {
  s = base(["forestEdge", "forest", "forestDeep"], [{ name: "Neutral", tending: 0 }]);
} else throw new Error("variant");
const doc = savedGame(withSaveTime(s, Date.now()));
const loaded = loadSavedGame(JSON.parse(JSON.stringify(doc)));
writeFileSync(`.runs/walk/state-${variant}.json`, JSON.stringify(doc), "utf8");
writeFileSync(`.runs/walk/state-${variant}.check.txt`, JSON.stringify({ ok: loaded.ok ?? loaded, kind: Object.keys(loaded), v: doc.version }), "utf8");
console.log("written", variant, JSON.stringify(Object.keys(loaded)), loaded.refusal ?? "");
if (process.env.DUMP && s.run) writeFileSync(".runs/walk/rundump.txt", JSON.stringify({ keys: Object.keys(s.run), current: s.run.current, record: s.run.record, streak: s.run.streak, runChar: s.run.character.at }, null, 1), "utf8");
