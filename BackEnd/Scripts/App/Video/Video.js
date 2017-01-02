var app = angular.module('Videoapp', []);
app.controller('VideoController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {


  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.Video = "";

  $scope.Videos = {};
  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;


  cfpLoadingBar.start();

  function uploadVideoSave(file, video) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/AudioAdmin/',
      // url: $scope.MainURL + 'Scripts/App/Video/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        if (response.data.Success == true) {
          saveVideo(video, response.data.FileId);

          notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(image);
          swal({ title: "Error!", text: "video not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function saveVideo(videoObj, video) {

    //  Video.Id = VideoObj.Id;
    videoObj.VideoUrl = video;

    $http.post($scope.URL + "UpdateVideo", { 'Video': videoObj })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          notify("Error,Recored Saved Fail");

        }
        else {
          //   notify("Recored Saved Successfully");

        }
        fetchData();

      });
  };

  function uploadPicSave(file, video) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Api/Images/',

      // url: $scope.MainURL + 'Scripts/App/Video/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        if (response.data.Success == true) {
          saveImage(video, response.data.FileId);

         // notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(image);
          swal({ title: "Error!", text: "video not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function saveImage(videoObj, video) {
     
    videoObj.VideoThumbnail = video;

    $http.post($scope.URL + "UpdateVideoThumbnail", { 'Video': videoObj })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          notify("Error,Recored Saved Fail");

        }
        else {
          //   notify("Recored Saved Successfully");

        }
        fetchData();

      });
  };

  //fetsh message data  from databae 
  fetchData();


  $scope.create = function (video, picFile, videoFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    video.Status = $scope.current.Status;
  //  video.VideoUrl = $scope.current.VideoUrl;

    $http.post($scope.URL + "CreateVideo", { 'Video': video })
      .success(function (data, status, headers, config) {
        if (data == null) {
          notify("Error,Recored Saved Fail");

        } else {
          if (picFile != null) {
            uploadPicSave(picFile, data);

          }
          if (videoFile != null) {
            uploadVideoSave(videoFile, data);

          }
        }
     //   uploadPicSave(picFile, data);
        myBlockUi.stop();
       // $scope.Reset();
        cfpLoadingBar.compelate();
      });
  };

  $scope.update = function (video) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    //Video.Id = VideoId;
    //Video.Status = VideoStatus;
    $http.post($scope.URL + "UpdateVideoStatus", { 'Video': video })
      .success(function (data, status, headers, config) {

        if (data == "Error") {

          fetchData();
          myBlockUi.stop(); notify("Error,Recored Updated Fail");

        }
        else {

          fetchData();
          myBlockUi.stop();
          $scope.Reset();
          cfpLoadingBar.compelate();
          notify("Recored Updated Successfully");
        }
      });
  };

  $scope.remove = function (video) {
    swal({
      title: "Are you sure you want to delete this Video  ?",
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
    $http.post($scope.URL + "DeleteVideo", { 'Video': video })
      .success(function (data, status, headers, config) {
        swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

        //fetsh message data  from databae
        myBlockUi.stop();
        fetchData();
        notify("Recored Deleted Successfully");

        var index = vm.VideoData.indexOf(video);
        vm.VideoData.splice(index, 1);

      });

  }
});

    //var delConfirm = confirm("Are you sure you want to delete this Video ?");
    //if (delConfirm == true) {
    //  // Get the reference to the block service.
    //  var myBlockUi = blockUI.instances.get('myBlockUI');

    //  // Start blocking the element.
    //  myBlockUi.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "DeleteVideo", { 'Video': video })
    //    .success(function (data, status, headers, config) {

    //      //fetsh message data  from databae
    //      myBlockUi.stop();
    //      fetchData();
    //      notify("Recored Deleted Successfully");

    //      var index = vm.VideoData.indexOf(video);
    //      vm.VideoData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
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

    $http.post($scope.URL + "FetchVideoByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
   .success(function (data, status, headers, config) {
     vm.totalItems = data.TotalCount;
     var fillData = [{}];

     for (var i = 0; i < data.Data.length; i++) {
       fillData.push({
         "Id": data.Data[i].Id,
         "Status": data.Data[i].Status,
         "VideoUrl": data.Data[i].VideoUrl,
         "ThumbImage": data.Data[i].ThumbImage
       });
     }
     fillData = fillData.slice(1);
     vm.VideoData = fillData;
     cfpLoadingBar.complete();
   })
   .error(function (data, status, headers, config) {
     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

   }
   );
  }
});
