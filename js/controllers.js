angular.module('starter.controllers', ['myservices', 'base64'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading, $location, $filter, $ionicPopup) {
    $scope.today = new Date();
    $scope.domestic = true;
    $scope.document = true;
	$scope.jstoragedata = {};
	$scope.jstoragedata.DeliveryType="1";
	$scope.details = [];
	$scope.details.ParcelType = "1";

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
		$scope.jstoragedata.finalpin=comePin;
//		MyServices.fincalpinjsrotage(comePin);
        $scope.closeFrom();
    };
	
	$scope.parcel = function () {
		console.log("date date date");
		console.log($filter('date')($scope.today, "dd.MM.yyyy"));
		$scope.jstoragedata.finaldate = $filter('date')($scope.today, "dd.MM.yyyy");
		MyServices.fincalpinjsrotage($scope.jstoragedata);
		$location.url('app/home/details');
	}

	// DEMESTIC
	$scope.domestictrue = function (){
		$scope.domestic = true;
		$scope.jstoragedata.DeliveryType="1";
		console.log($scope.jstoragedata);
	}
	$scope.domesticfalse = function (){
		$scope.domestic = false;
		$scope.jstoragedata.DeliveryType="2";
		console.log($scope.jstoragedata);
	}
	
	$scope.countrychange = function (country) {
		$scope.jstoragedata.country = country;
		
	}
	
	// DETAILS DOCUMENT PARCEL
	$scope.documenttrue = function (){
		$scope.document = true;
		$scope.details.ParcelType = "1";
	}
	$scope.documentfalse = function (){
		$scope.document = false;
		$scope.details.ParcelType = "2";
	}
	
    //Pin To select
    $scope.finalPinto = 'Select pincode';
    $scope.goPinto = function(comePinto) {
        $scope.finalPinto = comePinto;
		$scope.jstoragedata.finalto = comePinto;
        $scope.closeTo();
    };

    $ionicLoading.show({
        template: 'Please wait...'
    });
	
	
	// GET QUOTES
	var ordersuccess = function (data, status) {
		console.log(data);
        if(data.IsSuccess == true){
            $location.url("/app/home/details/quotes");
            $.jStorage.set("orderid",data.Data);
        }else{
            var alertPopup = $ionicPopup.alert({
                title: 'MyPacco',
                template: 'Error In Procceding'
            });
        }
	}
	
	$scope.getquotes = function (details) {
		$scope.doin = MyServices.getjstorage();
		console.log("details");
		console.log($scope.doin);
		console.log("jstorage");
		if(details.ParcelType == "2")
		{
			details.weight = 1;
		}else{
			details.weight1 = 1;
            details.sizeH = 1;
            details.sizeL = 1;
            details.value = 1;
            details.sizeW = 1;
		}
        details.DeliveryType = $scope.doin.DeliveryType;
        details.FromPincode = $scope.doin.finalpin;
        if(details.DeliveryType == "1")
        {
            details.ToPincode = $scope.doin.finalto;
            details.country = 1;
        }else{
            details.country = $scope.doin.country;
            details.ToPincode = "1";
            
        }
            
		details.PickDate = $scope.doin.finaldate;
		console.log(details);
		MyServices.saveorder(details).success(ordersuccess);
	}
})

.controller('QuoteCtrl', function($scope, $stateParams, $ionicModal, $location, $ionicLoading, $timeout, MyServices) {
    
    $scope.quotes = [];
    $scope.quote = [];
    
    // ON RADIO CLICK
    var orderservicesuccess = function (data, status){
        console.log(data);
    }
    $scope.radiockick = function (quote) {
        console.log(quote);
        $scope.quote = quote;
        
    }
    
    // GET SERVICES
    var servicesuccess = function (data, status) {
        console.log(data);
        $scope.quotes = data.Data;
        $ionicLoading.hide();
    }
    MyServices.availableservices().success(servicesuccess);
    
    
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
        
        MyServices.addorderservice($scope.quote).success(orderservicesuccess);
        
        $scope.oModal4.hide();
        $location.path('app/home/details/quotes/book');
    };

    $scope.closeRestriction = function() {
        $scope.oModal4.hide();
    };
    
	
	$ionicLoading.show({
//        template: 'We are fetching the best rates for you.',
		
    content: 'We are fetching the best rates for you.',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: '0'
    });
})

.controller('BookCtrl', function($scope, $stateParams, $ionicModal, MyServices, $location, $ionicPopup, $base64) {
    
    $scope.book = [];
    $scope.parcel = [];
    
    
    // PAYMENT GETWAY
    var paymentsuccess = function(data, status){
        console.log(data);
    }
    $scope.gotopayment = function (){
        console.log("encode");
        MyServices.gopayment($base64.encode($.jStorage.get("orderid"))).success(paymentsuccess);
    }
    
    var booksuccess = function (data, status) {
        console.log(data);
        $scope.book = data.Data.Data[0];
        MyServices.orderitems().success(parcelsuccess);
    }
    
    var parcelsuccess = function (data, status) {
        console.log("order parcel");
        console.log(data);
        $scope.parcel = data.Data[0];
    }
    
    var booksuccesssummary = function (data, status) {
        console.log(data);
        $scope.book = data.Data.Data[0];
        MyServices.orderitems().success(parcelsuccess);
    }
    MyServices.getparcelsummary().success(booksuccess);
    
    var savebooksuccess = function (data, status) {
        console.log(data);
        if(data.IsSuccess == true)
        {
            $location.url("/app/home/details/quotes/book/summary");
            MyServices.getparcelsummary().success(booksuccesssummary);
        }else{
             var alertPopup = $ionicPopup.alert({
                title: 'MyPacco',
                template: 'Error In Processing'
            });
        }
    }
    
    $scope.savebook = function (book) {
        console.log(book);
        MyServices.savebookdetaildata(book).success(savebooksuccess);
    }
    
    // DESIGN MODEL
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