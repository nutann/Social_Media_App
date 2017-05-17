/**
 * Created by nutan on 4/13/2017.
 */
(function () {

    app = angular.module('SocialMedia');

    app.controller('homeCtrl',['$scope','$state',function ($scope,$state) {


        $scope.signup = function (event) {

            event.preventDefault();
            //$state.go('signin');
            
        };
    }]);

})();
