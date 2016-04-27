angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope) {})
.controller('ShopCtrl', function($scope, products) {
  $scope.products = products.all();
  $scope.remove = function(product) {
    products.remove(product);
  };
})
.controller('ProductDetailCtrl', function($scope, $stateParams, products) {
  $scope.product = products.get($stateParams.productId);
})
.controller('AccountCtrl', function($scope,$http, $state, $ionicPopup) {

  $scope.login = function(){

  }

  $scope.register = function(){
    $state.go('tab.register', {});
  }


  $scope.company  = {"Address":"深圳市南山区科技41路","Province":"广东","City":"深圳","Area":"南山区","Street":"西丽街道","StartDate":"2016-04-27 00:00:00","EndDate":"2018-12-03 00:00:00","RecruitEndDate":"2018-06-15 00:00:00","Salary":6452.0,"RecruitType":"点工","TotalPrice":"73万","Description":"项目描述：………………","LaborerRequirement":"员工承诺要求","Status":"待审核","Name":"深圳市建筑工程第92号","CompanyName":"深圳市建筑公司第76分公司","Principal":"测试姓名871","Mobile":"13791923883","Login":null,"Password":null,"ID":8,"No":null,"Remark":"备注信息：………………"};

  $scope.Types = {   "type": "select", "name": "Type",  "value": "建筑公司",   "values": [ "建筑公司", "劳务公司", "装修公司"] };

  $scope.reset_company  = function(){
    $scope.company = {};
  }
  $scope.register_company  = function(){
    alert(JSON.stringify($scope.company));

    
    $http.post("http://api.szsei.com/api/company/postadd",$scope.company)
    .success(
      function (response) {
        $ionicPopup.alert({
         title: '确认',
         template: response.Message
       });
        if(response.IsSuccessed){ 
          $state.go('tab.account', {});
        } 
      } 
      );
  }


  $scope.team  ={"TypeName":null,"TypeId":57,"Principal":"土建施工单位1","Mobile":"13512345678","Level":1,"Address":"深圳市南山区科技1路","MemberCount":88,"Login":null,"Password":null,"ID":1,"No":"694","Remark":"备注信息被征服者大批迁徙到东方。他们之中，有被俘虏的工匠，有被签发的百姓，有携家带眷的阿拉伯上层人物。当然，也有乘东西方的交通大开而自发前来的商人。这些“外来户”，大部分在中国做军士、农夫和工匠，少数人经商、传教，也有极少数做官。这些人的后裔很少再返回故地，就在这块土壤上生根了，繁衍生息，世代相传，元朝的官方文书称他们为“回回”，他们本身也以“回回”自称，一个新的民族在东方诞生了。由于历史上难以避免的融合"};

  $scope.SkillTypes = {   "type": "select", "name": "Type",  "value": "钢筋工",   "values": [ "木工", "瓦工", "钢筋工"] };

  $scope.reset_team  = function(){
    $scope.team = {};
  }
  $scope.register_team  = function(){
    alert(JSON.stringify($scope.team));

    $http.post("http://api.szsei.com/api/team/postadd",$scope.team)
    .success(
      function (response) {
        $ionicPopup.alert({
         title: '确认',
         template: response.Message
       });
        if(response.IsSuccessed){ 
          $state.go('tab.account', {});
        } 
      } 
      );
  }


  $scope.laborer  = {"Name":"测试姓名241","Tel":"13122566542","IDCard":"411916199412158156","Skills":"技能列表技能礼包","Login":"13652421525"};
  $scope.reset_laborer  = function(){
    $scope.laborer = {};
  }
  $scope.register_laborer  = function(){

   $http.post("http://api.szsei.com/api/laborer/postadd",$scope.laborer)
   .success(
    function (response) {
      $ionicPopup.alert({
       title: '确认',
       template: response.Message
     });
      if(response.IsSuccessed){ 
        $state.go('tab.account', {});
      } 
    } 
    );
 }

}) 

/*
公司管理
*/
.controller('CompanyCtrl', function($scope,$http){
  $http.get("http://api.szsei.com/api/company/getsimpledata",{ cache: true })
  .success(
    function (response) {
     $scope.companys = response;
   }
   );
})
.controller('CompanyDetailCtrl', function($scope,$http, $stateParams) {
  var id = $stateParams.companyId;
  $http.get("http://api.szsei.com/api/company/getbyid/"+id,{ cache: true })
  .success(
    function (response) {
     $scope.company = response;
   }
   );
})

/*项目管理*/
.controller('ProjectCtrl', function($scope,$http, $state,$ionicPopup){
  $http.get("http://api.szsei.com/api/project/getsimpledata",{ cache: true })
  .success(function (response) { $scope.projects = response;});

  $scope.tabs = [
  { title:'待签约', content:'待签约', active:'active' },
  { title:'待审核', content:'待签约' },
  { title:'待付款', content:'待付款' },
  { title:'待结项', content:'待结项' },
  { title:'待验收', content:'待验收' },
  { title:'待评价', content:'待评价' }
  ];



  $scope.myProjects = $scope.projects;

  $scope.Types = {   "type": "select", "name": "RecruitType",  "value": "点包",   "values": [ "点包", "点工", "其他"] };

  $scope.project = {"Address":"深圳市南山区科技47路","Province":"广东","City":"深圳","Area":"南山区","Street":"西丽街道","StartDate":"2016-03-22 00:00:00","EndDate":"2016-03-27 00:00:00","RecruitEndDate":"2018-10-10 00:00:00","Salary":10362.0,"RecruitType":"点工","TotalPrice":"190万","Description":"项目描述：………………","LaborerRequirement":"员工承诺要求","Status":"已发布","Name":"深圳市建筑工程第55号","CompanyName":"深圳市建筑公司第61分公司","Principal":"测试姓名380","Mobile":"13731645536","Login":null,"Password":null,"ID":2,"No":null,"Remark":"备注信息：………………"};

  $scope.reset = function(){
   $scope.project ={};
 }
 

 $scope.publish = function(){
  $http.post("http://api.szsei.com/api/project/postadd",$scope.project)
  .success(
    function (response) {
      $ionicPopup.alert({
       title: '确认',
       template: response.Message
     });
      if(response.IsSuccessed){ 
        $state.go('tab.project', {});
      } 
    } 
    );
};
})
.controller('ProjectDetailCtrl', function($scope,$http, $stateParams) {
  var id = $stateParams.projectId;
  $scope.project = [];
  $http.get("http://api.szsei.com/api/project/getbyid/"+id,{ cache: true })
  .success(function (response) {$scope.project = response;});

  $scope.applyProject = function(){
   var data = {id:id, Status:'已发布'};

   alert(JSON.stringify(data));
   $http.post("http://api.szsei.com/api/project/updateStatus",data)
   .success(
    function (response) {
      $ionicPopup.alert({
       title: '确认',
       template: response.Message
     });
      if(response.IsSuccessed){ 
        $state.go('tab.project', {});
      } 
    } 
    );
 }


})

/*劳务管理*/
.controller('LaborerCtrl', function($scope,$http){
  $http.get("http://api.szsei.com/api/laborer/getsimpledata",{ cache: true })
  .success(
    function (response) {
     $scope.laborers = response;
   }
   );
})
.controller('LaborerDetailCtrl', function($scope,$http, $stateParams) {
  var id = $stateParams.laborerId;
  $http.get("http://api.szsei.com/api/laborer/getbyid/"+id,{ cache: true })
  .success(
    function (response) {
     $scope.laborer = response;
   }
   );
})
/*施工单位分类管理*/
.controller('TeamTypeCtrl', function($scope,$http, $stateParams){
  $http.get("http://api.szsei.com/api/TeamType/GetSimpleDataByParentId?parentId="+$stateParams.parentId,{ cache: true })
  .success(
    function (response) {
     $scope.teamtypes = response;
   }
   );

  $http.getByParentId = function(id)
  {
    for (var i = 0; i <  teamtypes.length; i++) {
      if( teamtypes[i].ID ==  parseInt(id))
        return teamtypes[i];
    }
    
  }

})
.controller('TeamTypeDetailCtrl', function($scope,$http, $stateParams) {
  var id = $stateParams.teamtypeId;
  $http.get("http://api.szsei.com/api/teamtype/getbyid/"+id,{ cache: true })
  .success(
    function (response) {
     $scope.teamtype = response;
   }
   );
})

/*施工单位管理*/
.controller('TeamCtrl', function($scope,$http){
  $http.get("http://api.szsei.com/api/team/getsimpledata",{ cache: true })
  .success(
    function (response) {
     $scope.teams = response;
   }
   );
})
.controller('TeamDetailCtrl', function($scope,$http, $stateParams) {
  var id = $stateParams.teamId;
  $http.get("http://api.szsei.com/api/team/getbyid/"+id,{ cache: true })
  .success(
    function (response) {
     $scope.team = response;
   }
   );
})
;