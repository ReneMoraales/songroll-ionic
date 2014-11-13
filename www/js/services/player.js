angular.module('songroll')
.factory('Player', function($rootScope){
  var trackPlayer = $('#track-player')[0];
  return {
    playerTrackURL: '',
    loading: false,
    loaded: false,
    trackInfo: {},
    setup: function(){
    }
  }
});