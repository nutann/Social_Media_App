/**
 * Created by Galaxy on 4/14/2017.
 */

(function () {

    var app = angular.module('SocialMedia');

    app.controller('loginCtrl',function ($scope,$state) {

        $scope.login = function (event,username,password) {

            console.log("login submit");
            //TODO make a ajax query to send data to the server
            $state.go("home");
        }

        $scope.goBack = function() {
            window.history.back();
        }
    })



})();