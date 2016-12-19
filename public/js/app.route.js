/**
 * Created by sidhu on 12/13/2016.
 */
/**
 * <h1>Approute File!</h1>
 *
 * <p> The app.route.js file will handle all the routes and the route configuration.
 *  After that we have two subfolders â€“ components and shared. Letâ€™s dive into those next

 * <b>Note:</b> Giving proper comments in your program makes it more
 * user friendly and it is assumed as a high quality code.
 *
 * @author :Ramesh,Siddartha,Bhagirath
 * @version 1.0
 * @since   2016-09-08
 */


var mainApp = angular.module("mainApp", ['ngRoute', 'ngStorage']);

mainApp.config(function($routeProvider) {
    $routeProvider
        .when('/dashboard', {
            templateUrl: 'views/pages/dashboard.html',
            controller: 'dashboardController'

        })
        .when('/createProject', {
            templateUrl: 'views/pages/createProject.html',
            controller: 'createProjectController'
        })

    .when('/home', {
        templateUrl: 'views/pages/home.html',
        controller: 'homeController'

    }).when('/listofdatalayer', {
        templateUrl: 'views/pages/listOfDataLayer.html',
        controller: 'listOfDataLayerController'
    })

    .when('/copyProject', {
        templateUrl: 'views/pages/copyProject.html',
        controller: 'copyProjectController'
    })

    .when('/userInfo', {
            templateUrl: 'views/pages/userInfo.html',
            controller: 'userInfoController'
        })
        .when('/eventInfo', {
            templateUrl: 'views/pages/eventInfo.html',
            controller: 'eventInfoController'
        })
        .when('/reviewInfo', {
            templateUrl: 'views/pages/reviewInfo.html',
            controller: 'reviewInfoController'
        })

    .when('/thankyou', {
            templateUrl: 'views/pages/thankyou.html',
            controller: 'thankyouController'
        })
        .when('/retrieve', {
            templateUrl: 'views/pages/retrieve.html',
            controller: 'retrieveDLController'
        })
        .when('/homePage', {
            templateUrl: 'views/pages/homePage.html',
            controller: 'homePageController'
        })
        .when('/publishRules', {
            templateUrl: 'views/pages/PublishRules.html',
            controller: 'RulesController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
});