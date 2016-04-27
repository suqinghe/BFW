angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  /*
  公司相关
  */
  .state('tab.company',{
    url:'/company',
    views:{
     'tab-dash': {
       templateUrl:'templates/company/index.html',
       controller:'CompanyCtrl'
     }
   }
 })
  .state('tab.companydetail',{
    url:'/company/:companyId',
    views:{
      'tab-dash':{
        templateUrl:'templates/company/detail.html',
        controller:'CompanyDetailCtrl'
      }
    }
  })
    /*
  项目相关
  */
  .state('tab.project',{
    url:'/project',
    views:{
     'tab-dash': {
       templateUrl:'templates/project/index.html',
       controller:'ProjectCtrl'
     }
   }
 })
  .state('tab.projectdetail',{
    url:'/project/:projectId',
    views:{
      'tab-dash':{
        templateUrl:'templates/project/detail.html',
        controller:'ProjectDetailCtrl'
      }
    }
  })
  .state('tab.addproject',{
    url:'/addproject',
    views:{
      'tab-dash':{
        templateUrl:'templates/project/publish.html',
        controller:'ProjectCtrl'
      }
    }
  })
  .state('tab.myproject',{
    url:'/myproject',
    views:{
      'tab-dash':{
        templateUrl:'templates/project/myproject.html',
        controller:'ProjectCtrl'
      }
    }
  })

  
     /*
  劳务相关
  */
  .state('tab.laborer',{
    url:'/laborer',
    views:{
     'tab-dash': {
       templateUrl:'templates/laborer/index.html',
       controller:'LaborerCtrl'
     }
   }
 })
  .state('tab.laborerdetail',{
    url:'/laborer/:laborerId',
    views:{
      'tab-dash':{
        templateUrl:'templates/laborer/detail.html',
        controller:'LaborerDetailCtrl'
      }
    }
  })
     /*
  施工单位类型
  */
  .state('tab.teamType',{
    url:'/teamType/:parentId',
    views:{
     'tab-dash': {
       templateUrl:'templates/team/teamType_index.html',
       controller:'TeamTypeCtrl'
     }
   }
 })
  .state('tab.teamTypedetail',{
    url:'/teamType/:teamTypeId',
    views:{
      'tab-dash':{
        templateUrl:'templates/teamType/detail.html',
        controller:'TeamTypeDetailCtrl'
      }
    }
  })
  .state('tab.shop', {
    url: '/shop',
    views: {
      'tab-shop': {
        templateUrl: 'templates/tab-shop.html',
        controller: 'ShopCtrl'
      }
    }
  })
  .state('tab.product', {
    url: '/product/:productId',
    views: {
      'tab-shop': {
        templateUrl: 'templates/shop/detail.html',
        controller: 'ProductDetailCtrl'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.logout', {
    url: '/logout',
    views: {
      'tab-account': {
        templateUrl: 'templates/public/login.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.register', {
    url: '/register',
    views: {
      'tab-account': {
        templateUrl: 'templates/public/register.html',
        controller: 'AccountCtrl'
      }
    }
  }).state('tab.registercompany', {
    url: '/registercompany',
    views: {
      'tab-account': {
        templateUrl: 'templates/public/company_register.html',
        controller: 'AccountCtrl'
      }
    }
  }).state('tab.registerteam', {
    url: '/registerteam',
    views: {
      'tab-account': {
        templateUrl: 'templates/public/team_register.html',
        controller: 'AccountCtrl'
      }
    }
  }).state('tab.registerlaborer', {
    url: '/registerlaborer',
    views: {
      'tab-account': {
        templateUrl: 'templates/public/laborer_register.html',
        controller: 'AccountCtrl'
      }
    }
  })
  ;


  $urlRouterProvider.otherwise('/tab/dash');
});
