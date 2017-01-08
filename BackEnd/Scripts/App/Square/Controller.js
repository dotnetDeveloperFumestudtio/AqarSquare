var app = angular.module('squareapp', []);
app.controller('SquareController', function ($scope, $http, notify, blockUI, cfpLoadingBar, SquareService) {


  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.SquareData = {};
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;
  $scope.order = 'Title';
  $scope.reverse = false;
  $scope.attractionListModel = "";
  $scope.citySelectedId = "";

  $scope.citymodel = [];
  $scope.citysettings = {
    displayProp: 'Title', idProp: 'Id', enableSearch: true, scrollableHeight: '300px',
    selectionLimit: 2,
    showCheckAll: false,
    showUncheckAll: false,
    closeOnSelect: true,
    scrollable: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function (itemText, originalItem) {
      if (itemText === 'Jhon') {
        return 'Jhonny!';
      }

      return itemText;
    }
  };
  function getCities() {
    return $http.get($scope.URL + "FetchCity");
  };

  bindCities();
  function bindCities() {
    var desg = getCities();

    desg.then(function (dsg) {
      $scope.citydata = dsg.data;
      $scope.cities = dsg.data;
    }, function (dsg) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    });
  }

  fetshData();

  $scope.tableSelection = {};

  $scope.isAll = false;

  $scope.selectAllRows = function () {
    //check if all selected or not
    if ($scope.isAll === false) {
      //set all row selected
      angular.forEach(vm.SquareData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.SquareData, function (row, index) {
        $scope.tableSelection[index] = false;
      });
      $scope.isAll = false;
    }
  };

  $scope.create = function (square) {
    // Get the reference to the block service.   
    var myBlockUi = blockUI.instances.get('myBlockUI');


    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();


    var attd = $scope.citymodel.map(function (a) { return a.id; });
    if (attd.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 city", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.citySelectedId = parseInt(attd);

    square.CityId = $scope.citySelectedId;

    square.TitleAr = $scope.current.TitleAr;
    square.Title = $scope.current.Title;
    square.Status = $scope.current.Status;
    square.CreatedDate = $scope.current.CreatedDate;
    square.CreatedBy = $scope.UserId;
    $http.post($scope.URL + "CreateSquare", { 'Square': square })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {

          cfpLoadingBar.complete();

          myBlockUi.stop();
          swal({ title: "Error!", text: "Square name already exist!", type: "error", timer: 2000 });

        }
        if (data == "Done") {
          fetshData();

        }



      });

    clearControl();
  };

  $scope.edit = function (square) {
    if (square != null) {
      $scope.current = square;

      var cityObjId = parseInt(square.CityId);
      $scope.citymodel = [{ id: cityObjId }];
    } else {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (square) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();


    var attd = $scope.citymodel.map(function (a) { return a.id; });
    if (attd.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 city", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.citySelectedId = parseInt(attd);

    square.CityId = $scope.citySelectedId;

    square.Id = $scope.current.Id;
    square.TitleAr = $scope.current.TitleAr;
    square.Title = $scope.current.Title;
    square.CreatedBy = $scope.current.CreatedBy;
    square.Status = $scope.current.Status;
    square.CreatedBy = $scope.UserId;

    var getData = SquareService.updateSquare(square);
    getData.then(function (msg) {
      fetshData();
      clearControl();
    }, function (msg) {
      swal({ title: "Error!", text: msg.data, type: "error", timer: 2000, showConfirmButton: false });

    });


  };

  $scope.remove = function (square) {
    swal({
      title: "Are you sure you want to delete the Square ?",
      text: square.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         var getData = SquareService.deleteSquare(square);
         getData.then(function (msg) {
           fetshData();
           $("#alertModal").modal('show');
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

         }, function (msg) {
           swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });
           $scope.msg = msg.data;
         });

         //    $http.post($scope.URL + "DeleteSquare", { 'Square': Square })
         //.success(function (data, status, headers, config) {
         //  swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


         //  $http.post($scope.URL + "FetchSquare")
         //    .then(function (response) {
         //      vm.SquareData = response.data;
         //    });
         //  notify("Recored Deleted Successfully");

         //  var index = vm.SquareData.indexOf(Square);
         //  vm.SquareData.splice(index, 1);

         //});

       }
     });


    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };
  $scope.removeSelected = function (squareId) {

    var getData = SquareService.deleteSquareSelected(squareId);
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
    $scope.Square = {};
    //start from last index because starting from first index cause shifting
    //in the array because of array.splice()
    for (var i = vm.SquareData.length - 1; i >= 0; i--) {
      if ($scope.tableSelection[i]) {
        //delete row from data 
        $scope.removeSelected(vm.SquareData[i].Id);
        fetshData();

        //vm.SquareData.splice(i, 1);
        //delete rowSelection property
        // delete $scope.tableSelection[i];
      }

    }

  };

  $scope.UpdateSquareStatus = function (square) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post($scope.URL + "UpdateSquareStatus", { 'Square': square })
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

  vm.pageChanged = function () {
    fetshData();

  };

  function fetshData() {

    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    $http.post($scope.URL + "FetchSquareByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "TitleAr": data.Data[i].TitleAr,
          "Title": data.Data[i].Title,
          "Status": data.Data[i].Status,
          "CreatedDate": toJavaScriptDate(data.Data[i].CreatedDate),
          "CityTitle": data.Data[i].CityTitle,
          "CityId": data.Data[i].CityId,
          "CreatedByUserName": data.Data[i].CreatedByUserName,
          "CreatedBy": data.Data[i].CreatedBy
        });
      }
      fillData = fillData.slice(1);
      vm.SquareData = fillData;
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
    $scope.citymodel = '';
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  }
  function toJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getDate() + "/" + dt.getMonth() + 1) + "/" + dt.getFullYear() + "    " + dt.getHours() + " : " + dt.getMinutes();
  }


});

angular.module('SquareSort', []).directive("sort", function () {
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