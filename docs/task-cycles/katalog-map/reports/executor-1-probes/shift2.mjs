import { readPicture } from "../../.claude/skills/loop2-scene-art/image.mjs";
const run = readPicture("assets/sprites/bear-run.png");
const bite = readPicture("assets/sprites/bear-bite.png");
for (let f = 0; f < 5; f++) {
  let best = [1e9, 0];
  for (let dy = -6; dy <= 6; dy++) {
    let diff = 0;
    for (let y = 0; y < 64; y++)
      for (let x = 0; x < 64; x++) {
        const yy = y + dy;
        const a = [0, 0, 0, 0];
        if (yy >= 0 && yy < 64)
          for (let c = 0; c < 4; c++) a[c] = run.data[(yy * run.width + f * 64 + x) * 4 + c];
        const b = [0, 0, 0, 0];
        for (let c = 0; c < 4; c++) b[c] = bite.data[(y * bite.width + x) * 4 + c];
        if (!(a[3] === 0 && b[3] === 0) && a.some((v, i) => v !== b[i])) diff++;
      }
    if (diff < best[0]) best = [diff, dy];
  }
  console.log("walk frame", f, "best diff", best[0], "at dy", best[1]);
}
