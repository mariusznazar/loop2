export function programFromRules(...rules) {
  return programWithRules(rules);
}

export function programWithRules(rules) {
  const identified = Array.isArray(rules)
    ? rules.map((rule, index) =>
        rule !== null && typeof rule === "object" && !Array.isArray(rule)
          ? { ...rule, id: index + 1 }
          : rule,
      )
    : rules;
  return {
    groups: [
      {
        id: 1,
        name: "Program",
        condition: { kind: "always" },
        rules: identified,
      },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 2,
    nextRuleId: Array.isArray(rules) ? rules.length + 1 : 1,
  };
}

export function programRules(program) {
  return program.groups[0].rules;
}

export function ruleActivity(action) {
  return { kind: "rule", ruleId: 1, action };
}
