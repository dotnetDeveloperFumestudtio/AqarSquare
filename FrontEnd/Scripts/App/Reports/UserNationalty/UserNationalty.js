var app = angular.module('Homeapp', []);
app.controller('HomeController', function ($scope, $http, notify, $filter, blockUI, Upload, $timeout, cfpLoadingBar, $location) {


  cfpLoadingBar.start();
  var myBlockUi = blockUI.instances.get('myBlockUI');

  myBlockUi.start({
    message: 'Wait Please ...'
  });
  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  $scope.TotalUser = "";
  $scope.TotalAttraction = "";
  $scope.TotalViolation = "";
  $scope.LatestViolationSummry = "";
  $scope.LatestViolationDate = "";
  $scope.LatestViolationUserName = "";

   
  getViolationCount();
  getAttractionCount();
  getUserCount();
  getLatestViolation();
  getCountryStatistics();
  cfpLoadingBar.complete();
  myBlockUi.stop();


  function getLatestViolation() {
    $http.get($scope.URL + "FetshLatestViolation")

  .success(function (data, status, headers, config) {
    $scope.LatestViolationSummry = data.Comment;
    $scope.LatestViolationDate = data.Date;
    $scope.LatestViolationUserName = data.UserName;
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };

  function getUserCount() {
    $http.get($scope.URL + "FetchCountUser")

  .success(function (data, status, headers, config) {
    $scope.TotalUser = data.TotalCount.length;
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };

  function getAttractionCount() {
    $http.get($scope.URL + "GetAttractionsCount")

  .success(function (data, status, headers, config) {
    $scope.TotalAttraction = data.TotalCount;
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };

  function getViolationCount() {
    $http.get($scope.URL + "FetchCountReport")

  .success(function (data, status, headers, config) {
    $scope.TotalViolation = data.TotalCount.length;
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };


  function getCountryStatistics() {
    $http.get($scope.URL + "GetCountryStatistics")

  .success(function (data, status, headers, config) {
    var fillData = [{}];

    for (var i = 0; i < data.length; i++) {
      fillData.push({
        "CountryName": data[i].CountryName,
        "Count": data[i].Count,
        "Percentage": data[i].Percentage,
        "CountryCount": data[i].CountryCount,
      });
    }
    fillData = fillData.slice(1);
    $scope.UserNationlatyData = fillData;
    cfpLoadingBar.complete();
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };

  $http.get($scope.URL + "FetchTop5User")
  .success(function (data, status, headers, config) {
    $scope.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.length; i++) {
      fillData.push({
        "Id": data[i].Id,
        "FirstName": data[i].FirstName,
        "LastName": data[i].LastName,
        "Email": data[i].Email,
        "Country": data[i].Country,
        "Telephone": data[i].Telephone,
       "UserBrithDate": data[i].UserBrithDate,
         "Status": data[i].Status
      });
    }
    fillData = fillData.slice(1);
      $scope.UserData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );

  $scope.removeUser = function () {
    //localStorage.clear();
    //$window.location.href = 'Index.html';
  }

  $scope.changePassword = function () {
    $location.path("/changepassword");

  }
});
