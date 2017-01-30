var app = angular.module('Eventapp', []);
app.controller('EventController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {

   
  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;

  $scope.current = {};
  $scope.isUpdate = false;
  $scope.isCreate = true;
  $scope.isAdd = true;

  //fetsh message data  from databae  
  bindTable();


  $scope.create = function (event) {
    loadblockUiAndLoader();

    prameters();
    $http.post($scope.URL + "CreateEvent", { 'Event': event })
      .success(function (data, status, headers, config) {
        bindTable();
        stopblockUiAndLoader();
        notify("Recored Saved Succefuly");
      });
  };

  $scope.edit = function (event) {
    $scope.current = event;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (event) {
    loadblockUiAndLoader();
    prameters();

    $http.post($scope.URL + "UpdateEvent", { 'Event': event })
      .success(function (data, status, headers, config) {
        bindTable();
        stopblockUiAndLoader();
        notify("Recored Updated Succefuly"); 
      });
  };

  $scope.remove = function (event) {

    var delConfirm = confirm("Are you sure you want to delete the Event " + event.EventNameEn + " ?");
    if (delConfirm == true) {
      $http.post($scope.URL + "DeleteEvent", { 'Event': event })
        .success(function (data, status, headers, config) {


          $http.post($scope.URL + "FetchEvent")
            .then(function (response) {
              vm.EventData = response.data;
            });
          notify("Recored Deleted Succefuly");

          var index = vm.EventData.indexOf(event);
          vm.EventData.splice(index, 1);

        });
    }

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };
   
  vm.pageChanged = function () {
    bindTable();
 
  };

  $scope.Reset = function () {

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  };

  function bindTable() {

    $http.post($scope.URL + "FetchEventByPageSize", { 'pageNumber': 1, 'pageSize': 5 })
    .success(function (data, status, headers, config) {
      $scope.totalItems = data.TotalCount;
      var fillData = [{}];
      console.log(data.TotalCount);

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
          "EventImage": data.Data[i].EventImage,
        });
      }
      fillData = fillData.slice(1);
      $scope.EventData = fillData;
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );
  }

  function loadblockUiAndLoader() {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
  }

  function stopblockUiAndLoader() {
    var myBlockUi = blockUI.instances.get('myBlockUI');
    cfpLoadingBar.complete();
    myBlockUi.stop();
  }

  function prameters() {

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


    event.Date = $scope.current.Date;
    event.TimeFrom = $scope.current.TimeFrom;
    event.TimeTo = $scope.current.TimeTo;
    event.EventImage = $scope.current.EventImage;
  }
});
