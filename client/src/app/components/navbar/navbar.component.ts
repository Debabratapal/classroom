import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  open: Boolean = false;
  dashboardItems = [
    {
      title: 'Add Rooms',
      link: 'add_rooms'
    },
    {
      title: 'Add Team Leaders',
      link: 'add_team_leader'
    }
  ]
  userStatus = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: SignupService
    ) { }

  ngOnInit() {
    let user = this.authService.getUser();
    this.userStatus = user.status;
  }

  toggle() {
    this.open = !this.open;
  }

  logout() {
    this.authService.logout();
  }
  
}