
// book module add into global module (see app.js)
var appbook = angular.module('app.book', ['app.book.services', 'app.author.services'], function($routeProvider, $locationProvider) {

	// book list
	$routeProvider.when('/book', {
		templateUrl: 'gen/pages/book/list.html'
	});

	// book create
	$routeProvider.when('/book/create', {
		templateUrl: 'gen/pages/book/create.html'
	});

	// book edit
	$routeProvider.when('/book/:id', {
		templateUrl: 'gen/pages/book/edit.html'
	});

});

// book Controllers
appbook.controller('BookListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', function ($scope, $location, $routeParams, $rootScope, ApiBook) {
	$rootScope.logMe("BookListCtrl");
	var self = this;
	
	var searchResult = ApiBook.search();
	$scope.books = searchResult.datapage;
	$rootScope.logMe("search end");

	// new Book call
	$scope.openCreateBookPage = function () {
		$rootScope.logMe("openCreateBookPage");
		$location.path("/book/create");
	};

}]);


appbook.controller('BookDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', 'ApiAuthor', function ($scope, $location, $routeParams, $rootScope, ApiBook, ApiAuthor) {
	$rootScope.logMe("BookDetailCtrl");
	$scope.idCurrent = $routeParams.id;
	
	$rootScope.logMe("get book ");
	$scope.onebook = ApiBook.get($scope.idCurrent);
	
	if ($scope.onebook === undefined) {
		$rootScope.showError("An error has occurred !");
	}
	
	// Book update
	$scope.updateBook = function () {
		$rootScope.logMe("updateBook");
		if (ApiBook.update($scope.idCurrent, $scope.onebook)) {
			$rootScope.showInfo("The book has been successfully updated");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Book remove
	$scope.removeBook = function () {
		$rootScope.logMe("removeBook");
		if (ApiBook.remove($scope.onebook)) {
			$rootScope.showInfo("The book has been successfully removed");
			$location.path("/book");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookPage = function () {
		$rootScope.logMe("openListBookPage");
		$location.path("/book");
	};

}]);

appbook.controller('BookCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', 'ApiAuthor', function ($scope, $location, $routeParams, $rootScope, ApiBook, ApiAuthor) {
	$rootScope.logMe("BookCreateCtrl");
	$scope.onebook = {};
	
	// Book save
	$scope.saveBook = function () {
		$rootScope.logMe("saveBook");
		if (ApiBook.create($scope.onebook)) {
			$rootScope.showInfo("The book has been successfully created");
			$location.path("/book");
		} else {
			$rootScope.showError("An error has occurred !");
		}
	};

	// Return to list
	$scope.openListBookPage = function () {
		$rootScope.logMe("openListBookPage");
		$location.path("/book");
	};

	
	// --------------------------------------------------------------------
    // directive parameters
    $scope.myparams = {};
    $scope.myparams.pageSize = 5;	
    $scope.myparams.key = "id";
	$scope.myparams.detail = [ // TODO ApiAuthor.getStructure
        {"key":"firstName", "label":"First name"}, 
        {"key":"lastName", "label":"Last name"}
    ];
	$scope.myparams.columns = [ // TODO ApiAuthor.getStructure
        {"key":"firstName", "label":"First name"}, 
        {"key":"lastName", "label":"Last name"}
    ];
    $scope.myparams.paginated = true;
    
    // Call Services
	$scope.myparams.getlistcallback = function(pageindex, filtre) {
        return ApiAuthor.search($scope.myparams.pageSize, pageindex, filtre);
    };
	$scope.myparams.getdetailcallback = function(key) {
		return ApiAuthor.get(key);
    };
	$scope.myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };
	// --------------------------------------------------------------------
	
}]);


appbook.controller('AuthorSelectCtrl', ['$scope', 'ApiBook', 'ApiAuthor', function($scope, ApiBook, ApiAuthor) {
    $scope.selectedElement = null;

    // DIRECTIVE POUR BOOK PERMETTANT DE RECUPERER LES DONNEES AUTHOR !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    // directive parameters
    $scope.myparams = {};
    $scope.myparams.pageSize = 5;

	// ----------------------------------------------------------------
    
    // TODO ou doit-on mettre ca ?
    // ca devrait appartenir au service de l'entite
    // mais on devrait pouvoir le surcharger ?
    // et c'est utilisé par le template .... pffffuuuuu
    
	//// TODO a generer
	//$scope.myparams.key = "id";
	//$scope.myparams.detail = [
	//    {"key":"id", "label":"the id"}, 
	//    {"key":"firstName", "label":"the first name"}, 
	//    {"key":"lastName", "label":"the last name"}
	//];
	//$scope.myparams.columns = [
	//    {"key":"firstName", "label":"the first name"}, 
	//    {"key":"lastName", "label":"the last name"}
	//];
	// ----------------------------------------------------------------
	
    // Mock server
	$scope.myparams.getlistcallback = function(pageIndex, filtre) {
		
		// TODO ne doit on pas laisser le "serveur" trier/filter les données ??????????????
		// TODO il faut passer pageindex, filtre mais aussi pageSize a la fonction de recherche
		// ce n'est pas ici qu'il faut trier ou filtrer !!!
		
		var datas = ApiAuthor.search($scope.myparams.pageSize, pageIndex, filtre);
		// datas est une map, un objet javascript avec des clés et des valeurs
		return datas;
		
    };
	$scope.myparams.getdetailcallback = function(key) {
		var found = ApiAuthor.get(id);
        // var filtered = $scope.alldata.filter(function(x) { return x.id === key; });
        // return filtered[0];
		return found;
    };
	$scope.myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };
    
}]);

