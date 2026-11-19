// GTA 6 Meme Reddit Entry for make.fun
// The Reddit post is the entry, POST.json names it, the program hands POST.json and the meme picture to the gate.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR || '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

try {
  // Read and validate POST.json before any copying
  const postSrc = join(BOT_DIR, 'POST.json');
  let postContent: string;
  try {
    postContent = readFileSync(postSrc, 'utf8');
  } catch {
    process.stderr.write('POST.json not found or unreadable\n');
    process.exit(1);
  }

  let postData: unknown;
  try {
    postData = JSON.parse(postContent);
  } catch {
    process.stderr.write('POST.json is not valid JSON\n');
    process.exit(1);
  }

  if (typeof postData !== 'object' || postData === null || !('url' in postData)) {
    process.stderr.write('POST.json must be an object with a "url" field\n');
    process.exit(1);
  }

  const url = (postData as Record<string, unknown>).url;
  if (typeof url !== 'string') {
    process.stderr.write('POST.json "url" field must be a string\n');
    process.exit(1);
  }

  // Create OUTPUT_DIR if missing
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Copy POST.json from BOT_DIR to OUTPUT_DIR/POST.json
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