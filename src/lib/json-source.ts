import "server-only";

export function decodeJsonSource(buffer: Buffer): string {
  if (buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.subarray(2).toString("utf16le");
  }

  if (buffer[0] === 0xfe && buffer[1] === 0xff) {
    const source = Buffer.from(buffer.subarray(2));

    for (let index = 0; index + 1 < source.length; index += 2) {
      const byte = source[index];
      source[index] = source[index + 1];
      source[index + 1] = byte;
    }

    return source.toString("utf16le");
  }

  if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    return buffer.subarray(3).toString("utf8");
  }

  const sampleLength = Math.min(buffer.length, 512);
  let evenZeroBytes = 0;
  let oddZeroBytes = 0;

  for (let index = 0; index < sampleLength; index += 1) {
    if (buffer[index] !== 0) continue;
    if (index % 2 === 0) evenZeroBytes += 1;
    else oddZeroBytes += 1;
  }

  if (oddZeroBytes > sampleLength / 8 && oddZeroBytes > evenZeroBytes * 2) {
    return buffer.toString("utf16le");
  }

  if (evenZeroBytes > sampleLength / 8 && evenZeroBytes > oddZeroBytes * 2) {
    const source = Buffer.from(buffer);

    for (let index = 0; index + 1 < source.length; index += 2) {
      const byte = source[index];
      source[index] = source[index + 1];
      source[index + 1] = byte;
    }

    return source.toString("utf16le");
  }

  return buffer.toString("utf8").replace(/^\uFEFF/, "");
}
