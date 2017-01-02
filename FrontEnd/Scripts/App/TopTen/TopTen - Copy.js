var app = angular.module('toptenapp1', []);

app.controller('sortableController', function ($scope, $http, notify, blockUI, Upload, $timeout, cfpLoadingBar) {

  $scope.list1 = "";
  $scope.list2 = [];
  $scope.list2 = makeList('b');
  $scope.sortingLog = [];
  $scope.sortingLogId = [];

  bindTopTen();
 
  bindAttractions();
  function getAttractions() {
    return $http.get($scope.URL + "FetchAttraction");
  };
  function bindAttractions() {
    var desg = getAttractions();

    desg.then(function (dsg) {
      $scope.list1 = dsg.data;

    }, function (dsg) {
      $("#alertModal").modal('show');
      $scope.msg = "Error in filling regions drop down !";
    });
  }


 function getTopTen() {
    return $http.get($scope.URL + "FetchTopTen");
  };
  function bindTopTen() {
    var desg = getTopTen();

    desg.then(function (dsg) {
      $scope.list2 = dsg.data;

    }, function (dsg) {
      $("#alertModal").modal('show');
      $scope.msg = "Error in filling regions drop down !";
    });
  }



  function makeList(letter) {
    var tmpList = [];

    for (var i = 1; i <= letter.lenght; i++) {
      tmpList.push({
        title: 'Item ' + i + letter,
        value: i
      });
    }
    return tmpList;
  }

  $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".apps-container", scrollSensitivity: 10,
    update: function (event, ui) {
      // on cross list sortings recieved is not true
      // during the first update
      // which is fired on the source sortable
      if (!ui.item.sortable.received && ui.item.sortable.droptargetModel.length >= 10) {
        var originNgModel = ui.item.sortable.sourceModel;
        var itemModel = originNgModel[ui.item.sortable.index];

        // check that its an actual moving
        // between the two lists
        if (originNgModel == $scope.list1 && ui.item.sortable.droptargetModel == $scope.list2) {
          var exists = !!$scope.list2.filter(function (x) { return x.title === itemModel.title }).length;
          if (exists) {
            ui.item.sortable.cancel();
          }
        }
      }


      //if (// ensure we are in the first update() callback
      //    !ui.item.sortable.received &&
      //  // check that its an actual moving
      //  // between the two lists
      //    ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0] &&
      //  // check the size limitation
      //    ui.item.sortable.droptargetModel.length >= 10) {
      //  ui.item.sortable.cancel();
      //}
    }
  };

  $scope.logModels = function () {
    $scope.sortingLogId = [];
    $scope.sortingLog = [];
    for (var i = 0; i < $scope.list2.length; i++) {
      var logEntry = "";
      var logEntryId = "";

      logEntryId = $scope.list2[i].Id;
      logEntryId = logEntryId;
      $scope.sortingLogId.push(logEntryId);


      logEntry = $scope.list2[i].AttractionNameEn;
      logEntry = (i + 1) + ': ' + logEntry;
      $scope.sortingLog.push(logEntry);
    }
    $scope.saveStaticTopTen();
  };

  $scope.saveStaticTopTen = function (topTenBackEnd) {
    // Get the reference to the block service.
    var myBlockUi = blockUI.instances.get('myBlockUI');
    // Start blocking the element.
    myBlockUi.start({
      message: 'Wait Please ...'
    });
    cfpLoadingBar.start();
    var fillData = [];

    for (var i = 0; i < $scope.sortingLogId.length; i++) {

      fillData.push($scope.sortingLogId[i]);

    }

    $http.post($scope.URL + "CreateStaticTopTen", { 'topTenBackEnd': fillData })
      .success(function (data, status, headers, config) {
        cfpLoadingBar.complete();

        myBlockUi.stop();
        if (data == "Error") {
          notify("Error,Recored Updated Fail");
        }
        if (data == "ErrorCount") {
          notify("Error,Please choose at least 10 attraction");
        }
        if (data == "Done") {
          notify("Recored Updated Successfully");
        }

      });
  };
});



//function arraymove(arr, fromIndex, toIndex) {
//  if (toIndex >= arr.length) return;
//  if (toIndex < 0) return;
//  var element = arr[fromIndex];
//  arr.splice(fromIndex, 1);
//  arr.splice(toIndex, 0, element);
//}

//app.directive('sortable', function ($timeout) {
//  return {
//    restrict: 'A',
//    link: function (scope, element, attrs) {
//      var startIndex = -1;
//      var coll;
//      scope.$watch(attrs.sortable, function (value) { coll = value; });
//      $(element).sortable({
//        containment: '#maindiv',
//        scroll: false,
//        helper: 'clone',
//        start: function (event, ui) {
//          startIndex = ($(ui.item).index());
//        },
//        stop: function (event, ui) {
//          var newIndex = ($(ui.item).index());
//          $timeout(function () {
//            arraymove(coll, startIndex, newIndex);
//          }, 0);
//        }
//      });
//    }
//  }
//});


//app.controller('MyCtrl', function ($scope) {
//  $scope.items = ['test', 'apple', 'banana'];
//});


