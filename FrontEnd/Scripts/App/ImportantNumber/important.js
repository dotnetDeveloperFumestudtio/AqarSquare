var app = angular.module('importantapp', []);
app.controller('importantController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {


  $scope.IsHidden = true;
  $scope.ShowHide = function () {

    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

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

  $http.post($scope.URL + "FetchImportantByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "EntityAr": data.Data[i].EntityAr,
        "EntityFr": data.Data[i].EntityFr,
        "EntityIta": data.Data[i].EntityIta,
        "EntityRu": data.Data[i].EntityRu,
        "EntityGe": data.Data[i].EntityGe,
        "EntityEn": data.Data[i].EntityEn,
        "TelephoneNo1": data.Data[i].TelephoneNo1,
        "TelephoneNo2": data.Data[i].TelephoneNo2,
      });
    }
    fillData = fillData.slice(1);
    vm.importantData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );



  $scope.create = function (important) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    important.EntityAr = $scope.current.EntityAr;
    important.EntityFr = $scope.current.EntityFr;
    important.EntityIta = $scope.current.EntityIta;
    important.EntityRu = $scope.current.EntityRu;
    important.EntityGe = $scope.current.EntityGe;
    important.EntityEn = $scope.current.EntityEn;
    important.TelephoneNo1 = $scope.current.TelephoneNo1;
    important.TelephoneNo2 = $scope.current.TelephoneNo2;

    $http.post($scope.URL + "CreateImportant", { 'important': important })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchImportantByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {


       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "Id": data.Data[i].Id,
           "EntityAr": data.Data[i].EntityAr,
           "EntityFr": data.Data[i].EntityFr,
           "EntityIta": data.Data[i].EntityIta,
           "EntityRu": data.Data[i].EntityRu,
           "EntityGe": data.Data[i].EntityGe,
           "EntityEn": data.Data[i].EntityEn,
           "TelephoneNo1": data.Data[i].TelephoneNo1,
           "TelephoneNo2": data.Data[i].TelephoneNo2,
         });
       }
       fillData = fillData.slice(1);
       vm.importantData = fillData;
       cfpLoadingBar.complete();
       clearControl();

       myBlockUi.stop();
       notify("Recored Saved Successfully");
     });
      });
  };

  $scope.edit = function (important) {
    console.log(important);
    $scope.current = important;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (important) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    important.Id = $scope.current.Id;
    important.EntityAr = $scope.current.EntityAr;
    important.EntityFr = $scope.current.EntityFr;
    important.EntityIta = $scope.current.EntityIta;
    important.EntityRu = $scope.current.EntityRu;
    important.EntityGe = $scope.current.EntityGe;
    important.EntityEn = $scope.current.EntityEn;
    important.TelephoneNo1 = $scope.current.TelephoneNo1;
    important.TelephoneNo2 = $scope.current.TelephoneNo2;

    $http.post($scope.URL + "UpdateImportant", { 'important': important })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchImportantByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {

       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "Id": data.Data[i].Id,
           "EntityAr": data.Data[i].EntityAr,
           "EntityFr": data.Data[i].EntityFr,
           "EntityIta": data.Data[i].EntityIta,
           "EntityRu": data.Data[i].EntityRu,
           "EntityGe": data.Data[i].EntityGe,
           "EntityEn": data.Data[i].EntityEn,
           "TelephoneNo1": data.Data[i].TelephoneNo1,
           "TelephoneNo2": data.Data[i].TelephoneNo2,
         });
       }
       fillData = fillData.slice(1);
       vm.importantData = fillData;
       cfpLoadingBar.complete();
       clearControl();
       myBlockUi.stop();
       notify("Recored Updated Successfully");

     });

      });
  };

  $scope.remove = function (important) {
    swal({
      title: "Are you sure you want to delete the important  ?",
      text: important.EntityEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
    function (isConfirmAtt) {
      if (isConfirmAtt) {
        $http.post($scope.URL + "DeleteImportant", { 'important': important })
         .success(function (data, status, headers, config) {
           swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

           $http.post($scope.URL + "FetchImportant")
             .then(function (response) {
               vm.importantData = response.data;
             });
           notify("Recored Deleted Successfully");

           var index = vm.importantData.indexOf(important);
           vm.importantData.splice(index, 1);

         });


      }
    });

    //var delConfirm = confirm("Are you sure you want to delete the important " + important.EntityEn + " ?");
    //if (delConfirm == true) {
    //  $http.post($scope.URL + "DeleteImportant", { 'important': important })
    //    .success(function (data, status, headers, config) {


    //      $http.post($scope.URL + "FetchImportant")
    //        .then(function (response) {
    //          vm.importantData = response.data;
    //        });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.importantData.indexOf(important);
    //      vm.importantData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };


  vm.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchImportantByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "EntityAr": data.Data[i].EntityAr,
          "EntityFr": data.Data[i].EntityFr,
          "EntityIta": data.Data[i].EntityIta,
          "EntityRu": data.Data[i].EntityRu,
          "EntityGe": data.Data[i].EntityGe,
          "EntityEn": data.Data[i].EntityEn,
          "TelephoneNo1": data.Data[i].TelephoneNo1,
          "TelephoneNo2": data.Data[i].TelephoneNo2,
        });
      }
      fillData = fillData.slice(1);
      vm.importantData = fillData;
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
