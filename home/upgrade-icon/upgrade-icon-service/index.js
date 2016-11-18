define([
  'app',
  './index-impl.js',
  'store-service'
], function(app, UpgradeIconService) {
  app.registerService('upgradeIconService',
	['storeService', UpgradeIconService]);
});
