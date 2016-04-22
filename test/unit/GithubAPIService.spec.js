describe('GithubAPIService', function(){
  beforeEach(module('githubProfileApp'));

  var GithubAPIService, httpBackend;

  var usersData = [{ login: 'kyle' },
                   {  login: 'harsheet' }];

  var user1Info = { id: 1, login: 'kyle', avatar_url: 'kyle.png', followers: 0, public_repos: 4 };
  var user2Info = { id: 2, login: 'harsheet', avatar_url: 'harsheet.png', followers: 2, public_repos: 10 };

  beforeEach(inject(function(_GithubAPIService_, _userFactory_, $httpBackend) {
    GithubAPIService = _GithubAPIService_;
    userFactory = _userFactory_;
    httpBackend = $httpBackend;
  }));

  it('fetches a list of users', function(){
    var accessToken = '?access_token=c2e5e182ac8e52ea45d72ff279b13389ea2d2ec7'

    httpBackend.expectGET("https://api.github.com/users" + accessToken ).respond(usersData);
    httpBackend.expectGET("https://api.github.com/users/kyle" + accessToken).respond(user1Info);
    httpBackend.expectGET("https://api.github.com/users/harsheet" + accessToken).respond(user2Info);


    var user1 = new userFactory();
    user1.userId = 1;
    user1.username = 'kyle';
    user1.numOfRepos = 4;
    user1.numOfFollowers = 0;
    user1.avatar = 'kyle.png';

    var user2 = new userFactory();
    user2.userId = 2;
    user2.username = 'harsheet';
    user2.numOfRepos = 10;
    user2.numOfFollowers = 2;
    user2.avatar = 'harsheet.png';

    GithubAPIService.getUsers().then(function(usersData) {
      console.log(usersData);
      expect(usersData).toEqual([user1, user2]);
    });

    httpBackend.flush();
  });
});
