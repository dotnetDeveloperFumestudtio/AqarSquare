
var myApp = angular.module('toptenapp', []);


myApp.controller('TopTenCtrl', function ($scope, $http) {
   
   

  $scope.roles1 = [
      { roleId: 1, roleName: "Administrator" },
      { roleId: 2, roleName: "Super User" }
  ];

  $scope.user = {
    userId: 1,
    username: "JimBob",
    roles1: [$scope.roles1[0]]
  };



  $scope.roles = [];
  $scope.topten = [];

  bindAttractions();
  bindTopTen();

  //$scope.user = {
  //  userId: 1,
  //  username: "JimBob",
  //  roles: [$scope.roles[0]]
  //};
  function getAttractions() {
    return $http.get($scope.URL + "FetchAttraction");
  };
  function bindAttractions() {
    var desg = getAttractions();

    desg.then(function (dsg) {
      $scope.roles = dsg.data;

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
      //$scope.topten = dsg;
    }, function (dsg) {
      $("#alertModal").modal('show');
      $scope.msg = "Error in filling regions drop down !";
    });
  }


});

 
myApp.directive('multiSelect', function ($q) {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {
      selectedLabel: "@",
      availableLabel: "@",
      displayAttr: "@",
      available: "=",
      model: "=ngModel"
    },
    template: '<div class="multiSelect">' +
                '<div class="leftms fL ">' +
                  '<label class="control-label fL" for="multiSelectSelected">{{ availableLabel }} ' +
                      '({{ available.length }})</label>' + '<div class="clear"></div>' +
                  '<select id="multiSelectAvailable"  ng-model="selected.available" multiple ' +
                      'class="pull-left mselect " ng-options="e as e[displayAttr] for e in available"></select>' + '<div class="clear"></div>' +
                '</div>' +
                '<div class=" width10p fL" >' +
                  '<button class="btn mover left" ng-click="add()" title="Add selected" ' +
                      'ng-disabled="selected.available.length == 0">' +
                    '<i class="icon-arrow-right clrblk">&gt;</i>' +
                  '</button>' +
                  '<button class="btn mover right" ng-click="remove()" title="Remove selected" ' +
                      'ng-disabled="selected.current.length == 0">' +
                    '<i class="icon-arrow-left clrblk">&lt;</i>' +
                  '</button>' +
                '</div>' +
                '<div class="leftms fL">' +
                  '<label class="control-label fL" for="multiSelectSelected">{{ selectedLabel }} ' +
                      '({{ model.length }})</label>' + '<div class="clear"></div>' +
                  '<select id="currentRoles" ng-model="selected.current" multiple ' +
                      'class="pull-left mselect fL" ng-options="e as e[displayAttr] for e in model">' +
                      '</select>' + '<div class="clear"></div>' +
                '</div>' +
				'<div class=" width10p fL" >' +
                  '<button class="btn mover left" ng-click="up()" title="Add selected" ' +
                      'ng-disabled="selected.current.length == 0">' +
                    '<i class="fa fa-angle-up clrblk"></i>' +
                  '</button>' +
                  '<button class="btn mover right" ng-click="down()" title="Remove selected" ' +
                      'ng-disabled="selected.current.length == 0">' +
                    '<i  class="fa fa-angle-down clrblk"></i>' +
                  '</button>' +
                '</div>' +
              '</div>',
    link: function (scope, elm, attrs) {
      scope.selected = {
        available: [],
        current: []
      };

      /* Handles cases where scope data hasn't been initialized yet */
      var dataLoading = function (scopeAttr) {
        var loading = $q.defer();
        if (scope[scopeAttr]) {
          loading.resolve(scope[scopeAttr]);
        } else {
          scope.$watch(scopeAttr, function (newValue, oldValue) {
            if (newValue !== undefined)
              loading.resolve(newValue);
          });
        }
        return loading.promise;
      };

      /* Filters out items in original that are also in toFilter. Compares by reference. */
      var filterOut = function (original, toFilter) {
        var filtered = [];
        angular.forEach(original, function (entity) {
          var match = false;
          for (var i = 0; i < toFilter.length; i++) {
            if (toFilter[i][attrs.displayAttr] == entity[attrs.displayAttr]) {
              match = true;
              break;
            }
          }
          if (!match) {
            filtered.push(entity);
          }
        });
        return filtered;
      };

      scope.refreshAvailable = function () {
        scope.available = filterOut(scope.available, scope.model);
        scope.selected.available = [];
        scope.selected.current = [];
      };

      scope.add = function () {
        scope.model = scope.model.concat(scope.selected.available);
        scope.refreshAvailable();
      };
      scope.remove = function () {
        scope.available = scope.available.concat(scope.selected.current);
        scope.model = filterOut(scope.model, scope.selected.current);
        scope.refreshAvailable();
      };

      scope.update = function () {
        scope.model = scope.model.concat(scope.selected.current);
        //scope.model = filterOut(scope.model, scope.selected.current);
        scope.refreshAvailable();
      };

      scope.up = function () {
        var $op = $('#currentRoles option:selected');
        if ($op.length) {
          $op.first().prev().before($op);
        }
        $('#currentRoles').find('option').attr('selected', 'selected');
        //scope.update();
        scope.refreshAvailable();
      };

      scope.down = function () {
        var $op = $('#currentRoles option:selected');
        if ($op.length) {
          $op.last().next().after($op);
        }
        //scope.add();
        scope.refreshAvailable();
        scope.apply();
      };

      $q.all([dataLoading("model"), dataLoading("available")]).then(function (results) {
        scope.refreshAvailable();
      });
    }
  };
})// JavaScript Document
 

