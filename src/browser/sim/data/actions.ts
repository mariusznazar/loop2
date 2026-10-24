export type ActionDef = {
  label: string;
  /** Status text; for walkTo the resource name follows it. */
  status: string;
  /** Fixed duration in game minutes; null = taken from the target tile. */
  minutes: number | null;
};

export const ACTIONS = {
  explore: { label: "Eksploruj", status: "Eksploruje", minutes: 20 },
  wander: { label: "Wędruj", status: "Wędruje", minutes: null },
  walkTo: { label: "Idź", status: "Idzie po", minutes: null },
  gather: { label: "Zbierz", status: "Zbiera", minutes: 10 },
} as const satisfies Record<string, ActionDef>;
