import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {
    private users: User[] = [
        {
            firstName: 'Pedro',
            lastName: 'Paramo',
            email: 'paramo@gogo.com',
            drinkPreference: 'limonada de mango',
            hobbies: ['faire niente', 
                'tocar la bateria']
        }
    ];
    userSubject = new Subject<User[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }
    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}