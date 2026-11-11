/**
 * The blog API sometimes stores missing fields as the literal strings
 * "undefined" / "null". Treat those (and blanks) as empty so the UI
 * shows nothing instead of the word "undefined".
 */
export function cleanText(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value).trim();
  if (!text || text === "undefined" || text === "null") return "";
  return text;
}
