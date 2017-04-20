/**
 * Created by Sheetal on 4/20/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('welcomeCtrl', function($state, $scope) {
        $scope.join = function(event){
            event.preventDefault();
            console.log("entered welcome")

            $state.go("main")

    }
    });


})();