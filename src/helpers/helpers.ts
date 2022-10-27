export function parseAuthorizationHeader(value: string): string {
  return value.replace('Bearer', '').trim();
}

export const isNumeric = (value: string): boolean => !isNaN(Number(value));
