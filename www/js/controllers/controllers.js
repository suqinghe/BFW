angular.module('starter.controllers', [])
	.controller('DashCtrl', function($scope, $http, $cookieStore, $state, $ionicHistory, $ionicPopup, $ionicSlideBoxDelegate, HOST) {
		$scope.index = 0;
		$scope.goIndex = function(index) {
			if (index == 1) {
				$state.go('tab.solution');
			}
		}
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