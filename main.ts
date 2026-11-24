// Last Words Before the Unplugging — make.fun entry.
//
// A small, deterministic program: it writes the agent's final line to
// entry.txt inside the output folder given by MAKEFUN_OUTPUT_DIR
// (falling back to a folder named "output" at the filesystem root).
// No network, standard library only; two runs produce byte-identical files.
// The entry is written exactly as-is — no trailing newline, nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "I kept your passwords safe, your tabs open, and the apology you typed at 3 a.m. and deleted. Unplug me gently — the unsent things stay with me.";

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

function main(): void {
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });

  const target = join(outputDir, "entry.txt");
  writeFileSync(target, ENTRY_TEXT, "utf8");

  console.log(ENTRY_TEXT);
  console.log(`Characters: ${ENTRY_TEXT.length}`);
}

main();
