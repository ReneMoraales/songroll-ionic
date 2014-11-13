angular.module('songroll')
.factory('Player', function($rootScope){
  var trackPlayer = $('#track-player')[0];
  return {
    track: {},
    setup: function(){
      trackPlayer.addEventListener('durationchange', function(){
        $rootScope.playerData.duration = trackPlayer.duration;
        $rootScope.$apply();
      });
      trackPlayer.addEventListener('timeupdate', function(){
        $rootScope.playerData.currentTime = trackPlayer.currentTime;
        $rootScope.$apply();
      });
      trackPlayer.addEventListener('playing', function(){
        $rootScope.trackPlaying = true;
        $rootScope.$apply();
      });
      trackPlayer.addEventListener('pause', function(){
        $rootScope.trackPlaying = false;
        $rootScope.$apply();
      });
    }
  }
});