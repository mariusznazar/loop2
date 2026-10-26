from pathlib import Path

def edit(path, change):
    with open(path, encoding="utf-8", newline="") as handle:
        old = handle.read()
    ending = "\r\n" if "\r\n" in old else "\n"
    new = change(old.replace("\r\n", "\n"))
    with open(path, "w", encoding="utf-8", newline="") as handle:
        handle.write(new.replace("\n", ending))

def types(text):
    text = text.replace('export type ProgramRule = { condition: Condition; action: Action };\n\nexport type Program = { rules: ProgramRule[] };', '''/** Stable within a program, including after a rule moves to another group. */
export type RuleId = number;
export type GroupId = number;

export type ProgramRule = { id: RuleId; condition: Condition; action: Action };

export type RuleGroup = {
  id: GroupId;
  name: string;
  condition: Condition;
  rules: ProgramRule[];
};

export type Program = {
  groups: RuleGroup[];
  /** Identities allocated to the next group and rule, never derived from their positions. */
  nextGroupId: GroupId;
  nextRuleId: RuleId;
};''')
    return text.replace('ruleIndex: number', 'ruleId: RuleId').replace('A condition of a program rule;', 'A condition of a program rule or group;')

edit('src/browser/sim/types.ts', types)

def game(text):
    start = text.index('/** A copy of the program built')
    end = text.index('\nfunction requireRun', start)
    text = text[:start] + '''/** A positive safe integer, so a stored identity remains exact. */
function checkIdentity(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1)
    throw new Error("program: an identity is not a positive safe integer");
  return value;
}

/** Each identity occurs once and precedes its next-identity counter. */
function uniqueIdentity(value: unknown, next: number, seen: Set<number>): number {
  const id = checkIdentity(value);
  if (id >= next || seen.has(id))
    throw new Error("program: an identity is duplicated or reaches its next counter");
  seen.add(id);
  return id;
}

/** A copy of the program built from the closed list; throws on anything outside it. */
function checkProgram(value: unknown, run: MapRun | null): Program {
  if (!isObject(value) || !Array.isArray(value.groups))
    throw new Error("program: no list of groups");
  const nextGroupId = checkIdentity(value.nextGroupId);
  const nextRuleId = checkIdentity(value.nextRuleId);
  const allowed = allowedResources(run);
  const groupIds = new Set<number>();
  const ruleIds = new Set<number>();
  const groups = value.groups.map((group: unknown) => {
    if (!isObject(group) || typeof group.name !== "string" ||
        !Array.isArray(group.rules) || Object.hasOwn(group, "groups"))
      throw new Error("program: a group must hold a name and a list of rules at one level");
    const id = uniqueIdentity(group.id, nextGroupId, groupIds);
    const condition = checkCondition(group.condition, allowed);
    const rules = group.rules.map((rule: unknown): ProgramRule => {
      if (!isObject(rule))
        throw new Error("program: a rule is not a pair of a condition and an action");
      return {
        id: uniqueIdentity(rule.id, nextRuleId, ruleIds),
        condition: checkCondition(rule.condition, allowed),
        action: checkAction(rule.action, allowed),
      };
    });
    return { id, name: group.name, condition, rules };
  });
  return { groups, nextGroupId, nextRuleId };
}
''' + text[end:]
    return text.replace('program: { rules: [] },', '''program: {
      groups: [{ id: 1, name: "Program", condition: { kind: "always" }, rules: [] }],
      nextGroupId: 2,
      nextRuleId: 1,
    },''')

edit('src/browser/sim/game.ts', game)

def program(text):
    start = text.index('  for (let ruleIndex')
    end = text.index('  return { kind: "wait" };', start)
    return text[:start] + '''  for (const group of program.groups) {
    if (!conditionHolds(run, map, group.condition)) continue;
    for (const rule of group.rules) {
      if (
        conditionHolds(run, map, rule.condition) &&
        actionFeasible(run, map, rule.action)
      ) {
        return { kind: "rule", ruleId: rule.id, action: { ...rule.action } };
      }
    }
  }
''' + text[end:]
edit('src/browser/sim/program.ts', program)

def fixture(text):
    return text.replace('  return { rules };', '''  const identified = Array.isArray(rules)
    ? rules.map((rule, index) =>
        rule !== null && typeof rule === "object" && !Array.isArray(rule)
          ? { ...rule, id: index + 1 }
          : rule,
      )
    : rules;
  return {
    groups: [{ id: 1, name: "Program", condition: { kind: "always" }, rules: identified }],
    nextGroupId: 2,
    nextRuleId: Array.isArray(rules) ? rules.length + 1 : 1,
  };''').replace('return program.rules;', 'return program.groups[0].rules;').replace('ruleIndex: 0', 'ruleId: 1')
edit('tests/sim/program-fixture.mjs', fixture)

def python_fixture(text):
    return text.replace('    return {"rules": rules}', '''    identified = ([{**rule, "id": index + 1} if isinstance(rule, dict) else rule
                   for index, rule in enumerate(rules)] if isinstance(rules, list) else rules)
    return {
        "groups": [{"id": 1, "name": "Program", "condition": {"kind": "always"},
                    "rules": identified}],
        "nextGroupId": 2,
        "nextRuleId": len(rules) + 1 if isinstance(rules, list) else 1,
    }''').replace('return program["rules"]', 'return program["groups"][0]["rules"]')
edit('tests/invariants/program_fixture.py', python_fixture)

def editor(text):
    text = text.replace('  GameState,', '  GameState,\n  GroupId,\n  RuleGroup,')
    text = text.replace('| { row: number; control:', '| { groupId: GroupId; row: number; control:').replace('| { control: "add" };', '| { groupId: GroupId; control: "add" };')
    start = text.index('/** The program with one rule replaced;')
    end = text.index('/**\n * A new condition', start)
    text = text[:start] + '''/** The program with only the named group's rules replaced. */
function replaceRules(program: Program, groupId: GroupId, rules: ProgramRule[]): Program {
  return { ...program, groups: program.groups.map((group) =>
    group.id === groupId ? { ...group, rules } : group) };
}

/** The program with one rule replaced; the input and rule identity are kept. */
function replaceRule(program: Program, groupId: GroupId, index: number, rule: ProgramRule): Program {
  const group = program.groups.find((each) => each.id === groupId)!;
  return replaceRules(program, groupId, group.rules.map((each, at) => at === index ? rule : each));
}

/** „Dodaj regułę”: append „Zawsze → Eksploruj” to the named group with a fresh identity. */
export function addRule(program: Program, groupId: GroupId): Program | null {
  const group = program.groups.find((each) => each.id === groupId);
  if (!group) return null;
  return {
    ...replaceRules(program, groupId, [...group.rules, {
      id: program.nextRuleId, condition: { kind: "always" }, action: { kind: "explore" },
    }]),
    nextRuleId: program.nextRuleId + 1,
  };
}

/** „Usuń”: remove only the rule at `index` in the named group. */
export function removeRule(program: Program, groupId: GroupId, index: number): Program | null {
  const group = program.groups.find((each) => each.id === groupId);
  if (!group?.rules[index]) return null;
  return replaceRules(program, groupId, group.rules.filter((_, at) => at !== index));
}

/** Swap with the neighbour in the same group; null past either end. */
export function moveRule(program: Program, groupId: GroupId, index: number, offset: -1 | 1): Program | null {
  const group = program.groups.find((each) => each.id === groupId);
  const other = index + offset;
  if (!group || index < 0 || other < 0 || index >= group.rules.length || other >= group.rules.length)
    return null;
  const rules = [...group.rules];
  [rules[index], rules[other]] = [rules[other], rules[index]];
  return replaceRules(program, groupId, rules);
}

''' + text[end:]
    start = text.index('export function withConditionKind(')
    end = text.index('type RowView =', start)
    helpers = text[start:end]
    helpers = helpers.replace('  program: Program,\n  index:', '  program: Program,\n  groupId: GroupId,\n  index:')
    helpers = helpers.replace('program.rules[index]', 'program.groups.find((group) => group.id === groupId)?.rules[index]')
    helpers = helpers.replace('replaceRule(program, index,', 'replaceRule(program, groupId, index,')
    helpers = helpers.replace('  edit: StructuralEdit,\n', '  edit: StructuralEdit,\n  groupId: GroupId,\n')
    helpers = helpers.replace('{ row:', '{ groupId, row:').replace('{ control: "add" }', '{ groupId, control: "add" }')
    text = text[:start] + helpers + text[end:]
    start = text.index('  const list = document.createElement("ol");')
    end = text.index('\n  const conditionOptions', start)
    text = text[:start] + '''  const groupsElement = document.createElement("div");
  element.append(heading, groupsElement);
''' + text[end:]
    text = text.replace('let program: Program = { rules: [] };', 'let program: Program = { groups: [], nextGroupId: 1, nextRuleId: 1 };')
    text = text.replace('let rows: RowView[] = [];', '''let groups: { id: GroupId; element: HTMLElement; name: HTMLElement; condition: HTMLElement;
    add: HTMLButtonElement; rows: RowView[]; ruleIds: number[] }[] = [];''')
    text = text.replace('structural?: { edit: StructuralEdit; index: number }', 'structural?: { edit: StructuralEdit; groupId: GroupId; index: number }')
    text = text.replace('        structural.edit,\n        structural.index,\n        next.rules.length,', '        structural.edit,\n        structural.groupId,\n        structural.index,\n        next.groups.find((group) => group.id === structural.groupId)!.rules.length,')
    start = text.index('  addButton.addEventListener(')
    end = text.index('    const row: RowView =', start)
    text = text[:start] + '''  function createGroup(group: RuleGroup): typeof groups[number] {
    const section = document.createElement("section");
    const name = document.createElement("h3");
    const condition = document.createElement("p");
    const list = document.createElement("ol");
    list.className = "rules";
    const add = createButton("Dodaj regułę");
    const rows = group.rules.map((_, index) => createRow(group.id, index));
    for (const row of rows) {
      fillResources(row.conditionResource, offered, null);
      fillResources(row.actionResource, offered, null);
    }
    list.append(...rows.map((row) => row.element));
    section.append(name, condition, list, add);
    add.addEventListener("click", () => {
      const current = program.groups.find((each) => each.id === group.id);
      if (current) edit(addRule(program, group.id), { edit: "add", groupId: group.id, index: current.rules.length });
    });
    return { id: group.id, element: section, name, condition, add, rows,
      ruleIds: group.rules.map((rule) => rule.id) };
  }

  function createRow(groupId: GroupId, index: number): RowView {
''' + text[end:]
    start = text.index('  function createRow(')
    end = text.index('  /** Sets each control', start)
    row = text[start:end]
    row = row.replace('          program,\n          index,', '          program,\n          groupId,\n          index,')
    row = row.replace('(program, index,', '(program, groupId, index,').replace('(program, index)', '(program, groupId, index)')
    row = row.replace('program.rules[index]?.condition', 'program.groups.find((group) => group.id === groupId)?.rules[index]?.condition')
    row = row.replace('{ edit: "up", index }', '{ edit: "up", groupId, index }').replace('{ edit: "down", index }', '{ edit: "down", groupId, index }').replace('{ edit: "remove", index }', '{ edit: "remove", groupId, index }')
    text = text[:start] + row + text[end:]
    text = text.replace('    if (target.control === "add") {\n      addButton.focus();', '    const group = groups.find((each) => each.id === target.groupId);\n    if (!group) return;\n    if (target.control === "add") {\n      group.add.focus();').replace('    rows[target.row]?.[target.control].focus();', '    group.rows[target.row]?.[target.control].focus();')
    start = text.index('      if (rebuild || rows.length')
    end = text.index('      if (pendingFocus)', start)
    text = text[:start] + '''      if (rebuild || groups.length !== program.groups.length ||
        program.groups.some((group, index) => groups[index].id !== group.id ||
          groups[index].ruleIds.join() !== group.rules.map((rule) => rule.id).join())) {
        groups = program.groups.map(createGroup);
        groupsElement.replaceChildren(...groups.map((group) => group.element));
        rebuild = false;
      }
      program.groups.forEach((group, index) => {
        const view = groups[index];
        view.name.textContent = group.name;
        const condition = group.condition;
        const parts = [CONDITIONS[condition.kind].label];
        if ("value" in condition) parts.push(String(condition.value));
        if ("resource" in condition) parts.push(RESOURCES[condition.resource].name);
        if ("item" in condition) parts.push(ITEMS[condition.item].name);
        view.condition.textContent = parts.join(" · ");
        group.rules.forEach((rule, at) => showRule(view.rows[at], rule));
      });
''' + text[end:]
    text = text.replace('heading „Program”, one row per program rule', 'heading „Program”, each named group and its condition, one row per program rule')
    return text
edit('src/browser/view/program-editor.ts', editor)

import re

def unit_tests(text):
    text = text.replace('const program = (...rules) => ({ rules });', 'const program = programFromRules;')
    text = text.replace('import assert from', 'import { programFromRules } from "./program-fixture.mjs";\nimport assert from')
    text = text.replace('ruleIndex: 0', 'ruleId: 1').replace('ruleIndex: 1', 'ruleId: 2')
    return text.replace('rules.rules[0].action', 'rules.groups[0].rules[0].action')
edit('tests/sim/program.test.mjs', unit_tests)

def editor_tests(text):
    text = text.replace('const ALWAYS_EXPLORE = {', 'const ALWAYS_EXPLORE = {\n  id: 1,').replace('const BELOW_WANDER = {', 'const BELOW_WANDER = {\n  id: 2,').replace('const ALWAYS_WALK = {', 'const ALWAYS_WALK = {\n  id: 3,')
    text = text.replace('const THREE = { rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK] };', '''const THREE = {
  groups: [{ id: 1, name: "Program", condition: {kind: "always"}, rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK] }],
  nextGroupId: 2, nextRuleId: 4,
};''')
    start = text.index('test("„Dodaj regułę”')
    end = text.index('test("switching the condition', start)
    text = text[:start] + '''test("„Dodaj regułę” appends a fresh „Zawsze → Eksploruj” to the named group", () => {
  assert.deepEqual(addRule(newGame().program, 1).groups[0].rules, [ALWAYS_EXPLORE]);
  const before = copy(THREE);
  const added = addRule(THREE, 1);
  assert.deepEqual(added.groups[0].rules, [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK, { ...ALWAYS_EXPLORE, id: 4 }]);
  assert.equal(added.nextRuleId, 5);
  assert.deepEqual(THREE, before);
});

test("„Usuń” removes the rule at its position without reassigning identities", () => {
  assert.deepEqual(removeRule(THREE, 1, 1).groups[0].rules, [ALWAYS_EXPLORE, ALWAYS_WALK]);
  assert.deepEqual(removeRule(THREE, 1, 2).groups[0].rules, [ALWAYS_EXPLORE, BELOW_WANDER]);
  const single = {...THREE, groups: [{...THREE.groups[0], rules: [ALWAYS_WALK]}]};
  assert.deepEqual(removeRule(single, 1, 0).groups[0].rules, []);
  assert.equal(removeRule(single, 1, 0).nextRuleId, 4);
});

test("„↑” and „↓” swap a rule with its neighbour; past either end nothing is committed", () => {
  const before = copy(THREE);
  assert.deepEqual(moveRule(THREE, 1, 1, -1).groups[0].rules, [BELOW_WANDER, ALWAYS_EXPLORE, ALWAYS_WALK]);
  assert.deepEqual(moveRule(THREE, 1, 1, 1).groups[0].rules, [ALWAYS_EXPLORE, ALWAYS_WALK, BELOW_WANDER]);
  assert.equal(moveRule(THREE, 1, 0, -1), null);
  assert.equal(moveRule(THREE, 1, 2, 1), null);
  assert.deepEqual(THREE, before);
});

''' + text[end:]
    # Migrate unchanged field semantics to the same explicit group id.
    start = text.index('test("switching the condition')
    head, tail = text[:start], text[start:]
    names = r'(?:withConditionKind|withConditionValue|withConditionResource|withConditionItem|withActionKind|withActionResource|moveRule|removeRule)'
    tail = re.sub(r'('+names+r'\()(THREE|program|gathering|switched|withKind\("[^"]+"\)),', r'\1\2, 1,', tail)
    tail = tail.replace('keep(addRule(program));', 'keep(addRule(program, 1));')
    tail = tail.replace('.rules', '.groups[0].rules')
    tail = tail.replace('let program = { rules: [] };', 'let program = newGame().program;')
    tail = tail.replace('''      {
        rules: [{ ...ALWAYS_EXPLORE, condition: switched("temperatureBelow") }],
      },
      0,''', '''      { ...THREE, groups: [{ ...THREE.groups[0], rules: [{ ...ALWAYS_EXPLORE, condition: switched("temperatureBelow") }] }] },
      1,
      0,''')
    # Whole-rule expectations keep the same identity; no semantic expectation is removed.
    tail = tail.replace('LAS).groups[0].rules[0], {\n    condition:', 'LAS).groups[0].rules[0], {\n    id: 1,\n    condition:')
    tail = tail.replace('LAS).groups[0].rules[1], {\n    condition:', 'LAS).groups[0].rules[1], {\n    id: 2,\n    condition:')
    tail = tail.replace('gathering.groups[0].rules[0], {\n    condition:', 'gathering.groups[0].rules[0], {\n    id: 1,\n    condition:')
    tail = tail.replace('switched.groups[0].rules[2], {\n      condition:', 'switched.groups[0].rules[2], {\n      id: 3,\n      condition:')
    tail = tail.replace('withConditionResource(THREE, 1, 1, "fiber"), {\n    rules:', 'withConditionResource(THREE, 1, 1, "fiber").groups[0].rules,')
    # The assertion above compares the explicit rules; metadata and other groups get their own checks below.
    tail = tail.replace('''      ALWAYS_WALK,
    ],
  });
  assert.deepEqual(withConditionValue''', '''      ALWAYS_WALK,
    ],
  );
  assert.deepEqual(withConditionValue''')
    tail = re.sub(r'focusAfter\(("[^"]+"),', r'focusAfter(\1, 23,', tail)
    tail = tail.replace('{ row:', '{ groupId: 23, row:').replace('{ control: "add" }', '{ groupId: 23, control: "add" }')
    return head + tail
edit('tests/view/program-editor.test.mjs', editor_tests)

def pick_checker(text):
    text = text.replace('import loop2_invariant_support as support', 'import loop2_invariant_support as support\nfrom program_fixture import program_from_rules')
    text = re.sub(r'\{"rules": (\[.*?\])\}', r'program_from_rules(\1)', text, flags=re.S)
    text = text.replace('ruleIndex', 'ruleId')
    text = text.replace('EXPLORING_FROM_0_BY_2', 'EXPLORING_FROM_0_BY_3')
    text = text.replace('"ruleId": 2, "action": EXPLORE},\n                         "startMinute"', '"ruleId": 3, "action": EXPLORE},\n                         "startMinute"')
    text = text.replace('expected = 1 if can_go(run, resource) else 2 if not here["revealed"] else 3', 'expected = 2 if can_go(run, resource) else 3 if not here["revealed"] else 4')
    text = text.replace('"ruleId": 0', '"ruleId": 1').replace('"ruleId": 1, "action": EXPLORE})\n\n    def test_every', '"ruleId": 2, "action": EXPLORE})\n\n    def test_every')
    text = text.replace('{1, 2, 3} <= started', '{2, 3, 4} <= started').replace('among rules 1 to 3', 'among rules 2 to 4')
    text = text.replace('activity["ruleId"] = 3 if activity["ruleId"] != 3 else 2', 'activity["ruleId"] = 4 if activity["ruleId"] != 4 else 3')
    text = text.replace('with that rule\'s index and action', 'with that rule\'s stable identity and copied action')
    text = text.replace('carry out the first program rule whose condition holds and which the character can carry out\nthen, and carries out no program rule in a free game minute in which none has both.', 'carry out the first feasible rule whose condition holds, in the first group whose condition holds\nand offers such a rule. Empty and infeasible groups pass on; no qualifying group means waiting.')
    # Keep prose rule references aligned with the deterministic fixture ids.
    for old, new in [('rule 3', 'rule FOUR'), ('rule 2', 'rule THREE'), ('rule 1', 'rule TWO'), ('rule 0', 'rule ONE')]:
        text = text.replace(old, new)
    text = text.replace('rule FOUR','rule 4').replace('rule THREE','rule 3').replace('rule TWO','rule 2').replace('rule ONE','rule 1')
    text = text.replace('rules 0 and 1', 'rules 1 and 2').replace('rules 1, 2 and 3', 'rules 2, 3 and 4')
    text = text.replace('must be 1 where going\n  is possible, else 2 where the tile is not revealed, else 3', 'must be 2 where going\n  is possible, else 3 where the tile is not revealed, else 4')
    return text
edit('tests/invariants/test_program_rule_pick.py', pick_checker)

def strengthen_picker(text):
    text = text.replace('''        if activity.get("kind") != "rule" or activity.get("ruleId") != expected:
''', '''        expected_action = walk_to(resource) if expected == 2 else EXPLORE if expected == 3 else WANDER
        if (activity.get("kind") != "rule" or activity.get("ruleId") != expected
                or activity.get("action") != expected_action):
''')
    marker = '        middle = copying.deepcopy(runs)'
    text = text.replace(marker, '''        wrong_action = copying.deepcopy(runs)
        wrong_action[index]["current"]["activity"]["action"] = {"kind": "eat"}
        self.assertTrue(long_violations(wrong_action, "berry"),
                        "a matching identity with the wrong action goes unseen")
''' + marker)
    text = text.replace('Does NOT cover: conditions', '''The grouped scenario skips a false outer condition, an empty group and an infeasible group,
then skips a false rule and chooses rule id 74 before a later feasible rule and group. Stable
identities deliberately differ from positions. The original long scenarios use one always group.

Does NOT cover: conditions''')
    return text
edit('tests/invariants/test_program_rule_pick.py', strengthen_picker)

def closed_docs(text):
    return text.replace('  with valid fields, is taken in as offered', '  with valid fields, including all seven kinds on groups, is taken in as offered').replace('in rule 1 of three, between two valid rules, once bare', 'in rule 1 of three, between two valid rules, and on a group between valid groups, once bare')
edit('tests/invariants/test_program_closed_lists.py', closed_docs)
