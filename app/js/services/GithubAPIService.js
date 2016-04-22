angular
  .module('githubProfileApp')
  .service('GithubAPIService', ['$http', 'userFactory', function($http, userFactory) {

    var self = this;
    var users = [];

    var accessToken = '?access_token=c2e5e182ac8e52ea45d72ff279b13389ea2d2ec7'

    self.getUsers = function() {
      return $http.get('https://api.github.com/users' + accessToken)
        .then(_handleResponseFromAPI);
    };

    function _handleResponseFromAPI(response) {
      return response.data.map(function(userData) {
        return _getUserInfo(userData);
      });
    };

    function _getUserInfo(userData) {
      return $http.get('https://api.github.com/users/' + userData.login + accessToken)
        .then(_createUserObject);
    };

    function _createUserObject(response) {
      var user = new userFactory();

      user.userId = response.data.id;
      user.username = response.data.login;
      user.avatar = response.data.avatar_url;
      user.numOfFollowers = response.data.followers;
      user.numOfRepos = response.data.public_repos;

      users.push(user);
      return users;
    };
  }]);
