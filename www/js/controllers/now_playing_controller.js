angular.module('songroll')
.controller('NowPlayingCtrl', function($scope, Player) {
  $scope.player = Player;
});