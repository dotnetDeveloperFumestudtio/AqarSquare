function config($stateProvider, $urlRouterProvider, USER_ROLES) {
  // when there is an empty route, redirect to /index   
  $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "Index.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor] 
      }
    })
    .state('home', {
      url: "/home",
      templateUrl: "Home.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]
      }
    })
    .state('login', {
      url: "/login",
      templateUrl: "login.html"

    })
     .state('logout', {
       url: "/login",
       controller: "LogoutController",
       templateUrl: "login.html"

     })
     .state('contactUs', {
       url: "/contactUspage",
       templateUrl: "/Scripts/App/ContactUs/ContactUs.html",
       data: {
         authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

       }
     })
    .state('city', {
      url: "/city",
      templateUrl: "/Scripts/App/City/City.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]
      }
    })
    .state('square', {
      url: "/square",
      templateUrl: "/Scripts/App/Square/Square.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]
      }
    })
    .state('propertyadmin', {
      url: "/property",
      templateUrl: "/Scripts/App/Property/PropertyAdmin.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]
      }
    })
    .state('propertyformadmin', {
      url: "/propertyform",
      templateUrl: "/Scripts/App/Property/PropertyFormAdmin.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]
      }
    })
    .state('propertyuser', {
      url: "/propertyuser",
      templateUrl: "/Scripts/App/Property/PropertyUser.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin ]
      }
    })
    .state('propertyformuser', {
      url: "/propertyformuser",
      templateUrl: "/Scripts/App/Property/PropertyFormUser.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

      }
    })
      .state('property-details', {
        url: '/PropertyDetails:property_Id',
        templateUrl: '/Scripts/App/Property/PropertyDetails.html',
        controller: function ($scope, $stateParams) {
          $scope.property_Id = $stateParams.property_Id;
        },
        data: {
          authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]
        }
      })
  .state('items-details', {
    url: '/items-details/:propId',
    templateUrl: "/Scripts/App/Property/PropertyDetails.html", 
    controller: function ($scope, $stateParams) {
      $scope.property_Id = $stateParams.propId;
    },
    data: {
      authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

    },
    // default uri params
    params: {
      propId: 'all',
      page: 1
    }
  })
    .state('contactformpage', {
      url: "/contactformpage",
      templateUrl: "/Scripts/App/ContactForm/ContactForm.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

      }

  })
    .state('reservationpage', {
      url: "/reservationpage",
      templateUrl: "/Scripts/App/Reservation/Reservation.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]


      }

  })
    .state('photosessionpage', {
      url: "/photosessionpage",
      templateUrl: "/Scripts/App/PhotoSession/PhotoSession.html",
      data: {
        authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin, USER_ROLES.Editor]


      }
    })
   .state('user', {
     url: "/user",
     templateUrl: "/Scripts/App/User/User.html",
     data: {
       authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

     }
   })
   .state('tenantUser', {
     url: "/tenantuser",
     templateUrl: "/Scripts/App/TenantUser/TenantUser.html",
     data: {
       authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

     }
   })
   .state('propertytype', {
     url: "/propertytype",
     templateUrl: "/Scripts/App/PropertyType/PropertyType.html",
     data: {
       authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

     }
   })
   .state('contracttype', {
     url: "/contracttype",
     templateUrl: "/Scripts/App/ContractType/ContractType.html",
     data: {
       authorizedRoles: [USER_ROLES.SuperAdmin, USER_ROLES.Admin]

     }
   }) 
   .state('changepassword', {
     url: "/changepassword",
     templateUrl: "/Scripts/App/ChangePassword/ChangePassword.html"
   })
     .state('notification', {
       url: "/notification",
       templateUrl: "/Scripts/App/Notification/Notification.html"
     })
     

  ;

  //$urlRouterProvider.when('', '/index');
  $urlRouterProvider.otherwise('/home');


}
