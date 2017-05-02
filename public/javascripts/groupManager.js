
(function() {

  app = angular.module('SocialMedia');

  app.factory('group',function ($rootScope,socket) {

  function createGroup(id, socketid, owner,people) {
    this.id = id;
    this.owner = owner;
    this.people = people;
    socket.emit("create-group",id,function(){
      console.log("group created");
      var data = {
        groupid : id,
        friends : people
      }
      console.log("data to be sent is "+JSON.stringify(data));
      socket.emit("add-users",data);
    });

  };


function addPerson(personID) {
  
    this.people.push(personID);
  
};

function removePerson(person) {
  console.log("To implement") ;
};


    return {
      createGroup : createGroup,
      addPerson : addPerson,
      removePerson:removePerson
    }
  });



})();