import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editNoteForm: FormGroup;

  note: Note;
  id: string;
  getNoteSub: Subscription;

  constructor(private fb: FormBuilder, private noteService: NotesService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
  }

  editNoteValidationMessages = {
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

    // edit note form validations
    this.editNoteForm = this.fb.group({
      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300),
      ])),
      status: new FormControl('', Validators.compose([
        Validators.pattern('^(commonly used|standard)$')
      ]))
    });

  }

   ngOnInit() {
    this.createForms();
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getNoteSub) {
        this.getNoteSub.unsubscribe();
      }
      this.getNoteSub = this.noteService.getNoteById(this.id).subscribe(retrievedNote => this.
        editNoteForm.get('body').setValue(retrievedNote.body));
    });
  }

  submitForm() {
    this.noteService.editNote(this.editNoteForm.value, this.id).subscribe(newID => {
      this.snackBar.open('Successfully edited note', null, {
        duration: 2000,
      });
      this.router.navigate(['']);
    }, err => {
      this.snackBar.open('Failed to edit the note', null, {
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
