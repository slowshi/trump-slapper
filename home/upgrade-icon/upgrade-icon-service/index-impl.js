define([
  'lodash',
  'home/scoreboard/scoreboard-service/upgrades.js'], function(_, upgradeData) {
  var UpgradeIconService = function(storeService) {
    var data = {
      upgrades: []
    };

    var updateScoreboard = function updateScoreboard() {
      var scoreboard = storeService.store.getState().scoreboard;
      var upgrades = _.cloneDeep(scoreboard.upgrades);
      for (var i = 0; i < upgrades.length; i++) {
        var upgrade = upgrades[i];
        upgrade.cost =
          Math.ceil(upgrade.baseCost * Math.pow(1.07, upgrade.count));
        upgrade.enabled = scoreboard.slaps >= upgrade.cost;
        upgrade.visible = scoreboard.highestUpgrade >= i;
        // if (scoreboard.slaps >= upgrade.cost) {
        //   nextUpgrade++;
        //   if (nextUpgrade >= scoreboard.highestUpgrade) {
        //     state.highestUpgrade = nextUpgrade;
        //   }
        // }
      }
      data.upgrades = upgrades;
    };
    storeService.store.subscribe(updateScoreboard);
    var buyUpgrade = function buyUpgrade(id) {
      storeService.store.dispatch({
        type: 'buyUpgrade',
        id: id
      });
    };
    return {
      data: data,
      buyUpgrade: buyUpgrade
    };
  };
  return UpgradeIconService;
});
