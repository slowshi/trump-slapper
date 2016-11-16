define(['./reducer.js'], function(reducer) {
	var ScoreboardService = function(storeService) {
		var scoreboard = {
			clicks: 0,
		};
		storeService.addReducer('scoreboard', reducer);
		var updateScoreboard = function updateScoreboard() {
			scoreboard.clicks = storeService.store.getState().scoreboard.clicks;
		};
		storeService.store.subscribe(updateScoreboard);

		return {
			scoreboard: scoreboard,
		};
	};
	return ScoreboardService;
});
