var app = angular.module('starter');

app.controller('SolutionCtrl', function($scope, $state, $ionicPopup, $http, HOST) {
    $scope.solution = {
        "Address": "深圳市南山区科技中二路",
        "StartDate": "2016-05-14 12:12:33",
        "EndDate": "2016-05-14 12:12:33",
        "CompanyId": 4,
        "ParentId": 0,
        "CategoryId": "2",
        "Valuation": "￥300,000,000.00",
        "Description": "地铁8号线工程",
        "Status": "草稿",
        "No": "SZ_001",
        "Remark": "很有前途的工程",
        "Name": "深圳土建工程2016001号"
    };

    $http.get(HOST + "api/Solution/GetCategories?parentId=0", {
            cache: true
        })
        .success(
            function(response) {
                $scope.categories = response;
            }
        );

    $http.get(HOST + "api/Solution/GetBy?name=&parentid=0&companyId=0&categoryid=0")
        .success(
            function(response) {
                $scope.solutions = response;
            }
        );

    $scope.GetSimpleDataByCId = function(id, name) {
        $http.get(HOST + "api/Solution/GetBy?name=" + name + "&parentid=0&companyId=0&categoryid=" + id, {
                cache: true
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


    $scope.publish = function() {
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


app.controller('SolutionDetailCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, HOST) {
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


    $scope.finishConfirm = function() {
        $http.post(HOST + "api/Solution/FinishConfirm/" + id)
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
    $scope.publishBid = function() {
        $http.post(HOST + "api/Solution/PublishBid/" + id)
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

    $scope.applyBid = function() {

        $scope.bid = {
            'solutionId': id,
            'companyId': 2
        }

        // 自定义弹窗
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
                        // 不允许用户关闭，除非输入 BidOffer 密码
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