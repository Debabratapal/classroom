import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import { LoginUser, LoginResult } from '../models/login-user.model';
import { SignupUser, SignupResult } from '../models/signup-user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  token: String;
  user: any;
  tokenChange = new Subject<{ status: Boolean, token: String }>()
  signupChange = new Subject<{ status: Boolean }>();

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  signup(user: SignupUser) {
    this.http.post<SignupResult>(`${baseUrl}/api/signup`, user)
      .subscribe(result => {
        console.log(result);
        if (result.status) {
          this.signupChange.next({ status: true })
        }
      })
  }

  login(user: LoginUser) {
    this.http.post<LoginResult>(`${baseUrl}/api/login`, user)
      .subscribe(result => {
        console.log(result);
        if (result.status) {
          this.token = result.token;
          this.setUser(result.user)
          this.tokenChange.next({
            status: true,
            token: this.token
          })
        }

      })
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
    return this.user;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }


  getSignupChange() {
    return this.signupChange.asObservable();
  }
  
  getToken() {
    return this.token;
  }

  
  getTokenChange() {
    return this.tokenChange.asObservable();
  }
}