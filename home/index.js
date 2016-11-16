define([
	'app',
	'./trump-face/index.js',
	'./scoreboard/index.js',
	],
function(app) {
	app.registerController('TrumpSlapperController',
	['$scope', 'cssInjector','storeService',
	function($scope, cssInjector, storeService) {
		cssInjector.add('/home/index.css');
		cssInjector.add('/css/bootstrap.min.css');
		var _this = this;
		var onUpdate = function(){
			var phase = $scope.$$phase;
			if( phase != '$apply' && phase != '$digest') {
				$scope.$digest();
			}
		}
		storeService.store.subscribe(onUpdate);
	}]);
});
