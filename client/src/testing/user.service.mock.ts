import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../app/user';
import { UserService } from '../app/user.service';

/**
 * A "mock" version of the `UserService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockUserService extends UserService {
  static testUsers: User[] = [
    {
      _id: 'rachaeljohnson_id',
      name: 'Rachael Johnson',
      officeID: '1310',
      email: 'rmjohns@morris.umn.edu',
      building: 'Science'
    },
    {
      _id: 'indrajitchaudhury_id',
      name: 'Indrajit Chaudhury',
      officeID: '1375',
      email: 'chaud072@morris.umn.edu',
      building: 'Science'
    },
    {
      _id: 'robertdenton_id',
      name: 'Robert Denton',
      officeID: '2065',
      email: 'rdenton@morris.umn.edu',
      building: 'Science'
    },
    {
      _id: 'spaceman_id',
      name: 'Space Man',
      officeID: '9999',
      email: 'moonrocks@hotmail.com',
      building: 'The moon'
    },
    {
      _id: 'cowtipper_id',
      name: 'Cow Tipper',
      officeID: '4512',
      email: 'fiendofthebovine@gmail.com',
      building: 'Some pasture'
    },
  ];

  constructor() {
    super(null);
  }
  // no filters here yet, don't know what we want to have the database filter for us
  getUsers(): Observable<User[]> {
    // Just return the test users regardless of what filters are passed in
    return of(MockUserService.testUsers);
  }

  getUserById(id: string): Observable<User> {
    // If the specified ID is for the first test user,
    // return that user, otherwise return `null` so
    // we can test illegal user requests.
    if (id === MockUserService.testUsers[0]._id) {
      return of(MockUserService.testUsers[0]);
    } else {
      return of(null);
    }
  }

}
