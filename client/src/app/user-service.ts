import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly userUrl: string = environment.API_URL + 'users';

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  // adding stub
  addUser(newUser: User): Observable<string> {
    return null;
  }
  // deletion stub
  // this may end being complicated if you have to also delete all the user's messages as well
  deleteUser(id: string): Observable<boolean> {
    return null;
  }
  // editing stub
  editUser(editUser: User, id: string): Observable<string> {
    return null;
  }
}
