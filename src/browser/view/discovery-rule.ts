/**
 * The rule „Dodaj regułę z tym” adds in the band of a discovery (D-313). Pure: it reads a game state
 * and gives the copy's program with the rule added and the place the rule panel opens on it, and
 * draws nothing. It is built from the editor's own functions (`addRule`, `withActionKind`,
 * `withActionResource`, `withConditionKind`) and the targets they offer, so a pick in the rule panel
 * and this button give the same values.
 */
import type {
  Action,
  GameState,
  GroupId,
  Program,
  ResourceId,
} from "../sim/types.js";
import {
  addRule,
  offeredItems,
  offeredResources,
  withActionKind,
  withActionResource,
  withConditionKind,
} from "./program-editor.js";
import type { RulePanelOpen } from "./rule-panel.js";

/** The copy's program with the rule added, and where the rule panel opens on that rule. */
export type DiscoveryRule = { program: Program; open: RulePanelOpen };

/**
 * The rule the discovery held by the game writes, added at the end of the first rule group of the
 * copy the map run carries out; null where the game holds no map run or no discovery, or the copy
 * holds no rule group.
 *
 * Where the discovery holds an action, the rule is „Zawsze → {its first action}” and the panel opens
 * on the action; where the action names a resource, the resource is the first item of the same
 * discovery that the panel offers for it, else the first it offers. Where the discovery holds no
 * action but a condition, the rule is „{its first condition} → Eksploruj”, with the number and the
 * target a pick of that condition gives, and the panel opens on the condition. Where it holds
 * neither, the rule is the one „+ reguła” adds, with the panel on the condition (D-124). „First” is
 * the order the discovery holds. An action or a condition that needs a target no pick can name yet
 * gives way to the next one of the discovery.
 */
export function discoveryRule(state: GameState): DiscoveryRule | null {
  const { run, discovery } = state;
  const group = run?.copy.program.groups[0];
  if (!run || !discovery || !group) return null;
  const held = run.copy.program;
  const added = addRule(held, group.id);
  if (!added) return null;
  const place: Place = { groupId: group.id, index: group.rules.length };
  const opened = (field: "action" | "condition"): RulePanelOpen => ({
    groupId: group.id,
    ruleId: held.nextRuleId,
    field,
  });
  const resources = offeredResources(state);

  for (const kind of discovery.actions) {
    const program = withAction(added, place, kind, resources, discovery.items);
    if (program) return { program, open: opened("action") };
  }
  const items = offeredItems(state);
  for (const kind of discovery.conditions) {
    const program =
      ruleAt(added, place).condition.kind === kind
        ? added
        : withConditionKind(
            added,
            place.groupId,
            place.index,
            kind,
            resources,
            items,
          );
    if (program) return { program, open: opened("condition") };
  }
  return { program: added, open: opened("condition") };
}

/** Where the new rule stands: its group and its place in the group. */
type Place = { groupId: GroupId; index: number };

function ruleAt(program: Program, place: Place) {
  return program.groups.find((group) => group.id === place.groupId)!.rules[
    place.index
  ];
}

/**
 * `program` with the new rule's action switched to `kind`, and for an action that names a resource
 * the resource chosen: the first item of the discovery among `resources`, else the first of them,
 * which the switch took. Null where the action names a resource and `resources` holds none.
 */
function withAction(
  program: Program,
  place: Place,
  kind: Action["kind"],
  resources: readonly ResourceId[],
  found: readonly string[],
): Program | null {
  const switched =
    ruleAt(program, place).action.kind === kind
      ? program
      : withActionKind(program, place.groupId, place.index, kind, resources);
  if (!switched || !("resource" in ruleAt(switched, place).action))
    return switched;
  for (const item of found) {
    const resource = resources.find((each) => each === item);
    if (resource !== undefined)
      return (
        withActionResource(switched, place.groupId, place.index, resource) ??
        switched
      );
  }
  return switched;
}
