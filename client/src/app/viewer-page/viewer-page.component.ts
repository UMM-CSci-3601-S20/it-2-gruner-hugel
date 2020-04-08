import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.scss']
})

export class ViewerPageComponent implements OnInit {

  public notes: Note[];
  getNotesSub: Subscription;
  user: User;
  id: string;
  getUserSub: Subscription;

  constructor(private notesService: NotesService, private route: ActivatedRoute, private userService: UserService) {}

  retrieveNotes(): void {
    this.unsub();
    this.getNotesSub = this.notesService.getUserNotes({user_id: this.id }).subscribe(returnedNotes =>{
      this.notes = returnedNotes;
      this.getUserSub = this.userService.getUserById(this.id).subscribe(user => this.user = user);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');

    })
    this.retrieveNotes();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
  }

}
