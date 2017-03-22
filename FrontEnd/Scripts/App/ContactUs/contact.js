var app = angular.module('contactapp', ['ngMap']);
app.controller('contactController', function ($scope, $http, notify, blockUI, cfpLoadingBar, dataService, myService) {

  var vm = this;
  vm.contactObject = {};
  fetshData();

  $scope.IsHidden = true;
  $scope.ShowHide = function () {

    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();
  $scope.onlyNumbers = /^\d+$/;

  //fetsh message data  from databae
  function fetshData() {
    $http.get($scope.URL + "FetchContact")
  .success(function (data, status, headers, config) {

    vm.Id = data.Id;
    vm.Twitter = data.Twitter;
    vm.Late = data.Late;
    vm.Late = data.Late;
    vm.Email = data.Email;
    vm.PhoneNo = data.PhoneNo;
    vm.PhoneNo1 = data.PhoneNo1;
    vm.PhoneNo2 = data.PhoneNo2;
    vm.Facebook = data.Facebook;
    vm.LinkedIn = data.LinkedIn;
    vm.GooglePlus = data.GooglePlus;
    vm.WhatsApp = data.WhatsApp;
    vm.Viber = data.Viber;
    vm.Youtube = data.Youtube;
    vm.Late = data.Late;
    vm.Long = data.Long;
    vm.CreatedBy = data.CreatedBy;
    $scope.latlng = [vm.Late, vm.Long];

    $scope.variable1 = $scope.latlng;

    cfpLoadingBar.complete();
  })
  .error(function (data, status, headers, config) {
    swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

  }
  );
  }

  $scope.update = function (contact) {
  
    contact.Late = $scope.variable1[0];
    contact.Long = $scope.variable1[1];
    contact.CreatedBy = $scope.UserId;

    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');
    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    $http.post($scope.URL + "UpdateContact", { 'contact': contact })

      .success(function (data, status, headers, config) {
        $http.get($scope.URL + "FetchContact")

  .success(function (data, status, headers, config) {
    fetshData();

    myBlockUi.stop();
    notify('Your Contact updated');
  });

      });
  }; 
  $scope.getpos = function (event) {
    $scope.latlng = [event.latLng.lat(), event.latLng.lng()];

    $scope.variable1 = $scope.latlng;

  };

});
app.run(function ($rootScope) {
  $rootScope.$on('scope.stored', function (event, data) {
    console.log("scope.stored", data);
  });
});
//angular.module('mymap', ['ngMap'])

app.controller('mapCtrl', function ($scope, dataService, myService) {
  //.controller('mapCtrl', ['$scope', function mapCtrl($scope) {
  $scope.latlng = [30.015997566809183, 31.223702430725098];
  // $scope.latlng = $scope.variable1;
  $scope.getpos = function (event) {
    $scope.latlng = [event.latLng.lat(), event.latLng.lng()];

    $scope.variable1 = $scope.latlng;


    console.log("$scope::variable1", $scope.variable1);
    $scope.data = dataService.dataObj;
    $scope.myjsonObj = {
      'animal': 'sdsd'
    };

    //pass the json object to the service
    myService.setJson($scope.myjsonObj);
  };
});

app.factory('dataService', function () {
  var _dataObj = {};
  return {
    dataObj: _dataObj
  };
});
app.factory('myService', function () {
  var myjsonObj = null; //the object to hold our data
  return {
    getJson: function () {
      return myjsonObj;
    },
    setJson: function (value) {
      myjsonObj = value;
    }
  }
});

app.factory('Scopes', function ($rootScope) {
  var mem = {};

  return {
    store: function (key, value) {
      $rootScope.$emit('scope.stored', key);
      mem[key] = value;
    },
    get: function (key) {
      return mem[key];
    }
  };
});