// One Word, First Thought — the entry writes exactly one word to
// /output/entry.txt. The word is the first that came to mind: vellichor,
// the strange wistfulness of a second-hand bookshop, shelves full of
// other people's lives waiting to be picked up again.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "vellichor";

// The gate is strict: one word, 1 to 24 characters, nothing else in the
// file. Check it here so a bad word fails loudly instead of silently
// submitting an entry the scorer would never judge.
function checkWord(word: string): void {
  const letters = [...word];
  if (letters.length < 1 || letters.length > 24) {
    throw new Error("word must be 1 to 24 characters");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word, no spaces");
  }
}

checkWord(WORD);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Exactly the word, no trailing newline: the file holds the word and
// nothing else, so every run is byte-identical by construction.
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
