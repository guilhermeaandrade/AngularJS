(function(){
  'use strict'

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService']
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    toBuy.toBuyList = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.removeFromBuyToAlready = function(index){
      ShoppingListCheckOffService.removeFromBuyToAlready(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var already =  this;
    already.alreadyList = ShoppingListCheckOffService.getItemsAlready();
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var listToBuy = [
      {name: 'Cookie Toddy', quantity: 10},
      {name: 'Chips Doritos', quantity: 10},
      {name: 'Bottle of Coca-cola', quantity: 2},
      {name: 'Chocolate Laka', quantity: 3},
      {name: 'Hamburguer', quantity: 2}
    ];
    var listAlready = [];

    service.getItemsToBuy = function(){
      return listToBuy;
    };

    service.getItemsAlready = function(){
      return listAlready;
    };

    service.removeFromBuyToAlready = function(index){
      if(listToBuy.length > 0){
        let element = listToBuy[index];
        listToBuy.splice(index, 1);
        listAlready.push(element);
      }
    };
  }

})();
