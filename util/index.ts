const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

export function createAlias(len: number) {
  let alias = "";
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * 36);
    alias += CHARS.at(randomIndex);
  }
  return alias;
}
