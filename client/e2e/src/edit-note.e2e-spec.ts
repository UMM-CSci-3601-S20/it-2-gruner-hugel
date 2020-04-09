// import { EditNotePage } from './edit-note.po';
// import { by, element, browser, protractor } from 'protractor';
// import { E2EUtil } from './e2e.util';


// describe('Edit note:', () => {
//   let page: EditNotePage;
//   const EC = protractor.ExpectedConditions;

//   beforeEach(() => {
//     page = new EditNotePage();
//     page.navigateTo();
//   });

//   it('Should have the correct title', () => {
//     expect(page.getTitle()).toEqual('Edit Note');
//   });

//   it('Should enable and disable the edit note button', async () => {
//     expect(element(by.buttonText('EDIT NOTE')).isEnabled()).toBe(true);

//     await page.typeInput('bodyField', E2EUtil.randomText(1000));
//     expect(element(by.buttonText('EDIT NOTE')).isEnabled()).toBe(false);
//   });

//   it('Should go to the right page after being clicked', async () => {
//     const body = E2EUtil.randomText(10);

//     await page.typeInput('bodyField', body);
//     page.clickEditNote();

//     await browser.wait(EC.not(EC.urlContains('/new')), 10000);
//   });
// });
