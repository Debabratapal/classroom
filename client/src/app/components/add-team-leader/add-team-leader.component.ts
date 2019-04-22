import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-add-team-leader',
  templateUrl: './add-team-leader.component.html',
  styleUrls: ['./add-team-leader.component.css']
})
export class AddTeamLeaderComponent implements OnInit {
  newUser = [];
  newUserListener: Subscription;
  sideList = [];
  selectedNav;
  userStatus='';
  constructor(
    private userService: UserService,
    private authService: SignupService
    ) {}

  ngOnInit() {
    this.sideList = [
      {id:1, title:"New User Request",status:true},
      {id:2 ,title:"My Group", status: false}
    ];
    this.selectedNav = this.sideList[0];

    let user = this.authService.getUser();
    this.userStatus=user.status;
    
    if(this.selectedNav.id ===1) {
      this.userService.getNewRequests();
      this.newUserListener = this.userService.getNewUserChange()
      .subscribe((newUser:any[]) => {     
        this.newUser = newUser;
      })
    } else if(this.selectedNav.id ===2) {
      this.userService.getUserGroup()
    }
  }

  addToGroup(user,i) {
    console.log(user);
    this.userService.updateUser(user, i);
  }

  changeNav(id, i) {
    this.sideList = this.sideList.map(el => {
      el.status = false;
      return el;
    })
    this.sideList[i].status = true;
    this.selectedNav = this.sideList[i];
    this.makeRequest(id) ;
  }

  markAsLeader(user, i) {
    let status = ''
    if(user.status ==="LEADER") {
      status = 'MEMBER'
    }
    if(user.status ==="MEMBER") {
      status = 'LEADER'
    }
    console.log(status);
    
    this.userService.userStatusChange(user, i, status)
  }
  
  makeRequest(id) {
    switch(id) {
      case 1: {
        this.userService.getNewRequests();
        break;
      }
      case 2: {
        this.userService.getUserGroup();
        break;
      }
    }
  }



}