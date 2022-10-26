export function parseAuthorizationHeader(value: string | undefined): string | undefined {
  return value?.replace('Bearer ', '');
}
