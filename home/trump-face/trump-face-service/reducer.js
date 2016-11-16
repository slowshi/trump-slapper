define([], function() {
    var initialState = {
        x: 0,
        y: 0,
    };
    var HandPos = function(state, action) {
        if(typeof state === 'undefined') {
            state = initialState;
        }
        switch (action.type) {
            case 'updateHandPos':
                state = action.pos;
            break;
        }
        return state;
    };
    return HandPos;
});
