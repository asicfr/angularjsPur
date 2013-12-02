
// workgroup module add into global module (see app.js)
var appworkgroup = angular.module('app.workgroup', ['app.workgroup.services'], function($routeProvider, $locationProvider) {

	// workgroup list
	$routeProvider.when('/workgroup', {
		templateUrl: 'gen/pages/workgroup/list.html'
	});

	// workgroup create
	$routeProvider.when('/workgroup/create', {
		templateUrl: 'gen/pages/workgroup/create.html'
	});

	// workgroup edit
	$routeProvider.when('/workgroup/:id', {
		templateUrl: 'gen/pages/workgroup/edit.html'
	});

});


// -------------------- List Ctrl -------------------------------------------------------------------
appworkgroup.controller('WorkgroupListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiWorkgroup', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiWorkgroup, ApiStorage) {
	$rootScope.logMe("WorkgroupListCtrl");
	var self = this;
	
	var listTmp = ApiWorkgroup.search();
	$scope.workgroups = listTmp.datapage;
	$rootScope.logMe("search end");

	// new Workgroup call
	$scope.openCreateWorkgroupPage = function () {
		$rootScope.logMe("openCreateWorkgroupPage");
		$location.path("/workgroup/create");
	};

}]);


// -------------------- Detail Ctrl -------------------------------------------------------------------
appworkgroup.controller('WorkgroupDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiWorkgroup', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiWorkgroup, ApiStructure
		) {
	$rootScope.logMe("WorkgroupDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get workgroup ");
	$scope.oneworkgroup = ApiWorkgroup.get($scope.idCurrent);
	
	if ($scope.oneworkgroup === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Workgroup update
	$scope.updateWorkgroup = function () {
		$rootScope.logMe("updateWorkgroup");
		if (ApiWorkgroup.update($scope.idCurrent, $scope.oneworkgroup)) {
			$rootScope.showInfo("The workgroup has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Workgroup remove
	$scope.removeWorkgroup = function () {
		$rootScope.logMe("removeWorkgroup");
		if (ApiWorkgroup.remove($scope.idCurrent)) {
			$rootScope.showInfo("The workgroup has been successfully removed");
			$location.path("/workgroup");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListWorkgroupPage = function () {
		$rootScope.logMe("openListWorkgroupPage");
		$location.path("/workgroup");
	};

}]);


// -------------------- Create Ctrl -------------------------------------------------------------------
appworkgroup.controller('WorkgroupCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiWorkgroup', 'ApiStructure', 
		function ($scope, $location, $routeParams, $rootScope, ApiWorkgroup, ApiStructure
		) {
	$rootScope.logMe("WorkgroupCreateCtrl");
	$scope.oneworkgroup = {};
	
	// Workgroup save
	$scope.saveWorkgroup = function () {
		$rootScope.logMe("saveWorkgroup");
		if (ApiWorkgroup.create($scope.oneworkgroup)) {
			$rootScope.showInfo("The workgroup has been successfully created");
			$location.path("/workgroup");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListWorkgroupPage = function () {
		$rootScope.logMe("openListWorkgroupPage");
		$location.path("/workgroup");
	};

}]);
