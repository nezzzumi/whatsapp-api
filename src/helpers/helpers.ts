export function parseAuthorizationHeader(value: string): string {
  return value.replace('Bearer', '').trim();
}

export const isNumeric = (value: string): boolean => !Number.isNaN(Number(value));

export function getImageTypeFromBuffer(data: Buffer): string | null {
  const signatures = [
    { ext: 'png', signature: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]) },
    { ext: 'jpg', signature: Buffer.from([0xff, 0xd8, 0xff]) },
  ];

  for (let i = 0; i < Object.keys(signatures).length; i += 1) {
    const { ext, signature } = signatures[i];

    if (data.subarray(0, signature.length).equals(signature)) {
      return ext;
    }
  }

  return null;
}
