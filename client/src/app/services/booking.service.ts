import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookngService {
  bookings = [];
  bookingChange = new Subject();

  enquiry = [];
  enquiryChange = new Subject();

  constructor(private http: HttpClient) {}

  getBookingChange() {
    return this.bookingChange.asObservable();
  }

  getEnqueryChange() {
    return this.enquiryChange.asObservable();
  }

  getBookingTable() {
    this.http.get<any[]>(`${baseUrl}/api/booking`) 
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
    this.http.post<any[]>(`${baseUrl}/api/booking`,data) 
    .subscribe(data => {
      console.log(data);
      
    })
  }
}