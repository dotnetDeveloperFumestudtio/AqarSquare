 
  angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
  angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function () {
    //fetsh message data  from databasse 

    $http.post($scope.URL + "FetchEventByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "EventNameAr": data.Data[i].EventNameAr,
          "EventNameFr": data.Data[i].EventNameFr,
          "EventNameIta": data.Data[i].EventNameIta,
          "EventNameRu": data.Data[i].EventNameRu,
          "EventNameGe": data.Data[i].EventNameGe,
          "EventNameEn": data.Data[i].EventNameEn,
          "DetailsAr": data.Data[i].DetailsAr,
          "DetailsFr": data.Data[i].DetailsFr,
          "DetailsIta": data.Data[i].DetailsIta,
          "DetailsRu": data.Data[i].DetailsRu,
          "DetailsGe": data.Data[i].DetailsGe,
          "DetailsEn": data.Data[i].DetailsEn,
          "Date": data.Data[i].Date,
          "TimeFrom": data.Data[i].TimeFrom,
          "TimeTo": data.Data[i].TimeTo,
          "EventImage": data.Data[i].EventImage,
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

  //$scope.pageChanged = function () {
  //  //fetsh message data  from databae 
  //  bindTable();
  //};

  function bindTable() {

    $http.post($scope.URL + "FetchEventByPageSize", { 'pageNumber': 1, 'pageSize': 5 })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];
        console.log(data.TotalCount);
      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "EventNameAr": data.Data[i].EventNameAr,
          "EventNameFr": data.Data[i].EventNameFr,
          "EventNameIta": data.Data[i].EventNameIta,
          "EventNameRu": data.Data[i].EventNameRu,
          "EventNameGe": data.Data[i].EventNameGe,
          "EventNameEn": data.Data[i].EventNameEn,
          "DetailsAr": data.Data[i].DetailsAr,
          "DetailsFr": data.Data[i].DetailsFr,
          "DetailsIta": data.Data[i].DetailsIta,
          "DetailsRu": data.Data[i].DetailsRu,
          "DetailsGe": data.Data[i].DetailsGe,
          "DetailsEn": data.Data[i].DetailsEn,
          "Date": data.Data[i].Date,
          "TimeFrom": data.Data[i].TimeFrom,
          "TimeTo": data.Data[i].TimeTo,
          "EventImage": data.Data[i].EventImage,
        });
      }
      fillData = fillData.slice(1);
      $scope.EventData = fillData;
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