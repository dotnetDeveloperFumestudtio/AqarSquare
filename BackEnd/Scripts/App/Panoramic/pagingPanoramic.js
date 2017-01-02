
  angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
  angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
   
  $scope.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchPanoramicByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "AttractionNameEn": data.Data[i].AttractionNameEn,
          "Id": data.Data[i].Id,
          "NameAr": data.Data[i].NameAr,
          "NameFr": data.Data[i].NameFr,
          "NameIta": data.Data[i].NameIta,
          "NameRu": data.Data[i].NameRu,
          "NameGe": data.Data[i].NameGe,
          "NameEn": data.Data[i].NameEn,
          "ImageUrl": data.Data[i].ImageUrl,
          "Image1": data.Data[i].Image1
        });
      }
      fillData = fillData.slice(1);
      $scope.CategoryData = fillData; 
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