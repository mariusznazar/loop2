import { advanceMinutes, createCharacter, send, setProgram } from "dist/browser/sim/game.js";
import { programFromRules } from "tests/sim/program-fixture.mjs";
import { newKnowingGame } from "tests/sim/understanding-fixture.mjs";
const A={kind:"always"};
const P=programFromRules({condition:A,action:{kind:"kick"}},{condition:A,action:{kind:"explore"}},{condition:A,action:{kind:"gather",resource:"stick"}},{condition:A,action:{kind:"wander"}});
const g={...newKnowingGame(),solvedMaps:["forest"]};
let s=send(createCharacter(setProgram(g,P).state,"Ala").state,{mapId:"forestDeep",characterId:1},1760000000008).state;
let att=null;
while(!s.run.death&&s.run.minute<600){const r=advanceMinutes(s,1);s=r.state;for(const e of r.events)if(e.kind==="attacked")att=e.minute;}
console.log(JSON.stringify({att,death:s.run.death,minute:s.run.minute,m:s.run.minutesByAction,l:s.run.longestStreak,streak:s.run.streak}));
