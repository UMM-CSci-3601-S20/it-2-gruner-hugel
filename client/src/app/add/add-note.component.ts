import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
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
  id: string;

  constructor(private fb: FormBuilder, private noteService: NotesService, private snackBar: MatSnackBar, private router: Router,
              private route: ActivatedRoute) {
  }

  addNoteValidationMessages = {
    body: [
      {type: 'required', message: 'Body is required'},
      {type: 'minlength', message: 'Body must be at least 2 characters long'},
      {type: 'maxlength', message: 'Body cannot be more than 300 characters long'}
    ]
  };

  createForms() {

    // add note form validations
    this.addNoteForm = this.fb.group({
      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300), // Should be changed unless for formatting purposes
      ])),
    });

  }

  ngOnInit() {
    this.createForms();
    // gets user id from api
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
    });
  }

  submitForm() {
    const formResults = this.addNoteForm.value;
    const newNote: Note = {
      _id: undefined,
      body: formResults.body,
      user_id: this.id,
    };
    this.noteService.addNote(this.id, newNote).subscribe(() => {
      this.snackBar.open('Successfully added note', null, {
        duration: 2000,
      });
      this.router.navigate(['/user/' + this.id]);
    }, err => {
      this.snackBar.open('Failed to add the note', null, {
        duration: 2000,
      });
    });
  }

}
