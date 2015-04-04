casper.test.begin("Testing Google", 1, function(test){
	casper.start("http://google.com");

	casper.then(function(){
		test.assertTitle("Google", "Google has correct title");
	});

	casper.run(function(){
		test.done();
	})
})