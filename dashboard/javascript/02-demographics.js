// Demographics - Pie chart

(function(module){
	'use strict';

	var defaultData = [
        { label: "USA", data: 110 },
        { label: "UK", data: 60 },
        { label: "India", data: 50 },
        { label: "Germany", data: 30 },
        { label: "China", data: 24 },
        { label: "Canada", data: 20 }
    ];

	var _showChart = function(){
        $.plot(this.$el, this.data, {
                series: {
                    pie: {
                        show: true
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true
                }
            });
	};

    // event handling
    var _getPercent = function(percent){
    	return parseFloat(percent).toFixed(2);
    };

	var _pieHover = function (event, pos, obj) {
        if (obj && obj.series) {
            var percent = _getPercent(obj.series.percent);
            $("#hover").html('' + obj.series.label + ' (' + percent + '%)');
        }
    };

    var _pieClick = function (event, pos, obj) {
    	var percent;
        if (obj && obj.series) {
            var percent = _getPercent(obj.series.percent);
            alert('' + obj.series.label + ': ' + percent + '%');
        }
    };

	var _setUpListeners = function(){
        // ** chaining pattern
        this.$el.bind("plothover", _pieHover)
                .bind("plotclick", _pieClick)
                .hover(function () { $("#hover").css("visibility", "visible"); },
                        function () { $("#hover").css("visibility", "hidden"); }
        );
	};

	// Public API
	var Pie = function(opts) {
		this.$el = opts.$el;
		this.data = opts.data || defaultData;
	};

	Pie.prototype.start = function(){
		_showChart.call(this);
		_setUpListeners.call(this);
	};

	module.exports = Pie;

})(module);