var app = angular.module('UsefulLinkapp', []);
app.controller('UsefulLinkController', function ($scope, $http, notify, blockUI, cfpLoadingBar, filterFilter) {


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

  $http.post($scope.URL + "FetchUsefulLinkByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
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
        "Website": data.Data[i].Website
      });
    }
    fillData = fillData.slice(1);
    vm.UsefulLinkData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );



  $scope.create = function (usefulLink) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    usefulLink.EntityAr = $scope.current.EntityAr;
    usefulLink.EntityFr = $scope.current.EntityFr;
    usefulLink.EntityIta = $scope.current.EntityIta;
    usefulLink.EntityRu = $scope.current.EntityRu;
    usefulLink.EntityGe = $scope.current.EntityGe;
    usefulLink.EntityEn = $scope.current.EntityEn;
    usefulLink.Website = $scope.current.Website;

    $http.post($scope.URL + "CreateUsefulLink", { 'UsefulLink': usefulLink })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchUsefulLinkByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
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
           "Website": data.Data[i].Website
         });
       }
       fillData = fillData.slice(1);
       vm.UsefulLinkData = fillData;
       cfpLoadingBar.complete();
       clearControl();

       myBlockUi.stop();
       notify("Recored Saved Successfully");
     });

      });
  };

  $scope.edit = function (usefulLink) {
    $scope.current = usefulLink;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (usefulLink) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    usefulLink.Id = $scope.current.Id;
    usefulLink.EntityAr = $scope.current.EntityAr;
    usefulLink.EntityFr = $scope.current.EntityFr;
    usefulLink.EntityIta = $scope.current.EntityIta;
    usefulLink.EntityRu = $scope.current.EntityRu;
    usefulLink.EntityGe = $scope.current.EntityGe;
    usefulLink.EntityEn = $scope.current.EntityEn;
    usefulLink.Website = $scope.current.Website;

    $http.post($scope.URL + "UpdateUsefulLink", { 'UsefulLink': usefulLink })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchUsefulLinkByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
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
           "Website": data.Data[i].Website
         });
       }
       fillData = fillData.slice(1);
       vm.UsefulLinkData = fillData;
       cfpLoadingBar.complete();
       clearControl();
       myBlockUi.stop();
       notify("Recored Updated Successfully");

     });

      });
  };

  $scope.remove = function (usefulLink) {
    swal({
      title: "Are you sure you want to delete the UsefulLink ?",
      text: usefulLink.EntityEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
function (isConfirmAtt) {
  if (isConfirmAtt) {
    $http.post($scope.URL + "DeleteUsefulLink", { 'UsefulLink': usefulLink })
     .success(function (data, status, headers, config) {
       swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


       $http.post($scope.URL + "FetchUsefulLink")
         .then(function (response) {
           vm.UsefulLinkData = response.data;
         });
       notify("Recored Deleted Successfully");

       var index = vm.UsefulLinkData.indexOf(usefulLink);
       vm.UsefulLinkData.splice(index, 1);

     });

  }
});


    //var delConfirm = confirm("Are you sure you want to delete the UsefulLink " + usefulLink.EntityEn + " ?");
    //if (delConfirm == true) {
    //  $http.post($scope.URL + "DeleteUsefulLink", { 'UsefulLink': usefulLink })
    //    .success(function (data, status, headers, config) {


    //      $http.post($scope.URL + "FetchUsefulLink")
    //        .then(function (response) {
    //          vm.UsefulLinkData = response.data;
    //        });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.UsefulLinkData.indexOf(usefulLink);
    //      vm.UsefulLinkData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };

  vm.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchUsefulLinkByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
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
          "Website": data.Data[i].Website
        });
      }
      fillData = fillData.slice(1);
      vm.UsefulLinkData = fillData;
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

  $scope.$watch('search.name', function (term) {
    var obj = { name: term }

    $scope.filterList = filterFilter($scope.list, obj);
    $scope.currentPage = 1;
  });
})
  
;
