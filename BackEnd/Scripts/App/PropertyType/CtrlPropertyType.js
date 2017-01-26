﻿var app = angular.module('PropertyTypeapp', []);
app.controller('PropertyTypeController', function ($scope, $http, notify, blockUI, cfpLoadingBar, PropertyTypeService) {

  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.PropertyTypeData = {};
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;
  $scope.order = 'Title';
  $scope.reverse = false;
  fetshData();

  $scope.tableSelection = {};

  $scope.isAll = false;
  $scope.selectAllRows = function () {
    //check if all selected or not
    if ($scope.isAll === false) {
      //set all row selected
      angular.forEach(vm.PropertyTypeData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.PropertyTypeData, function (row, index) {
        $scope.tableSelection[index] = false;
      });
      $scope.isAll = false;
    }
  };
  $scope.create = function (PropertyType) {
    // Get the reference to the block service.   
    var myBlockUi = blockUI.instances.get('myBlockUI');


    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    PropertyType.TitleAr = $scope.current.TitleAr;
    PropertyType.Title = $scope.current.Title;
    PropertyType.Status = $scope.current.Status;
    PropertyType.CreatedDate = $scope.current.CreatedDate;
    PropertyType.CreatedBy = $scope.UserId;
    $http.post($scope.URL + "CreatePropertyType", { 'PropertyType': PropertyType })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {

          cfpLoadingBar.complete();

          myBlockUi.stop();
          swal({ title: "Error!", text: "PropertyType name already exist!", type: "error", timer: 2000 });

        }
        if (data == "Done") {
          fetshData();

        }



      });

    clearControl();
  };

  $scope.edit = function (PropertyType) {
    if (PropertyType != null) {
      $scope.current = PropertyType;

    } else {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (PropertyType) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();


    PropertyType.Id = $scope.current.Id;
    PropertyType.TitleAr = $scope.current.TitleAr;
    PropertyType.Title = $scope.current.Title;
    PropertyType.CreatedBy = $scope.current.CreatedBy;
    PropertyType.Status = $scope.current.Status;
    PropertyType.CreatedBy = $scope.UserId;

    var getData = PropertyTypeService.updatePropertyType(PropertyType);
    getData.then(function (msg) {
      fetshData();
      clearControl();
    }, function (msg) {
      swal({ title: "Error!", text: msg.data, type: "error", timer: 2000, showConfirmButton: false });

    });


    //$http.post($scope.URL + "UpdatePropertyType", { 'PropertyType': PropertyType })
    //  .success(function (data, status, headers, config) {
    //    cfpLoadingBar.complete();

    //    myBlockUi.stop();
    //    //if (data == "Exist") {

    //    //  cfpLoadingBar.complete(); 

    //    //  myblockUI.stop();
    //    //  swal({ title: "Error!", text: "PropertyType name already exist!", type: "error", timer: 2000 });

    //    //}
    //    // if (data == "Done") {

    //    // }

    //  });
    //clearControl();
  };

  $scope.remove = function (PropertyType) {
    swal({
      title: "Are you sure you want to delete the PropertyType ?",
      text: PropertyType.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         var getData = PropertyTypeService.deletePropertyType(PropertyType);
         getData.then(function (msg) {
           fetshData();
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

         }, function (msg) {
           swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });
           $scope.msg = msg.data;
         });

         //    $http.post($scope.URL + "DeletePropertyType", { 'PropertyType': PropertyType })
         //.success(function (data, status, headers, config) {
         //  swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


         //  $http.post($scope.URL + "FetchPropertyType")
         //    .then(function (response) {
         //      vm.PropertyTypeData = response.data;
         //    });
         //  notify("Recored Deleted Successfully");

         //  var index = vm.PropertyTypeData.indexOf(PropertyType);
         //  vm.PropertyTypeData.splice(index, 1);

         //});

       }
     });


    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  $scope.removeSelected = function (PropertyTypeId) {
    var getData = PropertyTypeService.deletePropertyTypeSelected(PropertyTypeId);
    getData.then(function (msg) {
      fetshData();
      swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

    }, function (msg) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });
      $scope.msg = msg.data;
    });

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  $scope.removeSelectedRows = function () {
    $scope.PropertyType = {};
    //start from last index because starting from first index cause shifting
    //in the array because of array.splice()
    for (var i = vm.PropertyTypeData.length - 1; i >= 0; i--) {
      if ($scope.tableSelection[i]) {
        //delete row from data 
        $scope.removeSelected(vm.PropertyTypeData[i].Id);
        //fetshData();

        //vm.PropertyTypeData.splice(i, 1);
        //delete rowSelection property
        // delete $scope.tableSelection[i];
      }

    }

  };

  $scope.UpdatePropertyTypeStatus = function (PropertyType) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post($scope.URL + "UpdatePropertyTypeStatus", { 'PropertyType': PropertyType })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          fetshData();
          myBlockUi.stop();
          notify("Error,Recored Updated Fail");

        }
        else {

          fetshData();
          myBlockUi.stop();
          notify("Recored Updated Successfully");
        }
      });
  };


  $scope.DeleteSelected = function (list) {
    var itemList = [];
    angular.forEach(list, function (value, key) {
      if (list[key].selected) {
        itemList.push(list[key].selected);
      }
    });
    $http.post($scope.URL + "DeleteSelectedPropertyType", itemList)
      .success(function (data) {
        fetshData();
        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


      }).error(function (msg) {
        console.log(msg);
      });
  }


  vm.pageChanged = function () {
    fetshData();

  };

  function fetshData() {

    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    //  $http.post($scope.URL + "FetchPropertyTypeByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    $http.post($scope.URL + "FetchPropertyType")
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "TitleAr": data.Data[i].TitleAr,
          "Title": data.Data[i].Title,
          "Status": data.Data[i].Status,
          "CreatedDate": $scope.toJavaScriptDate(data.Data[i].CreatedDate),
          "CreatedByUserName": data.Data[i].CreatedByUserName,
          "CreatedBy": data.Data[i].CreatedBy
        });
      }
      fillData = fillData.slice(1);
      vm.PropertyTypeData = fillData;

      $scope.tableSettings = new TableSettings(vm.PropertyTypeData);
      $scope.tableSettings.setRows(5);
      $scope.selectOptions = [1, 3, 5, 10];

      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );
    myBlockUi.stop();


  }

  function clearControl() {
    $scope.current.TitleAr = "";
    $scope.current.Title = "";
    $scope.current = {};
    $scope.attractionmodel = '';
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  }



});

//angular.module('PropertyTypeSort', []).directive("sort", function () {
//  return {
//    restrict: 'A',
//    transclude: true,
//    template:
//      '<a ng-click="onClick()">' +
//        '<span ng-transclude></span>' +
//        '<i class="glyphicon" ng-class="{\'glyphicon-sort-by-alphabet\' : order === by && !reverse,  \'glyphicon-sort-by-alphabet-alt\' : order===by && reverse}"></i>' +
//      '</a>',
//    scope: {
//      order: '=',
//      by: '=',
//      reverse: '='
//    },
//    link: function (scope, element, attrs) {
//      scope.onClick = function () {
//        if (scope.order === scope.by) {
//          scope.reverse = !scope.reverse
//        } else {
//          scope.by = scope.order;
//          scope.reverse = false;
//        }
//      }
//    }
//  }
//});