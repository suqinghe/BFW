var app = angular.module('starter');

app.controller('AccountCtrl', function($scope, $http, $state, $cookieStore, $ionicPopup, HOST) {
	$scope.company = $cookieStore.get("Company");

	$http.get(HOST + "api/Company/GetQualifications", {
			cache: true
		})
		.success(
			function(response) {
				$scope.qualifications = response;
			}
		);

	$scope.logout = function() {
		$cookieStore.remove("Company");
		$cookieStore.remove("CompanyId");
		$state.go('login');
	};

	$scope.reset_company = function() {
		$scope.company = {};
	}
	$scope.register_company = function() {

		var ids = "";
		for (var i = $scope.qualifications.length - 1; i >= 0; i--) {
			if ($scope.qualifications[i].Checked)
				ids += $scope.qualifications[i].ID + ',';
		}
		$scope.company.ID = 0;

		//添加选择的资质信息
		$scope.company.Qualifications = ids;
		$http.post(HOST + "api/company/postadd", $scope.company)
			.success(
				function(response) {
					$ionicPopup.alert({
						title: '确认',
						template: response.Message
					});
					if (response.IsSuccessed) {
						$state.go('login');
					}
				}
			);

	}

	$http.get(HOST + "api/labor/getskills", {
			cache: true
		})
		.success(
			function(response) {
				$scope.skills = response;
			}
		);

	$scope.labor = {
		"Login": null,
		"Password": '7890123',
		"ConfirmPwd": '7890123',
		"VerifyCode": null,
		"Skills": "木工,钢筋,混凝土",
		"Tel": "13293477626",
		"IDCard": "411363198611164208",
		"BankAccount": "13293477626001",
		"No": null,
		"Remark": null,
		"Name": "测试姓名545"
	};

	$scope.reset_labor = function() {
		$scope.labor = {};
	}
	$scope.register_labor = function() {
		var ids = "";
		for (var i = $scope.skills.length - 1; i >= 0; i--) {
			if ($scope.skills[i].Checked)
				ids += $scope.skills[i].ID + ',';
		}
		//添加选择的技能信息
		$scope.labor.Skills = ids;
		$http.post(HOST + "api/labor/postadd", $scope.labor)
			.success(
				function(response) {
					$ionicPopup.alert({
						title: '确认',
						template: response.Message
					});
					if (response.IsSuccessed) {
						$state.go('login');
					}
				}
			);
	}
});