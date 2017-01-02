var app = angular.module('Languageapp', []);
app.controller('LanguageController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {


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

  $http.post($scope.URL + "FetchLanguagesByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "Name": data.Data[i].Name,
        "Status": data.Data[i].Status
      });
    }
    fillData = fillData.slice(1);
    vm.LanguageData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );



  $scope.edit = function (language) {
     console.log(language);
    $scope.current = language;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };
   
  $scope.update = function (language) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    language.Id = $scope.current.Id;
    language.Name = $scope.current.Name;
    language.Status = $scope.current.Status;
    console.log(language);
    $http.post($scope.URL + "UpdateLanguages", { 'languages': language })
      .success(function (data, status, headers, config) {
        //fetsh message data  from databae
        $http.post($scope.URL + "FetchLanguagesByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
     .success(function (data, status, headers, config) {
       $scope.isAdd = true;

       vm.current = {};
       vm.totalItems = data.TotalCount;
       var fillData = [{}];

       for (var i = 0; i < data.Data.length; i++) {
         fillData.push({
           "Id": data.Data[i].Id,
           "Name": data.Data[i].Name,
           "Status": data.Data[i].Status
         });
       }
       fillData = fillData.slice(1);
       vm.LanguageData = fillData;
       cfpLoadingBar.complete();

       myBlockUi.stop();
       notify("Recored Updated Successfully");

     });
        vm.loader = {
          loading: false,
        };
      });
  };
   
  $scope.remove = function (Language) {

    var delConfirm = confirm("Are you sure you want to delete the Language " + Language.EntityEn + " ?");
    if (delConfirm == true) {
      $http.post($scope.URL + "DeleteLanguage", { 'Language': Language }) 
        .success(function (data, status, headers, config) {


          $http.post($scope.URL + "FetchLanguage")
            .then(function(response) {
              vm.LanguageData = response.data;
          });
          notify("Recored Deleted Successfully");

          var index = vm.LanguageData.indexOf(Language);
          vm.LanguageData.splice(index, 1);

        });
    }

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };
   

  vm.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchLanguagesByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "Name": data.Data[i].Name,
          "Status": data.Data[i].Status
        });
      }
      fillData = fillData.slice(1);
      vm.LanguageData = fillData;
      cfpLoadingBar.complete();
    })
    .error(function (data, status, headers, config) {
      swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
    );

  };

  $scope.Reset = function() {

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isAdd = false;
    $scope.isCreate = true;
  };
});
