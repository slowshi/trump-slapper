define([
  'app',
  './trump-face/index.js',
  './scoreboard/index.js',
  './upgrade-icon/index.js',
  './actives/index.js'
],
function(app) {
  app.registerController('TrumpSlapperController',
    ['$scope', 'cssInjector', 'storeService', '$interval',
      function($scope, cssInjector, storeService, $interval) {
        cssInjector.add('home/index.css');
        cssInjector.add('js/vendors/bootstrap/4.0.0/css/bootstrap.min.css');
        var onUpdate = function() {
          var phase = $scope.$$phase;
          if (phase !== '$apply' && phase !== '$digest') {
            $scope.$digest();
          }
        };
        storeService.store.subscribe(onUpdate);
        $interval(function() {
          storeService.saveLocalStorage();
        }, 15000);
      }]);
});
