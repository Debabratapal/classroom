import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupService } from './signup.service';
import { baseUrl } from '../../environments/environment';
import { Subject } from 'rxjs';
import { log } from 'util';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  newUser = [];
  newUserChange = new Subject();

  constructor(private http: HttpClient,
    private authService: SignupService) { }


  getNewUserChange() {
    return this.newUserChange.asObservable();
  }

  getNewRequests() {
    this.http.get<{ users: any[], status: Boolean }>
    (`${baseUrl}/api/user`)
      .subscribe(res => {
        if(res.status) {          
          this.newUser = res.users;
          this.newUserChange.next([...this.newUser]);
        }
      })
  }

  updateUser(user, i) {
    let loggedInUser = this.authService.getUser();    
    this.http.patch<{ status: Boolean }>
    (`${baseUrl}/api/user/${user._id}`, {user_id:loggedInUser._id})
    .subscribe(res => {
      if(res.status) {
        this.newUser.splice(i, 1);
        this.newUserChange.next([...this.newUser]);
      }
    })
  }

  userStatusChange(user,i,status) {
    this.http.patch<{status: Boolean}>
    (`${baseUrl}/api/user/change_status/${user._id}`, {status})
    .subscribe(res => {
      if(res.status) {
        this.newUser[i].status = status;
        this.newUserChange.next([...this.newUser]);
      }
    })
  }

  getUserGroup() {
    let loggedInUser = this.authService.getUser();    
    this.http.get<{status:Boolean, group:any[]}>
    (`${baseUrl}/api/user/${loggedInUser._id}`)
    .subscribe(res => {
      if(res.status) {
        this.newUser = res.group;
        this.newUserChange.next([...this.newUser])
      }
    })
  }

}