var app = angular.module('PhotoSessionapp', []);
app.controller('PhotoSessionController', function ($scope, $http, notify, blockUI, Upload, cfpLoadingBar) {

  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };
  cfpLoadingBar.start();

  var vm = this;
  vm.totaluserItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.PhotoSessionData = {};
  $scope.PhotoSessionId = 26;
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;
  $scope.order = 'FullName';
  $scope.reverse = false;

  fetchPhotoSessionData();
  $scope.tableSelection = {};

  $scope.isAll = false;

  $scope.selectAllRows = function () {
    //check if all selected or not
    if ($scope.isAll === false) {
      //set all row selected
      angular.forEach(vm.PhotoSessionData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.PhotoSessionData, function (row, index) {
        $scope.tableSelection[index] = false;
      });
      $scope.isAll = false;
    }
  };

  $scope.edit = function (PhotoSession) {
    if (PhotoSession != null) {
      $scope.current = PhotoSession;

    } else {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (PhotoSession) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    PhotoSession.ApprovedBy = $scope.UserId;
    $http.post($scope.URL + "UpdatePhotoSessionApprove", { 'PhotoSession': PhotoSession })
      .success(function (data, status, headers, config) {
        fetchPhotoSessionData();
        clearControl();
      });
  };

  $scope.UpdatePhotoSessionStatus = function (PhotoSession) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    //myBlockUi.start({
    //  message: 'Wait Please ...'
    //});
    cfpLoadingBar.start();

    $http.post($scope.URL + "UpdatePhotoSessionStatus", { 'PhotoSession': PhotoSession })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          fetchPhotoSessionData();
          //myBlockUi.stop();
          notify("Error,Recored Updated Fail");

        }
        else {

          fetchPhotoSessionData();
          //myBlockUi.stop();
          notify("Recored Updated Successfully");
        }
      });
  };

  vm.pageChanged = function () {
    fetchPhotoSessionData();

  };

  function fetchPhotoSessionData() {

    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    $http.post($scope.URL + "FetchPhotoSessionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totaluserItems = data.TotalCount;
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
      vm.PhotoSessionData = fillData;
      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );
    myBlockUi.stop();


  }

  function clearControl() {
    $scope.current.Message = "";
    $scope.current.CreatedDate = "";
    $scope.current.Email = "";
    $scope.current.FullName = "";
    $scope.current.Phone = "";
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  }

});

angular.module('PhotoSessionSort', []).directive("sort", function () {
  return {
    restrict: 'A',
    transclude: true,
    template:
      '<a ng-click="onClick()">' +
        '<span ng-transclude></span>' +
        '<i class="glyphicon" ng-class="{\'glyphicon-sort-by-alphabet\' : order === by && !reverse,  \'glyphicon-sort-by-alphabet-alt\' : order===by && reverse}"></i>' +
      '</a>',
    scope: {
      order: '=',
      by: '=',
      reverse: '='
    },
    link: function (scope, element, attrs) {
      scope.onClick = function () {
        if (scope.order === scope.by) {
          scope.reverse = !scope.reverse
        } else {
          scope.by = scope.order;
          scope.reverse = false;
        }
      }
    }
  }
});

app.factory('Scopes', function ($rootScope) {
  var mem = {};

  return {
    store: function (key, value) {
      $rootScope.$emit('scope.stored', key);
      mem[key] = value;
    },
    get: function (key) {
      return mem[key];
    }
  };
});