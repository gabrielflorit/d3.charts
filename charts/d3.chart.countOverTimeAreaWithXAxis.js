d3.chart('CountOverTimeAreaChart').extend('CountOverTimeAreaChartWithXAxis', {

	initialize: function() {

		var chart = this;

		var xAxisLayerBase = this.layer('area').append('g')
			.attr({
				class: 'axis',
				transform: 'translate(0, ' + (chart.height() - chart.padding()) + ')'
			});

		this.layer('area').on('enter', function() {
			var chart = this.chart();
			var xAxis = d3.svg.axis().scale(chart.x()).orient('bottom');
			xAxisLayerBase.call(xAxis);
		});
	}

});

d3.chart('CountOverTimeAreaChartWithXAxis').extend('CountOverTimeAreaChartWithXAxisAndMax', {

	initialize: function() {

		var chart = this;

		var maxLayerBase = this.layer('area').append('g');

		this.layer('max', maxLayerBase, {

			dataBind: function() {
				return this.selectAll('.max').data([this.chart().data]);
			},

			insert: function() {
				var chart = this.chart();
				return this.insert('text');
			},

			events: {
				merge: function() {

					var chart = this.chart();
					var data = chart.data;

					var max = d3.max(_.chain(data).pluck('count').value());
					var maxDatum = _.findWhere(data, {count: max});

					return this.text(function(d) {
						return maxDatum.count;
					})
					.classed('max', true)
					.attr({
						x: function() {
							return chart.x()(maxDatum.date);
						},
						y: function(d, i) {
							return chart.y()(maxDatum.count);
						},
						'text-anchor': 'middle',
						dy: -5
					})
				}
			}

		});

	}

});













