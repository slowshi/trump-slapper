define([
	'app',
	'js/store-service/index-impl.js',
	], function(app, StoreServiceImpl) {
	app.registerService('storeService',[StoreServiceImpl]);
});
