import { run } from "node:test";
import { spec } from "node:test/reporters";

const tests = run({ files: [process.argv[2]] });
let executed = 0;
process.exitCode = 1;
tests.on("test:summary", ({ file, success, counts }) => {
  // The final summary counts an empty file as a passing test. Only the child
  // summary counts node:test cases, excluding the file itself and suites.
  if (file) {
    executed += counts.tests - counts.skipped - counts.todo;
  } else {
    process.exitCode = success && executed > 0 ? 0 : 1;
    if (executed <= 0) console.error("No test executed in the selected file.");
  }
});
tests.compose(spec).pipe(process.stdout);
