var app = angular.module('messegeapp', ['ngAnimate', 'ui.bootstrap']);
app.controller('messageController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {
  
  var sideBar = localStorage.getItem('LocalMessage');
  if (sideBar === undefined || sideBar === null || sideBar.length === 0) {
  //  swal({ title: "Pleae Login First!!", text: "", type: "error", timer: 3000, showConfirmButton: false });
    //$location.path("/login page"); 
  }

  $scope.IsHidden = true;
  $scope.ShowHide = function() {
  
    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();
    
  var vm = this;
  vm.totalItems = 0;
  vm.currentPage = 1;
  vm.pageNumber = 5;
  vm.current = {};
  vm.isUpdate = false;
   
  //fetsh message data  from databae
  $http.post("http://localhost:1716/Message/FetchMessagesByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
  .success(function (data, status, headers, config) {
    vm.totalItems = data.TotalCount; 
    var fillData = [{}];

    for (var i = 0; i < data.Data.length; i++) {
      fillData.push({
        "Id": data.Data[i].Id,
        "MsgTitle": data.Data[i].MsgTitle,
        "MsgContent": data.Data[i].MsgContent,
        "MsgDateTime": toJavaScriptDate(data.Data[i].MsgDateTime)
      });
    }
    fillData = fillData.slice(1);
    vm.messageData = fillData;
    cfpLoadingBar.complete(); 
  })
  .error(function(data, status, headers, config) { 
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

    }
  );
  function toJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
  }

  vm.insertData = function () {
    // Get the reference to the block service.
    var myBlockUI = blockUI.instances.get('myBlockUI');

    // Start blocking the element.
    myBlockUI.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
     
    $http.post("http://localhost:1716/Message/CreateMessages", { 'msgtitle': vm.current.MsgTitle, 'msgcontent': vm.current.MsgContent })
      .success(function (data, status, headers, config) {

        vm.current = {};
        //fetsh message data  from databae
        $http.post("http://localhost:1716/Message/FetchMessagesByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
        .success(function (data, status, headers, config) {
          vm.totalItems = data.TotalCount;
          var fillData = [{}];

          for (var i = 0; i < data.Data.length; i++) {
            fillData.push({
              "Id": data.Data[i].Id,
              "MsgTitle": data.Data[i].MsgTitle,
              "MsgContent": data.Data[i].MsgContent,
              "MsgDateTime": toJavaScriptDate(data.Data[i].MsgDateTime)
            });
          }
          fillData = fillData.slice(1);
          vm.messageData = fillData;
          // Unblock the user interface
          myBlockUI.stop();
          notify('Your message sent');  
        });
        vm.loader = {
          loading: false,
        };
      });
  };
    

  vm.pageChanged = function () {
    //fetsh message data  from databae
    $http.post("http://localhost:1716/Message/FetchMessagesByPageSize", { 'pageNumber': vm.currentPage, 'pageSize': vm.pageNumber })
    .success(function (data, status, headers, config) {
      vm.totalItems = data.TotalCount;
      var fillData = [{}];

      for (var i = 0; i < data.Data.length; i++) {
        fillData.push({
          "Id": data.Data[i].Id,
          "MsgTitle": data.Data[i].MsgTitle,
          "MsgContent": data.Data[i].MsgContent,
          "MsgDateTime": toJavaScriptDate(data.Data[i].MsgDateTime)
        });
      }
      fillData = fillData.slice(1);
      vm.messageData = fillData;

    });

    $log.log('Page changed to: ' + vm.currentPage);
  };
   

});
