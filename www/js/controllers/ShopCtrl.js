var app = angular.module('starter');

app.controller('ShopCtrl', function($scope, $http, $ionicPopover, HOST) {
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
	$scope.GetProducts = function() {
		$http.get(HOST + "api/product/getby?name=&categoryid=0", {
				cache: true
			})
			.success(
				function(response) {
					$scope.products = response;
				}
			);
	}

	$scope.doRefresh = function() {
		$scope.GetProducts();
		$scope.$broadcast("scroll.refreshComplete");
	};


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

	$scope.GetProducts();
});

app.controller('ProductDetailCtrl', function($scope, $stateParams, $http, HOST) {
	var id = $stateParams.productId;
	$scope.GetProductDetail = function() {
		$http.get(HOST + "api/product/getbyid/" + id, {
				cache: true
			})
			.success(
				function(response) {
					$scope.product = response;
				}
			);
	}

	$scope.doRefresh = function() {
		$scope.GetProductDetail();
		$scope.$broadcast("scroll.refreshComplete");
	};

	$scope.GetProductDetail();
});