var app = angular.module('Eventapp', []);
app.controller('EventController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar, $location) {

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
  function uploadPic(file, event) {
    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/Events/UploadHandler.ashx',
      url: $scope.MainURL + 'Api/Images/',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        if (response.data.Success == true) {
          updateImage(event, response.data.FileId);
          notify("Recored Updated Successfully");

        } else {
          $scope.removeRecordWithoutImage(event);
          swal({ title: "Error!", text: "event image not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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
  function uploadPicSave(file, event) {
    file.upload = Upload.upload({
      // url: $scope.MainURL + 'Scripts/App/Events/UploadHandler.ashx',
      url: $scope.MainURL + 'Api/Images/',
      data: { file: file }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;


        if (response.data.Success == true) {
          saveImage(event, response.data.FileId);

          notify("Recored Saved Successfully");

        } else {
          $scope.removeRecordWithoutImage(event);
          swal({ title: "Error!", text: "event image  not uploaded", type: "error", timer: 2000, showConfirmButton: false });
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

  fetchData();


  $scope.create = function (event, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    event.EventNameAr = $scope.current.EventNameAr;
    event.EventNameFr = $scope.current.EventNameFr;
    event.EventNameIta = $scope.current.EventNameIta;
    event.EventNameRu = $scope.current.EventNameRu;
    event.EventNameGe = $scope.current.EventNameGe;
    event.EventNameEn = $scope.current.EventNameEn;

    event.DetailsAr = $scope.current.DetailsAr;
    event.DetailsFr = $scope.current.DetailsFr;
    event.DetailsIta = $scope.current.DetailsIta;
    event.DetailsRu = $scope.current.DetailsRu;
    event.DetailsGe = $scope.current.DetailsGe;
    event.DetailsEn = $scope.current.DetailsEn;

    event.EventImage = $scope.current.EventImage;
    event.Date = $scope.current.DisplayDate;
    event.TimeFrom = $scope.current.DisplayTimeFrom;
    event.TimeTo = $scope.current.DisplayTimeTo;
    $http.post($scope.URL + "CreateEvent", { 'Event': event })
      .success(function (data, status, headers, config) {
        //  fetchData();

        if (data == null) {
          notify("Error,Recored Saved Fail");

        } else {

          uploadPicSave(picFile, data);
          myBlockUi.stop();
          clearControl();
       //   notify(" Recored Saved Successfuly");
        }


      });
  };

  $scope.edit = function (event) {
    $scope.current = event;
    $scope.isUpdate = true; 
    $scope.isCreate = false;
   // $scope.current.DisplayDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
  };

  $scope.update = function (event, picFile) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    if (event.EventImage != null) {
      uploadPic(picFile, event);
    }

    event.Id = $scope.current.Id;

    event.EventNameAr = $scope.current.EventNameAr;
    event.EventNameFr = $scope.current.EventNameFr;
    event.EventNameIta = $scope.current.EventNameIta;
    event.EventNameRu = $scope.current.EventNameRu;
    event.EventNameGe = $scope.current.EventNameGe;
    event.EventNameEn = $scope.current.EventNameEn;

    event.DetailsAr = $scope.current.DetailsAr;
    event.DetailsFr = $scope.current.DetailsFr;
    event.DetailsIta = $scope.current.DetailsIta;
    event.DetailsRu = $scope.current.DetailsRu;
    event.DetailsGe = $scope.current.DetailsGe;
    event.DetailsEn = $scope.current.DetailsEn;

    event.EventImage = $scope.current.EventImage;
    event.Date = $scope.current.DisplayDate;
    event.TimeFrom = $scope.current.DisplayTimeFrom;
    event.TimeTo = $scope.current.DisplayTimeTo;

    $http.post($scope.URL + "UpdateEvent", { 'Event': event })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        fetchData();
    

        myBlockUi.stop();
        cfpLoadingBar.complete();
        clearControl();

      });
  };

  function updateImage(event, image) {
    event.Id = event.Id;

    event.Id = $scope.current.Id;
    event.EventImage = image;
    //event.EventNameAr = $scope.current.EventNameAr;
    //event.EventNameFr = $scope.current.EventNameFr;
    //event.EventNameIta = $scope.current.EventNameIta;
    //event.EventNameRu = $scope.current.EventNameRu;
    //event.EventNameGe = $scope.current.EventNameGe;
    //event.EventNameEn = $scope.current.EventNameEn;
    //event.EventImage = image;

    $http.post($scope.URL + "UpdatedEventImage", { 'Event': event })
      .success(function (data, status, headers, config) {
        fetchData();

      });
  };
  function saveImage(event, image) {

    event.Id = event.Id;

    event.EventImage = image;
    $http.post($scope.URL + "UpdatedEventImage", { 'Event': event })
      .success(function (data, status, headers, config) {
        fetchData();
      });
  };
  $scope.remove = function (event) {

    swal({
      title: "Are you sure you want to delete the Event ?",
      text: event.EventNameEn,
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
         $http.post($scope.URL + "DeleteEvent", { 'Event': event })
           .success(function (data, status, headers, config) {
             swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


             //fetsh message data  from databae   
             fetchData();
             myBlockUi.stop();

             notify("Recored Deleted Successfully");

             var index = vm.EventData.indexOf(event);
             vm.EventData.splice(index, 1);

           });


       }
     });

    //var delConfirm = confirm("Are you sure you want to delete the Event " + event.EventNameEn + " ?");
    //if (delConfirm == true) {
    //  // Get the reference to the block service.
    //  var myBlockUi = blockUI.instances.get('myBlockUI');

    //  // Start blocking the element.
    //  myBlockUi.start({
    //    message: 'Wait Please ...'
    //  });
    //  cfpLoadingBar.start();
    //  $http.post($scope.URL + "DeleteEvent", { 'Event': event })
    //    .success(function (data, status, headers, config) {


    //      //fetsh message data  from databae   
    //      fetchData();
    //      myBlockUi.stop();

    //      notify("Recored Deleted Successfully");

    //      var index = vm.EventData.indexOf(event);
    //      vm.EventData.splice(index, 1);

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
  $scope.setFocus = function () {
    var element = $window.document.getElementsByName("email");
    element.focus();
  };
  function fetchData() {

    $http.post($scope.URL + "FetchEventByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
   .success(function (data, status, headers, config) {
     vm.totalItems = data.TotalCount;
     var fillData = [{}];

     for (var i = 0; i < data.Data.length; i++) {
       fillData.push({
         "Id": data.Data[i].Id,
         "EventNameAr": data.Data[i].EventNameAr,
         "EventNameFr": data.Data[i].EventNameFr,
         "EventNameIta": data.Data[i].EventNameIta,
         "EventNameRu": data.Data[i].EventNameRu,
         "EventNameGe": data.Data[i].EventNameGe,
         "EventNameEn": data.Data[i].EventNameEn,
         "DetailsAr": data.Data[i].DetailsAr,
         "DetailsFr": data.Data[i].DetailsFr,
         "DetailsIta": data.Data[i].DetailsIta,
         "DetailsRu": data.Data[i].DetailsRu,
         "DetailsGe": data.Data[i].DetailsGe,
         "DetailsEn": data.Data[i].DetailsEn,
         "Date": data.Data[i].Date,
         "TimeFrom": data.Data[i].TimeFrom,
         "TimeTo": data.Data[i].TimeTo,
         "DisplayDate": data.Data[i].DisplayDate,
         "DisplayTimeFrom": data.Data[i].DisplayTimeFrom,
         "DisplayTimeTo": data.Data[i].DisplayTimeTo,
         "EventImage": data.Data[i].EventImage,
       });
     }
     fillData = fillData.slice(1);
     vm.EventData = fillData;
     cfpLoadingBar.complete();
   })
   .error(function (data, status, headers, config) {
     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

   }
   );

  }
});
