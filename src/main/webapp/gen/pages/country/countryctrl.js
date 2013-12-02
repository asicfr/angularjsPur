
// country module add into global module (see app.js)
var appcountry = angular.module('app.country', ['app.country.services'], function($routeProvider, $locationProvider) {

	// country list
	$routeProvider.when('/country', {
		templateUrl: 'gen/pages/country/list.html'
	});

	// country create
	$routeProvider.when('/country/create', {
		templateUrl: 'gen/pages/country/create.html'
	});

	// country edit
	$routeProvider.when('/country/:id', {
		templateUrl: 'gen/pages/country/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appcountry.controller('CountryListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCountry', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiCountry, ApiStorage) {
	$rootScope.logMe("CountryListCtrl");
	var self = this;
	
	var listTmp = ApiCountry.search();
	$scope.countrys = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Country call
	$scope.openCreateCountryPage = function () {
		$rootScope.logMe("openCreateCountryPage");
		$location.path("/country/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appcountry.controller('CountryDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCountry', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiCountry, ApiStructure
		) {
	$rootScope.logMe("CountryDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get country ");
	$scope.onecountry = ApiCountry.get($scope.idCurrent);
	
	if ($scope.onecountry === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Country update
	$scope.updateCountry = function () {
		$rootScope.logMe("updateCountry");
		if (ApiCountry.update($scope.idCurrent, $scope.onecountry)) {
			$rootScope.showInfo("The country has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Country remove
	$scope.removeCountry = function () {
		$rootScope.logMe("removeCountry");
		if (ApiCountry.remove($scope.idCurrent)) {
			$rootScope.showInfo("The country has been successfully removed");
			$location.path("/country");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListCountryPage = function () {
		$rootScope.logMe("openListCountryPage");
		$location.path("/country");
	};

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appcountry.controller('CountryCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiCountry', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiCountry, ApiStructure
		) {
	$rootScope.logMe("CountryCreateCtrl");
	$scope.onecountry = {};
	
	// Country save
	$scope.saveCountry = function () {
		$rootScope.logMe("saveCountry");
		if (ApiCountry.create($scope.onecountry)) {
			$rootScope.showInfo("The country has been successfully created");
			$location.path("/country");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListCountryPage = function () {
		$rootScope.logMe("openListCountryPage");
		$location.path("/country");
	};

}]);
