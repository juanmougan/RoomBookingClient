import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';
import { User } from '../model/User';

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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    // TODO delete
    this.dataService.getUser(13).subscribe((u) => {
      console.log(u);
    });

    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date']
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          (next) => {
            this.bookings = next;
          }
        );
      }
    );
    const allBookings = this.dataService.getAllBookings().subscribe(
      all => all.forEach(e => console.log(e))
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

  dateChanged() {
    this.router.navigate([''], { queryParams: { date: this.selectedDate } });
  }

}
