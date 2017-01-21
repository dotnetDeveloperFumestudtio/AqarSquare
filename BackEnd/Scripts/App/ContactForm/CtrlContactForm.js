var app = angular.module('contactformapp', []);
app.controller('ContactFormController', function ($scope, $http, notify, blockUI, Upload, cfpLoadingBar) {

  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };
  cfpLoadingBar.start();

  var vm = this;
  vm.totaluserItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.ContactFormData = {};
  $scope.contactFormId = 26;
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;
  $scope.order = 'FullName';
  $scope.reverse = false;

  fetchContactFormData();
  $scope.tableSelection = {};

  $scope.isAll = false;

  $scope.selectAllRows = function () {
    //check if all selected or not
    if ($scope.isAll === false) {
      //set all row selected
      angular.forEach(vm.contactformData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.contactformData, function (row, index) {
        $scope.tableSelection[index] = false;
      });
      $scope.isAll = false;
    }
  };

  $scope.edit = function (contactForm) {
    if (contactForm != null) {
      $scope.current = contactForm;

    } else {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (contactForm) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    contactForm.ApprovedBy = $scope.UserId;
    $http.post($scope.URL + "UpdateFormContactApprove", { 'contactForm': contactForm })
      .success(function (data, status, headers, config) {
        fetchContactFormData();
        clearControl();
      });
  };

  $scope.UpdatecontactFormStatus = function (contactForm) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    //myBlockUi.start({
    //  message: 'Wait Please ...'
    //});
    cfpLoadingBar.start();

    $http.post($scope.URL + "UpdatecontactFormStatus", { 'contactForm': contactForm })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          fetchContactFormData();
          //myBlockUi.stop();
          notify("Error,Recored Updated Fail");

        }
        else {

          fetchContactFormData();
          //myBlockUi.stop();
          notify("Recored Updated Successfully");
        }
      });
  };

  vm.pageChanged = function () {
    fetchContactFormData();

  };

  function fetchContactFormData() {

    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    $http.post($scope.URL + "FetchContactFormByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totaluserItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "FullName": data.Data[i].FullName,
          "Email": data.Data[i].Email,
          "Phone": data.Data[i].Phone,
          "Message": data.Data[i].Message,
          "CreatedDate": $scope.toJavaScriptDate(data.Data[i].CreatedDate),
          "CreatedBy": data.Data[i].CreatedBy,
          "ApprovedDate": data.Data[i].ApprovedDate,
          "ApprovedBy": data.Data[i].ApprovedBy,
          "UserId": data.Data[i].UserId,
          "IsTenant": data.Data[i].IsTenant
        });
      }
      fillData = fillData.slice(1);
      vm.contactformData = fillData;
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

angular.module('contactFormSort', []).directive("sort", function () {
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