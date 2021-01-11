import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from './model/Booking';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';
import {formatDate} from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room>;
  private users: Array<User>;
  private bookings: Array<Booking>;

  getRooms() : Observable<Array<Room>> {
    return of(this.rooms);  // Linter warning is wrong? https://github.com/ReactiveX/rxjs/issues/4723
  }

  getUsers() : Observable<Array<User>> {
    return of(this.users);
  }

  addUser(user: User, password: string): Observable<User> {
    user.id = this.nextId(this.users);
    this.users.push(user);
    return of(user);
  }

  nextId(collection: Array<any>): number {
    const ids = Array<number>();
    collection.forEach(e => ids.push(e.id));
    return Math.max(...ids) + 1;
  }

  updateUser(user: User): Observable<User> {
    const originalUser = this.users.find( u => u.id === user.id );
    originalUser.name = user.name;
    return of(originalUser);
  }

  updateRoom(room: Room): Observable<Room> {
    const originalRoom = this.findRoomById(room.id);
    originalRoom.name = room.name;
    originalRoom.location = room.location;
    originalRoom.capacities = room.capacities;
    return of(originalRoom);
  }

  findRoomById(id: number) {
    return this.rooms.find( r => r.id === id );
  }

  deleteRoom(id: number): Observable<any> {
    const room = this.findRoomById(id);
    const roomIndex = this.rooms.indexOf(room);
    this.rooms.splice(roomIndex, 1);
    return of(null);
  }

  findElementById(id: number, collection: Array<any>) {
    return collection.find( e => e.id === id );
  }

  deleteUser(id: number): Observable<any> {
    const user = this.findElementById(id, this.users);
    const userIndex = this.users.indexOf(user);
    this.users.splice(userIndex, 1);
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  addRoom(room: Room): Observable<Room> {
    room.id = this.nextId(this.rooms);
    this.rooms.push(room);
    return of(room);
  }

  getAllBookings() : Observable<Array<Booking>> {
    return of(this.bookings);
  }

  getBookings(date: string) : Observable<Array<Booking>> {
    return of(this.bookings.filter(b => b.date === date));
  }

  getBooking(id: number) : Observable<Booking> {
    return of(this.bookings.find(b => b.id === id));
  }

  addBooking(booking: Booking) {
    booking.id = this.nextId(this.bookings);
    this.bookings.push(booking);
    return of(booking);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    const originalBooking = this.findElementById(booking.id, this.bookings);
    originalBooking.room = booking.room;
    originalBooking.user = booking.user;
    originalBooking.layout = booking.layout;
    originalBooking.title = booking.title;
    originalBooking.date = booking.date;
    originalBooking.startTime = booking.startTime;
    originalBooking.startTime = booking.startTime;
    originalBooking.participants = booking.participants;
    return of(originalBooking);
  }

  deleteBooking(id: number): Observable<any> {
    const booking = this.findElementById(id, this.bookings);
    const bookingIndex = this.bookings.indexOf(booking);
    this.bookings.splice(bookingIndex, 1);
    return of(null);
  }

  constructor() {
    console.log(`API URL: ${environment.restUrl}`);
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.location = 'First Floor';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor';

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;

    room2.capacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);

    this.users = new Array<User>();

    const user1 = new User();
    user1.id = 1;
    user1.name = 'Matt';
    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';
    const user3 = new User();
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = room1;
    booking1.user = user1;
    booking1.layout = Layout.THEATER;
    booking1.title = 'Example meeting';
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;

    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = room2;
    booking2.user = user2;
    booking2.layout = Layout.USHAPE;
    booking2.title = 'Another meeting';
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking2.startTime = '14:00';
    booking2.endTime = '15:00';
    booking2.participants = 5;

    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }
}
