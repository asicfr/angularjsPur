
// customer module add into global module (see app.js)
var appcustomer = angular.module('app.customer', ['app.customer.services'], function($routeProvider, $locationProvider) {

	// customer list
	$routeProvider.when('/customer', {
		templateUrl: 'gen/pages/customer/list.html'
	});

	// customer create
	$routeProvider.when('/customer/create', {
		templateUrl: 'gen/pages/customer/create.html'
	});

	// customer edit
	$routeProvider.when('/customer/:id', {
		templateUrl: 'gen/pages/customer/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appcustomer.controller('CustomerListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCustomer', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiCustomer, ApiStorage) {
	$rootScope.logMe("CustomerListCtrl");
	var self = this;
	
	var listTmp = ApiCustomer.search();
	$scope.customers = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Customer call
	$scope.openCreateCustomerPage = function () {
		$rootScope.logMe("openCreateCustomerPage");
		$location.path("/customer/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appcustomer.controller('CustomerDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCustomer', 'ApiStructure', 
		'ApiCountry',
		function ($scope, $location, $routeParams, $rootScope, ApiCustomer, ApiStructure
		, ApiCountry
		) {
	$rootScope.logMe("CustomerDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get customer ");
	$scope.onecustomer = ApiCustomer.get($scope.idCurrent);
	
	if ($scope.onecustomer === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Customer update
	$scope.updateCustomer = function () {
		$rootScope.logMe("updateCustomer");
		if (ApiCustomer.update($scope.idCurrent, $scope.onecustomer)) {
			$rootScope.showInfo("The customer has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Customer remove
	$scope.removeCustomer = function () {
		$rootScope.logMe("removeCustomer");
		if (ApiCustomer.remove($scope.idCurrent)) {
			$rootScope.showInfo("The customer has been successfully removed");
			$location.path("/customer");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListCustomerPage = function () {
		$rootScope.logMe("openListCustomerPage");
		$location.path("/customer");
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
appcustomer.controller('CustomerCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCustomer', 'ApiStructure', 
		'ApiCountry',
		function ($scope, $location, $routeParams, $rootScope, ApiCustomer, ApiStructure
		, ApiCountry
		) {
	$rootScope.logMe("CustomerCreateCtrl");
	$scope.onecustomer = {};
	
	// Customer save
	$scope.saveCustomer = function () {
		$rootScope.logMe("saveCustomer");
		if (ApiCustomer.create($scope.onecustomer)) {
			$rootScope.showInfo("The customer has been successfully created");
			$location.path("/customer");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListCustomerPage = function () {
		$rootScope.logMe("openListCustomerPage");
		$location.path("/customer");
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
