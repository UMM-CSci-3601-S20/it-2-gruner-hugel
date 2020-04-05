import {Component} from '@angular/core';
import {PDFService} from '../pdf.service';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  public notes: Note[];
  getNotesSub: Subscription;

  constructor(private pdfService: PDFService, private notesService: NotesService) {}

  retrieveNotes(): void {
    this.unsub();
    this.getNotesSub = this.notesService.getNotes().subscribe(returnedNotes => {
      this.notes = returnedNotes;
    }, err => {
      console.log(err);
    });
  }

  deleteNote(id: string): void {
    this.notesService.deleteNote(id).subscribe(result => {
      // Ignore the result for now.
      this.retrieveNotes();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
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

  /*savePDF(): void {
    this.pdfService.getPDF().save('DoorBoard');
  }*/
}
