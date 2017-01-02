var app = angular.module('changePasswordapp', []);
app.controller('changePasswordController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {

  cfpLoadingBar.start();

  var vm = this;
  vm.changePasswordObject = {};
  $scope.current = {};




  $scope.changePassword = function (changePassword) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');
    var userId = localStorage.getItem('ngStorage-UserId');
    if (userId === undefined || userId === null || userId.length === 0) {
    } else {
      changePassword.oldPass = $scope.current.oldPass;
      changePassword.newPass = $scope.current.newPass; 
      changePassword.userId = userId;

    }
    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    $http.post($scope.URL + "ChangePassword", {
      'userId': userId, 'oldPassword': $scope.current.oldPass,
      'newPassword': $scope.current.newPass
    })
      .success(function (data, status, headers, config) {
        myBlockUi.stop();
        if (data == "WrongPassword") {
          notify('Your old Password wrong');
        }
        if (data == "WrongUser") {
          notify('you must login first'); 
        }
        if (data == "Changed") {
          notify('Your Password changed');

        }

      });
  };

});
