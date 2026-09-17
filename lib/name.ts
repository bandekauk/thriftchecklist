/** Turn a sign-in email into a readable name: "mary-jane.smith@..." -> "Mary-Jane Smith" */
export function nameOf(email: string | null | undefined): string {
  if (!email) return "";
  return email
    .split("@")[0]
    .replace(/[._]+/g, " ")
    .replace(/(^|[\s-])([a-z])/g, (_m, pre: string, ch: string) => pre + ch.toUpperCase());
}
