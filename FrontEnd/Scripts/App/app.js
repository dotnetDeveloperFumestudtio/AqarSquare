/// <reference path="modules/Directives/footer.html" />
/// <reference path="modules/Directives/footer.html" />
/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
/// <reference path="D:\M-Saber\Projects\ETA\Project\Web_App\login.html" />
var myApp = angular.module('aqarapp',
  ['ui.router',
    'ngCookies',
    'ngFileUpload',
    'angular-simple-table',
    'ngMap',
    'ngStorage',
    'changePasswordapp',
    'AngApp',
    'ngMessages',
    'Homeapp',
    'loginapplication',
    'contactapp',
    'cityapp',
    'squareapp',
    'userpropertyapp',
    'adminpropertyapp',
    'adminpropertyformapp',
    'detailspropertyapp',
    'contactformapp',
    'reservationapp',
    'PhotoSessionapp',
     'Usersapp',
     'UsersTenantapp',
     'PropertyTypeapp',
     'ContractTypeapp',
    'userapp',
    'ui.sortable',
    'Notificationapp',
    'ui',
    'ngAnimate',
    'ui.bootstrap',
    'moment-picker',
    'angularjs-dropdown-multiselect',
    'cgNotify',
    'blockUI',
    'angular-loading-bar',
    'pascalprecht.translate']);
myApp.config(config);
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
myApp.config([
  'cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.latencyThreshold = 500;
    //  cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

  }
]);

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
    $http.post("http://localhost:1717/Project/CountUnApprovedProperty")
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

function homeCtrl($scope, $window, $location, publicService, $http, USER_ROLES, authService, constantCurrentUser, currentUserRole) {
  var userId = $window.localStorage.getItem('userId');
  userData();
  function userData() {
    this.returnCount = "";
    $http.post("http://localhost:1717/Project/GetUserDataById", { "userId": userId })
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

  //  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = authService.isAuthorized;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.callCountUnApproved = function () {
    // $scope.CountunApproved1 = publicService.foo();
    this.returnCount = "";
    $http.post("http://localhost:1717/Project/CountUnApprovedProperty")
   .success(function (data) {
     $scope.CountunApproved1 = data;

     return data;
   }).error(function (msg) {
     console.log(msg);
   });
  }
  $scope.callCountUnApproved();
  //$scope.AdminUserName = sideBar;
  //$scope.AdminEmail = userEmail;
  $scope.UserId = "1";

  $scope.URL = "http://localhost:1717/Project/";
  $scope.MainURL = "http://localhost:1717/";
  $scope.setRoute = function (route) {
    $location.path(route);
  };

}

app.directive('nav', function () {
  return {
    restrict: 'A',
    templateUrl: 'Scripts/App/modules/Directives/main.html'
  };
}
    );
app.directive('side', function () {
  return {
    restrict: 'A',
    templateUrl: 'Scripts/App/modules/Directives/side-menu.html'
  };
}
);

app.directive('footer', function () {
  return {
    restrict: 'A',
    templateUrl: '/Scripts/App/modules/Directives/footer.html'
  };
}
); 
/*Range Slider*/

app.directive("slider", function ($document, $timeout) {
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

app.controller("Ctrl", function ($scope) {
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

