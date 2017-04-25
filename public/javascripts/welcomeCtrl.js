/**
 * Created by Sheetal on 4/20/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('welcomeCtrl', function($state, $scope,socket, $stateParams,_) {
        $scope.users = [];
        $scope.chattingwithusers = [];
        $scope.messages = [];
        $scope.message = "";
        $scope.currentUser = $stateParams.userName;
        var maximumChats = 3;
        socket.on('loggedin-users',function(data){
        	console.log("logged in users " +JSON.stringify(data));
        	$scope.users = data.filter(function(item){
        			return item.email !== $stateParams.userName;
        	});
        })

        $scope.sendMessage = function(event,chattingwith,message) {


        	event.preventDefault();
        	console.log("message to be sent is " +message +"user is " +JSON.stringify(chattingwith));
        	
            var data = {
        		message : message,
        		to : chattingwith.socketid,
                from : $scope.currentUser
        	}

        	//$scope.messages.push(data);

        	chattingwith.messages.push({
                name : "me",
                message : message
            });
        	 $scope.message = "";
        	socket.emit("message-sent",data)
        }

        
        socket.on('message-received', function(data){
        	console.log("message-received"+ JSON.stringify(data));
            console.log("chatwith users :  **"+ JSON.stringify($scope.chattingwithusers));
        	var chattingwith = _.find($scope.chattingwithusers, function(o) { return o.email === data.from; });
        	console.log("chattingwith : " +JSON.stringify(chattingwith));
        	
        	chattingwith.messages.push({
                name : chattingwith.firstName,
                message : data.message
            });
        });
        

        $scope.joinchat = function(user){
        	if(($scope.chattingwithusers.length+1) > maximumChats){
        		$scope.chattingwithusers.shift();
        	}
            user.messages = [];
        	 $scope.chattingwithusers.push(user);
        	 console.log("Users=== " +JSON.stringify($scope.chattingwithusers));

        	      
     
                //document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  

        }

    });

    

})();