'use strict';

angular.module('starter', ['ionic', 'starter.controllers', 'ngCookies'])
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
  .constant('HOST', "http://api.szsei.com:9000/")
  .constant('CompanyID', 1)
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
      .state('tab.company', {
        url: '/company',
        views: {
          'tab-dash': {
            templateUrl: 'templates/company/index.html',
            controller: 'CompanyCtrl'
          }
        }
      })
      .state('tab.companydetail', {
        url: '/company/:companyId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/company/detail.html',
            controller: 'CompanyDetailCtrl'
          }
        }
      })
      .state('tab.project', {
        url: '/project',
        views: {
          'tab-dash': {
            templateUrl: 'templates/project/index.html',
            controller: 'ProjectCtrl'
          }
        }
      })
      .state('tab.projectfinancing', {
        url: '/projectfinancing',
        views: {
          'tab-dash': {
            templateUrl: 'templates/project/financinglist.html',
            controller: 'ProjectFinancingCtrl'
          }
        }
      })
      .state('tab.projectdetail', {
        url: '/project/:projectId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/project/detail.html',
            controller: 'ProjectDetailCtrl'
          }
        }
      })
      .state('tab.addproject', {
        url: '/addproject',
        views: {
          'tab-dash': {
            templateUrl: 'templates/project/publish.html',
            controller: 'ProjectCtrl'
          }
        }
      })

    .state('tab.labor', {
        url: '/labor',
        views: {
          'tab-dash': {
            templateUrl: 'templates/labor/index.html',
            controller: 'LaborerCtrl'
          }
        }
      })
      .state('tab.labordetail', {
        url: '/labor/:laborId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/labor/detail.html',
            controller: 'LaborerDetailCtrl'
          }
        }
      })
      .state('tab.shop', {
        url: '/shop',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-shop.html',
            controller: 'ShopCtrl'
          }
        }
      })
      .state('tab.product', {
        url: '/product/:productId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/shop/detail.html',
            controller: 'ProductDetailCtrl'
          }
        }
      }).state('tab.inquiry', {
        url: '/inquiry/:productId/:productName',
        views: {
          'tab-dash': {
            templateUrl: 'templates/shop/Inquiry.html',
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
      .state('tab.about', {
        url: '/about',
        views: {
          'tab-account': {
            templateUrl: 'templates/account/about.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.feedback', {
        url: '/feedback',
        views: {
          'tab-account': {
            templateUrl: 'templates/account/feedback.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.accountinfo', {
        url: '/accountinfo',
        views: {
          'tab-account': {
            templateUrl: 'templates/account/accountinfo.html',
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
      .state('login', {
        url: '/login',
        templateUrl: 'templates/public/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/public/register.html',
        controller: 'AccountCtrl'
      })
      .state('registercompany', {
        url: '/registercompany',
        templateUrl: 'templates/public/company_register.html',
        controller: 'AccountCtrl'
      }).state('registerlabor', {
        url: '/registerlabor',
        templateUrl: 'templates/public/labor_register.html',
        controller: 'AccountCtrl'
      })

    .state('tab.financing', {
      url: '/financing',
      views: {
        'tab-financing': {
          templateUrl: 'templates/financing/index.html',
          controller: 'FinancingCtrl'
        }
      }
    })


    // 工程相关

    .state('tab.solution', {
      url: '/solution',
      views: {
        'tab-dash': {
          templateUrl: 'templates/solution/index.html',
          controller: 'SolutionCtrl'
        }
      }
    })

    .state('tab.solutiondetail', {
        url: '/solution/:solutionId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/solution/detail.html',
            controller: 'SolutionDetailCtrl'
          }
        }
      })
      .state('tab.addsolution', {
        url: '/addsolution',
        views: {
          'tab-dash': {
            templateUrl: 'templates/solution/create.html',
            controller: 'SolutionCtrl'
          }
        }
      })
      .state('tab.splitSolution', {
        url: '/splitSolution/:solutionId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/solution/splitSolution.html',
            controller: 'SplitSolutionCtrl'
          }
        }
      })
      .state('tab.splitPorject', {
        url: '/splitProject/:solutionId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/solution/splitProject.html',
            controller: 'SplitProjectCtrl'
          }
        }
      })
      .state('tab.MyData', {
        url: '/MyData',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/index.html',
            controller: 'MyDataCtrl'
          }
        }
      })
      .state('tab.MySolution', {
        url: '/solution/:CompanyID/:Status',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/solutionIndex.html',
            controller: 'MySolutionCtrl'
          }
        }
      })
      .state('tab.mySolutiondetail', {
        url: '/mySolution/:solutionId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/solutionDetail.html',
            controller: 'MySolutionDetailCtrl'
          }
        }
      })
      .state('tab.MyProject', {
        url: '/project/:CompanyID/:Status',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/projectIndex.html',
            controller: 'MyProjectCtrl'
          }
        }
      }).state('tab.generalReceivable', {
        url: '/generalReceivable/:ProjectId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/generalReceivable.html',
            controller: 'GeneralReceivableCtrl'
          }
        }
      }).state('tab.MyBid', {
        url: '/bid/:CompanyID/:Status',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/bidIndex.html',
            controller: 'MyBidCtrl'
          }
        }
      }).state('tab.bidDetail', {
        url: '/bid/:bidId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/bidDetail.html',
            controller: 'MyBidDetailCtrl'
          }
        }
      }).state('tab.bidSign', {
        url: '/bidSign/:bidId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/bidSign.html',
            controller: 'MyBidSignCtrl'
          }
        }
      }).state('tab.MyReceiables', {
        url: '/receivables/:CompanyID/:Status',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/receivablesIndex.html',
            controller: 'MyReceivablesCtrl'
          }
        }
      }).state('tab.receivableDetail', {
        url: '/receivable/:receivableId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/receivableDetail.html',
            controller: 'MyReceivableDetailCtrl'
          }
        }
      }).state('tab.MyInquiry', {
        url: '/inquiries/:CompanyID/:Status',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/inquiryIndex.html',
            controller: 'MyInquiryCtrl'
          }
        }
      }).state('tab.inquiryDetail', {
        url: '/inquiryDetail/:inquiryId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/inquiryDetail.html',
            controller: 'MyInquiryDetailCtrl'
          }
        }
      }).state('tab.MyQuote', {
        url: '/quotes/:CompanyID/:Status',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/quoteIndex.html',
            controller: 'MyQuoteCtrl'
          }
        }
      }).state('tab.quoteDetail', {
        url: '/quoteDetail/:quoteId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/quoteDetail.html',
            controller: 'MyQuoteDetailCtrl'
          }
        }
      }).state('tab.MyFinancing', {
        url: '/myFinancing/:CompanyID/:Status',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/financingIndex.html',
            controller: 'MyFinancingCtrl'
          }
        }
      }).state('tab.financingDetail', {
        url: '/myFinancingDetail/:financingId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/financingDetail.html',
            controller: 'MyFinancingDetailCtrl'
          }
        }
      }).state('tab.LoanRecords', {
        url: '/myLoanRecords/:financingId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/loanRecords.html',
            controller: 'MyLoanRecordCtrl'
          }
        }
      })
      .state('tab.RepaymentRecords', {
        url: '/myRepaymnetRecords/:financingId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/MyData/repaymentRecords.html',
            controller: 'MyRepaymentRecordCtrl'
          }
        }
      });


    // $urlRouterProvider.otherwise('/login');

    $urlRouterProvider.otherwise('/tab/dash');
  });