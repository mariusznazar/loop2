export type ArchetypeDef = {
  name: string;
};

export const ARCHETYPES = {
  elementalMage: { name: "Mag żywiołów" },
} as const satisfies Record<string, ArchetypeDef>;

export type ArchetypeId = keyof typeof ARCHETYPES;

/** The archetype of every character the player creates. */
export const CREATED_ARCHETYPE: ArchetypeId = "elementalMage";
