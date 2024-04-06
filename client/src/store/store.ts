import { makeAutoObservable } from 'mobx';
import { IUser } from './../models/IUser';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';
export default class Store {

  public user = {} as IUser;

  public isAuth = false;

  public isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  public setUser(user: IUser) {
    this.user = user;
  }

  public setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  public async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log('response', response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  public async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log('response', response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  public async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }

  public async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
      console.log('response', response);

      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

}