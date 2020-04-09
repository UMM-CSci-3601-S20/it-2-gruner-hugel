import { browser, element, by } from 'protractor';
import { HomePage } from './home.po';

export class EditNotePage {

  navigateTo() {
    const homePage = new HomePage();
    homePage.navigateTo();
    homePage.editFirstNote();
  }

  getTitle() {
    const title = element(by.className('edit-note-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  clickEditNote() {
    return element(by.buttonText('EDIT NOTE')).click();
  }

  getUrl() {
    return browser.getCurrentUrl();
  }
}
