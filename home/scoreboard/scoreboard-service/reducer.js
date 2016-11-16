define([], function() {
    var initialState = {
        clicks: 0,
    };
    var Scoreboard = function(state, action) {
        if(typeof state === 'undefined') {
            state = initialState;
        }
        switch (action.type) {
            case 'addClicks':
                state.clicks++;
            break;
        }
        return state;
    };
    return Scoreboard;
});
