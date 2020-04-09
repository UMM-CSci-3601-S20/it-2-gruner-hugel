import { AddNotePage, TestNote } from './add-note.po';
import { by, element, browser, protractor } from 'protractor';
import { E2EUtil } from './e2e.util';


describe('Add note:', () => {
  let page: AddNotePage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AddNotePage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTitle()).toEqual('New Note');
  });

  it('Should enable and disable the add note button', async () => {
    expect(element(by.buttonText('ADD NOTE')).isEnabled()).toBe(false);
    await page.typeInput('bodyField', 'test');

    expect(element(by.buttonText('ADD NOTE')).isEnabled()).toBe(true);

    await page.typeInput('bodyField', E2EUtil.randomText(1000));
    expect(element(by.buttonText('ADD NOTE')).isEnabled()).toBe(false);
  });

  it('Should add a new note and go to the right page', async () => {
    const note: TestNote = {
      body: E2EUtil.randomText(10)
    };

    await page.typeInput('bodyField', note.body);
    page.clickAddNote();

    await browser.wait(EC.not(EC.urlContains('/new')), 10000);
  });
});
