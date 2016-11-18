define(['app',
  './upgrade-icon-service/index.js'], function(app) {
  app.registerDirective('upgradeIcon', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {

      },
      templateUrl: '/home/upgrade-icon/index.html',
      replace: true,
      controller: 'UpgradeIconController',
      controllerAs: 'UpgradeIconCtrl',
      bindToController: true,
      link: function() {}
    };
  });
  app.registerController('UpgradeIconController',
    ['$scope', 'cssInjector', 'upgradeIconService',
      function($scope, cssInjector, upgradeIconService) {
        cssInjector.add('/home/upgrade-icon/index.css');
        this.upgradeIconService = upgradeIconService;
      }]);
});
