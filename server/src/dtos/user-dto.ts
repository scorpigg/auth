export interface IUserDto {
  email: string;
  id: string;
  isActivated: boolean;
}

export class UserDto {

  public email;

  public id;

  public isActivated;

  constructor(model: IUserDto) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }

}