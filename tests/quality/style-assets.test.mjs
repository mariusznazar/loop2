import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const emitterPath = new URL("../../scripts/style-assets.mjs", import.meta.url);

test("number-field width retains its root-size dependency when typography changes", async () => {
  const css = await readFile(
    path.join(root, "src/browser/view/styles.css"),
    "utf8",
  );
  const data = JSON.parse(
    await readFile(
      path.join(root, "src/browser/view/design-tokens.json"),
      "utf8",
    ),
  );
  const field = css.match(/\.rule input\[type="number"\]\s*\{([^}]+)\}/);
  assert.ok(field, "number-field layout declaration must be inspectable");
  const width = field[1].match(/\bwidth:\s*([\d.]+)(rem|em|px);/);
  assert.ok(width, "number-field width must use a supported length");
  const controls = css.match(/button,\s*input,\s*select\s*\{([^}]+)\}/);
  assert.ok(controls, "native input typography must be inspectable");
  const font = controls[1].match(/\bfont-size:\s*var\(--([\w-]+)\);/);
  assert.ok(font, "input typography must come from a token");
  const inputSize = data.tokens[font[1]].value.match(/^([\d.]+)px$/);
  assert.ok(inputSize, "input font token must be a px size");
  for (const [rootSize, expectedWidth] of [
    [12, 48],
    [16, 64],
    [20, 80],
  ]) {
    const reference =
      width[2] === "rem"
        ? rootSize
        : width[2] === "em"
          ? Number(inputSize[1])
          : 1;
    assert.equal(
      Number(width[1]) * reference,
      expectedWidth,
      `number-field content width with a ${rootSize}px root`,
    );
  }
});

async function fixture(t) {
  assert.ok(existsSync(emitterPath), "the build needs a style asset emitter");
  const temporary = await mkdtemp(path.join(tmpdir(), "loop2-style-assets-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const sourceRoot = path.join(temporary, "source");
  const outputDirectory = path.join(temporary, "output");
  await mkdir(path.join(sourceRoot, "src/browser/view"), { recursive: true });
  await mkdir(path.join(sourceRoot, "assets"));
  await mkdir(outputDirectory);
  await cp(
    path.join(root, "assets/fonts"),
    path.join(sourceRoot, "assets/fonts"),
    {
      recursive: true,
    },
  );
  const tokenPath = path.join(
    sourceRoot,
    "src/browser/view/design-tokens.json",
  );
  const tokens = JSON.parse(
    await readFile(
      path.join(root, "src/browser/view/design-tokens.json"),
      "utf8",
    ),
  );
  await writeFile(tokenPath, JSON.stringify(tokens));
  await writeFile(
    path.join(sourceRoot, "src/browser/view/styles.css"),
    "body { color: var(--text); }\n",
  );
  const { emitStyleAssets } = await import(emitterPath);
  return {
    temporary,
    sourceRoot,
    outputDirectory,
    tokens,
    tokenPath,
    emit: () => emitStyleAssets({ sourceRoot, outputDirectory }),
  };
}

test("emitted values and font faces derive from JSON, and copies retain exact bytes", async (t) => {
  const f = await fixture(t);
  f.tokens.roles.text.value = "#abcdef";
  f.tokens.tokens["font-ui"].value = "Fixture Sans";
  f.tokens.tokens["font-weight-regular"].value = 300;
  await writeFile(f.tokenPath, JSON.stringify(f.tokens));
  await f.emit();
  const css = await readFile(
    path.join(f.outputDirectory, "design-tokens.css"),
    "utf8",
  );
  assert.match(css, /--text: #abcdef;/);
  assert.match(css, /--font-ui: "Fixture Sans";/);
  assert.match(css, /font-family: "Fixture Sans";/);
  assert.match(css, /font-weight: 300 500;/);
  assert.match(css, /url\("\.\/fonts\/Geist\.woff2"\)/);
  assert.match(css, /url\("\.\/fonts\/GeistMono\.woff2"\)/);
  assert.doesNotMatch(css, /https?:|@import/);
  for (const name of ["Geist.woff2", "GeistMono.woff2", "OFL.txt"]) {
    assert.deepEqual(
      await readFile(path.join(f.outputDirectory, "fonts", name)),
      await readFile(path.join(f.sourceRoot, "assets/fonts", name)),
    );
  }
  assert.equal(
    await readFile(path.join(f.outputDirectory, "styles.css"), "utf8"),
    "body { color: var(--text); }\n",
  );
  const first = await readFile(
    path.join(f.outputDirectory, "design-tokens.css"),
  );
  await f.emit();
  assert.deepEqual(
    await readFile(path.join(f.outputDirectory, "design-tokens.css")),
    first,
  );
});

test("malformed records and CSS injection fail before writing any output", async (t) => {
  const mutations = [
    (data) => {
      delete data.roles.focus;
    },
    (data) => {
      data.roles.text.value = "red; } body { display: none";
    },
    (data) => {
      data.tokens["font-ui"].value = 'Geist"; src:url(https://evil.invalid)';
    },
    (data) => {
      data.tokens["space-2"].value = "2px; color:red";
    },
    (data) => {
      data.roles.depleted.value = 2;
    },
    (data) => {
      data.roles.text.source = "";
    },
    (data) => {
      data.tokens.text = { value: "1px", source: "collision" };
    },
    (data) => {
      data.roles.text.extra = "hidden data";
    },
    (data) => {
      data.tokens["step-dash"].value = "5 4; stroke:red";
    },
    (data) => {
      data.tokens["font-weight-medium"].value = "500";
    },
  ];
  for (const mutation of mutations) {
    const f = await fixture(t);
    mutation(f.tokens);
    await writeFile(f.tokenPath, JSON.stringify(f.tokens));
    await assert.rejects(f.emit(), /token|role|record|value|source|schema/i);
    assert.deepEqual(await readdir(f.outputDirectory), []);
  }
});

test("missing, HTML and malformed WOFF2 inputs fail before writes", async (t) => {
  for (const change of ["missing", "html", "length", "header"]) {
    const f = await fixture(t);
    const font = path.join(f.sourceRoot, "assets/fonts/Geist.woff2");
    if (change === "missing") await rm(font);
    else if (change === "html") await writeFile(font, "<html>error</html>");
    else {
      const bytes = await readFile(font);
      if (change === "length") bytes.writeUInt32BE(bytes.length - 1, 8);
      else bytes.writeUInt16BE(0, 12);
      await writeFile(font, bytes);
    }
    await assert.rejects(f.emit());
    assert.deepEqual(await readdir(f.outputDirectory), []);
  }
});

test("source and output symlinks cannot redirect reads or writes", async (t) => {
  for (const location of ["input", "output", "destination", "ancestor"]) {
    const f = await fixture(t);
    const outside = path.join(f.temporary, "outside");
    await mkdir(outside);
    await writeFile(path.join(outside, "keep"), "unchanged");
    if (location === "input") {
      await rm(path.join(f.sourceRoot, "assets/fonts"), { recursive: true });
      await symlink(
        path.join(root, "assets/fonts"),
        path.join(f.sourceRoot, "assets/fonts"),
        "junction",
      );
    } else if (location === "output") {
      await rm(f.outputDirectory, { recursive: true });
      await symlink(outside, f.outputDirectory, "junction");
    } else if (location === "destination") {
      await symlink(outside, path.join(f.outputDirectory, "fonts"), "junction");
    } else {
      const link = path.join(f.temporary, "linked");
      await symlink(f.temporary, link, "junction");
      const { emitStyleAssets } = await import(emitterPath);
      await assert.rejects(
        emitStyleAssets({
          sourceRoot: f.sourceRoot,
          outputDirectory: path.join(link, "output"),
        }),
        /path|symlink|canonical/i,
      );
      continue;
    }
    await assert.rejects(f.emit(), /path|symlink|canonical/i);
    assert.deepEqual(await readdir(outside), ["keep"]);
    assert.equal(
      await readFile(path.join(outside, "keep"), "utf8"),
      "unchanged",
    );
  }
});

test("emitter refuses source destinations, ancestors and uncreated outputs", async (t) => {
  const f = await fixture(t);
  const { emitStyleAssets } = await import(emitterPath);
  for (const outputDirectory of [
    f.sourceRoot,
    f.temporary,
    path.join(f.sourceRoot, "assets/fonts"),
    path.join(f.temporary, "missing"),
  ]) {
    await assert.rejects(
      emitStyleAssets({ sourceRoot: f.sourceRoot, outputDirectory }),
    );
  }
});

test("ordinary build clears stale production artifacts and loads local generated styles", async () => {
  const stale = path.join(root, "dist/public/styleguide/stale.js");
  await mkdir(path.dirname(stale), { recursive: true });
  await writeFile(stale, "stale");
  const result = spawnSync(process.execPath, ["scripts/build.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(existsSync(stale), false);
  const html = await readFile(
    path.join(root, "dist/public/index.html"),
    "utf8",
  );
  assert.doesNotMatch(html, /<style[\s>]/);
  assert.match(html, /href="\/design-tokens.css"[\s\S]*href="\/styles.css"/);
  assert.ok(existsSync(path.join(root, "dist/public/main.js")));
  assert.ok(existsSync(path.join(root, "dist/server/main.js")));
  for (const name of ["Geist.woff2", "GeistMono.woff2", "OFL.txt"]) {
    assert.deepEqual(
      await readFile(path.join(root, "dist/public/fonts", name)),
      await readFile(path.join(root, "assets/fonts", name)),
    );
  }
});

test("build refuses a linked fixed output root without deleting its target", async (t) => {
  const f = await fixture(t);
  await mkdir(path.join(f.sourceRoot, "scripts"));
  await cp(
    path.join(root, "scripts/build.mjs"),
    path.join(f.sourceRoot, "scripts/build.mjs"),
  );
  await cp(
    fileURLToPath(emitterPath),
    path.join(f.sourceRoot, "scripts/style-assets.mjs"),
  );
  await mkdir(path.join(f.sourceRoot, "dist"));
  await writeFile(path.join(f.outputDirectory, "keep"), "unchanged");
  await symlink(
    f.outputDirectory,
    path.join(f.sourceRoot, "dist/public"),
    "junction",
  );
  const result = spawnSync(process.execPath, ["scripts/build.mjs"], {
    cwd: f.sourceRoot,
    encoding: "utf8",
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /symlink|canonical|path/i);
  assert.equal(
    await readFile(path.join(f.outputDirectory, "keep"), "utf8"),
    "unchanged",
  );
});
