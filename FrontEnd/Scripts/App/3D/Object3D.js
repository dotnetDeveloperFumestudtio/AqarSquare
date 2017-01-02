var app = angular.module('Object3Dapp', []);
app.controller('Object3DController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {

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
  $scope.guid = "";

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
      $scope.msg = "Error in filling designation drop down !";
    });
  }

  $scope.GetValue = function (att) {
    var fruitId = $scope.attractionListModel;
    var fruitName = $.grep($scope.attractions, function (att) {
      return att.Id == fruitId;
    })[0].AttractionNameEn;
    attractionSelectedId = fruitId;
    alert("Selected Value: " + fruitId + "\nSelected Text: " + fruitName);
  }

  $scope.IsHidden = true;
  $scope.ShowHide = function () {

    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

  //fetsh message data  from databae 
  fetshData();

  $scope.create = function (object3D, picFile, mtlfile, txturefile, androidModelFile, iOsModelFile, windowsfile) {
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

    object3D.AttractionId = $scope.attractionSelectedId;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    object3D.ImageUrl = $scope.current.ImageUrl;

    $http.post($scope.URL + "CreateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {

        uploadPicSave(picFile, data);
        uploadmtlSave(mtlfile, data);
        uploadTextureSave(txturefile, data);
        uploadandroidModelSave(androidModelFile, data);
        uploadIosModelSave(iOsModelFile, data);
        uploadwindowsModelSave(windowsfile, data);
        myBlockUi.stop();
        clearControl();

      });
  };

  $scope.edit = function (object3D) {

    var attId = parseInt(object3D.AttractionId);
    $scope.attractionmodel = [{ id: attId }];
    $scope.current = object3D;
    $scope.isUpdate = true;
    $scope.isCreate = false;
    $scope.currentCommand = $scope.attractions[object3D.AttractionId];
  };
  $scope.update = function (object3D, picFile, mtlfile, txturefile, androidModelFile, iOsModelFile, windowsfile) {
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


    object3D.Id = $scope.current.Id;
    object3D.AttractionId = $scope.attractionSelectedId;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    //object3D.ImageUrl = $scope.current.ImageUrl;
    //object3D.FileUrl = $scope.current.FileUrl;
    if (picFile != null) {
      uploadPic(picFile);
    }
    if (mtlfile != null) {
      uploadMtl(mtlfile);
    }
    if (iOsModelFile != null) {
      uploadIosModel(iOsModelFile);
    }
    if (txturefile != null) {
      uploadTexture(txturefile);
    }
    if (androidModelFile != null) {
      uploadandroidModel(androidModelFile);
    }
    if (windowsfile != null) {
      uploadwindowsModel(windowsfile);
    }

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
        myBlockUi.stop();
      });
  };

  ///////////////////////////image/////////////////////////////

  function uploadPic(file) {
    file.upload = Upload.upload({
      //  url: $scope.MainURL + 'Scripts/App/3D/UploadHandler.ashx',
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
          swal({ title: "Error!", text: "3D object not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadPicSave(file, object3D) {
    file.upload = Upload.upload({
      //  url: $scope.MainURL + 'Scripts/App/3D/UploadHandler.ashx',
      url: $scope.MainURL + 'Api/Images/',

      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        if (response.data.Success == true) {
          saveImage(object3D, response.data.FileId);
          //   notify("Recored Saved Successfully"); 

        } else {
          $scope.removeRecordWithoutImage(object3D);
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
  function updateImage(object3D, image) {

    object3D.Id = $scope.current.Id;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    object3D.ImageUrl = image;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };
  function saveImage(object3D, image) {

    object3D.Id = object3D.Id;
    object3D.NameAr = object3D.NameAr;
    object3D.NameFr = object3D.NameFr;
    object3D.NameIta = object3D.NameIta;
    object3D.NameRu = object3D.NameRu;
    object3D.NameGe = object3D.NameGe;
    object3D.NameEn = object3D.NameEn;
    object3D.ImageUrl = image;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };

  ///////////////////////////Material/////////////////////////////

  function uploadMtl(file1) {
    file1.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      data: { file: file1 }
    });

    file1.upload.then(function (response) {
      $timeout(function () {
        file1.result = response.data;

        if (response.data.Success == true) {
          updateMtlFile($scope.current, response.data.FileId);

          notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "3D object not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadmtlSave(file, object3D) {
    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      url: $scope.MainURL + 'Api/Images/',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          saveMtlFile(object3D, response.data.FileId);

          // notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(object3D);
          swal({ title: "Error!", text: "3D object not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function saveMtlFile(object3D, material) {

    object3D.Id = object3D.Id;
    object3D.NameAr = object3D.NameAr;
    object3D.NameFr = object3D.NameFr;
    object3D.NameIta = object3D.NameIta;
    object3D.NameRu = object3D.NameRu;
    object3D.NameGe = object3D.NameGe;
    object3D.NameEn = object3D.NameEn;
    object3D.Material = material;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };
  function updateMtlFile(object3D, material) {

    object3D.Id = $scope.current.Id;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    object3D.Material = material;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };

  ///////////////////////////texture/////////////////////////////

  function uploadTexture(file1) {
    file1.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      data: { file: file1 }
    });

    file1.upload.then(function (response) {
      $timeout(function () {
        file1.result = response.data;

        if (response.data.Success == true) {
          updateTextureFile($scope.current, response.data.FileId);

          // notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "Texture not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadTextureSave(file, object3D) {
    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      url: $scope.MainURL + 'Api/Images/',

      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          saveTextureFile(object3D, response.data.FileId);
          $scope.errorMsg = response.status + ': ' + response.data;

          // notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(object3D);
          swal({ title: "Error!", text: "Texture not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function saveTextureFile(object3D, texture) {

    object3D.Id = object3D.Id;
    object3D.NameAr = object3D.NameAr;
    object3D.NameFr = object3D.NameFr;
    object3D.NameIta = object3D.NameIta;
    object3D.NameRu = object3D.NameRu;
    object3D.NameGe = object3D.NameGe;
    object3D.NameEn = object3D.NameEn;
    object3D.Texture = texture;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };
  function updateTextureFile(object3D, texture) {

    object3D.Id = $scope.current.Id;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    object3D.Texture = texture;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };

  ///////////////////////////Ios model/////////////////////////////

  function uploadIosModel(file1) {
    file1.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      data: { file: file1 }
    });

    file1.upload.then(function (response) {
      $timeout(function () {
        file1.result = response.data;

        if (response.data.Success == true) {
          updateIosModelFile($scope.current, response.data.FileId);

          //   notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "IosModel not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadIosModelSave(file, object3D) {
    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      url: $scope.MainURL + 'Api/Images/',

      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          saveIosModelFile(object3D, response.data.FileId);
          // notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(object3D);
          swal({ title: "Error!", text: "IosModel not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function saveIosModelFile(object3D, iosModel) {

    object3D.Id = object3D.Id;
    object3D.NameAr = object3D.NameAr;
    object3D.NameFr = object3D.NameFr;
    object3D.NameIta = object3D.NameIta;
    object3D.NameRu = object3D.NameRu;
    object3D.NameGe = object3D.NameGe;
    object3D.NameEn = object3D.NameEn;
    object3D.ObjIos = iosModel;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };
  function updateIosModelFile(object3D, iosModel) {

    object3D.Id = $scope.current.Id;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    object3D.ObjIos = iosModel;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };

  ///////////////////////////android model/////////////////////////////

  function uploadandroidModel(file1) {
    file1.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      data: { file: file1 }
    });

    file1.upload.then(function (response) {
      $timeout(function () {
        file1.result = response.data;

        if (response.data.Success == true) {
          updateandroidModelFile($scope.current, response.data.FileId);

          // notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "androidModel not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadandroidModelSave(file, object3D) {
    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      url: $scope.MainURL + 'Api/Images/',

      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          saveandroidModelFile(object3D, response.data.FileId);

          // notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(object3D);
          swal({ title: "Error!", text: "androidModel not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function saveandroidModelFile(object3D, androidModel) {

    object3D.Id = object3D.Id;
    object3D.NameAr = object3D.NameAr;
    object3D.NameFr = object3D.NameFr;
    object3D.NameIta = object3D.NameIta;
    object3D.NameRu = object3D.NameRu;
    object3D.NameGe = object3D.NameGe;
    object3D.NameEn = object3D.NameEn;
    object3D.ObjAndroid = androidModel;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };
  function updateandroidModelFile(object3D, androidModel) {

    object3D.Id = $scope.current.Id;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    object3D.ObjAndroid = androidModel;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };

  ///////////////////////////widows model/////////////////////////////

  function uploadwindowsModel(file1) {
    file1.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',
      // url: $scope.MainURL + 'Scripts/App/3D/UploadHandler1.ashx',
      data: { file: file1 }
    });

    file1.upload.then(function (response) {
      $timeout(function () {
        file1.result = response.data;

        if (response.data.Success == true) {
          updatewindowsModelFile($scope.current, response.data.FileId);

          //  notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage($scope.current);
          swal({ title: "Error!", text: "windowsModel not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadwindowsModelSave(file, object3D) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',

      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          savewindowsModelFile(object3D, response.data.FileId);
          $scope.errorMsg = response.status + ': ' + response.data;

          notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(object3D);
          swal({ title: "Error!", text: "windowsModel not uploaded", type: "error", timer: 2000, showConfirmButton: false });
          return;
        }


      });
    }, function (response) {
      console.log(response);
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
  function savewindowsModelFile(object3D, windowsModel) {

    object3D.Id = object3D.Id;
    object3D.NameAr = object3D.NameAr;
    object3D.NameFr = object3D.NameFr;
    object3D.NameIta = object3D.NameIta;
    object3D.NameRu = object3D.NameRu;
    object3D.NameGe = object3D.NameGe;
    object3D.NameEn = object3D.NameEn;
    object3D.ObjWindows = windowsModel;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };
  function updatewindowsModelFile(object3D, windowsModel) {

    object3D.Id = $scope.current.Id;
    object3D.NameAr = $scope.current.NameAr;
    object3D.NameFr = $scope.current.NameFr;
    object3D.NameIta = $scope.current.NameIta;
    object3D.NameRu = $scope.current.NameRu;
    object3D.NameGe = $scope.current.NameGe;
    object3D.NameEn = $scope.current.NameEn;
    object3D.ObjWindows = windowsModel;

    $http.post($scope.URL + "UpdateObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();
      });
  };


  function fetshData() {
    $http.post($scope.URL + "FetchObject3DByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
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
        "ObjIos": data.Data[i].ObjIos,
        "ObjAndroid": data.Data[i].ObjAndroid,
        "ObjWindows": data.Data[i].ObjWindows,
        "Material": data.Data[i].Material,
        "Texture": data.Data[i].Texture
      });
    }
    fillData = fillData.slice(1);
    vm.Object3DData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );
  }


  $scope.removeRecordWithoutImage = function (object3D) {


    $http.post($scope.URL + "DeleteObject3D", { 'Object3D': object3D })
      .success(function (data, status, headers, config) {
        fetshData();

      });


  };
  $scope.remove = function (object3D) {

    swal({
      title: "Are you sure you want to delete the ?",
      text: object3D.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         $http.post($scope.URL + "DeleteObject3D", { 'Object3D': object3D })

             .success(function (data, status, headers, config) {
               fetshData();

             });
         notify("Recored Deleted Successfully");

         swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

       }
     });


    //var delConfirm = confirm("Are you sure you want to delete the  " + object3D.NameEn + " ?");
    //if (delConfirm == true) { 
    //  var myBlockUi = blockUI.instances.get('myBlockUI');

    //  // Start blocking the element.
    //  myBlockUi.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "DeleteObject3D", { 'Object3D': object3D })
    //    .success(function (data, status, headers, config) {


    //      //fetsh message data  from databae
    //      $http.post($scope.URL + "FetchObject3DByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    //   .success(function (data, status, headers, config) {

    //     $scope.isAdd = true;

    //     vm.totalItems = data.TotalCount;
    //     var fillData = [{}];

    //     for (var i = 0; i < data.Data.length; i++) {
    //       fillData.push({
    //         "AttractionId": data.Data[i].AttractionId,
    //         "AttractionNameEn": data.Data[i].AttractionNameEn,
    //         "Id": data.Data[i].Id,
    //         "NameAr": data.Data[i].NameAr,
    //         "NameFr": data.Data[i].NameFr,
    //         "NameIta": data.Data[i].NameIta,
    //         "NameRu": data.Data[i].NameRu,
    //         "NameGe": data.Data[i].NameGe,
    //         "NameEn": data.Data[i].NameEn,
    //         "ImageUrl": data.Data[i].ImageUrl,
    //         "FileUrl": data.Data[i].FileUrl
    //       });
    //     }
    //     fillData = fillData.slice(1);
    //     vm.Object3DData = fillData;
    //     cfpLoadingBar.complete();

    //     myBlockUi.stop();
    //   });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.Object3DData.indexOf(object3D);
    //      vm.Object3DData.splice(index, 1);

    //    });
    //}

    $scope.isUpdate = false;
    $scope.isCreate = true;
  };
  vm.pageChanged = function () {
    //fetsh message data  from databae 

    fetshData();


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

