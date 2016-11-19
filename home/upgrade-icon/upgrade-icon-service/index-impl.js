define(['lodash'], function(_) {
  var UpgradeIconService = function(storeService) {
    var data = {
      upgrades: []
    };

    var updateScoreboard = function updateScoreboard() {
      var scoreboard = storeService.store.getState().scoreboard;
      var upgrades = _.cloneDeep(scoreboard.upgrades);
      var powerups = _.cloneDeep(scoreboard.powerups);
      for (var i = 0; i < upgrades.length; i++) {
        var upgrade = upgrades[i];
        upgrade.cost =
          Math.ceil(upgrade.baseCost * Math.pow(1.07, upgrade.count));
        upgrade.enabled = scoreboard.slaps >= upgrade.cost;
        upgrade.visible = scoreboard.highestUpgrade >= i;
        var nextPowerup = 0;
        upgrade.powerups = [];
        for (var j = 0; j < powerups.length; j++) {
          if (powerups[j].upgradeId === upgrade.id) {
            var powerup = _.cloneDeep(powerups[j]);
            upgrade.powerups.push(powerup);
          }
        }
        for (var k = 0; k < upgrade.powerups.length; k++) {
          var upgradePowerup = upgrade.powerups[k];
          upgradePowerup.enabled = scoreboard.slaps >= upgradePowerup.cost;
          upgradePowerup.visible =
            upgrade.highestPowerup >= k && upgrade.visible && upgrade.count > 0;
          if (upgrade.count >= upgradePowerup.level) {
            nextPowerup++;
            if (nextPowerup >= upgrade.highestPowerup) {
              upgrade.highestPowerup = nextPowerup;
            }
          }
        }
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
    var buyPowerup = function buyPowerup(id) {
      storeService.store.dispatch({
        type: 'buyPowerup',
        id: id
      });
    };
    return {
      data: data,
      buyUpgrade: buyUpgrade,
      buyPowerup: buyPowerup
    };
  };
  return UpgradeIconService;
});
