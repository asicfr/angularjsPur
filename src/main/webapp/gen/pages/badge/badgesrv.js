
// Badge services
var bookServicesModule = angular.module('app.badge.services', ['app.storage.services']).factory('ApiBadge', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("badge srv get " + id);
    		return ApiStorage.read("badge", id);
        },
        search: function (pageSize, pageindex, filtre) {
    		$rootScope.logMe("badge srv search");
    		return ApiStorage.search("badge", pageSize, pageindex, filtre);
        },
        create: function (badge) {
    		$rootScope.logMe("badge srv create");
    		return ApiStorage.create("badge", badge);
    	},
        update: function (id, badge) {
    		$rootScope.logMe("badge srv update");
    		return ApiStorage.update("badge", id, badge);
    	},
        remove: function (id) {
    		$rootScope.logMe("badge srv remove " + id);
    		return ApiStorage.remove("badge", id);
        }
    };
});
