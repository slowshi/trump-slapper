define([
	'app',
	'./index-impl.js',
	'store-service',
], function(app, ScoreboardService) {
	app.registerService('scoreboardService',
	['storeService','$interval', ScoreboardService]);
});