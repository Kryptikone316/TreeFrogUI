const table = new Uint32Array(256);
for (let i = 0; i < table.length; i++) {
  let value = i;
  for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  table[i] = value >>> 0;
}

export async function crc32(file) {
  let crc = 0xffffffff;
  const reader = file.stream().getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    for (const byte of value) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return ((crc ^ 0xffffffff) >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

export function parseDat(text) {
  const names = [];
  const byCrc = new Map();
  const games = text.matchAll(/^game\s*\(\s*\n\s*name "((?:\\.|[^"])*)"[^\n]*\n([\s\S]*?)^\)/gm);
  for (const [, encodedName, body] of games) {
    const name = encodedName.replaceAll('\\"', '"').replaceAll('\\\\', '\\');
    names.push(name);
    for (const [, crc] of body.matchAll(/\brom\s*\(\s*name\s+"(?:\\.|[^"]*)"[^\n]*?\bcrc\s+([\da-f]{8})/gi)) byCrc.set(crc.toUpperCase(), name);
  }
  return { names, byCrc };
}
