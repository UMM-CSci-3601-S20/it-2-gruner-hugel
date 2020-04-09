import {UserDoorBoard} from './user-doorboard.po';
import { protractor, by, element, browser } from 'protractor';

describe('The user doorboard page:', () => {
  let page: UserDoorBoard;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new UserDoorBoard();
    page.navigateTo();
  });
  // seed the database before running these tests

  it('should be at the right page', async () => {
    const url = await page.getUrl();
    expect(url.endsWith('/notes/user/588935f57546a2daea44de7c')).toBe(true);
  });

  it('should have all santa\'s unpinned notes', async () => {
    const notes = await page.getUnpinnedNoteCards().map(e => e.element(by.className('note-card-body')).getText());
    expect(notes).toContain('This is the first message in the seed. (Santa)');
  });

  it('should click the pin note button and pin a note to the top, then upnin it', async () => {
    let firstNoteCard = await page.getUnpinnedNoteCards().first();
    await page.clickPinNote(firstNoteCard);
    // after pinning, we should be able to grab it from the pinned notes (only one note in the seed for santa)
    firstNoteCard = await page.getPinnedNoteCards().first();
    await page.clickUnpinNote(firstNoteCard); // reset for later tests
  });

  it('should click the edit note button and go to the edit notes page', async () => {
    const firstNoteCard = await page.getUnpinnedNoteCards().first();
    await page.clickEditNote(firstNoteCard);

    await browser.wait(EC.urlContains('/notes/edit'), 10000);
    const url = await page.getUrl();
    expect(url.startsWith('/notes/edit'));
  });

  it('should click the add note button and go to the add notes page', async () => {
    await page.clickAddNote();
    await browser.wait(EC.urlContains('/new'));
    const url = await page.getUrl();
    expect(url.endsWith('/new')).toBe(true);
  });

  it('should click the delete note button and delete the note', async () => {
    const firstNoteCard = await page.getUnpinnedNoteCards().first();
    await page.clickDeleteNote(firstNoteCard);
    expect(page.getUnpinnedNoteCards()).not.toContain(firstNoteCard);
    // bring the seed back so tests can be run without re-seeding
    await page.clickAddNote();
    await browser.wait(EC.urlContains('/new'));
    await page.typeInput('bodyField', 'This is the first message in the seed. (Santa)');
    await page.submitAddNote();
  });
});
