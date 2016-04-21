describe('GithubAPIService', function(){
  beforeEach(module('githubProfileApp'));

  var GithubAPIService, httpBackend;

  var usersData = [{ id: 1, login: 'kyle', avatar_url: 'kyle.png' },
                   { id: 2, login: 'harsheet', avatar_url: 'harsheet.png' }];

  var user1Info = { followers: 0, public_repos: 4 };
  var user2Info = { followers: 2, public_repos: 10 };

  beforeEach(inject(function(_GithubAPIService_, _userFactory_, $httpBackend) {
    GithubAPIService = _GithubAPIService_;
    userFactory = _userFactory_;
    httpBackend = $httpBackend;
  }));

  it('fetches a list of users', function(){
    httpBackend.expectGET("https://api.github.com/users?access_token=3444a3707c527571bed704e5df863f35a523f78d").respond(usersData);
    httpBackend.expectGET("https://api.github.com/users/kyle?access_token=3444a3707c527571bed704e5df863f35a523f78d").respond(user1Info);
    httpBackend.expectGET("https://api.github.com/users/harsheet?access_token=3444a3707c527571bed704e5df863f35a523f78d").respond(user2Info);


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
      usersData.forEach(function(promise) {
        promise.then(function(value) {
          console.log(value);
        });
      });
      expect(usersData).toEqual([user1, user2]);
    });

    httpBackend.flush();
  });
});
