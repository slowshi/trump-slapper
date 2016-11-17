define(['./reducer.js'], function(reducer) {
	var ScoreboardService = function(storeService, $interval) {
		var scoreboard = {
			totalSlaps: 0,
			slaps: 0,
			upgrades: [{
				name: 'China',
				cost: 10,
				count: 0,
				enabled: false,
				visible: true,
				perSec: 1,
			}],
			perSlap: 1,
			perSec: 0,
		};

		storeService.addReducer('scoreboard', reducer);
		var updateScoreboard = function updateScoreboard() {
			var scoreboardState = storeService.store.getState().scoreboard;
			scoreboard.slaps = Math.round(scoreboardState.slaps*100)/100;
			scoreboard.totalSlaps = scoreboardState.totalSlaps;
			scoreboard.upgrades = scoreboardState.upgrades;
			scoreboard.perSlap = scoreboardState.perSlap;
			scoreboard.perSec = scoreboardState.perSec;
		};
		storeService.store.subscribe(updateScoreboard);
		var addUpgrade = function addUpgrade(name) {
			storeService.store.dispatch({
				type: 'buyUpgrade',
				name: name,
			});
		};
		var slapsPerSec = function slapsPerSec() {
			storeService.store.dispatch({
				type: 'addSlaps',
				count: scoreboard.perSec/10,
			});
		};
		$interval(slapsPerSec, 100);
		return {
			scoreboard: scoreboard,
			addUpgrade: addUpgrade,
		};
	};
	return ScoreboardService;
});
