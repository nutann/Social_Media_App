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
                $scope.addfriendsselected = false;
                $scope.people = [];
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

                    var data = {
                        message: $scope.t.message,
                        to: chattingwith.socketid,
                        from: $scope.currentUser
                    }

                    //$scope.messages.push(data);

                    chattingwith.messages.push({
                        name: "me",
                        message: $scope.t.message
                    });
                    $scope.t.message = "";
                    socket.emit("message-sent", data)
                }


                socket.on('message-received', function(data) {
                    console.log("message-received" + JSON.stringify(data));
                    console.log("chatwith users :  **" + JSON.stringify($scope.chattingwithusers));
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

                });

                $scope.closeChat = function(user) {
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
                    $scope.addfriendsselected = true;
                    $scope.friendslist = $scope.users.filter(function(item) {

                        return item.email !== chattingwith.email;
                    });

                    console.log("$scope.friendslist : " + JSON.stringify($scope.friendslist));
                }


                $scope.createGroup = function() {
                    console.log("Entered createGroup ");
                    $scope.addfriendsselected = false;
                   
                    $scope.people = $scope.users.filter(function(item){
                        console.log("item.check :" +item.check);
                        return item.check == true;
                    })
                    console.log("$scope.people : " + JSON.stringify($scope.people));
                    group.createGroup(id ,socketid, $scope.currentUser);
                    
                }

    

        });




})();