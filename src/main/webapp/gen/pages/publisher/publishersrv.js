
// Publisher services
var bookServicesModule = angular.module('app.publisher.services', ['app.storage.services']).factory('ApiPublisher', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("publisher srv get " + id);
    		return ApiStorage.read("publisher", id);
        },
        search: function () {
    		$rootScope.logMe("publisher srv search");
    		return ApiStorage.search("publisher");
        },
        create: function (publisher) {
    		$rootScope.logMe("publisher srv create");
    		return ApiStorage.create("publisher", publisher);
    	},
        update: function (id, publisher) {
    		$rootScope.logMe("publisher srv update");
    		return ApiStorage.update("publisher", id, publisher);
    	},
        remove: function (id) {
    		$rootScope.logMe("publisher srv remove " + id);
    		return ApiStorage.remove("publisher", id);
        }
    };
});
