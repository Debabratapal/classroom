import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { baseUrl } from '../../environments/environment';

interface User {
  name: String,
  email: String,
  password: String
}

@Injectable({
  providedIn: 'root',
 })
export class SignupService {

  constructor(private http: HttpClient) {}

  signup(user: User) {
    this.http.post(`${baseUrl}/api/signup`, user)
    .subscribe(result => {
      console.log(result);
    })
  }

}