define([
  'redux',
  'lodash'
], function(Redux, _) {
  var StoreService = function() {
    var store = Redux.createStore(function(state, action) {
      return state;
    }, {asyncReducers: []});

    var createReducer = function createReducer(asyncReducers) {
      return Redux.combineReducers(asyncReducers);
    };

    var addReducer = function injectAsyncReducer(name, asyncReducer) {
      if (typeof store.asyncReducers === 'undefined') {
        store.asyncReducers = [];
      }
      store.asyncReducers[name] = asyncReducer;
      store.replaceReducer(createReducer(store.asyncReducers));
    };
    var loadLocalStorage = function loadLocalStorage() {
      var localStorageObj = localStorage.getItem('trumpSlapper');
      if (localStorageObj) {
        var decodedString = window.atob(localStorageObj);
        var storeObj = JSON.parse(decodedString);
        return storeObj;
      }
      return false;
    };
    var saveLocalStorage = function saveLocalStorage() {
      var storeClone = _.cloneDeep(store.getState());
      storeClone.timestamp = new Date().getTime();
      var storeString = JSON.stringify(storeClone);
      var encodedStore = window.btoa(storeString);
      localStorage.setItem('trumpSlapper', encodedStore);
    };
    return {
      store: store,
      addReducer: addReducer,
      saveLocalStorage: saveLocalStorage,
      loadLocalStorage: loadLocalStorage
    };
  };
  return StoreService;
});
