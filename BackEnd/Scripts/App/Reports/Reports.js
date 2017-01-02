var app = angular.module('statisticsapp', []);
app.controller('ReportController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {


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

  getNotificationStatistics();
  getViolationCount();
  getAttractionCount();
  getUserCount();
  getLatestViolation();
  getCountryStatistics();
  getObject3DStatistics();
  fetchAttractionTopTenRateData();
  // getAttractionStatistics();
  getQrCodeStatistics();
  getLanguageStatistics();
  getSelfieStatistics();
  fetchAttractionData();
  getUserAgetatistics();
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

  function getObject3DStatistics() {
    $http.get($scope.URL + "GetObject3DStatistics")

  .success(function (data, status, headers, config) {
    var fillData = [{}];

    for (var i = 0; i < data.length; i++) {
      fillData.push({
        "Object3DTitle": data[i].Object3DTitle,
        "Count": data[i].Count
      });
    }
    fillData = fillData.slice(1);
    $scope.Object3DData = fillData;
    cfpLoadingBar.complete();
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };

  function getQrCodeStatistics() {
    $http.get($scope.URL + "GetQrCodeStatistics")

  .success(function (data, status, headers, config) {
    var fillData = [{}];

    for (var i = 0; i < data.length; i++) {
      fillData.push({
        "QrCodeTitle": data[i].QrCodeTitle,
        "Count": data[i].Count
      });
    }
    fillData = fillData.slice(1);
    $scope.QrCodeDData = fillData;
    cfpLoadingBar.complete();
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };
  function getSelfieStatistics() {
    $http.get($scope.URL + "GetSelfieStatistics")

  .success(function (data, status, headers, config) {
    var fillData = [{}];

    for (var i = 0; i < data.length; i++) {
      fillData.push({
        "SelfieTitle": data[i].SelfieTitle,
        "Count": data[i].Count
      });
    }
    fillData = fillData.slice(1);
    $scope.SelfieData = fillData;
    cfpLoadingBar.complete();
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };

  function getLanguageStatistics() {
    $http.get($scope.URL + "GetLanguageStatistics")

   .success(function (data, status, headers, config) {
     var fillData = [{}];

     for (var i = 0; i < data.length; i++) {
       fillData.push({
         "LanguageTitle": data[i].LanguageTitle,
         "Count": data[i].Count
       });
     }
     fillData = fillData.slice(1);
     $scope.LanguageData = fillData;
     cfpLoadingBar.complete();
   })
 .error(function (data, status, headers, config) {
   swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

 }
 );
  };

  function fetchAttractionData() {

    $http.post($scope.URL + "FetchAttractionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,

          "AttractionNameEn": data.Data[i].AttractionNameEn,

          "Rank": data.Data[i].Rank,
          "Rating": data.Data[i].Rating
        });
      }
      fillData = fillData.slice(1);
      vm.AttractionData = fillData;
      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );

  }

  vm.pageChanged = function () {
    //fetsh message data  from databae 
    $http.post($scope.URL + "FetchAttractionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({

        "Id": data.Data[i].Id,
        "AttractionNameEn": data.Data[i].AttractionNameEn,
        "Rank": data.Data[i].Rank,
        "Rating": data.Data[i].Rating
      });
    }
    fillData = fillData.slice(1);
    vm.AttractionData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );
    // fetchData();

  };

  function fetchAttractionTopTenRateData() {

    $http.post($scope.URL + "FetchAttractionByPageSizeRankStatistics", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "AttractionNameEn": data.Data[i].AttractionNameEn,
          "Rank": data.Data[i].Rank,
          "Rating": data.Data[i].Rating
        });
      }
      fillData = fillData.slice(1);
      vm.AttractionData = fillData;
      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );

  }

  vm.pageChangedTopTenRate = function () {
    $http.post($scope.URL + "FetchAttractionByPageSizeRankStatistics", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
      .success(function (data, status, headers, config) {
        vm.totalItems = data.TotalCount;
        var fillData = [{}];

        for (var i = 0; i < data.Data.length; i++) {
          fillData.push({
            "Id": data.Data[i].Id,
            "AttractionNameEn": data.Data[i].AttractionNameEn,
            "Rank": data.Data[i].Rank,
            "Rating": data.Data[i].Rating
          });
        }
        fillData = fillData.slice(1);
        vm.AttractionData = fillData;
        cfpLoadingBar.complete();
      })
      .error(function (data, status, headers, config) {
        swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

      }
      );
  };


  function getUserAgetatistics() {
    $http.get($scope.URL + "GetUserAgeStatistics")

  .success(function (data, status, headers, config) {
    var fillData = [{}];

    for (var i = 0; i < data.length; i++) {
      fillData.push({
        "UserAgeDetails": data[i].UserAgeDetails,

        "Count": data[i].Count,
        "UserAge": data[i].UserAge,
        "Percentage": data[i].Percentage,
        "TotalUser": data[i].TotalUser
      });
    }
    fillData = fillData.slice(1);
    $scope.UserAgeData = fillData;
    cfpLoadingBar.complete();
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };

  function getNotificationStatistics() {
    $http.get($scope.URL + "GetNotificationStatistics")

  .success(function (data, status, headers, config) {
    var fillData = [{}];

    for (var i = 0; i < data.length; i++) {
      fillData.push({
        "NotificationTitle": data[i].NotificationTitle,
        "Count": data[i].Count
      });
    }
    fillData = fillData.slice(1);
    $scope.NotificationData = fillData;
    cfpLoadingBar.complete();
  })
.error(function (data, status, headers, config) {
  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

}
);
  };



  $scope.removeUser = function () {
    //localStorage.clear();
    //$window.location.href = 'Index.html';
  }

  $scope.changePassword = function () {
    $location.path("/changepassword");

  }
});
