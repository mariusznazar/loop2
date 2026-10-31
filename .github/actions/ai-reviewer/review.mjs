// Reviews the diff of one pull request and writes the comment and the verdict for the workflow.
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { openai } from "@ai-sdk/openai";
import { costOf, renderComment, runReview, trimDiff, verdictOf } from "./lib.mjs";

// USD per 1M tokens of the default model, from the OpenAI pricing page.
const PRICES = { input: 1, output: 5 };

const { REVIEW_MODEL, PR_TITLE, PR_BODY, DIFF_FILE, COMMENT_FILE, GITHUB_OUTPUT } = process.env;

const { text: diff, truncated } = trimDiff(readFileSync(DIFF_FILE, "utf8"));
console.log(`Diff: ${diff.length} characters${truncated ? ", truncated" : ""}`);

if (diff.trim() === "") {
  writeFileSync(COMMENT_FILE, "## AI Code Review\n\nW diffie nie ma nic do oceny.\n");
  appendFileSync(GITHUB_OUTPUT, "verdict=pass\n");
  console.log("Nothing to review, no model call was made");
  process.exit(0);
}

console.log(`Running code review with ${REVIEW_MODEL}`);
const { review, usage } = await runReview({
  model: openai(REVIEW_MODEL),
  title: PR_TITLE,
  body: PR_BODY,
  diff,
  truncated,
});

const verdict = verdictOf(review);
const cost = costOf(usage, PRICES);
console.log(`Tokens: ${usage.inputTokens} in, ${usage.outputTokens} out, about ${cost.toFixed(4)} USD`);
console.log(`Scores: ${Object.entries(review.scores).map(([id, { score }]) => `${id}=${score}`).join(", ")}`);
console.log(`Findings: ${review.findings.length}, verdict: ${verdict}`);

writeFileSync(
  COMMENT_FILE,
  renderComment({ review, verdict, truncated, model: REVIEW_MODEL, usage, cost }),
);
appendFileSync(GITHUB_OUTPUT, `verdict=${verdict}\n`);
