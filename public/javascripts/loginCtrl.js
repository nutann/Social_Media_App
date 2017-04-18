/**
 * Created by Galaxy on 4/14/2017.
 */

(function () {

    var app = angular.module('SocialMedia');

    app.controller('loginCtrl',function ($scope,$state,$http) {

        $scope.goBack = function() {
            window.history.back();
        }

        $scope.login = function (event) {
            event.preventDefault();
            var loginData = {
                userInfo : {
                    "userName" : $scope.userName,
                    "password"  :$scope.password
                }
            }
            console.log("Login called");
            var successCallback = function (response) {
                $state.go("home")
                console.log("Login success" +response.data);


            }
            var errorCallback = function (err) {
                if(err.data === "Username not found")
                {
                    $scope.existserror = true;
                }
                else {
                    $scope.showerror = true;
                }

                console.log("Login error" +JSON.stringify(err));

            }

            //TODO make a ajax query to send data to the server
            $http.post('/getUserInfo', loginData).then(successCallback, errorCallback);


        }
    })



})();