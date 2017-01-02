var app = angular.module('userapp', ['ngAnimate', 'ui.bootstrap']);
app.controller('userController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {


  var sideBar = localStorage.getItem('LocalMessage');
  if (sideBar === undefined || sideBar === null || sideBar.length === 0) {
    //  swal({ title: "Please Login First!!", text: "", type: "error", timer: 3000, showConfirmButton: false });
    // $location.path("/login page");
  }

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.current = {};
  vm.isUpdate = false;
  var fillData = [{}];

  $scope.selection = [];
  $scope.toggleSelection = function toggleSelection(userId) {
    var idx = $scope.selection.indexOf(userId);

    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }
    else {
      $scope.selection.push(userId);
    }
  };


  $scope.sendAlert = function () {
    alert($scope.selection);

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      user: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post("http://localhost:1716/Message/SendUserAlerts", { 'userIds': $scope.selection })
      .success(function (data, status, headers, config) {

        myBlockUi.stop();
        notify('Your alert succesfuly sent to users');

      });

  };

  //fetsh user data  from databae
  $http.post("http://localhost:1716/Message/FetchUserByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "UserName": data.Data[i].UserName,
        "UserIp": data.Data[i].UserIp,
        "ComputerName": data.Data[i].ComputerName,
        "Connected": data.Data[i].Connected,
        "ConnectedDate": toJavaScriptDate(data.Data[i].ConnectedDate),
        "DisconnectedDate": toJavaScriptDate(data.Data[i].DisconnectedDate)
      });
    }
    fillData = fillData.slice(1);
    vm.userData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );

  function toJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
  }

  vm.insertData = function () {
    // Get the reference to the block service.
    var myBlockUI = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUI.start({
      user: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post("http://localhost:1716/Message/CreateUsers", { 'msgtitle': vm.current.MsgTitle, 'msgcontent': vm.current.MsgContent })
      .success(function (data, status, headers, config) {

        vm.current = {};
        //fetsh user data  from databae
        $http.post("http://localhost:1716/Message/FetchUserByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
        .success(function (data, status, headers, config) {
          vm.totalItems = data.TotalCount;
          var fillData = [{}];

          for (var i = 0; i < data.Data.length; i++) {
            fillData.push({
              "Id": data.Data[i].Id,
              "UserName": data.Data[i].UserName,
              "UserIp": data.Data[i].UserIp,
              "ComputerName": data.Data[i].ComputerName,
              "Connected": data.Data[i].Connected,
              "ConnectedDate": toJavaScriptDate(data.Data[i].ConnectedDate),
              "DisconnectedDate": toJavaScriptDate(data.Data[i].DisconnectedDate)
            });
          }
          fillData = fillData.slice(1);
          vm.userData = fillData;
          // Unblock the user interface
          myBlockUI.stop();
          notify('Your user sent');
        });
        vm.loader = {
          loading: false,
        };
      });
  };

  vm.edit = function (user) {

    vm.current = user;
    vm.isUpdate = true;
  };

  vm.update = function () {

    $http.post("http://localhost:1716/Message/EditUsers", { 'msgId': vm.current.Id, 'msgtitle': vm.current.MsgTitle, 'msgcontent': vm.current.MsgContent })
     .success(function (data, status, headers, config) {
       vm.isUpdate = false;
       vm.current = {};

       $http.get("http://localhost:1716/Message/FetchUsers")
 .then(function (response) { vm.userData = response.data; });

       vm.loader = {
         loading: false,
       };

     });

  };

  vm.remove = function (user) {

    var delConfirm = confirm("Are you sure you want to delete the user " + user.MsgTitle + " ?");
    if (delConfirm == true) {

      $http.post("http://localhost:1716/Message/DeleteUsers", { 'msgId': user.Id })
        .success(function (data, status, headers, config) {

          var index = vm.userData.indexOf(user);
          vm.userData.splice(index, 1);

        });
    }
  };




  vm.pageChanged = function () {
    //fetsh user data  from databae
    $http.post("http://localhost:1716/Message/FetchUserByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "UserName": data.Data[i].UserName,
          "UserIp": data.Data[i].UserIp,
          "ComputerName": data.Data[i].ComputerName,
          "Connected": data.Data[i].Connected,
          "ConnectedDate": toJavaScriptDate(data.Data[i].ConnectedDate),
          "DisconnectedDate": toJavaScriptDate(data.Data[i].DisconnectedDate)
        });
      }
      fillData = fillData.slice(1);
      vm.userData = fillData;

    });

    $log.log('Page changed to: ' + vm.currentPage);
  };


});
