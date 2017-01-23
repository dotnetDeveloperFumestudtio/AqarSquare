var app = angular.module('adminpropertyapp', []);
app.controller('PropertyAdminController', function ($scope, $http, notify, blockUI, Upload, Map, cfpLoadingBar, PropertyService) {
  $scope.CountUnApprovedProperty();
  $scope.CountunApproved = 11;

  $scope.place = {};
  $scope.getpos = function (event) {
    $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
    $scope.variable1 = $scope.latlng;

  };

  $scope.IsHidden = true;
  $scope.ShowHide = function () {
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };
  $scope.propertyInfoDiv = true;
  $scope.propertyMediaDiv = false;
  $scope.finishButton = false;
  cfpLoadingBar.start();

  var vm = this;
  vm.totaladminItems = 0;
  vm.currentPageAdmin = 1;
  vm.pageNumberAdmin = 5;
  vm.UserPropertyData = {};
  $scope.PropertyId = 26;
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

  fetchAdminData();
  $scope.tableSelection = {};

  $scope.isAll = false;

  $scope.selectAllRows = function () {
    //check if all selected or not
    if ($scope.isAll === false) {
      //set all row selected
      angular.forEach(vm.UserPropertyData, function (row, index) {
        $scope.tableSelection[index] = true;

      });
      $scope.isAll = true;
    } else {
      //set all row unselected
      angular.forEach(vm.UserPropertyData, function (row, index) {
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
    property.Late = $scope.place.lat;
    property.Long = $scope.place.lng;

    property.TitleAr = $scope.current.TitleAr;
    property.Title = $scope.current.Title;
    property.Status = $scope.current.Status;
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
    property.Space = $scope.Space;
    property.UserId = $scope.UserId;
    $http.post($scope.URL + "CreateProperty", { 'Property': property })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {

          cfpLoadingBar.complete();

          myBlockUi.stop();
          swal({ title: "Error!", text: "Property name already exist!", type: "error", timer: 2000 });

        } else {
          $scope.PropertyId = data;
        }
        //if (data == "Done") {
        //  fetchUserData();

        //}
        if ($scope.PropertyId != 0) {
          $scope.propertyInfoDiv = false;
          $scope.propertyMediaDiv = true;
        }


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
           fetchAdminData();
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
         //      vm.UserPropertyData = response.data;
         //    });
         //  notify("Recored Deleted Successfully");

         //  var index = vm.UserPropertyData.indexOf(Property);
         //  vm.UserPropertyData.splice(index, 1);

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
      fetchAdminData();
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
    for (var i = vm.UserPropertyData.length - 1; i >= 0; i--) {
      if ($scope.tableSelection[i]) {
        //delete row from data 
        $scope.removeSelected(vm.UserPropertyData[i].Id);
        //fetchUserData();

        //vm.UserPropertyData.splice(i, 1);
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

          fetchAdminData();
          //myBlockUi.stop();
          notify("Error,Recored Updated Fail");

        }
        else {

          fetchAdminData();
          //myBlockUi.stop();
          notify("Recored Updated Successfully");
        }
      });
  };

  vm.pageChanged = function () {
    fetchAdminData();

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

  $scope.uploadBalaconyPic = function (file) {

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/modules/common/fileUpload/UploadHandlerBalacony.ashx',

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
      closeOnConfirm: true,
    },
   function (isConfirmAtt) {
     if (isConfirmAtt) {

       $http.post($scope.URL + "DeleteImageBalaconies", { 'image': image })
             .success(function (data, status, headers, config) {
               $http.post($scope.URL + "GetAllImageBalaconies", { 'image': image })
                   .success(function (data, status, headers, config) {
                     $scope.balaconyImages = data;

                   }).error(function (data, status, headers, config) {
                     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                   });
             })
              .error(function (data, status, headers, config) {
                swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

              });


     }
   });

  };

  $scope.DeleteSelectedBalaconyImage = function (list) {
    var itemList = [];
    angular.forEach(list, function (value, key) {
      if (list[key].selected) {
        itemList.push(list[key].selected);
      }
    });
    //console.log(itemList.length);  
    $http.post($scope.URL + "DeleteSelectedBalaconyImage", itemList)
      .success(function (data) {

        $http.post($scope.URL + "GetAllImageBalaconyByPropertyId", { 'propertyId': $scope.PropertyId })

                      .success(function (dataReturn, status, headers, config) {
                        $scope.BalaconyImages = dataReturn;
                        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

                      }).error(function (dataerror, status, headers, config) {
                        swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                      });

      }).error(function (msg) {
        console.log(msg);
      });
  }


  $scope.uploadBathroomPic = function (file) {

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/modules/common/fileUpload/UploadHandlerBathroom.ashx',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $http.post($scope.URL + "InsertImageBathroom", { 'userId': $scope.UserId, 'propertyId': $scope.PropertyId, 'image': response.data })
      .success(function (data, status, headers, config) {

        myBlockUi.stop();
        $scope.bathroomImages = data;
        notify("File Uploaded Successfuly");
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

  $scope.removeBathroomImage = function (image) {
    swal({
      title: "Are you sure you want to delete this image ?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: true,
    },
   function (isConfirmAtt) {
     if (isConfirmAtt) {

       $http.post($scope.URL + "DeleteImageBathroom", { 'image': image })
             .success(function (data, status, headers, config) {
               $http.post($scope.URL + "GetAllImageBathroom", { 'image': image })
                   .success(function (data, status, headers, config) {
                     $scope.bathroomImages = data;

                   }).error(function (data, status, headers, config) {
                     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                   });
             })
              .error(function (data, status, headers, config) {
                swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

              });
     }
   });

  };

  $scope.DeleteSelectedBathroomImage = function (list) {
    var itemList = [];
    angular.forEach(list, function (value, key) {
      if (list[key].selected) {
        itemList.push(list[key].selected);
      }
    });
    //console.log(itemList.length);  
    $http.post($scope.URL + "DeleteSelectedBathroomImage", itemList)
      .success(function (data) {

        $http.post($scope.URL + "GetAllImageBathroomByPropertyId", { 'propertyId': $scope.PropertyId })

                      .success(function (dataReturn, status, headers, config) {
                        $scope.BathroomImages = dataReturn;
                        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

                      }).error(function (dataerror, status, headers, config) {
                        swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                      });

      }).error(function (msg) {
        console.log(msg);
      });
  }


  $scope.uploadBedroomPic = function (file) {

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/modules/common/fileUpload/UploadHandlerBedroom.ashx',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $http.post($scope.URL + "InsertImageBedroom", { 'userId': $scope.UserId, 'propertyId': $scope.PropertyId, 'image': response.data })
      .success(function (data, status, headers, config) {

        myBlockUi.stop();
        $scope.BedroomImages = data;
        notify("File Uploaded Successfuly");
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

  $scope.removeBedroomImage = function (image) {
    swal({
      title: "Are you sure you want to delete this image ?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: true,
    },
   function (isConfirmAtt) {
     if (isConfirmAtt) {

       $http.post($scope.URL + "DeleteImageBedroom", { 'image': image })
             .success(function (data, status, headers, config) {
               $http.post($scope.URL + "GetAllImageBedroom", { 'image': image })
                   .success(function (data, status, headers, config) {
                     $scope.BedroomImages = data;

                   }).error(function (data, status, headers, config) {
                     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                   });
             })
              .error(function (data, status, headers, config) {
                swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

              });
     }
   });

  };

  $scope.DeleteSelectedBedroomImage = function (list) {
    var itemList = [];
    angular.forEach(list, function (value, key) {
      if (list[key].selected) {
        itemList.push(list[key].selected);
      }
    });
    //console.log(itemList.length);  
    $http.post($scope.URL + "DeleteSelectedBedroomImage", itemList)
      .success(function (data) {

        $http.post($scope.URL + "GetAllImageBedroomByPropertyId", { 'propertyId': $scope.PropertyId })

                      .success(function (dataReturn, status, headers, config) {
                        $scope.BedroomImages = dataReturn;
                        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

                      }).error(function (dataerror, status, headers, config) {
                        swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                      });

      }).error(function (msg) {
        console.log(msg);
      });
  }


  $scope.uploadGardenPic = function (file) {

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/modules/common/fileUpload/UploadHandlerGarden.ashx',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $http.post($scope.URL + "InsertImageGarden", { 'userId': $scope.UserId, 'propertyId': $scope.PropertyId, 'image': response.data })
      .success(function (data, status, headers, config) {

        myBlockUi.stop();
        $scope.GardenImages = data;
        notify("File Uploaded Successfuly");
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

  $scope.removeGardenImage = function (image) {
    swal({
      title: "Are you sure you want to delete this image ?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: true,
    },
   function (isConfirmAtt) {
     if (isConfirmAtt) {

       $http.post($scope.URL + "DeleteImageGarden", { 'image': image })
             .success(function (data, status, headers, config) {
               $http.post($scope.URL + "GetAllImageGarden", { 'image': image })
                   .success(function (data, status, headers, config) {
                     $scope.GardenImages = data;

                   }).error(function (data, status, headers, config) {
                     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                   });
             })
              .error(function (data, status, headers, config) {
                swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

              });
     }
   });

  };

  $scope.DeleteSelectedGardenImage = function (list) {
    var itemList = [];
    angular.forEach(list, function (value, key) {
      if (list[key].selected) {
        itemList.push(list[key].selected);
      }
    });
    //console.log(itemList.length);  
    $http.post($scope.URL + "DeleteSelectedGardenImage", itemList)
      .success(function (data) {

        $http.post($scope.URL + "GetAllImageGardenByPropertyId", { 'propertyId': $scope.PropertyId })

                      .success(function (dataReturn, status, headers, config) {
                        $scope.GardenImages = dataReturn;
                        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

                      }).error(function (dataerror, status, headers, config) {
                        swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                      });

      }).error(function (msg) {
        console.log(msg);
      });
  }


  $scope.uploadPoolPic = function (file) {

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/modules/common/fileUpload/UploadHandlerPool.ashx',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $http.post($scope.URL + "InsertImagePool", { 'userId': $scope.UserId, 'propertyId': $scope.PropertyId, 'image': response.data })
      .success(function (data, status, headers, config) {

        myBlockUi.stop();
        $scope.PoolImages = data;
        notify("File Uploaded Successfuly");
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

  $scope.removePoolImage = function (image) {
    swal({
      title: "Are you sure you want to delete this image ?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: true,
    },
   function (isConfirmAtt) {
     if (isConfirmAtt) {

       $http.post($scope.URL + "DeleteImagePool", { 'image': image })
             .success(function (data, status, headers, config) {
               $http.post($scope.URL + "GetAllImagePool", { 'image': image })
                   .success(function (data, status, headers, config) {
                     $scope.PoolImages = data;

                   }).error(function (data, status, headers, config) {
                     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                   });
             })
              .error(function (data, status, headers, config) {
                swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

              });
     }
   });

  };

  $scope.DeleteSelectedPoolImage = function (list) {
    var itemList = [];
    angular.forEach(list, function (value, key) {
      if (list[key].selected) {
        itemList.push(list[key].selected);
      }
    });
    //console.log(itemList.length);  
    $http.post($scope.URL + "DeleteSelectedPoolImage", itemList)
      .success(function (data) {

        $http.post($scope.URL + "GetAllImagePoolByPropertyId", { 'propertyId': $scope.PropertyId })

                      .success(function (dataReturn, status, headers, config) {
                        $scope.PoolImages = dataReturn;
                        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

                      }).error(function (dataerror, status, headers, config) {
                        swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                      });

      }).error(function (msg) {
        console.log(msg);
      });
  }


  $scope.uploadReceptionPic = function (file) {

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/modules/common/fileUpload/UploadHandlerReception.ashx',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $http.post($scope.URL + "InsertImageReception", { 'userId': $scope.UserId, 'propertyId': $scope.PropertyId, 'image': response.data })
      .success(function (data, status, headers, config) {

        myBlockUi.stop();
        $scope.ReceptionImages = data;
        //if ($scope.balaconyImages != null && $scope.bathroomImages != null &&
        //   $scope.BedroomImages != null && $scope.GardenImages != null &&
        //   $scope.PoolImages != null && $scope.ReceptionImages != null) {
        //  $scope.finishButton = true;

        //}

        notify("File Uploaded Successfuly");
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

  $scope.removeReceptionImage = function (image) {
    swal({
      title: "Are you sure you want to delete this image ?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: true,
    },
   function (isConfirmAtt) {
     if (isConfirmAtt) {

       $http.post($scope.URL + "DeleteImageReception", { 'image': image })
             .success(function (data, status, headers, config) {
               $http.post($scope.URL + "GetAllImageReception", { 'image': image })
                   .success(function (data, status, headers, config) {
                     $scope.ReceptionImages = data;

                   }).error(function (data, status, headers, config) {
                     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                   });
             })
              .error(function (data, status, headers, config) {
                swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

              });
     }
   });

  };

  $scope.DeleteSelectedReceptionImage = function (list) {
    var itemList = [];
    angular.forEach(list, function (value, key) {
      if (list[key].selected) {
        itemList.push(list[key].selected);
      }
    });
    //console.log(itemList.length);  
    $http.post($scope.URL + "DeleteSelectedReceptionImage", itemList)
      .success(function (data) {

        $http.post($scope.URL + "GetAllImageReceptionByPropertyId", { 'propertyId': $scope.PropertyId })

                      .success(function (dataReturn, status, headers, config) {
                        $scope.ReceptionImages = dataReturn;
                        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

                      }).error(function (dataerror, status, headers, config) {
                        swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

                      });

      }).error(function (msg) {
        console.log(msg);
      });
  }

  $scope.$watchCollection('[balaconyImages, bathroomImages,BedroomImages,GardenImages,PoolImages,ReceptionImages]', function (newValues) {
    if (newValues[0].length != 0 && newValues[1].length != 0 &&
             newValues[2].length != 0 && newValues[3].length != 0 &&
             newValues[4].length != 0 && newValues[5].length != 0) {
      $scope.finishButton = true;
    } else {
      $scope.finishButton = false;

    }
  });
  function fetchAdminData() {

    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    $http.post($scope.URL + "FetchAdminPropertyByPageSize", { 'pageNumber': vm.currentPageAdmin, 'pageSize': vm.pageNumberAdmin })
    .success(function (data, status, headers, config) {
      vm.totaladminItems = data.TotalCount;
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
          "CreatedDate": $scope.toJavaScriptDate(data.Data[i].CreatedDate),
          "CreatedByUserName": data.Data[i].CreatedByUserName,
          "CreatedBy": data.Data[i].CreatedBy,
          "ApprovedDate": data.Data[i].ApprovedDate,
          "ApprovedBy": data.Data[i].ApprovedBy,
          "UserId": data.Data[i].UserId,
          "Space": data.Data[i].Space,
          "PropertyId": data.Data[i].PropertyId
        });
      }
      fillData = fillData.slice(1);
      vm.AdminPropertyData = fillData;
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

  //function toJavaScriptDate(value) {
  //  var pattern = /Date\(([^)]+)\)/;
  //  var results = pattern.exec(value);
  //  var dt = new Date(parseFloat(results[1]));
  //  return (dt.getDate() + "/" + dt.getMonth() + 1) + "/" + dt.getFullYear() + "    " + dt.getHours() + " : " + dt.getMinutes();
  //}


  $scope.search = function () {
    $scope.apiError = false;
    Map.search($scope.searchPlace)
    .then(
        function (res) { // success
          Map.addMarker(res);
          $scope.place.name = res.name;
          $scope.place.lat = res.geometry.location.lat();
          $scope.place.lng = res.geometry.location.lng();
        },
        function (status) { // error
          $scope.apiError = true;
          $scope.apiStatus = status;
        }
    );
  }

  $scope.send = function () {
    alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
  }

  Map.init();

});


app.service('Map', function ($q) {

  this.init = function () {
    var options = {
      center: new google.maps.LatLng(40.7127837, -74.00594130000002),
      zoom: 13,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(
        document.getElementById("map"), options
    );
    this.places = new google.maps.places.PlacesService(this.map);
  }

  this.search = function (str) {
    var d = $q.defer();
    this.places.textSearch({ query: str }, function (results, status) {
      if (status == 'OK') {
        d.resolve(results[0]);
      }
      else d.reject(status);
    });
    return d.promise;
  }

  this.addMarker = function (res) {
    if (this.marker) this.marker.setMap(null);
    this.marker = new google.maps.Marker({
      map: this.map,
      position: res.geometry.location,
      animation: google.maps.Animation.DROP,
      draggable: true
    });
    this.map.setCenter(res.geometry.location);
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