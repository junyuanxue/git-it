describe('Github Profile App', function() {
  it('has a title', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Github Profile');
  });
});
