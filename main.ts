// GTA 6 Meme Reddit Entry for make.fun
// The Reddit post is the entry, POST.json names it, the program hands POST.json and the meme picture to the gate.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR || '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

try {
  // Create OUTPUT_DIR if missing
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Copy POST.json from BOT_DIR to OUTPUT_DIR/POST.json
  const postSrc = join(BOT_DIR, 'POST.json');
  const postDest = join(OUTPUT_DIR, 'POST.json');
  copyFileSync(postSrc, postDest);

  // Copy meme.jpg from BOT_DIR to OUTPUT_DIR/meme.jpg
  const memeSrc = join(BOT_DIR, 'meme.jpg');
  const memeDest = join(OUTPUT_DIR, 'meme.jpg');
  copyFileSync(memeSrc, memeDest);

  // Exit successfully with no output
  process.exit(0);
} catch (error) {
  // Print error to stderr and exit with code 1
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(message + '\n');
  process.exit(1);
}