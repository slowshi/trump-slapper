define(['app',
		'./trump-face-service/index.js'], function(app) {
	app.registerDirective('trumpFace', function() {
		return{
			restrict: 'E',
			transclude: true,
			scope: {

			},
			templateUrl: '/home/trump-face/index.html',
			replace: true,
			controller: 'TrumpFaceController',
			controllerAs: 'ctrl',
			bindToController: true,
			link: function(scope, elem, attrs) {

			},
		};
	});
	app.registerController('TrumpFaceController',
	['$scope', 'cssInjector', 'clickerGameService', 'trumpFaceService', '$element',
	function($scope, cssInjector, clickerGameService, trumpFaceService, $element) {
		cssInjector.add('/home/trump-face/index.css');
		var _this = this;
		_this.trumpFaceService = trumpFaceService;
		_this.clickerGameService = clickerGameService;
		_this.smackTrump = function smackTrump() {
			_this.trumpFaceService.hitFace($element);
			_this.clickerGameService.addClicks();
		};
	}]);
});
