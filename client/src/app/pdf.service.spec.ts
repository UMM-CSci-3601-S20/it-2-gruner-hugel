import { PDFService } from './pdf.service';
import * as jsPDF from 'jspdf';

/**
 * This is the jsPDF type, but with more of its methods exposed.
 *
 * jspdf, the library, clearly distinguishes between its public API and its
 * private, internal API.
 *
 * Now, the @types/jspdf module, which provides type declarations for using
 * jspdf in TypeScript, chooses not to expose methods of the jsPDF class
 * that are part of the public API, but that don't have any documentation.
 *
 * This is the wrong decision; those methods are designated for public use and
 * should not be hidden just because their documentation is incomplete.
 *
 * So, here, we declare a new TypeScript type that includes all of the methods
 * declared in @types/jspdf, plus certain methods that @types/jspdf hides, but
 * that we use here anyway.
 */
type RealJsPDF = jsPDF & {
  getNumberOfPages: () => number,
};


describe('The PDF Service:', () => {
  describe('The getPDF() method:', () => {
    let pdfService: PDFService;
    let doc: RealJsPDF;

    beforeEach(() => {
      pdfService = new PDFService();
      doc = pdfService.getPDF('userName', 'userID') as RealJsPDF;
    });

    it('makes a document with exactly one page', () => {
      expect(doc.getNumberOfPages()).toEqual(1);
    });

    it('makes a document using letter-size paper', () => {
      // In inches
      // (Leave room for some unit conversion rounding errors.)
      expect(doc.internal.pageSize.width).toBeCloseTo(8.5);
      expect(doc.internal.pageSize.height).toBeCloseTo(11);
    });
  });
});
