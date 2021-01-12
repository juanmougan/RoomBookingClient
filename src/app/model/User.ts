export class User {
    id: number;
    name: string;

    static fromJson(jsonUser: User): User {
        const newUser = new User();
        newUser.id = jsonUser.id;
        newUser.name = jsonUser.name;
        return newUser;
    }

    static fromJsonList(jsonList: Array<User>): Array<User> {
        let users = new Array<User>();
        for (const user of jsonList) {
            users.push(User.fromJson(user));
        }
        return users;
    }
}
