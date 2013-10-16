
angular.module('telosysDirectives', []).directive('myselect', function() {
  return {
    scope: {
      ngParams: '=',
      ngModelkey: '=',
    },
    restrict: 'E',
    templateUrl: 'js/app/myselectTemplate.html',
    // templateUrl: 'myselect.html',
    link: function(scope, element, attr, controller) {
        // TODO process error of missing params 
        if (typeof scope.ngParams !== "undefined") {
            if (typeof scope.ngParams.getlistcallback !== "undefined") {
                scope.processCurrentElement();
            }
        }
    },
    controller: function($scope) {
        $scope.showlist = false;

        $scope.processCurrentElement = function () {
            if (typeof $scope.ngModelkey !== "undefined") {
                var currentElement = $scope.ngParams.getdetailcallback($scope.ngModelkey);
                if (typeof currentElement !== "undefined") {
                    $scope.detailmodel = currentElement;
                } else {
                    // TODO a finir
                }
            }
        };
        
        $scope.processStyle = function (onerecordIn, ngModelkeyIn, keyIn, indexIn) {
            var style = "";
            if ((ngModelkeyIn) && (ngModelkeyIn === onerecordIn[keyIn])) {
                style = "currentRow";
            } else {
                if (indexIn % 2) {
                    style += "rowOdd";
                } else {
                    style += "rowEven";
                }
            }
            
            style += " mytable-tr";
            return style;
        };
        
        $scope.toggleList = function () {
            $scope.showlist = !$scope.showlist;
            $scope.searchText = null;
            if ($scope.showlist === false) {
                $scope.datas = null;
            } else {
                $scope.datas = $scope.ngParams.getlistcallback();
            }
        };
        
        $scope.applyfiltre = function (currentIndex, filtre) {
            $scope.datas = $scope.ngParams.getlistcallback(currentIndex, filtre);
        };
        
        $scope.previousPage = function (currentIndex, filtre) {
            $scope.datas = $scope.ngParams.getlistcallback(currentIndex - 1, filtre);
        };
        
        $scope.nextPage = function (currentIndex, filtre) {
            $scope.datas = $scope.ngParams.getlistcallback(currentIndex * 1 + 1, filtre);
        };
        
        $scope.onSelect = function (onerecord) {
            $scope.ngModelkey = onerecord[$scope.ngParams.key];
            $scope.processCurrentElement();
            $scope.toggleList();
            if (typeof $scope.ngParams.onclickcallback !== "undefined") {
                $scope.ngParams.onclickcallback(onerecord);
            }
        };
        
     }
  };
});
