import { browser, element, by } from 'protractor';

export class MococamPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('moco-root h1')).getText();
  }
}
