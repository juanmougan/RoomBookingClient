import { Layout, LayoutCapacity } from './../../../model/Room';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css'],
})
export class RoomEditComponent implements OnInit {
  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout; // To use the enum in the HTML

  roomForm = new FormGroup({
    roomName: new FormControl('roomName'),
    location: new FormControl('location'),
  });

  constructor() {}

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName: this.room.name,
      location: this.room.location,
    });

    for (const layout of this.layouts) {
      this.roomForm.addControl(
        `layout${layout}`,
        new FormControl(`layout${layout}`)
      );
    }
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location']; // Both alternatives work
    this.room.capacities = new Array<LayoutCapacity>();
    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.value[`layout${layout}`];
      this.room.capacities.push(layoutCapacity);
      // TODO add a save method on the dataservice
      console.log(this.room);
    }
  }
}
