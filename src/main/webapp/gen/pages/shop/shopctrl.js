
// shop module add into global module (see app.js)
var appshop = angular.module('app.shop', ['app.shop.services'], function($routeProvider, $locationProvider) {

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


// -------------------- List Ctrl -------------------------------------------------------------------
appshop.controller('ShopListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiShop', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiShop, ApiStorage) {
	$rootScope.logMe("ShopListCtrl");
	var self = this;
	
	var listTmp = ApiShop.search();
	$scope.shops = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Shop call
	$scope.openCreateShopPage = function () {
		$rootScope.logMe("openCreateShopPage");
		$location.path("/shop/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appshop.controller('ShopDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiShop', 'ApiStructure', 
		'ApiEmployee',
		'ApiCountry',
		function ($scope, $location, $routeParams, $rootScope, ApiShop, ApiStructure
		, ApiEmployee
		, ApiCountry
		) {
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

	// ------ Directive configuration for employee ------ 
    $scope.employee_myparams = {};
    $scope.employee_myparams.pageSize = 5;	
    $scope.employee_myparams.paginated = true;
    $scope.employee_myparams.key = ApiStructure.getStructureKey("employee");
	$scope.employee_myparams.detail = ApiStructure.getStructureDetail("employee");
	$scope.employee_myparams.columns = ApiStructure.getStructureColumns("employee");
	$scope.employee_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiEmployee.search($scope.employee_myparams.pageSize, pageindex, filtre);
    };
	$scope.employee_myparams.getdetailcallback = function(key) {
		return ApiEmployee.get(key);
    };
	$scope.employee_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for country ------ 
    $scope.country_myparams = {};
    $scope.country_myparams.pageSize = 5;	
    $scope.country_myparams.paginated = true;
    $scope.country_myparams.key = ApiStructure.getStructureKey("country");
	$scope.country_myparams.detail = ApiStructure.getStructureDetail("country");
	$scope.country_myparams.columns = ApiStructure.getStructureColumns("country");
	$scope.country_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiCountry.search($scope.country_myparams.pageSize, pageindex, filtre);
    };
	$scope.country_myparams.getdetailcallback = function(key) {
		return ApiCountry.get(key);
    };
	$scope.country_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appshop.controller('ShopCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiShop', 'ApiStructure', 
		'ApiEmployee',
		'ApiCountry',
		function ($scope, $location, $routeParams, $rootScope, ApiShop, ApiStructure
		, ApiEmployee
		, ApiCountry
		) {
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

	// ------ Directive configuration for employee ------ 
    $scope.employee_myparams = {};
    $scope.employee_myparams.pageSize = 5;	
    $scope.employee_myparams.paginated = true;
    $scope.employee_myparams.key = ApiStructure.getStructureKey("employee");
	$scope.employee_myparams.detail = ApiStructure.getStructureDetail("employee");
	$scope.employee_myparams.columns = ApiStructure.getStructureColumns("employee");
	$scope.employee_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiEmployee.search($scope.employee_myparams.pageSize, pageindex, filtre);
    };
	$scope.employee_myparams.getdetailcallback = function(key) {
		return ApiEmployee.get(key);
    };
	$scope.employee_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for country ------ 
    $scope.country_myparams = {};
    $scope.country_myparams.pageSize = 5;	
    $scope.country_myparams.paginated = true;
    $scope.country_myparams.key = ApiStructure.getStructureKey("country");
	$scope.country_myparams.detail = ApiStructure.getStructureDetail("country");
	$scope.country_myparams.columns = ApiStructure.getStructureColumns("country");
	$scope.country_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiCountry.search($scope.country_myparams.pageSize, pageindex, filtre);
    };
	$scope.country_myparams.getdetailcallback = function(key) {
		return ApiCountry.get(key);
    };
	$scope.country_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);
