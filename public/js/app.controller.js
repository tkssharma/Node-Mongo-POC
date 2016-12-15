/**
 * Created by sidhu on 12/13/2016.
 */

/*
 * <h1>AppController File!</h1>
 *
 * <p>
 * app initialization, config and routing <b>Note:</b> Giving proper comments
 * in your program makes it more user friendly and it is assumed as a high
 * quality code.
 *
 * @author :Ramesh,Siddartha,Bhagirath
 * @version 1.0
 * @since 2016-09-08
 */

mainApp.controller('homeController', function($scope, $http, PageInfoService, $localStorage, $location) {
    $scope.ds = "";

    $scope.show = {
        intlinkimp: false
    };

    $scope.disable = false;
    $scope.disable_Intlinkimp = false;
    $scope.disable_productName = false;
    $scope.disable_pmc = false;

    $scope.digitalDatas = {};
    $scope.digitalDatas.event = {};
    $scope.digitalDatas.event.productInfo = {};

    if (!$localStorage.pageInfo) {
        $scope.pageInfo = {
            country: "",
            business_unit: "",
            application_name: "",
            l4_Hierarchy: "",
            l5_Hierarchy: "",
            l6_Hierarchy: ""
        };
    } else {
        $scope.pageInfo = {
            country: $localStorage.pageInfo.country,
            business_unit: $localStorage.pageInfo.business_unit,
            application_name: $localStorage.pageInfo.application_name,
            l4_Hierarchy: $localStorage.pageInfo.l4_Hierarchy,
            l5_Hierarchy: $localStorage.pageInfo.l5_Hierarchy,
            l6_Hierarchy: $localStorage.pageInfo.l6_Hierarchy
        }
    }
    if (!$localStorage.dataJSon) {} else {
        $scope.digitalData = $localStorage.dataJSon;
    }
    if (!$localStorage.dataJSons) {
        $scope.digitalData = {};
    } else {
        $scope.digitalDatas = $localStorage.dataJSons;
    }
    if (!$localStorage.intlinkimp) {} else {
        $scope.show = {
            intlinkimp: true
        }
    }
    if (!$localStorage.radioButtonShow) {} else {
        $scope.radioButtonShow = $localStorage.radioButtonShow;
    }
    if (!$localStorage.disable) {} else {

        $scope.disable = $localStorage.disable;
    }
    if (!$localStorage.disable_productName) {

    } else {

        $scope.disable_productName = $localStorage.disable_productName;
    }
    if (!$localStorage.disable_pmc) {

    } else {

        $scope.disable_pmc = $localStorage.disable_pmc;
    }

    if (!$localStorage.disable_Intlinkimp) {} else {

        $scope.disable_Intlinkimp = $localStorage.disable_Intlinkimp;
    }

    $scope.validate = function() {
        if ($scope.show.intlinkimp == false) {
            delete $scope.digitalData.page.attributes;
        }
    }

    $scope.disableHomePage = function() {
        $scope.digitalData.page.pageInfo.pageName = "";
    }

    $scope.Intlinkimp_disable = function() {
        $scope.digitalData.page.attributes.intlinkimp = "";
    }
    $scope.disableproductName = function() {
        $scope.digitalDatas.event.productInfo.productName = "";
    }
    $scope.disablepmc = function() {
        $scope.digitalDatas.event.productInfo.pmc = "";
    }
    $scope.validateradioButton = function() {
        $scope.disable_productName = false;
        $scope.disable_pmc = false;
        $scope.digitalDatas.event.productInfo.productName = "";
        $scope.digitalDatas.event.productInfo.pmc = "";

    }
    $scope.savePageInfo = function() {
        PageInfoService.save($scope.pageInfo);
        $localStorage.digitalData = $scope.digitalData;
        $localStorage.digitalDatas = $scope.digitalDatas;

        $localStorage.pageInfo = $scope.pageInfo;
        $localStorage.page = $scope.page;
        $localStorage.dataLayerName = $scope.dataLayerName;
        if ($scope.radioButtonShow == 'CA_Submit') {
            $scope.digitalData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "submit"
                },
                productInfo: [{
                    productName: $scope.digitalDatas.event.productInfo.productName,
                    pmc: $scope.digitalDatas.event.productInfo.pmc
                }]
            }];
        }
        if ($scope.radioButtonShow == 'CA_Start') {
            $scope.digitalData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "start"
                },
                productInfo: [{
                    productName: $scope.digitalDatas.event.productInfo.productName,
                    pmc: $scope.digitalDatas.event.productInfo.pmc
                }]
            }];
        }
        if ($scope.radioButtonShow == 'CA_Financial') {
            $scope.digitalData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "financialInfo"
                },
                productInfo: [{
                    productName: $scope.digitalDatas.event.productInfo.productName,
                    pmc: $scope.digitalDatas.event.productInfo.pmc
                }]
            }];
        }
        if ($scope.radioButtonShow == 'CA_LearnMore') {

            $scope.digitalData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "learnMore"
                },
                productInfo: [{
                    productName: $scope.digitalDatas.event.productInfo.productName,
                    pmc: $scope.digitalDatas.event.productInfo.pmc
                }]
            }];
        }
        if (intlinkimp != "") {
            $scope.intliCheck = true;
        }
        $localStorage.dataJSon = $scope.digitalData;
        $localStorage.dataJSons = $scope.digitalDatas;
        $localStorage.radioButtonShow = $scope.radioButtonShow;
        $localStorage.intlinkimp = $scope.show.intlinkimp;
        $localStorage.disable = $scope.disable;
        $localStorage.disable_productName = $scope.disable_productName;
        $localStorage.disable_pmc = $scope.disable_pmc;
        $localStorage.disable_Intlinkimp = $scope.disable_Intlinkimp;
        console.log("$scope.radioButtonShow = " + $scope.radioButtonShow);
        console.log("$sceop.show.Intlinkimp = " + $scope.show.intlinkimp);
    }

    //For Pre populating Project Details

    $scope.dataLayerName = $localStorage.dataLayerName;

    if ($scope.dataLayerName) {
        $scope.digitalData = $localStorage.digitalData;
        $scope.digitalDatas = $localStorage.digitalDatas;
        $scope.dataLayerName = $localStorage.dataLayerName;
    } else {

        $scope.projectTitle = PageInfoService.getProjectTitle();
        $scope.projectId = PageInfoService.getProjectId();
        $http.get("http://" + $location.host() + ":" + $location.port() + "/" + "ITAG_POC/getProjectById/" + $scope.projectId)
            .success(function(data, status, headers, response) {
                if (data) {}
                $scope.digitalData = {};
                $scope.digitalData.page = {};
                $scope.digitalData.page.pageInfo = {};
                $scope.digitalData.page.category = {};
                $scope.digitalData.page.pageInfo.country = data.markets;
                $scope.digitalData.page.category.businessUnit = data.businessUnit;
                $scope.digitalData.page.category.primaryCategory = data.application;
            }).error(function(data, status) {
                alert("There is an error while adding DL data with duplicate parameters ");
            });
    }
});
mainApp.controller('userInfoController', function($scope, PageInfoService,
    $localStorage) {
    if (!$localStorage.userInfo) {
        $scope.userInfo = {
            accessLevel: false,
            accountStatus: false,
            accountTenure: false,
            industryCode: false,
            seNumber: false,
            mealPreference: false
        };
    } else {
        $scope.userInfo = {
            accessLevel: $localStorage.userInfo.accessLevel,
            accountStatus: $localStorage.userInfo.accountStatus,
            accountTenure: $localStorage.userInfo.accountTenure,
            industryCode: $localStorage.userInfo.industryCode,
            seNumber: $localStorage.userInfo.seNumber,
            mealPreference: $localStorage.userInfo.mealPreference
        }
    }
    $scope.saveUserInfo = function() {
        PageInfoService.saveUser($scope.userInfo);
        $localStorage.userInfo = $scope.userInfo;
    }
});

mainApp.controller('eventInfoController', function($scope, PageInfoService,
    $localStorage) {

    if (!$localStorage.message) {
        $scope.eventInfo = {
            eventAction: false,
            description: false,
            eventName: false,
            eventType: false

        };
    } else {
        $scope.eventInfo = {
            eventAction: $localStorage.message.eventAction,
            description: $localStorage.message.description,
            eventName: $localStorage.message.eventName,
            eventType: $localStorage.message.eventType
        };
    }

    $scope.saveEventInfo = function() {
        PageInfoService.saveEventInfo($scope.eventInfo);
        $localStorage.message = $scope.eventInfo;
    }
});

//Create Project Controller -End
window.onload = function() {
    localStorage.clear();
}

mainApp.controller("thankyouController", function($scope, $http,
    PageInfoService, $localStorage, $location, $sessionStorage) {

    $scope.$s_storage = $sessionStorage;
    console.log("ProjectTitle: " + $scope.$s_storage.projectTitle);
    console.log("reqParams " + $scope.$s_storage.reqParams);
});

mainApp.controller('retrieveDLController', function($scope, $http,
    PageInfoService, $localStorage, $location) {

    $scope.addRP2 = function() {
        $scope.request_parameter2 = true;
        $scope.button2 = true;
    }

    $scope.addRP3 = function() {
        $scope.request_parameter3 = true;
        $scope.button3 = true;
    }

    $scope.retrieveDataLayer = function() {
        $scope.dataLayer = JSON.stringify($localStorage.dataJSon);
        $scope.reqParamKey1 = $scope.selectedDataRP.Request_Parameter1.key;
        $scope.reqParamVal1 = $scope.selectedDataRP.Request_Parameter1.value;
        if ($scope.button2) {
            $scope.reqParamKey2 = $scope.selectedDataRP.Request_Parameter2.key;
            $scope.reqParamVal2 = $scope.selectedDataRP.Request_Parameter2.value;
        } else {}
        if ($scope.button3) {
            $scope.reqParamKey3 = $scope.selectedDataRP.Request_Parameter3.key;
            $scope.reqParamVal3 = $scope.selectedDataRP.Request_Parameter3.value;
        } else {}
        var selectedDataa = PageInfoService.getSelectedDetails();
        if ($scope.reqParamKey1 != null && $scope.reqParamVal1 != null && $scope.reqParamKey2 != null && $scope.reqParamVal2 != null && $scope.reqParamKey3 != null && $scope.reqParamVal3 != null) {
            $http.get("http://" + $location.host() + ":" + $location.port() + "/" + "ITAG_POC/getDataLayer?" + $scope.reqParamKey1 + "=" + $scope.reqParamVal1 + '&' + $scope.reqParamKey2 + "=" + $scope.reqParamVal2 + '&' + $scope.reqParamKey3 + "=" + $scope.reqParamVal3)
                .success(function(data, status, headers) {
                    if (data) {
                        $scope.DataJson = data;
                        console.log(" $scope.DataJson = " + JSON.stringify($scope.DataJson));
                    } else {
                        alert("Please Enter Valid parameters to Fetch the Data Layer");
                    }
                });
        } else if ($scope.reqParamKey1 != null && $scope.reqParamVal1 != null && $scope.reqParamKey2 != null && $scope.reqParamVal2 != null) {
            $http.get("http://" + $location.host() + ":" + $location.port() + "/" + "ITAG_POC/getDataLayer?" + $scope.reqParamKey1 + "=" + $scope.reqParamVal1 + '&' + $scope.reqParamKey2 + "=" + $scope.reqParamVal2)
                .success(function(data, status, headers) {
                    if (data) {
                        $scope.DataJson = data;
                        console.log(" $scope.DataJson = " + JSON.stringify($scope.DataJson));
                    } else {
                        alert("Please Enter Valid parameters to Fetch the Data Layer");
                    }
                });
        } else if ($scope.reqParamKey1 != null && $scope.reqParamVal1 != null) {
            $http.get("http://" + $location.host() + ":" + $location.port() + "/" + "ITAG_POC/getDataLayer?" + $scope.reqParamKey1 + "=" + $scope.reqParamVal1)
                .success(function(data, status, headers) {
                    if (data) {
                        $scope.DataJson = data;
                        console.log(" $scope.DataJson = " + JSON.stringify($scope.DataJson));
                    } else {
                        alert("Please Enter Valid parameters to Fetch the Data Layer");
                    }
                });

        }
    }
});

mainApp.controller('reviewInfoController', function($scope, $http,
    PageInfoService, $localStorage, $location, $sessionStorage) {

    $scope.dissabledVal = true;
    $scope.disable = true;
    $scope.backButton = '#/home';
    $scope.disabledReqParam = false;
    $scope.disable_productName = true;
    $scope.disable_pmc = true;
    $scope.disablePageName = true;
    $scope.checkBoxDisable = true;
    $scope.disable_Intlinkimp = true;
    $scope.intlinkimp = true;

    document.getElementById('Request_Parameter1_key').disabled = false;
    document.getElementById('Request_Parameter1_value').disabled = false;

    if ($location.$$url.split('/')[2] != undefined) {

        $scope.dissabledVal = false;
        $scope.checkBoxDisable = false;
        $scope.disabledReqParam = true;
        $scope.disable = false;
        $scope.disablePageName = false;
        $scope.disable_productName = false;
        $scope.disable_pmc = false;
        $scope.disable_Intlinkimp = false;
        $scope.intlinkimp = false;
        document.getElementById('Request_Parameter1_key').disabled = false;
        document.getElementById('Request_Parameter1_value').disabled = false;
        $scope.backButton = '#/listofdatalayer';

        $http.get("http://" + $location.host() + ":" + $location.port() + "/" + "ITAG_POC/getProjectSpecficDLs/" + $location.$$url.split('/')[2] + "/+" + $location.$$url.split('/')[3])
            .success(function(data, status, headers, response) {
                if (data) {

                    $scope.DataJson = data[0];

                    console.log($scope.DataJson);
                    if (JSON.parse(data[0].dataLayer).event != undefined) {
                        var radioValue = JSON.parse(JSON.stringify(JSON.parse(data[0].dataLayer).event).substring(1, JSON.stringify(JSON.parse(data[0].dataLayer).event).length - 1)).eventInfo.eventAction;

                        if (radioValue == 'start') {
                            $scope.radioButtonShow = 'CA_Start';
                        } else if (radioValue == 'financialInfo') {
                            $scope.radioButtonShow = 'CA_Financial';
                        } else if (radioValue == 'learnMore') {
                            $scope.radioButtonShow = 'CA_LearnMore';
                        } else if (radioValue == 'submit') {
                            $scope.radioButtonShow = 'CA_Submit';
                        }


                        var pmc = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(data[0].dataLayer).event).substring(1, JSON.stringify(JSON.parse(data[0].dataLayer).event).length - 1)).productInfo).substring(1, JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(data[0].dataLayer).event).substring(1, JSON.stringify(JSON.parse(data[0].dataLayer).event).length - 1)).productInfo).length - 1)).pmc;
                        var productName = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(data[0].dataLayer).event).substring(1, JSON.stringify(JSON.parse(data[0].dataLayer).event).length - 1)).productInfo).substring(1, JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(data[0].dataLayer).event).substring(1, JSON.stringify(JSON.parse(data[0].dataLayer).event).length - 1)).productInfo).length - 1)).productName;
                        $scope.selectedData = JSON.parse(data[0].dataLayer);
                        $scope.selectedDatas = JSON.parse(data[0].dataLayer);
                        $scope.selectedDatas.event = JSON.parse(data[0].dataLayer).event;
                        $scope.selectedDatas.event.productInfo = JSON.parse(JSON.stringify(JSON.parse(data[0].dataLayer).event).substring(1, JSON.stringify(JSON.parse(data[0].dataLayer).event).length - 1)).productInfo;
                        $scope.selectedDatas.event.productInfo.pmc = pmc;
                        $scope.selectedDatas.event.productInfo.productName = productName;


                    }
                    $scope.selectedData = JSON.parse(data[0].dataLayer);

                    if (pmc == '') {
                        $scope.disable_pmc = true;
                        $scope.pmcCheckBox = true;
                    }
                    if (productName == '') {
                        $scope.disable_productName = true;
                        $scope.productNameCheckBox = true;
                    }
                    if ($scope.selectedData.page.pageInfo.pageName == '') {
                        $scope.pageNameChecckBox = true;
                        $scope.disablePageName = true;
                    }


                    $scope.dataLayerName = data[0].dataLayerName;
                    if (data[0].reqParamKeyVal.split('=')[0] == undefined || data[0].reqParamKeyVal.split('=')[1] == undefined) {
                        document.getElementById('Request_Parameter1_key').disabled = false;
                        document.getElementById('Request_Parameter1_value').disabled = false;

                    }
                    data[0].reqParamKeyVal = data[0].reqParamKeyVal.split('&').join('=');
                    $scope.selectedDataRP = {};
                    $scope.selectedDataRP.Request_Parameter1 = {};
                    $scope.selectedDataRP.Request_Parameter1.key = data[0].reqParamKeyVal.split('=')[0]
                    $scope.selectedDataRP.Request_Parameter1.value = data[0].reqParamKeyVal.split('=')[1]
                    $scope.selectedDataRP.Request_Parameter2 = {};
                    $scope.selectedDataRP.Request_Parameter2.key = data[0].reqParamKeyVal.split('=')[2]
                    $scope.selectedDataRP.Request_Parameter2.value = data[0].reqParamKeyVal.split('=')[3]
                    $scope.selectedDataRP.Request_Parameter3 = {};
                    $scope.selectedDataRP.Request_Parameter3.key = data[0].reqParamKeyVal.split('=')[4]
                    $scope.selectedDataRP.Request_Parameter3.value = data[0].reqParamKeyVal.split('=')[5]

                    $scope.jsonData = JSON.parse(data[0].dataLayer);

                    if ($scope.selectedDataRP.Request_Parameter2.key !== undefined) {
                        $scope.addRP2();
                    }
                    if ($scope.selectedDataRP.Request_Parameter3.key !== undefined) {
                        $scope.addRP3();
                    }

                    $localStorage.dataJSon = $scope.selectedData;
                    $localStorage.dataJSons = $scope.selectedDatas;
                    $localStorage.dataLayerName = $scope.dataLayerName;
                    $localStorage.radioButtonShow = $scope.radioButtonShow;
                    $scope.jsonData = $localStorage.dataJSon;
                }
            });

    }

    $scope.selectedData = $localStorage.dataJSon;
    $scope.selectedDatas = $localStorage.dataJSons;
    $scope.dataLayerName = $localStorage.dataLayerName;
    $scope.jsonData = $localStorage.dataJSon;
    $scope.intlinkimp = $localStorage.intlinkimp;
    console.log("$localStorage.Intlinkimp = " + $localStorage.intlinkimp);
    $scope.radioButtonShow = $localStorage.radioButtonShow;
    console.log("$scope.selected.radioButtonShow = $localStorage.radioButtonShow; = " + $localStorage.radioButtonShow);


    if ($localStorage.intlinkimp == true) {
        $scope.intliCheck = true;
        console.log("Checked " + $localStorage.intlinkimp);
    }


    $scope.edit = function() {
        $scope.show = true;
        $scope.hide = true;
        document.getElementById('content').disabled = false;
        document.getElementById("content").focus();
    }

    $scope.disableReviewInfo = function() {

        $scope.selectedData.page.pageInfo.pageName = "";
    }

    $scope.disableproductName = function() {
        $scope.selectedDatas.event.productInfo.productName = "";
        $scope.editReviewInfo();
    }
    $scope.disablepmc = function() {
        $scope.selectedDatas.event.productInfo.pmc = "";
        $scope.editReviewInfo();
    }
    $scope.validateradioButton = function() {

        $scope.disable_productName = false;
        $scope.disable_pmc = false;
        $scope.selectedDatas.event.productInfo.productName = "";
        $scope.selectedDatas.event.productInfo.pmc = "";

    }
    $scope.intlinkimpdisable = function() {
        $scope.selectedData.page.attributes.intlinkimp = "";
        //$scope.dissabledVal = true;
    }
    $scope.save = function() {
        $scope.show = false;
        $scope.hide = false;

        document.getElementById('content').disabled = true;
        $scope.updatedJson = (document.getElementById('content').value);
        var finalJson = $scope.updatedJson.replace(/\\/g, "");
        $scope.jsonData = JSON.parse(finalJson);
        $localStorage.finalJson = $scope.jsonData;
    }
    $scope.saveDetails = function() {
            if ($localStorage.finalJson) {
                $scope.dataLayer = JSON.stringify($localStorage.finalJson);
            } else {
                $scope.dataLayer = JSON.stringify($localStorage.dataJSon);
            }
            $scope.reqParamKey1 = $scope.selectedDataRP.Request_Parameter1.key;
            $scope.reqParamVal1 = $scope.selectedDataRP.Request_Parameter1.value;
            if ($scope.button2) {
                $scope.reqParamKey2 = $scope.selectedDataRP.Request_Parameter2.key;
                $scope.reqParamVal2 = $scope.selectedDataRP.Request_Parameter2.value;
            } else {}
            if ($scope.button3) {
                $scope.reqParamKey3 = $scope.selectedDataRP.Request_Parameter3.key;
                $scope.reqParamVal3 = $scope.selectedDataRP.Request_Parameter3.value;
            } else {}
            var selectedDataa = PageInfoService.getSelectedDetails(); //totalJson:$scope.
            $scope.projectId = PageInfoService.getProjectId();

            if ($scope.reqParamKey1 != null && $scope.reqParamVal1 != null && $scope.reqParamKey2 != null && $scope.reqParamVal2 != null && $scope.reqParamKey3 != null && $scope.reqParamVal3 != null) {

                $scope.reqParam = $scope.reqParamKey1 + "=" + $scope.reqParamVal1 + "&" + $scope.reqParamKey2 + "=" + $scope.reqParamVal2 + "&" + $scope.reqParamKey3 + "=" + $scope.reqParamVal3;
            } else if ($scope.reqParamKey1 != null && $scope.reqParamVal1 != null && $scope.reqParamKey2 != null && $scope.reqParamVal2 != null) {
                $scope.reqParam = $scope.reqParamKey1 + "=" + $scope.reqParamVal1 + "&" + $scope.reqParamKey2 + "=" + $scope.reqParamVal2;
            } else if ($scope.reqParamKey1 != null && $scope.reqParamVal1 != null) {
                $scope.reqParam = $scope.reqParamKey1 + "=" + $scope.reqParamVal1;
            }
            //
            if ($location.$$url.split('/')[2] != undefined) {
                $scope.editReviewInfo();
                PageInfoService.updateDL($location.host(), $location.port(), JSON.stringify($scope.selectedData), $scope.reqParam, $location.$$url.split('/')[3], $scope.dataLayerName, $location.$$url.split('/')[2]);
                $sessionStorage.reqParams = $scope.reqParam;
                $localStorage.$reset();

            } else {
                $http.post("http://" + $location.host() + ":" + $location.port() + "/" + "ITAG_POC/saveITagData", { 'dataLayer': $scope.dataLayer, 'reqParamKeyVal': $scope.reqParam, 'projectId': $scope.projectId, 'dataLayerName': $scope.dataLayerName })
                    .success(function(data, status, headers) {
                        $sessionStorage.reqParams = $scope.reqParam;
                        $localStorage.$reset();
                        $location.path('/thankyou');
                    }).error(function(data, status) {
                        alert("There is an error while adding data with duplicate parameters");
                    });
            }
        }
        //Edit
    $scope.editReviewInfo = function() {
        console.log("Edit Review Info");
        if ($scope.radioButtonShow == 'CA_Submit') {
            $scope.selectedData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "submit"
                },
                productInfo: [{
                    productName: $scope.selectedDatas.event.productInfo.productName,
                    pmc: $scope.selectedDatas.event.productInfo.pmc
                }]
            }];

        }
        if ($scope.radioButtonShow == 'CA_Start') {

            $scope.selectedData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "start"
                },
                productInfo: [{
                    productName: $scope.selectedDatas.event.productInfo.productName,
                    pmc: $scope.selectedDatas.event.productInfo.pmc
                }]
            }];
        }
        if ($scope.radioButtonShow == 'CA_Financial') {

            $scope.selectedData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "financialInfo"
                },
                productInfo: [{
                    productName: $scope.selectedDatas.event.productInfo.productName,
                    pmc: $scope.selectedDatas.event.productInfo.pmc
                }]
            }];
        }

        if ($scope.radioButtonShow == 'CA_LearnMore') {

            $scope.selectedData.event = [{
                eventInfo: {
                    eventType: "cardApplication",
                    eventAction: "learnMore"
                },
                productInfo: [{
                    productName: $scope.selectedDatas.event.productInfo.productName,
                    pmc: $scope.selectedDatas.event.productInfo.pmc
                }]
            }];
        }

    }

    //Edit-end
    //
    $scope.validate = function() {
            console.log("Test inli");
            if ($scope.intliCheck == false) {
                console.log("Test inli Pass");
                delete $scope.digitalData.page.attributes;
            }
        }
        //
    $scope.addRP2 = function() {
        $scope.request_parameter2 = true;
        $scope.button2 = true;
        $scope.buttonMinus = true;
    }

    $scope.addRP3 = function() {
        $scope.request_parameter3 = true;
        $scope.button3 = true;
        $scope.buttonMinus2 = true;
    }
    $scope.deleteRP2 = function() {
        $scope.request_parameter3 = false;
        $scope.button3 = false;
        $scope.request_parameter2 = false;
        $scope.button2 = false;
        $scope.buttonMinus = false;
        $scope.buttonMinus2 = false;
        $scope.selectedDataRP.Request_Parameter2.key = "";
        $scope.selectedDataRP.Request_Parameter2.value = "";
        $scope.selectedDataRP.Request_Parameter3.key = "";
        $scope.selectedDataRP.Request_Parameter3.value = "";
    }

    $scope.deleteRP3 = function() {
        $scope.request_parameter3 = false;
        $scope.button3 = false;
        $scope.buttonMinus2 = false;
        $scope.selectedDataRP.Request_Parameter3.key = "";
        $scope.selectedDataRP.Request_Parameter3.value = "";
    }

});

//Create Project Controller

mainApp.controller('createProjectController', function($scope, $http,
    PageInfoService, $localStorage, $location) {

    alert("into create project function ");


    $scope.createProject = function() {


        // $scope.reqParamKey1 = $scope.selectedDataRP.Request_Parameter1.key;
        $scope.projectTitle = $scope.project.title;
        alert($scope.projectTitle);
        $scope.markets = $scope.project.markets;

        $scope.businessUnit = $scope.project.businesUnit;
        $scope.application = $scope.project.application;
        alert($scope.application);
        $scope.data = { 'projectTitle': $scope.projectTitle, 'markets': $scope.markets, 'businessUnit': $scope.businessUnit, 'application': $scope.application }
        PageInfoService.saveProject($scope.data);
    }

});


mainApp.controller('dashboardController', function($scope, $http,
    PageInfoService, $localStorage, $location, $timeout) {


    $scope.getProjects = function() {
        //$localStorage.$reset();
        $http.get("api/projects")
            .success(function(data, status, headers, response) {
                if (data) {
                    $scope.Projects = data;
                }
            });
    }



    $scope.sendProjectName = function(projectTitle) {
        PageInfoService.sendProjectName(projectTitle);
    }
    $scope.sendProjectId = function(projectId, projectTitle) {
        PageInfoService.sendProjectId(projectId);
        PageInfoService.sendProjectName(projectTitle);

    }

    $scope.deleteproject = function(projId) {

        alert("Are you sure want to delete Project")
        $scope.projectId = projId;
        $http.delete("ITAG_POC/deleteProject/" + $scope.projectId)
            .success(function(data, status, headers) {
                $scope.getProjects();
            });
    }

});
mainApp.controller('listOfDataLayerController', function($scope, $http,
    PageInfoService, $localStorage, $location) {

    $scope.projectId = PageInfoService.getProjectId();
    $scope.projectTitle = PageInfoService.getProjectTitle();


    $scope.getDataLayers = function() {
        $http.get("api/getProjectDLs/" + $scope.projectId)
            .success(function(data, status, headers) {
                if (data) {
                    $scope.DataJson = data;
                    var dataLayer_list = [];
                    for (var i = 0; i < data.length; i++) {
                        var id = data[i].id;
                        var requestKeyVal = data[i].reqParamKeyVal;
                        var dataLayerName = data[i].dataLayerName;
                        dataLayer_list.push({
                            "dataLayerName": dataLayerName,
                            "id": id,
                            "requestKeyVal": requestKeyVal
                        });
                    }
                    $scope.page_data_layer = dataLayer_list;
                }
            });
    }

    $scope.deleteDL = function(dataLayer) {
        alert("Are you sure want to delete")
        $scope.id = dataLayer.id;
        $http.delete("http://" + $location.host() + ":" + $location.port() + "/" + "ITAG_POC/deleteDL/" + $scope.id)
            .success(function(data, status, headers) {
                $scope.getDataLayers();
            });
    }



    /* $scope.displayProjectTitle = function() {
         $http.get("ITAG_POC/getProjectById/" + $scope.projectId)
             .success(function(data, status, headers, response) {
                 $scope.projectTitle = data.projectTitle;
             }).error(function(data, status) {
                 alert("There is an error while getProjectByID ");
             });
     }*/
    // $scope.displayProjectTitle();


});


//Copy Project -- Start
mainApp.controller('copyProjectController', function($scope, $http,
    PageInfoService, $localStorage, $location, $q) {

    $scope.copyProject = function() {
        $scope.projectId = PageInfoService.getProjectId();
        $scope.copiedProjectTitle = $scope.project.title;

        var copiedProject;

        PageInfoService.retrieveProjectById($location.host(), $location.port(), $scope.projectId)
            .then(
                function(retrieveresult) {
                    // promise was fullfilled (regardless of outcome)
                    // checks for information will be peformed here
                    console.log("Retrieve Project details by id succeeded for: id=" + $scope.projectId);
                    console.log(retrieveresult);

                    if (retrieveresult) {
                        copiedProject = retrieveresult;

                        $scope.markets = copiedProject.markets;
                        $scope.businessUnit = copiedProject.businessUnit;
                        $scope.application = copiedProject.application;
                        var copiedDL = "";
                        var reqParamKeyVal = "";
                        var DLsuccess = "";

                        PageInfoService.copyProject($location.host(), $location.port(),
                                $scope.copiedProjectTitle, $scope.markets, $scope.businessUnit, $scope.application)
                            .then(
                                function(copyresult) {
                                    // promise was fullfilled (regardless of outcome)
                                    // checks for information will be peformed here
                                    console.log("Copy Project Post succeeded for: projectTitle=" + $scope.copiedProjectTitle);

                                    var copiedProjectId = PageInfoService.getDeferredProjectId();
                                    console.log("copiedProjectId:" + copiedProjectId);

                                    console.log("Copying DLs from " + $scope.projectId + " to " + copiedProjectId);

                                    PageInfoService.copyProjectDLs($location.host(), $location.port(), $scope.projectId, copiedProjectId)
                                        .then(
                                            function(copyDLresult) {
                                                // promise was fullfilled (regardless of outcome)
                                                // checks for information will be peformed here
                                                console.log("Copy Project DataLayers Post succeeded for: projectTitle=" + $scope.copiedProjectTitle);

                                                // if(DLsuccess==true){
                                                // $scope.Projects.push(copiedProjectTitle);
                                                PageInfoService.sendProjectId(copiedProjectId);

                                                alert("Copy Project Created");
                                                $location.path('/listofdatalayer');
                                                //   }
                                            },
                                            function(copyDLerror) {
                                                // handle errors here
                                                console.log(copyerror.statusText);
                                                $location.path('/dashboard');
                                            }
                                        );
                                },
                                function(copyerror) {
                                    // handle errors here
                                    console.log(copyerror.statusText);
                                    $location.path('/dashboard');
                                }
                            );
                    }
                },
                function(retrieveerror) {
                    // handle errors here
                    console.log("Retrieve Project details by id failed/errored for: id=" + $scope.projectId);
                    console.log(retrieveerror.statusText);
                    $location.path('/dashboard');
                }
            );
    }


});
//End

mainApp.run(function($rootScope, $location) {
    $rootScope.location = $location;

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (!current && next.$$route.originalPath == '/listofdatalayer') {
            $location.path('/dashboard');
        }
    });
});

mainApp.directive('tooltip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).hover(function() {

                $(element).tooltip('show');
            }, function() {

                $(element).tooltip('hide');
            });
        }
    };
});