
// Shop services
var bookServicesModule = angular.module('app.shop.services', ['app.storage.services']).factory('ApiShop', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("shop srv get " + id);
    		return ApiStorage.read("shop", id);
        },
        search: function () {
    		$rootScope.logMe("shop srv search");
    		return ApiStorage.search("shop");
        },
        create: function (shop) {
    		$rootScope.logMe("shop srv create");
    		return ApiStorage.create("shop", shop);
    	},
        update: function (id, shop) {
    		$rootScope.logMe("shop srv update");
    		return ApiStorage.update("shop", id, shop);
    	},
        remove: function (id) {
    		$rootScope.logMe("shop srv remove " + id);
    		return ApiStorage.remove("shop", id);
        }
    };
});
