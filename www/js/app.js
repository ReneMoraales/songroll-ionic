// Ionic Starter App

$(document).on('submit', '#songLookup', function(e){
  e.preventDefault();
  var query = $('#songLookup input').val();
  $('#songLookup input').val('');
  audioFromString(query);
});

audioFromString = function(string){
  var query = encodeURIComponent(string);
  $.post('https://www.tumblr.com/search/'+query, {
    q: string,
    sort: 'top',
    post_view: 'masonry',
    blogs_before: 1,
    num_blogs_shown: 0,
    num_posts_shown: 0,
    before: 0,
    blog_page: 2,
    post_page: 1,
    filter_nsfw: true,
    filter_post_type: 'audio',
    next_ad_offset: 0,
    ad_placement_id: 0,
    more_posts: true
  }, function(r){
    var html = $('<div id="songroll_tumblr_thief">'+r+'</div>');
    var post = html.find('#search_posts article').first();
    var postId = post.attr('data-post-id');
    var postTumblelog = post.attr('data-tumblelog-name');

    $.get('https://api.tumblr.com/v2/blog/'+postTumblelog+'.tumblr.com/posts?id='+postId+'&api_key=HHEnu3jZpQNGOIOdlsCxRM96iww8QwjHRvnjn343BYj5f5hjr8', function(r2){
      var audioURL = r2.response.posts[0].audio_url;

      if ( audioURL.indexOf('tumblr.com/audio_file') > -1 ) {
        var pieces = audioURL.split('/');
        audioURL = 'https://a.tumblr.com/'+pieces[pieces.length-1]+'o1.mp3';
      }

      $('#audio_player').remove();
      $('<audio id="audio_player" controls><source src="'+audioURL+'" type="audio/mpeg"></audio>').appendTo('ion-content .scroll');

      $('#audio_player')[0].addEventListener('error', function(e){
        console.log(e.target.error.code);
      });

      console.log(audioURL);
    }, 'json');
  });
}

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.style(1);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

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
      url: '/favories/:trackId',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/track-detail.html',
          controller: 'TrackDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/search');

});

