var adminurl = "http://www.mypacco.com/mobile/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function($http, $location) {
    return {
        getcountrylist: function() {
            return $http({
                url: adminurl + "countrylist",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },

        getpincode: function(pin) {
            return $http({
                url: adminurl + "pincodelist",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "country": "1",
                        "q": pin
                    }
                }
            })
        },
        
    };

});