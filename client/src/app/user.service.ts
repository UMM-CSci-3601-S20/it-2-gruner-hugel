import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class UserService {

  readonly userUrl: string = environment.API_URL + 'users';

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  // needed for getting the user doorboards (we grab the user id from the url, and we need to get the actual user from that as well)
  getUserById(id: string) {
    return this.httpClient.get<User>(this.userUrl + '/' + id);
  }
}
