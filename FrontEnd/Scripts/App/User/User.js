var app = angular.module('Usersapp', []);
app.controller('UserController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {


  $scope.IsHidden = true;
  $scope.ShowHide = function () {

    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;

  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;

  //fetsh message data  from databae 

  $http.post($scope.URL + "FetchUserByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "FirstName": data.Data[i].FirstName,
        "LastName": data.Data[i].LastName,
        "Email": data.Data[i].Email,
        "Country": data.Data[i].Country,
        "Telephone": data.Data[i].Telephone,
        "UserBrithDate": data.Data[i].UserBrithDate,
        "UserAge": data.Data[i].UserAge,
        "Status": data.Data[i].Status
      });
    }
    fillData = fillData.slice(1);
    vm.UserData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );


  $scope.edit = function (user) {
    $scope.current = user;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (user, status) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    user.Status = status;
    user.Id = $scope.current.Id;

    $http.post($scope.URL + "UpdateUserStatus", { 'User': user })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchUserByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {

       vm.current = {};
       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "Id": data.Data[i].Id,
           "FirstName": data.Data[i].FirstName,
           "LastName": data.Data[i].LastName,
           "Email": data.Data[i].Email,
           "Country": data.Data[i].Country,
           "Telephone": data.Data[i].Telephone,
           "UserBrithDate": data.Data[i].UserBrithDate,
           "UserAge": data.Data[i].UserAge,
           "Status": data.Data[i].Status
         });
       }
       fillData = fillData.slice(1);
       vm.UserData = fillData;
       cfpLoadingBar.complete();

       myBlockUi.stop();
       notify("Recored Updated Successfully");

     });

      });
  };


  vm.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchUserByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "FirstName": data.Data[i].FirstName,
          "LastName": data.Data[i].LastName,
          "Email": data.Data[i].Email,
          "Country": data.Data[i].Country,
          "Telephone": data.Data[i].Telephone,
          "UserBrithDate": data.Data[i].UserBrithDate,
          "UserAge": data.Data[i].UserAge,
          "Status": data.Data[i].Status
        });
      }
      fillData = fillData.slice(1);
      vm.UserData = fillData;
      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );

  };

});
