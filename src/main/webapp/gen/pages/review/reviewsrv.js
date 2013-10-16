
// Review services
var bookServicesModule = angular.module('bookStore.review.services', ['bookStore.storage.services']).factory('ApiReview', function($rootScope, $http, ApiStorage) {
    return {
        get: function (id) {
    		$rootScope.logMe("review srv get " + id);
    		return ApiStorage.read("review", id);
        },
        search: function () {
    		$rootScope.logMe("review srv search");
    		return ApiStorage.search("review");
        },
        create: function (review) {
    		$rootScope.logMe("review srv create");
    		return ApiStorage.create("review", review);
    	},
        update: function (id, review) {
    		$rootScope.logMe("review srv update");
    		return ApiStorage.update("review", id, review);
    	},
        remove: function (id) {
    		$rootScope.logMe("review srv remove " + id);
    		return ApiStorage.remove("review", id);
        }
    };
});
