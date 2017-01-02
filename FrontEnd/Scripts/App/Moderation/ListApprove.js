﻿var app = angular.module('moderationapproveapp', []);
app.controller('ModerationApproveController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {

  cfpLoadingBar.start();

  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;

  $scope.current = {};
  $scope.currentModration = {};

  $scope.Status = false; 


 // fetchALl();
  fetchApproved();
  //fetchRejected();
  $scope.getImagePath = function (imageName) {
    return "images/" + imageName;
  };

  $scope.edit = function (moderation) {
    $scope.currentModration = moderation;
    $http.post($scope.URL + "GetUserInfo", { 'userId': moderation.UserId })
 .success(function (data, status, headers, config) {
   $scope.current = data;
 })
 .error(function (data, status, headers, config) {
   swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

 }
 );
    $scope.Status = moderation.Status;

  };

  $scope.update = function (moderation, status) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    moderation.Status = status;
    moderation.Id = $scope.currentModration.Id;

    $http.post($scope.URL + "UpdateModeration", { 'userImageList': moderation })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae 
        fetchApproved();
        //fetchRejected();
       // fetchALl();
        $scope.current = "";

      });

    myBlockUi.stop();

  };
   
  vm.pageChanged = function () {
   // fetchALl();
    fetchApproved();

  };

  $scope.Reset = function () {

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  };

  $scope.remove = function (moderation) {

    swal({
      title: "Are you sure you want to delete this image ?",
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
      $http.post($scope.URL + "DeleteModeration", { 'Moderation': moderation })
     .success(function (data, status, headers, config) {

       swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });

       //$http.post($scope.URL + "FetchApprovedModeration")
       //  .then(function (response) {
       //    vm.ModerationApprovedData = response.data;
       //  });
       //notify("Recored Deleted Successfully");

       var index = vm.ModerationApprovedData.indexOf(moderation);
       vm.ModerationApprovedData.splice(index, 1);

     });

    }
  });


    //var delConfirm = confirm("Are you sure you want to delete this image ?");
    //if (delConfirm == true) {
    //  $http.post($scope.URL + "DeleteModeration", { 'Moderation': moderation })
    //    .success(function (data, status, headers, config) {


    //      $http.post($scope.URL + "FetchApprovedModeration")
    //        .then(function (response) {
    //          vm.ModerationApprovedData = response.data;
    //        });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.ModerationApprovedData.indexOf(category);
    //      vm.ModerationApprovedData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };


  function fetchApproved() {
    $http.post($scope.URL + "FetchApprovedModerationByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
 .success(function (data, status, headers, config) {
   vm.totalItems = data.TotalCount;
   var fillData = [{}];

   for (var i = 0; i < data.Data.length; i++) {
     fillData.push({
       "Id": data.Data[i].Id,
       "UserId": data.Data[i].UserId,
       "ImageUrl": data.Data[i].ImageUrl,
       "Status": data.Data[i].Status,

     });
   }
   fillData = fillData.slice(1);
   vm.ModerationApprovedData = fillData;
   $scope.Images = fillData.ImageUrl;

   cfpLoadingBar.complete();
 })
 .error(function (data, status, headers, config) {
   swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

 }
 );
  }
   
});
