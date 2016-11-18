define([
  './upgrades.js',
  'lodash'], function(upgrades, _) {
  var upgradeList = _.cloneDeep(upgrades);
  for (var i = 0; i < upgradeList.length; i++) {
    upgradeList[i].count = 0;
  }
  var initialState = {
    totalSlaps: 0,
    slaps: 0,
    perSlap: 1,
    upgrades: upgradeList,
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
    var setSlapStats = function setSlapStats() {
      var perSlap = 1;
      var perSec = 0;
      var nextUpgrade = 0;
      for (var i = 0; i < state.upgrades.length; i++) {
        var upgrade = state.upgrades[i];
        if (upgrade.count > 0) {
          var change = upgrade.change;
          if (typeof change.perSlap !== 'undefined') {
            perSlap += (change.perSlap * upgrade.count);
          }
          if (typeof change.perSec !== 'undefined') {
            perSec += (change.perSec * upgrade.count);
          }
        }
        var currentCost =
        Math.ceil(upgrade.baseCost * Math.pow(1.07, upgrade.count));
        if (state.slaps >= currentCost) {
          nextUpgrade++;
          if (nextUpgrade >= state.highestUpgrade) {
            state.highestUpgrade = nextUpgrade;
          }
        }
      }
      state.perSlap = perSlap;
      state.perSec = perSec;
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

    switch (action.type) {
      case 'addSlaps':
        updateSlaps();
        break;
      case 'buyUpgrade':
        buyUpgrade(action.id);
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
        for (var i = 0; i < storage.upgrades.length; i++) {
          state.upgrades[i].count = storage.upgrades[i].count;
        }
        break;
      default: break;
    }
    setSlapStats();
    return state;
  };
  return Scoreboard;
});
