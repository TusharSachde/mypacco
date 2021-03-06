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
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
//        if (device.platform == 'Android' && window.StatusBar) {
//            StatusBar.backgroundColorByHexString("#C0651C");
//        }
    });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
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

    .state('app.thankyou', {
        url: "/home/details/quotes/book/summary/thankyou",
        views: {
            'menuContent': {
                templateUrl: "templates/thankyou.html",
                controller: 'ThankyouCtrl'

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
    })


    //Other Static Pages

    .state('app.contact', {
        url: "/contact",
        views: {
            'menuContent': {
                templateUrl: "templates/contact.html"
            }
        }
    })

    .state('app.about', {
        url: "/about",
        views: {
            'menuContent': {
                templateUrl: "templates/about.html"
            }
        }
    })

    .state('app.tools', {
        url: "/tools",
        views: {
            'menuContent': {
                templateUrl: "templates/tools.html"
            }
        }
    })

    .state('app.track', {
        url: "/track",
        views: {
            'menuContent': {
                templateUrl: "templates/track.html",
                controller: 'TrackCtrl'
            }
        }
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
            return "http://www.mypacco.com/images/VendorLogos/" + input;
            //                        return "http://localhost/sergybackend/uploads/" + input;
        }
    };
})
    .filter("mydate", function() {
        return function(input) {
            var myDate = input;
            myDate = myDate.split(" ");
            myDate = myDate[0].split("-");
            var newDate = myDate[1] + "," + myDate[2] + "," + myDate[0];
            console.log(newDate);
            var ddate = new Date(newDate);
            console.log(ddate);
            return (ddate.toDateString());
        }
    });

var formvalidation = function(allvalidation) {
    var isvalid2 = true;
    for (var i = 0; i < allvalidation.length; i++) {
        console.log("checking");
        console.log(allvalidation[i].field);
        if (allvalidation[i].field == "" || !allvalidation[i].field) {
            allvalidation[i].validation = "ng-dirty";
            isvalid2 = false;
        }
    }
    return isvalid2;
};