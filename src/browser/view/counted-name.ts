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
 * The preposition „z” before a count, as Polish says it: „ze” where the first spoken word of the number is
 * „zero” or begins with „sze” or „st” — 0, 6, 16, 60 to 69, 100 to 199, 600 to 699 („ze sześciu”, „ze
 * stu”) — and „z” otherwise, before „siedem-” too („z siedmiu”, „z siedemnastu”, „z 24”). A number from
 * 1000 on is spoken from its leading group of thousands, millions and so on, so that group decides, and
 * a leading group of one is spoken „tysiąc” or „milion”, which takes „z”.
 */
export function withPreposition(count: number): "z" | "ze" {
  if (count >= 1000) {
    let leading = count;
    while (leading >= 1000) leading = Math.floor(leading / 1000);
    return leading === 1 ? "z" : withPreposition(leading);
  }
  if (count >= 100) {
    const hundreds = Math.floor(count / 100);
    return hundreds === 1 || hundreds === 6 ? "ze" : "z";
  }
  const spokenFromSzeOrZero =
    count === 0 || count === 6 || count === 16 || (count >= 60 && count <= 69);
  return spokenFromSzeOrZero ? "ze" : "z";
}
