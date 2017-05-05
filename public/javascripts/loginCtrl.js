/**
 * Created by Galaxy on 4/14/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('loginCtrl', function($scope, $state, $http, socket, $remember,$cookieStore) {
        $scope.showerror = false;
        $scope.remember = false;
        $scope.userName = $cookieStore.get('username');
        $scope.password = $cookieStore.get('password');

        $scope.goBack = function() {
            window.history.back();
        }

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


                if ($scope.remember) {
                       $cookieStore.put('username', $scope.userName);
                       $cookieStore.put('password', $scope.password);
                    //$remember('username', $scope.userName);
                    //$remember('password', $scope.password);
                } else {
                    $cookieStore.remove('username')
                    $cookieStore.remove('password')
                }
               

                $scope.showerror = false;
                socket.emit('join', {
                    name: $scope.userName
                });
                $state.go("welcome", {
                    "userName": $scope.userName
                })
                 $scope.userName = '';
                $scope.password = '';
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