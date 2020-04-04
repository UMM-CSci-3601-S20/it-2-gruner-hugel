import { HomePage } from "./home.po";
import { browser, protractor } from 'protractor';
import { E2EUtil } from './e2e.util';


describe('The home page:', () => {
  let page: HomePage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('Should click the add note button and navigate to the correct page', async () => {
    let url = await page.getUrl();
    expect(url.endsWith('/new')).toBe(false);

    await page.clickAddNewNote();

    await browser.wait(EC.urlContains('/new'), 10000);

    url = await page.getUrl();
    expect(url.endsWith('/new')).toBe(true);
  });

  describe('The delete button:', () => {
    // Note: these tests depend on there being at least 2 notes seeded in the
    // database.
    // Also, the order in which these tests run matters.

    it('should delete exactly one note when clicked', async () => {
      const initialNumberOfNotes = await page.getNumberOfNotes();
      page.deleteFirstNote();
      expect(await page.getNumberOfNotes()).toBe(initialNumberOfNotes - 1);
    });

    it('should delete all notes when we click all the buttons', async () => {
      expect(await page.getNumberOfNotes()).not.toBe(0);
      await page.deleteAllNotes();
      expect(await page.getNumberOfNotes()).toBe(0);
    });

    it('should be persistent', async () => {
      // Since we've already run the previous two tests, all the notes should
      // be deleted now, even after we re-navigate to the page.
      expect(await page.getNumberOfNotes()).toBe(0);
    });
  });

  /*describe('The edit button:', () => {
    beforeEach(async () => {
      await page.deleteAllNotes();
      await E2EUtil.addNewNote('foo');
    });

    it('navigates to the correct page', async () => {
      let url = await page.getUrl();
      expect(url.includes('/edit')).toBe(false);

      page.editFirstNote();

      await browser.wait(EC.urlContains('/edit'), 10000);

      url = await page.getUrl();
      expect(url.includes('/edit')).toBe(true);
    });
  });*/
});
