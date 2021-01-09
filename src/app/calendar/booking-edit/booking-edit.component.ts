import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Booking } from 'src/app/model/Booking';
import { Layout, Room } from 'src/app/model/Room';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit {

  booking: Booking;
  rooms: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users: Array<User>

  constructor(private router: Router,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
      }
    );
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
      }
    );
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      // Editing
      this.dataService.getBooking(+id).subscribe(
        next => this.booking = next
      );
    } else {
      // Creating
      this.booking = new Booking();
    }
  }

  onSubmit() {
    if (this.booking.id == null) {
      // add booking
      this.dataService.addBooking(this.booking).subscribe(
        () => {
          this.router.navigate(['']);
        }
      );
    } else {
      this.dataService.updateBooking(this.booking).subscribe(
        () => {
          this.router.navigate(['']);
        }
      );
    }
  }

}
