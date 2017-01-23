function config($stateProvider, $urlRouterProvider) {
  // when there is an empty route, redirect to /index   
  $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "Index.html"
    })
    .state('home', {
      url: "/home",
      templateUrl: "Home.html"

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
       templateUrl: "/Scripts/App/ContactUs/ContactUs.html"
     })
    .state('city', {
      url: "/city",
      templateUrl: "/Scripts/App/City/City.html"
    })
    .state('square', {
      url: "/square",
      templateUrl: "/Scripts/App/Square/Square.html"
    })
    .state('propertyadmin', {
      url: "/property",
      templateUrl: "/Scripts/App/Property/PropertyAdmin.html"
    })
    .state('propertyformadmin', {
      url: "/propertyform",
      templateUrl: "/Scripts/App/Property/PropertyFormAdmin.html"
    })
    .state('propertyuser', {
      url: "/propertyuser",
      templateUrl: "/Scripts/App/Property/PropertyUser.html"
    })
    .state('propertyformuser', {
      url: "/propertyformuser",
      templateUrl: "/Scripts/App/Property/PropertyFormUser.html"
    })
      .state('property-details', {
        url: '/PropertyDetails:property_Id',
        templateUrl: '/Scripts/App/Property/PropertyDetails.html',
        controller: function ($scope, $stateParams) {
          $scope.property_Id = $stateParams.property_Id;
        }
      })
  .state('items-details', {
    url: '/items-details/:propId',
    templateUrl: "/Scripts/App/Property/PropertyDetails.html", 
    controller: function ($scope, $stateParams) {
      $scope.property_Id = $stateParams.propId;
    },
    // default uri params
    params: {
      propId: 'all',
      page: 1
    }
  })
    .state('contactformpage', {
      url: "/contactformpage",
      templateUrl: "/Scripts/App/ContactForm/ContactForm.html"

  })
    .state('reservationpage', {
      url: "/reservationpage",
      templateUrl: "/Scripts/App/Reservation/Reservation.html"

  })
    .state('photosessionpage', {
      url: "/photosessionpage",
      templateUrl: "/Scripts/App/PhotoSession/PhotoSession.html"

  })
    .state('important', {
      url: "/important",
      templateUrl: "/Scripts/App/ImportantNumber/Important.html"

    })
    .state('category', {
      url: "/category",
      templateUrl: "/Scripts/App/Category/Category.html"

    })
    .state('region', {
      url: "/region",
      templateUrl: "/Scripts/App/Region/Region.html"

    })
   .state('usefullink', {
     url: "/usefullink",
     templateUrl: "/Scripts/App/UsefulLink/UsefulLink.html"
   })

   .state('language', {
     url: "/language",
     templateUrl: "/Scripts/App/Language/Language.html"
   })
   .state('moderation', {
     url: "/moderation",
     templateUrl: "/Scripts/App/Moderation/List.html"
   })
   .state('moderationreject', {
     url: "/moderationreject",
     templateUrl: "/Scripts/App/Moderation/ListReject.html"
   })
   .state('moderationapprove', {
     url: "/moderationapprove",
     templateUrl: "/Scripts/App/Moderation/ListApprove.html"
   })
   .state('attraction', {
     url: "/attraction",
     templateUrl: "/Scripts/App/Attraction/attraction.html"
   })
   .state('attractiongallery', {
     url: "/attractiongallery",
     templateUrl: "/Scripts/App/Attraction/AttractionGallery.html"
   })
   .state('selfie', {
     url: "/selfie",
     templateUrl: "/Scripts/App/Selfie/Selfie.html"
   })
   .state('panoramic', {
     url: "/panoramic",
     templateUrl: "/Scripts/App/Panoramic/Panoramic.html"
   })
   .state('object3d', {
     url: "/3D",
     templateUrl: "/Scripts/App/3D/Object3D.html"
   })
   .state('event', {
     url: "/event",
     templateUrl: "/Scripts/App/Events/Events.html"
   })
   .state('user', {
     url: "/user",
     templateUrl: "/Scripts/App/User/User.html"
   })
   .state('report', {
     url: "/report",
     templateUrl: "/Scripts/App/Report/Report.html"
   })
   // .state('topten', {
     // url: "/topten",
     // templateUrl: "/Scripts/App/TopTen/TopTen.html"
   // })
   .state('topten1', {
     url: "/topten",
     templateUrl: "/Scripts/App/TopTen/TopTen - Copy.html"
   })
   .state('image', {
     url: "/image",
     templateUrl: "/Scripts/App/Image/Image.html"
   })
   .state('video', {
     url: "/video",
     templateUrl: "/Scripts/App/Video/Video.html"
   })
   .state('qrcode', {
     url: "/qrcode",
     templateUrl: "/Scripts/App/QrCode/QrCode.html"
   })
   .state('changepassword', {
     url: "/changepassword",
     templateUrl: "/Scripts/App/ChangePassword/ChangePassword.html"
   })
     .state('notification', {
       url: "/notification",
       templateUrl: "/Scripts/App/Notification/Notification.html"
     })
   .state('usernationlty', {
     url: "/usernationlty",
     templateUrl: "/Scripts/App/Reports/UserNationalty/UsersNationalty.html"
   })

   .state('3d', {
     url: "/3d",
     templateUrl: "/Scripts/App/Reports/3D/3D.html"
   })

   .state('qrstatistics', {
     url: "/qrstatistics",
     templateUrl: "/Scripts/App/Reports/QrCode/QrCode.html"
   })
   .state('langstatistics', {
     url: "/langstatistics",
     templateUrl: "/Scripts/App/Reports/Language/Language.html"
   })
   .state('attratestatistics', {
     url: "/attratestatistics",
     templateUrl: "/Scripts/App/Reports/Attraction/Attraction.html"
   })
   .state('toptenattratestatistics', {
     url: "/toptenattratestatistics",
     templateUrl: "/Scripts/App/Reports/Attraction/AttractionTopTen.html"
   })
   .state('useragestatistics', {
     url: "/useragestatistics",
     templateUrl: "/Scripts/App/Reports/UserAge/UserAge.html"
   })
   .state('selfiestatistics', {
     url: "/selfiestatistics",
     templateUrl: "/Scripts/App/Reports/Selfie/Selfie.html"
   })
   .state('notificationstatistics', {
     url: "/notificationstatistics",
     templateUrl: "/Scripts/App/Reports/Notification/Notification.html"
   })
   .state('violationstatistics', {
     url: "/violationstatistics",
     templateUrl: "/Scripts/App/Reports/Violation/Violation.html"
   })
  // .otherwise('/Scripts/App/LogIn/LogIn.html')

  ;

  //$urlRouterProvider.when('', '/index');
  $urlRouterProvider.otherwise('/home');


}
