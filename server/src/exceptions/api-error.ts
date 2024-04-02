export class ApiError extends Error {

  public status;

  public errors;

  constructor(status: number, message: string, errors:string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  public static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  public static BadRequest(message: string, errors: string[] = []) {
    return new ApiError(400, message, errors);
  }

}