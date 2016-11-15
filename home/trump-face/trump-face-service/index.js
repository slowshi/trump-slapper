define([
	'app',
	'./index-impl.js',
	'store-service',
], function(app, TrumpFaceService) {
	app.registerService('trumpFaceService',
	['$timeout', 'storeService', '$interval', TrumpFaceService]);
});
