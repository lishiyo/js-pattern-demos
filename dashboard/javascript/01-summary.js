// Summary Stats by Month - Plot object

(function(module){
	'use strict';

	var _strategies = ["users", "visits", "sales"]; // defaults

	// mock server call
    var _get = function (subject) {
        switch(subject) {
            case "users": return [{ "label": "Users", "data": [[1, 344], [2, 578], [3, 460], [4, 902], [5, 1933], [6, 2303], [7, 3281], [8, 3590], [9, 6830], [10, 8429]] }];
            case "visits": return [{ "label": "Visits", "data": [[1, 12965], [2, 16935], [3, 19993], [4, 21983], [5, 76801], [6, 67372], [7, 87922], [8, 100399], [9, 140332], [10, 188022]], "color": 2 }];
            case "sales": return [{ "label": "Sales", "data": [[1, 266], [2, 1009], [3, 6754], [4, 6570], [5, 7489], [6, 8888], [7, 10821], [8, 14099], [9, 12222], [10, 23390]], "color": 3 }];
            default: return [];
        }
    };

    var _showPlot = function (data) {
        var options = {
            legend: { position: "nw" },
            lines: { show: true },
            points: { show: true },
            xaxis: { ticks: [[1, "jan"], [2, "feb"], [3, "mar"], [4, "apr"], [5, "may"], [6, "jun"], [7, "jul"], [8, "aug"], [9, "sep"], [10, "oct"], [11, "nov"], [12, "dec"]] },
            grid: { backgroundColor: { colors: ["#fff", "#f5f6f7"] } }
        };

        $.plot($("#plotarea"), data, options);
    };

    // show chart for strategy users, visits, sales
    var _showChart = function(strategy) {
    	var data = data || _get(strategy);
    	_showPlot(data);
    };

    var _setUpListeners = function(){
    	this.$strategies.forEach(function(elem, index){
    		elem.hover(function(){
    			$('[id^="link-"]').removeClass("active");
    			elem.addClass("active");
    			var subject = _strategies[index];
            	_showChart(subject);
    		});
    	}, this);
    };

    // Public Class
	var Plot = function(opts) {
		this.$el = opts.$el;
		this.$strategies = opts.strategies || [];
		if (this.$strategies.length === 0) {
			_strategies.forEach(function(strategy){
				this.$strategies.push($("#link-" + strategy));
			}.bind(this));
		}
	};

	Plot.prototype.start = function(){
		_setUpListeners.call(this);
		_showChart(_strategies[0]);
	};

	module.exports = Plot;

})(module);