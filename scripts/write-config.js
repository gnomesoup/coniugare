const { writeFileSync } = require("node:fs");
const { join } = require("node:path");

const config = {
  contactEmail: process.env.CONIUGARE_CONTACT_EMAIL || "hello@coniugare.app",
};

writeFileSync(
  join(__dirname, "..", "config.js"),
  `window.CONIUGARE_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
);
