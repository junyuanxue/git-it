describe('GithubProfileController', function() {
  beforeEach(module('githubProfileApp'));

  var ctrl, userFactory, httpBackend, GithubAPIService, q;
  var usersData = [{ login: 'kyle' },
                   { login: 'harsheet' }];

  var user1Info = { id: 1, login: 'kyle', avatar_url: 'kyle.png', followers: 0, public_repos: 4 };
  var user2Info = { id: 2, login: 'harsheet', avatar_url: 'harsheet.png', followers: 2, public_repos: 10 };


  beforeEach(inject(function($controller, _userFactory_, _GithubAPIService_, $httpBackend, $q) {
    ctrl = $controller('GithubProfileController');
    userFactory = _userFactory_;
    GithubAPIService = _GithubAPIService_;
    httpBackend = $httpBackend;
    q = $q;

    var accessToken = '?access_token=c2e5e182ac8e52ea45d72ff279b13389ea2d2ec7'

    httpBackend.expectGET("https://api.github.com/users" + accessToken ).respond(usersData);
    httpBackend.expectGET("https://api.github.com/users/kyle" + accessToken).respond(user1Info);
    httpBackend.expectGET("https://api.github.com/users/harsheet" + accessToken).respond(user2Info);
  }));

  it('has two users', function() {
    var user1 = new userFactory();
    user1.userId = 1;
    user1.username = 'kyle';
    user1.avatar = 'kyle.png';
    user1.numOfRepos = 4;
    user1.numOfFollowers = 0;

    var user2 = new userFactory();
    user2.userId = 2;
    user2.username = 'harsheet';
    user2.avatar = 'harsheet.png';
    user2.numOfRepos = 10;
    user2.numOfFollowers = 2;

    GithubAPIService.getUsers().then(function(usersData) {
      q.all(usersData).then((values) => {
        expect(ctrl.users).toEqual([user1, user2]);
      });
    });
  });

  it('gets search text on each keystroke', function() {
    expect(ctrl.search('kyle')).toEqual(usersData[0]);
  });
});
