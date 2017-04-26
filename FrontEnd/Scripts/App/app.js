/// <reference path="D:\M-Saber\Projects\Aqar Squaers\ProjectFront\AqarSquare\FrontEnd\main.html" />
/// <reference path="D:\M-Saber\Projects\Aqar Squaers\ProjectFront\AqarSquare\FrontEnd\main.html" />
/// <reference path="D:\M-Saber\Projects\Aqar Squaers\ProjectFront\AqarSquare\FrontEnd\main.html" />

/// <reference path="D:\M-Saber\Projects\ETA\ProjectFront\Web_App\login.html" />
/// <reference path="D:\M-Saber\Projects\ETA\ProjectFront\Web_App\login.html" />
var myApp = angular.module('aqar',
  ['ui.router',
    'ngMaterial',
    'ngMessages',
    'lfNgMdFileInput' 
  ]);
//myApp.config(config);
var sideBar = "";
var userEmail = "";
myApp.run(function ($rootScope, authService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!authService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (authService.isAuthenticated()) {
        // user is not allowed
        //   $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        // $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });
});

myApp.controller('homeCtrl', homeCtrl);

myApp.run(function ($rootScope, $http) {
  $rootScope.globalFoo = function () {
    alert("I'm global foo!");
  };
  $rootScope.toJavaScriptDate = function (value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getDate() + "/" + dt.getMonth() + 1) + "/" + dt.getFullYear() + "    " + dt.getHours() + " : " + dt.getMinutes();
  }
  $rootScope.CountUnApprovedProperty = function () {
    $http.post("http://localhost:1717/ProjectFront/CountUnApprovedProperty")
      .success(function (data) {
        return data;
      }).error(function (msg) {
        console.log(msg);
      });
  }
});
myApp.factory('publicService', function () {
  return {
    foo: function () {

      return "";

      // alert("I'm foo!");

    }

  };
});
myApp.constant('USER_ROLES', {
  All: '*',
  Admin: 'Admin',
  Editor: 'Editor',
  SuperAdmin: 'SuperAdmin'
});

myApp.value('currentUserRole', '');

myApp.value('currentUserData', '');

myApp.constant("constantCurrentUser", '');
myApp.constant("constantSearchOption", '');

myApp.service('session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
});
var ddd = '';
myApp.factory('authService', function ($http, session, $window) {

  var userRole = $window.localStorage.getItem('userRole');

  var authService = {};
  currentUserRole = userRole;


  authService.isAuthenticated = function () {
    return !!session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authorizedRoles.indexOf(userRole) !== -1);
  };

  return authService;
});

myApp.service('navAuthService', function () {

  var user = {};
  user.role = currentUserRole;
  return {
    getUser: function () {
      return user;
    },
    generateRoleData: function () {
      /*this is resolved before the router loads the view and model*/
      /*...*/
    }
  }
});

myApp.directive('restrict', function (navAuthService) {
  return {
    restrict: 'A',
    prioriry: 100000,
    scope: false,
    link: function () {
      // alert('ergo sum!');
    },
    compile: function (element, attr, linker) {
      var accessDenied = true;
      var user = navAuthService.getUser();

      var attributes = attr.access.split(" ");
      for (var i in attributes) {
        if (user.role == attributes[i]) {
          accessDenied = false;
        }
      }


      if (accessDenied) {
        element.children().remove();
        element.remove();
      }

    }
  }
});

function homeCtrl($scope, $window, $location, publicService, $http, USER_ROLES,
  constantSearchOption, authService, constantCurrentUser, currentUserRole, CustomerService) {
  var userId = $window.localStorage.getItem('userId');
  // userData();
  var vm = this;
  vm.currentLang = 'en';
  vm.searchOptionArray = {};
  vm.TopTenList = {};

  getSearchOption();
  getTopTen(vm.currentLang);
  function userData() {
    this.returnCount = "";
    $http.post("http://localhost:1717/ProjectFront/GetUserDataById", { "userId": userId })
   .success(function (data) {
     constantCurrentUser = data;
     $scope.AdminUserName = constantCurrentUser.FirstName + " " + constantCurrentUser.LastName;
     $scope.AdminUserRole = constantCurrentUser.Role;
     $scope.AdminEmail = constantCurrentUser.Email;
     return data;
   }).error(function (msg) {
     console.log(msg);
   });
  }

  $scope.searchEntity = {
    City: '',
    Square: '',
    ContractType: '1',
    PropertyType: '',
    PriceRange: '',
    SpaceRange: ''
  };

  $scope.QuickSearch = function () {
    alert($scope.searchEntity.City + "/" + $scope.searchEntity.Square + "/" + $scope.searchEntity.ContractType);

    $window.localStorage.setItem('ContractType', $scope.searchEntity.ContractType);
    $window.localStorage.setItem('City', $scope.searchEntity.City);
    $window.localStorage.setItem('Square', $scope.searchEntity.Square);
    $window.localStorage.setItem('PropertyType', $scope.searchEntity.ContractType);
    $window.localStorage.setItem('PriceRange', $scope.searchEntity.PriceRange);
    $window.localStorage.setItem('SpaceRange', $scope.searchEntity.SpaceRange);
    $window.location.href = 'SearchDetails.html';

  };
  $scope.setSelected = function (idSelectedVote) {
     
  }
  $scope.ShowId = function (event) { 
    $scope.searchEntity.ContractType = event.target.id;
  };
  $scope.countries = CustomerService.getCountry();
  $scope.$watch('searchEntity.City', function (newVal) {
    //$scope.getCountryStates();
    if (newVal == "") $scope.sates = [];
  });

  $scope.getCountryStates = function () {
    getSqaureByCityId(vm.currentLang, $scope.searchEntity.City);
    function successCallbackSquare(response) {
      var fillData = [{}];

      for (var i = 0; i < response.data.length; i++) {
        fillData.push({
          "Id": response.data[i].Id,
          "Title": response.data[i].Title
        });
      }
      fillData = fillData.slice(1);
      if (fillData == null) {
        $scope.sates = [];
      }
      else
        $scope.sates = fillData;
      //success code
    }
    function errorCallbackSquare(error) {
      //error code
    }
    function getSqaureByCityId(lang, cityId) {
      $http({
        method: 'POST',
        url: 'http://localhost:1718/ProjectFront/SqaureByCity',
        data: { 'lang': lang, 'cityId': cityId }
      }).then(successCallbackSquare, errorCallbackSquare);
    }

    //$scope.sates = CustomerService.getCountryState($scope.searchEntity.City);
    $scope.cities = [];
  }

  $scope.getStateCities = function () {
    debugger;
    $scope.cities = CustomerService.getStateCity($scope.searchEntity.Square);
  }

  function successCallback(response) {
    var fillData = [{}];

    for (var i = 0; i < response.data.length; i++) {
      fillData.push({
        "City": response.data[i].City,
        "ContractType": response.data[i].ContractType,
        "Property": response.data[i].Property,
        "PriceRange": response.data[i].PriceRange,
        "SpaceRange": response.data[i].SpaceRange,

      });
    }
    fillData = fillData.slice(1);


    vm.searchOptionArray = fillData;
    //success code
  }
  function errorCallback(error) {
    //error code
  }
  function getSearchOption() {
    $http({
      method: 'POST',
      url: 'http://localhost:1718/ProjectFront/SearchOption',
      data: { 'lang': vm.currentLang }
    }).then(successCallback, errorCallback);
  }



  function successCallbackTopTen(response) {
    var fillData = [{}];

    for (var i = 0; i < response.data.length; i++) {
      fillData.push({
        "Id": response.data[i].Id,
        "Title": response.data[i].Title,
        "ContractType": response.data[i].ContractType,
        "PropertyType": response.data[i].PropertyType,
        "Address": response.data[i].Address,
        "Space": response.data[i].Space,
        "Image": response.data[i].Image,
        "Price": response.data[i].Price,
        "Currency": response.data[i].Currency,
        "BedroomNo": response.data[i].BedroomNo,
        "ReceptionNo": response.data[i].ReceptionNo,
        "Floor": response.data[i].Floor,
        "PropertyId": response.data[i].PropertyId,
        "City": response.data[i].City,
        "Square": response.data[i].Square,

      });
    }
    fillData = fillData.slice(1);

    vm.TopTenList = fillData;
    console.log(vm.TopTenList);
    //success code
  }
  function errorCallbackTopTen(error) {
    //error code
  }
  function getTopTen(lang) {
    $http({
      method: 'POST',
      url: 'http://localhost:1718/ProjectFront/GetTopTen',
      data: { 'lang': lang }
    }).then(successCallbackTopTen, errorCallbackTopTen);
  }


  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = authService.isAuthorized;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  //$scope.AdminUserName = sideBar;
  //$scope.AdminEmail = userEmail;
  $scope.UserId = "1";

  $scope.URL = "http://localhost:1717/ProjectFront/";
  $scope.MainURL = "http://localhost:1717/";
  $scope.setRoute = function (route) {
    $location.path(route);
  };

}

myApp.factory("CustomerService", ['$filter', '$http', function ($filter, $http) {
  var service = {};
  var vm = this;
  vm.SquareList = {};
  var countrylist = [];

  function successCallback(response) {
    var fillData = [{}];

    for (var i = 0; i < response.data.length; i++) {
      fillData.push({
        "Id": response.data[i].Id,
        "Title": response.data[i].Title
      });
    }
    fillData = fillData.slice(1);

    statelist = fillData;
    //success code
  }
  function errorCallback(error) {
    //error code
  }
  function getSqaureByCityId(lang, cityId) {
    $http({
      method: 'POST',
      url: 'http://localhost:1718/ProjectFront/SqaureByCity',
      data: { 'lang': lang, 'cityId': cityId }
    }).then(successCallback, errorCallback);
  }




  service.getCountry = function () {
    return countrylist;
  };

  service.getCountryState = function (countryId) {
    getSqaureByCityId('en', countryId);
    var states = statelist;
    //var states = ($filter('filter')(statelist,
    //  { countryId: countryId }));
    return states;
  };

  return service;


}]);

myApp.controller("Ctrl", function ($scope) {
  $scope.probs = [
      {
        p: .1
      }, {
        p: .5
      }, {
        p: .4
      }
  ];
  return $scope.otherProbs = [3, 3, 4];
});



myApp.directive('nav', function () {
  return {
    restrict: 'A',
    templateUrl: '/Scripts/App/modules/Directives/main.html'
  };
}
    );
myApp.directive('side', function () {
  return {
    restrict: 'A',
    templateUrl: '/Scripts/App/modules/Directives/side-menu.html'
  };
}
);

myApp.directive('footer', function () {
  return {
    restrict: 'A',
    templateUrl: '/Scripts/App/modules/Directives/footer.html'
  };
}
);


/*Range Slider*/

myApp.directive("slider", function ($document, $timeout) {
  return {
    restrict: "E",
    scope: {
      model: "=",
      property: "@",
      step: "@"
    },
    replace: true,
    template: "<div class=\"slider-control\">\n<div class=\"slider\">\n</div>\n</div>",
    link: function (scope, element, attrs) {
      var fn, getP, handles, i, j, len, mv, pTotal, ref, setP, step, updatePositions;
      element = element.children();
      element.css('position', 'relative');
      handles = [];
      pTotal = 0;
      step = function () {
        if ((scope.step != null)) {
          return parseFloat(scope.step);
        } else {
          return 0;
        }
      };
      getP = function (i) {
        if (scope.property != null) {
          return scope.model[i][scope.property];
        } else {
          return scope.model[i];
        }
      };
      setP = function (i, p) {
        var s;
        s = step();
        if (s > 0) {
          p = Math.round(p / s) * s;
        }
        if (scope.property != null) {
          return scope.model[i][scope.property] = p;
        } else {
          return scope.model[i] = p;
        }
      };
      updatePositions = function () {
        var handle, i, j, len, p, pRunningTotal, results, x;
        pTotal = scope.model.reduce(function (sum, item, i) {
          return sum + getP(i);
        }, 0);
        pRunningTotal = 0;
        results = [];
        for (i = j = 0, len = handles.length; j < len; i = ++j) {
          handle = handles[i];
          p = getP(i);
          pRunningTotal += p;
          x = pRunningTotal / pTotal * 100;
          results.push(handle.css({
            left: x + "%",
            top: "-" + handle.prop("clientHeight") / 2 + "px"
          }));
        }
        return results;
      };
      ref = scope.model;
      fn = function (mv, i) {
        var handle, startPleft, startPright, startX;
        if (i === scope.model.length - 1) {
          return;
        }
        handle = angular.element('<div class="slider-handle text-center"> <span>2,000</span></div>');
        handle.css("position", "absolute");
        handles.push(handle);
        element.append(handle);
        startX = 0;
        startPleft = startPright = 0;
        return handle.on("mousedown", function (event) {
          var mousemove, mouseup;
          mousemove = (function (_this) {
            return function (event) {
              return scope.$apply(function () {
                var dp;
                dp = (event.screenX - startX) / element.prop("clientWidth") * pTotal;
                if (dp < -startPleft || dp > startPright) {
                  return;
                }
                setP(i, startPleft + dp);
                setP(i + 1, startPright - dp);
                return updatePositions();
              });
            };
          })(this);
          mouseup = function () {
            $document.unbind("mousemove", mousemove);
            return $document.unbind("mouseup", mouseup);
          };
          event.preventDefault();
          startX = event.screenX;
          startPleft = getP(i);
          startPright = getP(i + 1);
          $document.on("mousemove", mousemove);
          return $document.on("mouseup", mouseup);
        });
      };
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        mv = ref[i];
        fn(mv, i);
      }
      return scope.$watch("model", updatePositions, true);
    }
  };
});

myApp.controller("Ctrl", function ($scope) {
  $scope.probs = [
      {
        p: .1
      }, {
        p: .5
      }, {
        p: .4
      }
  ];
  return $scope.otherProbs = [3, 3, 4];
});

/*Range Slider*/



/*Drag Files*/
myApp.config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
  $compileProvider.debugInfoEnabled(false);
  // $mdThemingProvider.theme('default')
}]);

myApp.controller('DemoController', function ($scope, $timeout) {
  $scope.$watch('files02.length', function (newVal, oldVal) {
    console.log($scope.files02);
  });
  $scope.optoin08 = {
    "browseIconCls": "myBrowse",
    "removeIconCls": "myRemove",
    "captionIconCls": "myCaption",
    "unknowIconCls": "myUnknow"
  };
  $scope.onFileClick = function (obj, idx) {
    console.log(obj);
  };
  $scope.onFileRemove = function (obj, idx) {
    console.log(obj);
  };

  $timeout(
      function () {
        $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.jpg', 'sample.jpg', 'image');
        $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp4', 'sample.mp4', 'video');
        $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp3', 'sample.mp3', 'audio');
        $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.pdf', 'sample.pdf', 'other');
      }
  )


});

/*Drag Files*/