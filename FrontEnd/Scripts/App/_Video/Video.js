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

  function uploadPicSave(file, video) {
    file.upload = Upload.upload({
      url: $scope.MainURL + 'Scripts/App/Video/UploadHandler.ashx',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

        saveVideo(video, response.data);

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
  fetchData();


  $scope.create = function (Video, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    Video.Status = $scope.current.Status;
    Video.VideoUrl = $scope.current.VideoUrl;

    $http.post($scope.URL + "CreateVideo", { 'Video': Video })
      .success(function (data, status, headers, config) {
        uploadPicSave(picFile, data);
        myBlockUi.stop();

      });
  };

  $scope.update = function (video) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start(); 
    video.Id = $scope.current.Id;

    $http.post($scope.URL + "UpdateVideoStatus", { 'Video': video })
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
  function saveVideo(video, data) {

    video.Id = video.Id;
    video.VideoUrl = data;

    $http.post($scope.URL + "UpdateVideo", { 'Video': video })
      .success(function (data, status, headers, config) {

        fetchData();
        notify("Recored Saved Successfully");

      });
  };

  $scope.remove = function (Video) {

    var delConfirm = confirm("Are you sure you want to delete this Video   ?");
    if (delConfirm == true) {
      // Get the reference to the block service.
      var myBlockUi = blockUI.instances.get('myBlockUI');

      // Start blocking the element.
      myBlockUi.start({
        message: 'Wait Please ...'
      });
      cfpLoadingBar.start();
      $http.post($scope.URL + "DeleteVideo", { 'Video': Video })
        .success(function (data, status, headers, config) {

          //fetsh message data  from databae
          myBlockUi.stop();
          fetchData();
          notify("Recored Deleted Successfully");

          var index = vm.VideoData.indexOf(Video);
          vm.VideoData.splice(index, 1);

        });
    }

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
     $scope.VideoData = fillData;
   })
   .error(function (data, status, headers, config) {
     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

   }
   );
  }
});
 