// Global module
var bookStore = angular.module('bookStore', ['bookStore.main', 
    'myselect.services',
    'telosysDirectives',
    'bookStore.author', 
    'bookStore.badge', 
    'bookStore.book', 
    'bookStore.bookorder', 
    'bookStore.bookorderitem', 
    'bookStore.country', 
    'bookStore.customer', 
    'bookStore.employee', 
    'bookStore.employeegroup', 
    'bookStore.publisher', 
    'bookStore.review', 
    'bookStore.shop', 
    'bookStore.synopsis', 
    'bookStore.workgroup', 
    'bookStore.storage.services']);

// Add usefull fct into rootScope
bookStore.run(function($rootScope, $templateCache, $http, ApiStorage) {

	// Force template cache to allow offline for all partials
	$http.get('gen/global/footer.html', {cache:$templateCache});
    $http.get('gen/global/header.html', {cache:$templateCache});
    $http.get('inprogress.html', {cache:$templateCache});
    $http.get('welcome.html', {cache:$templateCache});

    $http.get('gen/pages/author/create.html', {cache:$templateCache});
    $http.get('gen/pages/author/edit.html', {cache:$templateCache});
    $http.get('gen/pages/author/list.html', {cache:$templateCache});
    $http.get('gen/pages/badge/create.html', {cache:$templateCache});
    $http.get('gen/pages/badge/edit.html', {cache:$templateCache});
    $http.get('gen/pages/badge/list.html', {cache:$templateCache});
    $http.get('gen/pages/book/create.html', {cache:$templateCache});
    $http.get('gen/pages/book/edit.html', {cache:$templateCache});
    $http.get('gen/pages/book/list.html', {cache:$templateCache});
    $http.get('gen/pages/bookorder/create.html', {cache:$templateCache});
    $http.get('gen/pages/bookorder/edit.html', {cache:$templateCache});
    $http.get('gen/pages/bookorder/list.html', {cache:$templateCache});
    $http.get('gen/pages/bookorderitem/create.html', {cache:$templateCache});
    $http.get('gen/pages/bookorderitem/edit.html', {cache:$templateCache});
    $http.get('gen/pages/bookorderitem/list.html', {cache:$templateCache});
    $http.get('gen/pages/country/create.html', {cache:$templateCache});
    $http.get('gen/pages/country/edit.html', {cache:$templateCache});
    $http.get('gen/pages/country/list.html', {cache:$templateCache});
    $http.get('gen/pages/customer/create.html', {cache:$templateCache});
    $http.get('gen/pages/customer/edit.html', {cache:$templateCache});
    $http.get('gen/pages/customer/list.html', {cache:$templateCache});
    $http.get('gen/pages/employee/create.html', {cache:$templateCache});
    $http.get('gen/pages/employee/edit.html', {cache:$templateCache});
    $http.get('gen/pages/employee/list.html', {cache:$templateCache});
    $http.get('gen/pages/employeegroup/create.html', {cache:$templateCache});
    $http.get('gen/pages/employeegroup/edit.html', {cache:$templateCache});
    $http.get('gen/pages/employeegroup/list.html', {cache:$templateCache});
    $http.get('gen/pages/publisher/create.html', {cache:$templateCache});
    $http.get('gen/pages/publisher/edit.html', {cache:$templateCache});
    $http.get('gen/pages/publisher/list.html', {cache:$templateCache});
    $http.get('gen/pages/review/create.html', {cache:$templateCache});
    $http.get('gen/pages/review/edit.html', {cache:$templateCache});
    $http.get('gen/pages/review/list.html', {cache:$templateCache});
    $http.get('gen/pages/shop/create.html', {cache:$templateCache});
    $http.get('gen/pages/shop/edit.html', {cache:$templateCache});
    $http.get('gen/pages/shop/list.html', {cache:$templateCache});
    $http.get('gen/pages/synopsis/create.html', {cache:$templateCache});
    $http.get('gen/pages/synopsis/edit.html', {cache:$templateCache});
    $http.get('gen/pages/synopsis/list.html', {cache:$templateCache});
    $http.get('gen/pages/workgroup/create.html', {cache:$templateCache});
    $http.get('gen/pages/workgroup/edit.html', {cache:$templateCache});
    $http.get('gen/pages/workgroup/list.html', {cache:$templateCache});

	// Logger
	$rootScope.logMe = function (logentry) {
		console.log(logentry);
	};

	$rootScope.showInfo = function(message) {
		$rootScope.show(message, "alert-success");
    }

	$rootScope.showError = function(message) {
		$rootScope.show(message, "alert-error");
    }

	$rootScope.show = function(message, myclass) {
        $('#alert_placeholder').html('<div class="alert ' + myclass + '"><a class="close" data-dismiss="alert">�?</a><span>'+message+'</span></div>')
		window.setTimeout(function() { $(".alert").alert('close'); }, 3000);
    }

});

// Welcome module
var bookStoremain = angular.module('bookStore.main', [], function($routeProvider, $locationProvider) {
	
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
bookStoremain.controller('MainCtrl', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
    var self = this;
}]);

