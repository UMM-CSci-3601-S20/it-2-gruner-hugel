import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as jsPDF from 'jspdf';


@Injectable()
export class PDFService {
  constructor() {
  }

  /**
   * Returns a jsPDF object with a link to a user's
   * DoorBoard page.
   */
  getPDF(userName: string, userID: string): jsPDF {
    const url: string = environment.BASE_URL + '/notes/user/' + userID + '/viewer';

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
      align: 'center'
    });

    doc.setFontSize(18);
    doc.text(userName + '\'s DoorBoard', (8.5 / 2), 4, { align: 'center' });
    doc.setFontSize(14);
    doc.text(url, (8.5 / 2), 4.5, { align: 'center' });

    return doc;
  }
}
