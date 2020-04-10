import { HomePage } from "./home.po";
import { browser, protractor, by, element } from 'protractor';
import { E2EUtil } from './e2e.util';


describe('The home page:', () => {
  let page: HomePage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('Should have all the users', async () => {
    const names = await page.getUserCards().map(e => e.element(by.className('user-card-name')).getText());
    expect(names).toContain('Santa Claus');
    expect(names).toContain('Batman');
    expect(names).toContain('Robert Denton');
    expect(names).toContain('Emily Bruce');
    expect(names).toContain('Rachel Johnson');
  });

  it('Should navigate to a user doorboard when you click on view doorboard', async () => {
    const firstOwnerCard = await page.getUserCards().first();
    await page.clickEditDoorBoard(firstOwnerCard);

    await browser.wait(EC.urlContains('/notes/user'), 10000);
    const url = await page.getUrl();
    expect(url.startsWith('/notes/user/'));
    expect(url.endsWith('viewer')).toBe(false);
  });
  it('Should navigate to the viewDoorBoard component when you click view doorboard', async () => {
    const firstOwnerCard = await page.getUserCards().first();
    await page.clickViewDoorBoard(firstOwnerCard);

    await browser.wait(EC.urlContains('/notes'), 10000);
    const url = await page.getUrl();
    expect(url.endsWith('/viewer'));
  });

});
