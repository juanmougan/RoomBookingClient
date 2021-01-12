export class Room {
    id: number;
    name: string;
    location: string;
    capacities = new Array<LayoutCapacity>();

    static fromJson(jsonRoom: Room): Room {
        const newRoom = new Room();
        newRoom.id = jsonRoom.id;
        newRoom.name = jsonRoom.name;
        newRoom.location = jsonRoom.location;
        newRoom.capacities = new Array<LayoutCapacity>();
        jsonRoom.capacities.forEach( lc => newRoom.capacities.push(LayoutCapacity.fromJson(lc)) );
        return newRoom;
    }

    static fromJsonList(jsonList: Array<Room>): Array<Room> {
        let rooms = new Array<Room>();
        for (const room of jsonList) {
            rooms.push(Room.fromJson(room));
        }
        return rooms;
    }
}

export class LayoutCapacity {
    layout: Layout;
    capacity: number;

    static fromJson(jsonLayoutCapacity: LayoutCapacity): LayoutCapacity {
        const newLayoutCapacity = new LayoutCapacity();
        newLayoutCapacity.capacity = jsonLayoutCapacity.capacity;
        newLayoutCapacity.layout = Layout[jsonLayoutCapacity.layout];
        return newLayoutCapacity;
    }
}

export enum Layout {
    THEATER = 'Theater',
    USHAPE = 'U-Shape',
    BOARD = 'Board Meeting'
}
