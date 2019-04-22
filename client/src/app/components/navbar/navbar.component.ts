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

  dashboardClicked() {
    this.open = !this.open;
  }

  dashboardItemClicked(i) {
    this.dashboardClicked();
    let link = this.dashboardItems[i].link;
    this.router.navigate([link], { relativeTo: this.route })
  }

  logout() {
    this.authService.logout();
  }
  
}