describe('Testing WelcomeCtrl', function(){


	var $scope = {};
	var controller;
	var $controller;
	var $rootScope;
	var stateParams;
	var _;
	var group;

	beforeEach(function(){
		angular.mock.module('SocialMedia');






	});

	beforeEach(angular.mock.module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));

	beforeEach(function(){

		angular.mock.inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			socketMock = new sockMock($rootScope);
			stateParams = {
				userName : "example.gmail.com"
			}

			$controller = $injector.get('$controller');
			var loadash = {

				find : function(arr,cb){
					console.log("return user 1 ***");
					return null;

				}
			}

			group = {
				createGroup : function(id, user, people,cb){
					cb(1);
				},
				addPerson(friends,groupid,people){

				}
			}

		//_.find(arr,1);
		controller = $controller ('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash,group :group});

	//spyOn(socketMock, 'emit');


})
	});

	it('Test to check if controller exists', function(){
		expect(controller).toBeDefined();
	});

	it('Test for logged in users',function(){


		var data =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG"},{"email":"first@gmail.com","firstName":"first","lastName":"last","password":"123","socketid":"yxmfCGo7Nwq3DkK0AAAH"},{"email":"sheetal@gmail.com","firstName":"sheetal","lastName":"k","password":"123","socketid":"Jr5xcw0R3zC8TzdKAAAJ"}];
		socketMock.emit('loggedin-users',data, 'text/javascript');
		expect($scope.users.length).toEqual((data.length-1));

		data = data.filter(function(item) {
			return item.email !== stateParams.userName;
		});
		console.log("users  ** "+$scope.users)
		expect($scope.users).toEqual(data);


	});

	it('Test for logged in users with empty array',function(){
		var data =  [];
		socketMock.emit('loggedin-users',data, 'text/javascript');
		expect($scope.users.length).toEqual(0);

		data = data.filter(function(item) {
			return item.email !== stateParams.userName;
		});
		expect($scope.users).toEqual(data);

	});

	it('Test for logged in users with undefined array',function(){
		var data = [];
		socketMock.emit('loggedin-users','text/javascript');
		expect($scope.users.length).toEqual(0);
		expect($scope.users).toEqual(data);

	});

	it('Test for joinChat()',function(){
		var data =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG"},{"email":"first@gmail.com","firstName":"first","lastName":"last","password":"123","socketid":"yxmfCGo7Nwq3DkK0AAAH"},{"email":"sheetal@gmail.com","firstName":"sheetal","lastName":"k","password":"123","socketid":"Jr5xcw0R3zC8TzdKAAAJ"}];
		socketMock.emit('loggedin-users',data, 'text/javascript');
		var user = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		$scope.chattingwithusers = [];


		$scope.joinchat(user);
		expect($scope.chattingwithusers.length).toEqual(1);
		expect($scope.chattingwithusers).toContain(user);

	});

	it('Test for joinChat() chattingwithusers to be maximum',function(){
		var data =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG"}];
		socketMock.emit('loggedin-users',data, 'text/javascript');
		var user = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		$scope.chattingwithusers = [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG"}];


		$scope.joinchat(user);
		expect($scope.chattingwithusers.length).toBeLessThan(4);
		expect($scope.chattingwithusers).toContain(user);

	});

	it('Test for joinChat() chattingwithusers user already exist',function(){

		var loadash = {

			find : function(arr,cb){
				var user = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
				return user;

			}
		}

		//_.find(arr,1);
		controller = $controller ('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash});
		var data =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG"}];
		socketMock.emit('loggedin-users',data, 'text/javascript');
		var user = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		user.active = false;
		$scope.chattingwithusers = [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG"}];


		$scope.joinchat(user);
		expect(user.active).toBe(true);
		expect($scope.chattingwithusers.length).toBeLessThan(4);


	});

	it('Test to check sendMessage()',function(){

		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}
		
		var user = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		user.messages = [];
		$scope.t.message = "hello";
		var data = {
			message: $scope.t.message,
			to:  user.socketid,
			from: $scope.currentUser,
			ifGroup: false
		};
		spyOn(socketMock, 'emit');
		$scope.sendMessage(event,user);

		expect(socketMock.emit).toHaveBeenCalledWith("message-sent",data);
	});

	it('Test to check recieve-message',function(){
		var chattingwith = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA",'messages' : []};;
		$scope = $rootScope.$new();
		socketMock = new sockMock($rootScope);
		var loadash1 = {

			find : function(arr,cb){
				
				console.log("return user ***"+user);
				return chattingwith;

			}
		}
		var scope = {};
		controller = $controller('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash1});
		var user = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		user.messages = [];
		$scope.t.message = "hello";
		var data = {
			message: $scope.t.message,
			to:  user.socketid,
			from: $scope.currentUser,
			ifGroup: false
		};

		socketMock.emit('message-received',data, 'text/javascript');
		var expectedMessage = [{'name' : "Nutan", 'message' : $scope.t.message }];
		expect(chattingwith.messages).toEqual(expectedMessage);
	});

	it('Test case for message-recieved group',function(){

		var chattingwith = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","groupid":"1",'messages' : []};;
		$scope = $rootScope.$new();
		socketMock = new sockMock($rootScope);
		var loadash1 = {

			find : function(arr,cb){
				
				console.log("return user ***"+user);
				return chattingwith;

			}
		}
		var scope = {};
		controller = $controller('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash1});
		var user = {"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		user.messages = [];
		$scope.t.message = "hello";
		var data = {
			message: $scope.t.message,
			to:  1,
			from: $scope.currentUser,
			ifGroup: true,
			friends : [{"email":"ab@gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG"}]
		};

		socketMock.emit('message-received',data, 'text/javascript');
		var expectedMessage = [{'name' : chattingwith.firstName, 'message' : $scope.t.message }];
		expect(chattingwith.messages).toEqual(expectedMessage);

	});

	it('Test case for createGroup() ',function(){

		var data =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA",'check':true},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG",'check':true}];
		socketMock.emit('loggedin-users',data, 'text/javascript');
		var user = {"email":"hbd.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		$scope.chattingwithusers = [];
		$scope.createGroup(user);
		var newGroup = {
			groupid : 1,
			firstName: '4567,Nutan',
			messages: [],
			active: true,
			friends: $scope.people
		};
		expect($scope.chattingwithusers).toContain(newGroup);
	});

	it('Test case to add friends to existing group',function(){
		var data =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA",'check':true},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG",'check':true}];
		socketMock.emit('loggedin-users',data, 'text/javascript');
		var user = {'groupid' : 1,"email":"hbd.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		$scope.chattingwithusers = [];
		spyOn(group, 'addPerson');
		$scope.createGroup(user);
		expect(group.addPerson).toHaveBeenCalled();
	});

	it('Test case for new grp updateGroup()',function(){

		var friendst =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA",'check':true},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG",'check':true}];

		var msg = "You are invited to a group chat"
		updateData = {
			groupid : 1,
			from:"socket.name",
			message:msg,
			friends:friendst
		}
		var newGroup = {
			firstName: 'Nutan,4567',
			groupid: updateData.groupid,
			messages: [],
			active: true,
			friends:updateData.friends
		};
		newGroup.messages.push({
			name: "serverNotification",
			message: updateData.message
		});
		socketMock.emit('updategroup', updateData);
		expect($scope.chattingwithusers).toContain(newGroup);
	});

	it('Test case to test Updategroup() existing grp',function(){

		$scope = $rootScope.$new();
		socketMock = new sockMock($rootScope);
		var existinggrp = {'groupid' : 1,"email":"hbd.gmail.com","firstName":"Nutan,4567",'messages':[]};
		var loadash1 = {

			find : function(arr,cb){

				return existinggrp;

			}
		}
		controller = $controller('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash1});

		var friendst =  [{"email":"example.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA",'check':true},{"email":"4567@gmail.com","firstName":"4567","lastName":"4567","password":"4567","socketid":"Gtg5CrbNpygJP2VSAAAG",'check':true}];

		var msg = "Hello"
		updateData = {
			groupid : 1,
			from:"socket.name",
			message:msg,
			friends:friendst
		}
		var newGroup = {
			firstName: 'Nutan,4567',
			groupid: updateData.groupid,
			messages: [],
			active: true,
			friends:updateData.friends
		};
		newGroup.messages.push({
			name: "serverNotification",
			message: updateData.message
		});
		socketMock.emit('updategroup', updateData);
		expect(existinggrp.messages).toEqual([{"name": 'serverNotification','message' :'Hello'}]);

	});

	it('Test case for closeChat()',function(){

		$scope = $rootScope.$new();
		socketMock = new sockMock($rootScope);
		var user = {'active' : true,"email":"hbd.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		var loadash1 = {

			find : function(arr,cb){

				return user;

			}
		}
		controller = $controller('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash1});
		
		//$scope.createGroup(user);
		$scope.closeChat(user);
		expect(user.active).toBe(false);
	});

	it('Test case for closeChat() when select friend dialogue is open',function(){

		$scope = $rootScope.$new();
		socketMock = new sockMock($rootScope);
		var user = {"addfriendsselected" : true,'active' : true,"email":"hbd.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		var loadash1 = {

			find : function(arr,cb){

				return user;

			}
		}
		controller = $controller('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash1});
		
		//$scope.createGroup(user);
		$scope.closeChat(user);
		expect(user.active).toBe(true);
		expect(user.addfriendsselected).toBe(false);
	});

	it('Test case for closing group chat ',function(){
		$scope = $rootScope.$new();
		socketMock = new sockMock($rootScope);
		var group = {'groupid' : 1,'addfriendsselected' : true,'active' : true,"email":"hbd.gmail.com","firstName":"Nutan","lastName":"Naik","password":"1234","socketid":"JGfuibrcRyt9LIyCAAAA"};
		group.friends = [];
		
		var loadash1 = {

			find : function(arr,cb){

				return group;

			}
		}
		controller = $controller('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash1});
		$scope.chattingwithusers = [group];
		//$scope.createGroup(user);
		expect($scope.chattingwithusers.length).toEqual(1);
		$scope.closeChat(group);
		expect($scope.chattingwithusers.length).toEqual(0);
	})

});

/*Simple mock for socket.io
 +see: https://github.com/btford/angular-socket-io-seed/issues/4
 +thanks to https://github.com/southdesign for the idea
 +*/
 var sockMock = function($rootScope){
 	this.events = {};

   // Receive Events
   this.on = function(eventName, callback){
   	console.log("recieve events" +eventName);
   	if(!this.events[eventName]) this.events[eventName] = [];
   	this.events[eventName].push(callback);
   	console.log("recieve events 2  " +JSON.stringify(this.events));
   }

   // Send Events
   this.emit = function(eventName){
   	console.log("emit called"+eventName +"this.events " +JSON.stringify(this.events));
   	var args = Array.prototype.slice.call(arguments, 1);
   	if(this.events[eventName]){
   		angular.forEach(this.events[eventName], function(callback){
   			$rootScope.$apply(function() {
   				console.log("apply emit ")
   				callback.apply(this, args);
   			});
   		});
   	};
   };


};

