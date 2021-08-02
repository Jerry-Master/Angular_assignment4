(function(){
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // Set up UI states
  $stateProvider
  
  .state('home', {
    url: '/home',
    templateUrl: 'src/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as mainList',
    resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemController as itemList',
    resolve: {
        items: ['$stateParams', 'MenuDataService', 
                function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
    }
  });
}
})();