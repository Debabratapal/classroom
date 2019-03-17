import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  open:Boolean = false;
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

  constructor(private router: Router,
              private route: ActivatedRoute) {}
  
  dashboardClicked() {
    this.open = !this.open;
  }

  dashboardItemClicked(i) {
    this.dashboardClicked();
    let link = this.dashboardItems[i].link;
    this.router.navigate([link], {relativeTo: this.route})
  }
}