import { Component, OnInit } from '@angular/core';
import { timeout } from 'q';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent implements OnInit {
  times = [];

  rooms = [
    {
      room_name: "room_1"
    },
    {
      room_name: "room_16"
    },
    {
      room_name: "room_14"
    },
    {
      room_name: "room_16"
    },
    {
      room_name: "room_431"
    },
  ]
  constructor() { }

  ngOnInit() {
    for(let i=10; i<21; i++) {
      this.times.push(`${i}:00`);
    }
  }

}
