import { nearestTile, neighbours, tileAt } from './hex.js';
import type { MapDef } from './data/maps.js';
import type { Action, Activity, Condition, Hex, MapRun, Program, ResourceId, Tile } from './types.js';

/** The part of a map run the program reads: never the generator, never the current activity. */
export type RunView = Pick<MapRun, 'tiles' | 'character'>;

/** The stock of a resource on the character's tile; an unrevealed tile counts as empty. */
function stockHere(run: RunView, resource: ResourceId): number {
  const here = tileAt(run.tiles, run.character.at);
  if (!here || !here.revealed) return 0;
  return here.stock[resource] ?? 0;
}

/** Whether a condition of a program rule holds now. */
export function conditionHolds(run: RunView, _map: MapDef, condition: Condition): boolean {
  switch (condition.kind) {
    case 'always':
      return true;
    case 'hereBelow':
      return stockHere(run, condition.resource) < condition.value;
  }
}

/** The tile a walk to a resource heads for: the nearest revealed tile holding some of it. */
export function walkTarget(run: RunView, resource: ResourceId): { tile: Tile; minutes: number; next: Hex } | null {
  return nearestTile(run.tiles, run.character.at, tile => tile.revealed && (tile.stock[resource] ?? 0) > 0);
}

/** Whether an action can start now. Never draws: the wander generator is left as it is. */
export function actionFeasible(run: RunView, _map: MapDef, action: Action): boolean {
  switch (action.kind) {
    case 'explore': {
      const here = tileAt(run.tiles, run.character.at);
      return here !== undefined && !here.revealed;
    }
    case 'wander':
      return neighbours(run.tiles, run.character.at).length > 0;
    case 'walkTo': {
      const target = walkTarget(run, action.resource);
      return target !== null && target.minutes > 0;
    }
  }
}

/** The first program rule whose condition holds and whose action is feasible; else a wait. */
export function chooseActivity(run: RunView, map: MapDef, program: Program): Activity {
  for (let ruleIndex = 0; ruleIndex < program.rules.length; ruleIndex += 1) {
    const rule = program.rules[ruleIndex]!;
    if (conditionHolds(run, map, rule.condition) && actionFeasible(run, map, rule.action)) {
      return { kind: 'rule', ruleIndex, action: { ...rule.action } };
    }
  }
  return { kind: 'wait' };
}
