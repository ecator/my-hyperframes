#!/usr/bin/env node
import "./lib/windows-exe-search.mjs";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveNpxInvocation } from "./lib/npx-sync.mjs";

const root = join(fileURLToPath(new URL("../../../", import.meta.url)));
const dist = join(root, "packages/cli/dist/cli.js");
if (existsSync(dist)) {
  const result = spawnSync(
    process.execPath,
    [dist, "media-use", "resolve", ...process.argv.slice(2)],
    { stdio: "inherit" },
  );
  process.exit(result.status ?? 1);
}

try {
  const invocation = resolveNpxInvocation(
    ["hyperframes", "media-use", "resolve", ...process.argv.slice(2)],
    { stdio: "inherit" },
  );
  const result = spawnSync(invocation.cmd, invocation.args, invocation.opts);
  if (result.error) console.error(result.error.message);
  process.exit(result.status ?? 1);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
