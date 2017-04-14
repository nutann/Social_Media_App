/**
 * Created by Galaxy on 4/14/2017.
 */

(function () {

    var app = angular.module('SocialMedia');

    app.controller('loginCtrl',function ($scope,$state) {

        $scope.submit = function () {

            console.log("login submit");
            //TODO make a ajax query to send data to the server
        }
    })



})();