
// publisher module add into global module (see app.js)
var apppublisher = angular.module('app.publisher', ['app.publisher.services'], function($routeProvider, $locationProvider) {

	// publisher list
	$routeProvider.when('/publisher', {
		templateUrl: 'gen/pages/publisher/list.html'
	});

	// publisher create
	$routeProvider.when('/publisher/create', {
		templateUrl: 'gen/pages/publisher/create.html'
	});

	// publisher edit
	$routeProvider.when('/publisher/:id', {
		templateUrl: 'gen/pages/publisher/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
apppublisher.controller('PublisherListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiPublisher', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiPublisher, ApiStorage) {
	$rootScope.logMe("PublisherListCtrl");
	var self = this;
	
	var listTmp = ApiPublisher.search();
	$scope.publishers = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Publisher call
	$scope.openCreatePublisherPage = function () {
		$rootScope.logMe("openCreatePublisherPage");
		$location.path("/publisher/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
apppublisher.controller('PublisherDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiPublisher', 'ApiStructure', 
		'ApiCountry',
		function ($scope, $location, $routeParams, $rootScope, ApiPublisher, ApiStructure
		, ApiCountry
		) {
	$rootScope.logMe("PublisherDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get publisher ");
	$scope.onepublisher = ApiPublisher.get($scope.idCurrent);
	
	if ($scope.onepublisher === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Publisher update
	$scope.updatePublisher = function () {
		$rootScope.logMe("updatePublisher");
		if (ApiPublisher.update($scope.idCurrent, $scope.onepublisher)) {
			$rootScope.showInfo("The publisher has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Publisher remove
	$scope.removePublisher = function () {
		$rootScope.logMe("removePublisher");
		if (ApiPublisher.remove($scope.idCurrent)) {
			$rootScope.showInfo("The publisher has been successfully removed");
			$location.path("/publisher");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListPublisherPage = function () {
		$rootScope.logMe("openListPublisherPage");
		$location.path("/publisher");
	};

	// ------ Directive configuration for country ------ 
    $scope.country_myparams = {};
    $scope.country_myparams.pageSize = 5;	
    $scope.country_myparams.paginated = true;
    $scope.country_myparams.key = ApiStructure.getStructureKey("country");
	$scope.country_myparams.detail = ApiStructure.getStructureDetail("country");
	$scope.country_myparams.columns = ApiStructure.getStructureColumns("country");
	$scope.country_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiCountry.search($scope.country_myparams.pageSize, pageindex, filtre);
    };
	$scope.country_myparams.getdetailcallback = function(key) {
		return ApiCountry.get(key);
    };
	$scope.country_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
apppublisher.controller('PublisherCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiPublisher', 'ApiStructure', 
		'ApiCountry',
		function ($scope, $location, $routeParams, $rootScope, ApiPublisher, ApiStructure
		, ApiCountry
		) {
	$rootScope.logMe("PublisherCreateCtrl");
	$scope.onepublisher = {};
	
	// Publisher save
	$scope.savePublisher = function () {
		$rootScope.logMe("savePublisher");
		if (ApiPublisher.create($scope.onepublisher)) {
			$rootScope.showInfo("The publisher has been successfully created");
			$location.path("/publisher");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListPublisherPage = function () {
		$rootScope.logMe("openListPublisherPage");
		$location.path("/publisher");
	};

	// ------ Directive configuration for country ------ 
    $scope.country_myparams = {};
    $scope.country_myparams.pageSize = 5;	
    $scope.country_myparams.paginated = true;
    $scope.country_myparams.key = ApiStructure.getStructureKey("country");
	$scope.country_myparams.detail = ApiStructure.getStructureDetail("country");
	$scope.country_myparams.columns = ApiStructure.getStructureColumns("country");
	$scope.country_myparams.getlistcallback = function(pageindex, filtre) {
        return ApiCountry.search($scope.country_myparams.pageSize, pageindex, filtre);
    };
	$scope.country_myparams.getdetailcallback = function(key) {
		return ApiCountry.get(key);
    };
	$scope.country_myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };

}]);
