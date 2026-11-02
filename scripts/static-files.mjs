import { copyFile, mkdir, readdir } from "node:fs/promises";

// Copies the files both builds take as they stand into the output directory `out` (a URL ending
// in "/"): the stylesheets directly in src/browser/, the Geist fonts with their licence into
// fonts/ and the icons into icons/. `root` is the repository root, a URL ending in "/".
export async function copyStaticFiles(root, out) {
  await mkdir(out, { recursive: true });
  for (const name of await readdir(new URL("src/browser/", root))) {
    if (name.endsWith(".css"))
      await copyFile(new URL(`src/browser/${name}`, root), new URL(name, out));
  }
  const fontsOut = new URL("fonts/", out);
  await mkdir(fontsOut, { recursive: true });
  for (const name of await readdir(new URL("assets/fonts/", root))) {
    if (name.endsWith(".woff2") || name === "OFL.txt")
      await copyFile(
        new URL(`assets/fonts/${name}`, root),
        new URL(name, fontsOut),
      );
  }
  const iconsOut = new URL("icons/", out);
  await mkdir(iconsOut, { recursive: true });
  for (const name of await readdir(new URL("assets/icons/", root))) {
    if (name.endsWith(".svg"))
      await copyFile(
        new URL(`assets/icons/${name}`, root),
        new URL(name, iconsOut),
      );
  }
}

// Copies the pictures of the game, the PNG files directly in assets/sprites/, into sprites/ of
// `out`. Only the application's build calls it: the kitchen-sink page takes no sprite, so
// assets/sprites/ keeps one recipient. Only `.png` files go: a sprite file holds pixels alone.
export async function copySpriteFiles(root, out) {
  const spritesOut = new URL("sprites/", out);
  await mkdir(spritesOut, { recursive: true });
  for (const name of await readdir(new URL("assets/sprites/", root))) {
    if (name.endsWith(".png"))
      await copyFile(
        new URL(`assets/sprites/${name}`, root),
        new URL(name, spritesOut),
      );
  }
}
