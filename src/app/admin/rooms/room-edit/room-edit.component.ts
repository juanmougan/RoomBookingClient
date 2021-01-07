import { Layout, LayoutCapacity } from './../../../model/Room';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/model/Room';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { FormResetService } from 'src/app/form-reset.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css'],
})
export class RoomEditComponent implements OnInit, OnDestroy {
  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout; // To use the enum in the HTML

  roomForm: FormGroup;

  resetEventSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {}

  ngOnInit() {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    );
  }

  ngOnDestroy() {
    this.resetEventSubscription.unsubscribe();
  }

  initializeForm() {
    this.roomForm = this.formBuilder.group(
      { 
        roomName : [this.room.name, Validators.required],
        location : [this.room.location, [Validators.required, Validators.minLength(2)]]
      }
    );

    for (const layout of this.layouts) {
      const layoutCapacity = this.room.capacities.find( lc => lc.layout === Layout[layout] );
      const initialCapacity = layoutCapacity?.capacity;
      this.roomForm.addControl(
        `layout${layout}`,
        this.formBuilder.control(initialCapacity)
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
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
      
      if(this.room.id == null) {
        this.dataService.addRoom(this.room).subscribe(
          next => {
            this.router.navigate(['admin', 'rooms'], { queryParams : { action : 'view', id : next.id } });
          }
        );
      } else {
        this.dataService.updateRoom(this.room).subscribe(
          // TODO maybe I can extract this lambda to avoid duplication
          next => {
            this.router.navigate(['admin', 'rooms'], { queryParams : { action : 'view', id : next.id } });
          }
        );
      }
    }
  }
}
