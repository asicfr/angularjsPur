// Author services
var bookServicesModule = angular.module('app.author.services', ['app.storage.services']).factory('ApiAuthor', function($rootScope, $http, ApiStorage) {

    return {
        getStructure: function () {
        	$rootScope.logMe("author srv get structure");
    		return ApiStorage.getStructure("author");
        },
        search: function (pageSize, pageIndex, filtre, customStructure) {
    		$rootScope.logMe("author srv search");
    		var authorStructure = ApiStorage.getStructure("author");
    		return ApiStorage.search("author", authorStructure, pageSize, pageIndex, filtre, customStructure);
        },
        get: function (id) {
        	$rootScope.logMe("author srv get " + id);
        	return ApiStorage.read("author", id);
        },
        create: function (author) {
    		$rootScope.logMe("author srv create");
    		return ApiStorage.create("author", author);
    	},
        update: function (id, author) {
    		$rootScope.logMe("author srv update");
    		return ApiStorage.update("author", id, author);
    	},
        remove: function (author) {
    		$rootScope.logMe("author srv remove " + author);
    		return ApiStorage.remove("author", author);
        }
    };
});
