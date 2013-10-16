
// bookorder module add into global module (see mainctrl.js)
var bookStorebookorder = angular.module('bookStore.bookorder', ['bookStore.bookorder.services'], function($routeProvider, $locationProvider) {

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

// bookorder Controllers
bookStorebookorder.controller('BookOrderListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrder', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBookOrder, ApiStorage) {
	$rootScope.logMe("BookOrderListCtrl");
	var self = this;
	
	$scope.bookorders = ApiBookOrder.search();
	$rootScope.logMe("search end");

	// new BookOrder call
	$scope.openCreateBookOrderPage = function () {
		$rootScope.logMe("openCreateBookOrderPage");
		$location.path("/bookorder/create");
	};

}]);


bookStorebookorder.controller('BookOrderDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrder', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBookOrder, ApiStorage) {
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

}]);

bookStorebookorder.controller('BookOrderCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrder', function ($scope, $location, $routeParams, $rootScope, ApiBookOrder) {
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

}]);
