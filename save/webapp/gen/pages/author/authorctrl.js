// author module add into global module (see app.js)
var appauthor = angular.module('app.author', ['app.author.services'], function($routeProvider, $locationProvider) {

	// author list
	$routeProvider.when('/author', {
		templateUrl: 'gen/pages/author/list.html'
	});

	// author create
	$routeProvider.when('/author/create', {
		templateUrl: 'gen/pages/author/create.html'
	});

	// author edit
	$routeProvider.when('/author/:id', {
		templateUrl: 'gen/pages/author/edit.html'
	});

});

// author Controllers
appauthor.controller('AuthorListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiAuthor', function ($scope, $location, $routeParams, $rootScope, ApiAuthor) {
	$rootScope.logMe("AuthorListCtrl");
	
	var searchResult = ApiAuthor.search();
	$scope.authors = searchResult.datapage; // TODO pagination ?
	$rootScope.logMe("search end");

	// new Author call
	$scope.openCreateAuthorPage = function () {
		$rootScope.logMe("openCreateAuthorPage");
		$location.path("/author/create");
	};

}]);


appauthor.controller('AuthorDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiAuthor', function ($scope, $location, $routeParams, $rootScope, ApiAuthor) {
	$rootScope.logMe("AuthorDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get author ");
	$scope.oneauthor = ApiAuthor.get($scope.idCurrent);
	
	if ($scope.oneauthor === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Author update
	$scope.updateAuthor = function () {
		$rootScope.logMe("updateAuthor");
		if (ApiAuthor.update($scope.idCurrent, $scope.oneauthor)) {
			$rootScope.showInfo("The author has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Author remove
	$scope.removeAuthor = function () {
		$rootScope.logMe("removeAuthor");
		if (ApiAuthor.remove($scope.oneauthor)) {
			$rootScope.showInfo("The author has been successfully removed");
			$location.path("/author");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListAuthorPage = function () {
		$rootScope.logMe("openListAuthorPage");
		$location.path("/author");
	};

}]);

appauthor.controller('AuthorCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiAuthor', function ($scope, $location, $routeParams, $rootScope, ApiAuthor) {
	$rootScope.logMe("AuthorCreateCtrl");
	$scope.oneauthor = {};
	
	// Author save
	$scope.saveAuthor = function () {
		$rootScope.logMe("saveAuthor");
		if (ApiAuthor.create($scope.oneauthor)) {
			$rootScope.showInfo("The author has been successfully created");
			$location.path("/author");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListAuthorPage = function () {
		$rootScope.logMe("openListAuthorPage");
		$location.path("/author");
	};

}]);
