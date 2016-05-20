 var app = angular.module('starter');

 app.controller('ProjectCtrl', function($scope, $http, $state, $ionicPopup, $ionicPopover, HOST) {


   $scope.searchTypes = [{
     Key: "状态",
     Value: "status",
     Selected: true
   }, {
     Key: "角色",
     Value: "role",
     Selected: false
   }, {
     Key: "类型",
     Value: "type",
     Selected: false
   }];

   $scope.searchType = "status";

   $scope.changeType = function() {
     if ($scope.searchType == 'status') {
       $scope.tabs = [{
         Name: "全部",
         ID: 0
       }, {
         Name: "待启动",
         ID: 2
       }, {
         Name: "执行中",
         ID: 3
       }, {
         Name: "待结项",
         ID: 4
       }, {
         Name: "待验收",
         ID: 5
       }, {
         Name: "已完成",
         ID: 8
       }, {
         Name: "已评价",
         ID: 9
       }];
       $scope.GetDataByStatus("", 0);

     } else if ($scope.searchType == 'role') {
       $scope.tabs = [{
         Name: "全部",
         ID: 0
       }, {
         Name: "我发布的",
         ID: 1
       }, {
         Name: "我申请的",
         ID: 2
       }];


       $scope.GetDataByRole("", 0);

     } else if ($scope.searchType == 'type') {
       $scope.tabs = [{
         Name: "全部",
         ID: 0
       }, {
         Name: "土建工程",
         ID: 1
       }, {
         Name: "安装工程",
         ID: 2
       }, {
         Name: "装修工程",
         ID: 3
       }, {
         Name: "园林工程",
         ID: 4
       }, {
         Name: "设备工程",
         ID: 5
       }, {
         Name: "劳务工程",
         ID: 6
       }, {
         Name: "其他工程",
         ID: 7
       }];

       $scope.GetDataByType("", 0);
     }

   }

   $scope.GetDataByStatus = function(keyword, status) {
     $http.get(HOST + "api/project/getby?companyId=0&name=" + keyword + "&status=" + status, {
         cache: true
       })
       .success(function(response) {
         $scope.projects = response;
       });
   }

   $scope.GetDataByRole = function(keyword, role) {
     $http.get(HOST + "api/project/getby?companyId=0&name=" + keyword + "&role=" + role, {
         cache: true
       })
       .success(function(response) {
         $scope.projects = response;
       });
   }

   $scope.GetDataByType = function(keyword, type) {
     $http.get(HOST + "api/project/getby?companyId=0&name=" + keyword + "&type=" + type, {
         cache: true
       })
       .success(function(response) {
         $scope.projects = response;
       });
   }


   $scope.GetSimpleDataByType = function(type) {
     $scope.searchType = type;
     $scope.changeType();

     if ($scope.searchType == 'status') {
       $scope.GetDataByStatus("", 0);
     } else if ($scope.searchType == 'role') {
       $scope.GetDataByRole("", 0);
     } else if ($scope.searchType == 'type') {
       $scope.GetDataByType("", 0);
     }
   }

   $ionicPopover.fromTemplateUrl("ez-popover.html", {
       scope: $scope
     })
     .then(function(popover) {
       $scope.popover = popover;
     });
   $scope.openPopover = function($event) {
     $scope.popover.show($event);
   };
   $scope.closePopover = function() {
     $scope.popover.hide();
   };

   $scope.changeType();
 });


 app.controller('ProjectDetailCtrl', function($scope, $http, $stateParams, $ionicHistory, $ionicPopup, HOST) {
   var id = $stateParams.projectId;
   $scope.project = [];
   $http.get(HOST + "api/project/getbyid/" + id, {
       cache: true
     })
     .success(function(response) {
       $scope.project = response;
     });

   $scope.startProject = function() {
     $http.post(HOST + "api/project/StartProject/" + id)
       .success(
         function(response) {
           $ionicPopup.alert({
             title: '确认',
             template: response.Message
           });
           if (response.IsSuccessed) {
             $ionicHistory.goBack();
           }
         }
       );
   }

   $scope.applyFinancing = function() {
     $http.post(HOST + "api/project/ApplyFinancing/" + id)
       .success(
         function(response) {
           $ionicPopup.alert({
             title: '确认',
             template: response.Message
           });
           if (response.IsSuccessed) {
             $ionicHistory.goBack();
           }
         }
       );
   }
 });



app.controller('ProjectFinancingCtrl', function($scope, $http, HOST) {
  $http.get(HOST + "api/project/getby?companyId=0&name=&status=3", {
      cache: true
    })
    .success(function(response) {
      $scope.financingPrjs = response;
    });
});

