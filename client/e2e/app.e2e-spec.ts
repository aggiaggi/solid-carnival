import { MococamPage } from './app.po';

describe('mococam App', () => {
  let page: MococamPage;

  beforeEach(() => {
    page = new MococamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('moco works!');
  });
});
