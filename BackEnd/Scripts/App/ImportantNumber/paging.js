//angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
//var app = angular.module('PaginationImportantapp', []);
//app.controller('PaginationDemoCtrl', function ($scope, $log, $http) {

//angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
  angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
   
  $scope.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchImportantByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "EntityAr": data.Data[i].EntityAr,
          "EntityFr": data.Data[i].EntityFr,
          "EntityIta": data.Data[i].EntityIta,
          "EntityRu": data.Data[i].EntityRu,
          "EntityGe": data.Data[i].EntityGe,
          "EntityEn": data.Data[i].EntityEn,
          "TelephoneNo1": data.Data[i].TelephoneNo1,
          "TelephoneNo2": data.Data[i].TelephoneNo2
        });
      }
      fillData = fillData.slice(1);
      $scope.importantData = fillData; 
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});