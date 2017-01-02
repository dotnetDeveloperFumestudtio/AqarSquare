var app = angular.module('Notificationapp', []);
app.controller('NotificationController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {


  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;

  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;

  $scope.send = function (notification) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
     
    notification.Title = $scope.current.Title;
    notification.Description = $scope.current.Description;
    console.log(notification);
    $http.post($scope.URL + "SendPush", { 'notification': notification })
      .success(function (data, status, headers, config) {
        cfpLoadingBar.complete(); 
        myBlockUi.stop();
        $scope.Reset();
        notify("Notification Sent Successfuly");
      });
  };


  $scope.Reset = function () {

    $scope.current = {}; 
  };
});
