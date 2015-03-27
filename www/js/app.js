// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('wcp', ['ionic','angular.filter','wcp.controllers','wcp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('app.upcoming', {
    cache: false,
    url: "/upcoming",
    views: {
      'menuContent': {
        templateUrl: "templates/upcoming.html",
        controller: "UpcomingCtrl"
      }
    }
  })

  .state('app.latest', {
    cache: false,
    url: "/latest",
    views: {
      'menuContent': {
        templateUrl: "templates/latest.html",
        controller: "LatestCtrl"
      }
    }
  })
  .state('app.pools', {
    cache: false,
    url: "/pools",
    views: {
      'menuContent': {
        templateUrl: "templates/pools.html",
        controller: 'PoolsCtrl'
      }
    }
  })
  .state('app.schedule', {
    url: "/schedule",
    views: {
      'menuContent': {
        templateUrl: "templates/schedule.html",
        controller: 'ScheduleCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/upcoming');
});
