var app = angular.module('loginapplication', []);
app.controller('loginController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location, $localStorage) {
  $scope.current = {};
  //localStorage.clear();
  $scope.checkUser = function (login) {
    login.Username = $scope.current.Username;
    login.Password = $scope.current.Password;

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    }); 

    $http.post($scope.URL + "CheckUser", { 'username': login.Username, 'password': login.Password })
 .success(function (data, status, headers, config) {
   if (data != "") {
     $localStorage.LocalMessage = login.Username;
      $location.path("/index"); 
     myBlockUi.stop();
     swal({ title: "Success!", text: "Login Successed!", type: "success", timer: 2000, showConfirmButton: false });
  

   } else {
     swal({ title: "Error!", text: "Login Faild!", type: "error", timer: 2000, showConfirmButton: false });
     myBlockUi.stop();

   }
 });

  };

});
