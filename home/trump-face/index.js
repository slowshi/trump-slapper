define(['app',
  './trump-face-service/index.js'], function(app) {
  app.registerDirective('trumpFace', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {

      },
      templateUrl: '/home/trump-face/index.html',
      replace: true,
      controller: 'TrumpFaceController',
      controllerAs: 'ctrl',
      bindToController: true,
      link: function() {}
    };
  });
  app.registerController('TrumpFaceController',
    ['$scope', 'cssInjector', 'trumpFaceService', '$element',
      function($scope, cssInjector, trumpFaceService, $element) {
        cssInjector.add('/home/trump-face/index.css');
        var _this = this;
        _this.trumpFaceService = trumpFaceService;
        _this.trumpFaceService.faceData.element = $element;
        _this.smackTrump = function smackTrump($event) {
          _this.trumpFaceService.setHandPos($event);
          _this.trumpFaceService.hitFace();
        };
      }]);
});
