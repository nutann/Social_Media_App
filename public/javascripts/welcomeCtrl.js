/**
 * Created by Sheetal on 4/20/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('welcomeCtrl', function($state, $scope,socket, $stateParams,_) {
        $scope.users = [];
        $scope.chattingwithusers = [];
        $scope.messages = [];
        $scope.t = {};
        $scope.t.message = "";
        $scope.currentUser = $stateParams.userName;
        var maximumChats = 3;
        socket.on('loggedin-users',function(data){
        	console.log("logged in users " +JSON.stringify(data));
        	$scope.users = data.filter(function(item){
        			return item.email !== $stateParams.userName;
        	});
        })

        $scope.sendMessage = function(event,chattingwith) {


        	event.preventDefault();
        	console.log("message to be sent is " +$scope.t.message +"user is " +JSON.stringify(chattingwith));
        	
            var data = {
        		message : $scope.t.message,
        		to : chattingwith.socketid,
                from : $scope.currentUser
        	}

        	//$scope.messages.push(data);

        	chattingwith.messages.push({
                name : "me",
                message : $scope.t.message
            });
        	 $scope.t.message = "";
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

        $scope.closeChat = function(user){
                console.log("To be closed");
                for(var i = 0; i < $scope.chattingwithusers.length; i++)
                {
                    if(user.email == $scope.chattingwithusers[i].email)
                    {
                        Array.remove($scope.chattingwithusers, i);                     
                        return;
                    }
                }        
        };

         Array.remove = function(array, from, to) {
                var rest = array.slice((to || from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            };

        $scope.joinchat = function(user){
            var chattingwith = _.find($scope.chattingwithusers, function(o) { return o.socketid === user.socketid; });
            if(chattingwith){
                //duplicate chat window is already open
                console.log("duplicate chat window is already open");
                return;
            }
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