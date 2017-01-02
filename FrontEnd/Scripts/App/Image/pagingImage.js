﻿
  angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
  angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
   
  $scope.pageChanged = function () {
    //fetsh message data  from databae 
    fetchData();
  };

  function fetchData() {

    $http.post($scope.URL + "FetchImageByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
   .success(function (data, status, headers, config) {
     vm.totalItems = data.TotalCount;
     var fillData = [{}];

     for (var i = 0; i < data.Data.length; i++) {
       fillData.push({
         "Id": data.Data[i].Id,
         "Status": data.Data[i].Status,
         "ImageUrl": data.Data[i].ImageUrl
       });
     }
     fillData = fillData.slice(1);
     $scope.ImageData = fillData; 
   })
   .error(function (data, status, headers, config) {
     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

   }
   );
  }
  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});