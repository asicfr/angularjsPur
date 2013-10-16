
// bookorderitem module add into global module (see mainctrl.js)
var bookStorebookorderitem = angular.module('bookStore.bookorderitem', ['bookStore.bookorderitem.services'], function($routeProvider, $locationProvider) {

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

// bookorderitem Controllers
bookStorebookorderitem.controller('BookOrderItemListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrderItem', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBookOrderItem, ApiStorage) {
	$rootScope.logMe("BookOrderItemListCtrl");
	var self = this;
	
	$scope.bookorderitems = ApiBookOrderItem.search();
	$rootScope.logMe("search end");

	// new BookOrderItem call
	$scope.openCreateBookOrderItemPage = function () {
		$rootScope.logMe("openCreateBookOrderItemPage");
		$location.path("/bookorderitem/create");
	};

}]);


bookStorebookorderitem.controller('BookOrderItemDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrderItem', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBookOrderItem, ApiStorage) {
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

}]);

bookStorebookorderitem.controller('BookOrderItemCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBookOrderItem', function ($scope, $location, $routeParams, $rootScope, ApiBookOrderItem) {
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

}]);
