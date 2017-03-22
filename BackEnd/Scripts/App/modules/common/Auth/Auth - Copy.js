var myApp = angular.module('angapp', []);

myApp.service('session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
});
myApp.factory('authService', function ($http, session) {
  var authService = {};

  authService.login = function (credentials) {
    return $http

    .post("http://localhost:1717/Project/Login", { 'email': credentials.Email, 'password': credentials.Password })
     // .post($scope.URL + "Login", credentials)
      .then(function (res) {
        session.create(res.data.Data.Id, res.data.Data.FullName,
          res.data.Data.Role);
        return res.data.Data;
      });
  };

  authService.isAuthenticated = function () {
    return !!session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(session.userRole) !== -1);
  };

  return authService;
});
