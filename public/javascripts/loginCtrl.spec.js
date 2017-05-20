describe('loginCtrl', function() {

	var $controller;
	var $scope = {};
	var controller;
	var $state;
	var $rootscope;
	var $templateCache;
	var socket;

	var username1;
	var password1;

	//mock cookie store
	var cookieStoreMock = {
		put: function(key,value) {
			if(key == 'username'){
				username1 = value;
			}
			else {
				password1 = value;
			}

		},
		get : function(s){
			if(s == 'username'){
				return username1;
			}
			else {
				return password1;
			}

		},
		remove : function(){
			username1 = "";
			password1 = "";
		}

	}

	//mock socket
	socket = {
		emit : function(){
		},
		on : function(){

		}
	};

	beforeEach(function(){
		//angular.mock.module('ngRoute');
		angular.mock.module('SocialMedia');
		angular.mock.module(function($provide) {
			$provide.value('$cookieStore', cookieStoreMock);
			$provide.value('socket', socket);
		});

	});

	beforeEach(angular.mock.module(function($urlRouterProvider) {
     $urlRouterProvider.deferIntercept();
 }));
	beforeEach(function(){
		angular.mock.inject(function($injector){
			$controller = $injector.get('$controller');
			$httpBackend = $injector.get('$httpBackend');
			$rootScope = $injector.get('$rootScope');
			$state = $injector.get('$state');
			$scope = $rootScope.$new();
			controller = $controller('loginCtrl', { $scope: $scope,$state : $state});
			$templateCache = $injector.get('$templateCache');
			$templateCache.put('home.html', '');		
			$templateCache.put('welcome.html', '');	
			$state.current.name = 'login';
			spyOn(socket, 'emit');		  
		});

	});
	
	

	it('login controller exists', function() {

		expect(controller).toBeDefined();
	});

	it('Test login function with incorrect username and password', function() {

		var err = "Username not found";
		var loginData = {
			userInfo: {
				"userName": "example@gmail.com",
				"password": "1234"
			}
		};
		var header =  {"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}
		$httpBackend
		.when('POST', '/login',loginData)
		.respond(400,"Username not found");

		$scope.userName = "example@gmail.com";
		$scope.password = "1234";
		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}


		$scope.login(event);
		$httpBackend.flush();

		expect($state.current.name).toBe('login');
		expect($scope.showerror).toBe(true);
	});



	it('Test login function with correct username and password', function() {

		var loginData = {
			userInfo: {
				"userName": "example@gmail.com",
				"password": "1234"
			}
		};
		var header =  {"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}
		$httpBackend
		.expect('POST', '/login',
			loginData, header)
		.respond(200);
		controller = $controller('loginCtrl', { $scope: $scope});
		$scope.userName = "example@gmail.com";
		$scope.password = "1234";
		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}
		$scope.login(event);
		$httpBackend.flush();
		expect($scope.showerror).toBe(false);

		expect($state.current.name).toBe('welcome');


	});

	it('Test login function to store username and password in  cookie store', function() {


		var loginData = {
			userInfo: {
				"userName": "example@gmail.com",
				"password": "1234"
			}
		};
		var header =  {"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}
		$httpBackend
		.expect('POST', '/login',
			loginData, header)
		.respond(200);
		controller = $controller('loginCtrl', { $scope: $scope});
		$scope.remember = true;
		$scope.userName = "example@gmail.com";
		$scope.password = "1234";
		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}

		$scope.login(event);
		$httpBackend.flush();
		expect(socket.emit).toHaveBeenCalledWith('join',{
			name : username1
		});
		expect($scope.showerror).toBe(false);

		expect($state.current.name).toBe('welcome');
		expect(cookieStoreMock.get('username')).toBe('example@gmail.com');
		expect(cookieStoreMock.get('password')).toBe('1234');



	});
	it('Test login function to not store username and password in  cookie store', function() {

		controller = $controller('loginCtrl', { $scope: $scope});
		$scope.remember = false;
		$scope.userName = "example@gmail.com";
		$scope.password = "1234";

		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}
		var loginData = {
			userInfo: {
				"userName": "example@gmail.com",
				"password": "1234"
			}
		};
		var header =  {"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}
		$httpBackend
		.expect('POST', '/login',
			loginData, header)
		.respond(200);
     	 //$httpBackend.flush();



     	 $scope.login(event);
     	 $httpBackend.flush();

     	 expect($scope.showerror).toBe(false);

     	 expect($state.current.name).toBe('welcome');
     	 expect(cookieStoreMock.get('username')).toBe('');
     	 expect(cookieStoreMock.get('password')).toBe('');
     	 
     	});
	
});