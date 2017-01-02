var app = angular.module('categoryapp', []);
app.controller('CategoryController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {


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

  $http.post($scope.URL + "FetchCategoryByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount;
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "NameAr": data.Data[i].NameAr,
        "NameFr": data.Data[i].NameFr,
        "NameIta": data.Data[i].NameIta,
        "NameRu": data.Data[i].NameRu,
        "NameGe": data.Data[i].NameGe,
        "NameEn": data.Data[i].NameEn
      });
    }
    fillData = fillData.slice(1);
    vm.CategoryData = fillData;
    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );



  $scope.create = function (category) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    category.NameAr = $scope.current.NameAr;
    category.NameFr = $scope.current.NameFr;
    category.NameIta = $scope.current.NameIta;
    category.NameRu = $scope.current.NameRu;
    category.NameGe = $scope.current.NameGe;
    category.NameEn = $scope.current.NameEn;

    $http.post($scope.URL + "CreateCategory", { 'Category': category })
      .success(function (data, status, headers, config) {
        if (data == "Exist") {

          cfpLoadingBar.complete();

          myBlockUi.stop();
          swal({ title: "Error!", text: "Category name already exist!", type: "error", timer: 2000 });

        }
        if (data == "Done") {
          $http.post($scope.URL + "FetchCategoryByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
            .success(function (data, status, headers, config) {

              vm.totalItems = data.TotalCount;
              var fillData = [{}];

              for (var i = 0; i < data.Data.length; i++) {
                fillData.push({
                  "Id": data.Data[i].Id,
                  "NameAr": data.Data[i].NameAr,
                  "NameFr": data.Data[i].NameFr,
                  "NameIta": data.Data[i].NameIta,
                  "NameRu": data.Data[i].NameRu,
                  "NameGe": data.Data[i].NameGe,
                  "NameEn": data.Data[i].NameEn
                });
              }
              fillData = fillData.slice(1);
              vm.CategoryData = fillData;
              cfpLoadingBar.complete();
              clearControl();

              myBlockUi.stop();
              notify("Recored Saved Successfully");
            });
        }



      });
  };

  $scope.edit = function (category) {
    $scope.current = category;
    $scope.isUpdate = true;
    $scope.isCreate = false;

  };

  $scope.update = function (category) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();

    category.Id = $scope.current.Id;
    category.NameAr = $scope.current.NameAr;
    category.NameFr = $scope.current.NameFr;
    category.NameIta = $scope.current.NameIta;
    category.NameRu = $scope.current.NameRu;
    category.NameGe = $scope.current.NameGe;
    category.NameEn = $scope.current.NameEn;

    $http.post($scope.URL + "UpdateCategory", { 'Category': category })
      .success(function (data, status, headers, config) {
        cfpLoadingBar.complete();

        myBlockUi.stop();
        //if (data == "Exist") {

        //  cfpLoadingBar.complete(); 

        //  myBlockUi.stop();
        //  swal({ title: "Error!", text: "Category name already exist!", type: "error", timer: 2000 });

        //}
        // if (data == "Done") {
        $http.post($scope.URL + "FetchCategoryByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
          .success(function (data, status, headers, config) {

            vm.totalItems = data.TotalCount;
            var fillData = [{}];

            for (var i = 0; i < data.Data.length; i++) {
              fillData.push({
                "Id": data.Data[i].Id,
                "NameAr": data.Data[i].NameAr,
                "NameFr": data.Data[i].NameFr,
                "NameIta": data.Data[i].NameIta,
                "NameRu": data.Data[i].NameRu,
                "NameGe": data.Data[i].NameGe,
                "NameEn": data.Data[i].NameEn
              });
            }
            fillData = fillData.slice(1);
            vm.CategoryData = fillData;
            cfpLoadingBar.complete();
            clearControl();

            myBlockUi.stop();
            notify("Recored Saved Successfully");
          });
        // }

      });
  };

  $scope.remove = function (category) {
    swal({
      title: "Are you sure you want to delete the Category ?",
      text: category.NameEn,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
    },
     function (isConfirmAtt) {
       if (isConfirmAtt) {
         $http.post($scope.URL + "DeleteCategory", { 'Category': category })
     .success(function (data, status, headers, config) {
       swal({ title: "Deleted!", type: "success", timer: 1000, showConfirmButton: false });


       $http.post($scope.URL + "FetchCategory")
         .then(function (response) {
           vm.CategoryData = response.data;
         });
       notify("Recored Deleted Successfully");

       var index = vm.CategoryData.indexOf(category);
       vm.CategoryData.splice(index, 1);

     });

       }
     });

    //var delConfirm = confirm("Are you sure you want to delete the Category " + category.NameEn + " ?");
    //if (delConfirm == true) {
    //  $http.post($scope.URL + "DeleteCategory", { 'Category': category }) 
    //    .success(function (data, status, headers, config) {


    //      $http.post($scope.URL + "FetchCategory")
    //        .then(function(response) {
    //          vm.CategoryData = response.data;
    //      });
    //      notify("Recored Deleted Successfully");

    //      var index = vm.CategoryData.indexOf(category);
    //      vm.CategoryData.splice(index, 1);

    //    });
    //}

    $scope.current = {};
    $scope.isUpdate = false;
    $scope.isCreate = true;
  };


  vm.pageChanged = function () {
    //fetsh message data  from databae 

    $http.post($scope.URL + "FetchCategoryByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "NameAr": data.Data[i].NameAr,
          "NameFr": data.Data[i].NameFr,
          "NameIta": data.Data[i].NameIta,
          "NameRu": data.Data[i].NameRu,
          "NameGe": data.Data[i].NameGe,
          "NameEn": data.Data[i].NameEn
        });
      }
      fillData = fillData.slice(1);
      vm.CategoryData = fillData;
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
