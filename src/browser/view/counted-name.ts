/**
 * The one rule of the game for declining a name by its count in Polish, for a price, a counter or any
 * other count that stands before a noun. Pure; nothing runs when the module is imported.
 */

/** The form of a name that follows `count` in Polish: 1 takes `one`, 2 to 4 `few` (not 12 to 14), every other count `many`. */
export function countedName(
  count: number,
  forms: { one: string; few: string; many: string },
): string {
  if (count === 1) return forms.one;
  const last = count % 10;
  const lastTwo = count % 100;
  return last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)
    ? forms.few
    : forms.many;
}
