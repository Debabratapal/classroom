import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms: Room[] = [];
  roomChange = new Subject<Room[]>();

  constructor(private http: HttpClient) {}
  
  getRoomChange() {
    return this.roomChange.asObservable();
  }

  addRoom(room: Room) {
    this.http.post<{status:Boolean,data:Room}>(`${baseUrl}/api/room`, {room})
    .subscribe(result => {
      if(result.status) {
        this.rooms.unshift(result.data);
        this.roomChange.next([...this.rooms])
      }
    })
  }

  getRoom() {
    this.http.get<{status: Boolean, data: Room[]}>(`${baseUrl}/api/room`)
    .subscribe(result => {
      if(result.status) {
        this.rooms = result.data;
        this.roomChange.next([...this.rooms])
      }
    })
  }

  updateRoom(id:String, index:any, room:Room) {
    this.http.put<{status:Boolean}>(`${baseUrl}/api/room/${id}`, {room})
    .subscribe(result => {
      if(result.status) {
        room._id = id;
        this.rooms[index] = room;
        this.roomChange.next([...this.rooms])
      }
    })
  }

  deleteRoom(id:String, index:any) {
    this.http.delete<{status: Boolean}>(`${baseUrl}/api/room/${id}`)
    .subscribe(result => {
      if(result.status) {
        this.rooms.splice(index, 1)
        this.roomChange.next([...this.rooms])
      }
    })
  }
}