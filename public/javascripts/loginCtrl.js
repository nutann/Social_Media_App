/**
 * Created by Galaxy on 4/14/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('loginCtrl', function($scope, $state, $http, socket, $remember) {
        $scope.showerror = false;
        $scope.remember = false;
        console.log("$scope.remember Start Up :" + $scope.remember);
        if ($remember('username') && $remember('password')) {
            console.log("remembered and restored");
            $scope.remember = true;
            $scope.userName = $remember('username');
            $scope.password = $remember('password');
            //document.getElementById("password").value = $scope.password;
            //document.getElementById("name").value = $scope.userName;
        }

        $scope.goBack = function() {
            window.history.back();
        }

        $scope.rememberMe = function() {
            console.log("rememberMe $scope.remember :" + $scope.remember);
            // $('#chkbox').click(function(event) {
            //     $scope.remember = $(this).is(':checked') ? false : true;
            // });

            if ($scope.remember) {
                console.log("IF");
                $remember('username', $scope.userName);
                $remember('password', $scope.password);
            } else {
                console.log("ELSE");
                $remember('username', '');
                $remember('password', '');
            }
        };

        $scope.login = function(event) {
            event.preventDefault();


            var loginData = {
                userInfo: {
                    "userName": $scope.userName,
                    "password": $scope.password
                }
            }

            console.log("Login called");
            var successCallback = function(response) {
                $scope.showerror = false;
                socket.emit('join', {
                    name: $scope.userName
                });
                $state.go("welcome", {
                    "userName": $scope.userName
                })
                console.log("Login success" + response.data);
            }

            var errorCallback = function(err) {
                if (err.data === "Username not found") {
                    $scope.showerror = true;
                }
                console.log("Login error" + JSON.stringify(err));
            }

            //TODO make a ajax query to send data to the server
            $http.post('/login', loginData).then(successCallback, errorCallback);


        }
    })



})();