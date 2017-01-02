var app = angular.module('Selfieapp', []);
app.controller('SelfieController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {


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


  cfpLoadingBar.start();
  $http.post($scope.URL + "FetchSelfieByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "AttractionId": data.Data[i].AttractionId,
        "AttractionNameEn": data.Data[i].AttractionNameEn,
        "NameAr": data.Data[i].NameAr,
        "NameFr": data.Data[i].NameFr,
        "NameIta": data.Data[i].NameIta,
        "NameRu": data.Data[i].NameRu,
        "NameGe": data.Data[i].NameGe,
        "NameEn": data.Data[i].NameEn,
        "ImageUrl": data.Data[i].ImageUrl
      });
    }
    fillData = fillData.slice(1);
    vm.SelfieData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );

  $scope.create = function (selfie, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');
    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    var attd = $scope.attractionmodel.map(function (a) { return a.id; });
    if (attd.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 attraction", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.attractionSelectedId = parseInt(attd);


    selfie.AttractionId = $scope.attractionSelectedId;
    selfie.NameAr = $scope.current.NameAr;
    selfie.NameFr = $scope.current.NameFr;
    selfie.NameIta = $scope.current.NameIta;
    selfie.NameRu = $scope.current.NameRu;
    selfie.NameGe = $scope.current.NameGe;
    selfie.NameEn = $scope.current.NameEn;
    selfie.ImageUrl = $scope.current.ImageUrl;

    $http.post($scope.URL + "CreateSelfie", { 'Selfie': selfie })
      .success(function (data, status, headers, config) {
        uploadPicSave(picFile, data);
        myBlockUi.stop();
        // notify("Recored Saved Successfully");
        clearControl();

      });
  };

  $scope.edit = function (selfie) {
    var attId = parseInt(selfie.AttractionId);
    $scope.attractionmodel = [{ id: attId }];

    $scope.current = selfie;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (selfie, picFile) {

    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    var attd = $scope.attractionmodel.map(function (a) { return a.id; });
    if (attd.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 attraction", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.attractionSelectedId = parseInt(attd);


    if (picFile != null) {
      uploadPic(picFile);
      selfie.Id = $scope.current.Id;
      selfie.AttractionId = $scope.attractionSelectedId;
      selfie.NameAr = $scope.current.NameAr;
      selfie.NameFr = $scope.current.NameFr;
      selfie.NameIta = $scope.current.NameIta;
      selfie.NameRu = $scope.current.NameRu;
      selfie.NameGe = $scope.current.NameGe;
      selfie.NameEn = $scope.current.NameEn;
      selfie.ImageUrl = $scope.current.ImageUrl;
    } else {

      selfie.Id = $scope.current.Id;
      selfie.AttractionId = $scope.attractionSelectedId;
      selfie.NameAr = $scope.current.NameAr;
      selfie.NameFr = $scope.current.NameFr;
      selfie.NameIta = $scope.current.NameIta;
      selfie.NameRu = $scope.current.NameRu;
      selfie.NameGe = $scope.current.NameGe;
      selfie.NameEn = $scope.current.NameEn;
      selfie.ImageUrl = $scope.current.ImageUrl;
    }

    $http.post($scope.URL + "UpdateSelfie", { 'Selfie': selfie })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchSelfieByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {
       $scope.isAdd = true;

       vm.current = {};
       vm.totalItems = data.TotalCount;
       var fillData = [{}];
       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "AttractionNameEn": data.Data[i].AttractionNameEn,
           "AttractionId": data.Data[i].AttractionId,
           "Id": data.Data[i].Id,
           "NameAr": data.Data[i].NameAr,
           "NameFr": data.Data[i].NameFr,
           "NameIta": data.Data[i].NameIta,
           "NameRu": data.Data[i].NameRu,
           "NameGe": data.Data[i].NameGe,
           "NameEn": data.Data[i].NameEn,
           "ImageUrl": data.Data[i].ImageUrl
         });
       }
       fillData = fillData.slice(1);
       vm.SelfieData = fillData;
       cfpLoadingBar.complete();
       clearControl();

       myBlockUi.stop();

     });
      });
  };

  function uploadPic(file) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/Selfie/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        if (response.data.Success == true) {
          updateImage($scope.current, response.data.FileId);

          notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "selfie image not uploaded", type: "error", timer: 2000, showConfirmButton: false });
          return;
        }


      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
  function uploadPicSave(file, selfie) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/Selfie/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;


        if (response.data.Success == true) {
          saveImage(selfie, response.data.FileId);

          notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(selfie);
          swal({ title: "Error!", text: "relfie image  not uploaded", type: "error", timer: 2000, showConfirmButton: false });
          return;
        }
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

  function updateImage(selfie, image) {

    selfie.Id = $scope.current.Id;
    selfie.NameAr = $scope.current.NameAr;
    selfie.NameFr = $scope.current.NameFr;
    selfie.NameIta = $scope.current.NameIta;
    selfie.NameRu = $scope.current.NameRu;
    selfie.NameGe = $scope.current.NameGe;
    selfie.NameEn = $scope.current.NameEn;
    selfie.ImageUrl = image;

    $http.post($scope.URL + "UpdateSelfie", { 'Selfie': selfie })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchSelfieByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {

       $scope.isAdd = true;

       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "AttractionNameEn": data.Data[i].AttractionNameEn,
           "AttractionId": data.Data[i].AttractionId,
           "Id": data.Data[i].Id,
           "NameAr": data.Data[i].NameAr,
           "NameFr": data.Data[i].NameFr,
           "NameIta": data.Data[i].NameIta,
           "NameRu": data.Data[i].NameRu,
           "NameGe": data.Data[i].NameGe,
           "NameEn": data.Data[i].NameEn,
           "ImageUrl": data.Data[i].ImageUrl
         });
       }
       fillData = fillData.slice(1);
       vm.SelfieData = fillData;
       cfpLoadingBar.complete();

     });

      });
  };
  function saveImage(selfie, image) {

    selfie.Id = selfie.Id;
    selfie.NameAr = selfie.NameAr;
    selfie.NameFr = selfie.NameFr;
    selfie.NameIta = selfie.NameIta;
    selfie.NameRu = selfie.NameRu;
    selfie.NameGe = selfie.NameGe;
    selfie.NameEn = selfie.NameEn;
    selfie.ImageUrl = image;

    $http.post($scope.URL + "UpdateSelfie", { 'Selfie': selfie })
      .success(function (data, status, headers, config) {


        //fetsh message data  from databae
        $http.post($scope.URL + "FetchSelfieByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {

       $scope.isAdd = true;

       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "AttractionNameEn": data.Data[i].AttractionNameEn,
           "AttractionId": data.Data[i].AttractionId,
           "Id": data.Data[i].Id,
           "NameAr": data.Data[i].NameAr,
           "NameFr": data.Data[i].NameFr,
           "NameIta": data.Data[i].NameIta,
           "NameRu": data.Data[i].NameRu,
           "NameGe": data.Data[i].NameGe,
           "NameEn": data.Data[i].NameEn,
           "ImageUrl": data.Data[i].ImageUrl
         });
       }
       fillData = fillData.slice(1);
       vm.SelfieData = fillData;
       cfpLoadingBar.complete();

       // notify("Recored Saved Successfully");
     });
      });
  };
  $scope.remove = function (selfie) {
    swal({
      title: "Are you sure you want to delete the Selfie ?",
      text: selfie.NameEn,
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
    $http.post($scope.URL + "DeleteSelfie", { 'Selfie': selfie })
      .success(function (data, status, headers, config) {
        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


        //fetsh message data  from databae
        $http.post($scope.URL + "FetchSelfieByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {

       $scope.isAdd = true;

       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "AttractionId": data.Data[i].AttractionId,
           "Id": data.Data[i].Id,
           "NameAr": data.Data[i].NameAr,
           "NameFr": data.Data[i].NameFr,
           "NameIta": data.Data[i].NameIta,
           "NameRu": data.Data[i].NameRu,
           "NameGe": data.Data[i].NameGe,
           "NameEn": data.Data[i].NameEn,
           "ImageUrl": data.Data[i].ImageUrl
         });
       }
       fillData = fillData.slice(1);
       vm.SelfieData = fillData;
       cfpLoadingBar.complete();

       myBlockUi.stop();
     });
        notify("Recored Deleted Successfully");

        var index = vm.SelfieData.indexOf(selfie);
        vm.SelfieData.splice(index, 1);

      });


  }
});

    //var delConfirm = confirm("Are you sure you want to delete the Selfie " + selfie.NameEn + " ?");
    //if (delConfirm == true) {
    //  // Get the reference to the block service.
    //  var myBlockUi = blockUI.instances.get('myBlockUI');

    //  // Start blocking the element.
    //  myBlockUi.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "DeleteSelfie", { 'Selfie': selfie })
    //    .success(function (data, status, headers, config) {


    //      //fetsh message data  from databae
    //      $http.post($scope.URL + "FetchSelfieByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    //   .success(function (data, status, headers, config) {

    //     $scope.isAdd = true;

    //     vm.totalItems = data.TotalCount;
    //     var fillData = [{}];

    //     for (var i = 0; i < data.Data.length; i++) {
    //       fillData.push({
    //         "AttractionId": data.Data[i].AttractionId,
    //         "Id": data.Data[i].Id,
    //         "NameAr": data.Data[i].NameAr,
    //         "NameFr": data.Data[i].NameFr,
    //         "NameIta": data.Data[i].NameIta,
    //         "NameRu": data.Data[i].NameRu,
    //         "NameGe": data.Data[i].NameGe,
    //         "NameEn": data.Data[i].NameEn,
    //         "ImageUrl": data.Data[i].ImageUrl
    //       });
    //     }
    //     fillData = fillData.slice(1);
    //     vm.SelfieData = fillData;
    //     cfpLoadingBar.complete();

    //     myBlockUi.stop();
    //   });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.SelfieData.indexOf(selfie);
    //      vm.SelfieData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  vm.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchSelfieByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "AttractionNameEn": data.Data[i].AttractionNameEn,
          "Id": data.Data[i].Id,
          "NameAr": data.Data[i].NameAr,
          "NameFr": data.Data[i].NameFr,
          "NameIta": data.Data[i].NameIta,
          "NameRu": data.Data[i].NameRu,
          "NameGe": data.Data[i].NameGe,
          "NameEn": data.Data[i].NameEn,
          "ImageUrl": data.Data[i].ImageUrl
        });
      }
      fillData = fillData.slice(1);
      vm.SelfieData = fillData;
      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );

  };


  function clearControl() {
    $scope.current = {};
    $scope.attractionmodel = '';
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  }
  $scope.Reset = function () {

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  };
});
