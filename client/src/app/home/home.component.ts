import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  public users: User[];
  getUsersSub: Subscription;

  constructor(private userService: UserService) { }

  retrieveUsers(): void {
    this.unsub();
    this.getUsersSub = this.userService.getUsers().subscribe(returnedUsers => {
      this.users = returnedUsers;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getUsersSub) {
      this.getUsersSub.unsubscribe();
    }
  }
}
