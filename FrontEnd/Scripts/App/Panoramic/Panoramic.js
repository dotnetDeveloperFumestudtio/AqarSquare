var app = angular.module('Panoramicapp', []);
app.controller('PanoramicController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {


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
      $scope.attractions = dsg.data;
      $scope.attractiondata = dsg.data;

    }, function (dsg) {
      $("#alertModal").modal('show');
      $scope.msg = "Error in filling designation drop down !";
    });
  }

  $scope.GetValue = function (att) {
    var fruitId = $scope.attractionListModel;
    var fruitName = $.grep($scope.attractions, function (att) {
      return att.Id == fruitId;
    })[0].AttractionNameEn;
    attractionSelectedId = fruitId;
    //alert("Selected Value: " + fruitId + "\nSelected Text: " + fruitName);
  }


  $scope.IsHidden = true;
  $scope.ShowHide = function () {

    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();
  fetshData();
  cfpLoadingBar.complete();


  function uploadPic(file) {
    file.upload = Upload.upload({
      //  url: $scope.MainURL + 'Scripts/App/Panoramic/UploadHandler.ashx',
      url: $scope.MainURL + 'Api/Images/',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          updateImage($scope.current, response.data.FileId);


          // notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "Panoramic image not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadPic1(file1) {
    file1.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/Panoramic/UploadHandler1.ashx',
      data: { file: file1 }
    });

    file1.upload.then(function (response) {
      $timeout(function () {
        file1.result = response.data;


        if (response.data.Success == true) {
          updateImage1($scope.current, response.data.FileId);

          notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "Panoramic image not uploaded", type: "error", timer: 2000, showConfirmButton: false });
          return;
        }

      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file1.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
  function uploadPicSave(file, panoramic) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      //url: $scope.MainURL + 'Scripts/App/Panoramic/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          saveImage(panoramic, response.data.FileId);

          notify("Recored Saved Successfully");
          blockUI.stop();
          cfpLoadingBar.complete();
        } else {
          $scope.removeRecordWithoutImage(panoramic);
          swal({ title: "Error!", text: "image not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadPicSave1(file, panoramic) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/Panoramic/UploadHandler1.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;


        if (response.data.Success == true) {
          saveImage1(panoramic, response.data.FileId);

          // notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(panoramic);
          swal({ title: "Error!", text: "Panoramic image not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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


  $scope.create = function (panoramic, picFile, picFile1) {
   
    var attd = $scope.attractionmodel.map(function (a) { return a.id; });
    if (attd.length == 0) {
      blockUI.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 attraction", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    $scope.attractionSelectedId = parseInt(attd);

    // Start blocking the element.
    blockUI.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    panoramic.AttractionId = $scope.attractionSelectedId;
    panoramic.NameAr = $scope.current.NameAr;
    panoramic.NameFr = $scope.current.NameFr;
    panoramic.NameIta = $scope.current.NameIta;
    panoramic.NameRu = $scope.current.NameRu;
    panoramic.NameGe = $scope.current.NameGe;
    panoramic.NameEn = $scope.current.NameEn;
    panoramic.ImageUrl = $scope.current.ImageUrl;

    $http.post($scope.URL + "CreatePanoramic", { 'Panoramic': panoramic })
      .success(function (data, status, headers, config) {
        if (data == null) {
          notify("Error,Recored Saved Fail");

        } else {
          if (picFile != null) {
            uploadPicSave(picFile, data);

          }
          if (picFile1 != null) {
            uploadPicSave1(picFile1, data);

          }
          fetshData();

       //   notify("Recored Saved Successfully");
        }
        //blockUI.stop();
        //cfpLoadingBar.complete();
      });
  };

  $scope.edit = function (panoramic) {
    var attId = parseInt(panoramic.AttractionId);
    $scope.attractionmodel = [{ id: attId }];

    $scope.current = panoramic;
    $scope.isUpdate = true;
    $scope.isCreate = false;
    // $scope.currentCommand = $scope.attractions[panoramic.AttractionId];
  };
  $scope.update = function (panoramic, picFile, picFile1) {

    var attd = $scope.attractionmodel.map(function (a) { return a.id; });
    $scope.attractionSelectedId = parseInt(attd);

   
    // Start blocking the element.
    blockUI.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    if (picFile != null) {
      uploadPic(picFile);
    }

    if (picFile1 != null) {
      uploadPic1(picFile1);
    }

    panoramic.Id = $scope.current.Id;
    panoramic.AttractionId = $scope.attractionSelectedId;
    panoramic.NameAr = $scope.current.NameAr;
    panoramic.NameFr = $scope.current.NameFr;
    panoramic.NameIta = $scope.current.NameIta;
    panoramic.NameRu = $scope.current.NameRu;
    panoramic.NameGe = $scope.current.NameGe;
    panoramic.NameEn = $scope.current.NameEn;
    panoramic.ImageUrl = $scope.current.ImageUrl;
    panoramic.Image1 = $scope.current.Image1;

    $http.post($scope.URL + "UpdatePanoramic", { 'Panoramic': panoramic })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        fetshData();
        cfpLoadingBar.complete();

        blockUI.stop();
        //  notify("Recored Updated Successfully");
    
    });
  };

  function updateImage(panoramic, image) {

    panoramic.Id = $scope.current.Id;
    panoramic.NameAr = $scope.current.NameAr;
    panoramic.NameFr = $scope.current.NameFr;
    panoramic.NameIta = $scope.current.NameIta;
    panoramic.NameRu = $scope.current.NameRu;
    panoramic.NameGe = $scope.current.NameGe;
    panoramic.NameEn = $scope.current.NameEn;
    panoramic.ImageUrl = image;

    $http.post($scope.URL + "UpdatePanoramic", { 'Panoramic': panoramic })
      .success(function (data, status, headers, config) {
        fetshData();

      });
  };
  function updateImage1(panoramic, image1) {

    panoramic.Id = $scope.current.Id;
    panoramic.NameAr = $scope.current.NameAr;
    panoramic.NameFr = $scope.current.NameFr;
    panoramic.NameIta = $scope.current.NameIta;
    panoramic.NameRu = $scope.current.NameRu;
    panoramic.NameGe = $scope.current.NameGe;
    panoramic.NameEn = $scope.current.NameEn;
    panoramic.Image1 = image1;

    $http.post($scope.URL + "UpdatePanoramic", { 'Panoramic': panoramic })
      .success(function (data, status, headers, config) {
        fetshData();

      });
  };
  function saveImage(panoramic, image) {

    panoramic.Id = panoramic.Id;
    panoramic.NameAr = panoramic.NameAr;
    panoramic.NameFr = panoramic.NameFr;
    panoramic.NameIta = panoramic.NameIta;
    panoramic.NameRu = panoramic.NameRu;
    panoramic.NameGe = panoramic.NameGe;
    panoramic.NameEn = panoramic.NameEn;
    panoramic.ImageUrl = image;

    $http.post($scope.URL + "UpdatePanoramic", { 'Panoramic': panoramic })
      .success(function (data, status, headers, config) {
        fetshData();

      });
  };
  function saveImage1(panoramic, image1) {

    panoramic.Id = panoramic.Id;
    panoramic.NameAr = panoramic.NameAr;
    panoramic.NameFr = panoramic.NameFr;
    panoramic.NameIta = panoramic.NameIta;
    panoramic.NameRu = panoramic.NameRu;
    panoramic.NameGe = panoramic.NameGe;
    panoramic.NameEn = panoramic.NameEn;
    panoramic.Image1 = image1;

    $http.post($scope.URL + "UpdatePanoramic", { 'Panoramic': panoramic })
      .success(function (data, status, headers, config) {

        fetshData();

      });
  };

  $scope.remove = function (panoramic) {

    swal({
      title: "Are you sure you want to delete the Panoramic ?",
      text: panoramic.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
  function (isConfirmAtt) {
    if (isConfirmAtt) {
     
      // Start blocking the element.
      blockUI.start({
        message: 'Wait Please ...'
      });
      cfpLoadingBar.start();
      $http.post($scope.URL + "DeletePanoramic", { 'Panoramic': panoramic })
        .success(function (data, status, headers, config) {
          swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

          vm.current = {};
          $scope.current = {};
          $scope.isAdd = true;
          vm.totalItems = data.TotalCount;

          fetshData();
          cfpLoadingBar.complete();

          blockUI.stop();
          notify("Recored Deleted Successfully");

          var index = vm.PanoramicData.indexOf(panoramic);
          vm.PanoramicData.splice(index, 1);

        });



    }
  });

    //var delConfirm = confirm("Are you sure you want to delete the Panoramic " + panoramic.NameEn + " ?");
    //if (delConfirm == true) {
    //  // Get the reference to the block service.
    //  var blockUI = blockUI.instances.get('blockUI');

    //  // Start blocking the element.
    //  blockUI.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "DeletePanoramic", { 'Panoramic': panoramic })
    //    .success(function (data, status, headers, config) {

    //      vm.current = {};
    //      $scope.current = {};
    //      $scope.isAdd = true;
    //      vm.totalItems = data.TotalCount;

    //      fetshData();
    //      cfpLoadingBar.complete();

    //      blockUI.stop();
    //      notify("Recored Deleted Successfully");

    //      var index = vm.PanoramicData.indexOf(panoramic);
    //      vm.PanoramicData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };


  $scope.removeRecordWithoutImage = function (object3D) {


    $http.post($scope.URL + "DeleteObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });


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

  function fetshData() {
  //  $scope.Reset();
    $http.post($scope.URL + "FetchPanoramicByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
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
          "ImageUrl": data.Data[i].ImageUrl,
          "Image1": data.Data[i].Image1
        });
      }
      fillData = fillData.slice(1);
      vm.PanoramicData = fillData;
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );
  }
});

