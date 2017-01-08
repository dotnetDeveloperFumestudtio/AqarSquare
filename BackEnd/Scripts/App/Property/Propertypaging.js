
  angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
  angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
   
  $scope.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchPropertyByPageSize", { 'pageNumber': $scope.currentPage, 'pageSize': $scope.pageNumber })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "TitleAr": data.Data[i].TitleAr,
          "Title": data.Data[i].Title,
          "Description": data.Data[i].Description,
          "DescriptionAr": data.Data[i].DescriptionAr,
          "Address": data.Data[i].Address,
          "AddressAr": data.Data[i].AddressAr,
          "Price": data.Data[i].Price,
          "BathroomNo": data.Data[i].BathroomNo,
          "BedroomNo": data.Data[i].BedroomNo,
          "RoomsNo": data.Data[i].RoomsNo,
          "ReceptionNo": data.Data[i].ReceptionNo,
          "Balacony": data.Data[i].Balacony,
          "Garage": data.Data[i].Garage,
          "Garden": data.Data[i].Garden,
          "Pool": data.Data[i].Pool,
          "Lift": data.Data[i].Lift,
          "Area": data.Data[i].Area,
          "PropertyTypeName": data.Data[i].PropertyTypeName,
          "Currency": data.Data[i].Currency,
          "Status": data.Data[i].Status,
          "CreatedDate": toJavaScriptDate(data.Data[i].CreatedDate),
          "CreatedByUserName": data.Data[i].CreatedByUserName,
          "CreatedBy": data.Data[i].CreatedBy
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
  function toJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getDate() + "/" + dt.getMonth() + 1) + "/" + dt.getFullYear() + "    " + dt.getHours() + " : " + dt.getMinutes();
  }

});