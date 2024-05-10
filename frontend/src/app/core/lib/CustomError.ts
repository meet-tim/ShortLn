export class CustomError<T> extends Error {
  constructor(public error: T) {
    super();
  }
}
