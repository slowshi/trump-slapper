define([
	'preloadjs',
 	'soundjs',
	 './reducer.js',
	 ], function(preloadjs, soundjs, reducer) {
	var TrumpFaceService = function($timeout, storeService, $interval) {
		createjs.Sound.alternateExtensions = ['mp3'];
		createjs.Sound
		.registerSound('/home/images/wrong.mp3', 'wrong');
		createjs.Sound
		.registerSound('/home/images/sitdown.mp3', 'sitdown');
		createjs.Sound
		.registerSound('/home/images/slap.mp3', 'slap');
		storeService.addReducer('handPos', reducer);

		var updateHandPos = function updateHandPos() {
			var handPos = storeService.store.getState().handPos;
			faceData.handPos = handPos;
		};
		storeService.store.subscribe(updateHandPos);

		var faceData = {
			element: null,
			faceSide: false,
			responseCount: 0,
			reponseInterval: null,
			handPos: {
				x: 0,
				y: 0,
			}
		};
		var talkShit = function talkShit() {
			if(Math.random()* 100 >= 50) {
				createjs.Sound.play('wrong');
			} else {
				createjs.Sound.play('sitdown');
			}
		};
		var cancelAudio = function cancelAudio() {
			if(faceData.responseInterval) {
				$timeout.cancel(faceData.responseInterval);
				faceData.responseInterval = null;
			}
		};

		var updateHandPos = function updateHandPos(evt) {
			var pos = {
				x: evt.x,
				y: evt.y,
			}
			storeService.store.dispatch({
				type: 'updateHandPos', 
				pos: pos,
			});
		}

		var resetFace = function resetFace() {
			faceData.element.removeClass('trump-face-owe');
			cancelAudio();
			faceData.responseInterval = $timeout(talkShit, 300);
		};

		var hitFace = function hitFace() {
			createjs.Sound.play('slap');
			faceData.element.addClass('trump-face-owe');
			$timeout(resetFace, 200);
			faceData.responseCount = 0;
			cancelAudio();
			storeService.store.dispatch({type: 'addSlaps'});
		};
		return {
			faceData: faceData,
			hitFace: hitFace,
			updateHandPos: updateHandPos,
		};
	};
	return TrumpFaceService;
});
