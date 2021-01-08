import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      (next) => {
        this.bookings = next;
      }
    );
  }

}
