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
                templateUrl:'home.html'
            })
            .state('signin',{
                //TODO add html and controller
            })
            .state('signup',{
                //TODO add sign up page
            })
            .state('main',{
                //TODO add main page
            });
    });

})();
