// Office Joke Open — a single-line office joke for the make.fun judge.
//
// The joke takes the tired "think outside the box" pep talk literally:
// the narrator obeys it, and the payoff lands in the last few words,
// when the reader learns exactly where that thinking happens.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My boss told me to think outside the box, so now I do all my best thinking from home, in pyjamas, during the return-to-office meeting.";

// Gate: one line, 1-200 characters, not only whitespace.
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// A joke that needs trimming is not tight: no leading/trailing space,
// and no accidental double space hiding a wasted word.
if (JOKE !== JOKE.trim() || JOKE.includes("  ")) {
  throw new Error("entry must be tight: no leading, trailing or double spaces");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
