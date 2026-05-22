const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const root = join(__dirname, "..");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

if (!packageJson.version || typeof packageJson.version !== "string") {
  throw new Error("package.json must include a string version field.");
}

writeFileSync(
  join(root, "version.js"),
  `window.CONIUGARE_VERSION = ${JSON.stringify(packageJson.version)};\n`,
);
