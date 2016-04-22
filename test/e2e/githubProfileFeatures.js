describe('Github Profile App', function() {
  var mock = require('protractor-http-mock');

  beforeEach(function() {
    mock([{
      request: {
        path: 'https://api.github.com/users',
        method: 'GET'
      },
      response: {
        data: [{ id: 1, login: 'kyle', repos_url: 4, followers_url: 0, avatar_url: 'kyle.png' },
               { id: 2, login: 'harsheet', repos_url: 10, followers_url: 2, avatar_url: 'harsheet.png' }]
      }
    }]);
  });

  afterEach(function() {
    mock.teardown();
  });

  it('has a title', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Github Profile');
  });

  it('displays a list of users', function() {
    browser.get('/');
    var users = $$("#users ul li ul");
    expect(users.first().getText()).toMatch("kyle\nRepositories: 4\nFollowers: 0");
    expect(users.last().getText()).toMatch("harsheet\nRepositories: 10\nFollowers: 2");
  });

  it('searches user by username and returns the user', function() {
    browser.get('/');
    $("#search-by-username").sendKeys("kyle");
    var users = $$("#users ul li ul");
    expect(users.getText()).toMatch("kyle\nRepositories: 4\nFollowers: 0");
    expect(users.getText()).not.toMatch("harsheet\nRepositories: 10\nFollowers: 2");
  });
});
