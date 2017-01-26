var app = angular.module('UsersTenantapp', []);
app.controller('TenantUserController', function ($scope, $http, notify, blockUI, cfpLoadingBar) {


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

  $scope.create = function (user) {

    cfpLoadingBar.start();
    user.Id = $scope.current.Id;
    user.FirstName = $scope.current.FirstName;
    user.LastName = $scope.current.LastName;
    user.Email = $scope.current.Email;
    user.Phone = $scope.current.Phone;
    user.WhatsApp = $scope.current.WhatsApp;
    user.Viber = $scope.current.Viber;
    user.Status = $scope.current.Status;
    //user.Id = $scope.current.Id; 
    $http.post($scope.URL + "CreateAdminUser", { 'user': user })
      .success(function (data, status, headers, config) {
        fetchData();
        $scope.current = {};
      });
  };


  $scope.edit = function (user) {
    $scope.current = user;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };
  fetchData();

  $scope.update = function (user) {

    cfpLoadingBar.start();
    user.Id = $scope.current.Id;
    user.FirstName = $scope.current.FirstName;
    user.LastName = $scope.current.LastName;
    user.Email = $scope.current.Email;
    user.Phone = $scope.current.Phone;
    user.WhatsApp = $scope.current.WhatsApp;
    user.Viber = $scope.current.Viber;
    user.Status = $scope.current.Status;
    //user.Id = $scope.current.Id; 
    $http.post($scope.URL + "UpdateTenantUser", { 'user': user })
      .success(function (data, status, headers, config) {
        fetchData();
        $scope.current = {};
      });
  };
  vm.pageChanged = function () {
    fetchData();

  };
  function fetchData() {

    // $http.post($scope.URL + "FetchAdminUserByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    $http.post($scope.URL + "FetchTenantUser")
.success(function (data, status, headers, config) {
  vm.totalItems = data.TotalCount;
  var fillData = [{}];

  for (var i = 0; i < data.Data.length; i++) {
    fillData.push({
      "Id": data.Data[i].Id,
      "FirstName": data.Data[i].FirstName,
      "LastName": data.Data[i].LastName,
      "Email": data.Data[i].Email,
      "WhatsApp": data.Data[i].WhatsApp,
      "Viber": data.Data[i].Viber,
      "Phone": data.Data[i].Phone,
      "CreatedDate": $scope.toJavaScriptDate(data.Data[i].CreatedDate),
      "Status": data.Data[i].Status
    });
  }
  fillData = fillData.slice(1);
  $scope.tableSettings1 = new TableSettings(fillData);
  $scope.tableSettings1.setRows(5);
  $scope.selectOptions = [1, 3, 5, 10];
  vm.UserData = fillData;
  cfpLoadingBar.complete();
})
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );


  }

});
