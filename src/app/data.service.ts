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

  getRooms() : Observable<Array<Room>> {
    return of(null);  // Linter warning is wrong? https://github.com/ReactiveX/rxjs/issues/4723
  }

  getUsers() : Observable<Array<User>> {
    return of(null);
  }

  addUser(user: User, password: string): Observable<User> {
    return of(user);
  }

  nextId(collection: Array<any>): number {
    const ids = Array<number>();
    collection.forEach(e => ids.push(e.id));
    return Math.max(...ids) + 1;
  }

  updateUser(user: User): Observable<User> {
    return of(null);
  }

  updateRoom(room: Room): Observable<Room> {
    return of(null);
  }

  // findRoomById(id: number) {
  //   return this.rooms.find( r => r.id === id );
  // }

  deleteRoom(id: number): Observable<any> {
    return of(null);
  }

  findElementById(id: number, collection: Array<any>) {
    return collection.find( e => e.id === id );
  }

  deleteUser(id: number): Observable<any> {
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  addRoom(room: Room): Observable<Room> {
    return of(null);
  }

  getAllBookings() : Observable<Array<Booking>> {
    return of(null);
  }

  getBookings(date: string) : Observable<Array<Booking>> {
    return of(null);
  }

  getBooking(id: number) : Observable<Booking> {
    return of(null);
  }

  addBooking(booking: Booking) {
    return of(null);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {
    return of(null);
  }

  constructor() {
    console.log(`API URL: ${environment.restUrl}`);
  }
}
