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

describe('UserDoorBoardComponent', () => {
  let doorBoardComponent: UserDoorBoardComponent;
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
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserDoorBoardComponent);
    doorBoardComponent = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should have `null` for the user for a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });

    // If the given ID doesn't map to a user, we expect the service
    // to return `null`, so we would expect the component's user
    // to also be `null`.
    expect(doorBoardComponent.id).toEqual('badID');
    expect(doorBoardComponent.user).toBeNull();
  });

});
