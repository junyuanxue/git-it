angular
  .module('githubProfileApp')
  .service('GithubAPIService', ['$http', 'userFactory', function($http, userFactory) {

    var self = this;
    var users = [];

    var accessToken = 'access_token=9b5efb584d3a379322f8a95fc3ff4361baeea134'

    self.searchUsers = function(username) {
      return $http.get('https://api.github.com/search/users?q=' + username + '+in:login&' + accessToken)
        .then(_getUserInfo);
    }

    function _getUserInfo(response) {
      return response.data.items.map(function(userData) {
        return $http.get('https://api.github.com/users/' + userData.login + '?' + accessToken)
          .then(_createUserObject);
      });
    }

    function _createUserObject(response) {
      var user = new userFactory();
      
      user.username = response.data.login;
      user.url = response.data.html_url;
      user.avatar = response.data.avatar_url;
      user.numOfFollowers = response.data.followers;
      user.numOfRepos = response.data.public_repos;

      users.push(user);
      return users;
    }
  }]);
