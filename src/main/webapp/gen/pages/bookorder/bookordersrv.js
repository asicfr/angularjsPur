
// BookOrder services
var bookServicesModule = angular.module('app.bookorder.services', ['app.storage.services']).factory('ApiBookOrder', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("bookorder srv get " + id);
    		return ApiStorage.read("bookorder", id);
        },
        search: function () {
    		$rootScope.logMe("bookorder srv search");
    		return ApiStorage.search("bookorder");
        },
        create: function (bookorder) {
    		$rootScope.logMe("bookorder srv create");
    		return ApiStorage.create("bookorder", bookorder);
    	},
        update: function (id, bookorder) {
    		$rootScope.logMe("bookorder srv update");
    		return ApiStorage.update("bookorder", id, bookorder);
    	},
        remove: function (id) {
    		$rootScope.logMe("bookorder srv remove " + id);
    		return ApiStorage.remove("bookorder", id);
        }
    };
});
