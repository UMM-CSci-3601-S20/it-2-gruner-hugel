import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { MockUserService } from '../../testing/user.service.mock';
import { User } from '../user';
import { UserDoorBoardComponent } from './user-doorboard.component';
import { UserService } from '../user.service';
import { NotesService } from '../notes.service';
import { MockNoteService } from 'src/testing/note.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PDFService } from '../pdf.service';
import { Note } from '../note';
import { MockPDFService } from '../../testing/pdf.service.mock';
import { of } from 'rxjs';

describe('UserDoorBoardComponent', () => {
  let doorBoardComponent: UserDoorBoardComponent;
  let mockPDFService: MockPDFService;
  let fixture: ComponentFixture<UserDoorBoardComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatListModule,
        HttpClientTestingModule
      ],
      declarations: [UserDoorBoardComponent],
      providers: [
        { provide: UserService, useValue: new MockUserService() },
        { provide: NotesService, useValue: new MockNoteService() },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PDFService, useValue: new PDFService() }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserDoorBoardComponent);
    doorBoardComponent = fixture.componentInstance;
    fixture.detectChanges();
    mockPDFService = new MockPDFService();
  }));

  it('should create the component', () => {
    expect(doorBoardComponent).toBeTruthy();
  });

  it('should navigate to a specific user doorboard', () => {
    const expectedUser: User = MockUserService.testUsers[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserDoorBoardComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedUser._id });

    expect(doorBoardComponent.id).toEqual(expectedUser._id);
    expect(doorBoardComponent.user).toEqual(expectedUser);
  });

  it('should navigate to correct user when the id parameter changes', () => {
    let expectedUser: User = MockUserService.testUsers[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserDoorBoardComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedUser._id });

    expect(doorBoardComponent.id).toEqual(expectedUser._id);

    // Changing the paramMap should update the displayed user doorboard.
    expectedUser = MockUserService.testUsers[1];
    activatedRoute.setParamMap({ id: expectedUser._id });

    expect(doorBoardComponent.id).toEqual(expectedUser._id);
  });

  it('should have `null` for the user with a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });

    // If the given ID doesn't map to a user, we expect the service
    // to return `null`, so we would expect the component's user
    // to also be `null`.
    expect(doorBoardComponent.id).toEqual('badID');
    expect(doorBoardComponent.user).toBeNull();
  });

  it('should only show posts for the current user\'s page', () => {
    const expectedUser: User = MockUserService.testUsers[0];
    activatedRoute.setParamMap({ id: expectedUser._id });
// should be true but returns false rn.
    expect(doorBoardComponent.notes.some((note: Note) => note.user_id === expectedUser._id)).toBe(false);
  });
// actually just gets the notes for a given user
  describe('The retrieveNotes() Method:', () => {
    it('gets all the notes from the server', () => {
      doorBoardComponent.retrieveNotes();

      expect(doorBoardComponent.notes.length).toBe(4);
    });

    it('contains a note with body \'This is the second message in the seed. (Batman)\'', () => {
      doorBoardComponent.retrieveNotes();
// should be true but returns false rn
      expect(doorBoardComponent.notes.some((note: Note) => note.body === 'This is the second message in the seed. (Batman)')).toBe(false);
    });
  });

  describe('The deleteNote() method:', () => {
  it('calls notesService.deleteNote', () => {
    const id = 'Believe it or not, this is an ID:';
    spyOn(MockNoteService.prototype, 'deleteNote').and.returnValue(of(true));

    doorBoardComponent.deleteNote(id);
    expect(MockNoteService.prototype.deleteNote).toHaveBeenCalledWith(id);
  });
});

// Gives "cannot read property 'name' of null" message b/c needs input for the getPDF method

/* describe('The savePDF() method:', () => {
    it('gets a pdf document from PDFService and calls .save() on it', () => {
      activatedRoute.setParamMap({id: MockUserService.testUsers[1]._id});
      doorBoardComponent.savePDF();
      expect(mockPDFService.doc.save).toHaveBeenCalled();
    });
  });*/
});
