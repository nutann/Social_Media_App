/**
 * Created by Sheetal on 4/20/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('welcomeCtrl', function($state, $scope,socket, $stateParams, $sce) {
        $scope.users = [];
        $scope.chattingwith = {};
        $scope.messages = [];
        $scope.message = "";
        socket.on('loggedin-users',function(data){
        	console.log("logged in users " +JSON.stringify(data));
        	$scope.users = data.filter(function(item){
        			return item.email !== $stateParams.userName;
        	});
        })

        $scope.sendMessage = function(event,message) {
        	event.preventDefault();
        	console.log("message to be sent is " +message +"user is " +JSON.stringify($scope.chattingwith));
        	var data = {
        		message : message,
        		user : $scope.chattingwith
        	}

        	$scope.messages.push(data);
        	 $scope.message = "";
        	socket.emit("message-sent",data)
        }

        
        socket.on('message-received', function(data){
        	console.log("message-received"+ JSON.stringify(data));
        	$scope.messages.push(data);
        });
        

        $scope.joinchat = function(user){
        	 $scope.chattingwith = user;


        	      
     
                //document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  

        }

    });

    

})();