import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {

  public static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', {
      email,
      password,
    });
  }

  public static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {
      email,
      password,
    });
  }

  public static async logout(): Promise<void> {
    return $api.post('/logout');
  }

}