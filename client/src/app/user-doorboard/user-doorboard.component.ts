import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { PDFService } from '../pdf.service';


@Component({
  selector: 'app-user-doorboard',
  templateUrl: './user-doorboard.component.html',
  styleUrls: ['./user-doorboard.component.scss']
})
// starting structure taken from https://github.com/UMM-CSci-3601-S20/it-1-knights-who-say-ni

// This class has access to the user of the doorboard, and all the notes that said user has made
export class UserDoorBoardComponent implements OnInit, OnDestroy {
  constructor(private pdfService: PDFService, private route: ActivatedRoute, private notesService: NotesService,
              private userService: UserService) { }
  notes: Note[];
  user: User;
  id: string;
  getNotesSub: Subscription;
  getUserSub: Subscription;
  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested user.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.getUserSub = this.userService.getUserById(this.id).subscribe(user => this.user = user);
      this.getNotesSub = this.notesService.getUserNotes({ user_id: this.id }).subscribe(notes => this.notes = notes);

    });
  }

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

  unsub(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
  }

  savePDF(): void {
    this.pdfService.getPDF(this.user.name).save('DoorBoard.pdf');
  }

  ngOnDestroy(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
    if (this.getUserSub) {
      this.getUserSub.unsubscribe();
    }
  }

}
