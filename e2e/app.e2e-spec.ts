import { CompareXTemplatePage } from './app.po';

describe('CompareX App', function() {
  let page: CompareXTemplatePage;

  beforeEach(() => {
    page = new CompareXTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
