describe('SignupCtrl Test suite',function(){


var $controller;
var $rootScope;
var $scope;
var controller;
var $httpBackend;
var $templateCache;
var $state;

beforeEach(function(){
	angular.mock.module('SocialMedia');

	angular.mock.inject(function($injector){
		$controller = $injector.get('$controller');
		$rootScope = $injector.get('$rootScope'); 
		$scope = $rootScope.$new();
		$state = $injector.get('$state');
		$httpBackend = $injector.get('$httpBackend');
		controller = $controller('signupCtrl',{$scope :$scope});
			$templateCache = $injector.get('$templateCache');
			$templateCache.put('home.html', '');


	})

});

it('test to check signupctrl exists',function(){
	expect(controller).toBeDefined();
});

it('Test to check error signup username already exists',function(){
	$scope.firstName = "John";
	$scope.lastName = "Doe";
	$scope.email = "j@gmail.com";
	$scope.cpassword = "1234";

	var data = {
                userInfo : {
                    "firstName" : $scope.firstName,
                    "lastName"  : $scope.lastName,
                    "email"     : $scope.email,
                    "password"  :$scope.cpassword
                }
            };
	$httpBackend
		.when('POST', '/updateUserInfo',data)
		.respond(400,"username already exists");
		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}
   $scope.submit(event);
   $httpBackend.flush();

    expect($scope.existserror).toBe(true);
     expect($scope.showerror).toBe(false);



});

it('Test to check successful signup',function(){
	$scope.firstName = "John";
	$scope.lastName = "Doe";
	$scope.email = "j@gmail.com";
	$scope.cpassword = "1234";

	var data = {
                userInfo : {
                    "firstName" : $scope.firstName,
                    "lastName"  : $scope.lastName,
                    "email"     : $scope.email,
                    "password"  :$scope.cpassword
                }
            };
	$httpBackend
		.when('POST', '/updateUserInfo',data)
		.respond(200,"");
		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}
   $scope.submit(event);
   $httpBackend.flush();

    expect($scope.existserror).toBe(false);
     expect($scope.showerror).toBe(false);
      expect($state.current.name).toBe('home');



});

it('Test to check server error during signup',function(){
	$scope.firstName = "John";
	$scope.lastName = "Doe";
	$scope.email = "j@gmail.com";
	$scope.cpassword = "1234";

	var data = {
                userInfo : {
                    "firstName" : $scope.firstName,
                    "lastName"  : $scope.lastName,
                    "email"     : $scope.email,
                    "password"  :$scope.cpassword
                }
            };
	$httpBackend
		.when('POST', '/updateUserInfo',data)
		.respond(400,"Server error");
		var event = {
			preventDefault : function(){
				console.log("prevent default");
			}
		}
	
   $scope.submit(event);

   $httpBackend.flush();

    expect($scope.existserror).toBe(false);
     expect($scope.showerror).toBe(true);
     //TODO ideally the state should be signup
     expect($state.current.name).toBe('home');

});

});