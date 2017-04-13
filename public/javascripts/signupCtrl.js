/**
 * Created by nutan on 4/13/2017.
 */
(function () {

    var app = angular.module('SocialMedia');

    app.controller('signupCtrl',function ($scope,$state) {

        $scope.submit = function () {

            console.log("submit called");
            //TODO make a ajax query to send data to the server
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
