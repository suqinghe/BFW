var app = angular.module('starter');

app.controller('AccountCtrl', function($scope, $http, $state, $ionicPopup, HOST) {

	$scope.user = {};
	$scope.login = function() {
		alert(JSON.stringify($scope.user));
		$state.go('tab.dash', {});
	}

	$scope.register = function() {
		$state.go('tab.register', {});
	}


	$scope.company = {
		"Login": null,
		"Password": null,
		"ConfirmPwd": null,
		"VerifyCode": null,
		"Qualification": null,
		"Qualifications": "审图公司,造价咨询,检测机构",
		"Name": "深圳市建筑公司第62分公司",
		"FullName": "公司全称：深圳市建筑公司第62分公司",
		"Address": "深圳市科技中97路",
		"Code": "187715375",
		"Principal": "细小姐",
		"Mobile": "13026629494",
		"Phone": "0755-45840771",
		"Email": "kzge6@szsei.com",
		"WebSite": "http://www.szsei5.com",
		"ID": 5,
		"No": null,
		"Remark": null
	};

	$scope.Types = {
		"type": "select",
		"name": "Type",
		"value": "建筑公司",
		"values": ["建筑公司", "劳务公司", "装修公司"]
	};

	$http.get(HOST + "api/Company/GetQualifications", {
			cache: true
		})
		.success(
			function(response) {
				$scope.qualifications = response;
			}
		);

	$scope.reset_company = function() {
		$scope.company = {};
	}
	$scope.register_company = function() {
		var ids = "";
		for (var i = $scope.qualifications.length - 1; i >= 0; i--) {
			if ($scope.qualifications[i].Checked)
				ids += $scope.qualifications[i].ID + ',';
		}

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
						$state.go('tab.account', {});
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
		"ID": 2,
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
						$state.go('tab.account', {});
					}
				}
			);
	}
});