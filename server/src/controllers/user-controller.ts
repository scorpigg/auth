import { Request, Response, NextFunction } from 'express';

class UserController {

  // public async registration(req: Request, res: Response, next) {
  //   try {

  //   } catch (e) {

  //   }
  // }

  // public async login(req: Request, res: Response, next) {
  //   try {

  //   } catch (e) {

  //   }
  // }

  // public async logout(req: Request, res: Response, next) {
  //   try {

  //   } catch (e) {

  //   }
  // }

  // public async activation(req: Request, res: Response, next) {
  //   try {

  //   } catch (e) {

  //   }
  // }

  // public async refresh(req: Request, res: Response, next) {
  //   try {

  //   } catch (e) {

  //   }
  // }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json('123');
    } catch (e) {
      console.log(e);
    }
  }

}

export default new UserController();