// Demographics

(function(module){
	'use strict';

	var RealTime = function(opts) {
		this.$el = opts.$el;
		this.data = opts.data || [];
		this.plot = opts.plot || null;
	};

	// returns coords array plus new x,y
	// test
	var getData = function (data) {
		if (data.length > 0) data = data.slice(1);
        while (data.length < 300) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = Math.round(prev + Math.random() * 5 - 2.5);
            y = Math.max(Math.min(y, 100), 0); // range is 0 - 100;
            data.push(y);
        }
        
		function _getCoords () {
			var coords = [];
	        for (var x = 0; x < data.length; ++x) {
	            coords.push([x, data[x]])
	        }
	        return coords;
	    };

        return _getCoords();
	};

    var renderPlot = function (data) {
        var options = {
            series: { shadowSize: 0 },
            yaxis: { min: 0, max: 100 },
            xaxis: { show: false },
            colors: ["#cc0000"]
        };

        return $.plot(this.$el, [getData(data)], options);
    };

	var initRender = function (callback) {
        this.data = getData([]);
        this.plot = renderPlot.call(this, this.data);
        callback.call(this, this.plot);
    };

    RealTime.prototype.updateRender = function(plot){
    	console.log("updateRender", plot);
        var updateRealtime = function() {
            plot.setData([getData(this.data)]);
            plot.draw();   // call draw because axis did not change
            setTimeout(updateRealtime.bind(this), 30);
        }.bind(this);

        updateRealtime();
    };

	RealTime.prototype.start = function(){
		console.log("RealTime starting");
		initRender.call(this, this.updateRender);
	};

	module.exports = RealTime;

})(module);