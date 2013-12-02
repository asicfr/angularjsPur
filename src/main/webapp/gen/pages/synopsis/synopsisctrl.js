
// synopsis module add into global module (see app.js)
var appsynopsis = angular.module('app.synopsis', ['app.synopsis.services'], function($routeProvider, $locationProvider) {

	// synopsis list
	$routeProvider.when('/synopsis', {
		templateUrl: 'gen/pages/synopsis/list.html'
	});

	// synopsis create
	$routeProvider.when('/synopsis/create', {
		templateUrl: 'gen/pages/synopsis/create.html'
	});

	// synopsis edit
	$routeProvider.when('/synopsis/:id', {
		templateUrl: 'gen/pages/synopsis/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appsynopsis.controller('SynopsisListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiSynopsis', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiSynopsis, ApiStorage) {
	$rootScope.logMe("SynopsisListCtrl");
	var self = this;
	
	var listTmp = ApiSynopsis.search();
	$scope.synopsiss = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Synopsis call
	$scope.openCreateSynopsisPage = function () {
		$rootScope.logMe("openCreateSynopsisPage");
		$location.path("/synopsis/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appsynopsis.controller('SynopsisDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiSynopsis', 'ApiStructure', 
		'ApiBook',
		function ($scope, $location, $routeParams, $rootScope, ApiSynopsis, ApiStructure
		, ApiBook
		) {
	$rootScope.logMe("SynopsisDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get synopsis ");
	$scope.onesynopsis = ApiSynopsis.get($scope.idCurrent);
	
	if ($scope.onesynopsis === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Synopsis update
	$scope.updateSynopsis = function () {
		$rootScope.logMe("updateSynopsis");
		if (ApiSynopsis.update($scope.idCurrent, $scope.onesynopsis)) {
			$rootScope.showInfo("The synopsis has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Synopsis remove
	$scope.removeSynopsis = function () {
		$rootScope.logMe("removeSynopsis");
		if (ApiSynopsis.remove($scope.idCurrent)) {
			$rootScope.showInfo("The synopsis has been successfully removed");
			$location.path("/synopsis");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListSynopsisPage = function () {
		$rootScope.logMe("openListSynopsisPage");
		$location.path("/synopsis");
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
appsynopsis.controller('SynopsisCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiSynopsis', 'ApiStructure', 
		'ApiBook',
		function ($scope, $location, $routeParams, $rootScope, ApiSynopsis, ApiStructure
		, ApiBook
		) {
	$rootScope.logMe("SynopsisCreateCtrl");
	$scope.onesynopsis = {};
	
	// Synopsis save
	$scope.saveSynopsis = function () {
		$rootScope.logMe("saveSynopsis");
		if (ApiSynopsis.create($scope.onesynopsis)) {
			$rootScope.showInfo("The synopsis has been successfully created");
			$location.path("/synopsis");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListSynopsisPage = function () {
		$rootScope.logMe("openListSynopsisPage");
		$location.path("/synopsis");
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
