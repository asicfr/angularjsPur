/*
 * Module encapsulant le module principal de l'application bookstore
 * Il dépend de ngMockE2E et permet de bouchonner des appels ajax au cas par cas en utilisant
 * les déclaration whenGet ...
 */
var myMockE2EModule = angular.module('appE2E', ['myMockE2EModuleRun', 'ngMockE2E', 'app']);

// on cree un sous module pour ne pas rentrer en conflit avec les chargements forcés des partials
var myMockE2EModuleRun = angular.module('myMockE2EModuleRun', []);
myMockE2EModuleRun.run(function($httpBackend) {
	console.log('my wrapper is running');
	
});
