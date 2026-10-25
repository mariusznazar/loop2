export function programFromRules(...rules) {
  return programWithRules(rules);
}

export function programWithRules(rules) {
  return { rules };
}

export function programRules(program) {
  return program.rules;
}
