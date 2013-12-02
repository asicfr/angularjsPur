
// Workgroup services
var bookServicesModule = angular.module('app.workgroup.services', ['app.storage.services']).factory('ApiWorkgroup', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("workgroup srv get " + id);
    		return ApiStorage.read("workgroup", id);
        },
        search: function (pageSize, pageindex, filtre) {
    		$rootScope.logMe("workgroup srv search");
    		return ApiStorage.search("workgroup", pageSize, pageindex, filtre);
        },
        create: function (workgroup) {
    		$rootScope.logMe("workgroup srv create");
    		return ApiStorage.create("workgroup", workgroup);
    	},
        update: function (id, workgroup) {
    		$rootScope.logMe("workgroup srv update");
    		return ApiStorage.update("workgroup", id, workgroup);
    	},
        remove: function (id) {
    		$rootScope.logMe("workgroup srv remove " + id);
    		return ApiStorage.remove("workgroup", id);
        }
    };
});
