var app = angular.module('starter');

app.controller('SolutionCtrl', function($scope, $state, $ionicPopup, $http,$cookieStore, HOST) {
   var companyId = $cookieStore.get("CompanyId");
    $scope.solution = {
        "Address": "深圳市南山区科技中二路",
        "StrStartDate": "2016-05-14 12:12:33",
        "StrEndDate": "2016-05-14 12:12:33",
        "CompanyId": 4,
        "ParentId": 0,
        "CategoryId": "2",
        "Valuation": 300,
        "Description": "地铁8号线工程",
        "Status": "草稿",
        "No": '',
        "Remark": "很有前途的工程",
        "Name": "深圳土建工程2016-05-29号"
    };
 

    $http.get(HOST + "api/Solution/GetCategories?parentId=0", {
            cache: true
        })
        .success(
            function(response) {
                $scope.categories = response;
                $scope.categories.splice(0,0,{'ID':0,'Name':'全部','Checked':false});
            }
        );
    $http.get(HOST + "api/Solution/GetBy?name=&parentid=0&companyId="+ companyId +"&status=0&categoryid=0")
        .success(
            function(response) {
                $scope.solutions = response;
            }
        );

    $scope.GetSimpleDataByCId = function(id, name) {
        $http.get(HOST + "api/Solution/GetBy?name=" + name + "&parentid=0&companyId="+ companyId +"&status=0&categoryid=" + id, {
                cache: false
            })
            .success(
                function(response) {
                    $scope.solutions = response;
                }
            );
    }
    $scope.reset = function() {
        $scope.solution = {};
    };

    $scope.doRefresh = function() {
        $scope.GetSimpleDataByCId(0, '');
        $scope.$broadcast("scroll.refreshComplete");
    };


    $scope.publish = function() {

        $scope.solution.CompanyId =companyId;

        $http.post(HOST + "api/Solution/postadd", $scope.solution)
            .success(
                function(response) {
                    $ionicPopup.alert({
                        title: '确认',
                        template: response.Message
                    });
                    if (response.IsSuccessed) {
                        $state.go('tab.solution', {});
                    }
                }
            );
    };

});


app.controller('SolutionDetailCtrl', function($scope, $http, $state, $ionicHistory, $cookieStore,$ionicPopup, $stateParams, HOST) {
    var companyId = $cookieStore.get("CompanyId");
    var id = $stateParams.solutionId;
    $scope.solution = {};
    $http.get(HOST + "/api/solution/getbyid/" + id, {
            cache: true
        })
        .success(
            function(response) {
                $scope.solution = response;
            }
        );

    $scope.applyBid = function() {

        $scope.bid = {
            'SolutionId': id,
            'CompanyId': companyId
        }
        var myPopup = $ionicPopup.show({
            template: '<input type="text"  ng-model="bid.BidOffer">',
            title: '投标确认',
            subTitle: '请输入投标金额',
            scope: $scope,
            buttons: [{
                text: '取消'
            }, {
                text: '<b>投标</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.bid.BidOffer) {
                        
                        e.preventDefault();
                    } else {
                        $http.post(HOST + "api/Bid/ApplyBid", $scope.bid)
                            .success(
                                function(response) {
                                    $ionicPopup.alert({
                                        title: '确认',
                                        template: response.Message
                                    });
                                    if (response.IsSuccessed) {
                                        $state.go('tab.solution', {});
                                    }
                                }
                            );
                    }
                }
            }, ]
        });
    };

});


app.controller('SplitSolutionCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    var id = $stateParams.solutionId;
    $scope.solution = {};
    $http.get(HOST + "api/solution/GetSplitSolution/" + id, {
            cache: true
        })
        .success(
            function(response) {
                $scope.solution = response;
            }
        );

    $scope.splitSolution = function() {
        $http.post(HOST + "api/Solution/postadd", $scope.solution)
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


app.controller('SplitProjectCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    var id = $stateParams.solutionId;
    $scope.project = {};
    $http.get(HOST + "api/solution/GetSplitProject/" + id, {
            cache: true
        })
        .success(
            function(response) {
                $scope.project = response;
            }
        );

    $scope.splitProject = function() {
        $http.post(HOST + "api/Project/postadd", $scope.project)
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