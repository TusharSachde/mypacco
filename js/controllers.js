angular.module('starter.controllers', ['myservices'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading) {
    $scope.today = new Date();
    $scope.domestic = true;
    $scope.document = true;

    //Modal
    //FROM
    $ionicModal.fromTemplateUrl('templates/pinfrom.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });

    $scope.openFrom = function() {
        $scope.oModal1.show();
    };
    $scope.closeFrom = function() {
        $scope.oModal1.hide();
    };

    //TO
    $ionicModal.fromTemplateUrl('templates/pinto.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal2 = modal;
    });

    $scope.openTo = function() {
        $scope.oModal2.show();
    };
    $scope.closeTo = function() {
        $scope.oModal2.hide();
    };

    //COUNTRY
    $ionicModal.fromTemplateUrl('templates/pincountry.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal3 = modal;
    });

    $scope.openCountry = function() {
        $scope.oModal3.show();
    };
    $scope.closeCountry = function() {
        $scope.oModal3.hide();
    };

    //Rest Services

    //Country List
    var contsucess = function(data, status) {
        $scope.allcountries = data.Data;
        console.log(data);
        $ionicLoading.hide();
    };
    MyServices.getcountrylist().success(contsucess);

    var pincodesucess = function(data, status) {
        $scope.allpincodes = data.Data;
        console.log(data);
        $ionicLoading.hide();
    };

    var pin1 = $scope.datasearch;
    $scope.doSearch = function(pin1) {
        MyServices.getpincode(pin1).success(pincodesucess);
        $ionicLoading.show({
            template: 'Please wait...'
        });
    };

    //Pin From select
    $scope.finalPin = 'Select pincode';
    $scope.goPin = function(comePin) {
        $scope.finalPin = comePin;
        $scope.closeFrom();
    };

    //Pin To select
    $scope.finalPinto = 'Select pincode';
    $scope.goPinto = function(comePinto) {
        $scope.finalPinto = comePinto;
        $scope.closeTo();
    };

    $ionicLoading.show({
        template: 'Please wait...'
    });
})

.controller('QuoteCtrl', function($scope, $stateParams, $ionicModal, $location) {
    $ionicModal.fromTemplateUrl('templates/modalrestriction.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal4 = modal;
    });

    $scope.openRestriction = function() {
        $scope.oModal4.show();
    };

    $scope.agree = function() {
        $location.path('app/home/details/quotes/book');
        $scope.oModal4.hide();
    };

    $scope.closeRestriction = function() {
        $scope.oModal4.hide();
    };
})

.controller('BookCtrl', function($scope, $stateParams, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modalterms.html', {
        id: '5',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal5 = modal;
    });
    
      $scope.openTerms = function() {
        $scope.oModal5.show();
    };

    $scope.closeTerms = function() {
        $scope.oModal5.hide();
    };
});