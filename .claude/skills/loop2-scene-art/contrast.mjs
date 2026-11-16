// The contrast of the colours of an effect against samples of the scene the effect stands on: the
// ground and the prop beside which it stands. The script gives numbers and judges none: it sets
// no threshold, and the exit code is 0 whatever the ratios are.
//
//   node contrast.mjs --effect COLOUR [--effect ...] [--ground SAMPLE ...] [--prop SAMPLE ...]
//
// COLOUR is #rrggbb or a picture, whose every visible colour is measured. SAMPLE is #rrggbb or
// `picture.png@x,y`, the pixel of a picture at that place. The author names the samples; a
// reviewer names their own. The ratio is the one of WCAG 2.2, as D-42 takes it. A pixel that is
// partly transparent is measured by its colour as if it were opaque, which the output says. A
// sample that is wholly transparent or outside its picture, or a file that cannot be read, ends
// the script with a message and a non-zero exit code.
import { Refusal, parseArgs, runCli } from "./cli.mjs";
import { contrast } from "./colour.mjs";
import {
  coloursOf,
  hex,
  parseHex,
  parseSpot,
  pixelAt,
  readPicture,
} from "./image.mjs";

function effectColours(texts) {
  const colours = new Map();
  let partial = 0;
  for (const text of texts) {
    if (text.startsWith("#")) {
      colours.set(hex(parseHex(text, "--effect")), null);
      continue;
    }
    const picture = readPicture(text);
    for (const [colour, count] of coloursOf(picture))
      colours.set(colour, (colours.get(colour) ?? 0) + count);
    for (let at = 3; at < picture.data.length; at += 4)
      if (picture.data[at] !== 0 && picture.data[at] !== 255) partial++;
  }
  return { colours, partial };
}

function sample(text, role) {
  if (text.startsWith("#"))
    return { name: text, colour: parseHex(text, `--${role}`) };
  const { file, x, y } = parseSpot(text, `--${role}`);
  const picture = readPicture(file);
  if (x >= picture.width || y >= picture.height)
    throw new Refusal(
      `${text}: the pixel is outside the picture of ${picture.width} x ${picture.height}`,
    );
  const [r, g, b, a] = pixelAt(picture, x, y);
  if (a === 0)
    throw new Refusal(
      `${text}: the pixel is wholly transparent, so it has no colour`,
    );
  return { name: text, colour: [r, g, b] };
}

await runCli(async (argv) => {
  const { options } = parseArgs(argv, {
    effect: "list",
    ground: "list",
    prop: "list",
  });
  if (!options.effect || (!options.ground && !options.prop))
    throw new Refusal(
      "usage: --effect COLOUR [--effect ...] [--ground SAMPLE ...] [--prop SAMPLE ...]",
    );
  const { colours, partial } = effectColours(options.effect);
  const samples = [
    ...(options.ground ?? []).map((text) => ({
      role: "ground",
      ...sample(text, "ground"),
    })),
    ...(options.prop ?? []).map((text) => ({
      role: "prop",
      ...sample(text, "prop"),
    })),
  ];
  console.log(`effect colours: ${colours.size}`);
  if (partial > 0)
    console.log(
      `note: ${partial} pixels of the effect are partly transparent; their colour is measured as if opaque`,
    );
  for (const { role, name, colour } of samples) {
    console.log(`${role} ${name} = ${hex(colour)}`);
    const ratios = [...colours].map(([effect, count]) => ({
      effect,
      count,
      ratio: contrast(parseHex(effect, "colour"), colour),
    }));
    for (const { effect, count, ratio } of ratios)
      console.log(
        `  ${effect}${count === null ? "" : ` (${count} px)`}: ${ratio.toFixed(2)}:1`,
      );
    const lowest = ratios.reduce((a, b) => (b.ratio < a.ratio ? b : a));
    console.log(`  lowest: ${lowest.effect} at ${lowest.ratio.toFixed(2)}:1`);
  }
});
