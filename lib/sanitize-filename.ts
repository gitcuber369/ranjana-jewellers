// Strips path separators and other unsafe characters from a user-supplied
// filename before it's used as a Storage object key, so it can't land the
// upload at an unexpected nested path.
export function sanitizeFilename(name: string) {
  return name.replace(/[/\\]/g, "_").replace(/[^a-zA-Z0-9._-]/g, "_");
}
