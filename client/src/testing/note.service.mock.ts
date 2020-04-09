import { Injectable } from '@angular/core';
import { NotesService } from '../app/notes.service';
import { Note } from '../app/note';
import { of, Observable } from 'rxjs';
import { Mock } from 'protractor/built/driverProviders';

@Injectable()
export class MockNoteService extends NotesService {

  static testNotes: Note[] = [
    {
      _id: 'first_id',
      body: 'This is the first note',
      user_id: 'Catherine_id',
      pinned: 'false'
    },
    {
      _id: 'second_id',
      body: 'This is the second note',
      user_id: 'Anne_id',
      pinned: 'false'
    },
    {
      _id: 'third_id',
      body: 'This is the third note',
      user_id: 'Jane_id',
      pinned: 'false'
    }
  ];

  public static FAKE_BODY = 'This is definitely the note you wanted';
  public static FAKE_USER_ID = 'Anne of Cleaves';

  constructor() {
    super(null);
  }

  getNotes() {
    return of(MockNoteService.testNotes);
  }

  deleteNote(id: string) {
    return of(true);
  }

  addNote(note) {
    return of('I just put your note in the database and this is its new ID');
  }

  editNote(note: Note, id: string) {
    return of(id);
  }

  getNoteById(id: string) {
    return of({
      _id: id,
      body: MockNoteService.FAKE_BODY,
      user_id: MockNoteService.FAKE_USER_ID,
      pinned: 'false'
    });
  }

  getUserNotes({user_id: id}): Observable<Note[]> {
    let userNotes: Note[];
    for (let x = 0; x < MockNoteService.testNotes.length; x++) {
      // if an entry has the correct id
      if (MockNoteService.testNotes[x].user_id === id) {
        // then copy that note into the userNotes array
        userNotes[x] = MockNoteService.testNotes[x];
       }
      }
    return of(userNotes);
  }

  // getUserNotes({user_id: id }) {
  //   let x = 0;
  //   while (x < MockNoteService.testNotes.length) {
  //     if (MockNoteService.testNotes[x].user_id !== id) {
  //       MockNoteService.testNotes.splice(x, 1);
  //       x++;
  //     } else { x++; }
  //   }
  //   return of(MockNoteService.testNotes);
  // }

  // retrieveNotes() {
  //   return of(MockNoteService.testNotes);
  // }
}
