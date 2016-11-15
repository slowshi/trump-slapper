define([
	'app',
	'./index-impl.js',
	'store-service',
], function(app, ClickerGameService) {
	app.registerService('clickerGameService',
	['storeService', ClickerGameService]);
});