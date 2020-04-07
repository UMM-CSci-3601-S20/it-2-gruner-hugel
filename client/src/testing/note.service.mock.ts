import { Injectable } from '@angular/core';
import { NotesService } from '../app/notes.service';
import { Note } from '../app/note';
import { of } from 'rxjs';

@Injectable()
export class MockNoteService extends NotesService {

  static testNotes: Note[] = [
    {
      _id: 'first_id',
      body: 'This is the first note',
      user_id: 'Catherine of Aragon'
    },
    {
      _id: 'second_id',
      body: 'This is the second note',
      user_id: 'Anne Boelyn'
    },
    {
      _id: 'third_id',
      body: 'This is the third note',
      user_id: 'Jane Seymour'
    }
  ];

  public static FAKE_BODY = 'This is definitely the note you wanted';
  public static FAKE_USER_ID = 'Anne of Cleves';

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
      user_id: MockNoteService.FAKE_USER_ID
    });
  }
// this should be refactored ASAP
  getUserNotes({user_id: id}) {
    // I have while x < 2 here because our test array only has 3 entries. If we modify that length this test won't work properly
    for (let x = 0; x < 2; x++) {
      // if an entry doesn't have the correct id
      if (MockNoteService.testNotes[x].user_id !== id) {
        // then remove it and reindex the array to all entries after
        MockNoteService.testNotes.splice(x + 1, 2);
        x++;
       } else { x++; } // assertion: user_id === id, so we just iterate
      }
    return of(MockNoteService.testNotes);
  }
}
