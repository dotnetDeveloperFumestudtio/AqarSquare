/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
var myApp = angular.module('angapp',
  ['ui.router',
    'ngCookies',
    'ngFileUpload',
    'ngStorage',
    'changePasswordapp',
    'AngApp',
    'ngMessages',
    'Homeapp',
    'loginapplication',
    'contactapp',
    'importantapp',
    'categoryapp',
    'regionapp',
    'UsefulLinkapp',
    'moderationapp',
    'moderationrejectapp',
    'moderationapproveapp',
    'Languageapp',
     'Selfieapp',
     'Object3Dapp',
     'Panoramicapp',
     'Eventapp',
    'Attractionapp',
     'Usersapp',
     'Reportapp',
    'userapp',
    'ui.sortable',
    'toptenapp',
    'toptenapp1',
    'Notificationapp',
    'QrCodeapp',
    'statisticsapp',
    'ui',
    'Imageapp',
    'Videoapp',
    'ngAnimate',
    'toptenapp',
    'ui.bootstrap',
    'moment-picker',
    'angularjs-dropdown-multiselect',
    'cgNotify',
    'blockUI',
    'dropzone',
    'angular-loading-bar',
    'pascalprecht.translate']);
myApp.config(config);
//myApp.run(function ($rootScope, $state) {

//  $rootScope.$state = $state;
//});
var sideBar = "";
var userEmail = "";
myApp.run(function ($rootScope, $state, $location, $window) {

  $rootScope.$state = $state;
  //userEmail = localStorage.getItem('ngStorage-Email'); 
  //sideBar = localStorage.getItem('ngStorage-LocalMessage');


  userEmail = $window.localStorage.getItem('user-Email');
  sideBar = $window.localStorage.getItem('user-name');
  if (sideBar === undefined || sideBar === null || sideBar.length === 0) {
    //  swal({ title: "Pleae Login First!!", text: "", type: "error", timer: 3000, showConfirmButton: false });
    //$location.path("login.html");
    $window.location.href = 'Login.html';

  }
  //else {
  //  $location.path("/index");
  //}
});
myApp.config([
  'cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.latencyThreshold = 500;
    //  cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

  }
]);
myApp.controller('homeCtrl', homeCtrl);

//function run($rootScope, $location, $cookieStore, $http, $state) {
//  $rootScope.$state = $state;
//  //sdsd
//  var sideBar = localStorage.getItem('ngStorage-LocalMessage');
//  if (sideBar === undefined || sideBar === null || sideBar.length === 0) {
//    //  swal({ title: "Pleae Login First!!", text: "", type: "error", timer: 3000, showConfirmButton: false });
//    $location.path("/login");

//  } else {
//    $location.path("/index");
//  }
//  // keep user logged in after page refresh
//  $rootScope.globals = $cookieStore.get('globals') || {};
//  if ($rootScope.globals.currentUser) {
//    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//  }

//  $rootScope.$on('$locationChangeStart', function (event, next, current) {
//    // redirect to login page if not logged in and trying to access a restricted page
//    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
//    var loggedIn = $rootScope.globals.currentUser;
//    if (restrictedPage && !loggedIn) {
//      $location.path('/login');
//    }
//  });
//}

function homeCtrl($scope, $location) {

  // $scope.AdminUserName = sideBar.replace(/['"]+/g, '');
  $scope.AdminUserName = sideBar;
  $scope.AdminEmail = userEmail;

  $scope.URL = "http://localhost:1716/Project/";
  $scope.MainURL = "http://localhost:1716/";
  ////$scope.URL = "http://40.118.17.78:81/Project/";
  //$scope.MainURL = "http://40.118.17.78:81/";
  //$scope.URL = "http://etaweb1.cloudapp.net:81/Project/";
  //$scope.MainURL = "http://etaweb1.cloudapp.net:81/";
  $scope.setRoute = function (route) {
    $location.path(route);
  };

}
