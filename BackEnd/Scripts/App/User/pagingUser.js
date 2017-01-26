
  angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
  angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
   
  $scope.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchAdminUserByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
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
          "CreatedDate": data.Data[i].CreatedDate,
          "Status": data.Data[i].Status
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