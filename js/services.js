var adminurl = "http://uat1.mypacco.com/mobile/";

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

        getpincode: function(pin,num,callback) {
            $http({
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
            }).success(function(data) {
                callback(data,num); 
            });
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
                    "Data": {"OrderDetailId":$.jStorage.get("orderid")}
                }
            })
        },

        getTransactionStatus: function() {
            return $http({
                url: adminurl + "getTransactionStatus",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {"OrderDetailId":$.jStorage.get("orderid")}
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
                        "OrderDetailId": $.jStorage.get("orderid"),
//                        "OrderDetailId": "3667",
//                        "OrderDetailId": "430",
                        "DeliveryTimeId": "0"
                    }
                }
            })
        },

        addorderservice: function(service) {
            
            return $http({
                url: adminurl + "addorderservice",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "order": {
                            "VendorId": service.VendorId,
                            "VendorServiceId": service.VendorServiceId,
                            "TotalAmount": service.TotalAmount,
                            "DeliveryTimeId": service.DeliveryTimeId,
                            "picdate": service.picdate,
                            "CreatedDate": service.picdate,
                            "CopAvailable": service.CopAllowed
                        },
                        "orderId": $.jStorage.get("orderid")
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
                        "OrderDetailId": $.jStorage.get("orderid")
                    }
                }
            })
        },

        savebookdetaildata: function(book) {
            return $http({
                url: adminurl + "savebookdetaildata",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "bookdetail": {
//                            "ServiceTypeId": 1,
//                            "IsPersonal": null,
                            "OrderDetailId": $.jStorage.get("orderid"),
                            "FromCompany": book.FromCompany,
                            "ToCompany": book.ToCompany,
                            "FromName": book.PF_Name,
                            "ToName": book.DT_Name,
                            "FromMobile": book.PF_Telephone,
                            "ToMobile": book.DT_Telephone,
                            "FromEmail": book.PF_Email,
                            "ToEmail": book.DT_Email,
                            "FromAddress1": book.PF_Add1,
                            "ToAddress1": book.DT_Add1,
                            "FromAddress2": book.PF_Add2,
                            "ToAddress2": book.DT_Add2,
                            "FromLandmark": book.PF_Landmark,
                            "ToLandmark": book.DT_Landmark,
//                            "FromSuburb": "dsf",
//                            "ToSuburb": "sdf",
//                            "fcity": "Ahmedabad",
//                            "tcity": "Ahmedabad",
//                            "fpincode": "380013",
//                            "tpincode": "380013",
//                            "FromState": "Gujarat",
//                            "ToState": "Gujarat",
//                            "FromCountry": "India",
//                            "ToCountry": "India",
//                            "FromTo": "India To India",
//                            "servicetype": "Document",
//                            "Qty": "1",
//                            "PickDate": "30.12.2014",
//                            "WeightUnit": "Kg",
//                            "LengthUnit": "CM",
                            "fpo": book.fpo,
                            "tpo": book.tpo
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
        
        gopayment: function(id) {
            return $http({
                url: adminurl + "payment/" + id,
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },

        saveorder: function(details) {
            return $http({
                url: adminurl + "saveorder",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "order": {         
                        		 "OrderdetailID": "",
                                 "DeliveryType": details.DeliveryType, //1 : domestic 2: international
                                 "FromPincode": details.FromPincode,
                                 "ToPincode": details.ToPincode,
								 "Country": details.country,
                                 "PickDate": details.PickDate,
                                 "CurrencyId": 1,
                                 "ParcelType": details.ParcelType, //1 :document 2 : parcel
                                 "Weight": details.weight,//document
                                 "Weight1": details.weight1, //parcel
                                 "SizeL": details.sizeL,
                                 "SizeW": details.sizeW,
                                 "SizeH": details.sizeH,
                                 "Value": details.value      
                    }
                }
            })
        },

        flushorderid: function() {
            $.jStorage.flush("orderid");
        },

        flushorder: function() {
            $.jStorage.flush("order");
        },

        setorderid: function(data) {
            $.jStorage.set("orderid", data);
        },

        fincalpinjsrotage: function(data) {
            $.jStorage.set("order", data);
        },
        getjstorage: function(data) {
            return $.jStorage.get("order");
        },

    };

});