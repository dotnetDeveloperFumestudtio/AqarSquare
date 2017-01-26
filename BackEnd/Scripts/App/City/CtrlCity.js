var app = angular.module('cityapp', []);
app.controller('CityController', function ($scope, $http, notify, blockUI, cfpLoadingBar, cityService) {

  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.cityData = {};
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
      angular.forEach(vm.cityData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.cityData, function (row, index) {
        $scope.tableSelection[index] = false;
      });
      $scope.isAll = false;
    }
  };
  $scope.create = function (city) {
    // Get the reference to the block service.   
    var myBlockUi = blockUI.instances.get('myBlockUI');


    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    city.TitleAr = $scope.current.TitleAr;
    city.Title = $scope.current.Title;
    city.Status = $scope.current.Status;
    city.CreatedDate = $scope.current.CreatedDate;
    city.CreatedBy = $scope.UserId;
    $http.post($scope.URL + "CreateCity", { 'city': city })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {

          cfpLoadingBar.complete();

          myBlockUi.stop();
          swal({ title: "Error!", text: "City name already exist!", type: "error", timer: 2000 });

        }
        if (data == "Done") {
          fetshData();

        }



      });

    clearControl();
  };

  $scope.edit = function (city) {
    if (city != null) {
      $scope.current = city;

    } else {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (city) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();


    city.Id = $scope.current.Id;
    city.TitleAr = $scope.current.TitleAr;
    city.Title = $scope.current.Title;
    city.CreatedBy = $scope.current.CreatedBy;
    city.Status = $scope.current.Status;
    city.CreatedBy = $scope.UserId;

    var getData = cityService.updateCity(city);
    getData.then(function (msg) {
      fetshData();
      clearControl();
    }, function (msg) {
      swal({ title: "Error!", text: msg.data, type: "error", timer: 2000, showConfirmButton: false });

    });


    //$http.post($scope.URL + "UpdateCity", { 'city': city })
    //  .success(function (data, status, headers, config) {
    //    cfpLoadingBar.complete();

    //    myBlockUi.stop();
    //    //if (data == "Exist") {

    //    //  cfpLoadingBar.complete(); 

    //    //  myblockUI.stop();
    //    //  swal({ title: "Error!", text: "city name already exist!", type: "error", timer: 2000 });

    //    //}
    //    // if (data == "Done") {

    //    // }

    //  });
    //clearControl();
  };

  $scope.remove = function (city) {
    swal({
      title: "Are you sure you want to delete the city ?",
      text: city.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         var getData = cityService.deleteCity(city);
         getData.then(function (msg) {
           fetshData();
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

         }, function (msg) {
           swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });
           $scope.msg = msg.data;
         });

         //    $http.post($scope.URL + "Deletecity", { 'city': city })
         //.success(function (data, status, headers, config) {
         //  swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


         //  $http.post($scope.URL + "FetchCity")
         //    .then(function (response) {
         //      vm.cityData = response.data;
         //    });
         //  notify("Recored Deleted Successfully");

         //  var index = vm.cityData.indexOf(city);
         //  vm.cityData.splice(index, 1);

         //});

       }
     });


    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  $scope.removeSelected = function (cityId) {
    var getData = cityService.deleteCitySelected(cityId);
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
    $scope.city = {};
    //start from last index because starting from first index cause shifting
    //in the array because of array.splice()
    for (var i = vm.cityData.length - 1; i >= 0; i--) {
      if ($scope.tableSelection[i]) {
        //delete row from data 
        $scope.removeSelected(vm.cityData[i].Id);
        //fetshData();

        //vm.cityData.splice(i, 1);
        //delete rowSelection property
        // delete $scope.tableSelection[i];
      }

    }

  };

  $scope.UpdateCityStatus = function (city) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post($scope.URL + "UpdateCityStatus", { 'city': city })
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
    $http.post($scope.URL + "DeleteSelectedCity", itemList)
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
    //  $http.post($scope.URL + "FetchCityByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    $http.post($scope.URL + "FetchCity")
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
      vm.cityData = fillData;

      $scope.tableSettings = new TableSettings(vm.cityData);
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

//angular.module('citySort', []).directive("sort", function () {
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