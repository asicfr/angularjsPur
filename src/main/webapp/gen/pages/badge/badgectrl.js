
// badge module add into global module (see app.js)
var appbadge = angular.module('app.badge', ['app.badge.services'], function($routeProvider, $locationProvider) {

	// badge list
	$routeProvider.when('/badge', {
		templateUrl: 'gen/pages/badge/list.html'
	});

	// badge create
	$routeProvider.when('/badge/create', {
		templateUrl: 'gen/pages/badge/create.html'
	});

	// badge edit
	$routeProvider.when('/badge/:id', {
		templateUrl: 'gen/pages/badge/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appbadge.controller('BadgeListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBadge', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBadge, ApiStorage) {
	$rootScope.logMe("BadgeListCtrl");
	var self = this;
	
	var listTmp = ApiBadge.search();
	$scope.badges = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Badge call
	$scope.openCreateBadgePage = function () {
		$rootScope.logMe("openCreateBadgePage");
		$location.path("/badge/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appbadge.controller('BadgeDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBadge', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiBadge, ApiStructure
		) {
	$rootScope.logMe("BadgeDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get badge ");
	$scope.onebadge = ApiBadge.get($scope.idCurrent);
	
	if ($scope.onebadge === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Badge update
	$scope.updateBadge = function () {
		$rootScope.logMe("updateBadge");
		if (ApiBadge.update($scope.idCurrent, $scope.onebadge)) {
			$rootScope.showInfo("The badge has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Badge remove
	$scope.removeBadge = function () {
		$rootScope.logMe("removeBadge");
		if (ApiBadge.remove($scope.idCurrent)) {
			$rootScope.showInfo("The badge has been successfully removed");
			$location.path("/badge");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBadgePage = function () {
		$rootScope.logMe("openListBadgePage");
		$location.path("/badge");
	};

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appbadge.controller('BadgeCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBadge', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiBadge, ApiStructure
		) {
	$rootScope.logMe("BadgeCreateCtrl");
	$scope.onebadge = {};
	
	// Badge save
	$scope.saveBadge = function () {
		$rootScope.logMe("saveBadge");
		if (ApiBadge.create($scope.onebadge)) {
			$rootScope.showInfo("The badge has been successfully created");
			$location.path("/badge");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBadgePage = function () {
		$rootScope.logMe("openListBadgePage");
		$location.path("/badge");
	};

}]);
