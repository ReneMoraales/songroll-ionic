angular.module('songroll', ['ionic', 'ngCordova', 'mediaPlayer'])

.run(function($rootScope, $ionicPlatform, $cordovaStatusbar, Player, Favorites) {
  $rootScope.playerData = {};

  $ionicPlatform.ready(function() {
    Player.setup();
    Favorites.setup();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.style(1); // White statusbar on iOS
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
        }
      }
    })

    .state('tab.search-track-detail', {
      url: '/search/:trackId',
      views: {
        'tab-search': {
          templateUrl: 'templates/track-detail.html',
          controller: 'TrackDetailCtrl'
        }
      }
    })

    .state('tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorites.html',
          controller: 'FavoritesCtrl'
        }
      }
    })

    .state('tab.favorites-track-detail', {
      url: '/favorites/:trackId',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/track-detail.html',
          controller: 'TrackDetailCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/search');

});

