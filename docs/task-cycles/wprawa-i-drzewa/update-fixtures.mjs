import fs from "node:fs";
import ts from "typescript";
const files = ["tests/sim/discovery.test.mjs", "tests/sim/repertoire.test.mjs", "tests/sim/completion.test.mjs", "tests/sim/encounters.test.mjs", "tests/view/status-row.test.mjs", "tests/view/program-editor.test.mjs"];
const mapping = {exploration:["explore"],smallItemGathering:["gather","patrol"],campfireCrafting:["craftCampfire","feedCampfire"],eating:["eat"],flameSpell:["lightCampfire","lightItem"],oneHandedCombat:["strikeWithStick"],kicking:["kick"],dodging:["dodge"]};
for (const file of files) {
  let text = fs.readFileSync(file,"utf8");
  const ast = ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const changes=[];
  function visit(node) {
    if(ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(ast),p]));
      if(["actions","conditions","items","creatures"].every(key=>props.has(key))&&!props.has("trees")) {
        const actions = props.get("actions").initializer;
        let trees="[]";
        if(file.includes("discovery") || file.includes("encounters")) {
          if(ts.isArrayLiteralExpression(actions)) {
            const kinds=actions.elements.filter(ts.isStringLiteral).map(e=>e.text);
            trees=JSON.stringify(Object.keys(mapping).filter(id=>mapping[id].some(kind=>kinds.includes(kind))));
          } else if(actions.getText(ast)==="row.actions") trees="row.trees";
        }
        if(file.includes("completion")&&actions.getText(ast)==="result.events[found].actions") trees="result.events[found].trees";
        changes.push({pos:props.get("creatures").getStart(ast),text:`trees: ${trees},\r\n`});
      }
    }
    ts.forEachChild(node,visit);
  }
  visit(ast);
  for(const change of changes.sort((a,b)=>b.pos-a.pos)) text=text.slice(0,change.pos)+change.text+text.slice(change.pos);
  if(file.includes("discovery")||file.includes("encounters")) {
    text=text.replaceAll('"walkTo", "gather"','"walkTo", "gather", "patrol"');
  }
  if(file.includes("status-row")) text=text.replaceAll('Odkryto: Eksploruj, Wędruj. W regułach','Odkryto: Eksploruj, Wędruj, drzewo umiejętności Eksploracja. W regułach');
  if(file.includes("program-editor")) {
    text=text.replace('offeredActionKinds(everything), Object.keys(ACTIONS)', 'offeredActionKinds(everything), Object.keys(ACTIONS).filter((kind) => kind !== "patrol")');
    text=text.replace('"gather",\r\n    ...CAMPFIRE_AND_BACKPACK','"gather",\r\n    "patrol",\r\n    ...CAMPFIRE_AND_BACKPACK');
    text=text.replace('actionKind === "walkTo" || actionKind === "gather"','actionKind === "walkTo" || actionKind === "gather" || actionKind === "patrol"');
  }
  fs.writeFileSync(file,text,"utf8");
}
