var app = angular.module('contactapp', []);
app.controller('contactController', function ($scope, $http, notify, blockUI, cfpLoadingBar, $location) {


  $scope.IsHidden = true;
  $scope.ShowHide = function () {

    $scope.IsHidden = $scope.IsHidden ? false : true;
  };

  cfpLoadingBar.start();
  $scope.onlyNumbers = /^\d+$/;

  var vm = this;
  vm.contactObject = {};

  //fetsh message data  from databae
  $http.get($scope.URL + "FetchContact") 
   .success(function (data, status, headers, config) {

     vm.Id = data[0].Data[0].Id;
     vm.Website = data[0].Data[0].Website;
     vm.Longitude = data[0].Data[0].Longitude;
     vm.Latitude = data[0].Data[0].Latitude;
     vm.Email = data[0].Data[0].Email;
     vm.TelephoneNo1 = data[0].Data[0].TelephoneNo1;
     vm.TelephoneNo2 = data[0].Data[0].TelephoneNo2;
     vm.AddressAr = data[0].Data[0].AddressAr;
     vm.Addressge = data[0].Data[0].Addressge;
     vm.AddressRu = data[0].Data[0].AddressRu;
     vm.AddressIta = data[0].Data[0].AddressIta;
     vm.AddressFr = data[0].Data[0].AddressFr;
     vm.AddressEn = data[0].Data[0].AddressEn;

     cfpLoadingBar.complete();
   })
   .error(function (data, status, headers, config) {
     swal({ title: "Error!", text: "Something went wrong!", type: "error", timer: 2000, showConfirmButton: false });

   }
   );



  $scope.update = function (contact) {
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

    vm.Id = data[0].Data[0].Id;
    vm.Website = data[0].Data[0].Website;
    vm.Longitude = data[0].Data[0].Longitude;
    vm.Latitude = data[0].Data[0].Latitude;
    vm.Email = data[0].Data[0].Email;
    vm.TelephoneNo1 = data[0].Data[0].TelephoneNo1;
    vm.TelephoneNo2 = data[0].Data[0].TelephoneNo2;
    vm.AddressAr = data[0].Data[0].AddressAr;
    vm.Addressge = data[0].Data[0].Addressge;
    vm.AddressRu = data[0].Data[0].AddressRu;
    vm.AddressIta = data[0].Data[0].AddressIta;
    vm.AddressFr = data[0].Data[0].AddressFr;
    vm.AddressEn = data[0].Data[0].AddressEn;

    myBlockUi.stop();
    notify('Your Contact updated');
  });
       
      });
  };

});

app.directive('stringToNumber', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function (value) {
        return '' + value;
      });
      ngModel.$formatters.push(function (value) {
        return parseFloat(value);
      });
    }
  };
});