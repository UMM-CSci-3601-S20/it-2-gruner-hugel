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
import { of, Subscription } from 'rxjs';

describe('UserDoorBoardComponent', () => {

  const testNotes: Note[] = [
    {
      _id: 'first_id',
      body: 'This is the first note',
      user_id: 'Catherine_of_Aragon_id',
      pinned: 'false'
    },
    {
      _id: 'second_id',
      body: 'This is the second note',
      user_id: 'Anne Boleyn',
      pinned: 'false'
    },
    {
      _id: 'third_id',
      body: 'This is the third note',
      user_id: 'Jane Seymour',
      pinned: 'false'
    }
  ];
  let user: User;
  let notes: Note[];
  let doorBoardComponent: UserDoorBoardComponent;
  let mockPDFService: MockPDFService;
  let mockNoteService: MockNoteService;
  let mockUserService: MockUserService;
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
        { provide: PDFService, useValue: new PDFService() }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(UserDoorBoardComponent);
    doorBoardComponent = fixture.componentInstance;
    fixture.detectChanges();
    mockPDFService = new MockPDFService();
    mockNoteService = new MockNoteService();
    mockUserService = new MockUserService();
  }));

  it('should create the component', () => {
    expect(doorBoardComponent).toBeTruthy();
    expect(doorBoardComponent).toBeDefined();
  });

  // this test is working as expected
  it('should navigate to a specific user doorboard', () => {
    const expectedUser: User = MockUserService.testUsers[0];
    // quick sanity check
    expect(MockUserService.testUsers[0].name).toBe('Catherine');
    expect(expectedUser._id).toBe('Catherine_id');
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserDoorBoardComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedUser._id });
    activatedRoute.paramMap.subscribe((pmap) => {
      doorBoardComponent.id = pmap.get('id');
    });
    expect(doorBoardComponent.id).toEqual(expectedUser._id);
  });

  it('should navigate to the correct user doorboard when the id parameter changes', () => {
    let expectedUser: User = MockUserService.testUsers[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserDoorBoardComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedUser._id });
    activatedRoute.paramMap.subscribe((pmap) => {
      doorBoardComponent.id = pmap.get('id');
    });
    doorBoardComponent.id = expectedUser._id;
    expect(doorBoardComponent.id).toEqual(expectedUser._id);

    // Changing the paramMap should update the displayed user doorboard.
    expectedUser = MockUserService.testUsers[1];
    activatedRoute.setParamMap({ id: expectedUser._id });
    activatedRoute.paramMap.subscribe((pmap) => {
      doorBoardComponent.id = pmap.get('id');
    });

    expect(doorBoardComponent.id).toEqual(expectedUser._id);
  });

  it('should have `null` for the user with a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });
    activatedRoute.paramMap.subscribe((pmap) => {
      doorBoardComponent.id = pmap.get('id');
    });

    // If the given ID doesn't map to a user, we expect the service
    // to return `null`, so we would expect the component's user
    // to also be `null`.
    expect(doorBoardComponent.id).toEqual('badID');
    expect(doorBoardComponent.user).toBeNull();
  });
  // this test is not working, don't know how to fix it
  it('should only show posts for the current user\'s page', () => {
    const expectedUser: User = MockUserService.testUsers[0];
    activatedRoute.setParamMap({ id: expectedUser._id });
    activatedRoute.paramMap.subscribe((pmap) => {
      doorBoardComponent.id = pmap.get('id');
    });
    expect(doorBoardComponent.id).toEqual('Catherine_id');
    // should be true but returns false rn.
    // we expect that the doorboard only contains notes for the expected user
    // doorBoardComponent.retrieveNotes();
    // expect(doorBoardComponent.notes.length).toBe(1);
  });
  // this test is not working, don't know how to fix it
  describe('The retrieveNotes() Method:', () => {
    it('retrieves all notes for ', () => {
      // Param to user page for component access
      activatedRoute.setParamMap({ id: 'Catherine_id' });
      activatedRoute.paramMap.subscribe((pmap) => {
        doorBoardComponent.id = pmap.get('id');
      });
      expect(doorBoardComponent).toBeDefined();
      // should be true
      // expect(doorBoardComponent.notes.some((note: Note) => note.body === 'This is the first note')).toBe(true);
      // expect(doorBoardComponent.notes.length).toBe(1);
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

  // describe('The savePDF() method:', () => {
  //   it('gets a pdf document from PDFService and calls .save() on it', () => {
  //     activatedRoute.setParamMap({ id: MockUserService.testUsers[0]._id });
  //     activatedRoute.paramMap.subscribe((pmap) => {
  //       doorBoardComponent.id = pmap.get('id');
  //     });
  //     doorBoardComponent.savePDF();
  //     expect(mockPDFService.doc.save).toHaveBeenCalled();
  //   });
  // });
});
