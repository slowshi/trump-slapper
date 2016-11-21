define(['./reducer.js'], function(reducer) {
  var ScoreboardService = function(storeService, $interval) {
    var scoreboard = {
      totalSlaps: 0,
      slaps: 0,
      perSlap: 1,
      perSec: 0
    };

    storeService.addReducer('scoreboard', reducer);
    var updateScoreboard = function updateScoreboard() {
      var scoreboardState = storeService.store.getState().scoreboard;
      scoreboard.slaps = Math.round(scoreboardState.slaps * 100) / 100;
      scoreboard.totalSlaps =
      Math.round(scoreboardState.totalSlaps * 100) / 100;
      scoreboard.perSlap = Math.round(scoreboardState.perSlap * 100) / 100;
      scoreboard.perSec = Math.round(scoreboardState.perSec * 100) / 100;
    };
    storeService.store.subscribe(updateScoreboard);
    var storageObj = storeService.loadLocalStorage();
    if (storageObj) {
      console.log(storageObj);
      storeService.store.dispatch({
        type: 'loadFromStorage',
        localStorage: storageObj
      });
    }
    var slapsPerSec = function slapsPerSec() {
      storeService.store.dispatch({
        type: 'addSlaps',
        count: scoreboard.perSec / 10
      });
    };
    $interval(slapsPerSec, 100);
    return {
      scoreboard: scoreboard
    };
  };
  return ScoreboardService;
});
