/*
 controller example for myselect directive
 (c) 2010-2013 @asicfr
 License: MIT
*/
appmain.controller('MySelectCtrl', ['$scope', 'ApiMyselect', function($scope, ApiMyselect) {
    $scope.selectedElement = 2;
 
    // mock data
    $scope.alldata = [
        {id: 1, name: 'Tim', age:"32"}, 
        {id: 2, name: 'Bob', age:"44"}, 
        {id: 3, name: 'Steve', age:"13"},
        {id: 4, name: 'Alain', age:"13"},
        {id: 5, name: 'Martine', age:"13"},
        {id: 6, name: 'Laurent', age:"13"},
        {id: 7, name: 'Benoit', age:"13"},
        {id: 8, name: 'Maxime', age:"13"},
        {id: 9, name: 'Frederic', age:"13"},
        {id: 10, name: 'Sylvie', age:"13"},
        {id: 11, name: 'Vincent', age:"13"},
        {id: 12, name: 'Marie', age:"13"},
        {id: 13, name: 'Raphaelle', age:"13"},
        {id: 14, name: 'Camille', age:"13"},
        {id: 15, name: 'Margot', age:"13"},
        {id: 16, name: 'Salome', age:"13"},
        {id: 17, name: 'Arthur', age:"13"},
    ];
    
    // directive parameters
    $scope.myparams = {};
    $scope.myparams.pageSize = 5;	
    $scope.myparams.key = "id";
	$scope.myparams.detail = [
        {"key":"id", "label":"the id"}, 
        {"key":"name", "label":"the name"}
    ];
	$scope.myparams.columns = [
        {"key":"id", "label":"the id"}, 
        {"key":"name", "label":"the name"}, 
        {"key":"age", "label":"the age"}
    ];
    $scope.myparams.paginated = true;
    
    // Mock server
	$scope.myparams.getlistcallback = function(pageindex, filtre) {
        return ApiMyselect.getlist($scope.myparams, $scope.alldata, pageindex, filtre);
    };
	$scope.myparams.getdetailcallback = function(key) {
        var filtered = $scope.alldata.filter(function(x) { return x.id === key; });
        return filtered[0];
    };
	$scope.myparams.onclickcallback = function(onerecord) {
        // alert(onerecord.name);
    };
}]);
