
(function() {

  app = angular.module('SocialMedia');

  app.factory('group',function ($rootScope) {

  function createGroup(id, socketid, owner) {
    this.id = id;
    this.owner = owner;
    this.people = [];
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