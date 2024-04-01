import { Request, Response, NextFunction } from 'express';
import userService from '../services/user-service';

class UserController {

  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

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