
angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchAttractionByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "CategoryId": data.Data[i].CategoryId,
          "Category": data.Data[i].Category,
          "Region": data.Data[i].Region,
          "RegionId": data.Data[i].RegionId,
          "Longitude": data.Data[i].Longitude,
          "Latitude": data.Data[i].Latitude,
          "AttractionNameAr": data.Data[i].AttractionNameAr,
          "AttractionNameEn": data.Data[i].AttractionNameEn,
          "AttractionNameFr": data.Data[i].AttractionNameFr,
          "AttractionNameGe": data.Data[i].AttractionNameGe,
          "AttractionNameIta": data.Data[i].AttractionNameIta,
          "AttractionNameRu": data.Data[i].AttractionNameRu,
          "HistoricalInformationAr": data.Data[i].HistoricalInformationAr,
          "HistoricalInformationEn": data.Data[i].HistoricalInformationEn,
          "HistoricalInformationFr": data.Data[i].HistoricalInformationFr,
          "HistoricalInformationGe": data.Data[i].HistoricalInformationGe,
          "HistoricalInformationIta": data.Data[i].HistoricalInformationIta,
          "ImageUrl": data.Data[i].ImageUrl,
          "VideoUrl": data.Data[i].VideoUrl
        });
      }
      fillData = fillData.slice(1);
      $scope.AttractionData = fillData;
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