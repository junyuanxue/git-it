angular
  .module('githubProfileApp')
  .controller('GithubProfileController', ['$q', '$http', 'GithubAPIService', 'userFactory', function($q, $http, GithubAPIService, userFactory) {

    var self = this;

    self.users = [];

    self.search = function(searchText) {
      _emptyUserArray;
      GithubAPIService.searchUsers(searchText)
        .then(_updateUserArray);
    };

    function _emptyUserArray() {
      self.users = [];
    };

    function _updateUserArray(users) {
      $q.all(users).then((values) => {
        self.users = values[0];
      });
    };
  }]);
