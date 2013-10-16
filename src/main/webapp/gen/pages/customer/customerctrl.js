
// customer module add into global module (see mainctrl.js)
var bookStorecustomer = angular.module('bookStore.customer', ['bookStore.customer.services'], function($routeProvider, $locationProvider) {

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

// customer Controllers
bookStorecustomer.controller('CustomerListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCustomer', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiCustomer, ApiStorage) {
	$rootScope.logMe("CustomerListCtrl");
	var self = this;
	
	$scope.customers = ApiCustomer.search();
	$rootScope.logMe("search end");

	// new Customer call
	$scope.openCreateCustomerPage = function () {
		$rootScope.logMe("openCreateCustomerPage");
		$location.path("/customer/create");
	};

}]);


bookStorecustomer.controller('CustomerDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCustomer', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiCustomer, ApiStorage) {
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

}]);

bookStorecustomer.controller('CustomerCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCustomer', function ($scope, $location, $routeParams, $rootScope, ApiCustomer) {
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

}]);
