
// review module add into global module (see mainctrl.js)
var bookStorereview = angular.module('bookStore.review', ['bookStore.review.services'], function($routeProvider, $locationProvider) {

	// review list
	$routeProvider.when('/review', {
		templateUrl: 'gen/pages/review/list.html'
	});

	// review create
	$routeProvider.when('/review/create', {
		templateUrl: 'gen/pages/review/create.html'
	});

	// review edit
	$routeProvider.when('/review/:id', {
		templateUrl: 'gen/pages/review/edit.html'
	});

});

// review Controllers
bookStorereview.controller('ReviewListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiReview', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiReview, ApiStorage) {
	$rootScope.logMe("ReviewListCtrl");
	var self = this;
	
	$scope.reviews = ApiReview.search();
	$rootScope.logMe("search end");

	// new Review call
	$scope.openCreateReviewPage = function () {
		$rootScope.logMe("openCreateReviewPage");
		$location.path("/review/create");
	};

}]);


bookStorereview.controller('ReviewDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiReview', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiReview, ApiStorage) {
	$rootScope.logMe("ReviewDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get review ");
	$scope.onereview = ApiReview.get($scope.idCurrent);
	
	if ($scope.onereview === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Review update
	$scope.updateReview = function () {
		$rootScope.logMe("updateReview");
		if (ApiReview.update($scope.idCurrent, $scope.onereview)) {
			$rootScope.showInfo("The review has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Review remove
	$scope.removeReview = function () {
		$rootScope.logMe("removeReview");
		if (ApiReview.remove($scope.idCurrent)) {
			$rootScope.showInfo("The review has been successfully removed");
			$location.path("/review");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListReviewPage = function () {
		$rootScope.logMe("openListReviewPage");
		$location.path("/review");
	};

}]);

bookStorereview.controller('ReviewCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiReview', function ($scope, $location, $routeParams, $rootScope, ApiReview) {
	$rootScope.logMe("ReviewCreateCtrl");
	$scope.onereview = {};
	
	// Review save
	$scope.saveReview = function () {
		$rootScope.logMe("saveReview");
		if (ApiReview.create($scope.onereview)) {
			$rootScope.showInfo("The review has been successfully created");
			$location.path("/review");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListReviewPage = function () {
		$rootScope.logMe("openListReviewPage");
		$location.path("/review");
	};

}]);
