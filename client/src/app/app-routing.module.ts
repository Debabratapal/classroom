import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddTeamLeaderComponent } from './components/add-team-leader/add-team-leader.component';
import { BookingViewComponent } from './components/booking-view/booking-view.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "home", component: HomeComponent, children:[
    {path: '', component: BookingViewComponent},
    {path: 'add_rooms', component: AddRoomComponent},
    {path: 'add_team_leader', component: AddTeamLeaderComponent},
    {path: 'cal', component: CalenderComponent},
    {path: 'card', component: CardsComponent},
    {path: 'cardp', component: CardComponent}
  ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
