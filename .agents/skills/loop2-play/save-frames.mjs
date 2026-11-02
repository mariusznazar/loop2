// Takes the JSON of the frames, from the file named as its argument or else on standard input, and
// writes each frame to .playwright-cli/frames/ in the current directory, replacing the frames of
// the run before.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { text } from "node:stream/consumers";

const directory = join(".playwright-cli", "frames");
const source = process.argv[2];
// A file that cannot be read ends here, on the runtime's own print of the cause.
const input = source ? readFileSync(source, "utf8") : await text(process.stdin);
let frames;
try {
  frames = JSON.parse(input);
} catch (error) {
  console.error(
    `The input is no JSON of frames (${error.name}): did the command fail?`,
  );
  process.exit(1);
}
if (!Array.isArray(frames) || frames.length === 0) {
  console.error("No frames came: the page did not change.");
  process.exit(1);
}
rmSync(directory, { recursive: true, force: true });
mkdirSync(directory, { recursive: true });
frames.forEach(({ timestamp, data }, index) => {
  const path = join(directory, `${String(index).padStart(3, "0")}.jpeg`);
  writeFileSync(path, Buffer.from(data, "base64"));
  console.log(`${path} +${Math.round(timestamp - frames[0].timestamp)} ms`);
});
