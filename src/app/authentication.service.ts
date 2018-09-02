import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpOptions: any;
  public username: any;
  public errors: any;
  private authUrl = 'http://127.0.0.1:8000/rest-auth/login/';
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
  IsAuthenticated(){
    if (localStorage.getItem('key') !== null) {
      return true;
    }
  }
  login(user){
    return this.http.post(this.authUrl, JSON.stringify(user), this.httpOptions)
      .pipe(
        map(
          data => {
            this.updateData(data['key']);
            this.username = user.username;
          },
        )
      );
  }
  logout() {
    localStorage.removeItem('key');
    this.username = null;
  }
  private updateData(token) {
    localStorage.setItem('key', token);
    this.errors = [];
  }
}
