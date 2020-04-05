// import {Component} from '@angular/core';
// import {PDFService} from '../pdf.service';
// import { NotesService } from '../notes.service';
// import { Note } from '../note';
// import { Subscription } from 'rxjs';

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

//   public notes: Note[];
//   getNotesSub: Subscription;

//   constructor(private pdfService: PDFService, private notesService: NotesService) {}

//   retrieveNotes(): void {
//     this.unsub();
//     this.getNotesSub = this.notesService.getNotes().subscribe(returnedNotes => {
//       this.notes = returnedNotes;
//     }, err => {
//       console.log(err);
//     });
//   }

//   deleteNote(id: string): void {
//     this.notesService.deleteNote(id).subscribe(result => {
//       // Ignore the result for now.
//       this.retrieveNotes();
//     }, err => {
//       console.log(err);
//     });
//   }

//   ngOnInit(): void {
//     this.retrieveNotes();
//   }

//   ngOnDestroy(): void {
//     this.unsub();
//   }

//   unsub(): void {
//     if (this.getNotesSub) {
//       this.getNotesSub.unsubscribe();
//     }
//   }

//   savePDF(): void {
//     this.pdfService.getPDF().save('DoorBoard');
//   }
// }
