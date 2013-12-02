// Datastore structure
var storageStructureModule = angular.module('app.structure.services', []);
storageStructureModule.factory('ApiStructure', function($rootScope, $http) {

    var defaultStructure = {};
    
    // TODO a generer
    defaultStructure.author = {}; // TODO ajouter un libellé pour l'entité, a afficher dans la liste
    defaultStructure.author.key = "id";
    defaultStructure.author.detail = [
        {"key":"id", "label":"the id"}, 
        {"key":"firstName", "label":"the first name"}, 
        {"key":"lastName", "label":"the last name"}
    ];
    defaultStructure.author.columns = [
        {"key":"firstName", "label":"the first name"}, 
        {"key":"lastName", "label":"the last name"}
    ];

    defaultStructure.book = {}; // TODO ajouter un libellé pour l'entité, a afficher dans la liste
    defaultStructure.book.key = "id";
    defaultStructure.book.detail = [
        {"key":"id", "label":"the id"}, 
        {"key":"publisherId", "label":"the publisher id"}, 
        {"key":"authorId", "label":"the author id"}, 
        {"key":"isbn", "label":"isbn"}, 
        {"key":"title", "label":"title"}, 
        {"key":"price", "label":"price"}, 
        {"key":"quantity", "label":"quantity"}, 
        {"key":"discount", "label":"discount"}, 
        {"key":"availability", "label":"availability"}, 
        {"key":"bestSeller", "label":"bestSeller"}
    ];
    defaultStructure.book.columns = [
		{"key":"id", "label":"the id"}, 
		{"key":"publisherId", "label":"the publisher id"}, 
		{"key":"authorId", "label":"the author id"}, 
		{"key":"isbn", "label":"isbn"}, 
		{"key":"title", "label":"title"}, 
		{"key":"price", "label":"price"}, 
		{"key":"quantity", "label":"quantity"}, 
		{"key":"discount", "label":"discount"}, 
		{"key":"availability", "label":"availability"}, 
		{"key":"bestSeller", "label":"bestSeller"}
    ];


	// ---------------------------------------------------------------------------------------------------
	// methodes
    return {
    	getStructure: function (entityName) {
			if (defaultStructure.hasOwnProperty(entityName)) {
	    		return defaultStructure[entityName];
			} else {
				return null;
			}
        },
		getStructureKey: function (entityName) {
			if (defaultStructure.hasOwnProperty(entityName)) {
	    		return defaultStructure[entityName].key;
			} else {
				return null;
			}
        },
		getStructureDetail: function (entityName) {
			if (defaultStructure.hasOwnProperty(entityName)) {
	    		return defaultStructure[entityName].detail;
			} else {
				return null;
			}
        },
		getStructureColumns: function (entityName) {
			if (defaultStructure.hasOwnProperty(entityName)) {
	    		return defaultStructure[entityName].columns;
			} else {
				return null;
			}
	    }
    };
    
});

