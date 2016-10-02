(function(){
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.message = "";
    $scope.showMessage = false;
    $scope.tooMuch = 0;
    $scope.aux = [];

    $scope.checkTooMuch = function(){
      if ($scope.list === undefined || $scope.list === ''){
        $scope.showMessage = true;
        $scope.message = "Please enter data first";
      }else{
        $scope.showMessage = true;
        defineQuantity($scope.list);
      }
    };

    function defineQuantity(list){
      if(list.indexOf(';') == -1){
        $scope.tooMuch = 1;
        $scope.message = "Enjoy!";
      }else{
        let array = list.split(';');
        let empty = [], aux = [];
        let i = 0
        array.forEach(function(element, index){
          if(element === ' ' || element === ''){
            empty[i] = index;
            i++;
          }
        });
        var j = 0;
        array.forEach(function(element, index){
          if(empty.indexOf(index) == -1){
            $scope.aux[j] = array[index].trim();
            j++;
          }
        });
        $scope.tooMuch = $scope.aux.length;
        if ($scope.tooMuch == 0){
          $scope.message = "Please enter data first";
        }else{
          ($scope.tooMuch <= 3) ? $scope.message = "Enjoy!" : $scope.message = "Too much!";
        }
      }
      $scope.list = "";
    }
  }
})();
