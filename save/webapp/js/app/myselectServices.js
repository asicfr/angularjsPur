/*
 myselect directive services
 (c) 2010-2013 @asicfr
 License: MIT
*/
var myselectServices = angular.module('myselect.services', []).factory('ApiMyselect', function() {
		// Function to filter data dynamically
		var filterFct = function(elemOfArray, indexInArray){
			// Use like that : array.filter(callback[, thisObject])
			// thisObject correspond to "this" into the function
			var isPresent = false;
			for(var k = 0; k < this.params.columns.length; k++) { 
				var tmpKey = this.params.columns[k].key;
				var tmpString = elemOfArray[tmpKey].toString();
				var tmpVar = (tmpString.indexOf(this.filtre) !== -1);
				if (tmpVar === true) {
					return true;
				}
			}
			return isPresent;
		};

		// Function to compute number of pages
		var computePageNb = function(dataSize, pageSize) {
			var pageNb = Math.floor(dataSize / pageSize);
			var pageModulo = dataSize % pageSize;
			if (pageModulo > 0) {
				pageNb = pageNb + 1;
			} else if (pageNb < 1) {
				pageNb = 1;
			}
			return pageNb;
        };

		// Function to compute page index
		var computePageIndex = function(pageindex, pageNb) {
			var innerpageindex = 1;
			if (typeof pageindex !== "undefined") {
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
    
    return {
		getlist : function(myparams, alldata, pageindex, filtre) {
			if ((alldata !== null) && (typeof alldata !== "undefined") && (alldata.length > 0)) {
				var filteredData = alldata;
				
				// apply filter on data if filter exists
				if ((filtre !== null) && (typeof filtre !== "undefined") && (filtre.length > 0)) {
					var filterParam = { "params" : myparams, "filtre" : filtre}
					filteredData = alldata.filter(filterFct, filterParam);
				}
				
				// default pageSize
				if (typeof myparams.pageSize === "undefined") {
					myparams.pageSize = 3;
				}
				
				// compute data list according to number of pages and page number
				var pageNb = computePageNb(filteredData.length, myparams.pageSize);
				
				// compute page index
				var innerpageindex = computePageIndex(pageindex, pageNb);
				
				// extraction des elements souhaités
				var fromCpt = (innerpageindex - 1) * myparams.pageSize;
				var toCpt = innerpageindex * myparams.pageSize;
				var sublist = filteredData.slice(fromCpt, toCpt);            
				
				return  {
					"currentpageindex" : innerpageindex,
					"maxpageindex" : pageNb,
					"datapage" : sublist
				};
			} else {
				return  {
					"currentpageindex" : 0,
					"maxpageindex" : 0,
					"datapage" : null
				};
			}
		}
    };
});
