(function() {

    app = angular.module('SocialMedia');

    app.factory('group', function($rootScope, socket) {

        function createGroup(socketid, owner, people,cb) {
            console.log("crete new gtp ========" +JSON.stringify(people))
            this.owner = owner;
            this.people = people;
            socket.emit("create-group", socketid, function(gid) {
                console.log("group created");
                var data = {
                    groupid: gid,
                    friends: people
                }
                console.log("data to be sent is " + JSON.stringify(data));
                socket.emit("add-users", data);
                cb(gid);
            });

        };


        function addPerson(people,gid) {
             var data = {
                    groupid: gid,
                    friends: people
                }
            socket.emit("add-users", data);

            //this.people.push(friends);

        };

        function removePerson(person) {
            console.log("To implement");
        };


        return {
            createGroup: createGroup,
            addPerson: addPerson,
            removePerson: removePerson
        }
    });



})();