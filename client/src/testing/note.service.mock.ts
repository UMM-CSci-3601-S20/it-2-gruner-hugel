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
      status: 'standard'
    },
    {
      _id: 'second_id',
      body: 'This is the second note',
      status: 'standard'
    },
    {
      _id: 'third_id',
      body: 'This is the third note',
      status: 'commonly used'
    }
  ];

  public static FAKE_BODY = 'This is definitely the note you wanted';

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
      status: MockNoteService.FAKE_STATUS,
    });
  }
}
