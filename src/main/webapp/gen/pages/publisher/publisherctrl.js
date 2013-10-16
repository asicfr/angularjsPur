
// publisher module add into global module (see mainctrl.js)
var bookStorepublisher = angular.module('bookStore.publisher', ['bookStore.publisher.services'], function($routeProvider, $locationProvider) {

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

// publisher Controllers
bookStorepublisher.controller('PublisherListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiPublisher', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiPublisher, ApiStorage) {
	$rootScope.logMe("PublisherListCtrl");
	var self = this;
	
	$scope.publishers = ApiPublisher.search();
	$rootScope.logMe("search end");

	// new Publisher call
	$scope.openCreatePublisherPage = function () {
		$rootScope.logMe("openCreatePublisherPage");
		$location.path("/publisher/create");
	};

}]);


bookStorepublisher.controller('PublisherDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiPublisher', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiPublisher, ApiStorage) {
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

}]);

bookStorepublisher.controller('PublisherCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiPublisher', function ($scope, $location, $routeParams, $rootScope, ApiPublisher) {
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

}]);
