import { Component, OnInit, Input } from '@angular/core';
import { BookngService } from 'src/app/services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enquery',
  templateUrl: './enquery.component.html',
  styleUrls: ['./enquery.component.css']
})
export class EnqueryComponent implements OnInit {
  bookingChange:Subscription;
 
  rooms = [];
  times = [];
  @Input() date ;
  roomId= null;
  show:Boolean =false;
  constructor(private bookingService: BookngService) { }

  ngOnInit() {
    this.getHeader();
    this.bookingChange = this.bookingService.getEnqueryChange()
    .subscribe((data: any[]) => {
      console.log(data);
      
      this.rooms = data;
    
      
      this.makeRoomForUI();
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

  boxClicked(time, i, roomTimes, room) {
    if(time) {
      return
    }
    console.log(room,roomTimes, i);
    console.log("good to go");
   this.bookingService.timeTransfer(roomTimes);
    this.show = true;
    this.roomId = room._id;
    console.log(this.roomId);
  }


}
