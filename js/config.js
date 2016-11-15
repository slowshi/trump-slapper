require.config({
    paths: {
        'angular'              : 'angular/angular.min',
        'angular-ui-router'    : 'angular/angular-ui-router.min',
        'angular-couch-potato' : 'angular/angular-couch-potato',
        'angular-css-injector' : 'angular/angular-css-injector.min',
        'redux'                : 'redux/redux.min',
        'lodash'               : 'lodash/lodash.min',
        'states'               : 'states',
        'app'                  : 'app',
        'app-init'             : 'app-init',
        'text'                 : 'requirejs-text/2.0.14/text',
        'store-service'        : 'store-service/index',
        'preloadjs'            : 'createjs/preloadjs/0.6.1/preloadjs-0.6.1.min',
        'soundjs'              : 'createjs/soundjs/0.6.1/soundjs-0.6.1.min',
    },
    shim:{
        'angular': {
            exports: 'angular'
        },
        'app': {
            deps: ['angular']
        },
        'app-init': {
            deps: ['angular','app']
        },
    },
});

require(['app-init'],function(appInit) {
    appInit();
});
