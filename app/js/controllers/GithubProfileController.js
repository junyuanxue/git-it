angular
  .module('githubProfileApp')
  .controller('GithubProfileController', ['$q', '$http', 'GithubAPIService', 'userFactory', function($q, $http, GithubAPIService, userFactory) {

    var self = this;

    self.users = [];

    // GithubAPIService.getUsers().then(function(users) {
    //   $q.all(users).then((values) => {
    //     self.users = values[0];
    //   });
    // })

    self.search = function(searchText) {
      self.users = [];

      GithubAPIService.searchUsers(searchText).then(function(users) {
        self.users = users[0];
      });
    };
  }]);
