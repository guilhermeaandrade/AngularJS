(function(){
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.list = "";
    $scope.checkTooMuch = function($scope){
      console.log("entrei aqui")
    };
  }
})();
