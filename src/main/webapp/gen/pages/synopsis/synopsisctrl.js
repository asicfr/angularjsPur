
// synopsis module add into global module (see mainctrl.js)
var bookStoresynopsis = angular.module('bookStore.synopsis', ['bookStore.synopsis.services'], function($routeProvider, $locationProvider) {

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

// synopsis Controllers
bookStoresynopsis.controller('SynopsisListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiSynopsis', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiSynopsis, ApiStorage) {
	$rootScope.logMe("SynopsisListCtrl");
	var self = this;
	
	$scope.synopsiss = ApiSynopsis.search();
	$rootScope.logMe("search end");

	// new Synopsis call
	$scope.openCreateSynopsisPage = function () {
		$rootScope.logMe("openCreateSynopsisPage");
		$location.path("/synopsis/create");
	};

}]);


bookStoresynopsis.controller('SynopsisDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiSynopsis', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiSynopsis, ApiStorage) {
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

}]);

bookStoresynopsis.controller('SynopsisCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiSynopsis', function ($scope, $location, $routeParams, $rootScope, ApiSynopsis) {
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

}]);
