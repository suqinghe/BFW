var app = angular.module('starter');

app.controller('ShopCtrl', function($scope, $http, $ionicPopover,HOST) {

	$http.get(HOST + "api/product/getby?name=&categoryid=0", {
			cache: true
		})
		.success(
			function(response) {
				$scope.products = response;
			}
		);

	$http.get(HOST + "api/product/getcategories?parentid=0", {
			cache: true
		})
		.success(
			function(response) {
				$scope.categories = response;
				$scope.categories.splice(0, 0, {
					"ParentId": 0,
					"Level": 1,
					"ID": 0,
					"Name": "全部"
				});
			}
		);



	$scope.GetProductsByCategory = function(id) {
		$http.get(HOST + "api/product/getby?name=&categoryid=" + id, {
				cache: true
			})
			.success(
				function(response) {
					$scope.products = response;
				}
			);
	}
	$ionicPopover.fromTemplateUrl("ez-popover.html", {
			scope: $scope
		})
		.then(function(popover) {
			$scope.popover = popover;
		});
	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
});

app.controller('ProductDetailCtrl', function($scope, $stateParams, $http, HOST) {
	var id = $stateParams.productId;

	$http.get(HOST + "api/product/getbyid/" + id, {
			cache: true
		})
		.success(
			function(response) {
				$scope.product = response;
			}
		);
});