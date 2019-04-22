import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Room } from '../../models/room.model';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';
import { Event } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit, OnDestroy {
  addRoomForm: FormGroup;
  roomListener: Subscription;
  rooms: Room[] = [];
  header = ['Room Name', 'Capcity', 'Edit', 'Delete', 'AC', "Mic", 'Projector', 'WIFI','Floor'];
  updateMode: Boolean = false;
  id: String = '';
  index: any = null;
  roomExist: Boolean = false;
  features: any[] = ['ac', 'mic', 'projector', 'wifi'];
  location=[];
  lat:number=12.924260;
  lng:number=77.491340;
  constructor(private roomService: RoomService) { }

  ngOnInit() {
 
    this.addRoomForm = new FormGroup({
      'room_name': new FormControl(null, Validators.required),
      'room_capacity': new FormControl(null, Validators.required),
      'features': new FormArray([]),
      'floor': new FormControl(null, Validators.required)
    });

    this.addCheckboxes()
    this.roomService.getRoom();
    this.roomListener = this.roomService.getRoomChange()
      .subscribe(data => {
        if (this.updateMode) {
          this.updateMode = false;
        }
        this.addRoomForm.reset();
        this.rooms = data;

      })

  }

  addCheckboxes() {
    this.features.map((el, i) => {
      const control = new FormControl();
      (this.addRoomForm.controls.features as FormArray).push(control)
    })

  }

  onDeleteRow(i: any) {
    let id = this.rooms[i]._id;
    this.roomService.deleteRoom(id, i)
  }

  ngOnDestroy() {
    this.roomListener.unsubscribe();
  }

  onUpdateRow(i: any) {
    this.index = i;
    let row = this.rooms[i];
    let feature = [];
    for(let key in row) {
      if(this.features.includes(key)) {
        feature.push(row[key])
      }
    }
    
    this.addRoomForm.patchValue({
      'room_name': row.room_name,
      'room_capacity': row.room_capacity,
      'features': feature,

    })

    this.updateMode = true;
    this.id = row._id;
  }

  onSubmit() {
    let room: Room = {
      room_name: this.addRoomForm.value.room_name,
      room_capacity: this.addRoomForm.value.room_capacity,
      floor: this.addRoomForm.value.floor,
      ac: this.addRoomForm.value.features[0],
      mic: this.addRoomForm.value.features[1],
      projector: this.addRoomForm.value.features[2],
      wifi: this.addRoomForm.value.features[3],

    }

    if (!room.room_name || !room.room_capacity) {
      return;
    }
    if (!this.updateMode) {
      this.roomService.addRoom(room);
    } else {
      this.roomService.updateRoom(this.id, this.index, room);

    }
  }

  onRoomChange(e) {
    console.log(e.target.value);
    let roomName = e.target.value;
    let room = this.rooms.filter(el => el.room_name === roomName);
    if (room.length > 0) {
      this.roomExist = true;
    } else {
      this.roomExist = false;
    }
  }
}