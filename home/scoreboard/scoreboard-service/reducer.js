define([
    './upgrades.js',
    'lodash',
], function(upgrades, _) {
    var initialState = {
        totalSlaps: 0,
        slaps: 0,
        perSlap: 1,
        upgrades: [],
        perSec: 0,
        highestUpgrade: 0,
    };
    var Scoreboard = function(state, action) {
        if(typeof state === 'undefined') {
            state = initialState;
        }
        var updateSlaps = function updateSlaps() {
            if(action.count !== void 0) {
                state.slaps += action.count;
                state.totalSlaps += action.count;
            }else{
                state.slaps += state.perSlap;
                state.totalSlaps += state.perSlap;
            }
        };
        var getUpgrades = function getUpgrades() {
            var nextUpgrade = 0;
            for(var i in upgrades) {
                var upgrade = upgrades[i];
                    upgrade.enabled = state.slaps >= upgrade.cost;
                    upgrade.visible = state.highestUpgrade >= i;
                if(state.slaps >= upgrade.cost) {
                    nextUpgrade++;
                    if(nextUpgrade >= state.highestUpgrade) {
                        state.highestUpgrade = nextUpgrade;
                    }
                }
            };
            // if(upgrades[nextUpgrade] !== void 0) {
            //     upgrades[nextUpgrade].visible = true;
            // }
            state.upgrades = upgrades;
        };
        var buyUpgrade = function buyUpgrade(name) {
            for(var i in upgrades) {
                var upgrade = upgrades[i];
               if(upgrade.name === name) {
                   upgrade.count++;
                   state.slaps -= upgrade.cost;
                   upgrade.cost = Math.ceil(upgrade.baseCost * Math.pow(1.07, upgrade.count));
               }
            };
        };
        var setSlapStats = function setSlapStats() {
            var perSlap = 1;
            var perSec = 0;
            for(var i in upgrades) {
                var upgrade = upgrades[i];
                if(upgrade.count > 0) {
                    var change = upgrade.change;
                    if(change['perSlap'] !== void 0) {
                        perSlap += (change['perSlap'] * upgrade.count);
                    }
                    if(change['perSec'] !== void 0){
                        perSec += (change['perSec'] * upgrade.count);
                    }
                }
            };
            state.perSlap = perSlap;
            state.perSec = perSec;
        };
        switch (action.type) {
            case 'addSlaps':
                updateSlaps();
            break;
            case 'buyUpgrade':
                buyUpgrade(action.name);
            break;
        }
        setSlapStats();
        getUpgrades();
        return state;
    };
    return Scoreboard;
});
