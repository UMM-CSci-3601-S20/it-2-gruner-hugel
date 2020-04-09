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
      _id: 'Catherine_id',
      name: 'Catherine',
      officeID: '1310',
      email: 'rmjohns@morris.umn.edu',
      building: 'Science'
    },
    {
      _id: 'Anne_id',
      name: 'Anne',
      officeID: '1375',
      email: 'chaud072@morris.umn.edu',
      building: 'Science'
    },
    {
      _id: 'Jane_id',
      name: 'Jane',
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

    // the id being passed to getUserById from the user doorboard is null
    if (id === (MockUserService.testUsers[0]._id)) {
      return of(MockUserService.testUsers[0]);
    } else {
      // we are hitting this even when the first user id should match
      return of(null);
    }
  }

}
