var app = angular.module('starter');

app.controller('LaborerCtrl', function($scope, $http, HOST) {
    $http.get(HOST + "api/labor/GetBy?name=&skillId=0", {
            cache: true
        })
        .success(
            function(response) {
                $scope.labors = response;
            }
        );

    $http.get(HOST + "api/labor/getskills", {
            cache: true
        })
        .success(
            function(response) {
                $scope.skills = response;
                
                $scope.skills.splice(0,0,{'ID':0,'Name':'全部','Checked':false});
            }
        );

    $scope.GetSimpleDataBySkill = function(id, name) {
        $http.get(HOST + "api/labor/GetBy?name=" + name + "&skillId=" + id, {
                cache: true
            })
            .success(
                function(response) {
                    $scope.labors = response;
                }
            );
    }


});
app.controller('LaborerDetailCtrl', function($scope, $http, $stateParams, HOST) {
    var id = $stateParams.laborId;
    $http.get(HOST + "api/labor/getbyid/" + id, {
            cache: true
        })
        .success(
            function(response) {
                $scope.labor = response;
            }
        );
});