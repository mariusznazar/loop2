import { readFileSync, writeFileSync } from 'node:fs';
const path = 'foundations/decisions.md';
let text = readFileSync(path, 'utf8');
const newline = text.includes('\r\n') ? '\r\n' : '\n';
function change(id, revise) {
  const pattern = new RegExp(`(^### D-${id} — [\\s\\S]*?)(?=^### |$(?![\\s\\S]))`, 'm');
  if (!pattern.test(text)) throw new Error(`Missing ${id}`);
  text = text.replace(pattern, revise);
}
const origin = 'wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania)';
for (const [id, place] of [[63, 'Q9 and accepted settlement 5'], [64, 'Q10 and accepted settlement 6'], [120, 'Q3 and the accepted resolution under Settlements to record'], [144, 'Q8 and the accepted branch data']]) {
  change(id, entry => entry.replace(/(- \*\*Origin:\*\* )([^\r\n]+)/, (_, prefix, previous) => `${prefix}${previous === 'none' ? '' : previous + ' · '}${origin}, § Questions to settle, ${place}`));
}
change(64, entry => entry.replace('*Rejected:* ', '*Rejected:* „Mocne plecy” raising carrying capacity — would change the MVP capacity accepted in the definition; '));
change(120, entry => entry.replace('*Rejected:* ', '*Rejected:* reading the predisposition condition as only necessary while leaving the sentence unchanged — its plain reading would admit „Obchód” without buying the branch; '));
change(144, entry => entry.replace('deals 6 damage', 'deals a base 6 damage increased by its bought branch ranks').replace('deals 3 damage', 'deals a base 3 damage increased by its bought branch ranks').replace('reduction of 5 damage', 'reduction of a base 5 damage increased by its bought branch ranks'));
const entries = [
  [179, 'How does a character skill grow?',
    "A character skill grows by practice, which counts only its actions that ended in effect, and is never bought. A character skill has one practice counter and one curve, and what is saved of it is its practice and the ranks of branches bought, its level, free points and every effect being computed from these two. Each level gives points that buy ranks of branches of its own tree, at prices that differ from branch to branch, and each next level needs more practice than the one before.",
    'simulation · browser-view', 'none',
    'gathering that adds practice only when an item is gained; a level computed from saved practice',
    'a shop selling a level of a character skill; a missed gathering that adds practice; a second counter inside one character skill',
    'definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a character skill grow?"',
    'Practice ties growth to what the program actually does, so choosing a program is choosing what grows. Different branch prices distinguish an extra gathered piece from a higher chance. One counter keeps one growth economy inside a skill; a finer split takes another skill.',
    'buying skills with experience — one easy run would pay for another skill; counting attempts — rewards actions that change nothing; a separate trait counter — adds a second growth economy'],
  [180, 'What describes a character?',
    "A character is described by traits, character skills and the predispositions of its archetype. A number that acts in one action only belongs to the tree of that action's character skill, never to a trait.",
    'simulation · browser-view', 'none',
    "carrying capacity as a trait; accuracy with a one-handed weapon as a branch of that weapon's tree",
    'a "strength" trait that raises the damage of one weapon',
    'definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What describes a character?"',
    'The three roles distinguish numbers that act across actions, growth by doing, and access through an archetype.',
    'strength used only as carrying capacity; accuracy used for one weapon; learning speed multiplying growth; a trait that never grows and does nothing'],
  [181, 'When and how much practice does an action add?',
    'An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles. Eating has its effect when the berry is eaten, even at full satiety; a dodge has its effect when it removes some damage from an enemy strike, counted in the turn of that strike.',
    'simulation', 'derives from D-179',
    'a patrol bringing several pieces and adding one practice; eating a berry at full satiety adding one practice',
    'a dodge with no strike adding practice; practice for each tile a scout reveals',
    `${origin}, § Questions to settle, Q5 and Q9; accepted settlement 1`,
    'The counter measures successful actions, not their quantity. Accepted with it: eating at full satiety can grow eating, at the cost of berries.',
    'eating adding practice only when satiety rises — the accepted effect is the berry eaten'],
  [182, 'When does a manual map run pay its practice to its character?',
    'A manual map run holds the practice it gathers separately by character skill and pays all of it once to the character making the run in the game minute of every completion, including a completion of an already solved map. A death, or a run cut short by „Restart” or „Zakończ” before completion, leaves the character’s practice and bought ranks as they were.',
    'simulation', 'derives from D-179',
    'a second manual completion paying its practice in the completion minute; restart before completion paying nothing',
    'practice reaching the character during an unfinished run; „Zakończ” paying a completed run a second time',
    `${origin}, § Questions to settle, Q1; accepted settlements 2 and 12`,
    'Payment at completion makes the successful run the unit of growth. Accepted with it: manual repeats of solved maps can grow a character.',
    'only the first solution paying practice here — before earning loops this would leave at most two payments'],
  [183, 'When does a character skill tree become known?',
    'A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens. The discovery line names the tree beside the action, as „Odkryto: Eksploruj, Wędruj, drzewo umiejętności Eksploracja.”, followed by the sentence naming newly discovered conditions when the same game minute reveals one.',
    'simulation · browser-view', 'derives from D-118 · derives from D-122',
    'the first discovery of gathering also revealing its tree and „Obchód”',
    'a tree becoming known only on its first purchase; an unnamed tree in the discovery line',
    `${origin}, § Questions to settle, Q3 and Q4; accepted settlements 3 and 4`,
    'Discovery tells the player what the action can grow before the first point is earned. Accepted with it: longer discovery lines and known actions that no character can yet carry out.',
    'revealing a branch action on the first purchase — discovery would depend on a character’s purchase; showing the tree only at the first point; leaving the tree unnamed'],
  [184, 'Which branch actions does the program editor offer outside a map run?',
    'Outside a map run the program editor offers the repertoire computed from the Understanding through the archetype’s predispositions, without any branches bought by a character. During a map run, both the copy editor and the saved-program editor use the running character’s repertoire, including its bought branches.',
    'simulation · browser-view', 'derives from D-119 · derives from D-164',
    '„Obchód” offered in both editors during the run of its buyer and absent outside a run',
    'a branch bought by any teammate opening that action in the headquarters editor',
    `${origin}, § Questions to settle, Q3; accepted settlement 4`,
    'A program is shared, while a branch belongs to its buyer. Accepted with it: the headquarters editor cannot add a branch action; editing the copy resets progress, whereas editing a saved program prepares the next send.',
    'offering outside a run every branch any teammate bought — the shared editor would imply availability without choosing its character'],
  [185, 'What does the gathering branch Obchód do?',
    'The gathering tree has the branch „Obchód”, which opens „Obchód — {zasób}”: a guaranteed batch of the chosen resource from the current tile, up to the amount in the data, the tile’s remaining stock and the backpack’s remaining capacity. „Pełna garść” likewise takes no more pieces than remain on the tile or fit in the backpack.',
    'simulation', 'derives from D-119 · derives from D-64',
    'a patrol taking the six pieces left on its tile when the batch is twelve; a full-hand gather taking the last single piece',
    'requiring a full batch before patrol can start; taking missing pieces from neighbouring tiles',
    `${origin}, § Questions to settle, Q9 and Q13; accepted settlement 5`,
    'A guaranteed batch changes how the program gathers. Accepted with it: the full action time can bring a smaller batch from a depleted tile.',
    'requiring at least twelve pieces; filling a batch from neighbours; „Pełna garść” creating two pieces from one'],
  [186, 'What does the exploration branch Zwiad do?',
    'With the bought branch „Zwiad”, exploration reveals the current tile and its neighbours together, while still requiring the current tile to be unrevealed. Items on all tiles revealed in that game minute enter the Understanding together in its discovery pause.',
    'simulation · browser-view', 'derives from D-118 · derives from D-179',
    'a scout revealing a new neighbour’s item in the same discovery pause',
    'scouting from an already revealed current tile; one practice for every neighbour',
    `${origin}, § Questions to settle, Q9; accepted settlement 5`,
    'Scouting changes the exploration program’s reach. Accepted with it: it can reveal much of the small map quickly.',
    'only numerical branches, or only a selected subset of the non-numerical branches — omit the accepted changes to how programs work'],
  [187, 'What does the headquarters show of character skills?',
    'At each character the headquarters shows „Umiejętności” only after a tree is known, with a row for each known tree giving „{umiejętność} — poziom {p} · wprawa {w}/{próg} · punkty {k}”, or „{umiejętność} — poziom {p} (najwyższy) · wprawa {w} · punkty {k}” after its last threshold. Below it each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price without numerical before-and-after values. A fully bought branch keeps its present value if numerical and omits the next value and price.',
    'browser-view', 'derives from D-179',
    'a fully bought numerical branch showing its current value with a disabled „Kup”; the whole section absent before any tree is known',
    '„false → true” beside a non-numerical branch; a price for a fully bought branch',
    `${origin}, § Questions to settle, Q6 and Q11; accepted settlement 8`,
    'The player sees the current effect and the cost and effect of the next purchase where points are spent. Accepted with it: a longer headquarters and no preview of unknown trees.',
    'no numerical preview; „false → true” for non-numerical branches; „wykupiona” in place of the full-rank row; an empty-section note'],
  [188, 'Where does the player buy a branch rank, and when does it act?',
    'The player buys a branch rank with „Kup” in the headquarters outside a map run, and the rank acts from that character’s next map run. There is no purchase in the map-run view and no undo of a purchase.',
    'simulation · browser-view', 'derives from D-179',
    'a purchase reducing only its tree’s free points and affecting the buyer’s next send',
    'a purchase changing the skills of a retained run, including one ended in death or completion',
    `${origin}, § Questions to settle, Q6; accepted settlement 9`,
    'Purchases belong beside the character’s skills in the headquarters, and a run keeps the skills with which it starts.',
    'none'],
  [189, 'What does the map-run view show of its practice?',
    'Below the body row the map-run view shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, containing only skills with positive practice gathered in that run. The line is absent at zero and remains after death and completion until „Restart” or „Zakończ”.',
    'browser-view', 'derives from D-182',
    'the same positive practice line retained after death, although the run pays nothing',
    'zero-valued skills in the line; hiding the line immediately on completion',
    `${origin}, § Questions to settle, Q6 and Q12; accepted settlement 10`,
    'The player can see what the run grows and what it gathered before its end. Accepted with it: the line does not itself distinguish paid practice from practice lost on death.',
    'no run-practice line; hiding it on death; separate labels for payment and loss'],
];
for (const [id, question, binding, scope, relations, complies, violates, source, rationale, rejected] of entries) {
  text += `\n### D-${id} — ${question}\n\n${binding}\n\n- **Scope:** ${scope}\n- **Based on:** none\n- **Relations:** ${relations}\n- **Verification:** an agent compares a change with the decision:\n  - complies: ${complies}\n  - violates: ${violates}\n- **Origin:** ${source}\n\n*Rationale:* ${rationale}\n*Rejected:* ${rejected}\n`.replaceAll('\n', newline);
}
writeFileSync(path, text);
