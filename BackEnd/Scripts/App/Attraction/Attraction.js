var app = angular.module('Attractionapp', []);
app.controller('AttractionController', function ($scope, $http, notify, blockUI, Upload, cfpLoadingBar, $timeout, $location) {
  $scope.showExcel = function () {
    $scope.divuploadexcel = true;
    $scope.showUploader = false;

  }

  $scope.uploadExcel = function (file) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });

    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/Attraction/UploadHandler.ashx',
      url: $scope.MainURL + 'Api/Excel/',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        console.log(file.result.FileId);
        $http.post($scope.URL + "UploadExcel", { 'file': file.result.FileId })
        .success(function (data, status, headers, config) {
          if (data == "Error") {
            notify("faild,please check your excel file ");
          }
          if (data == "Done") {
            fetchData();
            notify("File Uploaded Successfuly");
          }
          $scope.divuploadexcel = false;
          $scope.showUploader = true;
          myBlockUi.stop();
        });
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

  $scope.uploadPic = function (file) {
    console.log($scope.current);

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      //url: $scope.MainURL + 'Scripts/App/Attraction/UploadHandlerPic.ashx',
      url: $scope.MainURL + 'Api/Images/',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        console.log(file.result.FileId);
        $http.post($scope.URL + "UpdateAttractionImage", { 'attraction': $scope.current, 'image': file.result.FileId })
        .success(function (data, status, headers, config) {
          fetchData();
          $scope.divuploadmedia = false;
          myBlockUi.stop();
          $scope.view($scope.current);
          notify("File Uploaded Successfuly");
          // clearControl();
        });
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

  $scope.uploadvideo = function (file) {
    console.log($scope.current);
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    file.upload = Upload.upload({
      //  url: $scope.MainURL + 'Scripts/App/Attraction/UploadHandlerPic.ashx',
      url: $scope.MainURL + 'Api/AudioAdmin/',

      data: { file: file },
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        $http.post($scope.URL + "UpdateAttractionVideo", { 'attraction': $scope.current, 'video': file.result.FileId })
        .success(function (data, status, headers, config) {
          fetchData();
          $scope.divuploadmedia = false;
          myBlockUi.stop();
          $scope.view($scope.current);
          notify("File Uploaded Successfuly");
          clearControl();
        });
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }


  $scope.categorymodel = [];
  $scope.categorysettings = {
    displayProp: 'NameEn', idProp: 'Id', enableSearch: true, scrollableHeight: '300px',
    scrollable: true,
    smartButtonMaxItems: 3,
    smartButtonTextConverter: function (itemText, originalItem) {
      if (itemText === 'Jhon') {
        return 'Jhonny!';
      }

      return itemText;
    }
  };
  $scope.yourEvents = {
    onInitDone: function (item) {
      console.log(item);
    },
    onItemDeselect: function (item) {
      console.log(item);
    }
  };
  $scope.regionmodel = [];
  $scope.regionsettings = {
    displayProp: 'NameEn', idProp: 'Id', enableSearch: true, scrollableHeight: '300px',
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

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.searchText = "";
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;
  $scope.attDetails = false;
  $scope.regionListModel = "";
  $scope.regionSelectedId = "";
  $scope.categoryListModel = "";
  $scope.categorySelectedId = "";
  $scope.divuploadexcel = false;
  $scope.divuploadmedia = false;
  $scope.showUploader = true;
  $scope.AttractionInfomation = "";
  $scope.AttractionVideoInfomation = "";
  vm.AttractionData = "";

  //fetsh message data  from databae 
  fetchData();
  bindAttractions();
  bindRegions();
  bindcategory();

  $scope.create = function (attraction) {
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post($scope.URL + "IsAttractionNameAvailable", { 'Attraction': attraction })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {
          cfpLoadingBar.complete();
          myBlockUi.stop();
          swal({ title: "Error!", text: "Attraction name already exist!", type: "error", timer: 2000 });
          return;

        }
      });
    var catId = $scope.categorymodel.map(function (a) { return a.id; });
    var regId = $scope.regionmodel.map(function (a) { return a.id; });
    if (catId.length == 0 || regId.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 category and 1 region", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    if (regId.length > 1) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose just 1  region", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }

    var multiCat = "";
    if (catId.length > 1) {

      var max = 0;
      for (var i = 0; i < catId.length; i++) {
        max++;
        if (max == catId.length) {
          multiCat += catId[i];
        } else {
          multiCat += catId[i] + ",";
        }
      }
      $scope.categorySelectedId = multiCat;

    } else {

      $scope.categorySelectedId = parseInt(catId);
    }
    $scope.regionSelectedId = parseInt(regId);

    // Get the reference to the block service.

    attraction.CategoryId = $scope.categorySelectedId;
    attraction.RegionId = $scope.regionSelectedId;

    attraction.Longitude = $scope.current.Longitude;
    attraction.Latitude = $scope.current.Latitude;

    attraction.AttractionNameAr = $scope.current.AttractionNameAr;
    attraction.AttractionNameFr = $scope.current.AttractionNameFr;
    attraction.AttractionNameIta = $scope.current.AttractionNameIta;
    attraction.AttractionNameRu = $scope.current.AttractionNameRu;
    attraction.AttractionNameGe = $scope.current.AttractionNameGe;
    attraction.AttractionNameEn = $scope.current.AttractionNameEn;

    attraction.HistoricalInformationAr = $scope.current.HistoricalInformationAr;
    attraction.HistoricalInformationFr = $scope.current.HistoricalInformationFr;
    attraction.HistoricalInformationIta = $scope.current.HistoricalInformationIta;
    attraction.HistoricalInformationRu = $scope.current.HistoricalInformationRu;
    attraction.HistoricalInformationGe = $scope.current.HistoricalInformationGe;
    attraction.HistoricalInformationEn = $scope.current.HistoricalInformationEn;

    $http.post($scope.URL + "CreateAttraction", { 'Attraction': attraction })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        if (data == null) {
          notify("Error,Recored Saved Fail");

          fetchData();
        } else {
          fetchData();
          clearControl();

          myBlockUi.stop();
          notify(" Recored Saved Successfuly");
          //if (fileexcel != null) {

          //  uploadPicSave(fileexcel, data);
          //} else {

          //  fetchData();
          //  myBlockUi.stop();
          //  notify(" Recored Saved Successfuly");
          //}
        }
      });
  };


  function uploadPic(file) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/Attraction/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
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
  $scope.edit = function (attraction) {

    $scope.divuploadmedia = false;

    $scope.categoryList = [];
    var fillData = [];

    //for (var i = 0; i < attraction.CategoryId.length; i++) {
    //  fillData.push({

    //  });

    //  //fillData.push(attraction.CategoryId.charCodeAt(i));
    //}
    var cateId = parseInt(attraction.CategoryId);
    var regId = parseInt(attraction.RegionId);
    for (var i = 0; i < attraction.CategoryId.length; i++) {
      fillData.push({
        "Id": attraction.CategoryId[i],
      });
    }

    $scope.categorymodel = [{ id: cateId }];
    $scope.regionmodel = [{ id: regId }];
    // bindcategory();
    $scope.current = attraction;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (attraction) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    var catId = $scope.categorymodel.map(function (a) { return a.id; });
    var regId = $scope.regionmodel.map(function (a) { return a.id; });
    if (catId.length == 0 || regId.length == 0) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose at least 1 category and 1 region", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }
    if (regId.length > 1) {
      myBlockUi.stop();
      cfpLoadingBar.complete();
      swal({ title: "Error!", text: "must choose just 1  region", type: "error", timer: 2000, showConfirmButton: false });
      return;
    }


    var multiCat = "";
    if (catId.length > 1) {

      var max = 0;
      for (var i = 0; i < catId.length; i++) {
        max++;
        if (max == catId.length) {
          multiCat += catId[i];
        } else {
          multiCat += catId[i] + ",";
        }
      }
      $scope.categorySelectedId = multiCat;

    } else {

      $scope.categorySelectedId = parseInt(catId);
    }

    // $scope.categorySelectedId = parseInt(catId);
    $scope.regionSelectedId = parseInt(regId);

    attraction.Id = $scope.current.Id;

    attraction.CategoryId = $scope.categorySelectedId;
    attraction.RegionId = $scope.regionSelectedId;

    attraction.Longitude = $scope.current.Longitude;
    attraction.Latitude = $scope.current.Latitude;

    attraction.AttractionNameAr = $scope.current.AttractionNameAr;
    attraction.AttractionNameFr = $scope.current.AttractionNameFr;
    attraction.AttractionNameIta = $scope.current.AttractionNameIta;
    attraction.AttractionNameRu = $scope.current.AttractionNameRu;
    attraction.AttractionNameGe = $scope.current.AttractionNameGe;
    attraction.AttractionNameEn = $scope.current.AttractionNameEn;

    attraction.HistoricalInformationAr = $scope.current.HistoricalInformationAr;
    attraction.HistoricalInformationFr = $scope.current.HistoricalInformationFr;
    attraction.HistoricalInformationIta = $scope.current.HistoricalInformationIta;
    attraction.HistoricalInformationRu = $scope.current.HistoricalInformationRu;
    attraction.HistoricalInformationGe = $scope.current.HistoricalInformationGe;
    attraction.HistoricalInformationEn = $scope.current.HistoricalInformationEn;

    $http.post($scope.URL + "UpdateAttraction", { 'Attraction': attraction })
      .success(function (data, status, headers, config) {

        if (data == "Error") {
          notify("Error,Recored Update Fail");
          fetchData();
        } else {
          //if (fileexcel != null) {

          //  uploadPicSave(fileexcel, attraction);
          //} else {

          //  fetchData();
          //  notify(" Recored Updated Successfuly");
          //}
          fetchData();
          notify(" Recored Updated Successfuly");
        }
        clearControl();
        myBlockUi.stop();
        cfpLoadingBar.complete();


      });
  };

  $scope.remove = function (attraction) {
    swal({
      title: "Are you sure you want to delete the Attraction ",
      text: "" + attraction.AttractionNameEn + "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
  function (isConfirm) {
    if (isConfirm) {
      $http.post($scope.URL + "CheckDeleteAttraction", { 'Attraction': attraction, 'isDelete': "false" })
      .success(function (data, status, headers, config) {

        if (data == "NotHaveRelated") {
          $http.post($scope.URL + "DeleteAttraction", { 'Attraction': attraction, 'isDelete': "true" })
             .success(function (data, status, headers, config) {

               fetchData();
               notify("Recored Deleted Successfully");
               swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });
             });

          //fetchData();
          //notify("Recored Deleted Successfully");
          //swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });
        } else {
          swal({
            title: "Are you sure?",
            text: "this attraction have some related record !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
          },
         function (isConfirmAtt) {
           if (isConfirmAtt) {
             $http.post($scope.URL + "CheckDeleteAttraction", { 'Attraction': attraction, 'isDelete': "true" })
               .success(function (data, status, headers, config) {

                 fetchData();
                 notify("Recored Deleted Successfully");
                 swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });
               });

           }
         });
        }
      });
      $scope.isUpdate = false;
      $scope.isCreate = true;
    }
  });

    //var delConfirm = confirm("Are you sure you want to delete the Attraction " + attraction.EntityEn + " ?");
    //if (delConfirm == true) {
    //  $http.post($scope.URL + "DeleteAttraction", { 'Attraction': attraction })
    //    .success(function (data, status, headers, config) {


    //      $http.post($scope.URL + "FetchAttraction")
    //        .then(function (response) {
    //          vm.AttractionData = response.data;
    //        });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.AttractionData.indexOf(attraction);
    //      vm.AttractionData.splice(index, 1);

    //    });
    //}
    //$scope.isUpdate = false;
    //$scope.isCreate = true;
  };


  $scope.view = function (attraction) {
    //  console.log($scope.current);

    $scope.divuploadmedia = true;
    $scope.current = attraction;
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post($scope.URL + "GetAttractionDetailsById", { 'Attraction': attraction })
      .success(function (data, status, headers, config) {

        var fillData = [{}];

        for (var i = 0; i < data.Data.Image.length; i++) {
          fillData.push({
            "Id": data.Data.Image[i].Id,
            "Image": data.Data.Image[i].ImageUrl
          });
        }
        fillData = fillData.slice(1);
        $scope.AttractionInfomation = fillData;

        var fillVideoData = [{}];
        for (var j = 0; j < data.Data.Video.length; j++) {
          fillVideoData.push({
            "Id": data.Data.Video[j].Id,
            "ThumbImage": data.Data.Video[j].ThumbImage
          });
        }


        fillVideoData = fillVideoData.slice(1);
        $scope.AttractionVideoInfomation = fillVideoData;

        //var cateId = parseInt(attraction.CategoryId);
        //var regId = parseInt(attraction.RegionId);
        //for (var k = 0; k < attraction.CategoryId.length; i++) {
        //  fillData.push({
        //    "Id": attraction.CategoryId[k],
        //  });
        //}

        //$scope.categorymodel = [{ id: cateId }];
        //$scope.regionmodel = [{ id: regId }];
        cfpLoadingBar.complete();
        myBlockUi.stop();

      });


  };
  $scope.removeImage = function (imageId) {

    swal({
      title: "Are you sure?",
      text: "Confirm delete this image !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         $http.post($scope.URL + "DeleteAttractionImage", { 'ImageId': imageId })
          .success(function (data, status, headers, config) {

            $http.post($scope.URL + "GetAttractionDetailsById", { 'Attraction': $scope.current })
           .then(function (response) {
             $scope.AttractionInfomation = response.data;
           });
            notify("Recored Deleted Successfully");
            var index = $scope.AttractionInfomation.indexOf($scope.current);
            $scope.view($scope.current);

            swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });
          });

       }
     });

    //var delConfirm = confirm("Are you sure you want to delete this image ?");
    //if (delConfirm == true) {
    //  $http.post($scope.URL + "DeleteAttractionImage", { 'ImageId': imageId })
    //    .success(function (data, status, headers, config) {

    //      var dd = $scope.current;
    //      $http.post($scope.URL + "GetAttractionDetailsById", { 'Attraction': $scope.current })
    //        .then(function (response) {
    //          $scope.AttractionInfomation = response.data;
    //        });
    //      notify("Recored Deleted Successfully");
    //      var index = $scope.AttractionInfomation.indexOf($scope.current);
    //      $scope.view($scope.current);

    //      // $scope.AttractionInfomation.splice(index, 1);

    //    });
    //}
  };

  $scope.removeVideo = function (videoId) {

    swal({
      title: "Are you sure?",
      text: "Confirm delete this image !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         $http.post($scope.URL + "DeleteAttractionVideo", { 'VideoId': videoId })

          .success(function (data, status, headers, config) {
            $http.post($scope.URL + "GetAttractionDetailsById", { 'Attraction': $scope.current })
                      .then(function (response) {
                        $scope.AttractionVideoInfomation = response.data;
                      });
            notify("Recored Deleted Successfully");
            $scope.AttractionVideoInfomation.indexOf($scope.current);
            $scope.view($scope.current);

            swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });
          });

       }
     });


    //var delConfirm = confirm("Are you sure you want to delete this Video ?");
    //if (delConfirm == true) {
    //  $http.post($scope.URL + "DeleteAttractionVideo", { 'VideoId': videoId })
    //    .success(function (data, status, headers, config) {

    //      var dd = $scope.current;
    //      $http.post($scope.URL + "GetAttractionDetailsById", { 'Attraction': $scope.current })
    //        .then(function (response) {
    //          $scope.AttractionVideoInfomation = response.data;
    //        });
    //      notify("Recored Deleted Successfully");
    //      $scope.AttractionVideoInfomation.indexOf($scope.current);
    //      $scope.view($scope.current);

    //      // $scope.AttractionInfomation.splice(index, 1);

    //    });
    //}
  };


  vm.pageChanged = function () {
    //fetsh message data  from databae 
    $http.post($scope.URL + "FetchAttractionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "CategoryId": data.Data[i].CategoryId,
        "Category": data.Data[i].Category,
        "Region": data.Data[i].Region,
        "RegionId": data.Data[i].RegionId,
        "Longitude": data.Data[i].Longitude,
        "Latitude": data.Data[i].Latitude,
        "AttractionNameAr": data.Data[i].AttractionNameAr,
        "AttractionNameEn": data.Data[i].AttractionNameEn,
        "AttractionNameFr": data.Data[i].AttractionNameFr,
        "AttractionNameGe": data.Data[i].AttractionNameGe,
        "AttractionNameIta": data.Data[i].AttractionNameIta,
        "AttractionNameRu": data.Data[i].AttractionNameRu,
        "HistoricalInformationAr": data.Data[i].HistoricalInformationAr,
        "HistoricalInformationEn": data.Data[i].HistoricalInformationEn,
        "HistoricalInformationFr": data.Data[i].HistoricalInformationFr,
        "HistoricalInformationGe": data.Data[i].HistoricalInformationGe,
        "HistoricalInformationIta": data.Data[i].HistoricalInformationIta,
        "HistoricalInformationRu": data.Data[i].HistoricalInformationRu,
        "ImageUrl": data.Data[i].ImageUrl,
        "VideoUrl": data.Data[i].VideoUrl,
        "Rank": data.Data[i].Rank
      });
    }
    fillData = fillData.slice(1);
    vm.AttractionData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );
    // fetchData();

  };

  $scope.Reset = function () {

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  };

  function fetchData() {

    $http.post($scope.URL + "FetchAttractionByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "CategoryId": data.Data[i].CategoryId,
          "Category": data.Data[i].Category,
          "Region": data.Data[i].Region,
          "RegionId": data.Data[i].RegionId,
          "Longitude": data.Data[i].Longitude,
          "Latitude": data.Data[i].Latitude,
          "AttractionNameAr": data.Data[i].AttractionNameAr,
          "AttractionNameEn": data.Data[i].AttractionNameEn,
          "AttractionNameFr": data.Data[i].AttractionNameFr,
          "AttractionNameGe": data.Data[i].AttractionNameGe,
          "AttractionNameIta": data.Data[i].AttractionNameIta,
          "AttractionNameRu": data.Data[i].AttractionNameRu,
          "HistoricalInformationAr": data.Data[i].HistoricalInformationAr,
          "HistoricalInformationEn": data.Data[i].HistoricalInformationEn,
          "HistoricalInformationFr": data.Data[i].HistoricalInformationFr,
          "HistoricalInformationGe": data.Data[i].HistoricalInformationGe,
          "HistoricalInformationIta": data.Data[i].HistoricalInformationIta,
          "HistoricalInformationRu": data.Data[i].HistoricalInformationRu,
          "ImageUrl": data.Data[i].ImageUrl,
          "VideoUrl": data.Data[i].VideoUrl,
          "Rank": data.Data[i].Rank
        });
      }
      fillData = fillData.slice(1);
      vm.AttractionData = fillData;
      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );

  }


  $scope.GetAttractionValue = function (att) {
    var fruitId = $scope.attractionListModel;
    var fruitName = $.grep($scope.attractions, function (att) {
      return att.Id == fruitId;
    })[0].AttractionNameEn;
    getAttractionDetails(fruitId);
    //  alert("Selected Value: " + fruitId + "\nSelected Text: " + fruitName);
  }

  $scope.uploadExcelFunction = function (fileexcel) {
    // uploadPic(fileexcel);
    uploadPicSave(fileexcel);
  }
  function getRegions() {
    return $http.get($scope.URL + "FetchRegion");
  };
  function bindRegions() {
    var desg = getRegions();

    desg.then(function (dsg) {
      $scope.regions = dsg.data;
      $scope.regiondata = dsg.data;

    }, function (dsg) {
      $("#alertModal").modal('show');
      $scope.msg = "Error in filling regions drop down !";
    });
  }
  $scope.GetValue = function (reg) {
    var regionId = $scope.regionListModel;
    var regionName = $.grep($scope.regions, function (reg) {
      return reg.Id == regionId;
    })[0].NameEn;

    regionSelectedId = regionId;
  }

  function getcategory() {
    return $http.get($scope.URL + "FetchCategory");
  };
  function bindcategory() {
    var desg = getcategory();
    desg.then(function (dsg) {
      $scope.category = dsg.data;
      $scope.categorydata = dsg.data;
    }, function (dsg) {
      $("#alertModal").modal('show');
      $scope.msg = "Error in filling categorys drop down !";
    });
  }
  $scope.GetValueCategory = function () {
    var categoryId = $scope.categorymodel;
    alert(categoryId);

  }

  $scope.getImagePath = function (imageName) {
    return "images/" + imageName;
  };


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


  function uploadPicSave(file) {
    file.upload = Upload.then({
      url: $scope.MainURL + 'Scripts/App/Attraction/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        notify(response.data);

        //$http.post($scope.URL + "UploadExcel", { 'file': file.result })
        //.success(function (data, status, headers, config) {

        //  notify("Recored Deleted Successfully");


        //});
        // saveImage(attraction, response.data);

      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

  function saveImage(attraction, image) {

    attraction.Id = attraction.Id;
    $http.post($scope.URL + "UpdateAttractionImage", { 'attraction': Attraction, 'image': image })
      .success(function (data, status, headers, config) {
        //fetchData();
      });
  };

  function getAttractionDetails(attractionId) {
    $scope.attDetails = true;
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    attraction.Id = attractionId;

    $http.post($scope.URL + "UpdateAttraction", { 'Attraction': attraction })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae

        vm.current = {};
        vm.totalItems = data.TotalCount;
        var fillData = [{}];

        for (var i = 0; i < data.Data.length; i++) {
          fillData.push({
            "Id": data.Data[i].Id,
            "Image": data.Data[i].Image,
            "Video": data.Data[i].Video
          });
        }
        fillData = fillData.slice(1);
        vm.AttractionData = fillData;
        cfpLoadingBar.complete();

        myBlockUi.stop();

      });

  }


  $scope.search = function (searchText) {
     var myBlockUi = blockUI.instances.get('myBlockUI');
     
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    $http.post($scope.URL + "SearchByAttractionTitle", { 'Title': searchText })
      .success(function (data, status, headers, config) {
        vm.totalItems = data.TotalCount;
        var fillData = [{}];

        for (var i = 0; i < data.Data.length; i++) {
          fillData.push({
            "Id": data.Data[i].Id,
            "CategoryId": data.Data[i].CategoryId,
            "Category": data.Data[i].Category,
            "Region": data.Data[i].Region,
            "RegionId": data.Data[i].RegionId,
            "Longitude": data.Data[i].Longitude,
            "Latitude": data.Data[i].Latitude,
            "AttractionNameAr": data.Data[i].AttractionNameAr,
            "AttractionNameEn": data.Data[i].AttractionNameEn,
            "AttractionNameFr": data.Data[i].AttractionNameFr,
            "AttractionNameGe": data.Data[i].AttractionNameGe,
            "AttractionNameIta": data.Data[i].AttractionNameIta,
            "AttractionNameRu": data.Data[i].AttractionNameRu,
            "HistoricalInformationAr": data.Data[i].HistoricalInformationAr,
            "HistoricalInformationEn": data.Data[i].HistoricalInformationEn,
            "HistoricalInformationFr": data.Data[i].HistoricalInformationFr,
            "HistoricalInformationGe": data.Data[i].HistoricalInformationGe,
            "HistoricalInformationIta": data.Data[i].HistoricalInformationIta,
            "HistoricalInformationRu": data.Data[i].HistoricalInformationRu,
            "ImageUrl": data.Data[i].ImageUrl,
            "VideoUrl": data.Data[i].VideoUrl,
            "Rank": data.Data[i].Rank
          });
        }
        fillData = fillData.slice(1);
        vm.AttractionData = fillData;
        cfpLoadingBar.complete();
        myBlockUi.stop();

      });


  };

  $scope.fetchallData = function () {
    vm.searchText = "";
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    fetchData(); 
    myBlockUi.stop();
  };

  function clearControl() {
    $scope.current = {};
    $scope.attractionmodel = '';
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  }
});
