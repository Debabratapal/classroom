import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BookngService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit {
  @Input() show: Boolean = false;
  @Input() roomId;
  @Input() date;
  bookingForm:FormGroup;

  times = [];
  constructor(private bookingService: BookngService) { }

  ngOnInit() {
    this.getTime() 
    this.bookingForm= new FormGroup({
      'start': new FormControl(null), 
      'end':  new FormControl(null)
    })
  }

  getTime() {
    for(var i =10; i<21; i++) {
      if(i===10){
        this.times.push({value: null, label:'Choose Time'})
      }
      this.times.push({value: i,label:`${i}:00`})
    }
  }

  onSubmit() {
    console.log(this.bookingForm.value);
    let start =this.bookingForm.value.start,
    end = this.bookingForm.value.end
    console.log(this.roomId, this.date, start, end);
     let d = new Date(this.date);
     d.setHours(start);
     d.setMinutes(0)
     start = d.getTime();
    d.setHours(end);
    end = d.getTime();
    d.setMinutes(0)
   let data = {
    start_time : start,
    end_time: end,
    room: this.roomId
   }
   console.log(data);
   this.bookingService.bookTheRoom(data);
  }

  closeModal() {
    this.show = false;
  }

}
