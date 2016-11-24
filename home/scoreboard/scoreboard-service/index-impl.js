define(['./reducer.js', 'numeral'], function(reducer, numeral) {
  var ScoreboardService = function(storeService, $interval) {
    var scoreboard = {
      totalSlaps: 0,
      slaps: 0,
      perSlap: 1,
      perSec: 0,
      formatted: {
        totalSlaps: 0,
        slaps: 0,
        perSlap: 1,
        perSec: 0
      }
    };
    var formatNumber = function formatNumber(number) {
      return numeral(number).format('0[.]0[0]a');
    };
    storeService.addReducer('scoreboard', reducer);
    var updateScoreboard = function updateScoreboard() {
      var scoreboardState = storeService.store.getState().scoreboard;
      scoreboard.slaps = Math.round(scoreboardState.slaps * 100) / 100;
      scoreboard.totalSlaps = Math.round(scoreboardState.totalSlaps * 100) / 100;
      scoreboard.perSlap = Math.round(scoreboardState.perSlap * 100) / 100;
      scoreboard.perSec = Math.round(scoreboardState.perSec * 100) / 100;
      scoreboard.formatted.slaps = formatNumber(scoreboard.slaps);
      scoreboard.formatted.totalSlaps = formatNumber(scoreboard.totalSlaps);
      scoreboard.formatted.perSlap = formatNumber(scoreboard.perSlap);
      scoreboard.formatted.perSec = formatNumber(scoreboard.perSec);
    };
    storeService.store.subscribe(updateScoreboard);
    var storageObj = storeService.loadLocalStorage();
    if (storageObj) {
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
