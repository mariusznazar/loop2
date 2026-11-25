/**
 * The one rule of the game for declining a name by its count in Polish, for a price, a counter or any
 * other count that stands before a noun, and for the preposition „z” that stands before a count. Pure;
 * nothing runs when the module is imported.
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

/**
 * The preposition „z” before a count, as Polish says it: „ze” where the spoken number begins with s, z,
 * sz, ś, ź or ż — zero, 6, 7, 16, 17, 60 to 79, 100 to 199, 600 to 799 — and „z” otherwise („z 24”,
 * „z 50”, „z 200”).
 * A number from 1000 on is spoken from its thousands, so its thousands decide; 1000 begins with „tysiąc”.
 */
export function withPreposition(count: number): "z" | "ze" {
  if (count >= 1000) {
    const thousands = Math.floor(count / 1000);
    return thousands === 1 ? "z" : withPreposition(thousands);
  }
  if (count >= 100) {
    const hundreds = Math.floor(count / 100);
    return hundreds === 1 || hundreds === 6 || hundreds === 7 ? "ze" : "z";
  }
  const sibilant =
    count === 0 ||
    count === 6 ||
    count === 7 ||
    count === 16 ||
    count === 17 ||
    (count >= 60 && count <= 79);
  return sibilant ? "ze" : "z";
}
