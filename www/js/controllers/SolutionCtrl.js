var app = angular.module('starter');

app.controller('SolutionCtrl', function($scope, $state, $ionicPopup, $http, $cookieStore, HOST) {
    var companyId = $cookieStore.get("CompanyId");
    $scope.GetRandomNum = function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    $scope.addDate = function(stype, NumDay, vdate) {
        var date = new Date(vdate);
        var type = parseInt(stype) //类型 
        var lIntval = parseInt(NumDay) //间隔
        switch (type) {
            case 6: //年
                date.setYear(date.getYear() + lIntval)
                break;
            case 7: //季度
                date.setMonth(date.getMonth() + (lIntval * 3))
                break;
            case 5: //月
                date.setMonth(date.getMonth() + lIntval)
                break;
            case 4: //天
                date.setDate(date.getDate() + lIntval)
                break
            case 3: //时
                date.setHours(date.getHours() + lIntval)
                break
            case 2: //分
                date.setMinutes(date.getMinutes() + lIntval)
                break
            case 1: //秒
                date.setSeconds(date.getSeconds() + lIntval)
                break;
            default:

        }

        return date;
    }

    $scope.solution = {
        "Address": "深圳市南山区科技中二路",
        "StrStartDate": new Date().toLocaleDateString(),
        "StrEndDate": $scope.addDate('4', $scope.GetRandomNum(10, 1000), new Date()).toLocaleDateString(),
        "CompanyId": 4,
        "ParentId": 0,
        "Valuation": $scope.GetRandomNum(100, 10000),
        "Description": "这里是工程描述信息，请认真填写；这里是工程描述信息，请认真填写",
        "Status": "草稿",
        "No": '',
        // "Remark": "这里是工程描述信息，请认真填写；这里是工程描述信息，请认真填写",
        "Name": "深圳土建工程" + $scope.GetRandomNum(10, 10000) + "号"
    };



    $http.get(HOST + "api/Solution/GetCategories?parentId=0", {
            cache: true
        })
        .success(
            function(response) {
                $scope.categories = response;
                $scope.categories.splice(0, 0, {
                    'ID': 0,
                    'Name': '全部',
                    'Checked': false
                });
            }
        );
    $http.get(HOST + "api/Solution/GetBy?name=&parentid=0&companyId=" + companyId + "&status=0&categoryid=0")
        .success(
            function(response) {
                $scope.solutions = response;
            }
        );

    $scope.GetSimpleDataByCId = function(id, name) {
        $http.get(HOST + "api/Solution/GetBy?name=" + name + "&parentid=0&companyId=" + companyId + "&status=0&categoryid=" + id, {
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

    $scope.clearSearch = function() {

        // $scope.keyword = "";
    }


    $scope.publish = function() {

        $scope.solution.CompanyId = companyId;

        if ($scope.solution.CategoryId == 0) {
            alert("发布工程时必须选择分类");
        } else if ($scope.solution.Name == null) {
            alert("工程名称必须填写");
        } else if ($scope.solution.Valuation == null) {
            alert("工程估价必须填写");
        } else if ($scope.solution.StrStartDate == null) {
            alert("工程启动时间必须填写");
        } else if ($scope.solution.StrEndDate == null) {
            alert("工程结束时间必须填写");
        } else {
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
        }
    };

});


app.controller('SolutionDetailCtrl', function($scope, $http, $state, $ionicHistory, $cookieStore, $ionicPopup, $stateParams, HOST) {
    var companyId = $cookieStore.get("CompanyId");
    var id = $stateParams.solutionId;
    $scope.solution = {};
    $http.get(HOST + "/api/solution/getbyid/" + id, {
            cache: false
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

    $scope.reset = function() {
        $scope.solution = {};
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

     $scope.reset = function() {
        $scope.project = {};
    }
});