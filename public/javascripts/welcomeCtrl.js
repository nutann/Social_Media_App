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
            var gname = "";
            data.friends.forEach(function(person) {
                gname = gname + person.firstName + ",";

            })
            var newGroup = {
                firstName: gname,
                groupid: 1,
                messages: [],
                active: true

            }
            $scope.chattingwithusers.push(newGroup);

            newGroup.messages.push({
                name: "serverNotification",
                message: data.message
            });

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
                console.log("fromUser :" + fromUser)
                newGroup.active = true;
                newGroup.messages.push({
                    name: fromUser.firstName,
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
            if (user.addfriendsselected) {
                user.addfriendsselected = false;
                return;
            }
            console.log("To be closed");
            var chattingwith = _.find($scope.chattingwithusers, function(o) {
                return o.socketid === user.socketid;
            });

            chattingwith.active = false;
        };

        $scope.joinchat = function(user) {
            var chattingwith = _.find($scope.chattingwithusers, function(o) {
                return o.socketid === user.socketid;
            });
            user.newMessageCount = 0;
            user.active = true;
            if (chattingwith) {
                //duplicate chat window is already open
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


        $scope.createGroup = function(user) {
            console.log("Entered createGroup ");

            user.addfriendsselected = false;


            $scope.people = $scope.users.filter(function(item) {
                    console.log("item.check :" + item.check);
                    return item.check == true;
                })
                // $scope.people.add(user);
            var id = 0;
            if ($scope.people.length > 0) {
                user.chattingfriends = "";
                var gname = "";
                $scope.people.push(user);
                $scope.people.forEach(function(person) {
                    gname = gname + person.firstName + ",";

                })
                var newGroup = {
                    firstName: gname,
                    groupid: 1,
                    messages: [],
                    active: true

                }
                $scope.chattingwithusers.push(newGroup);
                console.log("$scope.people : " + JSON.stringify($scope.people));
                group.createGroup(id, user.socketid, $scope.currentUser, $scope.people);

            }


        }

    });




})();