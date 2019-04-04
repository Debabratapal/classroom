import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddTeamLeaderComponent } from './components/add-team-leader/add-team-leader.component';
import { BookingViewComponent } from './components/booking-view/booking-view.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CalenderComponent } from './components/calender/calender.component';
import { RoomBookingComponent } from './components/room-booking/room-booking.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { EnqueryComponent } from './components/enquery/enquery.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    NavbarComponent,
    AddRoomComponent,
    AddTeamLeaderComponent,
    BookingViewComponent,
    NotificationComponent,
    CalenderComponent,
    RoomBookingComponent,
    CardsComponent,
    CardComponent,
    EnqueryComponent,
    BookingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  ,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
