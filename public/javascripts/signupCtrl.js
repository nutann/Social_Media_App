/**
 * Created by nutan on 4/13/2017.
 */
(function () {

    var app = angular.module('SocialMedia');

    app.controller('signupCtrl',function ($scope,$state,$http) {
        $scope.showerror = false;

        $scope.submit = function (event) {
            event.preventDefault();
            var data = {
                "firstName" : $scope.firstName,
                "lastName"  : $scope.lastName,
                "email"     : $scope.email,
                "password"  :$scope.cpassword
            }
            console.log("submit called");
            var successCallback = function (response) {

                console.log("response success" +response.data);


            }
            var errorCallback = function (err) {
                $scope.showerror = true;

                console.log("response success" +err);

            }

            //TODO make a ajax query to send data to the server
            $http.post('/updateUserInfo', data).then(successCallback, errorCallback);


        }
    })

    app.directive('cpwdValidation', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, mCtrl) {
                function myValidation(value) {
                    if (value === scope.password || value === "") {
                        console.log("passed");
                        mCtrl.$setValidity('matched', true);
                    } else {
                        mCtrl.$setValidity('matched', false);
                    }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        };
    });

})();
