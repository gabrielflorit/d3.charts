d3.chart('CountOverTimeAreaChart').extend('CountOverTimeAreaChartWithXAxis', {

	initialize: function() {

		var xAxisLayerBase = this.base.append('g');

		this.layer('area').on('enter', function() {
			var chart = this.chart();
			var xAxis = d3.svg.axis().scale(chart.x()).orient('bottom');
			xAxisLayerBase.attr({
				class: 'axis',
				transform: 'translate(' + chart.padding()/2 + ', ' + (chart.height() - chart.padding()/2) + ')'
			})
			.call(xAxis);
		});
	}

});