import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate : string;
  // TODO delete
  // localizedDate: string = `O, si sos de 🇦🇷: ${formatDate(this.selectedDate, 'dd-MMMM-yyyy', 'es-Ar')}`

  bookings: Array<Booking>;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      (next) => {
        this.bookings = next;
      }
    );
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], { queryParams: { id } });
  }

  deleteBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe();
  }

}
