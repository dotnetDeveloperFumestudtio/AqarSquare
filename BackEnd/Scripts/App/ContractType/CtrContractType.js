var app = angular.module('ContractTypeapp', []);
app.controller('ContractTypeController', function ($scope, $http, notify, blockUI, cfpLoadingBar, ContractTypeService) {

  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.ContractTypeData = {};
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
      angular.forEach(vm.ContractTypeData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.ContractTypeData, function (row, index) {
        $scope.tableSelection[index] = false;
      });
      $scope.isAll = false;
    }
  };
  $scope.create = function (ContractType) {
    // Get the reference to the block service.   
    var myBlockUi = blockUI.instances.get('myBlockUI');


    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    ContractType.TitleAr = $scope.current.TitleAr;
    ContractType.Title = $scope.current.Title;
    ContractType.Status = $scope.current.Status;
    ContractType.CreatedDate = $scope.current.CreatedDate;
    ContractType.CreatedBy = $scope.UserId;
    $http.post($scope.URL + "CreateContractType", { 'ContractType': ContractType })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {

          cfpLoadingBar.complete();

          myBlockUi.stop();
          swal({ title: "Error!", text: "ContractType name already exist!", type: "error", timer: 2000 });

        }
        if (data == "Done") {
          fetshData();

        }



      });

    clearControl();
  };

  $scope.edit = function (ContractType) {
    if (ContractType != null) {
      $scope.current = ContractType;

    } else {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (ContractType) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();


    ContractType.Id = $scope.current.Id;
    ContractType.TitleAr = $scope.current.TitleAr;
    ContractType.Title = $scope.current.Title;
    ContractType.CreatedBy = $scope.current.CreatedBy;
    ContractType.Status = $scope.current.Status;
    ContractType.CreatedBy = $scope.UserId;

    var getData = ContractTypeService.updateContractType(ContractType);
    getData.then(function (msg) {
      fetshData();
      clearControl();
    }, function (msg) {
      swal({ title: "Error!", text: msg.data, type: "error", timer: 2000, showConfirmButton: false });

    });


    //$http.post($scope.URL + "UpdateContractType", { 'ContractType': ContractType })
    //  .success(function (data, status, headers, config) {
    //    cfpLoadingBar.complete();

    //    myBlockUi.stop();
    //    //if (data == "Exist") {

    //    //  cfpLoadingBar.complete(); 

    //    //  myblockUI.stop();
    //    //  swal({ title: "Error!", text: "ContractType name already exist!", type: "error", timer: 2000 });

    //    //}
    //    // if (data == "Done") {

    //    // }

    //  });
    //clearControl();
  };

  $scope.remove = function (ContractType) {
    swal({
      title: "Are you sure you want to delete the ContractType ?",
      text: ContractType.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         var getData = ContractTypeService.deleteContractType(ContractType);
         getData.then(function (msg) {
           fetshData();
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

         }, function (msg) {
           swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });
           $scope.msg = msg.data;
         });

         //    $http.post($scope.URL + "DeleteContractType", { 'ContractType': ContractType })
         //.success(function (data, status, headers, config) {
         //  swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


         //  $http.post($scope.URL + "FetchContractType")
         //    .then(function (response) {
         //      vm.ContractTypeData = response.data;
         //    });
         //  notify("Recored Deleted Successfully");

         //  var index = vm.ContractTypeData.indexOf(ContractType);
         //  vm.ContractTypeData.splice(index, 1);

         //});

       }
     });


    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  $scope.removeSelected = function (ContractTypeId) {
    var getData = ContractTypeService.deleteContractTypeSelected(ContractTypeId);
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
    $scope.ContractType = {};
    //start from last index because starting from first index cause shifting
    //in the array because of array.splice()
    for (var i = vm.ContractTypeData.length - 1; i >= 0; i--) {
      if ($scope.tableSelection[i]) {
        //delete row from data 
        $scope.removeSelected(vm.ContractTypeData[i].Id);
        //fetshData();

        //vm.ContractTypeData.splice(i, 1);
        //delete rowSelection property
        // delete $scope.tableSelection[i];
      }

    }

  };

  $scope.UpdateContractTypeStatus = function (ContractType) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post($scope.URL + "UpdateContractTypeStatus", { 'ContractType': ContractType })
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
    $http.post($scope.URL + "DeleteSelectedContractType", itemList)
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
    //  $http.post($scope.URL + "FetchContractTypeByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    $http.post($scope.URL + "FetchContractType")
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
      vm.ContractTypeData = fillData;

      $scope.tableSettings = new TableSettings(vm.ContractTypeData);
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

//angular.module('ContractTypeSort', []).directive("sort", function () {
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