
// review module add into global module (see app.js)
var appreview = angular.module('app.review', ['app.review.services'], function($routeProvider, $locationProvider) {

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


// -------------------- List Ctrl -------------------------------------------------------------------
appreview.controller('ReviewListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiReview', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiReview, ApiStorage) {
	$rootScope.logMe("ReviewListCtrl");
	var self = this;
	
	var listTmp = ApiReview.search();
	$scope.reviews = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Review call
	$scope.openCreateReviewPage = function () {
		$rootScope.logMe("openCreateReviewPage");
		$location.path("/review/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appreview.controller('ReviewDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiReview', 'ApiStructure', 
		'ApiBook',
		'ApiCustomer',
		function ($scope, $location, $routeParams, $rootScope, ApiReview, ApiStructure
		, ApiBook
		, ApiCustomer
		) {
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
appreview.controller('ReviewCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiReview', 'ApiStructure', 
		'ApiBook',
		'ApiCustomer',
		function ($scope, $location, $routeParams, $rootScope, ApiReview, ApiStructure
		, ApiBook
		, ApiCustomer
		) {
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
