export type ResourceDef = {
  /** Name shown to the player. */
  name: string;
  /** File name in assets/icons, without the extension. */
  icon: string;
};

export const RESOURCES = {
  stick: { name: 'patyk', icon: 'wood-stick' },
  berry: { name: 'jagoda', icon: 'berry-bush' },
  moss: { name: 'mech', icon: 'fern' },
  fiber: { name: 'włókno', icon: 'flax' },
} as const satisfies Record<string, ResourceDef>;

export type ResourceId = keyof typeof RESOURCES;
