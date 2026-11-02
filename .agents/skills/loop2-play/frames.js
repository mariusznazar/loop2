// The body of `playwright-cli run-code`: the frames of the next three seconds, as JSON. The code
// runs where it has no file system, so save-frames.mjs writes them to files.
async (page) => {
  const frames = [];
  await page.screencast.start({
    quality: 60,
    onFrame: ({ data, timestamp }) =>
      frames.push({ timestamp, data: data.toString("base64") }),
  });
  await page.waitForTimeout(3000);
  await page.screencast.stop();
  return frames;
}
