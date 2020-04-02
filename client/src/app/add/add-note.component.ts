import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Note } from '../note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  addNoteForm: FormGroup;

  note: Note;

  constructor(private fb: FormBuilder, private noteService: NotesService, private snackBar: MatSnackBar, private router: Router) {
  }

  addNoteValidationMessages = {
    body: [
      {type: 'required', message: 'Body is required'},
      {type: 'minlength', message: 'Body must be at least 2 characters long'},
      {type: 'maxlength', message: 'Body cannot be more than 300 characters long'}
    ],
    status: [
      {type: 'required', message: 'Status is required'}
    ]
  };

  createForms() {

    // add note form validations
    this.addNoteForm = this.fb.group({
      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300),
      ])),
      status: new FormControl('', Validators.compose([
        Validators.pattern('^(commonly used|standard)$'),
      ])),
    });

  }

  ngOnInit() {
    this.createForms();
  }

  submitForm() {
    this.noteService.addNote(this.addNoteForm.value).subscribe(newID => {
      this.snackBar.open('Successfully added note', null, {
        duration: 2000,
      });
      this.router.navigate(['']);
    }, err => {
      this.snackBar.open('Failed to add the note', null, {
        duration: 2000,
      });
    });
  }

}
