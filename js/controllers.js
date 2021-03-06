var ref = 0;
angular.module('starter.controllers', ['myservices', 'base64', 'ionic.rating'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    $scope.about = true;
})

.controller('TrackCtrl', function($scope, $ionicModal, $timeout, MyServices, $location) {
    //  DECLARATION
    $scope.about = true;
    $scope.tracked = false;
    $scope.nottrack = false;
    
    
    //  TRACK TRANSATION ID
    var tracksuccess = function(data, status){
        console.log(data);
        $scope.track = data.Data;
        if(data.Data.msg=="Success"){
            $scope.tracked = true;
            $scope.nottrack = false;
        }else{
            $scope.nottrack = true;
            $scope.tracked = false;
        }
    }
    
    $scope.tracknow = function (transid) {
        MyServices.track(transid).success(tracksuccess);
    }
    
})

.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('ThankyouCtrl', function($scope, $ionicModal, $timeout, MyServices, $location,$ionicHistory) {


    $ionicHistory.clearHistory();
    var parcelsuccess = function(data, status) {
        console.log("order parcel");
        console.log(data);
        $scope.parcel = data.Data[0];
    }

    var transactionsuccess = function(data, status) {
        $scope.transaction = data.Data[0];
    }

    var booksuccess = function(data, status) {
        console.log(data);
        $scope.book = data.Data.Data[0];
        MyServices.orderitems().success(parcelsuccess);
        MyServices.getTransactionStatus().success(transactionsuccess);
    }
    MyServices.getparcelsummary().success(booksuccess);
	
	$scope.bookanother = function () {
		MyServices.flushorder();
		MyServices.flushorderid();
		$location.url("app/home");
	}

})

.controller('HomeCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading, $location, $filter, $ionicPopup, $timeout) {
    $scope.today = new Date();
    $scope.domestic = true;
    $scope.document = true;
    $scope.jstoragedata = {};
    $scope.jstoragedata.DeliveryType = "1";
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

    var lasttime = 0;
    //Country List
    var contsucess = function(data, status) {
        $scope.allcountries = data.Data;
        console.log(data);
        $ionicLoading.hide();
    };
    MyServices.getcountrylist().success(contsucess);

    var texttimelag=500;
    var pinnum = 0;
    var pincodesucess = function(data, num) {
        if (num == pinnum) {
            $scope.allpincodes = data.Data;
            console.log(data);
        }
        //$ionicLoading.hide();
    };
    var textpin = 0;
    var pin1 = $scope.datasearch;
    var pinsearchstart = function() {
        var d = new Date();
        var newlasttime = d.getTime() - texttimelag+10;
        if (newlasttime > lasttime) {
            //$timeout.cancel(pinsearchstart);
            //console.log("AJAX CALL");
            pinnum++;
            if (textpin.length > 3) {
                MyServices.getpincode(textpin, pinnum, pincodesucess);
            }

        }
    };

    $scope.doSearch = function(pin1) {
        if (pin1.length < 3) {
            return false;
        }
        textpin = pin1;

        var d = new Date();
        lasttime = d.getTime();

        $timeout(pinsearchstart, texttimelag);

        //        $ionicLoading.show({
        //            template: 'Please wait...'
        //        });
    };



    //Pin From select
    $scope.pinfrom = 'Select pincode';
    $scope.goPin = function(comePin) {
        $scope.pinfrom = comePin.name;
        $scope.finalPin = comePin.id;
        $scope.jstoragedata.finalpin = comePin.id;
        //		MyServices.fincalpinjsrotage(comePin);
        $scope.closeFrom();
    };

    $scope.parcel = function() {
        console.log("date date date");
        console.log($filter('date')($scope.today, "dd.MM.yyyy"));
        $scope.jstoragedata.finaldate = $filter('date')($scope.today, "dd.MM.yyyy");
        MyServices.fincalpinjsrotage($scope.jstoragedata);

        if ($scope.domestic == true) {
            if (!($scope.pinfrom == 'Select pincode') && !($scope.pinto == 'Select pincode')) {
                $location.url('app/home/details');
            } else {
                var myPopup = $ionicPopup.show({
                    title: 'From/To not selected',
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
        } else {
            console.log($scope.jstoragedata.country);
            if (!($scope.pinfrom == 'Select pincode') && $scope.jstoragedata.country) {
                $location.url('app/home/details');
            } else {
                var myPopup = $ionicPopup.show({
                    title: 'From/Country not selected',
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
        }
    }


    // DEMESTIC
    $scope.domestictrue = function() {
        $scope.domestic = true;
        $scope.jstoragedata.DeliveryType = "1";
        console.log($scope.jstoragedata);
    }
    $scope.domesticfalse = function() {
        $scope.domestic = false;
        $scope.jstoragedata.DeliveryType = "2";
        console.log($scope.jstoragedata);
    }

    $scope.countrychange = function(country) {
        $scope.jstoragedata.country = country;

    }

    // DETAILS DOCUMENT PARCEL
    $scope.documenttrue = function() {
        $scope.document = true;
        $scope.details.ParcelType = "1";
    }
    $scope.documentfalse = function() {
        $scope.document = false;
        $scope.details.ParcelType = "2";
    }

    //Pin To select
    $scope.pinto = 'Select pincode';
    $scope.goPinto = function(comePinto) {
        $scope.pinto = comePinto.name;
        $scope.finalPinto = comePinto.id;
        $scope.jstoragedata.finalto = comePinto.id;
        $scope.closeTo();
    };

    $ionicLoading.show({
        template: 'Please wait...'
    });


    // GET QUOTES
    var ordersuccess = function(data, status) {
        console.log(data);
        if (data.IsSuccess == true) {
			MyServices.setorderid(data.Data);
            $location.url("/app/home/details/quotes");
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'MyPacco',
                template: 'Error In Procceding'
            });
        }
    }

    $scope.getquotes = function(details) {
        $scope.doin = MyServices.getjstorage();
        console.log("details");
        console.log($scope.doin);
        console.log("jstorage");
        if (details.ParcelType == "2") {
            details.weight = '';
        } else {
            details.weight1 = '';
            details.sizeH = '';
            details.sizeL = '';
            details.value = '';
            details.sizeW = '';
        }
        details.DeliveryType = $scope.doin.DeliveryType;
        details.FromPincode = $scope.doin.finalpin;
        if (details.DeliveryType == "1") {
            details.ToPincode = $scope.doin.finalto;
            details.country = 1;
        } else {
            details.country = $scope.doin.country;
            details.ToPincode = 1;

        }

        $scope.allvalidation = [];
        $scope.allvalidation1 = [];
        details.PickDate = $scope.doin.finaldate;
        console.log(details);
        if (details.ParcelType == "2") {

            // VALIDATION

            $scope.allvalidation = [{
                field: $scope.details.weight1,
                validation: ""
            }, {
                field: $scope.details.sizeL,
                validation: ""
            }, {
                field: $scope.details.sizeW,
                validation: ""
            }, {
                field: $scope.details.sizeH,
                validation: ""
            }, {
                field: $scope.details.value,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            console.log(check);
            if (check) {
                $scope.data1 = {
                    "parceltype" : details.ParcelType,
                    "weight" : $scope.details.weight1,
                    "para" : "Kg"
                }
                $.jStorage.set("orderweight",$scope.data1);
                MyServices.saveorder(details).success(ordersuccess);
            }
        } else {
            // VALIDATION

            $scope.allvalidation1 = [{
                field: $scope.details.weight,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation1);
            console.log(check);
            if (check) {
                $scope.data1 = {
                    "parceltype" : details.ParcelType,
                    "weight" : $scope.details.weight,
                    "para" : "Gm"
                }
                $.jStorage.set("orderweight",$scope.data1);
                MyServices.saveorder(details).success(ordersuccess);
            }
        }
        //		MyServices.saveorder(details).success(ordersuccess);
    }
})

.controller('QuoteCtrl', function($scope, $stateParams, $ionicModal, $location, $ionicLoading, $timeout, MyServices, $ionicPopup, $filter) {

    $scope.quotes = [];
    $scope.quote = [];
    $scope.jstore = [];

    // ON RADIO CLICK
    var orderservicesuccess = function(data, status) {
        console.log(data);
    }
    $scope.radiockick = function(quote) {
        console.log(quote);
        $scope.quote = quote;

    }

    // GET SERVICES
    var servicesuccess = function(data, status) {
        console.log(data);
        $scope.quotes = data.Data;
        $scope.item = $filter('orderBy')($scope.quotes, "TotalAmount");
        console.log("item");
        console.log($scope.item);
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

    $scope.showInfo = function(quote) {
        console.log('Popup');
        $scope.jstore = $.jStorage.get("order");
        $scope.jstore.weight = $.jStorage.get("orderweight").weight;
        $scope.jstore.para = $.jStorage.get("orderweight").para;
        $scope.jstore.parceltype = $.jStorage.get("orderweight").parceltype;
        console.log($scope.jstore);
        if($scope.jstore.parceltype == "1")
        {
            if(!quote.minchrgwt && quote.minchrgwt == 0)
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Information',
                        template: '<strong>Actual Weight&nbsp: </strong>' + $scope.jstore.weight + $scope.jstore.para + 
                        ' <br><strong>Amount: </strong>' + quote.CurrencySymbol + quote.ActualAmount + 
                        '<br><strong>S.T: </strong>' + quote.CurrencySymbol +  quote.ServiceTax + 
                        '<br><strong>Total: </strong>' + quote.CurrencySymbol + quote.TotalAmount,
                        buttons: [{
                            text: 'Ok',
                            type: 'button-calm',
                        }]
                    });
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Information',
                        template: '<strong>Actual Weight&nbsp: </strong>' + $scope.jstore.weight + $scope.jstore.para + 
                        '<br><strong>Min. Chargable Weight: </strong>' + quote.minchrgwt + $scope.jstore.para + 
                        ' <br><strong>Amount: </strong>' + quote.CurrencySymbol + quote.ActualAmount + 
                        '<br><strong>S.T: </strong>' + quote.CurrencySymbol +  quote.ServiceTax + 
                        '<br><strong>Total: </strong>' + quote.CurrencySymbol + quote.TotalAmount,
                        buttons: [{
                            text: 'Ok',
                            type: 'button-calm',
                        }]
                    });
                }
        }else{
            if(quote.volwt)
            {
                if(!quote.minchrgwt && quote.minchrgwt == 0)
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Information',
                        template: '<strong>Actual Weight&nbsp: </strong>' + $scope.jstore.weight + $scope.jstore.para +
                        '<br><strong>Volumetric Weight &nbsp: </strong>' + quote.volwt + $scope.jstore.para + 
                        '<br><strong>Amount: </strong>' + quote.CurrencySymbol + quote.ActualAmount + 
                        '<br><strong>S.T: </strong>' + quote.CurrencySymbol +  quote.ServiceTax + 
                        '<br><strong>Total: </strong>' + quote.CurrencySymbol + quote.TotalAmount,
                        buttons: [{
                            text: 'Ok',
                            type: 'button-calm',
                        }]
                    });
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Information',
                        template: '<strong>Actual Weight&nbsp: </strong>' + $scope.jstore.weight + $scope.jstore.para +
                        '<br><strong>Volumetric Weight &nbsp: </strong>' + quote.volwt + $scope.jstore.para + 
                        '<br><strong>Min. Chargable Weight: </strong>' + quote.minchrgwt + $scope.jstore.para + 
                        '<br><strong>Amount: </strong>' + quote.CurrencySymbol + quote.ActualAmount + 
                        '<br><strong>S.T: </strong>' + quote.CurrencySymbol +  quote.ServiceTax + 
                        '<br><strong>Total: </strong>' + quote.CurrencySymbol + quote.TotalAmount,
                        buttons: [{
                            text: 'Ok',
                            type: 'button-calm',
                        }]
                    });
                }
            }else{
                if(!quote.minchrgwt && quote.minchrgwt == 0)
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Information',
                        template: '<strong>Actual Weight&nbsp: </strong>' + $scope.jstore.weight + $scope.jstore.para +
                        '<br><strong>Amount: </strong>' + quote.CurrencySymbol + quote.ActualAmount + 
                        '<br><strong>S.T: </strong>' + quote.CurrencySymbol +  quote.ServiceTax + 
                        '<br><strong>Total: </strong>' + quote.CurrencySymbol + quote.TotalAmount,
                        buttons: [{
                            text: 'Ok',
                            type: 'button-calm',
                        }]
                    });
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Information',
                        template: '<strong>Actual Weight&nbsp: </strong>' + $scope.jstore.weight + $scope.jstore.para +
                        '<br><strong>Min. Chargable Weight: </strong>' + quote.minchrgwt + $scope.jstore.para + 
                        '<br><strong>Amount: </strong>' + quote.CurrencySymbol + quote.ActualAmount + 
                        '<br><strong>S.T: </strong>' + quote.CurrencySymbol +  quote.ServiceTax + 
                        '<br><strong>Total: </strong>' + quote.CurrencySymbol + quote.TotalAmount,
                        buttons: [{
                            text: 'Ok',
                            type: 'button-calm',
                        }]
                    });
                }
            }
        }
        alertPopup.then(function(res) {});
    };
})

.controller('BookCtrl', function($scope, $stateParams, $ionicModal, MyServices, $location, $ionicPopup, $base64, $interval) {

    $scope.book = [];
    $scope.parcel = [];
    //Validations
    $scope.allvalidation = [];
    $scope.agree = true;


    $scope.iagree = function() {
        if ($scope.agree == false)
            $scope.agree = true;
        else
            $scope.agree = false;

    }

    // PAYMENT GETWAY
    var stopinterval = 0;

    var paymentsuccess = function(data, status) {
        console.log(data);
    }

    //    var onpayment = function(data, status) {
    //        console.log("on payment success");
    //        console.log(data.Data.Data[0]);
    //        if (data.Data.Data[0].OrderStatus == "InProgress") {
    //            var alertPopup = $ionicPopup.alert({
    //                title: 'MyPacco',
    //                template: 'Error In Payment Getway mechanism'
    //            });
    //        }
    //    }


    var transactionsuccess = function(data, status) {
        console.log(data.Data);
        if (data.Data == '') {
            console.log("Do nothing");
            //            var alertPopup = $ionicPopup.alert({
            //                title: 'MyPacco',
            //                template: 'Error In Payment Getway mechanism'
            //            });
            //            $interval.cancel(stopinterval);
            //            ref.close();

        } else {
            if (data.Data[0].TransactionMessage == "Transaction Successful" && data.Data[0].TransactionStatus == "SUCCESS") {
                ref.close();
                $interval.cancel(stopinterval);
                $location.url("/app/home/details/quotes/book/summary/thankyou")
                //				var alertPopup = $ionicPopup.alert({
                //					title: 'MyPacco',
                //					template: 'Transaction Successful'
                //				});
            } else {
                ref.close();
                $interval.cancel(stopinterval);
                var alertPopup = $ionicPopup.alert({
                    title: 'Transaction Error',
                    template: data.Data[0].TransactionMessage
                });
            }


        }
    }

    var callAtIntervalOrder = function() {
        MyServices.getTransactionStatus().success(transactionsuccess);
    }


    $scope.gotopayment = function() {


        var orderid = $base64.encode($.jStorage.get("orderid"));
        orderid = orderid.substr(0, orderid.length - 2);
        var abc = window.location.origin + window.location.pathname + "success.html";
        ref = window.open('http://www.mypacco.com/mobile/payment/' + orderid, '_blank', 'location=yes');
        stopinterval = $interval(callAtIntervalOrder, 2000);
        ref.addEventListener('exit', function(event) {
            console.log("on exit");
            MyServices.getparcelsummary().success(onpayment);
            $interval.cancel(stopinterval);
        });
    }

    var booksuccess = function(data, status) {
        console.log('Use This');
        console.log(data);
        $scope.book = data.Data.Data[0];
        MyServices.orderitems().success(parcelsuccess);
    }

    var parcelsuccess = function(data, status) {
        console.log("order parcel");
        console.log(data);
        $scope.parcel = data.Data[0];
    }

    var booksuccesssummary = function(data, status) {
        console.log(data);
        $scope.book = data.Data.Data[0];
        MyServices.orderitems().success(parcelsuccess);
    }
    MyServices.getparcelsummary().success(booksuccess);

    var savebooksuccess = function(data, status) {
        console.log(data);
        if (data.IsSuccess == true) {
            $location.url("/app/home/details/quotes/book/summary");
            MyServices.getparcelsummary().success(booksuccesssummary);
        } else {
            console.log("error in processing");
            var alertPopup = $ionicPopup.alert({
                title: 'MyPacco',
                template: 'Error In Processing'
            });
        }
    }

    $scope.savebook = function(book) {

        $scope.allvalidation = [{
            field: $scope.book.PF_Name,
            validation: ""
        }, {
            field: $scope.book.PF_Telephone,
            validation: ""
        }, {
            field: $scope.book.PF_Email,
            validation: ""
        }, {
            field: $scope.book.PF_Add1,
            validation: ""
        }, {
            field: $scope.book.DT_Name,
            validation: ""
        }, {
            field: $scope.book.DT_Telephone,
            validation: ""
        }, {
            field: $scope.book.DT_Add1,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            MyServices.savebookdetaildata(book).success(savebooksuccess);
        };
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