
// EmployeeGroup services
var bookServicesModule = angular.module('bookStore.employeegroup.services', ['bookStore.storage.services']).factory('ApiEmployeeGroup', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("employeegroup srv get " + id);
    		return ApiStorage.read("employeegroup", id);
        },
        search: function () {
    		$rootScope.logMe("employeegroup srv search");
    		return ApiStorage.search("employeegroup");
        },
        create: function (employeegroup) {
    		$rootScope.logMe("employeegroup srv create");
    		return ApiStorage.create("employeegroup", employeegroup);
    	},
        update: function (id, employeegroup) {
    		$rootScope.logMe("employeegroup srv update");
    		return ApiStorage.update("employeegroup", id, employeegroup);
    	},
        remove: function (id) {
    		$rootScope.logMe("employeegroup srv remove " + id);
    		return ApiStorage.remove("employeegroup", id);
        }
    };
});
