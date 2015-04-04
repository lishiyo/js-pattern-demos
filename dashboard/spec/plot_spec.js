// 01-summary

casper.options.viewportSize = {width: 1024, height: 768};
var testCount = 3;

casper.test.begin("Testing Summary Plot", testCount, function summaryPlotTest(test) {
	casper.start("http://localhost:8000/public", function() {
    	
    	test.assertTitleMatch(/Dashboard/, "Title is what we'd expect");
    	test.assertExists("#plotarea", "the #plotarea id exists");

    	var clickLinkTurnsActive = casper.evaluate(function(){
    		var $el = $("a#link-visits");
    		var isNotActive = !($el.hasClass('active'));
    		$el.click();
    		
    		return (isNotActive);
    	});

    	casper.then(function(){
    		this.capture("assets/clicked.png");
    	});

    	test.assert(clickLinkTurnsActive, "clicking a link turns it active");

    }).run(function() {
        test.done();
    });
});
