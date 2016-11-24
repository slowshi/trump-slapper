define([
  'app',
  './index-impl.js',
  'store-service'
], function(app, ActivesService) {
  app.registerService('activesService',
	['storeService', ActivesService]);
});
