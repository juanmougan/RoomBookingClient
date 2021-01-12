import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  action: string;
  loadingData = true;
  message = 'Please wait, loading the data';
  reloadAttempts = 0;

  constructor(private dataService: DataService, 
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }
  loadData() {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      (error) => {
        if(error.status === 402) { 
          this.message = 'Sorry, you need to pay'; 
        }
        else {
          this.reloadAttempts++;
          if(this.reloadAttempts <= 10) {
            this.message = 'Sorry, got an error. Trying again...';
            this.loadData();
          } else {
            this.message = 'Sorry, something went wrong. Please contact support.';
          }
        }
      }
    );
  }

  processUrlParams() {
    this.route.queryParams.subscribe(
      (params) => {
        this.action = null;
        const id = params['id'];
        if(id) {
          this.selectedRoom = this.rooms.find( r => {
            return r.id === +id;  // The '+' is a hack to convert String to Number
          } );
          this.action = params['action'];
        }
        if(params['action'] === 'add') {
          this.selectedRoom = new Room();
          this.action = 'edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  setRoom(id: number) {
    // The queryParams are provided as an object
    this.router.navigate(['admin', 'rooms'], { queryParams: { id: id, action: 'view' } });
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], { queryParams: { action: 'add' } });
  }

}
