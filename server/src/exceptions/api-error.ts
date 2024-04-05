import { ValidationError } from 'express-validator';

type errors = string[] | ValidationError[];

export class ApiError extends Error {

  public status;

  public errors;

  constructor(status: number, message: string, errors: errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  public static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  public static BadRequest(message: string, errors: errors = []) {
    return new ApiError(400, message, errors);
  }

}