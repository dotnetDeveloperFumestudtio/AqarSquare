(function () {
  var app = angular.module('AngApp', ['angapp']);

  app.controller('LoginController', function ($scope, $http, cfpLoadingBar, $localStorage) {
    
    cfpLoadingBar.start();
    cfpLoadingBar.complete();
    $scope.checkLogin = function () {
    

      $http.post("http://localhost:1716/Message/CheckUser", { 'username': $scope.Username, 'password': $scope.Password })
        .success(function (data, status, headers, config) {
          if (data != "") { 
            swal({ title: "Success!", text: "Login Successed!", type: "success", timer: 2000, showConfirmButton: false });
            $localStorage.LocalMessage = $scope.Username;

          } else { 
            swal({ title: "Error!", text: "Login Faild!", type: "error", timer: 2000, showConfirmButton: false });

          }
        });
    };
     
  });



})();



