
// Employee services
var bookServicesModule = angular.module('app.employee.services', ['app.storage.services']).factory('ApiEmployee', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("employee srv get " + id);
    		return ApiStorage.read("employee", id);
        },
        search: function (pageSize, pageindex, filtre) {
    		$rootScope.logMe("employee srv search");
    		return ApiStorage.search("employee", pageSize, pageindex, filtre);
        },
        create: function (employee) {
    		$rootScope.logMe("employee srv create");
    		return ApiStorage.create("employee", employee);
    	},
        update: function (id, employee) {
    		$rootScope.logMe("employee srv update");
    		return ApiStorage.update("employee", id, employee);
    	},
        remove: function (id) {
    		$rootScope.logMe("employee srv remove " + id);
    		return ApiStorage.remove("employee", id);
        }
    };
});
