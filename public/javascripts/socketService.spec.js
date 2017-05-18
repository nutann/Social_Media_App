var SocketMock = require('socket-io-mock')
describe('SocketService test', function() {

	var sockets;
	var scope;
	var socketMock;
	beforeEach(function(){
		angular.mock.module('SocialMedia');
		console.log("creating socket service");

			var f = function(data){

			}
		 socketMock = {
     			 emit: function(value1,valu2,f){
     			 	console.log("emit s called ++++++++++++");

     			 }
      			
    };
		angular.mock.inject(function($rootScope,_socket_){

			sockets = _socket_;
			console.log("creating socket service 2" +sockets.socket);
		});

		 socketMock = sockets.socket();
		 
			 spyOn(socketMock, 'emit');
			 spyOn(socketMock, 'on');
	});
	// socketSpy = jasmine.createSpy("emit");

	it('Testing Socket service exists', function() {
		expect(sockets).toBeDefined();
	
	});


	it('Testing Socket service connected to a socket', function() {
		expect(sockets.socket()).toBeDefined();
	
	});

	it('Testing Socket emit method', function() {
	sockets.emit("sample" , {name : 'testing'},function(){
		isItDone = true;
	});

    expect(socketMock.emit).toHaveBeenCalled();
  });
	it('Testing Socket on  method', function() {
	sockets.on("sample" ,function(){
		isItDone = true;
	});

    expect(socketMock.on).toHaveBeenCalled();
  });
	
});