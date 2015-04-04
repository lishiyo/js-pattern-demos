// Demographics

(function(module){
	'use strict';

	var RealTime = function(opts) {
		this.$el = opts.$el;
	};

	RealTime.prototype.start = function(){
		console.log("RealTime starting")
	}

	module.exports = RealTime;

})(module);