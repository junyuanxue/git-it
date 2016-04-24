describe('GithubAPIService', function(){
  beforeEach(module('githubProfileApp'));

  var GithubAPIService, httpBackend, q;

  // var usersData = [{ login: 'kyle' },
  //                  { login: 'harsheet' }];
  //
  // var user1Info = { login: 'kyle', avatar_url: 'kyle.png', followers: 0, public_repos: 4 };
  // var user2Info = { login: 'harsheet', avatar_url: 'harsheet.png', followers: 2, public_repos: 10 };
  var userData = { "items": [{ login: "kyle", avatar_url: "kyle.png", followers: 0, public_repos: 4 }] }

  beforeEach(inject(function($q, _GithubAPIService_, _userFactory_, $httpBackend) {
    GithubAPIService = _GithubAPIService_;
    userFactory = _userFactory_;
    httpBackend = $httpBackend;
    q = $q;
  }));

  it('fetches user by username', function() {
    var accessToken = 'access_token=43ce04f42a3b62b50daebf8ecf91712dad18e5be';
    httpBackend.expectGET("https://api.github.com/search/users?q=kyle&" + accessToken ).respond(usersData);

    httpBackend.flush();

  });
});
