/*import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { PDFService } from '../pdf.service';
import { MockPDFService } from 'src/testing/pdf.service.mock';
import { MockNoteService } from 'src/testing/note.service.mock';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { of } from 'rxjs';

describe('Home:', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockPDFService: MockPDFService;
  let mockNoteService: MockNoteService;

  beforeEach(() => {
    mockPDFService = new MockPDFService();
    mockNoteService = new MockNoteService();

    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [HomeComponent], // declare the test component
      providers: [{provide: PDFService, useValue: mockPDFService}, {provide: NotesService, useValue: mockNoteService}],
    });

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // query for the link (<a> tag) by CSS element selector
    de = fixture.debugElement.query(By.css('#generate-pdf-button'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The retrieveNotes() method:', () => {

    it('gets all the notes from the server', () =>{
      component.retrieveNotes();

      expect(component.notes.length).toBe(3);
    });

    it('contains a note with body \'This is the first note\'', () => {
      component.retrieveNotes();

      expect(component.notes.some((note: Note) => note.body === 'This is the first note')).toBe(true);
    });
  });

  describe('The deleteNote() method:', () => {
    it('calls notesService.deleteNote', () => {
      const id = 'Hey everyone, I\'m an ID!';
      spyOn(MockNoteService.prototype, 'deleteNote').and.returnValue(of(true));

      component.deleteNote(id);
      expect(MockNoteService.prototype.deleteNote).toHaveBeenCalledWith(id);
    });
  });

  describe('The savePDF() method:', () => {
    it('gets a pdf document from PDFService and calls .save() on it', () => {
      component.savePDF();
      expect(mockPDFService.doc.save).toHaveBeenCalled();
    });
  });

  describe('The GENERATE PDF button:', () => {
    it('gets a pdf document from PDFService and calls .save() on it', () => {
      el.click();
      expect(mockPDFService.doc.save).toHaveBeenCalled();
    });
  });

});
*/
