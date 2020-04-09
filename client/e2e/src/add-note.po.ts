import { browser, element, by } from 'protractor';

export interface TestNote {
  body: string;
}

export class AddNotePage {

  navigateTo() {
    return browser.get('/new');
  }

  getTitle() {
    const title = element(by.className('add-note-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  clickAddNote() {
    return element(by.buttonText('ADD NOTE')).click();
  }

  getUrl() {
    return browser.getCurrentUrl();
  }
}
