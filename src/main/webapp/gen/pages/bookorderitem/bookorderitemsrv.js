
// BookOrderItem services
var bookServicesModule = angular.module('app.bookorderitem.services', ['app.storage.services']).factory('ApiBookOrderItem', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("bookorderitem srv get " + id);
    		return ApiStorage.read("bookorderitem", id);
        },
        search: function () {
    		$rootScope.logMe("bookorderitem srv search");
    		return ApiStorage.search("bookorderitem");
        },
        create: function (bookorderitem) {
    		$rootScope.logMe("bookorderitem srv create");
    		return ApiStorage.create("bookorderitem", bookorderitem);
    	},
        update: function (id, bookorderitem) {
    		$rootScope.logMe("bookorderitem srv update");
    		return ApiStorage.update("bookorderitem", id, bookorderitem);
    	},
        remove: function (id) {
    		$rootScope.logMe("bookorderitem srv remove " + id);
    		return ApiStorage.remove("bookorderitem", id);
        }
    };
});
