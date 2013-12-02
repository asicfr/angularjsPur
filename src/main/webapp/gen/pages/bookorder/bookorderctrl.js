
// bookorder module add into global module (see app.js)
var appbookorder = angular.module('app.bookorder', ['app.bookorder.services'], function($routeProvider, $locationProvider) {

	// bookorder list
	$routeProvider.when('/bookorder', {
		templateUrl: 'gen/pages/bookorder/list.html'
	});

	// bookorder create
	$routeProvider.when('/bookorder/create', {
		templateUrl: 'gen/pages/bookorder/create.html'
	});

	// bookorder edit
	$routeProvider.when('/bookorder/:id', {
		templateUrl: 'gen/pages/bookorder/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appbookorder.controller('BookOrderListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrder', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBookOrder, ApiStorage) {
	$rootScope.logMe("BookOrderListCtrl");
	var self = this;
	
	var listTmp = ApiBookOrder.search();
	$scope.bookorders = listTmp.datapage;
	$rootScope.logMe("search end");

	// new BookOrder call
	$scope.openCreateBookOrderPage = function () {
		$rootScope.logMe("openCreateBookOrderPage");
		$location.path("/bookorder/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appbookorder.controller('BookOrderDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrder', 'ApiStructure', 
		'ApiShop',
		'ApiEmployee',
		'ApiCustomer',
		function ($scope, $location, $routeParams, $rootScope, ApiBookOrder, ApiStructure
		, ApiShop
		, ApiEmployee
		, ApiCustomer
		) {
	$rootScope.logMe("BookOrderDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get bookorder ");
	$scope.onebookorder = ApiBookOrder.get($scope.idCurrent);
	
	if ($scope.onebookorder === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// BookOrder update
	$scope.updateBookOrder = function () {
		$rootScope.logMe("updateBookOrder");
		if (ApiBookOrder.update($scope.idCurrent, $scope.onebookorder)) {
			$rootScope.showInfo("The bookorder has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// BookOrder remove
	$scope.removeBookOrder = function () {
		$rootScope.logMe("removeBookOrder");
		if (ApiBookOrder.remove($scope.idCurrent)) {
			$rootScope.showInfo("The bookorder has been successfully removed");
			$location.path("/bookorder");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookOrderPage = function () {
		$rootScope.logMe("openListBookOrderPage");
		$location.path("/bookorder");
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

	// ------ Directive configuration for customer ------ 
    $scope.customer_myparams = {};
    $scope.customer_myparams.pageSize = 5;	
    $scope.customer_myparams.paginated = true;
    $scope.customer_myparams.key = ApiStructure.getStructureKey("customer");
	$scope.customer_myparams.detail = ApiStructure.getStructureDetail("customer");
	$scope.customer_myparams.columns = ApiStructure.getStructureColumns("customer");
	$scope.customer_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiCustomer.search($scope.customer_myparams.pageSize, pageindex, filtre);
    };
	$scope.customer_myparams.getdetailcallback = function(key) {
		return ApiCustomer.get(key);
    };
	$scope.customer_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appbookorder.controller('BookOrderCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrder', 'ApiStructure', 
		'ApiShop',
		'ApiEmployee',
		'ApiCustomer',
		function ($scope, $location, $routeParams, $rootScope, ApiBookOrder, ApiStructure
		, ApiShop
		, ApiEmployee
		, ApiCustomer
		) {
	$rootScope.logMe("BookOrderCreateCtrl");
	$scope.onebookorder = {};
	
	// BookOrder save
	$scope.saveBookOrder = function () {
		$rootScope.logMe("saveBookOrder");
		if (ApiBookOrder.create($scope.onebookorder)) {
			$rootScope.showInfo("The bookorder has been successfully created");
			$location.path("/bookorder");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookOrderPage = function () {
		$rootScope.logMe("openListBookOrderPage");
		$location.path("/bookorder");
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

	// ------ Directive configuration for customer ------ 
    $scope.customer_myparams = {};
    $scope.customer_myparams.pageSize = 5;	
    $scope.customer_myparams.paginated = true;
    $scope.customer_myparams.key = ApiStructure.getStructureKey("customer");
	$scope.customer_myparams.detail = ApiStructure.getStructureDetail("customer");
	$scope.customer_myparams.columns = ApiStructure.getStructureColumns("customer");
	$scope.customer_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiCustomer.search($scope.customer_myparams.pageSize, pageindex, filtre);
    };
	$scope.customer_myparams.getdetailcallback = function(key) {
		return ApiCustomer.get(key);
    };
	$scope.customer_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);
