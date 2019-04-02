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

  constructor(private http: HttpClient) {}

  getBookingChange() {
    return this.bookingChange.asObservable();
  }

  getBookingTable() {
    this.http.get<any[]>(`${baseUrl}/api/booking`) 
    .subscribe(data => {
      this.bookings = data;
      this.bookingChange.next(this.bookings)
    })
  }
}