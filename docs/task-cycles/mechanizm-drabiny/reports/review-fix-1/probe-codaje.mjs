// Prints the map ids of each group of the view „Co daje” of the catalog where Las — głębiej II is
// solved and Las — wataha, which stands before it in the game maps' data, is not, beside the order of
// the data, to see whether a group shows its maps in the data's order (D-466, third sentence).
import { writeFileSync } from "node:fs";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { catalogLines } from "../../dist/browser/view/catalog-lines.js";

const lines = catalogLines({
  solvedMaps: ["forestEdge", "forest", "forestDeep", "forestDeep2"],
  query: "",
  view: "coDaje",
  unfolded: [],
  foldedInSearch: [],
  selected: null,
  recordOf: () => null,
});
const out = [`data order: ${Object.keys(MAPS).join(", ")}`];
const groups = lines.groups ?? lines.resources ?? lines.coDaje ?? [];
for (const group of groups)
  out.push(
    `${group.resource}: ${group.rows.map((row) => `${row.id}${row.solved ? "(solved)" : ""}`).join(", ")}`,
  );
if (groups.length === 0) out.push(`keys: ${Object.keys(lines).join(", ")}`);
writeFileSync(process.argv[2], `${out.join("\n")}\n`, "utf8");
