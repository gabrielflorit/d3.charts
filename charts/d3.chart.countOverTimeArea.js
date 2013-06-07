d3.chart('BaseChart').extend('CountOverTimeAreaChart', {

	initialize: function() {

		var chart = this;

		// create the scales
		var x = d3.time.scale();
		var y = d3.scale.linear();
		this.x = x;
		this.y = y;

		// create the area generator
		this.area = d3.svg.area()
			.x(function(d, i) { return x(d.date); })
			.y1(function(d) { return y(d.count); });

		// set padding - gets called now, and on padding change
		function setPadding(element, padding) {
			element.attr({
				transform: 'translate(' + padding/2 + ', ' + padding/2 + ')'
			});
		}

		var areaLayerBase = this.base.append('g');
		setPadding(areaLayerBase, this.padding());

		this.xAxisLayerBase = this.base.append('g');

		// set height - gets called now, and on height change
		function setHeight(chart) {
			chart.area.y0(chart.height() - chart.padding());
			chart.y.range([chart.height() - chart.padding(), 0]);
		}
		setHeight(this);

		// set width - gets called now, and on width change
		function setWidth(chart) {
			chart.x.range([0, chart.width() - chart.padding()]);
		}
		setWidth(this);

		// reset scale ranges on dimension changes
		this.on('change:width', function() { setWidth(chart); });
		this.on('change:height', function() { setHeight(chart); });
		this.on('change:padding', function() {
			setWidth(chart);
			setHeight(chart);
			setPadding(this.layer('area'), this.padding());
		});

		this.layer('area', areaLayerBase, {

			dataBind: function(data) {
				var chart = this.chart();

				chart.x.domain(d3.extent(data, function(d) { return d.date; }))
				chart.y.domain(d3.extent(data, function(d) { return d.count; }))

				var xAxis = d3.svg.axis().scale(chart.x).orient('bottom');
				chart.xAxisLayerBase.attr({
					class: 'axis',
					transform: 'translate(0, ' + (chart.height() - chart.padding()/2) + ')'
				})
				.call(xAxis);

				return this.selectAll('area').data([data]);
			},

			insert: function() {
				var chart = this.chart();

				return this.append('path').attr('d', chart.area);
			}

		});

	},

	padding: function(newPadding) {
		if (arguments.length === 0) {
			return this._padding || 50;
		}

		var oldPadding = this._padding;

		this._padding = newPadding;

		// only if the padding actually changed:
		if (this._padding !== oldPadding) {

			// trigger a change event
			this.trigger('change:padding');

			// redraw if we saved the data on the chart
			if (this.data) {
				this.draw(this.data);
			}
		}

		// always return the chart, for chaining magic.
		return this;
	}

});