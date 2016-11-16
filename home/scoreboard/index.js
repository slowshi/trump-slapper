define(['app',
		'./scoreboard-service/index.js'], function(app) {
	app.registerDirective('scoreboard', function() {
		return{
			restrict: 'E',
			transclude: true,
			scope: {

			},
			templateUrl: '/home/scoreboard/index.html',
			replace: true,
			controller: 'ScoreboardController',
			controllerAs: 'ctrl',
			bindToController: {
				cursorPos: '=?',
			},
			link: function(scope, elem, attrs) {

			},
		};
	});
	app.registerController('ScoreboardController',
	['$scope', 'cssInjector', 'scoreboardService', '$element',
	function($scope, cssInjector, scoreboardService, $element) {
		cssInjector.add('/home/scoreboard/index.css');
		var _this = this;
		_this.scoreboardService = scoreboardService;
	}]);
});