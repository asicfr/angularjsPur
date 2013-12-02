
// employeegroup module add into global module (see app.js)
var appemployeegroup = angular.module('app.employeegroup', ['app.employeegroup.services'], function($routeProvider, $locationProvider) {

	// employeegroup list
	$routeProvider.when('/employeegroup', {
		templateUrl: 'gen/pages/employeegroup/list.html'
	});

	// employeegroup create
	$routeProvider.when('/employeegroup/create', {
		templateUrl: 'gen/pages/employeegroup/create.html'
	});

	// employeegroup edit
	$routeProvider.when('/employeegroup/:id', {
		templateUrl: 'gen/pages/employeegroup/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appemployeegroup.controller('EmployeeGroupListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployeeGroup', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiEmployeeGroup, ApiStorage) {
	$rootScope.logMe("EmployeeGroupListCtrl");
	var self = this;
	
	var listTmp = ApiEmployeeGroup.search();
	$scope.employeegroups = listTmp.datapage;
	$rootScope.logMe("search end");

	// new EmployeeGroup call
	$scope.openCreateEmployeeGroupPage = function () {
		$rootScope.logMe("openCreateEmployeeGroupPage");
		$location.path("/employeegroup/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appemployeegroup.controller('EmployeeGroupDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployeeGroup', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiEmployeeGroup, ApiStructure
		) {
	$rootScope.logMe("EmployeeGroupDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get employeegroup ");
	$scope.oneemployeegroup = ApiEmployeeGroup.get($scope.idCurrent);
	
	if ($scope.oneemployeegroup === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// EmployeeGroup update
	$scope.updateEmployeeGroup = function () {
		$rootScope.logMe("updateEmployeeGroup");
		if (ApiEmployeeGroup.update($scope.idCurrent, $scope.oneemployeegroup)) {
			$rootScope.showInfo("The employeegroup has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// EmployeeGroup remove
	$scope.removeEmployeeGroup = function () {
		$rootScope.logMe("removeEmployeeGroup");
		if (ApiEmployeeGroup.remove($scope.idCurrent)) {
			$rootScope.showInfo("The employeegroup has been successfully removed");
			$location.path("/employeegroup");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListEmployeeGroupPage = function () {
		$rootScope.logMe("openListEmployeeGroupPage");
		$location.path("/employeegroup");
	};

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appemployeegroup.controller('EmployeeGroupCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployeeGroup', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiEmployeeGroup, ApiStructure
		) {
	$rootScope.logMe("EmployeeGroupCreateCtrl");
	$scope.oneemployeegroup = {};
	
	// EmployeeGroup save
	$scope.saveEmployeeGroup = function () {
		$rootScope.logMe("saveEmployeeGroup");
		if (ApiEmployeeGroup.create($scope.oneemployeegroup)) {
			$rootScope.showInfo("The employeegroup has been successfully created");
			$location.path("/employeegroup");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListEmployeeGroupPage = function () {
		$rootScope.logMe("openListEmployeeGroupPage");
		$location.path("/employeegroup");
	};

}]);
