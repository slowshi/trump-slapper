define(['lodash', 'numeral'], function(_) {
  var ActivesService = function(storeService) {
    var data = {
      actives: []
    };
    var updateActives = function updateActives() {
      
    };

    storeService.store.subscribe(updateActives);
    return {
      data: data
    };
  };
  return ActivesService;
});
