import { Component, OnInit } from '@angular/core';
import { timeout } from 'q';
import { Subscription } from 'rxjs';
import { BookngService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent implements OnInit {
  times = [];
  show:Boolean;

  bookingChangeListener:Subscription;

  rooms:any = []
  constructor(private bookingService: BookngService) { }

  ngOnInit() {
    this.getHeader()
    this.bookingService.getBookingTable();
    this.bookingChangeListener = this.bookingService.getBookingChange()
    .subscribe(data => {
      this.rooms = data;
      this.makeRoomForUI()
    })

    
  }

  getHeader() {
    for(let i=10; i<21; i++) {
      this.times.push(`${i}:00`);
    }
  }
  makeRoomForUI() {

    this.rooms.forEach((el, i) => {
      let timings = el.booking_times.sort();
        el.booking_times = [];
      for(let j = 10; j<21; j++) {
        
        if(timings.includes(j)) {
          el.booking_times.push(true);
        } else {
          el.booking_times.push(false);
        }
      }
    }) 
   
    console.log(this.rooms);
  }

  onDateChange(event){
    console.log(event);
    
  }

 

}
