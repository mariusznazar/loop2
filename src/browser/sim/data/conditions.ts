export type ConditionDef = {
  label: string;
  unit?: string;
  /** Present only for a condition that takes a number. */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
};

export const CONDITIONS = {
  always: { label: "Zawsze" },
  hereBelow: {
    label: "Tu leży mniej niż",
    unit: "szt.",
    defaultValue: 1,
    min: 0,
    max: 50,
    step: 1,
  },
} as const satisfies Record<string, ConditionDef>;
