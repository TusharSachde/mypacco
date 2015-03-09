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

        getcurrency: function() {
            return $http({
                url: adminurl + "currencylist",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },

        getcategory: function() {
            return $http({
                url: adminurl + "categorylist",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },

        getparcelsummary: function() {
            return $http({
                url: adminurl + "parcelsummerydata",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },

        savedocument: function() {
            return $http({
                url: adminurl + "savedocumentdetails",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "ParcelDetails": {
                            "OrderDetailId": "426",
                            "WeightUnit": "Gm",
                            "CurrencyId": 1,
                            "Qty": "2",
                            "PickDate": "31.12.2014"
                        },
                        "Parceldata": [{
                            "OrderItemId": "",
                            "OrderDetailId": "426",
                            "Description": "document1",
                            "Weight": "250"
                        }]
                    }
                }
            })
        },

        getdocumentdetails: function() {
            return $http({
                url: adminurl + "documentdetailsdata",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "OrderDetailId": "425"
                    }
                }
            })
        },

        saveparceldetails: function() {
            return $http({
                url: adminurl + "saveparceldetails",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "ParcelDetails": {
                            "IsPersonal": null,
                            "OrderDetailId": "431",
                            "CurrencyId": 1,
                            "Lenghts": [{
                                "LengthId": 1,
                                "Length": "CM"
                            }],
                            "Weights": [{
                                "WeightId": 1,
                                "Weight": "Kg"
                            }],
                            "WeightUnit": "Kg",
                            "LengthUnit": "CM",
                            "Qty": "2",
                            "PickDate": "14.01.2015",
                            "Sample": null
                        },
                        "Parceldata": [{
                            "OrderItemId": "",
                            "OrderDetailId": "431",
                            "CategoryId": "7",
                            "Description": "Parcel1",
                            "Weight": "1",
                            "SizeL": "1",
                            "SizeW": "1",
                            "SizeH": "1",
                            "Value": "1",
                            "Dutiable": false,
                            "Commercial": false
                        }]
                    }
                }
            })
        },

        availableservices: function() {
            return $http({
                url: adminurl + "avalilableservices",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "OrderDetailId": "430",
                        "DeliveryTimeId": "0"
                    }
                }
            })
        },

        addorderservice: function() {
            return $http({
                url: adminurl + "addorderservice",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "order": {
                            "VendorId": "1",
                            "VendorServiceId": "1",
                            "TotalAmount": "16.85",
                            "DeliveryTimeId": "1",
                            "CreatedDate": "2015-02-12 10:09:35",
                            "CopAvailable": "1"
                        },
                        "orderId": "91"
                    }
                }
            })
        },

        allvendors: function() {
            return $http({
                url: adminurl + "addorderservice",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },

        orderitems: function() {
            return $http({
                url: adminurl + "orderitems",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "OrderDetailId": "215"
                    }
                }
            })
        },

        savebookdetaildata: function() {
            return $http({
                url: adminurl + "savebookdetaildata",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "bookdetail": {
                            "ServiceTypeId": 1,
                            "IsPersonal": null,
                            "OrderDetailId": "91",
                            "FromCompany": "abc",
                            "ToCompany": "test",
                            "FromName": "udayraj",
                            "ToName": "henry",
                            "FromMobile": "3216541654",
                            "ToMobile": "9786863242",
                            "FromEmail": "uday@kairasoftware.com",
                            "ToEmail": "henry@kaira.com",
                            "FromAddress1": "hbdsa jhbn",
                            "ToAddress1": "bxcvxcx",
                            "FromAddress2": "dfg",
                            "ToAddress2": "fdgd",
                            "FromLandmark": "fdg",
                            "ToLandmark": "dsf",
                            "FromSuburb": "dsf",
                            "ToSuburb": "sdf",
                            "fcity": "Ahmedabad",
                            "tcity": "Ahmedabad",
                            "fpincode": "380013",
                            "tpincode": "380013",
                            "FromState": "Gujarat",
                            "ToState": "Gujarat",
                            "FromCountry": "India",
                            "ToCountry": "India",
                            "FromTo": "India To India",
                            "servicetype": "Document",
                            "Qty": "1",
                            "PickDate": "30.12.2014",
                            "WeightUnit": "Kg",
                            "LengthUnit": "CM",
                            "fpo": "naranpura",
                            "tpo": "naranpura"
                        }
                    }
                }
            })
        },

        finaldetails: function() {
            return $http({
                url: adminurl + "finaldetails",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "OrderDetailId": 91,
                        "ServiceTypeId": 1,
                        "FromPincodeId": 1,
                        "ToPincodeId": 1,
                        "Qty": "1",
                        "WeightUnit": "Kg",
                        "LengthUnit": "CM",
                        "CurrencyId": 1,
                        "PickupDate": "2014-12-30",
                        "VendorId": 1,
                        "DeliveryTimeId": 1,
                        "Price": "1",
                        "EncryptedOrderDetialID": "",
                        "PF_Name": "udayraj",
                        "PF_Telephone": "3216541654",
                        "PF_Email": "uday@kairasoftware.com",
                        "DT_Name": "henry",
                        "DT_Telephone": "9786863242",
                        "DT_Email": "henry@kaira.com",
                        "PF_Add1": "hbdsa jhbn",
                        "PF_Add2": "dfg",
                        "PF_Landmark": "fdg",
                        "DT_Add1": "bxcvxcx",
                        "DT_Add2": "fdgd",
                        "DT_Landmark": "dsf",
                        "PF_Suburb": "dsf",
                        "DT_Suburb": "sdf",
                        "VendorServiceId": 1,
                        "Sample": null,
                        "UserId": 360,
                        "CreatedDate": "2015-01-01 00:00:00",
                        "InsurancePrice": 0,
                        "IsPersonal": null,
                        "FromCompany": "abc",
                        "ToCompany": "test",
                        "OrderStatus": "InProgress",
                        "StatusComment": null,
                        "servicetype": "Document",
                        "fpincode": "380013",
                        "fpo": "naranpura",
                        "fcity": "Ahmedabad",
                        "fstateid": 1,
                        "fstate": "Gujarat",
                        "fpincountryid": 1,
                        "fpincountry": "India",
                        "tpincode": "380013",
                        "tpo": "naranpura",
                        "tcity": "Ahmedabad",
                        "tstateid": 1,
                        "tstate": "Gujarat",
                        "tpincountryid": 1,
                        "tpincountry": "India",
                        "currencysymbol": "INR",
                        "currency": "Rs",
                        "verndorname": "DTDC",
                        "deliverytime": "Today",
                        "username": null,
                        "useremail": null,
                        "TransactionNum": null,
                        "PaymentMode": null,
                        "ServiceTax": 12.359999656677,
                        "VendorService": "DTDC Express"
                    },
                    "Message": null
                }
            })
        },

        addinsurance: function() {
            return $http({
                url: adminurl + "addinsurance",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "InsurancePrice": "0",
                        "orderdetailid": "91"
                    }
                }
            })
        },

        parceltype: function() {
            return $http({
                url: adminurl + "parceltype",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "ParcelType": "1"
                    }
                }
            })
        },

        requireddocuments: function() {
            return $http({
                url: adminurl + "requireddocuments",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "ParcelType": "4"
                    }
                }
            })
        },

        signup: function() {
            return $http({
                url: adminurl + "signup",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "userdata": {
                            "UserName": "udayraj",
                            "Mobile": "7574860376",
                            "UserEmail": "udayrajkhuman@mailinator.com",
                            "FacebookId": "",
                            "GoogleId": ""
                        }
                    }
                }
            })
        },

        otpverified: function() {
            return $http({
                url: adminurl + "otpverified",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "otpdata": {
                            "Otp": "sdfgds"
                        },
                        "userdata": {
                            "UserName": "krr",
                            "Mobile": "7574860376",
                            "UserEmail": "ukhuman@kairasoftware.com",
                            "FacebookId": "",
                            "GoogleId": ""
                        }
                    }
                }
            })
        },

        signin: function() {
            return $http({
                url: adminurl + "signin",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "userdata": {
                            "UserEmail": "test@mail.com",
                            "UserPassword": "123",
                            "condition": "false"
                        }
                    }
                }
            })
        },

        forgetemail: function() {
            return $http({
                url: adminurl + "forgetemail",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "forgetemail": {
                            "Email": "ukhuman@kairasoftware.com"
                        }
                    }
                }
            })
        },

        signout: function() {
            return $http({
                url: adminurl + "signout",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },

        saveorder: function(details, jdata) {
            return $http({
                url: adminurl + "saveorder",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "order": {         
                        		 "OrderdetailID": "",
                                 "DeliveryType": "1", //1 : domestic 2: international
                                 "FromPincode": jdata.finalpin,
                                 "ToPincode": jdata.finalto,
                                 "PickDate": jdata.finaldate,
                                 "CurrencyId": 1,
                                 "ParcelType": "1", //1 :document 2 : parcel
                                 "Weight": "1",//document
                                // "Weight1": "1", //parcel
                                 //"SizeL": "1",
                                 //"SizeW": "1",
                                 //"SizeH": "1",
                                 //"Value": "1"      
                    }
                }
            })
        },

        fincalpinjsrotage: function(data) {
			console.log(data);
            $.jStorage.set("order", data);
        },
        getjstorage: function(data) {
            return $.jStorage.get("order");
        },

    };

});