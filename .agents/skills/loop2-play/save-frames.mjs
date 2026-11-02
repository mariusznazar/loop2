// Takes the JSON of the frames, from the file named as its argument or else on standard input, and
// writes each frame to .playwright-cli/frames/ in the current directory, replacing the frames of
// the run before.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { text } from "node:stream/consumers";

const directory = join(".playwright-cli", "frames");
const source = process.argv[2];
let frames;
try {
  frames = JSON.parse(
    source ? readFileSync(source, "utf8") : await text(process.stdin),
  );
} catch {
  frames = [];
}
if (!Array.isArray(frames) || frames.length === 0) {
  console.error(
    "No frames came: the page did not change, or playwright-cli failed.",
  );
  process.exit(1);
}
rmSync(directory, { recursive: true, force: true });
mkdirSync(directory, { recursive: true });
frames.forEach(({ timestamp, data }, index) => {
  const path = join(directory, `${String(index).padStart(3, "0")}.jpeg`);
  writeFileSync(path, Buffer.from(data, "base64"));
  console.log(`${path} +${Math.round(timestamp - frames[0].timestamp)} ms`);
});
