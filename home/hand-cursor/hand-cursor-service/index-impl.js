define([], function() {
  var HandCursorService = function() {
    var handData = {
      element: null,
      handSide: false
    };

    var slapAction = function slapAction() {
      handData.handSide = !handData.handSide;
      if (handData.handSide) {
        handData.element.addClass('back-hand');
      } else {
        handData.element.removeClass('back-hand');
      }
    };
    return {
      handData: handData,
      slapAction: slapAction
    };
  };
  return HandCursorService;
});
