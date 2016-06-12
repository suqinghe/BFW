var app = angular.module('starter');

app.controller('CompanyCtrl', function($scope, $http, companyFactory, HOST) {
    $http.get(HOST + "api/company/getsimpledata", {
            cache: true
        })
        .success(
            function(response) {
                $scope.companys = response;
            }
        );

    $http.get(HOST + "api/Company/GetQualifications", {
            cache: true
        })
        .success(
            function(response) {
                $scope.qualifications = response;
                $scope.qualifications.splice(0,0,{'ID':0,'Name':'全部','Checked':false});
            }
        );

    $scope.GetSimpleDataByQua = function(id, name) {
        $http.get(HOST + "api/Company/GetBy?name=" + name + "&quaIds=" + id, {
                cache: true
            })
            .success(
                function(response) {
                    $scope.companys = response;
                }
            );
    }

    $scope.doRefresh = function() {
        $scope.GetSimpleDataByQua('','');
        $scope.$broadcast("scroll.refreshComplete");
    };
    
});
app.controller('CompanyDetailCtrl', function($scope, $http, $stateParams, HOST) {
    var id = $stateParams.companyId;
    $http.get(HOST + "/api/company/getbyid/" + id, {
            cache: true
        })
        .success(
            function(response) {
                $scope.company = response;
            }
        );
});
 