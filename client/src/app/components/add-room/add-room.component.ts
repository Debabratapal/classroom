import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../models/room.model';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';
import { Event } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl:'./add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit,OnDestroy {
  addRoomForm:FormGroup;
  roomListener: Subscription;
  rooms: Room[] = [];
  header = ['Room Name', 'Capcity', 'Edit', 'Delete'];
  updateMode:Boolean = false;
  id:String = '';
  index:any = null;
  roomExist:Boolean = false;

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.addRoomForm = new FormGroup({
      'room_name': new FormControl(null, Validators.required),
      'room_capacity': new FormControl(null, Validators.required)
    });
    this.roomService.getRoom();
    this.roomListener = this.roomService.getRoomChange()
    .subscribe(data => {
      if(this.updateMode) {
        this.updateMode = false;
      }
      this.addRoomForm.reset();
      this.rooms = data;
      
    })
    
  }

  onDeleteRow(i:any) {
    let id = this.rooms[i]._id;
    this.roomService.deleteRoom(id, i)
  }

  ngOnDestroy() {
    this.roomListener.unsubscribe();
  }

  onUpdateRow(i:any) {
    this.index = i;
    let row = this.rooms[i];
    this.addRoomForm.patchValue({
      'room_name': row.room_name,
      'room_capacity': row.room_capacity
    })

    this.updateMode = true;
    this.id = row._id;
  }

  onSubmit()  {
    
    let room:Room = {
      room_name: this.addRoomForm.value.room_name,
      room_capacity: this.addRoomForm.value.room_capacity
    }
    if(!room.room_name || !room.room_capacity) {
      return;
    }
    if(!this.updateMode) {
      this.roomService.addRoom(room);
    } else {
      this.roomService.updateRoom(this.id, this.index, room);

    }
  }

  onRoomChange(e) {
    console.log(e.target.value);
    let roomName = e.target.value;
    let room = this.rooms.filter(el => el.room_name === roomName);
    if(room.length>0) {
      this.roomExist = true;
    } else {
      this.roomExist = false;
    }
  }
}