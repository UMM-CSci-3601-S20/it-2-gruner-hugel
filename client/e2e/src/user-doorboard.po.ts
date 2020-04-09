import { browser, by, element, Key, ElementFinder } from 'protractor';

export class UserDoorBoard {

  navigateTo() {
    return browser.get('/notes/user/588935f57546a2daea44de7c'); // santa's doorboard from the seed
  }

  getUnpinnedNoteCards() {
    return element(by.className('unpinned-note-container')).all(by.className('note-card'));
  }

  getPinnedNoteCards() {
    return element(by.className('pinned-note-container')).all(by.className('note-card'));
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  clickAddNote() {
    return element(by.className('add-note-button')).click();
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  submitAddNote() {
    return element(by.buttonText('ADD NOTE')).click();
  }

  clickPinNote(card: ElementFinder) {
    return card.element(by.className('note-action pin')).click();
  }

  clickUnpinNote(card: ElementFinder) {
    return card.element(by.className('note-action unpin')).click();
  }

  clickEditNote(card: ElementFinder) {
    return card.element(by.className('note-action edit')).click();
  }
  clickDeleteNote(card: ElementFinder) {
    return card.element(by.className('note-action delete')).click();
  }
}
