define([
  'home/upgrades.js',
  'home/powerups.js',
  'lodash'], function(upgrades, powerups, _) {
  var powerupList = _.cloneDeep(powerups);
  var upgradeList = _.cloneDeep(upgrades);

  for (var i = 0; i < upgradeList.length; i++) {
    var upgrade = upgradeList[i];
    upgrade.count = 0;
    upgrade.highestPowerup = 0;
  }
  for (var j = 0; j < powerupList.length; j++) {
    var powerup = powerupList[j];
    powerup.count = 0;
  }
  var initialState = {
    totalSlaps: 0,
    slaps: 0,
    perSlap: 1,
    upgrades: upgradeList,
    powerups: powerupList,
    perSec: 0,
    highestUpgrade: 0
  };
  var Scoreboard = function(state, action) {
    if (typeof state === 'undefined') {
      state = initialState;
    }
    var updateSlaps = function updateSlaps() {
      if (typeof action.count === 'undefined') {
        state.slaps += state.perSlap;
        state.totalSlaps += state.perSlap;
      } else {
        state.slaps += action.count;
        state.totalSlaps += action.count;
      }
    };
    var getPowerupsById = function getPowerupsById() {
      var powerupsById = {};
      for (var j = 0; j < state.powerups.length; j++) {
        var powerup = state.powerups[j];
        var powerupId = 'upgradeId:' + powerup.upgradeId;
        if (typeof powerupsById[powerupId] === 'undefined') {
          powerupsById[powerupId] = {
            perSecMod: 0,
            perSlapMod: 0
          };
        }
        if (powerup.count === 1) {
          var powerupChange = powerup.change;
          if (typeof powerupChange.perSecMod !== 'undefined') {
            powerupsById[powerupId].perSecMod += powerupChange.perSecMod;
          }
          if (typeof powerupChange.perSlapMod !== 'undefined') {
            powerupsById[powerupId].perSlapMod += powerupChange.perSlapMod;
          }
        }
      }
      return powerupsById;
    };

    var setSlapStats = function setSlapStats() {
      var perSlap = 1;
      var perSec = 0;
      var nextUpgrade = 0;
      var powerupsById = getPowerupsById();
      for (var i = 0; i < state.upgrades.length; i++) {
        var upgrade = state.upgrades[i];
        if (upgrade.count > 0) {
          var change = upgrade.change;
          var powerupChange = powerupsById['upgradeId:' + upgrade.id];
          if (typeof change.perSlap !== 'undefined') {
            var slapAdditions = (change.perSlap * upgrade.count);
            var slapMod = 0;
            if (typeof powerupChange !== 'undefined') {
              slapMod = slapAdditions * powerupChange.perSlapMod;
            }
            perSlap += slapAdditions + slapMod;
          }
          if (typeof change.perSec !== 'undefined') {
            var intervalAddition = (change.perSec * upgrade.count);
            var intervalMod = 0;
            if (typeof powerupChange !== 'undefined') {
              intervalMod = intervalAddition * powerupChange.perSecMod;
            }
            perSec += intervalAddition + intervalMod;
          }
        }
        state.perSlap = perSlap;
        state.perSec = perSec;
        var currentCost =
        Math.ceil(upgrade.baseCost * Math.pow(1.07, upgrade.count));
        if (state.slaps >= currentCost) {
          nextUpgrade++;
          if (nextUpgrade >= state.highestUpgrade) {
            state.highestUpgrade = nextUpgrade;
          }
        }
      }
    };

    var buyUpgrade = function buyUpgrade(id) {
      for (var i = 0; i < state.upgrades.length; i++) {
        var upgrade = state.upgrades[i];
        if (upgrade.id === id) {
          state.slaps -=
          Math.ceil(upgrade.baseCost * Math.pow(1.07, upgrade.count));
          upgrade.count++;
        }
      }
    };
    var buyPowerup = function buyPowerup(id) {
      for (var i = 0; i < state.powerups.length; i++) {
        var powerup = state.powerups[i];
        if (powerup.id === id && powerup.count === 0) {
          state.slaps -= powerup.cost;
          powerup.count = 1;
        }
      }
    };
    switch (action.type) {
      case 'addSlaps':
        updateSlaps();
        break;
      case 'buyUpgrade':
        buyUpgrade(action.id);
        break;
      case 'buyPowerup':
        buyPowerup(action.id);
        break;
      case 'loadFromStorage':
        var storage = action.localStorage.scoreboard;
        var timestamp = action.localStorage.timestamp;
        var currentTime = new Date().getTime();
        var timeDiff = Math.round((currentTime - timestamp) / 1000);
        state.totalSlaps = storage.totalSlaps + (timeDiff * storage.perSec);
        state.slaps = storage.slaps + (timeDiff * storage.perSec);
        state.perSlap = storage.perSlap;
        state.perSec = storage.perSec;
        state.highestUpgrade = storage.highestUpgrade;
        if (typeof storage.upgrades !== 'undefined') {
          for (var i = 0; i < storage.upgrades.length; i++) {
            state.upgrades[i].count = storage.upgrades[i].count;
            state.upgrades[i].highestPowerup =
              storage.upgrades[i].highestPowerup;
          }
        }
        if (typeof storage.powerups !== 'undefined') {
          for (var j = 0; j < storage.powerups.length; j++) {
            state.powerups[j].count = storage.powerups[j].count;
          }
        }
        break;
      default: break;
    }
    setSlapStats();
    return state;
  };
  return Scoreboard;
});
