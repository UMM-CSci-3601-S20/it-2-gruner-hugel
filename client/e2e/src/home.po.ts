import { browser, element, by, ElementFinder } from 'protractor';

export class HomePage {

  navigateTo() {
    return browser.get('/');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    const title = element(by.className(''));
  }

  getUserCards() {
    return element(by.className('users-container')).all(by.className('user-card'));
  }

  clickEditDoorBoard(card: ElementFinder) {
    return card.element(by.buttonText('EDIT DOORBOARD')).click();
  }

  clickViewDoorBoard(card: ElementFinder) {
    return card.element(by.buttonText('VIEW DOORBOARD')).click();
  }
}
