import { BrowserModule } from '@angular/platform-browser';

// For Locales
import { NgModule, LOCALE_ID } from '@angular/core';

// This would convert to Argentina's date format
// import { registerLocaleData } from '@angular/common';
// import localeEsAr from '@angular/common/locales/es-AR';
// registerLocaleData(localeEsAr);


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { BookingEditComponent } from './calendar/booking-edit/booking-edit.component';

const routes: Routes = [
  { path: `admin/users`, component: UsersComponent },
  { path: `admin/rooms`, component: RoomsComponent },
  { path: `editBooking`, component: BookingEditComponent },
  { path: `addBooking`, component: BookingEditComponent },
  { path: ``, component: CalendarComponent },
  { path: `404`, component: PageNotFoundComponent },
  { path: `**`, redirectTo: `/404` }, // Wildcard must be at the end, matches all
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    RoomsComponent,
    UsersComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    BookingEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    // This would convert to Argentina's date format
    // { provide: LOCALE_ID, useValue: 'es-AR'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
