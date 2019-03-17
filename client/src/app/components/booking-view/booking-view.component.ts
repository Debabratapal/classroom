import { Component, OnInit } from '@angular/core';
import { timeout } from 'q';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent implements OnInit {
  times = [];

  rooms:any = [
    {
      room_name: "room_1",
      booking_times: [10,11, 14,16]
    },
    {
      room_name: "room_16",
      booking_times: [10,11, ,16, 18]
    },
    {
      room_name: "room_14",
      booking_times: [10,11, 15,16]
    },
    {
      room_name: "room_16",
      booking_times: [10,11, 15,16]
    },
    {
      room_name: "room_431",
      booking_times: [10,11, 20,16]
    },
  ]
  constructor() { }

  ngOnInit() {
    for(let i=10; i<21; i++) {
      this.times.push(`${i}:00`);
    }
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

}
