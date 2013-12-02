
// Synopsis services
var bookServicesModule = angular.module('app.synopsis.services', ['app.storage.services']).factory('ApiSynopsis', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("synopsis srv get " + id);
    		return ApiStorage.read("synopsis", id);
        },
        search: function () {
    		$rootScope.logMe("synopsis srv search");
    		return ApiStorage.search("synopsis");
        },
        create: function (synopsis) {
    		$rootScope.logMe("synopsis srv create");
    		return ApiStorage.create("synopsis", synopsis);
    	},
        update: function (id, synopsis) {
    		$rootScope.logMe("synopsis srv update");
    		return ApiStorage.update("synopsis", id, synopsis);
    	},
        remove: function (id) {
    		$rootScope.logMe("synopsis srv remove " + id);
    		return ApiStorage.remove("synopsis", id);
        }
    };
});
