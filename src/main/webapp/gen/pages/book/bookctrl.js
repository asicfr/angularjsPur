
// book module add into global module (see mainctrl.js)
var bookStorebook = angular.module('bookStore.book', ['bookStore.book.services', 'ngGrid'], function($routeProvider, $locationProvider) {

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
bookStorebook.controller('BookListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBook, ApiStorage) {
	$rootScope.logMe("BookListCtrl");
	var self = this;
	
	$scope.books = ApiBook.search();
	$rootScope.logMe("search end");
	
	// new Book call
	$scope.openCreateBookPage = function () {
		$rootScope.logMe("openCreateBookPage");
		$location.path("/book/create");
	};

}]);


bookStorebook.controller('BookDetailCtrl', ['$scope', '$location', '$routeParams', '$rootScope', 'ApiBook', 'ApiStorage', function ($scope, $location, $routeParams, $rootScope, ApiBook, ApiStorage) {
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
		if (ApiBook.remove($scope.idCurrent)) {
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

bookStorebook.controller('BookCreateCtrl', ['$scope', '$location', '$routeParams', '$rootScope', '$http', 'ApiBook', function ($scope, $location, $routeParams, $rootScope, $http, ApiBook) {
	$rootScope.logMe("BookCreateCtrl");
	$scope.onebook = {};

	
	setScopeForGrid($rootScope, $scope, $http);
	

	$scope.showList = false;
	$scope.toogleShowList = function () {
		if ($scope.showList === false) {
			$scope.showList = true;
		} else {
			$scope.showList = false;
		}
	};
	
	
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

}]);

// Encapsuler le composant
var setScopeForGrid = function ($rootScope, $scope, $http) {
	
	$scope.totalServerItems = 0;

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    
    $scope.pagingOptions = {
        pageSizes: [10, 25, 50],
        pageSize: 10,
        currentPage: 1
    };
    
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    	// TODO remplacer cette partie
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('gen/pages/book/largeLoad.json').success(function (largeLoad) {
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });
            } else {
                $http.get('gen/pages/book/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };

    // init
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
    // observation de pagingOptions
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    // observation de filterOptions
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        multiSelect: false,
        selectedItems: [],
        afterSelectionChange: function (rowItem) {
        	if ((rowItem) && (rowItem.selected === true)) {
        		
            	$rootScope.logMe($scope.gridOptions.selectedItems[0].name);
        	}
        }
    };
    
};
