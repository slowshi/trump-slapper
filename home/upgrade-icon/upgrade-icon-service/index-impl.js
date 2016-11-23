define(['lodash'], function(_) {
  var UpgradeIconService = function(storeService) {
    var data = {
      upgrades: []
    };
    var getPowerupLabel = function getPowerupLabel(change) {
      var type = [];
      var powerupChange = _.cloneDeep(change);
      if (typeof powerupChange.perSecMod !== 'undefined') {
        type.push('+' + powerupChange.perSecMod * 100 + '% SPS');
      }
      if (typeof powerupChange.perSlapMod !== 'undefined') {
        type.push('+' + powerupChange.perSlapMod * 100 + '% SD');
      }
      var typeString = '';
      if (type.length > 1) {
        typeString = type[0] + ' | ' + type[1];
      } else {
        typeString = type[0];
      }
      return typeString;
    };
    var getDamageLabel = function getDamageLabel(label) {
      var type = [];
      var damageLabel = _.cloneDeep(label);
      if (damageLabel.perSec > 0) {
        type.push(Math.round(damageLabel.perSec * 1000) / 1000 + ' SPS');
      }
      if (damageLabel.perSlap > 0) {
        type.push(Math.round(damageLabel.perSlap * 1000) / 1000 + ' SD');
      }
      var labelString = '';
      if (type.length > 1) {
        labelString = type[0] + ' | ' + type[1];
      } else {
        labelString = type[0];
      }
      return labelString;
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
        upgrade.labelObj = {
          perSec: 0,
          perSlap: 0
        };
        upgrade.slapsPerSec = 0;
        upgrade.slapDamage = 0;
        var nextPowerup = 0;
        upgrade.powerups = [];
        var powerupChange = {
          perSec: 0,
          perSlap: 0
        };
        for (var j = 0; j < powerups.length; j++) {
          if (powerups[j].upgradeId === upgrade.id) {
            var powerup = _.cloneDeep(powerups[j]);
            upgrade.powerups.push(powerup);
          }
        }
        for (var k = 0; k < upgrade.powerups.length; k++) {
          var upgradePowerup = upgrade.powerups[k];
          if (upgradePowerup === 1) {
            if (typeof upgradePowerup.change.perSlap !== 'undefined') {
              powerupChange.perSlap += upgradePowerup.change.perSlap;
            }
            if (typeof upgradePowerup.change.perSec !== 'undefined') {
              powerupChange.perSec += upgradePowerup.change.perSec;
            }
          }
          upgradePowerup.enabled =
            scoreboard.slaps >= upgradePowerup.cost &&
            upgrade.count >= upgradePowerup.level;
          upgradePowerup.visible =
            upgrade.highestPowerup >= k && upgrade.visible && upgrade.count > 0;
          upgradePowerup.label = getPowerupLabel(upgradePowerup.change);
          if (upgrade.count >= upgradePowerup.level) {
            nextPowerup++;
            if (nextPowerup >= upgrade.highestPowerup) {
              upgrade.highestPowerup = nextPowerup;
            }
          }
        }
        if (typeof upgrade.change.perSlap !== 'undefined') {
          upgrade.labelObj.perSlap = (upgrade.change.perSlap * upgrade.count);
          upgrade.labelObj.perSlap +=
            (upgrade.change.perSlap * upgrade.count) * powerupChange.perSlap;
        }
        if (typeof upgrade.change.perSec !== 'undefined') {
          upgrade.labelObj.perSec = (upgrade.change.perSec * upgrade.count);
          upgrade.labelObj.perSec +=
            (upgrade.change.perSec * upgrade.count) * powerupChange.perSec;
        }
        upgrade.label = getDamageLabel(upgrade.labelObj);
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
