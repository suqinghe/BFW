var app = angular.module('starter');

app.controller('MyDataCtrl', function($scope, $http, HOST, $cookieStore) {
    var CompanyID = $cookieStore.get("CompanyId");
    var userId = $cookieStore.get("UserId");
    $scope.GetGroupData = function() {
        $scope.groups = [];
        $http.get(HOST + "api/Solution/GetMyGroupData?companyid=" + CompanyID, {
                cache: false
            })
            .success(
                function(response) {
                    $scope.groups = response;
                }
            );
    }

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
            $scope.shown2 = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

    $scope.isGroupShown2 = function(group) {
        return $scope.shown2 === group;
    };

    $scope.max = function(group) {
        if ($scope.isGroupShown2(group)) {
            $scope.shown2 = null;
        } else {
            $scope.shown2 = group;
        }
    };

    $scope.doRefresh = function() {
        $scope.GetGroupData();
        $scope.$broadcast("scroll.refreshComplete");
    };


    $scope.GetGroupData();
});


app.controller('MySolutionCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    var companyid = $stateParams.CompanyID;
    var status = $stateParams.Status;

    $scope.GetGroupData = function() {
        $http.get(HOST + "api/Solution/GetByStatus?companyId=" + companyid + "&status=" + status, {
                cache: false
            })
            .success(
                function(response) {
                    $scope.mySolutions = response;
                }
            );
    }
    $scope.doRefresh = function() {
        $scope.GetGroupData();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.GetGroupData();
});

app.controller('MySolutionDetailCtrl', function($scope, $http, $state, $cookieStore, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    var id = $stateParams.solutionId;
    var userId = $cookieStore.get("UserId");
    $scope.GetSolution = function() {
        $scope.solution = {};
        $http.get(HOST + "/api/solution/getbyid/" + id, {
                cache: false
            })
            .success(
                function(response) {
                    $scope.solution = response;
                }
            );
    }

    $scope.GetSolution();

    $scope.doRefresh = function() {
        $scope.GetSolution();
        $scope.$broadcast("scroll.refreshComplete");
    };

    /*
    完工确认
    */
    $scope.finishConfirm = function() {
        $http.post(HOST + "api/Solution/FinishConfirm/" + id)
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
    };
    /*
           竣工验收
           */
    $scope.fianlFinishConfirm = function() {
        $http.post(HOST + "api/Solution/fianlFinishConfirm/" + id)
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
    };
    $scope.publishBid = function() {
        $http.post(HOST + "api/Solution/PublishBid/" + id )
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
            ).error(
                function(response) {
                    alert(JSON.stringify(response));
                }
            );
    };

    $scope.startBid = function() {
        $http.post(HOST + "api/Solution/startBid/" + id)
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
    };

    $scope.stopBid = function() {
        $http.post(HOST + "api/Solution/stopBid/" + id)
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
    };



});


app.controller('MyProjectCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    var companyid = $stateParams.CompanyID;
    var status = $stateParams.Status;


    $scope.GetMyProjects = function() {
        $http.get(HOST + "api/Project/GetByStatus?companyId=" + companyid + "&status=" + status, {
                cache: false
            })
            .success(
                function(response) {
                    $scope.myProjects = response;
                }
            );
    }


    $scope.doRefresh = function() {
        $scope.GetMyProjects();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.GetMyProjects();
});

app.controller('MyBidCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    $scope.GetMyBids = function() {
        var companyid = $stateParams.CompanyID;
        var status = $stateParams.Status;
        $http.get(HOST + "api/Bid/GetByStatus?companyId=" + companyid + "&status=" + status, {
                cache: false
            })
            .success(
                function(response) {
                    $scope.myBids = response;
                }
            );
    }

    $scope.doRefresh = function() {
        $scope.GetMyBids();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.GetMyBids();
});

app.controller('MyBidDetailCtrl', function($scope, $http, $state, $cookieStore, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    var id = $stateParams.bidId;
    var userId = $cookieStore.get("UserId");
    $http.get(HOST + "api/bid/getbyid/" + id, {
            cache: true
        })
        .success(function(response) {
            $scope.bid = response;
        });

    $scope.signConfirm = function() {
        $scope.bid.Creator = userId;
        var myPopup = $ionicPopup.show({
            template: '',
            title: '签约确认',
            subTitle: '是否确认该签约？',
            scope: $scope,
            buttons: [{
                text: '取消'
            }, {
                text: '同意',
                type: 'button-balanced',
                onTap: function(e) {
                    $http.post(HOST + "api/Bid/ConfirmSign", $scope.bid)
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
            }]
        });
    }

    $scope.auditBid = function() {

        $scope.bid = {
            'ID': id,
            'Creator': userId
        };
        var myPopup = $ionicPopup.show({
            template: '<input type="text"  ng-model="bid.AuditRemark" placeholder="拒绝时请填写拒绝理由">',
            title: '投标审核',
            subTitle: '确定符合条件的投标',
            scope: $scope,
            buttons: [{
                text: '取消'
            }, {
                text: '拒绝',
                type: 'button-assertive',
                onTap: function(e) {
                    if (!$scope.bid.AuditRemark) {
                        e.preventDefault();
                    } else {

                        $scope.bid.StrStatus = '4';

                        $http.post(HOST + "api/Bid/AuditBid", $scope.bid)
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
                }
            }, {
                text: '同意',
                type: 'button-balanced',
                onTap: function(e) {
                    $scope.bid.StrStatus = '3';
                    $http.post(HOST + "api/Bid/AuditBid", $scope.bid)
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
            }]
        });

    }
});


app.controller('MyBidSignCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, $cookieStore, HOST) {
    var id = $stateParams.bidId;
    var CompanyID = $cookieStore.get("CompanyId");
    var userId = $cookieStore.get("UserId");
    $http.get(HOST + "api/bid/getbyid/" + id, {
            cache: false
        })
        .success(function(response) {
            $scope.signBid = response;
        });

    $scope.cancleSign = function() {
        $ionicHistory.goBack();
    }

    $scope.confirmSign = function() {
        $scope.signBid.CompanyId = CompanyID;
        $scope.signBid.Creator = userId;
        $http.post(HOST + "api/Bid/Sign", $scope.signBid)
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


app.controller('MyReceivablesCtrl', function($scope, $http, $state, $ionicHistory, $ionicPopup, $stateParams, HOST) {

    $scope.GetMyReceivables = function() {
        var companyid = $stateParams.CompanyID;
        var status = $stateParams.Status;
        $http.get(HOST + "api/receivables/GetByStatus?companyId=" + companyid + "&status=" + status, {
                cache: false
            })
            .success(
                function(response) {
                    $scope.myReceivables = response;
                }
            );
    }
    $scope.doRefresh = function() {
        $scope.GetMyReceivables();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.GetMyReceivables();
});

app.controller('MyReceivableDetailCtrl', function($scope, $http, $state, $cookieStore, $ionicHistory, $ionicPopup, $stateParams, HOST) {
    var id = $stateParams.receivableId;
    var companyId = $cookieStore.get("CompanyId");

    var userId = $cookieStore.get("UserId");
    $http.get(HOST + "api/receivables/getbyid/" + id, {
            cache: true
        })
        .success(function(response) {
            $scope.receivable = response;
            if ($scope.receivable.Status == 'PendingAudit' && $scope.receivable.Payer == companyId) {
                $scope.receivable.CanAudit = true;
            } else {
                $scope.receivable.CanAudit = false;
            }
        });

    $scope.auditRecievalble = function() {
        $scope.receivable.ID = id;
        $scope.receivable.Creator = userId;
        var myPopup = $ionicPopup.show({
            template: '<input type="text"  ng-model="receivable.AuditRemark" placeholder="拒绝时请填写拒绝理由">',
            title: '账单审核',
            subTitle: '审核对方申请的账单',
            scope: $scope,
            buttons: [{
                text: '取消'
            }, {
                text: '拒绝',
                type: 'button-assertive',
                onTap: function(e) {
                    if (!$scope.receivable.AuditRemark) {
                        e.preventDefault();
                    } else {

                        $scope.receivable.StrStatus = '4';

                        $http.post(HOST + "api/Receivables/AuditReceivables", $scope.receivable)
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
                }
            }, {
                text: '同意',
                type: 'button-balanced',
                onTap: function(e) {
                    $scope.receivable.StrStatus = '3';
                    $http.post(HOST + "api/Receivables/AuditReceivables", $scope.receivable)
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
            }]
        });
    }

});

app.controller('GeneralReceivableCtrl', function($scope, $http, $state, $ionicHistory, $cookieStore, $ionicPopup, $stateParams, HOST) {
    var id = $stateParams.ProjectId;
    var companyId = $cookieStore.get("CompanyId");

    var userId = $cookieStore.get("UserId");
    $http.get(HOST + "/api/receivables/getbilltypes", {
            cache: false
        })
        .success(
            function(response) {
                $scope.BillTypes = response;
            }
        );
    $http.get(HOST + "/api/receivables/GetCompanys", {
            cache: false
        })
        .success(
            function(response) {
                $scope.Companys = response;
            }
        );


    $scope.receivable = {
        'ProjectId': id,
        'AvailabilityDate': '2016-05-26',
        'PaymentDate': '2016-05-31',
        'CompanyId': companyId,
        'Creator': userId
    };
    $scope.confirmReceival = function() {
        $http.post(HOST + "api/project/GenerateReceivables", $scope.receivable)
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

    $scope.cancleReceival = function() {
        $ionicHistory.goBack();
    }

});