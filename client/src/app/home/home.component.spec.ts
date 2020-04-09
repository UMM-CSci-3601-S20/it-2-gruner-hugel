import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import { MatCardModule } from '@angular/material/card';
import { PDFService } from '../pdf.service';
import { MockPDFService } from 'src/testing/pdf.service.mock';
import { UserService } from '../user.service';
import { User } from '../user';
import { MockUserService } from 'src/testing/user.service.mock';

describe('Home:', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPDFService: MockPDFService;
  let mockUserService: MockUserService;

  beforeEach(() => {
    mockPDFService = new MockPDFService();
    mockUserService = new MockUserService();

    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [HomeComponent], // declare the test component
      providers: [{provide: PDFService, useValue: mockPDFService},
        {provide: UserService, useValue: mockUserService},
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance; // BannerComponent test instance
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The retrieveUsers() method:', () => {

    it('gets all the users from the server', () => {
      component.retrieveUsers();

      expect(component.users.length).toBe(5);
    });
  });

});

