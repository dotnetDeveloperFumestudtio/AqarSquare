
(function () {
  'use strict';

  function configtranslate($translateProvider) {

    $translateProvider.preferredLanguage('en');
    $translateProvider.translations('ar', {
       LOGIN: 'صفحه الدخول',
      SURVEY: 'الرسائل ',
      USER: 'المستخدمين',
      ADDNEW: 'إضافه جديد',
      SEARCH: 'بحث',
      ID: 'مسلسل',
      TITLE: 'العنوان',
      CONTENT: 'الموضوع',
      DATETIME: 'التاريخ' ,
      USERNAME: 'اسم المستخدم',
      USERIP: 'الرقم',
      COMPUTERNAME: 'اسم الجهاز',
      CONNECTED: 'متصل',
      CONNETCTEDDATE: 'تاريخ الاتصال',
      DISCONNETCTEDDATE: 'تاريخ عدم الاتصال'

    });
     

    $translateProvider.translations('en', {
      LOGIN: 'Log in',
      SURVEY: 'Messages',
      USER: 'Users',
      ADDNEW: 'Add New',
      SEARCH: 'Search',
      ID: 'Id',
      TITLE: 'Title',
      CONTENT: 'Coontent',
      DATETIME: 'Date',
      USERNAME: 'Username',
      USERIP: 'User Ip',
      COMPUTERNAME: 'Computer Name',
      CONNECTED: 'Connected',
      CONNETCTEDDATE: 'Connected Date',
      DISCONNETCTEDDATE: 'DisConnected Date'

    });

  }

  angular
      .module('angapp')
      .config(configtranslate) ;

})();