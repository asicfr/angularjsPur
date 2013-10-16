
// shop module add into global module (see mainctrl.js)
var bookStoreshop = angular.module('bookStore.shop', ['bookStore.shop.services'], function($routeProvider, $locationProvider) {

	// shop list
	$routeProvider.when('/shop', {
		templateUrl: 'gen/pages/shop/list.html'
	});

	// shop create
	$routeProvider.when('/shop/create', {
		templateUrl: 'gen/pages/shop/create.html'
	});

	// shop edit
	$routeProvider.when('/shop/:id', {
		templateUrl: 'gen/pages/shop/edit.html'
	});

});

// shop Controllers
bookStoreshop.controller('ShopListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiShop', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiShop, ApiStorage) {
	$rootScope.logMe("ShopListCtrl");
	var self = this;
	
	$scope.shops = ApiShop.search();
	$rootScope.logMe("search end");

	// new Shop call
	$scope.openCreateShopPage = function () {
		$rootScope.logMe("openCreateShopPage");
		$location.path("/shop/create");
	};

}]);


bookStoreshop.controller('ShopDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiShop', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiShop, ApiStorage) {
	$rootScope.logMe("ShopDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get shop ");
	$scope.oneshop = ApiShop.get($scope.idCurrent);
	
	if ($scope.oneshop === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Shop update
	$scope.updateShop = function () {
		$rootScope.logMe("updateShop");
		if (ApiShop.update($scope.idCurrent, $scope.oneshop)) {
			$rootScope.showInfo("The shop has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Shop remove
	$scope.removeShop = function () {
		$rootScope.logMe("removeShop");
		if (ApiShop.remove($scope.idCurrent)) {
			$rootScope.showInfo("The shop has been successfully removed");
			$location.path("/shop");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListShopPage = function () {
		$rootScope.logMe("openListShopPage");
		$location.path("/shop");
	};

}]);

bookStoreshop.controller('ShopCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiShop', function ($scope, $location, $routeParams, $rootScope, ApiShop) {
	$rootScope.logMe("ShopCreateCtrl");
	$scope.oneshop = {};
	
	// Shop save
	$scope.saveShop = function () {
		$rootScope.logMe("saveShop");
		if (ApiShop.create($scope.oneshop)) {
			$rootScope.showInfo("The shop has been successfully created");
			$location.path("/shop");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListShopPage = function () {
		$rootScope.logMe("openListShopPage");
		$location.path("/shop");
	};

}]);
