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
            }
        );

    $scope.GetSimpleDataByQua = function(id, name) {
        $http.get(HOST + "api/Company/GetBy?name=" + name + "&quaId=" + id, {
                cache: true
            })
            .success(
                function(response) {
                    $scope.companys = response;
                }
            );
    }
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