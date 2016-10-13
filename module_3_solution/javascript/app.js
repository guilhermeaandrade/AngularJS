(function(){
  'use strict'
  //python -m SimpleHTTPServer 3000
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBaseUrl', 'https://davids-restaurant.herokuapp.com');

  function FoundItems(){
    var ddo = {
      templateUrl: 'foundItems.html'
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    narrow.getMenuItems = function(searchTerm) {
      if( searchTerm === undefined || searchTerm === '' ){
        narrow.error_field = true;
        return;
      }
      narrow.error_field = false;

      var promise = MenuSearchService.getMatchedMenuItems();
      promise
      .then(function(response) {
        narrow.items = [];
        narrow.items = response.data;
        searchItens(narrow.items, searchTerm);
        narrow.search = '';
      })
      .catch(function(errorResponse) {
        console.log(errorResponse);
      });
    };

    narrow.removeItem = function(index, item) {
      if(narrow.found.length === 1) {
        narrow.found.splice(index, 1);
      }
    }

    function searchItens(items, searchTerm){
      narrow.found = [];
      _.forEach(items.menu_items, function(value) {
        if (value.description.indexOf( searchTerm.toLowerCase() ) !== -1){
          narrow.found.push(value);
        }
      });
      if( narrow.found.length === 0 ){
        narrow.not_found = true;
      }else{
        narrow.not_found = false;
      }
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBaseUrl']
  function MenuSearchService($http, ApiBaseUrl) {
    var service = this;

    service.getMatchedMenuItems = function() {
      var response = $http({
        method: 'GET',
        url: (ApiBaseUrl + '/menu_items.json')
      });
      return response;
    };
  }
})();
