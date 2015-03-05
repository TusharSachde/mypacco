var adminurl = "http://mypacco.com/public/index.php/mobile/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function($http, $location) {
    return {
        getcountrylist: function() {
            return $http({
                url: "http://www.mypacco.com/mobile/countrylist",
                method: "POST",
                data: {"AppId":"46b4e721-18bd-4fd6-8209-a805aea2da5b","Token":"1234","Data":{}}
            })
        }
    }
})