// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.details', {
        url: "/home/details",
        views: {
            'menuContent': {
                templateUrl: "templates/details.html",
                controller: 'HomeCtrl'

            }
        }
    })

    .state('app.quotes', {
        url: "/home/details/quotes",
        views: {
            'menuContent': {
                templateUrl: "templates/quotes.html",
                controller: 'QuoteCtrl'

            }
        }
    })

    .state('app.book', {
        url: "/home/details/quotes/book",
        views: {
            'menuContent': {
                templateUrl: "templates/book.html",
                controller: 'BookCtrl'

            }
        }
    })

    .state('app.summary', {
        url: "/home/details/quotes/book/summary",
        views: {
            'menuContent': {
                templateUrl: "templates/parcelsummary.html",
                controller: 'BookCtrl'

            }
        }
    })
    
    //Login    
    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    .state('register', {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: 'LoginCtrl'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
})

.filter('imagepath', function() {
    return function(input) {
        if (input == "") {
            return "http://www.mypacco.com/images/VendorLogos/campassador.png";
            //                            return "http://localhost/sergybackend/assets/img/default.jpg";
        } else {
            return "http://uat1.mypacco.com/images/VendorLogos/" + input;
            //                        return "http://localhost/sergybackend/uploads/" + input;
        }
    };
});