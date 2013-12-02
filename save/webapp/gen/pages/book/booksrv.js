
// Book services
var bookServicesModule = angular.module('app.book.services', ['app.storage.services']).factory('ApiBook', function($rootScope, $http, ApiStorage) {
	
    // TODO a generer
    var defaultStructure = {};
    defaultStructure.key = "id";
    defaultStructure.detail = [
        {"key":"publisherId", "label":"the publisher id"}, 
        {"key":"authorId", "label":"the author id"}, 
        {"key":"isbn", "label":"the isbn"}, 
        {"key":"title", "label":"the title"}, 
        {"key":"price", "label":"the price"}, 
        {"key":"quantity", "label":"the quantity"}, 
        {"key":"discount", "label":"the discount"}, 
        {"key":"availability", "label":"the availability"}, 
        {"key":"bestSeller", "label":"the bestSeller"}
    ];
    defaultStructure.columns = [
         {"key":"isbn", "label":"the isbn"}, 
         {"key":"title", "label":"the title"}, 
         {"key":"price", "label":"the price"}
    ];

	return {
        getStructure: function () {
        	$rootScope.logMe("book srv get structure");
        	return defaultStructure;
        },
        search: function (pageSize, pageIndex, filtre, customStructure) {
    		$rootScope.logMe("book srv search");
    		return ApiStorage.search("book", defaultStructure, pageSize, pageIndex, filtre, customStructure);
        },
        get: function (id) {
        	$rootScope.logMe("book srv get " + id);
        	return ApiStorage.read("book", id);
        },
        create: function (book) {
    		$rootScope.logMe("book srv create");
    		return ApiStorage.create("book", book);
    	},
        update: function (book) {
    		$rootScope.logMe("book srv update");
    		return ApiStorage.update("book", book);
    	},
        remove: function (book) {
    		$rootScope.logMe("book srv remove " + book);
    		return ApiStorage.remove("book", book);
        }
    };
});
