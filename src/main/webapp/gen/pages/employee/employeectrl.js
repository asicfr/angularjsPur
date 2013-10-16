
// employee module add into global module (see mainctrl.js)
var bookStoreemployee = angular.module('bookStore.employee', ['bookStore.employee.services'], function($routeProvider, $locationProvider) {

	// employee list
	$routeProvider.when('/employee', {
		templateUrl: 'gen/pages/employee/list.html'
	});

	// employee create
	$routeProvider.when('/employee/create', {
		templateUrl: 'gen/pages/employee/create.html'
	});

	// employee edit
	$routeProvider.when('/employee/:id', {
		templateUrl: 'gen/pages/employee/edit.html'
	});

});

// employee Controllers
bookStoreemployee.controller('EmployeeListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployee', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiEmployee, ApiStorage) {
	$rootScope.logMe("EmployeeListCtrl");
	var self = this;
	
	$scope.employees = ApiEmployee.search();
	$rootScope.logMe("search end");

	// new Employee call
	$scope.openCreateEmployeePage = function () {
		$rootScope.logMe("openCreateEmployeePage");
		$location.path("/employee/create");
	};

}]);


bookStoreemployee.controller('EmployeeDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployee', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiEmployee, ApiStorage) {
	$rootScope.logMe("EmployeeDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get employee ");
	$scope.oneemployee = ApiEmployee.get($scope.idCurrent);
	
	if ($scope.oneemployee === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Employee update
	$scope.updateEmployee = function () {
		$rootScope.logMe("updateEmployee");
		if (ApiEmployee.update($scope.idCurrent, $scope.oneemployee)) {
			$rootScope.showInfo("The employee has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Employee remove
	$scope.removeEmployee = function () {
		$rootScope.logMe("removeEmployee");
		if (ApiEmployee.remove($scope.idCurrent)) {
			$rootScope.showInfo("The employee has been successfully removed");
			$location.path("/employee");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListEmployeePage = function () {
		$rootScope.logMe("openListEmployeePage");
		$location.path("/employee");
	};

}]);

bookStoreemployee.controller('EmployeeCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployee', function ($scope, $location, $routeParams, $rootScope, ApiEmployee) {
	$rootScope.logMe("EmployeeCreateCtrl");
	$scope.oneemployee = {};
	
	// Employee save
	$scope.saveEmployee = function () {
		$rootScope.logMe("saveEmployee");
		if (ApiEmployee.create($scope.oneemployee)) {
			$rootScope.showInfo("The employee has been successfully created");
			$location.path("/employee");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListEmployeePage = function () {
		$rootScope.logMe("openListEmployeePage");
		$location.path("/employee");
	};

}]);
