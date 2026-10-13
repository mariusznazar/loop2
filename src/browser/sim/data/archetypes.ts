export type ArchetypeDef = {
  name: string;
};

export const ARCHETYPES = {
  elementalMage: { name: 'Mag żywiołów' },
} as const satisfies Record<string, ArchetypeDef>;

export type ArchetypeId = keyof typeof ARCHETYPES;
