
  angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
  angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
   
  $scope.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchReservationByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "FullName": data.Data[i].FullName,
          "Email": data.Data[i].Email,
          "Phone": data.Data[i].Phone,
          "PropertyId": data.Data[i].PropertyId,
          "CreatedDate": $scope.toJavaScriptDate(data.Data[i].CreatedDate),
          "CreatedBy": data.Data[i].CreatedBy,
          "ApprovedDate": data.Data[i].ApprovedDate,
          "ApprovedBy": data.Data[i].ApprovedBy,
          "UserId": data.Data[i].UserId
        });
      }
      fillData = fillData.slice(1);
      $scope.UserPropertyData = fillData;
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1; 
  function toJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getDate() + "/" + dt.getMonth() + 1) + "/" + dt.getFullYear() + "    " + dt.getHours() + " : " + dt.getMinutes();
  }

});