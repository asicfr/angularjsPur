// Dummy Datastore services

var storageServicesModule = angular.module('bookStore.storage.services', []).factory('ApiStorage', function($rootScope, $http) {

	// volatile local data store
	var mydatastore = {};
	
    return {
    	search: function (entityName) {
    		$rootScope.logMe("search for " + entityName);
			if (mydatastore.hasOwnProperty(entityName)) {
				return mydatastore[entityName];
			}
        },
    	read: function (entityName, entityKey) {
    		$rootScope.logMe("read for name " + entityName + " and key " + entityKey);
			if (mydatastore.hasOwnProperty(entityName)) {
    			var step1 = mydatastore[entityName]; // TODO factoriser avec search
    			if (step1.hasOwnProperty(entityKey)) {
    				return step1[entityKey];
    			} else {
    				$rootScope.logMe("no entity for name " + entityName + " and key " + entityKey);
    				// TODO erreur
    			}
			} else {
				$rootScope.logMe("no entities for name " + entityName);
				// TODO erreur
			}
        },
        create: function (entityName, entityData) {
    		$rootScope.logMe("create for name " + entityName);
    		var entityKey = this.generateUUID();
			if (mydatastore.hasOwnProperty(entityName)) {
				$rootScope.logMe("existing entities for name " + entityName);
			} else {
				$rootScope.logMe("init entities for name " + entityName);
				mydatastore[entityName] = {};
			}
			
			var step1 = mydatastore[entityName]; // TODO factoriser avec search
			if (step1.hasOwnProperty(entityKey)) {
				// TODO exception ? 
				$rootScope.logMe("entity already for name " + entityName + " and key " + entityKey); // log error, warn, info ...
			} else {
				step1[entityKey] = entityData;
				return true;
			}
    		return false;
        },
        update: function (entityName, entityKey, entityData) {
    		$rootScope.logMe("update for name " + entityName + " and key " + entityKey);
			if (mydatastore.hasOwnProperty(entityName)) {
    			var step1 = mydatastore[entityName]; // TODO factoriser avec search
    			if (step1.hasOwnProperty(entityKey)) {
    				step1[entityKey] = entityData;
	    			return true;
    			} else {
    				$rootScope.logMe("no entity for name " + entityName + " and key " + entityKey);
    				// TODO erreur
    			}
			} else {
				$rootScope.logMe("no entities for name " + entityName);
				// TODO erreur
			}
    		return false;
        },
        remove: function (entityName, entityKey) {
    		$rootScope.logMe("remove for name " + entityName + " and key " + entityKey);
			if (mydatastore.hasOwnProperty(entityName)) {
				var step1 = mydatastore[entityName];
				if (step1.hasOwnProperty(entityKey)) {
					delete step1[entityKey];
					return true;
				}
			}
    		return false;
    	},
    	generateUUID: function () {
    	    var d = new Date().getTime();
    	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	        var r = (d + Math.random()*16)%16 | 0;
    	        d = Math.floor(d/16);
    	        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    	    });
        	    return uuid;
        }
    };
});

