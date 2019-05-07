import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookngService } from 'src/app/services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enquery',
  templateUrl: './enquery.component.html',
  styleUrls: ['./enquery.component.css']
})
export class EnqueryComponent implements OnInit, OnDestroy {
  bookingChange:Subscription;
 
  rooms = [];
  times = [];
  @Input() date ;
  roomId= null;
  show:Boolean =false;
  constructor(private bookingService: BookngService) { }

  ngOnInit() {
    this.bookingChange = this.bookingService.getEnqueryChange()
    .subscribe((data: any[]) => {
      
      this.rooms = data.slice();
      this.makeRoomForUI();
      
      
    })
  }

  ngOnDestroy() {
    this.bookingChange.unsubscribe();
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
   
  }

  boxClicked(time, i, roomTimes, room) {
    if(time) {
      return
    }
   this.bookingService.timeTransfer(roomTimes);
    this.show = true;
    this.roomId = room._id;
  }


}
