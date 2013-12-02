// Global module
var app = angular.module('app', ['app.main', 
    'selectDirective',
    'app.author', 
    'app.book', 
    'app.storage.services']);

// Add usefull fct into rootScope
app.run(function($rootScope, $templateCache, $http, ApiStorage) {

	// Force template cache to allow offline for all partials
	$http.get('gen/global/footer.html', {cache:$templateCache});
    $http.get('gen/global/header.html', {cache:$templateCache});
    $http.get('inprogress.html', {cache:$templateCache});
    $http.get('welcome.html', {cache:$templateCache});

    $http.get('gen/pages/author/create.html', {cache:$templateCache});
    $http.get('gen/pages/author/edit.html', {cache:$templateCache});
    $http.get('gen/pages/author/list.html', {cache:$templateCache});
    $http.get('gen/pages/book/create.html', {cache:$templateCache});
    $http.get('gen/pages/book/edit.html', {cache:$templateCache});
    $http.get('gen/pages/book/list.html', {cache:$templateCache});

	// Logger
	$rootScope.logMe = function (logentry) {
		console.log(logentry);
	};

	$rootScope.showInfo = function(message) {
		$rootScope.show(message, "alert-success");
    };

	$rootScope.showError = function(message) {
		$rootScope.show(message, "alert-error");
    };

	$rootScope.show = function(message, myclass) {
        $('#alert_placeholder').html('<div class="alert ' + myclass + '"><a class="close" data-dismiss="alert">�?</a><span>'+message+'</span></div>')
		window.setTimeout(function() { $(".alert").alert('close'); }, 3000);
    };

});

// Welcome module
var appmain = angular.module('app.main', [], function($routeProvider, $locationProvider) {
	
	// Declare welcome route
	$routeProvider.when('/welcome', {
		templateUrl : 'welcome.html',
	    controller: 'MainCtrl'
	});

	// Declare futur route
	$routeProvider.when('/inprogress', {
		templateUrl : 'inprogress.html',
	    controller: 'MainCtrl'
	});

	// Declare default route
	$routeProvider.otherwise({
		redirectTo : '/welcome',
	    controller: 'MainCtrl'
	});
});

// Main controller
appmain.controller('MainCtrl', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
    var self = this;
}]);

