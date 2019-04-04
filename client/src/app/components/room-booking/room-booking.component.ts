import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BookngService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.css']
})
export class RoomBookingComponent implements OnInit {
  enquiryForm: FormGroup;
  times = []
  features: any[] = ['ac', 'mic', 'projector', 'wifi'];
  time = null;
  
  constructor(private bookingService: BookngService) { }

  ngOnInit() {

    this.enquiryForm = new FormGroup({
      'capacity': new FormControl(null),
      'time': new FormControl(null),
      'features': new FormArray([])

    })
    for(let i=10; i<21; i++) {
      if(i===10) {
        this.times.push({label: 'Choose Time', value: null})
      }
      this.times.push({label:i+':00', value:i})
    }
    this.addCheckboxes()

  }

  addCheckboxes() {
    this.features.map((el, i) => {
      const control = new FormControl();
      (this.enquiryForm.controls.features as FormArray).push(control)
    })

  }

  selectedTime(event) {
    console.log(event);
    this.time=+event;
  }

  onSubmit() {
    console.log(this.enquiryForm.value);

    let allFeatures = this.enquiryForm.value.features;
    let features = []
    for(var i = 0; i<allFeatures.length; i++) {
      if(allFeatures[i] === true) {
        features.push(this.features[i]);
      }
    }

    let data = {
      room_capacity: this.enquiryForm.value.capacity,
      features,
      time: this.time
    }

    console.log(data);
    this.bookingService.getEnqueryTable(data);
  }
}
