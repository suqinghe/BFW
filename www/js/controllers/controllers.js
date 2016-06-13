angular.module('starter.controllers', [])
	.controller('DashCtrl', function($scope, $http, $cookieStore, $state, $ionicHistory, $ionicPopup, $ionicSlideBoxDelegate, HOST) {
		$scope.index = 0;
		$scope.goIndex = function(index) {
			if (index == 1) {
				$state.go('tab.solution');
			}
		}

		// $scope.user = {
		// 	'Login': 'wanke',
		// 	'Password': '123456'
		// };

		// $scope.$on("$ionicView.beforeEnter", function() {
		// 	$ionicHistory.clearCache();
		// 	$ionicHistory.clearHistory();
		// });

		// var Company = {
		// 	'Login': null,
		// 	'Password': null,
		// 	'ConfirmPwd': null,
		// 	'VerifyCode': null,
		// 	'RoleId': 0,
		// 	'Qualification': null,
		// 	'SelectQualifications': null,
		// 	'Qualifications': '1,4',
		// 	'StrQualifications': '建筑公司,设计公司',
		// 	'Status': 'AuditPass',
		// 	'No': 'C0001',
		// 	'Name': '万科集团',
		// 	'FullName': '深圳市万科地产集团',
		// 	'Address': '深圳市南山区',
		// 	'Code': '123456',
		// 	'Principal': '万科集团',
		// 	'Mobile': '13500000000',
		// 	'Phone': '0755-88880000',
		// 	'Email': 'admin@wanke.com',
		// 	'WebSite': 'www.wanke.com',
		// 	'AuditRemark': null,
		// 	'Buttons': null,
		// 	'ID': 1,
		// 	'Remark': '万科地产',
		// 	'CompanyId': 0
		// };

		// $cookieStore.put("Company", Company);
		// $cookieStore.put("CompanyId", Company.ID);
		// $state.go('tab.dash');


	})
	.controller('LoginCtrl', function($scope, $http, $cookieStore, $state, $ionicHistory, $ionicPopup, HOST) {
		$scope.user = {
			'Login': 'wanke',
			'Password': '123456'
		};

		$scope.$on("$ionicView.beforeEnter", function() {
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
		});

		$scope.login = function() {
			$http.post(HOST + "api/Public/Login?login=" + $scope.user.Login + "&password=" + $scope.user.Password, {})
				.success(
					function(response) {
						if (response.IsSuccessed) {
							$cookieStore.put("Company", response.Company);
							$cookieStore.put("CompanyId", response.Company.ID);
							$state.go('tab.dash');
						} else {
							$ionicPopup.alert({
								title: '确认',
								template: response.Message
							});
						}
					}
				);
		};

	});