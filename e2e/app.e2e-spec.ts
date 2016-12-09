import { TalkingThingsPage } from './app.po';

describe('talking-things App', function() {
  let page: TalkingThingsPage;

  beforeEach(() => {
    page = new TalkingThingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
