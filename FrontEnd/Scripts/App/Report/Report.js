var app = angular.module('Reportapp', []);
app.controller('ViolationController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {

   
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

  $http.post($scope.URL + "FetchReportByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "UserName": data.Data[i].UserName,
        "Email": data.Data[i].Email,
        "Date": data.Data[i].Date,
        "Comment": data.Data[i].Comment,
        "Telephone": data.Data[i].Telephone,
        "Location": data.Data[i].Location,
        "ImageList": data.Data[i].ImageList
      });
    }
    fillData = fillData.slice(1);
    vm.ReportData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );

   
  $scope.edit = function (report) {
    $scope.current = report;
    $scope.isUpdate = true;
    $scope.isCreate = false;
    $scope.Images = report.ImageList;

  };
  $scope.getImagePath = function (imageName) {
    return "images/" + imageName;
  };
  $scope.update = function (report,status) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    report.Status = status;
     report.Id = $scope.current.Id;
    //Report.NameAr = $scope.current.NameAr;
    //Report.NameFr = $scope.current.NameFr;
    //Report.NameIta = $scope.current.NameIta;
    //Report.NameRu = $scope.current.NameRu;
    //Report.NameGe = $scope.current.NameGe;
    //Report.NameEn = $scope.current.NameEn;

    $http.post($scope.URL + "UpdateReportStatus", { 'Report': report })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchReportByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {
       
       vm.current = {};
       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "Id": data.Data[i].Id,
           "FirstName": data.Data[i].FirstName,
           "LastName": data.Data[i].LastName,
           "Email": data.Data[i].Email,
           "Country": data.Data[i].Country,
           "Telephone": data.Data[i].Telephone,
           "ReportBrithDate": data.Data[i].ReportBrithDate,
           "Status": data.Data[i].Status
         });
       }
       fillData = fillData.slice(1);
       vm.ReportData = fillData;
       cfpLoadingBar.complete();

       myBlockUi.stop();
       notify("Recored Updated Successfully");

     });
       
      });
  };
   

  vm.pageChanged = function () {
    //fetsh message data  from databae 

    //$http.post($scope.URL + "FetchReportByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    //.success(function (data, status, headers, config) {
    //  vm.totalItems = data.TotalCount;
    //  var fillData = [{}];

    //  for (var i = 0; i < data.Data.length; i++) {
    //    fillData.push({
    //      "Id": data.Data[i].Id,
    //      "FirstName": data.Data[i].FirstName,
    //      "LastName": data.Data[i].LastName,
    //      "Email": data.Data[i].Email,
    //      "Country": data.Data[i].Country,
    //      "Telephone": data.Data[i].Telephone,
    //      "ReportBrithDate": data.Data[i].ReportBrithDate,
    //      "Status": data.Data[i].Status
    //    });
    //  }
    //  fillData = fillData.slice(1);
    //  vm.ReportData = fillData;
    //  cfpLoadingBar.complete();
    //})
    //.error(function (data, status, headers, config) {
    //  swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    //}
    //);


    $http.post($scope.URL + "FetchReportByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "UserName": data.Data[i].UserName,
        "Email": data.Data[i].Email,
        "Date": data.Data[i].Date,
        "Comment": data.Data[i].Comment,
        "Telephone": data.Data[i].Telephone,
        "Location": data.Data[i].Location,
        "ImageList": data.Data[i].ImageList
      });
    }
    fillData = fillData.slice(1);
    vm.ReportData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );


  };
   
});
