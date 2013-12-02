// Datastore structure
var storageStructureModule = angular.module('app.structure.services', []);
storageStructureModule.factory('ApiStructure', function($rootScope, $http) {

	var defaultStructure = {};


// ------------------------------------------------------------------------	
	defaultStructure.author = {};
	defaultStructure.author.label = "author";
	defaultStructure.author.key = "id";


	defaultStructure.author.detail = [
		{"key":"id", "label":"id"} 
		,{"key":"firstName", "label":"firstName"} 
		,{"key":"lastName", "label":"lastName"} 
	];

	defaultStructure.author.columns = [
		{"key":"id", "label":"id"}
		,{"key":"firstName", "label":"firstName"}
		,{"key":"lastName", "label":"lastName"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.badge = {};
	defaultStructure.badge.label = "badge";
	defaultStructure.badge.key = "badgeNumber";


	defaultStructure.badge.detail = [
		{"key":"badgeNumber", "label":"badgeNumber"} 
		,{"key":"authorizationLevel", "label":"authorizationLevel"} 
		,{"key":"endOfValidity", "label":"endOfValidity"} 
	];

	defaultStructure.badge.columns = [
		{"key":"badgeNumber", "label":"badgeNumber"}
		,{"key":"authorizationLevel", "label":"authorizationLevel"}
		,{"key":"endOfValidity", "label":"endOfValidity"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.book = {};
	defaultStructure.book.label = "book";
	defaultStructure.book.key = "id";


	defaultStructure.book.detail = [
		{"key":"id", "label":"id"} 
		,{"key":"publisherId", "label":"publisherId"} 
		,{"key":"authorId", "label":"authorId"} 
		,{"key":"isbn", "label":"isbn"} 
		,{"key":"title", "label":"title"} 
		,{"key":"price", "label":"price"} 
		,{"key":"quantity", "label":"quantity"} 
		,{"key":"discount", "label":"discount"} 
		,{"key":"availability", "label":"availability"} 
		,{"key":"bestSeller", "label":"bestSeller"} 
	];

	defaultStructure.book.columns = [
		{"key":"id", "label":"id"}
		,{"key":"publisherId", "label":"publisherId"}
		,{"key":"authorId", "label":"authorId"}
		,{"key":"isbn", "label":"isbn"}
		,{"key":"title", "label":"title"}
		,{"key":"price", "label":"price"}
		,{"key":"quantity", "label":"quantity"}
		,{"key":"discount", "label":"discount"}
		,{"key":"availability", "label":"availability"}
		,{"key":"bestSeller", "label":"bestSeller"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.bookorder = {};
	defaultStructure.bookorder.label = "bookorder";
	defaultStructure.bookorder.key = "id";


	defaultStructure.bookorder.detail = [
		{"key":"id", "label":"id"} 
		,{"key":"shopCode", "label":"shopCode"} 
		,{"key":"customerCode", "label":"customerCode"} 
		,{"key":"employeeCode", "label":"employeeCode"} 
		,{"key":"date", "label":"date"} 
		,{"key":"state", "label":"state"} 
	];

	defaultStructure.bookorder.columns = [
		{"key":"id", "label":"id"}
		,{"key":"shopCode", "label":"shopCode"}
		,{"key":"customerCode", "label":"customerCode"}
		,{"key":"employeeCode", "label":"employeeCode"}
		,{"key":"date", "label":"date"}
		,{"key":"state", "label":"state"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.bookorderitem = {};
	defaultStructure.bookorderitem.label = "bookorderitem";
	defaultStructure.bookorderitem.key = [
								"bookOrderId"
								,"bookId"
						];


	defaultStructure.bookorderitem.detail = [
		{"key":"bookOrderId", "label":"bookOrderId"} 
		,{"key":"bookId", "label":"bookId"} 
		,{"key":"quantity", "label":"quantity"} 
		,{"key":"price", "label":"price"} 
	];

	defaultStructure.bookorderitem.columns = [
		{"key":"bookOrderId", "label":"bookOrderId"}
		,{"key":"bookId", "label":"bookId"}
		,{"key":"quantity", "label":"quantity"}
		,{"key":"price", "label":"price"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.country = {};
	defaultStructure.country.label = "country";
	defaultStructure.country.key = "code";


	defaultStructure.country.detail = [
		{"key":"code", "label":"code"} 
		,{"key":"name", "label":"name"} 
	];

	defaultStructure.country.columns = [
		{"key":"code", "label":"code"}
		,{"key":"name", "label":"name"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.customer = {};
	defaultStructure.customer.label = "customer";
	defaultStructure.customer.key = "code";


	defaultStructure.customer.detail = [
		{"key":"code", "label":"code"} 
		,{"key":"countryCode", "label":"countryCode"} 
		,{"key":"firstName", "label":"firstName"} 
		,{"key":"lastName", "label":"lastName"} 
		,{"key":"login", "label":"login"} 
		,{"key":"password", "label":"password"} 
		,{"key":"age", "label":"age"} 
		,{"key":"city", "label":"city"} 
		,{"key":"zipCode", "label":"zipCode"} 
		,{"key":"phone", "label":"phone"} 
		,{"key":"reviewer", "label":"reviewer"} 
	];

	defaultStructure.customer.columns = [
		{"key":"code", "label":"code"}
		,{"key":"countryCode", "label":"countryCode"}
		,{"key":"firstName", "label":"firstName"}
		,{"key":"lastName", "label":"lastName"}
		,{"key":"login", "label":"login"}
		,{"key":"password", "label":"password"}
		,{"key":"age", "label":"age"}
		,{"key":"city", "label":"city"}
		,{"key":"zipCode", "label":"zipCode"}
		,{"key":"phone", "label":"phone"}
		,{"key":"reviewer", "label":"reviewer"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.employee = {};
	defaultStructure.employee.label = "employee";
	defaultStructure.employee.key = "code";


	defaultStructure.employee.detail = [
		{"key":"code", "label":"code"} 
		,{"key":"shopCode", "label":"shopCode"} 
		,{"key":"firstName", "label":"firstName"} 
		,{"key":"lastName", "label":"lastName"} 
		,{"key":"manager", "label":"manager"} 
		,{"key":"badgeNumber", "label":"badgeNumber"} 
		,{"key":"email", "label":"email"} 
	];

	defaultStructure.employee.columns = [
		{"key":"code", "label":"code"}
		,{"key":"shopCode", "label":"shopCode"}
		,{"key":"firstName", "label":"firstName"}
		,{"key":"lastName", "label":"lastName"}
		,{"key":"manager", "label":"manager"}
		,{"key":"badgeNumber", "label":"badgeNumber"}
		,{"key":"email", "label":"email"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.employeegroup = {};
	defaultStructure.employeegroup.label = "employeegroup";
	defaultStructure.employeegroup.key = [
								"employeeCode"
								,"groupId"
						];


	defaultStructure.employeegroup.detail = [
		{"key":"employeeCode", "label":"employeeCode"} 
		,{"key":"groupId", "label":"groupId"} 
	];

	defaultStructure.employeegroup.columns = [
		{"key":"employeeCode", "label":"employeeCode"}
		,{"key":"groupId", "label":"groupId"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.publisher = {};
	defaultStructure.publisher.label = "publisher";
	defaultStructure.publisher.key = "code";


	defaultStructure.publisher.detail = [
		{"key":"code", "label":"code"} 
		,{"key":"countryCode", "label":"countryCode"} 
		,{"key":"name", "label":"name"} 
		,{"key":"email", "label":"email"} 
		,{"key":"contact", "label":"contact"} 
		,{"key":"city", "label":"city"} 
		,{"key":"zipCode", "label":"zipCode"} 
		,{"key":"phone", "label":"phone"} 
	];

	defaultStructure.publisher.columns = [
		{"key":"code", "label":"code"}
		,{"key":"countryCode", "label":"countryCode"}
		,{"key":"name", "label":"name"}
		,{"key":"email", "label":"email"}
		,{"key":"contact", "label":"contact"}
		,{"key":"city", "label":"city"}
		,{"key":"zipCode", "label":"zipCode"}
		,{"key":"phone", "label":"phone"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.review = {};
	defaultStructure.review.label = "review";
	defaultStructure.review.key = [
								"customerCode"
								,"bookId"
						];


	defaultStructure.review.detail = [
		{"key":"customerCode", "label":"customerCode"} 
		,{"key":"bookId", "label":"bookId"} 
		,{"key":"reviewText", "label":"reviewText"} 
		,{"key":"reviewNote", "label":"reviewNote"} 
		,{"key":"creation", "label":"creation"} 
		,{"key":"lastUpdate", "label":"lastUpdate"} 
	];

	defaultStructure.review.columns = [
		{"key":"customerCode", "label":"customerCode"}
		,{"key":"bookId", "label":"bookId"}
		,{"key":"reviewText", "label":"reviewText"}
		,{"key":"reviewNote", "label":"reviewNote"}
		,{"key":"creation", "label":"creation"}
		,{"key":"lastUpdate", "label":"lastUpdate"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.shop = {};
	defaultStructure.shop.label = "shop";
	defaultStructure.shop.key = "code";


	defaultStructure.shop.detail = [
		{"key":"code", "label":"code"} 
		,{"key":"name", "label":"name"} 
		,{"key":"address1", "label":"address1"} 
		,{"key":"address2", "label":"address2"} 
		,{"key":"zipCode", "label":"zipCode"} 
		,{"key":"city", "label":"city"} 
		,{"key":"countryCode", "label":"countryCode"} 
		,{"key":"phone", "label":"phone"} 
		,{"key":"email", "label":"email"} 
		,{"key":"executive", "label":"executive"} 
	];

	defaultStructure.shop.columns = [
		{"key":"code", "label":"code"}
		,{"key":"name", "label":"name"}
		,{"key":"address1", "label":"address1"}
		,{"key":"address2", "label":"address2"}
		,{"key":"zipCode", "label":"zipCode"}
		,{"key":"city", "label":"city"}
		,{"key":"countryCode", "label":"countryCode"}
		,{"key":"phone", "label":"phone"}
		,{"key":"email", "label":"email"}
		,{"key":"executive", "label":"executive"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.synopsis = {};
	defaultStructure.synopsis.label = "synopsis";
	defaultStructure.synopsis.key = "bookId";


	defaultStructure.synopsis.detail = [
		{"key":"bookId", "label":"bookId"} 
		,{"key":"synopsis", "label":"synopsis"} 
	];

	defaultStructure.synopsis.columns = [
		{"key":"bookId", "label":"bookId"}
		,{"key":"synopsis", "label":"synopsis"}
	];

// ------------------------------------------------------------------------	
	defaultStructure.workgroup = {};
	defaultStructure.workgroup.label = "workgroup";
	defaultStructure.workgroup.key = "id";


	defaultStructure.workgroup.detail = [
		{"key":"id", "label":"id"} 
		,{"key":"name", "label":"name"} 
		,{"key":"description", "label":"description"} 
		,{"key":"creationDate", "label":"creationDate"} 
	];

	defaultStructure.workgroup.columns = [
		{"key":"id", "label":"id"}
		,{"key":"name", "label":"name"}
		,{"key":"description", "label":"description"}
		,{"key":"creationDate", "label":"creationDate"}
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

