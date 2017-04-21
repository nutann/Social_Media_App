/**
 * Created by Sheetal on 4/20/2017.
 */

(function() {

    var app = angular.module('SocialMedia');

    app.controller('welcomeCtrl', function($state, $scope,socket, $stateParams, $sce) {
        $scope.users = [];
        $scope.chattingwith;
        socket.on('loggedin-users',function(data){
        	console.log("logged in users " +JSON.stringify(data));
        	$scope.users = data.filter(function(item){
        			return item.email !== $stateParams.userName;
        	});
        })

        $scope.sendMessage = function(event,message) {
        	event.preventDefault();
        	console.log("message to be sent is " +message +"user is " +JSON.stringify($scope.chattingwith));
        	socket.emit("message sent",{
        		message : message,
        		user : $scope.chattingwith
        	})
        }

        $scope.joinchat = function(user){
        	 $scope.chattingwith = user;


        	       var element = '<div class="popup-box" id="'+ user.email +'">';
                element = element + '<div class="popup-head">';
                element = element + '<div class="popup-head-left">'+ user.firstName +'</div>';
                element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\''+ user.email +'\');">&#10005;</a></div>';
                element = element + '<div style="clear: both"></div></div><div class="popup-messages"></div>';
               // element = element + '<div style="clear: both"></div></div><div class="popup-messages"></div>';
                    
      			element = element + ' <form ng-submit="sendMessage($event,message)"> <input class="input-sm form-control" ng-model="message" type="text" placeholder="Type a message...">'
                   + '<input class="btn btn-default"  type="submit" value="Send"> </form>  </div>'
          		
          
       
      
    

                console.log("element is " +element)
                 $scope.chathtml = $sce.trustAsHtml(element);
     
                //document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  

        }

    });

    app.directive('compileTemplate', function($compile, $parse){
    return {
        link: function(scope, element, attr){
            var parsed = $parse(attr.ngBindHtml);
            function getStringValue() { return (parsed(scope) || '').toString(); }

            //Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }         
    }
});

})();