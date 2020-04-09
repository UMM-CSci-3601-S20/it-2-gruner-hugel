import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-save-made',
  templateUrl: './save-madenote.component.html',
  styleUrls: ['./save-madenote.component.scss']
})
export class SaveMadeComponent implements OnInit {

  saveMadeNoteForm: FormGroup;

  note: Note;
  id: string;
  userID: string;
  getNoteSub: Subscription;

  constructor(private fb: FormBuilder, private noteService: NotesService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
  }

  saveMadeNoteValidationMessages = {
    body: [
      {type: 'required', message: 'Body is required'},
      {type: 'minlength', message: 'Body must be at least 2 characters long'},
      {type: 'maxlength', message: 'Body cannot be more than 300 characters long'}
    ]
  };

  createForms() {

    // edit note form validations
    this.saveMadeNoteForm = this.fb.group({
      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300),
      ])),
    });

  }

   ngOnInit() {
    this.createForms();
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.userID = pmap.get('userID');
      if (this.getNoteSub) {
        this.getNoteSub.unsubscribe();
      }
      this.getNoteSub = this.noteService.getNoteById(this.id).subscribe(retrievedNote => this.
        saveMadeNoteForm.get('body').setValue(retrievedNote.body));
    });
  }

  submitForm() {
    this.noteService.editNote(this.saveMadeNoteForm.value, this.id).subscribe(newID => {
      this.snackBar.open('Successfully saved the stored note', null, {
        duration: 2000,
      });
      this.router.navigate(['notes/save/' + this.userID]);
    }, err => {
      this.snackBar.open('Failed to save the stored note', null, {
        duration: 2000,
      });
    });
  }

  ngOnDestroy(): void {
    if (this.getNoteSub) {
      this.getNoteSub.unsubscribe();
    }
  }

}
