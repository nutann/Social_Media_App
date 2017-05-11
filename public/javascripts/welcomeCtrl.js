/**
 * Created by Sheetal on 4/20/2017.
 */
 (function() {

    var app = angular.module('SocialMedia');

    app.controller('welcomeCtrl', function($state, $scope, socket, group, $stateParams, _) {
        $scope.users = [];
        $scope.chattingwithusers = [];
        $scope.messages = [];
        $scope.t = {};
        $scope.t.message = "";
        $scope.currentUser = $stateParams.userName;
        var maximumChats = 3;

        $scope.people = [];
        socket.emit("get-users");
        socket.on('loggedin-users', function(data) {
            console.log("logged in users " + JSON.stringify(data));
            $scope.users = data.filter(function(item) {
                item.newMessageCount = 0;
                return item.email !== $stateParams.userName;
            });
        })

        $scope.sendMessage = function(event, chattingwith) {

            event.preventDefault();
            console.log("message to be sent is " + $scope.t.message + "user is " + JSON.stringify(chattingwith));
            if (chattingwith.groupid) {
                var groupChat = true;
            }
            var data = {
                message: $scope.t.message,
                to: chattingwith.groupid || chattingwith.socketid,
                from: $scope.currentUser,
                ifGroup: groupChat
            }

            //$scope.messages.push(data);

            chattingwith.messages.push({
                name: "me",
                message: $scope.t.message
            });
            $scope.t.message = "";
            socket.emit("message-sent", data)
        };

        socket.on("updategroup", function(data) {

            console.log("updategroup data is " + JSON.stringify(data));
            var gname = updateGroupName(data.friends);
            var group = _.find( $scope.chattingwithusers, function(o) {
                return o.groupid === data.groupid;
            });
            if(group){
                group.active = true;
                group.friends = data.friends;
                group.firstName = gname;
                group.messages.push({
                    name: "serverNotification",
                    message: data.message
                });
            }
            else{
                var newGroup = {
                    firstName: gname,
                    groupid: data.groupid,
                    messages: [],
                    active: true,
                    friends:data.friends
                }
                newGroup.messages.push({
                    name: "serverNotification",
                    message: data.message
                });
                $scope.chattingwithusers.push(newGroup);

            }
            


            


            console.log("$scope.people : " + JSON.stringify($scope.people));

        });



        socket.on('message-received', function(data) {
            console.log("message-received" + JSON.stringify(data));
            console.log("chatwith users :  **" + JSON.stringify($scope.chattingwithusers));
            if (data.ifGroup) {
                var newGroup = _.find($scope.chattingwithusers, function(o) {
                    return o.groupid === data.to;
                });
                var fromUser = _.find($scope.users, function(o) {
                    return o.email === data.from;
                });
                if(data.friends){
                    var gname = updateGroupName(data.friends);
                }
                console.log("fromUser :" + fromUser)
                newGroup.firstName = gname;
                newGroup.active = true;
                newGroup.messages.push({
                    name: (fromUser?fromUser.firstName:"server"),
                    message: data.message
                });
            } else {

                var chattingwith = _.find($scope.chattingwithusers, function(o) {
                    return o.email === data.from;
                });
                console.log("chattingwith : " + JSON.stringify(chattingwith));

                if (chattingwith) {
                    chattingwith.messages.push({
                        name: chattingwith.firstName,
                        message: data.message
                    });
                } else {
                    chattingwith = _.find($scope.users, function(o) {
                        return o.email === data.from;
                    });
                    console.log("not active user " + JSON.stringify(chattingwith));
                    chattingwith.messages = [];
                    chattingwith.messages.push({
                        name: chattingwith.firstName,
                        message: data.message
                    });
                    chattingwith.active = false;
                    $scope.chattingwithusers.push(chattingwith);
                    console.log("not active user message count " + chattingwith.messageCount);

                }
                if (!chattingwith.active) {
                    chattingwith.newMessageCount += 1;
                }
            }

        });

        $scope.closeChat = function(user) {
            console.log("USER"+JSON.stringify(user));
            if(user.groupid){


                console.log("Disconnecting User" + user);
                var index = 0;
                var newGroup = _.find($scope.chattingwithusers, function(o) {
                    console.log("o.groupid === user.groupid :"+ o.groupid +"   " + user.groupid);
                    index++;
                    return o.groupid === user.groupid;
                });
                if(newGroup.friends.length <=0){
                  $scope.chattingwithusers.splice( index-1, 1 );
                  return;
              }
              console.log("newGroup :"+ JSON.stringify(newGroup) +"index === " +index);
              var dcUser = _.find(newGroup.friends, function(item) {
                console.log("item.email === $stateParams.userName :"+ item.email +"  "+ $stateParams.userName)
                return item.email === $stateParams.userName;
            });
              newGroup.friends = newGroup.friends.filter(function(item) {

                return item.email !== $stateParams.userName;
            });
              $scope.chattingwithusers.splice( index-1, 1 );
              console.log("dcUser :" + JSON.stringify(dcUser));

              socket.emit("disconnectServ", {newGroup:newGroup, dcUser:dcUser});
          }
          else{
            if (user.addfriendsselected) {
                user.addfriendsselected = false;
                return;
            }

            console.log("To be closed");
            var chattingwith = _.find($scope.chattingwithusers, function(o) {
                return o.socketid === user.socketid;
            });

            chattingwith.active = false;
        }
    };

    $scope.joinchat = function(user) {
        var chattingwith = _.find($scope.chattingwithusers, function(o) {
            return o.socketid === user.socketid;
        });
        user.newMessageCount = 0;
        user.active = true;
        if (chattingwith) {
                //duplicate chat window is already open
                chattingwith.active = true;
                console.log("duplicate chat window is already open");
                return;
            }
            if (($scope.chattingwithusers.length + 1) > maximumChats) {
                //maximum 3 windows can be open
                $scope.chattingwithusers.shift();
            }
            user.messages = [];
            $scope.chattingwithusers.push(user);

        }

        $scope.showUsers = function(chattingwith) {
            console.log("add friends " + JSON.stringify(chattingwith));
            chattingwith.addfriendsselected = true;
            $scope.friendslist = $scope.users.filter(function(item) {

                return item.email !== chattingwith.email;
            });

            console.log("$scope.friendslist : " + JSON.stringify($scope.friendslist));
        }

        var updateGroupName = function(friends){
            var gname = "";
            friends.forEach(function(person) {
                gname = gname + person.firstName + ",";

            });
            gname = gname.substring(0, gname.length-1);
            return gname;
        }
        $scope.createGroup = function(user) {
            console.log("Entered createGroup " +JSON.stringify(user));

            user.addfriendsselected = false;



            $scope.people = $scope.users.filter(function(item) {
                console.log("item.check :" + item.check);
                return item.check == true;
            });
            

            if(user.groupid){
            //      $scope.people.forEach(function(person) {
            //    user.friends.push(person);

            // })
            var gname = updateGroupName($scope.people);
            user.firstName = user.firstName + "," +gname;
                //user.friends.push($scope.people);
                console.log("group exists add friends" +JSON.stringify(user.friends));
                group.addPerson(user.friends,user.groupid,$scope.people);
                
            }
            else{
                console.log("create new grp");
                // $scope.people.add(user);
                var id = 0;
                if ($scope.people.length > 0) {
                    console.log("create new grp 2");
                    user.chattingfriends = "";
                    $scope.people.push(user);
                    var gname = updateGroupName( $scope.people);
                    console.log("create new grp 3" +gname);
                    var cb = function(gid){
                     var newGroup = {
                        groupid : gid,
                        firstName: gname,
                        messages: [],
                        active: true,
                        friends: $scope.people
                    }
                    console.log("create new grp 5");
                    $scope.chattingwithusers.push(newGroup);
                    console.log("create new grp 4");
                    
                }
                group.createGroup(user.socketid, $scope.currentUser, $scope.people,cb);
            }
            
            

        }


    }

});




})();