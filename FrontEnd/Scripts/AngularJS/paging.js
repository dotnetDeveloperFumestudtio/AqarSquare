angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log, $http) {
    

  
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  function toJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
  }
  $scope.pageChanged = function () {
    //fetsh survery data  from databae
    $http.post("http://localhost:1716/Message/FetchMessagesByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })

    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "MsgTitle": data.Data[i].MsgTitle,
          "MsgContent": data.Data[i].MsgContent,
          "MsgDateTime": toJavaScriptDate(data.Data[i].MsgDateTime)
        });
      }
      fillData = fillData.slice(1);
      $scope.surveryData = fillData;

    });

    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});