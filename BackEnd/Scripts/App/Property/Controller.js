var app = angular.module('propertyapp', []);
app.controller('PropertyController', function ($scope, $http, notify, blockUI, Upload, cfpLoadingBar, PropertyService) {

  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.PropertyData = {};
  $scope.PropertyId = 25;
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;
  $scope.order = 'Title';
  $scope.reverse = false;
  $scope.attractionListModel = "";
  $scope.squareSelectedId = "";
  $scope.squaremodel = [];
  $scope.currencySelectedId = "";
  $scope.currencymodel = [];
  $scope.propertytypeSelectedId = "";
  $scope.propertytypemodel = [];
  $scope.contracttypeSelectedId = "";
  $scope.contracttypemodel = [];
  $scope.balaconyImages = {};


  $scope.squaresettings = {
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
  function getSquares() {
    return $http.get($scope.URL + "FetchSquare");
  };

  bindSquares();

  function bindSquares() {
    var desg = getSquares();

    desg.then(function (dsg) {
      $scope.squaredata = dsg.data;
      $scope.squares = dsg.data;
    }, function (dsg) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    });
  }

  $scope.currencysettings = {
    displayProp: 'CurrencyKey', idProp: 'Id', enableSearch: true, scrollableHeight: '300px',
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
  function getCurrencies() {
    return $http.get($scope.URL + "FetchAllCurrency");
  };

  bindCurrecies();

  function bindCurrecies() {
    var desg = getCurrencies();

    desg.then(function (dsg) {
      $scope.currencydata = dsg.data;
      $scope.currencies = dsg.data;
    }, function (dsg) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    });
  }


  $scope.propertytypesettings = {
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
  function getPropertyTypes() {
    return $http.get($scope.URL + "FetchAllPropertyType");
  };

  bindPropertyTypes();

  function bindPropertyTypes() {
    var desg = getPropertyTypes();

    desg.then(function (dsg) {
      $scope.propertytypedata = dsg.data;
      $scope.propertytypes = dsg.data;
    }, function (dsg) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    });
  }


  $scope.contracttypesettings = {
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
  function getContractTypes() {
    return $http.get($scope.URL + "FetchAllContractType");
  };

  bindContractTypes();

  function bindContractTypes() {
    var desg = getContractTypes();

    desg.then(function (dsg) {
      $scope.contracttypedata = dsg.data;
      $scope.contracttypes = dsg.data;
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
      angular.forEach(vm.PropertyData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.PropertyData, function (row, index) {
        $scope.tableSelection[index] = false;
      });
      $scope.isAll = false;
    }
  };

  $scope.create = function (property) {
    // Get the reference to the block service.   
    var myBlockUi = blockUI.instances.get('myBlockUI');

    var squareId = $scope.squaremodel.map(function (a) { return a.id; });
    if (squareId.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 Square", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    if (squareId.length > 1) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose just 1 Square", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.squareSelectedId = parseInt(squareId);


    var currencyId = $scope.currencymodel.map(function (a) { return a.id; });
    if (currencyId.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 Currency", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    if (currencyId.length > 1) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose just 1 Currency", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.currencySelectedId = parseInt(currencyId);


    var propertytypeId = $scope.propertytypemodel.map(function (a) { return a.id; });
    if (propertytypeId.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 Property Type", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    if (propertytypeId.length > 1) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose just 1 Property Type", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.propertytypeSelectedId = parseInt(currencyId);

    var contracttypeId = $scope.contracttypemodel.map(function (a) { return a.id; });
    if (contracttypeId.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 Contract Type", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    if (contracttypeId.length > 1) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose just 1 Contract Type", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.contracttypeSelectedId = parseInt(contracttypeId);

    // Start blocking the element.
    //myBlockUi.start({
    //  message: 'Wait Please ...'
    //});
    cfpLoadingBar.start();
    //property.Late = $scope.variable1[0];
    //property.Long = $scope.variable1[1];

    property.TitleAr = $scope.current.TitleAr;
    property.Title = $scope.current.Title;
    //property.Status = $scope.current.Status;
    property.Description = $scope.current.Description;
    property.DescriptionAr = $scope.current.DescriptionAr;
    property.Address = $scope.current.Address;
    property.AddressAr = $scope.current.AddressAr;
    property.Price = $scope.current.Price;
    property.BathroomNo = $scope.current.BathroomNo;
    property.BedroomNo = $scope.current.BedroomNo;
    property.RoomsNo = $scope.current.RoomsNo;
    property.ReceptionNo = $scope.current.ReceptionNo;
    property.Floor = $scope.current.Floor;
    property.Balacony = $scope.current.Balacony;
    property.Garage = $scope.current.Garage;
    property.Garden = $scope.current.Garden;
    property.Pool = $scope.current.Pool;
    property.Lift = $scope.current.Lift;
    property.Area = $scope.squareSelectedId;
    property.propertyType = $scope.propertytypeSelectedId;
    property.ContractType = $scope.contracttypeSelectedId;
    property.Currency = $scope.currencySelectedId;
    property.CreatedDate = $scope.current.CreatedDate;
    property.CreatedBy = $scope.UserId;
    property.UserId = $scope.UserId;
    $http.post($scope.URL + "CreateProperty", { 'Property': property })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {

          cfpLoadingBar.complete();

          myBlockUi.stop();
          swal({ title: "Error!", text: "Property name already exist!", type: "error", timer: 2000 });

        } else {
          $scope.PropertyId = data;
          fetshData();
        }
        //if (data == "Done") {
        //  fetshData();

        //}



      });

    clearControl();
  };

  $scope.edit = function (property) {
    if (property != null) {
      $scope.current = property;

    } else {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (property) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    //// Start blocking the element.
    //myBlockUi.start({
    //  message: 'Wait Please ...'
    //});
    cfpLoadingBar.start();


    property.Id = $scope.current.Id;
    property.TitleAr = $scope.current.TitleAr;
    property.Title = $scope.current.Title;
    property.CreatedBy = $scope.current.CreatedBy;
    property.Status = $scope.current.Status;
    property.CreatedBy = $scope.UserId;

    var getData = PropertyService.updateProperty(property);
    getData.then(function (msg) {
      fetshData();
      clearControl();
    }, function (msg) {
      swal({ title: "Error!", text: msg.data, type: "error", timer: 2000, showConfirmButton: false });

    });


    //$http.post($scope.URL + "UpdateProperty", { 'Property': Property })
    //  .success(function (data, status, headers, config) {
    //    cfpLoadingBar.complete();

    //    //myBlockUi.stop();
    //    //if (data == "Exist") {

    //    //  cfpLoadingBar.complete(); 

    //    //  //myBlockUi.stop();
    //    //  swal({ title: "Error!", text: "Property name already exist!", type: "error", timer: 2000 });

    //    //}
    //    // if (data == "Done") {

    //    // }

    //  });
    //clearControl();
  };

  $scope.remove = function (property) {
    swal({
      title: "Are you sure you want to delete the Property ?",
      text: property.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         var getData = PropertyService.deleteProperty(property);
         getData.then(function (msg) {
           fetshData();
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

         }, function (msg) {
           swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });
           $scope.msg = msg.data;
         });

         //    $http.post($scope.URL + "DeleteProperty", { 'Property': Property })
         //.success(function (data, status, headers, config) {
         //  swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


         //  $http.post($scope.URL + "FetchProperty")
         //    .then(function (response) {
         //      vm.PropertyData = response.data;
         //    });
         //  notify("Recored Deleted Successfully");

         //  var index = vm.PropertyData.indexOf(Property);
         //  vm.PropertyData.splice(index, 1);

         //});

       }
     });


    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  $scope.removeSelected = function (propertyId) {
    var getData = PropertyService.deletePropertySelected(propertyId);
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
    $scope.Property = {};
    //start from last index because starting from first index cause shifting
    //in the array because of array.splice()
    for (var i = vm.PropertyData.length - 1; i >= 0; i--) {
      if ($scope.tableSelection[i]) {
        //delete row from data 
        $scope.removeSelected(vm.PropertyData[i].Id);
        //fetshData();

        //vm.PropertyData.splice(i, 1);
        //delete rowSelection property
        // delete $scope.tableSelection[i];
      }

    }

  };

  $scope.UpdatePropertyStatus = function (property) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    //myBlockUi.start({
    //  message: 'Wait Please ...'
    //});
    cfpLoadingBar.start();

    $http.post($scope.URL + "UpdatePropertyStatus", { 'Property': property })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          fetshData();
          //myBlockUi.stop();
          notify("Error,Recored Updated Fail");

        }
        else {

          fetshData();
          //myBlockUi.stop();
          notify("Recored Updated Successfully");
        }
      });
  };

  vm.pageChanged = function () {
    fetshData();

  };

  $scope.view = function (property) {
    //  $anchorScroll('formModeration');

    // $scope.currentModration = property;
    $http.post($scope.URL + "GetPropertyInfo", { 'property': property })
 .success(function (data, status, headers, config) {

   $scope.propertyInfo = data;
   $scope.propertyInfo.CreatedDate = toJavaScriptDate(data.CreatedDate);
 })
 .error(function (data, status, headers, config) {
   swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

 }
 );

  };

  $scope.uploadPic = function (file) {

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/modules/common/fileUpload/UploadHandler.ashx',

      data: { file: file },
    });

    file.upload.then(function (response) { 
      $http.post($scope.URL + "InsertImageBalaconies", { 'userId': $scope.UserId, 'propertyId': $scope.PropertyId, 'image': response.data })
      .success(function (data, status, headers, config) {
        //fetchData();
        // $scope.divuploadmedia = false;
        myBlockUi.stop();
        $scope.balaconyImages = data;
        notify("File Uploaded Successfuly");
        // clearControl();
      });

      $timeout(function () {
        file.result = response.data;
      
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }


  $scope.removeBalaconyImage = function (image) {

    swal({
      title: "Are you sure you want to delete this image ?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
    function (isConfirmAtt) {
      if (isConfirmAtt) {

    $http.post($scope.URL + "DeleteImageBalaconies", { 'image': image })
 .success(function (data, status, headers, config) {
    
 })
 .error(function (data, status, headers, config) {
   swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

 }
 );
      
         
      }
    });

  };
  function fetshData() {

    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    $http.post($scope.URL + "FetchUserPropertyByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
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
          "Late": data.Data[i].Late,
          "Long": data.Data[i].Long,
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
          "CreatedBy": data.Data[i].CreatedBy,
          "UserId": data.Data[i].UserId
        });
      }
      fillData = fillData.slice(1);
      vm.PropertyData = fillData;
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
    $scope.attractionmodel = '';
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

angular.module('PropertySort', []).directive("sort", function () {
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