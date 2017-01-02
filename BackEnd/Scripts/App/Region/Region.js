var app = angular.module('regionapp', []);
app.controller('RegionController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {

  $scope.IsHidden = true;
  $scope.ShowHide = function () {

    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();

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

  //$scope.uploadPic = function (file) {
  function uploadPic(file) {
    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/Region/UploadHandler.ashx',
      url: $scope.MainURL + 'Api/Images/',
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
          swal({ title: "Error!", text: "region image not uploaded", type: "error", timer: 2000, showConfirmButton: false });
          return;
        }

        //vm.image = response.data;
        //$scope.images = response.data;


      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
  function uploadPicSave(file, region) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',

      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;


        if (response.data.Success == true) {
          saveImage(region, response.data.FileId);

          notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(region);
          swal({ title: "Error!", text: "region image  not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  //fetsh message data  from databae 

  $http.post($scope.URL + "FetchRegionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
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
    vm.regionData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );



  $scope.create = function (region, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    region.NameAr = $scope.current.NameAr;
    region.NameFr = $scope.current.NameFr;
    region.NameIta = $scope.current.NameIta;
    region.NameRu = $scope.current.NameRu;
    region.NameGe = $scope.current.NameGe;
    region.NameEn = $scope.current.NameEn;
    region.ImageUrl = $scope.current.ImageUrl;

    $http.post($scope.URL + "Createregion", { 'region': region })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {
          cfpLoadingBar.complete();
          myBlockUi.stop();
          swal({ title: "Error!", text: "Region name already exist!", type: "error", timer: 2000 });

        }
        if (data == "Done") {
          uploadPicSave(picFile, data);
          cfpLoadingBar.complete();
          clearControl();

          myBlockUi.stop();
        }
        clearControl();


      });
  };

  $scope.edit = function (region) {
    $scope.current = region;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (region, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    if (picFile != null) {
      uploadPic(picFile);

    }

    region.Id = $scope.current.Id;
    region.NameAr = $scope.current.NameAr;
    region.NameFr = $scope.current.NameFr;
    region.NameIta = $scope.current.NameIta;
    region.NameRu = $scope.current.NameRu;
    region.NameGe = $scope.current.NameGe;
    region.NameEn = $scope.current.NameEn;
    region.ImageUrl = $scope.current.ImageUrl;

    $http.post($scope.URL + "Updateregion", { 'region': region })
      .success(function (data, status, headers, config) {
        //if (data == "Exist") {

        //  cfpLoadingBar.complete();

        //  myBlockUi.stop();
        //  swal({ title: "Error!", text: "Region name already exist!", type: "error", timer: 2000 });

        //}
        //if (data == "Done") {
          cfpLoadingBar.complete();

          myBlockUi.stop();
      clearControl();
          $http.post($scope.URL + "FetchRegionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
          .success(function (data, status, headers, config) {
            vm.totalItems = data.TotalCount;
            var fillData = [{}];

            for (var i = 0; i < data.Data.length; i++) {
              fillData.push({
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
            vm.regionData = fillData;
            cfpLoadingBar.complete();
          })
          .error(function (data, status, headers, config) {
            swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

          }
          );
      //  }

      });
  };

  function updateImage(region, image) {

    region.Id = $scope.current.Id;
    region.NameAr = $scope.current.NameAr;
    region.NameFr = $scope.current.NameFr;
    region.NameIta = $scope.current.NameIta;
    region.NameRu = $scope.current.NameRu;
    region.NameGe = $scope.current.NameGe;
    region.NameEn = $scope.current.NameEn;
    region.ImageUrl = image;

    $http.post($scope.URL + "Updateregion", { 'region': region })
      .success(function (data, status, headers, config) {

      });
  };
  function saveImage(region, image) {

    region.Id = region.Id;
    region.NameAr = region.NameAr;
    region.NameFr = region.NameFr;
    region.NameIta = region.NameIta;
    region.NameRu = region.NameRu;
    region.NameGe = region.NameGe;
    region.NameEn = region.NameEn;
    region.ImageUrl = image;

    $http.post($scope.URL + "Updateregion", { 'region': region })
      .success(function (data, status, headers, config) {


        //fetsh message data  from databae
        $http.post($scope.URL + "FetchRegionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {


       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
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
       vm.regionData = fillData;
       cfpLoadingBar.complete();

       // notify("Recored Saved Successfully");
     });
      });
  };
  $scope.remove = function (region) {
    swal({
      title: "Are you sure you want to delete the region ?",
      text: region.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
   function (isConfirmAtt) {
     if (isConfirmAtt) {
       
       $http.post($scope.URL + "Deleteregion", { 'region': region })
         .success(function (data, status, headers, config) {
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


           //fetsh message data  from databae
           $http.post($scope.URL + "FetchRegionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
        .success(function (data, status, headers, config) {


          vm.totalItems = data.TotalCount;
          var fillData = [{}];

          for (var i = 0; i < data.Data.length; i++) {
            fillData.push({
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
          vm.regionData = fillData;
          cfpLoadingBar.complete();

          myBlockUi.stop();
        });
           notify("Recored Deleted Successfully");

           var index = vm.regionData.indexOf(region);
           vm.regionData.splice(index, 1);

         });

     }
   });
    //var delConfirm = confirm("Are you sure you want to delete the region " + region.NameEn + " ?");
    //if (delConfirm == true) {
    //  // Get the reference to the block service.
    //  var myBlockUi = blockUI.instances.get('myBlockUI');

    //  // Start blocking the element.
    //  myBlockUi.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "Deleteregion", { 'region': region })
    //    .success(function (data, status, headers, config) {


    //      //fetsh message data  from databae
    //      $http.post($scope.URL + "FetchRegionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    //   .success(function (data, status, headers, config) {


    //     vm.totalItems = data.TotalCount;
    //     var fillData = [{}];

    //     for (var i = 0; i < data.Data.length; i++) {
    //       fillData.push({
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
    //     vm.regionData = fillData;
    //     cfpLoadingBar.complete();

    //     myBlockUi.stop();
    //   });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.regionData.indexOf(region);
    //      vm.regionData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  vm.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchRegionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
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
      vm.regionData = fillData;
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
