export function programFromRules(...rules) {
  return programWithRules(rules);
}

export function programWithRules(rules) {
  return { rules };
}

export function programRules(program) {
  return program.rules;
}

export function ruleActivity(action) {
  return { kind: "rule", ruleIndex: 0, action };
}
