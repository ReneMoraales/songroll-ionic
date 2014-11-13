angular.module('songroll')
.controller('PlayerCtrl', function($scope, Player) {
  $scope.$watch('trackPlayer', function (trackPlayer) {
    Player.trackPlayer = trackPlayer;
  });
});