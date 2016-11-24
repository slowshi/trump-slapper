define(['app',
  './actives-service/index.js'], function(app) {
  app.registerDirective('actives', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {

      },
      templateUrl: 'home/actives/index.html',
      replace: true,
      controller: 'ActivesController',
      controllerAs: 'ActivesCtrl',
      bindToController: true,
      link: function() {}
    };
  });
  app.registerController('ActivesController',
    ['$scope', 'cssInjector', 'activesService',
      function($scope, cssInjector, activesService) {
        cssInjector.add('home/actives/index.css');
        this.activesService = activesService;
      }]);
});
