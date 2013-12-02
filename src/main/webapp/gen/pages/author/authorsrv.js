
// Author services
var bookServicesModule = angular.module('app.author.services', ['app.storage.services']).factory('ApiAuthor', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("author srv get " + id);
    		return ApiStorage.read("author", id);
        },
        search: function () {
    		$rootScope.logMe("author srv search");
    		return ApiStorage.search("author");
        },
        create: function (author) {
    		$rootScope.logMe("author srv create");
    		return ApiStorage.create("author", author);
    	},
        update: function (id, author) {
    		$rootScope.logMe("author srv update");
    		return ApiStorage.update("author", id, author);
    	},
        remove: function (id) {
    		$rootScope.logMe("author srv remove " + id);
    		return ApiStorage.remove("author", id);
        }
    };
});
