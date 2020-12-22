import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;

  constructor(private dataService: DataService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.rooms = this.dataService.rooms;
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        if(id) {
          this.selectedRoom = this.rooms.find( r => {
            return r.id === +id;  // The '+' is a hack to convert String to Number
          } );
        }
      }
    );
  }

  setRoom(id: number) {
    // The queryParams are provided as an object
    this.router.navigate(['admin', 'rooms'], { queryParams: { id: id } });
  }

}
