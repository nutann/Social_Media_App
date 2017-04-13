/**
 * Created by nutan on 4/12/2017.
 */
(function () {

    var app = angular.module('SocialMedia',["ui.router"]);

    app.config(function ($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url : '/home',
                templateUrl:'home.html',
                controller : 'homeCtrl'
            })
            .state('signin',{
                //TODO add html and controller
            })
            .state('signup',{
                url : '/signup',
                templateUrl:'signup.html',
                controller :'signupCtrl'
            })
            .state('main',{
                //TODO add main page
            });
    });

})();
