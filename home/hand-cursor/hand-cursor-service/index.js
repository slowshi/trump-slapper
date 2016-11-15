define([
	'app',
	'./index-impl.js',
	'store-service',
], function(app, HandCursorService) {
	app.registerService('handCursorService',
	['storeService', '$timeout', HandCursorService]);
});
