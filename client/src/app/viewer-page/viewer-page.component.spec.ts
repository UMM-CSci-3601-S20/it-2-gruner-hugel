import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewerPageComponent } from './viewer-page.component';
import { MockNoteService } from 'src/testing/note.service.mock';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { UserService } from '../user.service';
import { MockUserService } from 'src/testing/user.service.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';


describe('ViewerPageComponent:', () => {
  let component: ViewerPageComponent;
  let fixture: ComponentFixture<ViewerPageComponent>;
  let mockNoteService: MockNoteService;
  let mockUserService: MockUserService;
  let httpTestingController: HttpTestingController;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(() => {
    mockNoteService = new MockNoteService();
    mockUserService = new MockUserService();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ViewerPageComponent],
      providers: [{ provide: NotesService, useValue: mockNoteService },
      { provide: UserService, useValue: mockUserService },
      { provide: ActivatedRoute, useValue: activatedRoute },
      ]
    });

    fixture = TestBed.createComponent(ViewerPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('The retrieveNotes() method:', () => {
  //   it('gets all the usernotes', () => {
  //     component.retrieveNotes();
  //     req.flush(testNotes);
  //   });

  //   it('contains a note with body \'This is the first note\'', () => {
  //     component.retrieveNotes();
  //     activatedRoute.setParamMap({ id: 'Catherine_id' });
  //     component.retrieveNotes();

  //     expect(component.notes.some((note: Note) => note.body === 'This is the first note')).toBe(true);
  //   });

  // });
});
