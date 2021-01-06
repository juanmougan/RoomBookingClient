import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room>;
  private users: Array<User>;

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
    const originalRoom = this.rooms.find( r => r.id === room.id );
    originalRoom.name = room.name;
    originalRoom.location = room.location;
    originalRoom.capacities = room.capacities;
    return of(originalRoom);
  }

  addRoom(room: Room): Observable<Room> {
    room.id = this.nextId(this.rooms);
    this.rooms.push(room);
    return of(room);
  }

  constructor() {
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
  }
}
