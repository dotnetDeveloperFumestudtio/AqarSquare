/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
var myApp = angular.module('angapp',
  ['ui.router',
    'ngCookies',
    'ngFileUpload',
    'ngMap',
    'ngStorage',
    'changePasswordapp',
    'AngApp',
    'ngMessages',
    'Homeapp',
    'loginapplication',
    'contactapp',
    'cityapp',
    'citySort',
    'squareapp',
    'userpropertyapp',
    'adminpropertyapp',
    'detailspropertyapp',
    'contactformapp',
    'reservationapp',
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
    //'mymap', 
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
  //if (sideBar === undefined || sideBar === null || sideBar.length === 0) {
  //  //  swal({ title: "Pleae Login First!!", text: "", type: "error", timer: 3000, showConfirmButton: false });
  //  //$location.path("login.html");
  //  $window.location.href = 'Login.html';

  //}
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
        alert(data);
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
function homeCtrl($scope, $location, publicService, $http) {
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
  // $scope.AdminUserName = sideBar.replace(/['"]+/g, '');
  $scope.AdminUserName = sideBar;
  $scope.AdminEmail = userEmail;
  $scope.UserId = "1";

  $scope.URL = "http://localhost:1717/Project/";
  $scope.MainURL = "http://localhost:1717/";
  $scope.setRoute = function (route) {
    $location.path(route);
  };

}
