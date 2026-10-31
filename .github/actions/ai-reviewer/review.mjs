// Reviews the diff of one pull request and writes the comment and the verdict for the workflow.
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { openai } from "@ai-sdk/openai";
import { costOf, guidelinePaths, renderComment, runReview, trimDiff, verdictOf } from "./lib.mjs";

// USD per 1M tokens of the default model, from the OpenAI pricing page.
const PRICES = { input: 1, output: 5 };

const { REVIEW_MODEL, PR_TITLE, PR_BODY, DIFF_FILE, COMMENT_FILE, GITHUB_OUTPUT, BASE_REF } = process.env;

// Guidelines come from the base branch, so a pull request cannot rewrite the rules it is judged by.
function guidelineFromBase(path) {
  return execFileSync("git", ["show", `origin/${BASE_REF}:${path}`], { encoding: "utf8" });
}

async function main() {
  const { text: diff, truncated } = trimDiff(readFileSync(DIFF_FILE, "utf8"));
  console.log(`Diff: ${diff.length} characters${truncated ? ", truncated" : ""}`);

  if (diff.trim() === "") {
    writeFileSync(
      COMMENT_FILE,
      "## AI Code Review: pominięte\n\nDiff po wyłączeniu plików blokady, assetów i buildu jest pusty, więc tej zmiany nikt nie ocenił.\n",
    );
    appendFileSync(GITHUB_OUTPUT, "verdict=skipped\n");
    console.log("Nothing to review, no model call was made");
    return;
  }

  const rules = readFileSync(new URL("./review-rules.md", import.meta.url), "utf8");
  const guidelines = guidelinePaths(diff).map((path) => ({ path, text: guidelineFromBase(path) }));
  console.log(`Guidelines: ${guidelines.map(({ path }) => path).join(", ")}`);

  console.log(`Running code review with ${REVIEW_MODEL}`);
  const { review, usage } = await runReview({
    model: openai(REVIEW_MODEL),
    rules,
    guidelines,
    title: PR_TITLE,
    body: PR_BODY,
    diff,
    truncated,
  });

  const verdict = verdictOf(review, truncated);
  const cost = costOf(usage, PRICES);
  console.log(`Tokens: ${usage.inputTokens} in, ${usage.outputTokens} out, about ${cost.toFixed(4)} USD`);
  console.log(`Scores: ${Object.entries(review.scores).map(([id, { score }]) => `${id}=${score}`).join(", ")}`);
  console.log(`Findings: ${review.findings.length}, verdict: ${verdict}`);

  writeFileSync(
    COMMENT_FILE,
    renderComment({ review, verdict, truncated, model: REVIEW_MODEL, usage, cost }),
  );
  appendFileSync(GITHUB_OUTPUT, `verdict=${verdict}\n`);
}

// The SDK's error carries the whole request, so printing it would copy the prompt into the log.
try {
  await main();
} catch (error) {
  console.error(`Review failed: ${error.message}`);
  process.exit(1);
}
