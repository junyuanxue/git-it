angular
  .module('githubProfileApp')
  .controller('GithubProfileController', ['$http', 'GithubAPIService', 'userFactory', function($http, GithubAPIService, userFactory) {

    var self = this;

    GithubAPIService.getUsers().then(function(users) {
      self.users = users;
    });

    self.search = function(searchText) {
      GithubAPIService.getUsers(searchText).then(function(users) {
        self.users = users;
    })};

  }]);
