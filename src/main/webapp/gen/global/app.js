// Global module
var app = angular.module('app', ['app.main', 
    'selectDirective',
    'app.author', 
    'app.badge', 
    'app.book', 
    'app.bookorder', 
    'app.bookorderitem', 
    'app.country', 
    'app.customer', 
    'app.employee', 
    'app.employeegroup', 
    'app.publisher', 
    'app.review', 
    'app.shop', 
    'app.synopsis', 
    'app.workgroup', 
    'app.storage.services']);

// Add usefull fct into rootScope
app.run(function($rootScope, $templateCache, $http, ApiStorage) {

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
        $('#alert_placeholder').html('<div class="alert ' + myclass + '"><a class="close" data-dismiss="alert">Ã?</a><span>'+message+'</span></div>')
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

