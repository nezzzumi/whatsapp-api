export function parseAuthorizationHeader(value: string): string {
  return value.replace('Bearer', '').trim();
}

export const isNumeric = (value: string): boolean => !Number.isNaN(Number(value));
