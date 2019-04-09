import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookngService } from 'src/app/services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit, OnDestroy {
  time = [];
  timeChangeListener: Subscription;

  @Input() show: Boolean = false;
  @Input() roomId;
  @Input() date;
  bookingForm:FormGroup;

  endTimes = [];
  times = [];
  constructor(private bookingService: BookngService) { }

  ngOnInit() {
    this.timeChangeListener = this.bookingService.getTimeChange()
    .subscribe((time:any[]) => {
      this.time = time;
      console.log(":LLLLL",this.time);
      this.getTime() 
      
    })
    this.bookingForm= new FormGroup({
      'start': new FormControl(null, [Validators.required]), 
      'end':  new FormControl({value:null, disabled: true },[Validators.required])
    })

    
   
  }

  ngOnDestroy() {
    this.timeChangeListener.unsubscribe();
  }

  getTime() {
    
    for(var i =10, j=0; i<=21; i++,j++) {
      
      if(i===10){
        this.times.push({value: null, label:'Choose Time'})
      }
      if(!this.time[j]) {
        this.times.push({value: i,label:`${i}:00`})
      }
    }
  }

  startChange(event) {
    if(this.bookingForm.controls.end.disable) {
      this.endTimes = [];
      this.bookingForm.controls.end.enable();
    } else {
      this.bookingForm.controls.end.disable();
    }
    let start = this.bookingForm.value.start;
    this.getEndTimes(start)
    console.log(this.bookingForm);
    
  }

  getEndTimes(start) {
    for(let i = start, j=start-10; i<=21; i++, j++) {
      if(i===start){
        this.endTimes.push({value: null, label:'Choose Time'});
        i++;
      }
      if(!this.time[j]){
        this.endTimes.push({value:i, label: `${i}:00`})
        continue;
      }
      break;
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
