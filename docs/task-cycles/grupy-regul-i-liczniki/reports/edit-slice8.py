from pathlib import Path

path = Path('src/browser/view/program-editor.ts')
with path.open(encoding='utf-8', newline='') as stream:
    text = stream.read()

start = text.index('/**\n * The rule\'s condition switched')
helper = '''/** A null row addresses the group's own condition, using the same controls as a rule. */
function conditionAt(program: Program, groupId: GroupId, index: number | null): Condition | undefined {
  const group = program.groups.find(each => each.id === groupId);
  return index === null ? group?.condition : group?.rules[index]?.condition;
}

function replaceCondition(program: Program, groupId: GroupId, index: number | null, condition: Condition): Program {
  const group = program.groups.find(each => each.id === groupId)!;
  return index === null
    ? { ...program, groups: program.groups.map(each => each.id === groupId ? { ...each, condition } : each) }
    : replaceRule(program, groupId, index, { ...group.rules[index], condition });
}

'''
text = text[:start] + helper + text[start:]
for name in ['withConditionKind', 'withConditionResource', 'withConditionItem', 'withConditionValue']:
    start = text.index('export function ' + name)
    end = text.index('\n}\n', start) + 3
    block = text[start:end].replace('index: number,', 'index: number | null,')
    lookup_start = block.index('  const rule =')
    lookup_end = block.index(';', lookup_start) + 1
    block = block[:lookup_start] + '  const previous = conditionAt(program, groupId, index);' + block[lookup_end:]
    block = block.replace('!rule', '!previous').replace('rule.condition', 'previous')
    block = block.replace('return replaceRule(program, groupId, index, { ...rule, condition });', 'return replaceCondition(program, groupId, index, condition);')
    for field in ['resource', 'item', 'value']:
        block = block.replace('return replaceRule(program, groupId, index, {\n    ...rule,\n    condition: { ...previous, ' + field + ' },\n  });', 'return replaceCondition(program, groupId, index, { ...previous, ' + field + ' });')
    text = text[:start] + block + text[end:]

text = text.replace('type RowView = {\n  element: HTMLLIElement;\n  count: HTMLSpanElement;', 'type ConditionView = {')
text = text.replace('  action: HTMLSelectElement;', '};\n\ntype RowView = ConditionView & {\n  element: HTMLLIElement;\n  count: HTMLSpanElement;\n  action: HTMLSelectElement;', 1)
text = text.replace('  element.append(heading, groupsElement);', '  const addGroupButton = createButton("Dodaj grupę");\n  element.append(heading, groupsElement, addGroupButton);')
text = text.replace('    name: HTMLElement;\n    condition: HTMLElement;', '    name: Field;\n    condition: ConditionView;\n    up: HTMLButtonElement;\n    down: HTMLButtonElement;\n    remove: HTMLButtonElement;')
text = text.replace('  let rebuild = true;', '  let draggedRuleId: number | null = null;\n  const dragType = "application/x-loop-rule";\n  let rebuild = true;')

start = text.index('  function createGroup(')
end = text.index('  function createRow(', start)
text = text[:start] + '''  function structuralEdit(next: Program | null, focus: FocusTarget): void {
    if (!next) return;
    rebuild = true;
    pendingFocus = focus;
    commit(next);
  }

  addGroupButton.addEventListener("click", () => structuralEdit(addGroup(program), {
    groupId: program.nextGroupId, control: "group-name",
  }));

  function dragOver(event: DragEvent): void {
    if (draggedRuleId === null || !event.dataTransfer) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
  }

  function drop(event: DragEvent, groupId: GroupId, beforeId?: number): void {
    event.stopPropagation();
    const id = draggedRuleId;
    draggedRuleId = null;
    if (id === null || event.dataTransfer?.getData(dragType) !== String(id)) return;
    event.preventDefault();
    const next = dropRule(program, id, groupId, beforeId);
    if (!next) return;
    const row = next.groups.find(group => group.id === groupId)!.rules.findIndex(rule => rule.id === id);
    structuralEdit(next, { groupId, row, control: "condition" });
  }

  function createGroup(group: RuleGroup): (typeof groups)[number] {
    const section = document.createElement("section");
    section.className = "rule-group";
    const header = document.createElement("div");
    header.className = "rule-group-header";
    const name = createTextField({ label: "Nazwa grupy", hint: "Nazwa grupy" });
    const condition = createConditionControls(group.id, null);
    const up = createButton("↑", { label: "Grupa w górę" });
    const down = createButton("↓", { label: "Grupa w dół" });
    const remove = createButton("Usuń", { kind: "destructive", label: "Usuń grupę" });
    header.append(name.element, up, down, remove);
    const conditionRow = document.createElement("div");
    conditionRow.className = "group-condition";
    conditionRow.append(condition.condition, condition.value.element, condition.conditionResource, condition.conditionItem);
    const list = document.createElement("ol");
    list.className = "rules";
    const add = createButton("Dodaj regułę");
    const rows = group.rules.map((_, index) => createRow(group.id, index));
    for (const row of rows) fillResources(row.actionResource, offered, null);
    list.append(...rows.map(row => row.element));
    section.append(header, conditionRow, list, add);
    name.input.addEventListener("change", () => edit(renameGroup(program, group.id, name.input.value)));
    up.addEventListener("click", () => structuralEdit(moveGroup(program, group.id, -1), { groupId: group.id, control: "group-up" }));
    down.addEventListener("click", () => structuralEdit(moveGroup(program, group.id, 1), { groupId: group.id, control: "group-down" }));
    remove.addEventListener("click", () => {
      const index = program.groups.findIndex(each => each.id === group.id);
      const next = removeGroup(program, group.id);
      const following = next?.groups[index];
      structuralEdit(next, following ? { groupId: following.id, control: "group-remove" } : { control: "add-group" });
    });
    section.addEventListener("dragover", dragOver);
    section.addEventListener("drop", event => drop(event, group.id));
    add.addEventListener("click", () => {
      const current = program.groups.find(each => each.id === group.id);
      if (current) edit(addRule(program, group.id), { edit: "add", groupId: group.id, index: current.rules.length });
    });
    return { id: group.id, element: section, name, condition, up, down, remove, add, rows, ruleIds: group.rules.map(rule => rule.id) };
  }

''' + text[end:]

start = text.index('    row.condition.addEventListener(')
end = text.index('    row.action.addEventListener(', start)
listeners = text[start:end]
listeners = listeners.replace('      const condition = program.groups.find((group) => group.id === groupId)\n        ?.rules[index]?.condition;', '      const condition = conditionAt(program, groupId, index);')
text = text[:start] + text[end:]
start = text.index('  function createRow(')
condition_factory = '''  function createConditionControls(groupId: GroupId, index: number | null): ConditionView {
    const row: ConditionView = {
      condition: createSelectList(index === null ? "Warunek grupy" : "Warunek", conditionOptions),
      value: createNumberField({ label: index === null ? "Liczba warunku grupy" : "Liczba", ...UNSET_RANGE }),
      conditionResource: createSelectList(index === null ? "Zasób warunku grupy" : "Zasób warunku"),
      conditionItem: createSelectList(index === null ? "Przedmiot warunku grupy" : "Przedmiot warunku", itemOptions),
    };
    fillResources(row.conditionResource, offered, null);
''' + listeners + '''    return row;
  }

'''
text = text[:start] + condition_factory + text[start:]
start = text.index('      condition: createSelectList("Warunek",')
end = text.index('      action: createSelectList', start)
text = text[:start] + '      ...createConditionControls(groupId, index),\n' + text[end:]
text = text.replace('    row.element.className = "rule";', '''    row.element.className = "rule";
    row.element.draggable = true;
    row.element.title = "Przeciągnij regułę na inną regułę lub na grupę";
    row.element.addEventListener("dragstart", event => {
      if (event.target instanceof Element && event.target.closest("input, select, button")) {
        event.preventDefault();
        return;
      }
      const rule = program.groups.find(group => group.id === groupId)?.rules[index];
      if (!rule || !event.dataTransfer) return;
      draggedRuleId = rule.id;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData(dragType, String(rule.id));
    });
    row.element.addEventListener("dragend", () => { draggedRuleId = null; });
    row.element.addEventListener("dragover", dragOver);
    row.element.addEventListener("drop", event => {
      const target = program.groups.find(group => group.id === groupId)?.rules[index];
      event.stopPropagation();
      if (target) drop(event, groupId, target.id);
    });''')

start = text.index('  function showRule(')
middle = text.index('    if (row.action.value', start)
condition_show = text[start:middle].replace('function showRule(row: RowView, rule: ProgramRule)', 'function showCondition(row: ConditionView, condition: Condition)').replace('    const { condition, action } = rule;\n', '')
text = text[:start] + condition_show + '  }\n\n  function showRule(row: RowView, rule: ProgramRule): void {\n    showCondition(row, rule.condition);\n    const action = rule.action;\n' + text[middle:]
text = text.replace('    const group = groups.find((each) => each.id === target.groupId);', '''    if (target.control === "add-group") { addGroupButton.focus(); return; }
    const group = groups.find((each) => each.id === target.groupId);''')
text = text.replace('    group.rows[target.row]?.[target.control].focus();', '''    if ("row" in target) { group.rows[target.row]?.[target.control].focus(); return; }
    switch (target.control) {
      case "group-name": group.name.input.focus(); break;
      case "group-up": group.up.focus(); break;
      case "group-down": group.down.focus(); break;
      case "group-remove": group.remove.focus(); break;
    }''')
start = text.index('        view.name.textContent = group.name;')
end = text.index('        group.rules.forEach(', start)
text = text[:start] + '''        if (view.name.input.value !== group.name) view.name.input.value = group.name;
        showCondition(view.condition, group.condition);
''' + text[end:]
with path.open('w', encoding='utf-8', newline='') as stream:
    stream.write(text)
