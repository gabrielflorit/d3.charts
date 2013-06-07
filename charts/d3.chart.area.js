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
			.y1(function(d) { return y(d); });

		function setPadding(element, padding) {
			element.attr({
				transform: 'translate(' + padding/2 + ', ' + padding/2 + ')'
			});
		}
		var areaLayerBase = this.base.append('g');
		setPadding(areaLayerBase, this.padding());

		function setHeight(chart) {
			chart.area.y0(chart.height() - chart.padding());
			chart.y.range([chart.height() - chart.padding(), 0]);
		}
		setHeight(this);

		// reset scale ranges on dimension changes
		chart.on('change:width', function() {
			chart.x.range([0, this.width() - this.padding()]);
		});
		chart.on('change:height', function() {
			setHeight(chart);
		});
		chart.on('change:padding', function() {
			chart.trigger('change:width');
			chart.trigger('change:height');
			setPadding(this.layer('area'), this.padding());
		});

		this.layer("area", areaLayerBase, {

			dataBind: function(data) {
				var chart = this.chart();

				chart.x.domain([0, data.length - 1]);
				chart.y.domain(d3.extent(data));

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
			this.trigger("change:padding");

			// redraw if we saved the data on the chart
			if (this.data) {
				this.draw(this.data);
			}
		}

		// always return the chart, for chaining magic.
		return this;
	}

});