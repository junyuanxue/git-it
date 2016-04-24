describe('GithubAPIService', function(){
  beforeEach(module('githubProfileApp'));

  var GithubAPIService, httpBackend, q;

  var userData = { "items": [{ login: "kyle" }] };

  var userInfo = { login: 'kyle', avatar_url: 'kyle.png', followers: 0, public_repos: 4 };

  beforeEach(inject(function($q, _GithubAPIService_, _userFactory_, $httpBackend) {
    GithubAPIService = _GithubAPIService_;
    userFactory = _userFactory_;
    httpBackend = $httpBackend;
    q = $q;
  }));

  it('fetches user by username', function() {
    var accessToken = 'access_token=9b5efb584d3a379322f8a95fc3ff4361baeea134';
    httpBackend.expectGET("https://api.github.com/search/users?q=kyle&" + accessToken ).respond(usersData);
    httpBackend.expectGET("https://api.github.com/users/kyle?" + accessToken).respond(userInfo);

    httpBackend.flush();
  });
});
