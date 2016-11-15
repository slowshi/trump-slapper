define([
	'app',
	'./clicker-game-service/index.js',
	'./trump-face/index.js',
	'./hand-cursor/index.js',
	],
function(app) {
	app.registerController('TrumpSlapperController',
	['$scope', 'cssInjector', 'clickerGameService', '$element',
	function($scope, cssInjector, clickerGameService, $element) {
		cssInjector.add('/home/index.css');
		var _this = this;
		_this.clickerGameService = clickerGameService;

		$element.on('mousemove', function(event) {
			_this.clickerGameService.updateCursorPos(event);
			$scope.$apply();
		});
	}]);
});
