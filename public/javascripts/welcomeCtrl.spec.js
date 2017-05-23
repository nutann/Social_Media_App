describe('Testing WelcomeCtrl', function(){


	var $scope = {};
	var controller;
	var $controller;
	var $rootScope;
	var stateParams;
	var _;

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

		//_.find(arr,1);
		controller = $controller ('welcomeCtrl',{$scope : $scope,socket :socketMock,$stateParams :stateParams,_ : loadash});

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

});

/*Simple mock for socket.io
 +see: https://github.com/btford/angular-socket-io-seed/issues/4
 +thanks to https://github.com/southdesign for the idea
 +*/
 var sockMock = function($rootScope){
 	this.events = {};

   // Receive Events
   this.on = function(eventName, callback){
   	if(!this.events[eventName]) this.events[eventName] = [];
   	this.events[eventName].push(callback);
   }

   // Send Events
   this.emit = function(eventName){
   	var args = Array.prototype.slice.call(arguments, 1);
   	if(this.events[eventName]){
   		angular.forEach(this.events[eventName], function(callback){
   			$rootScope.$apply(function() {
   				callback.apply(this, args);
   			});
   		});
   	};
   };


};

