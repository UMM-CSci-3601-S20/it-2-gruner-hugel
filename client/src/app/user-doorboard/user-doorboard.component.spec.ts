import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../user';
import { UserService } from '../user.service';
import { empty } from 'rxjs';

describe('User service: ', () => {
  // A small collection of test users
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
    // Construct an instance of the service with the mock
    // HTTP client.
    userService = new UserService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /*it('getUsers() calls api/users', () => {
    // Assert that the users we get from this call to getUsers()
    // should be our set of test users. Because we're subscribing
    // to the result of getUsers(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testUsers) a few lines
    // down.
    userService.getUsers().subscribe(
      users => expect(users).toBe(testUsers)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(userService.userUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testUsers);
  });

  it('getUsers() calls api/users with filter parameter \'name\'', () => {

    userService.getUsers({ name: 'Cow Tipper' }).subscribe(
      users => expect(users).toBe(testUsers)
    );

    // Specify that (exactly) one request will be made to the specified URL with the name parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(userService.userUrl) && request.params.has('name')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the user returned is 'Cow Tipper'
    expect(req.request.params.get('name')).toEqual('Cow Tipper');

    req.flush(testUsers);
  });

  it('getUsers() calls api/users with filter parameter \'officeID\'', () => {

    userService.getUsers({ officeID: '9999' }).subscribe(
      users => expect(users).toBe(testUsers)
    );

    // Specify that (exactly) one request will be made to the specified URL with the officeID parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(userService.userUrl) && request.params.has('officeID')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'officeID'
    expect(req.request.params.get('officeID')).toEqual('9999');

    req.flush(testUsers);
  });

  it('getUsers() calls api/users with filter parameter \'building\'', () => {

    userService.getUsers({ building: 'Some pasture' }).subscribe(
      users => expect(users).toBe(testUsers)
    );

    // Specify that (exactly) one request will be made to the specified URL with the officeID parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(userService.userUrl) && request.params.has('building')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'officeID'
    expect(req.request.params.get('building')).toEqual('Some pasture');

    req.flush(testUsers);
  });

  it('getUsers() calls api/users with multiple filter parameters', () => {
    userService.getUsers({ name: 'Alien', building: 'The moon', officeID: '9999' }).subscribe(
      users => expect(users).toBe(testUsers)
    );

    // Specify that exactly one request will be made to the specified URL with these parameters.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(userService.userUrl) && request.params.has('name')
        && request.params.has('officeID')
        && request.params.has('building')
    );
    // Should be a GET request
    expect(req.request.method).toEqual('GET');

    // Should have expected parameters
    expect(req.request.params.get('name')).toEqual('Alien');
    expect(req.request.params.get('officeID')).toEqual('9999');
    expect(req.request.params.get('building')).toEqual('The moon');

    req.flush(testUsers);
  });*/

  /**
   * Commented out above because as of now no filters exist, but may later
   * making these tests useful.
   */

  it('getUserById() calls api/users/id', () => {
    // grab an user from our test array
    const targetUser: User = testUsers[1];
    // pull the id from that user
    const targetId: string = targetUser._id;
    // get that user from the server and check that you got the right one
    userService.getUserById(targetId).subscribe(
      user => expect(user).toBe(targetUser)
    );

    const expectedUrl: string = userService.userUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    // should be a GET request
    expect(req.request.method).toEqual('GET');
    req.flush(targetUser);
  });


  it('addUser() calls api/users/new', () => {

    userService.addUser(testUsers[1]).subscribe(
      id => expect(id).toBe('testid')
    );

    const req = httpTestingController.expectOne(userService.userUrl + '/new');

    expect(req.request.method).toEqual('NOTE');
    expect(req.request.body).toEqual(testUsers[1]);

    req.flush({ id: 'testid' });
  });

});
