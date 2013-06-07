(function() {

	$.getJSON('data.json', function(json) {

		var data = _.chain(json)
			.map(function(v, i) {
				return _.chain(v)
			.map(function(v, i) {
				var d = new Date(v);
				return new Date(d.getFullYear(), d.getMonth(), d.getDate());
			})
			.countBy(function(v, i) { return v; })
			.map(function(v, i) { return { date: new Date(i), count: v }; })
				.value();
			})
			.value();

		var max = _.chain(data)
			.flatten()
			.pluck('count')
			.sortBy(function(v, i) {
				return -v;
			})
			.value()[0];

		_.each(data, function(datum) {

			var area = d3.select('#container')
				.append('svg')
				.chart('CountOverTimeAreaChartWithXAxis')
				.max(max)
				.width(800);
			
			area.draw(datum);

		});

	});

}());