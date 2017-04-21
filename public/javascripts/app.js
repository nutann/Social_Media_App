/**
 * Created by nutan on 4/12/2017.
 */
(function () {

    var app = angular.module('SocialMedia',['ui.router','ngSanitize']);

    app.config(function ($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url : '/home',
                templateUrl:'home.html',
                controller : 'homeCtrl'
            })
            .state('login',{
                url : '/login',
                templateUrl:'login.html',
                controller :'loginCtrl'
            })
            .state('signup',{
                url : '/signup',
                templateUrl:'signup.html',
                controller :'signupCtrl'
            })
            .state('welcome',{
                url : '/welcome/{userName}',
                templateUrl : 'welcome.html',
                controller : 'welcomeCtrl'
            })
            .state('welcome.chat',{
                url : '/chat',
                templateUrl : 'chat.html',
                controller: function($scope) {
                    console.log("state is chat")
                $scope.user = {name: "Nutan"};
                }
            })
            .state('main',{
                url : '/main',
                templateUrl : 'main.html',
                controller : 'mainCtrl'
            });
    });

})();
