import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from './user';
import { NotesService } from './notes.service';
import { UserService } from './user.service';

describe('Note service:', () => {
  // pulled these from https://github.com/UMM-CSci-3601-S20/it-1-knights-who-say-ni
  const testUsers: User[] = [
    {
      _id: 'testman_id',
      name: 'Test Man',
      officeID: '3168',
      email: 'tman@gmail.com',
      building: 'Testing'
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
    {
      _id: 'alien_id',
      name: 'Alien',
      officeID: '9999',
      email: 'definitelyfriendly@outerspace.com',
      building: 'The moon'
    },
  ];

  let userService: UserService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock HTTP client
    userService = new UserService(httpClient);
  });

  afterEach(() => {
    // After every test, make sure we don't have pending requests
    httpTestingController.verify();
  });

 /* describe('GetUsers() method calls api/users', () => {
    userService.getUsers().subscribe(users => expect(users).toBe(testUsers)
    );

    const req = httpTestingController.expectOne(userService.userUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testUsers);
  });

  describe('GetUserById() method calls api/users/:id', () => {
    const targetUser: User = testUsers[3];
    const targetId: string = targetUser._id;
    userService.getUserById(targetId).subscribe(user => expect(user).toBe(targetUser));

    const req = httpTestingController.expectOne(userService.userUrl + '/alien_id');
    expect(req.request.method).toEqual('GET');
    req.flush(targetUser);
  });*/

});
