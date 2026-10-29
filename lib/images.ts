import "server-only";
import fs from "node:fs";
import path from "node:path";

// Checked on the server at render time so a missing image falls back to a
// gradient placeholder instead of a broken <img>.
export function imageExists(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
  } catch {
    return false;
  }
}
