import httpStatus from 'http-status';

export class HttpException extends Error {
  public status: number;
  public message: string;
  public errors: string[];

  constructor(status: number, message: string, stack = '', errors = []) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || httpStatus.INTERNAL_SERVER_ERROR;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}
