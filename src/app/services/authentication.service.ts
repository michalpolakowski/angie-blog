import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/environments/environment';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: IUser;
  token: string;
  token_expires: Date;
  errors: any = [];

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    this.http.post(BACKEND_URL + 'login/', { 'username': username, 'password': password })
      .subscribe(response => {
        this.updateData(response['token']);
      });
  }

  setToken(token) {
    localStorage.setItem('jsonwebtkn', token);
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.user.username = token_decoded.username;
  }
}
