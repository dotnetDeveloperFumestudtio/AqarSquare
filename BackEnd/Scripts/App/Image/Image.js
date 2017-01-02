var app = angular.module('Imageapp', []);
app.controller('ImageController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {


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


  cfpLoadingBar.start();
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

  function uploadPicSave(file, image) {
    file.upload = Upload.upload({
      //   url: $scope.MainURL + 'Scripts/App/Image/UploadHandler.ashx/ProcessRequestData',
      url: $scope.MainURL + 'Api/Images/',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        if (response.data.Success == true) {
          saveImage(image, response.data.FileId);

          notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(image);
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
  //fetsh message data  from databae 

  function updateImage(region, image) {

    region.Id = $scope.current.Id;
    region.NameAr = $scope.current.NameAr;
    region.NameFr = $scope.current.NameFr;
    region.NameIta = $scope.current.NameIta;
    region.NameRu = $scope.current.NameRu;
    region.NameGe = $scope.current.NameGe;
    region.NameEn = $scope.current.NameEn;
    region.ImageUrl = image;

    $http.post($scope.URL + "UpdateImage", { 'image': image })
  .success(function (data, status, headers, config) {

  });
  };
  function saveImage(imageObj, image) {

    //  Image.Id = imageObj.Id;
    imageObj.ImageUrl = image;
    // imageObj.Data = image;
    $http.post($scope.URL + "UpdateImage", { 'Image': imageObj })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          notify("Error,Recored Saved Fail");

        }
        else {
          //  notify("Recored Saved Successfully");

        }
        fetchData();

      });
  };

  fetchData();


  $scope.create = function (image, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    image.Status = $scope.current.Status;
    image.ImageUrl = $scope.current.ImageUrl;
    image.NameAr = $scope.current.NameAr;
    image.NameFr = $scope.current.NameFr;
    image.NameIta = $scope.current.NameIta;
    image.NameRu = $scope.current.NameRu;
    image.NameGe = $scope.current.NameGe;
    image.NameEn = $scope.current.NameEn;

    $http.post($scope.URL + "CreateImage", { 'Image': image })
      .success(function (data, status, headers, config) {

        uploadPicSave(picFile, data);
        myBlockUi.stop();

      });
  };
  $scope.edit = function (image) {
    $scope.current = image;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.updateImageStatus = function (image) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    //Image.Id = imageId;
    //Image.Status = imageStatus;
    $http.post($scope.URL + "UpdateImageStatus", { 'Image': image })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          fetchData();
          myBlockUi.stop(); notify("Error,Recored Updated Fail");

        }
        else {

          fetchData();
          myBlockUi.stop();
          notify("Recored Updated Successfully");
        }
      });
  };
  $scope.update = function (image, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    if (picFile != null) uploadPic(picFile);

    image.Id = $scope.current.Id;
    image.NameAr = $scope.current.NameAr;
    image.NameFr = $scope.current.NameFr;
    image.NameIta = $scope.current.NameIta;
    image.NameRu = $scope.current.NameRu;
    image.NameGe = $scope.current.NameGe;
    image.NameEn = $scope.current.NameEn;
    image.ImageUrl = $scope.current.ImageUrl;
    image.Status = $scope.current.Status;

    $http.post($scope.URL + "UpdateImage", { 'image': image })
      .success(function (data, status, headers, config) {
        cfpLoadingBar.complete();

        myBlockUi.stop();
        notify("Recored Updated Successfully");

        myBlockUi.stop();


      });
  };


  $scope.remove = function (image) {
    swal({
      title: "Are you sure you want to delete this Image ?",
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
       $http.post($scope.URL + "DeleteImage", { 'Image': image })
         .success(function (data, status, headers, config) {
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

           //fetsh message data  from databae
           myBlockUi.stop();
           fetchData();
           notify("Recored Deleted Successfully");

           var index = vm.ImageData.indexOf(image);
           vm.ImageData.splice(index, 1);

         });


     }
   });


    //var delConfirm = confirm("Are you sure you want to delete this Image ?");
    //if (delConfirm == true) {
    //  // Get the reference to the block service.
    //  var myBlockUi = blockUI.instances.get('myBlockUI');

    //  // Start blocking the element.
    //  myBlockUi.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "DeleteImage", { 'Image': image })
    //    .success(function (data, status, headers, config) {

    //      //fetsh message data  from databae
    //      myBlockUi.stop();
    //      fetchData();
    //      notify("Recored Deleted Successfully");

    //      var index = vm.ImageData.indexOf(image);
    //      vm.ImageData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  $scope.removeRecordWithoutImage = function (image) {

    $http.post($scope.URL + "DeleteImage", { 'Image': image })

      .success(function (data, status, headers, config) {

        fetchData();

        var index = vm.ImageData.indexOf(image);
        vm.ImageData.splice(index, 1);

      });


  };

  vm.pageChanged = function () {
    //fetsh message data  from databae 

    fetchData();

  };

  $scope.Reset = function () {

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  };

  function fetchData() {

    $http.post($scope.URL + "FetchImageByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
   .success(function (data, status, headers, config) {
     vm.totalItems = data.TotalCount;
     var fillData = [{}];

     for (var i = 0; i < data.Data.length; i++) {
       fillData.push({
         "Id": data.Data[i].Id,
         "Status": data.Data[i].Status,
         "ImageUrl": data.Data[i].ImageUrl,
         "NameAr": data.Data[i].NameAr,
         "NameFr": data.Data[i].NameFr,
         "NameIta": data.Data[i].NameIta,
         "NameRu": data.Data[i].NameRu,
         "NameGe": data.Data[i].NameGe,
         "NameEn": data.Data[i].NameEn,
       });
     }
     fillData = fillData.slice(1);
     vm.ImageData = fillData;
     cfpLoadingBar.complete();
   })
   .error(function (data, status, headers, config) {
     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

   }
   );
  }
});
