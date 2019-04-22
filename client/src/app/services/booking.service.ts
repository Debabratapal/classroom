import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../../environments/environment';
import { Subject } from 'rxjs';
import { SignupService } from './signup.service';

@Injectable({
  providedIn: 'root'
})
export class BookngService {
  bookings = [];
  bookingChange = new Subject();

  enquiry = [];
  enquiryChange = new Subject();

  time = [];
  timeChange = new Subject()

  constructor(
    private http: HttpClient,
    private authService: SignupService
    ) {}

  getBookingChange() {
    return this.bookingChange.asObservable();
  }

  getEnqueryChange() {
    return this.enquiryChange.asObservable();
  }

  getBookingTable(start) {
    this.http.get<any[]>(`${baseUrl}/api/booking?start=${start}`) 
    .subscribe(data => {
      this.bookings = data;
      this.bookingChange.next(this.bookings)
    })
  }

  getEnqueryTable(data) {

    this.http.post<any[]>(`${baseUrl}/api/booking/enquery`, data)
    .subscribe(data => {
      this.enquiry = data;
      this.enquiryChange.next(this.enquiry)
    })
  }

  bookTheRoom(data) {
    let loggedInUser = this.authService.getUser();
    data.user_id = loggedInUser._id;
    this.http.post<any[]>(`${baseUrl}/api/booking`,data) 
    .subscribe(data => {
      console.log(data);
      
    })
  }

  timeTransfer(time) {
    this.time = time;
    this.timeChange.next(this.time)
  }

  getTimeChange() {
    return this.timeChange.asObservable();
  }
}
