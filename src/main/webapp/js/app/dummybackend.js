// Dummy Datastore services

var storageServicesModule = angular.module('app.storage.services', ['app.structure.services']);
storageServicesModule.factory('ApiStorage', function($rootScope, $http, ApiStructure) {

	// volatile local data store
	var mydatastore = {};
	
	// Function to filter data dynamically
	var filterFct = function(elemOfArray, indexInArray){
		// Use like that : array.filter(callback[, thisObject])
		// thisObject correspond to "this" into the function
		var isPresent = false;
		for(var k = 0; k < this.structure.columns.length; k++) { 
			var tmpKey = this.structure.columns[k].key;
			var tmpString = elemOfArray[tmpKey].toString();
			isPresent = (tmpString.indexOf(this.filtre) !== -1);
			if (isPresent) {
				break;
			}
		}
		return isPresent;
	};

	// Function to compute number of pages
	var computePageNb = function(dataSize, pageSize) {
		var pageNb = 1;
		if ((pageSize !== null) && (typeof pageSize !== "undefined")) {
			pageNb = Math.floor(dataSize / pageSize);
			var pageModulo = dataSize % pageSize;
			if (pageModulo > 0) {
				pageNb = pageNb + 1;
			} else if (pageNb < 1) {
				pageNb = 1;
			}
		}
		return pageNb;
    };

	// Function to compute page index
	var computePageIndex = function(pageindex, pageNb) {
		var innerpageindex = 1;
		if ((pageindex !== null) && (typeof pageindex !== "undefined")) {
			if (pageindex > pageNb) {
				innerpageindex = pageNb;
			} else if (pageindex < 1 ) {
				innerpageindex = 1;
			} else {
				innerpageindex = pageindex;
			}
		}
		return innerpageindex;
	};

	var getlist = function(structure, listEntities, pageSize, pageindex, filtre) {
		if ((listEntities !== null) && (typeof listEntities !== "undefined") && (listEntities.length > 0)) {
			var templist = listEntities.slice(0);
			
			// apply filter on data if filter exists
			if ((filtre !== null) && (typeof filtre !== "undefined") && (filtre.length > 0)) {
				var filterParam = { "structure" : structure, "filtre" : filtre};
				templist = templist.filter(filterFct, filterParam);
			}
			
			// default pageSize
			var pageSizeTmp = pageSize;
			if ((pageSize === null) || (typeof pageSize === "undefined")) {
				return  {
					"currentpageindex" : 1,
					"maxpageindex" : 1,
					"datapage" : templist
				};
			} else {
				// compute data list according to number of pages and page number
				var pageNb = computePageNb(templist.length, pageSizeTmp);
				
				// compute page index
				var innerpageindex = computePageIndex(pageindex, pageNb);
				
				// extraction des elements souhaités
				var fromCpt = (innerpageindex - 1) * pageSizeTmp;
				var toCpt = innerpageindex * pageSizeTmp;
				var sublist = templist.slice(fromCpt, toCpt);            
				
				return  {
					"currentpageindex" : innerpageindex,
					"maxpageindex" : pageNb,
					"datapage" : sublist
				};
			}
		} else {
			return  {
				"currentpageindex" : 0,
				"maxpageindex" : 0,
				"datapage" : null
			};
		}
	};
	
	var findEntity = function(list, keyPropName, keyvalue) {
		var theEntity = _.find(list, function(aEntity) {
			if (aEntity.hasOwnProperty(keyPropName)) {
				return aEntity[keyPropName] === keyvalue;
			} else {
				return false;
			}
		});
		return theEntity;
	};
	
	// ---------------------------------------------------------------------------------------------------
	// methodes
    return {
    	getStructure: function (entityName) {
    		return ApiStructure.getStructure(entityName);
        },
    	search: function (entityName, pageSize, pageindex, filtre, customStructure) {
    		$rootScope.logMe("search for " + entityName);
			var structureEntity = ApiStructure.getStructure(entityName);
			if (mydatastore.hasOwnProperty(entityName)) {
	    		var sublist = mydatastore[entityName];
	    		return getlist(structureEntity, sublist, pageSize, pageindex, filtre);
			} else {
	    		return getlist(structureEntity, [], pageSize, pageindex, filtre);
			}
        },
    	read: function (entityName, keyValue) {
    		$rootScope.logMe("read for name " + entityName + " and key " + keyValue);
			if (mydatastore.hasOwnProperty(entityName)) {
    			var sublist = mydatastore[entityName];
    			var keyPropName = ApiStructure.getStructureKey(entityName);
    			var theEntity = findEntity(sublist, keyPropName, keyValue);
    			return theEntity;
			} else {
				$rootScope.logMe("no entities for name " + entityName);
				return null; // TODO null ou undefined ?
			}
        },
        create: function (entityName, entityData) {
    		$rootScope.logMe("create for name " + entityName);
			var created = false;
			if (mydatastore.hasOwnProperty(entityName)) {
				$rootScope.logMe("existing entities for name " + entityName);
			} else {
				$rootScope.logMe("init entities for name " + entityName);
				mydatastore[entityName] = [];
			}
			
			var keyPropName = ApiStructure.getStructureKey(entityName);
			var keyValue = entityData[keyPropName]; // TODO check si propriete existe
			var sublist = mydatastore[entityName];
			var theEntity = findEntity(sublist, keyPropName, keyValue);
			if (typeof theEntity === "undefined") {
				sublist.push(entityData);
				created = true;
			} else {
				$rootScope.logMe("entity already for name " + entityName + " and key " + keyValue); // log error, warn, info ...
			}
			return created;
        },
        update: function (entityName, keyValue, entityData) {
    		$rootScope.logMe("update for name " + entityName + " and key " + keyValue);
			var updated = false;
			if (mydatastore.hasOwnProperty(entityName)) {
				var keyPropName = ApiStructure.getStructureKey(entityName);
    			var sublist = mydatastore[entityName];
    			for (var i = 0; i < sublist.length; i++) {
    			    if (sublist[i][keyPropName] === keyValue) { // TODO a optimier
    			    	sublist[i] = entityData;
    			    	updated = true;
    			    	break;
    			    }
				}
			} else {
				$rootScope.logMe("no entities for name " + entityName);
			}
			return updated;
        },
        remove: function (entityName, keyValue) {
    		$rootScope.logMe("remove for name " + entityName);
			var deleted = false;
			if (mydatastore.hasOwnProperty(entityName)) {
				var sublist = mydatastore[entityName];
				var keyPropName = ApiStructure.getStructureKey(entityName);
    			
    			for(var i = sublist.length - 1; i >= 0; i--) {
    			    if(sublist[i][keyPropName] === keyValue) {
    			    	sublist.splice(i, 1);
    			    	deleted = true;
    			    	break;
    			    }
    			}
			} else {
				$rootScope.logMe("no entities for name " + entityName);
			}
    		return deleted;
        }
    };
    
});

