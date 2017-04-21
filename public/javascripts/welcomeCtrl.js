/**
 * Created by Sheetal on 4/20/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('welcomeCtrl', function($state, $scope,socket, $stateParams) {
        $scope.users = [];
        socket.on('loggedin-users',function(data){
        	console.log("logged in users " +JSON.stringify(data));
        	$scope.users = data.filter(function(item){
        			return item.email !== $stateParams.userName;
        	});
        })

    });


})();