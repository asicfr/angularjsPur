
// bookorderitem module add into global module (see app.js)
var appbookorderitem = angular.module('app.bookorderitem', ['app.bookorderitem.services'], function($routeProvider, $locationProvider) {

	// bookorderitem list
	$routeProvider.when('/bookorderitem', {
		templateUrl: 'gen/pages/bookorderitem/list.html'
	});

	// bookorderitem create
	$routeProvider.when('/bookorderitem/create', {
		templateUrl: 'gen/pages/bookorderitem/create.html'
	});

	// bookorderitem edit
	$routeProvider.when('/bookorderitem/:id', {
		templateUrl: 'gen/pages/bookorderitem/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appbookorderitem.controller('BookOrderItemListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrderItem', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBookOrderItem, ApiStorage) {
	$rootScope.logMe("BookOrderItemListCtrl");
	var self = this;
	
	var listTmp = ApiBookOrderItem.search();
	$scope.bookorderitems = listTmp.datapage;
	$rootScope.logMe("search end");

	// new BookOrderItem call
	$scope.openCreateBookOrderItemPage = function () {
		$rootScope.logMe("openCreateBookOrderItemPage");
		$location.path("/bookorderitem/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appbookorderitem.controller('BookOrderItemDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrderItem', 'ApiStructure', 
		'ApiBookOrder',
		'ApiBook',
		function ($scope, $location, $routeParams, $rootScope, ApiBookOrderItem, ApiStructure
		, ApiBookOrder
		, ApiBook
		) {
	$rootScope.logMe("BookOrderItemDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get bookorderitem ");
	$scope.onebookorderitem = ApiBookOrderItem.get($scope.idCurrent);
	
	if ($scope.onebookorderitem === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// BookOrderItem update
	$scope.updateBookOrderItem = function () {
		$rootScope.logMe("updateBookOrderItem");
		if (ApiBookOrderItem.update($scope.idCurrent, $scope.onebookorderitem)) {
			$rootScope.showInfo("The bookorderitem has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// BookOrderItem remove
	$scope.removeBookOrderItem = function () {
		$rootScope.logMe("removeBookOrderItem");
		if (ApiBookOrderItem.remove($scope.idCurrent)) {
			$rootScope.showInfo("The bookorderitem has been successfully removed");
			$location.path("/bookorderitem");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookOrderItemPage = function () {
		$rootScope.logMe("openListBookOrderItemPage");
		$location.path("/bookorderitem");
	};

	// ------ Directive configuration for bookOrder ------ 
    $scope.bookOrder_myparams = {};
    $scope.bookOrder_myparams.pageSize = 5;	
    $scope.bookOrder_myparams.paginated = true;
    $scope.bookOrder_myparams.key = ApiStructure.getStructureKey("bookorder");
	$scope.bookOrder_myparams.detail = ApiStructure.getStructureDetail("bookorder");
	$scope.bookOrder_myparams.columns = ApiStructure.getStructureColumns("bookorder");
	$scope.bookOrder_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiBookOrder.search($scope.bookOrder_myparams.pageSize, pageindex, filtre);
    };
	$scope.bookOrder_myparams.getdetailcallback = function(key) {
		return ApiBookOrder.get(key);
    };
	$scope.bookOrder_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for book ------ 
    $scope.book_myparams = {};
    $scope.book_myparams.pageSize = 5;	
    $scope.book_myparams.paginated = true;
    $scope.book_myparams.key = ApiStructure.getStructureKey("book");
	$scope.book_myparams.detail = ApiStructure.getStructureDetail("book");
	$scope.book_myparams.columns = ApiStructure.getStructureColumns("book");
	$scope.book_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiBook.search($scope.book_myparams.pageSize, pageindex, filtre);
    };
	$scope.book_myparams.getdetailcallback = function(key) {
		return ApiBook.get(key);
    };
	$scope.book_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appbookorderitem.controller('BookOrderItemCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrderItem', 'ApiStructure', 
		'ApiBookOrder',
		'ApiBook',
		function ($scope, $location, $routeParams, $rootScope, ApiBookOrderItem, ApiStructure
		, ApiBookOrder
		, ApiBook
		) {
	$rootScope.logMe("BookOrderItemCreateCtrl");
	$scope.onebookorderitem = {};
	
	// BookOrderItem save
	$scope.saveBookOrderItem = function () {
		$rootScope.logMe("saveBookOrderItem");
		if (ApiBookOrderItem.create($scope.onebookorderitem)) {
			$rootScope.showInfo("The bookorderitem has been successfully created");
			$location.path("/bookorderitem");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookOrderItemPage = function () {
		$rootScope.logMe("openListBookOrderItemPage");
		$location.path("/bookorderitem");
	};

	// ------ Directive configuration for bookOrder ------ 
    $scope.bookOrder_myparams = {};
    $scope.bookOrder_myparams.pageSize = 5;	
    $scope.bookOrder_myparams.paginated = true;
    $scope.bookOrder_myparams.key = ApiStructure.getStructureKey("bookorder");
	$scope.bookOrder_myparams.detail = ApiStructure.getStructureDetail("bookorder");
	$scope.bookOrder_myparams.columns = ApiStructure.getStructureColumns("bookorder");
	$scope.bookOrder_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiBookOrder.search($scope.bookOrder_myparams.pageSize, pageindex, filtre);
    };
	$scope.bookOrder_myparams.getdetailcallback = function(key) {
		return ApiBookOrder.get(key);
    };
	$scope.bookOrder_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for book ------ 
    $scope.book_myparams = {};
    $scope.book_myparams.pageSize = 5;	
    $scope.book_myparams.paginated = true;
    $scope.book_myparams.key = ApiStructure.getStructureKey("book");
	$scope.book_myparams.detail = ApiStructure.getStructureDetail("book");
	$scope.book_myparams.columns = ApiStructure.getStructureColumns("book");
	$scope.book_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiBook.search($scope.book_myparams.pageSize, pageindex, filtre);
    };
	$scope.book_myparams.getdetailcallback = function(key) {
		return ApiBook.get(key);
    };
	$scope.book_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);
