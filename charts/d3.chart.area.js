d3.chart('BaseChart').extend('AreaChart', {

	initialize: function() {

		var chart = this;

		// create the scales
		var x = d3.scale.linear().range([0, this.width()]);
		var y = d3.scale.linear().range([this.height(), 0]);
		this.x = x;
		this.y = y;

		// create the line generator
		var line = d3.svg.line()
			.x(function(d, i) { return x(i); })
			.y(function(d) { return y(d); });
		this.line = line;

		// reset scale ranges on dimension changes
		chart.on('change:width', function(newWidth) { chart.x.range([0, newWidth]); });
		chart.on('change:height', function(newHeight) { chart.y.range([newHeight, 0]); });

		this.layer('line', this.base.append('g'), {

			dataBind: function(data) {
				var chart = this.chart();

				chart.x.domain([0, data.length]);
				chart.y.domain(d3.extent(data));

				return this.selectAll('line').data([data]);
			},

			insert: function() {
				var chart = this.chart();

				return this.append('path').attr('d', chart.line);
			}

		});
	}

});

var data = d3.range(1000).map(d3.random.irwinHall(10));
var rects = d3.select('#container')
	.append('svg')
	.chart('AreaChart')
	.width($(window).width())
	.height($(window).height());

rects.draw(data);








