
// book module add into global module (see app.js)
var appbook = angular.module('app.book', ['app.book.services'], function($routeProvider, $locationProvider) {

	// book list
	$routeProvider.when('/book', {
		templateUrl: 'gen/pages/book/list.html'
	});

	// book create
	$routeProvider.when('/book/create', {
		templateUrl: 'gen/pages/book/create.html'
	});

	// book edit
	$routeProvider.when('/book/:id', {
		templateUrl: 'gen/pages/book/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appbook.controller('BookListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBook, ApiStorage) {
	$rootScope.logMe("BookListCtrl");
	var self = this;
	
	var listTmp = ApiBook.search();
	$scope.books = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Book call
	$scope.openCreateBookPage = function () {
		$rootScope.logMe("openCreateBookPage");
		$location.path("/book/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appbook.controller('BookDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', 'ApiStructure', 
		'ApiAuthor',
		'ApiPublisher',
		function ($scope, $location, $routeParams, $rootScope, ApiBook, ApiStructure
		, ApiAuthor
		, ApiPublisher
		) {
	$rootScope.logMe("BookDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get book ");
	$scope.onebook = ApiBook.get($scope.idCurrent);
	
	if ($scope.onebook === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Book update
	$scope.updateBook = function () {
		$rootScope.logMe("updateBook");
		if (ApiBook.update($scope.idCurrent, $scope.onebook)) {
			$rootScope.showInfo("The book has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Book remove
	$scope.removeBook = function () {
		$rootScope.logMe("removeBook");
		if (ApiBook.remove($scope.idCurrent)) {
			$rootScope.showInfo("The book has been successfully removed");
			$location.path("/book");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookPage = function () {
		$rootScope.logMe("openListBookPage");
		$location.path("/book");
	};

	// ------ Directive configuration for author ------ 
    $scope.author_myparams = {};
    $scope.author_myparams.pageSize = 5;	
    $scope.author_myparams.paginated = true;
    $scope.author_myparams.key = ApiStructure.getStructureKey("author");
	$scope.author_myparams.detail = ApiStructure.getStructureDetail("author");
	$scope.author_myparams.columns = ApiStructure.getStructureColumns("author");
	$scope.author_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiAuthor.search($scope.author_myparams.pageSize, pageindex, filtre);
    };
	$scope.author_myparams.getdetailcallback = function(key) {
		return ApiAuthor.get(key);
    };
	$scope.author_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for publisher ------ 
    $scope.publisher_myparams = {};
    $scope.publisher_myparams.pageSize = 5;	
    $scope.publisher_myparams.paginated = true;
    $scope.publisher_myparams.key = ApiStructure.getStructureKey("publisher");
	$scope.publisher_myparams.detail = ApiStructure.getStructureDetail("publisher");
	$scope.publisher_myparams.columns = ApiStructure.getStructureColumns("publisher");
	$scope.publisher_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiPublisher.search($scope.publisher_myparams.pageSize, pageindex, filtre);
    };
	$scope.publisher_myparams.getdetailcallback = function(key) {
		return ApiPublisher.get(key);
    };
	$scope.publisher_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appbook.controller('BookCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', 'ApiStructure', 
		'ApiAuthor',
		'ApiPublisher',
		function ($scope, $location, $routeParams, $rootScope, ApiBook, ApiStructure
		, ApiAuthor
		, ApiPublisher
		) {
	$rootScope.logMe("BookCreateCtrl");
	$scope.onebook = {};
	
	// Book save
	$scope.saveBook = function () {
		$rootScope.logMe("saveBook");
		if (ApiBook.create($scope.onebook)) {
			$rootScope.showInfo("The book has been successfully created");
			$location.path("/book");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookPage = function () {
		$rootScope.logMe("openListBookPage");
		$location.path("/book");
	};

	// ------ Directive configuration for author ------ 
    $scope.author_myparams = {};
    $scope.author_myparams.pageSize = 5;	
    $scope.author_myparams.paginated = true;
    $scope.author_myparams.key = ApiStructure.getStructureKey("author");
	$scope.author_myparams.detail = ApiStructure.getStructureDetail("author");
	$scope.author_myparams.columns = ApiStructure.getStructureColumns("author");
	$scope.author_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiAuthor.search($scope.author_myparams.pageSize, pageindex, filtre);
    };
	$scope.author_myparams.getdetailcallback = function(key) {
		return ApiAuthor.get(key);
    };
	$scope.author_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

	// ------ Directive configuration for publisher ------ 
    $scope.publisher_myparams = {};
    $scope.publisher_myparams.pageSize = 5;	
    $scope.publisher_myparams.paginated = true;
    $scope.publisher_myparams.key = ApiStructure.getStructureKey("publisher");
	$scope.publisher_myparams.detail = ApiStructure.getStructureDetail("publisher");
	$scope.publisher_myparams.columns = ApiStructure.getStructureColumns("publisher");
	$scope.publisher_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiPublisher.search($scope.publisher_myparams.pageSize, pageindex, filtre);
    };
	$scope.publisher_myparams.getdetailcallback = function(key) {
		return ApiPublisher.get(key);
    };
	$scope.publisher_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);
