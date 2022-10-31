export class HttpError extends Error {
  constructor(public message: string, public statusCode: number) {
    super();
  }
}
