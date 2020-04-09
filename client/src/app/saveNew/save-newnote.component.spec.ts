import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockNoteService } from 'src/testing/note.service.mock';
import { SaveNewNoteComponent } from './save-newnote.component';
import { NotesService } from '../notes.service';

describe('SaveNewNoteComponent:', () => {
  let saveNewNoteComponent: SaveNewNoteComponent;
  let saveNewNoteForm: FormGroup;
  let calledClose: boolean;
  let fixture: ComponentFixture<SaveNewNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [SaveNewNoteComponent],
      providers: [{ provide: NotesService, useValue: new MockNoteService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(SaveNewNoteComponent);
    saveNewNoteComponent = fixture.componentInstance;
    saveNewNoteComponent.ngOnInit();
    fixture.detectChanges();
    saveNewNoteForm = saveNewNoteComponent.saveNewNoteForm;
    expect(saveNewNoteForm).toBeDefined();
    expect(saveNewNoteForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(saveNewNoteComponent).toBeTruthy();
    expect(saveNewNoteForm).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(saveNewNoteForm.valid).toBeFalsy();
  });

  describe('The body field:', () => {
    let bodyControl: AbstractControl;

    beforeEach(() => {
      bodyControl = saveNewNoteComponent.saveNewNoteForm.controls[`body`];
    });

    it('should not allow empty bodies', () => {
      bodyControl.setValue('');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should be fine with "late to office hours"', () => {
      bodyControl.setValue('late to office hours');
      expect(bodyControl.valid).toBeTruthy();
    });

    it('should fail on single character bodies', () => {
      bodyControl.setValue('x');
      expect(bodyControl.valid).toBeFalsy();
      expect(bodyControl.hasError('minlength')).toBeTruthy();
    });

    it('should fail on really long bodies', () => {
      bodyControl.setValue('x'.repeat(1000));
      expect(bodyControl.valid).toBeFalsy();
      expect(bodyControl.hasError('maxlength')).toBeTruthy();
    });
  });

});
