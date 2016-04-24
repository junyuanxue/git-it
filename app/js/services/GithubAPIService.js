angular
  .module('githubProfileApp')
  .service('GithubAPIService', ['$http', 'userFactory', function($http, userFactory) {

    var self = this;
    var users = [];

    var accessToken = 'access_token=43ce04f42a3b62b50daebf8ecf91712dad18e5be'

    self.searchUsers = function(username) {
      return $http.get('https://api.github.com/search/users?q=' + username + '+in:login&' + accessToken).then(function(response) {
        return response.data.items.map(function(userData) {
          var user = new userFactory();

          user.username = userData.login;
          user.avatar = userData.avatar_url;
          user.numOfFollowers = userData.followers;
          user.numOfRepos = userData.public_repos;

          users.push(user);
          return users;
        });
      })
    }
  }]);
