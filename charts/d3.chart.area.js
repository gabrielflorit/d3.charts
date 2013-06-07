d3.chart('BaseChart').extend('AreaChart', {

	initialize: function() {

		var chart = this;

		// create the scales
		var x = d3.scale.linear();
		var y = d3.scale.linear();
		this.x = x;
		this.y = y;

		// create the area generator
		this.area = d3.svg.area()
			.x(function(d, i) { return x(i); })
			.y0(this.height())
			.y1(function(d) { return y(d); });

		// reset scale ranges on dimension changes
		chart.on('change:width', function(newWidth) {
			chart.x.range([0, newWidth]);
		});
		chart.on('change:height', function(newHeight) {
			this.area.y0(this.height());
			chart.y.range([newHeight, 0]);
		});

		this.layer('area', this.base.append('g'), {

			dataBind: function(data) {
				var chart = this.chart();

				chart.x.domain([0, data.length]);
				chart.y.domain(d3.extent(data));

				return this.selectAll('area').data([data]);
			},

			insert: function() {
				var chart = this.chart();

				return this.append('path').attr('d', chart.area);
			}

		});
	}

});