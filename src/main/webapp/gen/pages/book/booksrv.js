
// Book services
var bookServicesModule = angular.module('app.book.services', ['app.storage.services']).factory('ApiBook', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("book srv get " + id);
    		return ApiStorage.read("book", id);
        },
        search: function (pageSize, pageindex, filtre) {
    		$rootScope.logMe("book srv search");
    		return ApiStorage.search("book", pageSize, pageindex, filtre);
        },
        create: function (book) {
    		$rootScope.logMe("book srv create");
    		return ApiStorage.create("book", book);
    	},
        update: function (id, book) {
    		$rootScope.logMe("book srv update");
    		return ApiStorage.update("book", id, book);
    	},
        remove: function (id) {
    		$rootScope.logMe("book srv remove " + id);
    		return ApiStorage.remove("book", id);
        }
    };
});
