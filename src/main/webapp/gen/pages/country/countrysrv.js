
// Country services
var bookServicesModule = angular.module('app.country.services', ['app.storage.services']).factory('ApiCountry', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("country srv get " + id);
    		return ApiStorage.read("country", id);
        },
        search: function () {
    		$rootScope.logMe("country srv search");
    		return ApiStorage.search("country");
        },
        create: function (country) {
    		$rootScope.logMe("country srv create");
    		return ApiStorage.create("country", country);
    	},
        update: function (id, country) {
    		$rootScope.logMe("country srv update");
    		return ApiStorage.update("country", id, country);
    	},
        remove: function (id) {
    		$rootScope.logMe("country srv remove " + id);
    		return ApiStorage.remove("country", id);
        }
    };
});
