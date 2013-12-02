
// employee module add into global module (see app.js)
var appemployee = angular.module('app.employee', ['app.employee.services'], function($routeProvider, $locationProvider) {

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


// -------------------- List Ctrl -------------------------------------------------------------------
appemployee.controller('EmployeeListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployee', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiEmployee, ApiStorage) {
	$rootScope.logMe("EmployeeListCtrl");
	var self = this;
	
	var listTmp = ApiEmployee.search();
	$scope.employees = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Employee call
	$scope.openCreateEmployeePage = function () {
		$rootScope.logMe("openCreateEmployeePage");
		$location.path("/employee/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appemployee.controller('EmployeeDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployee', 'ApiStructure', 
		'ApiShop',
		'ApiBadge',
		function ($scope, $location, $routeParams, $rootScope, ApiEmployee, ApiStructure
		, ApiShop
		, ApiBadge
		) {
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

	// ------ Directive configuration for shop ------ 
    $scope.shop_myparams = {};
    $scope.shop_myparams.pageSize = 5;	
    $scope.shop_myparams.paginated = true;
    $scope.shop_myparams.key = ApiStructure.getStructureKey("shop");
	$scope.shop_myparams.detail = ApiStructure.getStructureDetail("shop");
	$scope.shop_myparams.columns = ApiStructure.getStructureColumns("shop");
	$scope.shop_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiShop.search($scope.shop_myparams.pageSize, pageindex, filtre);
    };
	$scope.shop_myparams.getdetailcallback = function(key) {
		return ApiShop.get(key);
    };
	$scope.shop_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for badge ------ 
    $scope.badge_myparams = {};
    $scope.badge_myparams.pageSize = 5;	
    $scope.badge_myparams.paginated = true;
    $scope.badge_myparams.key = ApiStructure.getStructureKey("badge");
	$scope.badge_myparams.detail = ApiStructure.getStructureDetail("badge");
	$scope.badge_myparams.columns = ApiStructure.getStructureColumns("badge");
	$scope.badge_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiBadge.search($scope.badge_myparams.pageSize, pageindex, filtre);
    };
	$scope.badge_myparams.getdetailcallback = function(key) {
		return ApiBadge.get(key);
    };
	$scope.badge_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appemployee.controller('EmployeeCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiEmployee', 'ApiStructure', 
		'ApiShop',
		'ApiBadge',
		function ($scope, $location, $routeParams, $rootScope, ApiEmployee, ApiStructure
		, ApiShop
		, ApiBadge
		) {
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

	// ------ Directive configuration for shop ------ 
    $scope.shop_myparams = {};
    $scope.shop_myparams.pageSize = 5;	
    $scope.shop_myparams.paginated = true;
    $scope.shop_myparams.key = ApiStructure.getStructureKey("shop");
	$scope.shop_myparams.detail = ApiStructure.getStructureDetail("shop");
	$scope.shop_myparams.columns = ApiStructure.getStructureColumns("shop");
	$scope.shop_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiShop.search($scope.shop_myparams.pageSize, pageindex, filtre);
    };
	$scope.shop_myparams.getdetailcallback = function(key) {
		return ApiShop.get(key);
    };
	$scope.shop_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for badge ------ 
    $scope.badge_myparams = {};
    $scope.badge_myparams.pageSize = 5;	
    $scope.badge_myparams.paginated = true;
    $scope.badge_myparams.key = ApiStructure.getStructureKey("badge");
	$scope.badge_myparams.detail = ApiStructure.getStructureDetail("badge");
	$scope.badge_myparams.columns = ApiStructure.getStructureColumns("badge");
	$scope.badge_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiBadge.search($scope.badge_myparams.pageSize, pageindex, filtre);
    };
	$scope.badge_myparams.getdetailcallback = function(key) {
		return ApiBadge.get(key);
    };
	$scope.badge_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);
