var app = angular.module('QrCodeapp', []);
app.controller('QrCodeController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {


  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.image = "";

  $scope.images = {};
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;
  $scope.attractionListModel = "";
  $scope.attractionSelectedId = "";

  $scope.attractionmodel = [];
  $scope.attractionsettings = {
    displayProp: 'AttractionNameEn', idProp: 'Id', enableSearch: true, scrollableHeight: '300px',
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
  function getAttractions() {
    return $http.get($scope.URL + "FetchAttraction");
  };

  bindAttractions();
  function bindAttractions() {
    var desg = getAttractions();

    desg.then(function (dsg) {
      $scope.attractiondata = dsg.data;
      $scope.attractions = dsg.data;
    }, function (dsg) {
      $("#alertModal").modal('show');
      $scope.msg = "Error in filling regions drop down !";
    });
  }

  fetshData();

  cfpLoadingBar.start();
  function fetshData() {
    $http.post($scope.URL + "FetchQrCodeByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "AttractionId": data.Data[i].AttractionId,
        "AttractionNameEn": data.Data[i].AttractionNameEn,
        "Value": data.Data[i].Value,
      });
    }
    fillData = fillData.slice(1);
    vm.QrCodeData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );
  }

  $scope.create = function (qrCode) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');
    var attd = $scope.attractionmodel.map(function (a) { return a.id; });
    $scope.attractionSelectedId = parseInt(attd);

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    qrCode.AttractionId = $scope.attractionSelectedId;
    qrCode.Value = $scope.current.Value;

    $http.post($scope.URL + "CreateQrCode", { 'QrCode': qrCode })
      .success(function (data, status, headers, config) {
        fetshData();
        myBlockUi.stop();
        notify("Recored Saved Successfully");

      });
  };

  $scope.edit = function (qrCode) {
    var attId = parseInt(qrCode.AttractionId);
    $scope.attractionmodel = [{ id: attId }];

    $scope.current = qrCode;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (qrCode) {

    var attd = $scope.attractionmodel.map(function (a) { return a.id; });
    $scope.attractionSelectedId = parseInt(attd);


    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    qrCode.Id = $scope.current.Id;
    qrCode.AttractionId = $scope.attractionSelectedId;
    qrCode.Value = $scope.current.Value;

    $http.post($scope.URL + "UpdateQrCode", { 'QrCode': qrCode })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        fetshData();
        cfpLoadingBar.complete();

        myBlockUi.stop();
        notify("Recored Updated Successfully");
      });
  };

  $scope.remove = function (qrCode) {
    swal({
      title: "Are you sure you want to delete this Qr ?",
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
     // Get the reference to the block service.
     var myBlockUi = blockUI.instances.get('myBlockUI');

     // Start blocking the element.
     myBlockUi.start({
       message: 'Wait Please ...'
     });
     cfpLoadingBar.start();
     $http.post($scope.URL + "DeleteQrCode", { 'QrCode': qrCode })
       .success(function (data, status, headers, config) {
         swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

         fetshData();
         notify("Recored Deleted Successfully");
         myBlockUi.stop();

         var index = vm.QrCodeData.indexOf(qrCode);
         vm.QrCodeData.splice(index, 1);

       });

   }
 });

    //var delConfirm = confirm("Are you sure you want to delete this ?");
    //if (delConfirm == true) {
    //  // Get the reference to the block service.
    //  var myBlockUi = blockUI.instances.get('myBlockUI');

    //  // Start blocking the element.
    //  myBlockUi.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "DeleteQrCode", { 'QrCode': qrCode })
    //    .success(function (data, status, headers, config) {

    //      fetshData();
    //      notify("Recored Deleted Successfully");
    //      myBlockUi.stop();

    //      var index = vm.QrCodeData.indexOf(qrCode);
    //      vm.QrCodeData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  vm.pageChanged = function () {
    //fetsh message data  from databae 
    fetshData();

  };

  $scope.Reset = function () {

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  };
});
