/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
var myApp = angular.module('angapp',
  ['ui.router',
    'ngCookies',
    'ngFileUpload',
    'angular-simple-table',
    'ngMap',
    'ngStorage',
    'changePasswordapp',
    'AngApp',
    'ngMessages',
    'Homeapp',
    'loginapplication',
    'contactapp',
    'cityapp',
    'squareapp',
    'userpropertyapp',
    'adminpropertyapp',
    'adminpropertyformapp',
    'detailspropertyapp',
    'contactformapp',
    'reservationapp',
    'PhotoSessionapp',
     'Usersapp',
     'UsersTenantapp',
     'PropertyTypeapp',
     'ContractTypeapp',
   // 'importantapp',
   // 'categoryapp',
   // 'regionapp',
   // 'UsefulLinkapp',
    //'moderationapp',
    //'moderationrejectapp',
    //'moderationapproveapp',
   // 'Languageapp',
    // 'Selfieapp',
   //  'Object3Dapp',
     //'Panoramicapp',
    // 'Eventapp',
   // 'Attractionapp',
    // 'Reportapp',
    'userapp',
    'ui.sortable',
    //'toptenapp',
    //'toptenapp1',
    'Notificationapp',
   // 'QrCodeapp',
   // 'statisticsapp',
    'ui',
   // 'Imageapp',
   // 'Videoapp',
    'ngAnimate',
   // 'toptenapp',
    'ui.bootstrap',
    'moment-picker',
    'angularjs-dropdown-multiselect',
    'cgNotify',
    'blockUI',
   // 'dropzone',
    'angular-loading-bar',
    //'mymap', 
    'pascalprecht.translate']);
myApp.config(config);
//myApp.run(function ($rootScope, $state) {

//  $rootScope.$state = $state;
//});
var sideBar = "";
var userEmail = "";
//myApp.run(function ($rootScope, $state, $location, $window, $cookieStore, $http) {

//  // keep user logged in after page refresh
//  $rootScope.globals = $cookieStore.get('globals') || {};
//  if ($rootScope.globals.currentUser) {
//    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//  }

//  $rootScope.$on('$locationChangeStart', function (event, next, current) {
//    // redirect to login page if not logged in and trying to access a restricted page
//    // var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
//    //  var loggedIn = $rootScope.globals.currentUser;
//    //if (restrictedPage && !loggedIn) {
//    // if (!loggedIn) {
//    $rootScope.globals = $cookieStore.get('globals') || {};
//    if (!$rootScope.globals.currentUser) {
//      //   $location.path('/login');
//      $window.location.href = 'Login.html';

//    }
//  });

//  //$rootScope.$state = $state;
//  //userEmail = localStorage.getItem('ngStorage-Email');
//  //sideBar = localStorage.getItem('ngStorage-LocalMessage');


//  //userEmail = $window.localStorage.getItem('user-Email');
//  //sideBar = $window.localStorage.getItem('user-name');
//  //if (sideBar === undefined || sideBar === null || sideBar.length === 0) {
//  //  //  swal({ title: "Pleae Login First!!", text: "", type: "error", timer: 3000, showConfirmButton: false });
//  //  //$location.path("login.html");
//  //  $window.location.href = 'Login.html';

//  //}
//  //else {
//  //  $location.path("/index");
//  //}
//});
myApp.run(function ($rootScope, authService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!authService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (authService.isAuthenticated()) {
        // user is not allowed
        //   $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        // $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });
});
myApp.config([
  'cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.latencyThreshold = 500;
    //  cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

  }
]);

myApp.controller('homeCtrl', homeCtrl);

myApp.run(function ($rootScope, $http) {
  $rootScope.globalFoo = function () {
    alert("I'm global foo!");
  };
  $rootScope.toJavaScriptDate = function (value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getDate() + "/" + dt.getMonth() + 1) + "/" + dt.getFullYear() + "    " + dt.getHours() + " : " + dt.getMinutes();
  }
  $rootScope.CountUnApprovedProperty = function () {
    $http.post("http://localhost:1717/Project/CountUnApprovedProperty")
      .success(function (data) {
        return data;
      }).error(function (msg) {
        console.log(msg);
      });
  }
});
myApp.factory('publicService', function () {
  return {
    foo: function () {

      return "";

      // alert("I'm foo!");

    }

  };
});
myApp.constant('USER_ROLES', {
  All: '*',
  Admin: 'Admin',
  Editor: 'Editor',
  SuperAdmin: 'SuperAdmin'
});

myApp.value('currentUserRole', '');

myApp.value('currentUserData', '');

myApp.constant("constantCurrentUser", '');

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
var ddd = '';
myApp.factory('authService', function ($http, session, $window) {

  var userRole = $window.localStorage.getItem('userRole');

  var authService = {};
  currentUserRole = userRole;


  authService.isAuthenticated = function () {
    return !!session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authorizedRoles.indexOf(userRole) !== -1);
  };

  return authService;
});

myApp.service('navAuthService', function () {

  var user = {};
  user.role = currentUserRole;
  return {
    getUser: function () {
      return user;
    },
    generateRoleData: function () {
      /*this is resolved before the router loads the view and model*/
      /*...*/
    }
  }
});

myApp.directive('restrict', function (navAuthService) {
  return {
    restrict: 'A',
    prioriry: 100000,
    scope: false,
    link: function () {
      // alert('ergo sum!');
    },
    compile: function (element, attr, linker) {
      var accessDenied = true;
      var user = navAuthService.getUser();

      var attributes = attr.access.split(" ");
      for (var i in attributes) {
        if (user.role == attributes[i]) {
          accessDenied = false;
        }
      }


      if (accessDenied) {
        element.children().remove();
        element.remove();
      }

    }
  }
});

function homeCtrl($scope, $window, $location, publicService, $http, USER_ROLES, authService, constantCurrentUser, currentUserRole) {
  var userId = $window.localStorage.getItem('userId');
  userData();
  function userData() {
    this.returnCount = "";
    $http.post("http://localhost:1717/Project/GetUserDataById", { "userId": userId })
   .success(function (data) {
     constantCurrentUser = data;
     $scope.AdminUserName = constantCurrentUser.FirstName + " " + constantCurrentUser.LastName;
     $scope.AdminUserRole = constantCurrentUser.Role;
     $scope.AdminEmail = constantCurrentUser.Email;
     return data;
   }).error(function (msg) {
     console.log(msg);
   });
  }

  //  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = authService.isAuthorized;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.callCountUnApproved = function () {
    // $scope.CountunApproved1 = publicService.foo();
    this.returnCount = "";
    $http.post("http://localhost:1717/Project/CountUnApprovedProperty")
   .success(function (data) {
     $scope.CountunApproved1 = data;

     return data;
   }).error(function (msg) {
     console.log(msg);
   });
  }
  $scope.callCountUnApproved();
  //$scope.AdminUserName = sideBar;
  //$scope.AdminEmail = userEmail;
  $scope.UserId = "1";

  $scope.URL = "http://localhost:1717/Project/";
  $scope.MainURL = "http://localhost:1717/";
  $scope.setRoute = function (route) {
    $location.path(route);
  };

}
