
// Customer services
var bookServicesModule = angular.module('app.customer.services', ['app.storage.services']).factory('ApiCustomer', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("customer srv get " + id);
    		return ApiStorage.read("customer", id);
        },
        search: function (pageSize, pageindex, filtre) {
    		$rootScope.logMe("customer srv search");
    		return ApiStorage.search("customer", pageSize, pageindex, filtre);
        },
        create: function (customer) {
    		$rootScope.logMe("customer srv create");
    		return ApiStorage.create("customer", customer);
    	},
        update: function (id, customer) {
    		$rootScope.logMe("customer srv update");
    		return ApiStorage.update("customer", id, customer);
    	},
        remove: function (id) {
    		$rootScope.logMe("customer srv remove " + id);
    		return ApiStorage.remove("customer", id);
        }
    };
});
