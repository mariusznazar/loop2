// The entries of a change of the copy (D-342, D-348, D-292): the
// comparison of the copy's program before an act and after it, with the hint of a move the editor
// gives. The programs are written out by hand, so each case states the words it expects (D-73): the
// numbers are the editor's, the group's number and the rule's in the group (D-292), and a sentence
// is the rule's row, „{condition} → {action}”, in the words of the data's labels.
import assert from "node:assert/strict";
import { test } from "node:test";
import { copyChangeTexts } from "../../dist/browser/view/chronicle-entries.js";

const ALWAYS = { kind: "always" };
const rule = (id, action, condition = ALWAYS) => ({ id, condition, action });
const group = (id, name, rules, condition = ALWAYS) => ({
  id,
  name,
  condition,
  rules,
});

// Group 1 „Ogień”: 1.1 „Zawsze → Eksploruj”, 1.2 „Zawsze → Zbierz — Patyk”,
// 1.3 „Zawsze → Wytwórz — ognisko”. Group 2 „Głód”: 2.1 „Zawsze → Zjedz — jagoda”,
// 2.2 „Zawsze → Wędruj”. Rule ids do not follow the places, so a number counted from an id shows.
const R_EXPLORE = rule(11, { kind: "explore" });
const R_STICK = rule(7, { kind: "gather", resource: "stick" });
const R_CRAFT = rule(3, { kind: "craftCampfire" });
const R_EAT = rule(20, { kind: "eat" });
const R_WANDER = rule(5, { kind: "wander" });

/** A program of the given groups, its trip plan empty unless given. */
function program(groups, tripPlan = { take: [], bring: [] }) {
  return { groups, tripPlan, nextGroupId: 10, nextRuleId: 30 };
}

const fire = (rules = [R_EXPLORE, R_STICK, R_CRAFT]) =>
  group(1, "Ogień", rules);
const hunger = (rules = [R_EAT, R_WANDER]) => group(2, "Głód", rules);
const BEFORE = program([fire(), hunger()]);

// Catches a number counted from the rule's id or before the act, or a sentence missing its condition.
test("a rule added at the end of the second group gives its number and sentence after the act", () => {
  const after = program([
    fire(),
    hunger([R_EAT, R_WANDER, rule(30, { kind: "wander" })]),
  ]);
  assert.deepEqual(copyChangeTexts(BEFORE, after, null), [
    "Dodano regułę 2.3: Zawsze → Wędruj",
  ]);
});

// Catches the number after the act („1.2” of the rule that took the place), or an entry for the rule
// whose number fell from 1.3 to 1.2 only because another went.
test("a rule removed gives its number and sentence before the act, and the rule moving up gives none", () => {
  const after = program([fire([R_EXPLORE, R_CRAFT]), hunger()]);
  assert.deepEqual(copyChangeTexts(BEFORE, after, null), [
    "Usunięto regułę 1.2: Zawsze → Zbierz — Patyk",
  ]);
});

// Catches the whole sentence before or after left out, or a change of the condition missed.
test("a rule whose action or condition changed gives the whole sentence before, an arrow and the whole sentence after", () => {
  const action = program([
    fire([rule(11, { kind: "wander" }), R_STICK, R_CRAFT]),
    hunger(),
  ]);
  assert.deepEqual(copyChangeTexts(BEFORE, action, null), [
    "Zmieniono regułę 1.1: Zawsze → Eksploruj → Zawsze → Wędruj",
  ]);
  const condition = program([
    fire(),
    hunger([
      rule(20, { kind: "eat" }, { kind: "satietyBelow", value: 40 }),
      R_WANDER,
    ]),
  ]);
  assert.deepEqual(copyChangeTexts(BEFORE, condition, null), [
    "Zmieniono regułę 2.1: Zawsze → Zjedz — jagoda → Sytość poniżej 40 → Zjedz — jagoda",
  ]);
});

// Catches the swapped neighbour named in place of the rule the player moved: „↓” on 1.1 and „↑” on
// 1.2 give the same two copies, and only the hint tells them apart.
test("a swap of two neighbours names the rule the hint names, and only that one", () => {
  const swapped = program([fire([R_STICK, R_EXPLORE, R_CRAFT]), hunger()]);
  assert.deepEqual(
    copyChangeTexts(BEFORE, swapped, { kind: "rule", ruleId: 11 }),
    ["Przesunięto regułę 1.1 na 1.2: Zawsze → Eksploruj"],
  );
  assert.deepEqual(
    copyChangeTexts(BEFORE, swapped, { kind: "rule", ruleId: 7 }),
    ["Przesunięto regułę 1.2 na 1.1: Zawsze → Zbierz — Patyk"],
  );
});

// Catches a swap with no hint giving two entries, or none: the copies say one rule moved.
test("a swap of two neighbours with no hint gives one entry of a move", () => {
  const swapped = program([fire([R_STICK, R_EXPLORE, R_CRAFT]), hunger()]);
  const texts = copyChangeTexts(BEFORE, swapped, null);
  assert.equal(texts.length, 1);
  assert.match(texts[0], /^Przesunięto regułę 1\.[12] na 1\.[12]: /);
});

// Catches the rules whose numbers shifted named as moved: only the dragged rule changed its order
// against the others, which kept theirs.
test("a rule dragged from the start to the end of its group with no hint is the one rule moved", () => {
  const after = program([fire([R_STICK, R_CRAFT, R_EXPLORE]), hunger()]);
  assert.deepEqual(copyChangeTexts(BEFORE, after, null), [
    "Przesunięto regułę 1.1 na 1.3: Zawsze → Eksploruj",
  ]);
});

// Catches a move across groups missed with no hint, or the rules of the second group, whose numbers
// grew by one, named as moved („↓” on the last rule of a group, D-297).
test("a rule moved into the next group is named with its numbers before and after, and no other rule is", () => {
  const after = program([
    fire([R_EXPLORE, R_STICK]),
    hunger([R_CRAFT, R_EAT, R_WANDER]),
  ]);
  const expected = [
    "Przesunięto regułę 1.3 na 2.1: Zawsze → Wytwórz — ognisko",
  ];
  assert.deepEqual(copyChangeTexts(BEFORE, after, null), expected);
  assert.deepEqual(
    copyChangeTexts(BEFORE, after, { kind: "rule", ruleId: 3 }),
    expected,
  );
});

// Catches an entry for each rule of a removed group, or a group named by its number.
test("a group removed with its rules gives one entry with the group's name and none for its rules", () => {
  const after = program([hunger()]);
  assert.deepEqual(copyChangeTexts(BEFORE, after, null), [
    "Usunięto grupę „Ogień”",
  ]);
});

test("a group added gives its name", () => {
  const after = program([fire(), hunger(), group(9, "Woda", [])]);
  assert.deepEqual(copyChangeTexts(BEFORE, after, null), [
    "Dodano grupę „Woda”",
  ]);
});

// Catches the old name given for a renamed group, or a change of a group's condition missed.
test("a group renamed or given another condition gives its name after the act", () => {
  const renamed = program([group(1, "Ciepło", fire().rules), hunger()]);
  assert.deepEqual(copyChangeTexts(BEFORE, renamed, null), [
    "Zmieniono grupę „Ciepło”",
  ]);
  const conditioned = program([
    group(1, "Ogień", fire().rules, { kind: "temperatureBelow", value: 30 }),
    hunger(),
  ]);
  assert.deepEqual(copyChangeTexts(BEFORE, conditioned, null), [
    "Zmieniono grupę „Ogień”",
  ]);
});

// Catches the group not dragged named as moved, or entries for the rules whose numbers changed with
// their group's.
test("a group dragged above its neighbour names the group the hint names, and none of the rules", () => {
  const after = program([hunger(), fire()]);
  assert.deepEqual(
    copyChangeTexts(BEFORE, after, { kind: "group", groupId: 2 }),
    ["Przesunięto grupę „Głód”"],
  );
  assert.deepEqual(
    copyChangeTexts(BEFORE, after, { kind: "group", groupId: 1 }),
    ["Przesunięto grupę „Ogień”"],
  );
  const texts = copyChangeTexts(BEFORE, after, null);
  assert.equal(texts.length, 1);
  assert.match(texts[0], /^Przesunięto grupę „(Głód|Ogień)”$/);
});

test("a changed trip plan gives one entry that names no item", () => {
  const after = program([fire(), hunger()], {
    take: [{ item: "stick", count: 4 }],
    bring: [],
  });
  assert.deepEqual(copyChangeTexts(BEFORE, after, null), [
    "Zmieniono plan wyprawy",
  ]);
});

// Catches an entry for an act after which the copy is as it was, such as „↑” refused or a value
// typed again, and an entry for the identity counters alone.
test("an edit after which the copy is the same gives nothing", () => {
  assert.deepEqual(copyChangeTexts(BEFORE, structuredClone(BEFORE), null), []);
  assert.deepEqual(
    copyChangeTexts(
      BEFORE,
      { ...structuredClone(BEFORE), nextRuleId: 31 },
      { kind: "rule", ruleId: 11 },
    ),
    [],
  );
});
