var Patterns = {
	namespace: function(name) {
		var modules = name.split('.');
		var ns = this; // Utils.Sword
		for (var i = 0; i < modules.length; i++){
			ns[modules[i]] = (ns[modules[i]] || {});
			ns = ns[modules[i]];
		}
		return ns;
	}
};

// API is an submodule that returns { Dashboard }
// Dashboard is an object that holds the three sub-objects

Patterns.namespace("Widget").Dashboard = (function(window){

	var Charts = {};

	// Summary Stats by Month
	Charts.Plot = require('./01-summary.js');

	// Visitor Demographics
	Charts.Pie = require('./02-demographics.js');

	// Real-time page renderings - server side
	Charts.RealTime = require('./03-realtime.js');


	var init = function(opts){
		this.$el = $(opts.id);
		var plot = new Charts.Plot({ $el: $(opts.plot) });
		var pie = new Charts.Pie({ $el: $(opts.pie) });
		var realtime = new Charts.RealTime({ $el: $(opts.realtime) });
		this.charts = [plot, pie, realtime];
	};
	
	// Public API
	var start = function(){
		this.charts.forEach(function(chart){
			chart.start();
		});
	};

	return {
		init: init,
		start: start,
		Charts: Charts
	}

})(this);

$(function(){
	var dash = Patterns.Widget.Dashboard;
	dash.init({
		id: "#dashboard",
		plot: "#plotarea",
		pie: "#piearea",
		realtime: "#realtime",
	})
	dash.start();
});
	

// $(function(){
// 	var dash = new Widget.Dashboard({ 
// 		id: "#dashboard" 
// 	});
// 	dash.run();
// });