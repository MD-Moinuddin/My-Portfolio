/** Avatar letters for a company or school: an explicit override, else the first letters of its first two words. */
export function initialsFor(name: string, override?: string): string {
  if (override) return override;
  const words = name.split(/[\s-]+/).filter(Boolean);
  const letters = words.length > 1 ? words.slice(0, 2).map((word) => word[0]).join('') : name.slice(0, 2);
  return letters.toUpperCase();
}
