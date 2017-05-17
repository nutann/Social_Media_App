(function() {

    app = angular.module('SocialMedia');

    app.factory('group',['$rootScope', 'socket', function($rootScope, socket) {

        function createGroup(socketid, owner, people,cb) {
            this.owner = owner;
            this.people = people;
            socket.emit("create-group", socketid, function(gid) {
                console.log("group created");
                var data = {
                    groupid: gid,
                    friends: people
                };
                console.log("data to be sent is " + JSON.stringify(data));
                socket.emit("add-users", data);
                cb(gid);
            });

        }


        function addPerson(people,gid,newfriends) {
            newfriends.forEach(function(frn){
                var data  = {
                     groupid: gid,
                    friends: people,
                    newfriend : frn
                };
                socket.emit("add-new-user", data);

            });
            

            //this.people.push(friends);

        }

        function removePerson(person) {
            console.log("To implement");
        }


        return {
            createGroup: createGroup,
            addPerson: addPerson,
            removePerson: removePerson
        };
    }]);



})();