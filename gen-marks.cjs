/*
  Regenerates app/components/brand-marks.ts.

  The Font Awesome package is intentionally NOT a project dependency: only the
  eight paths are kept, in the generated file. To run this:

    npm install --no-save @fortawesome/free-brands-svg-icons
    node gen-marks.cjs
    npm uninstall @fortawesome/free-brands-svg-icons
*/
const fs = require("fs");
const path = require("path");
const b = require("@fortawesome/free-brands-svg-icons");

const want = [
  ["instagram", "faInstagram", "Instagram"],
  ["x", "faXTwitter", "X"],
  ["linkedin", "faLinkedinIn", "LinkedIn"],
  ["facebook", "faFacebookF", "Facebook"],
  ["threads", "faThreads", "Threads"],
  ["tiktok", "faTiktok", "TikTok"],
  ["telegram", "faTelegram", "Telegram"],
  ["reddit", "faRedditAlien", "Reddit"],
];

const header = `/*
  Brand marks for the eight networks PostPublish publishes to.

  Path data extracted from Font Awesome 6 Free (Brands), CC BY 4.0, so the icon
  package itself does not ship to the client. Using one family for all eight
  matters here: lucide no longer carries brand icons at all, and Simple Icons no
  longer carries LinkedIn, so either source alone would leave the set a network
  short and the mixed stroke weights would show.

  The marks are trademarks of their respective owners, used only to indicate which
  networks are supported.

  Regenerate with gen-marks.cjs if the set changes.
*/

`;

const lines = [];
lines.push(header);
lines.push("export type Network =");
lines.push(want.map(([k]) => `  | "${k}"`).join("\n") + ";");
lines.push("");
lines.push("export type BrandMark = {");
lines.push("  label: string;");
lines.push("  /** Source viewBox width. */");
lines.push("  w: number;");
lines.push("  /** Source viewBox height. */");
lines.push("  h: number;");
lines.push("  d: string;");
lines.push("};");
lines.push("");
lines.push("export const BRAND_MARKS: Record<Network, BrandMark> = {");
for (const [key, fa, label] of want) {
  const icon = b[fa];
  if (!icon) throw new Error("missing " + fa);
  const [w, h, , , d] = icon.icon;
  lines.push(`  ${key}: {`);
  lines.push(`    label: "${label}",`);
  lines.push(`    w: ${w},`);
  lines.push(`    h: ${h},`);
  lines.push(`    d: "${d}",`);
  lines.push("  },");
}
lines.push("};");
lines.push("");

const out = lines.join("\n");
const target = path.join(__dirname, "app", "components", "brand-marks.ts");
fs.writeFileSync(target, out);
console.log("wrote", target, out.length, "bytes");
