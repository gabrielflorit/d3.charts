(function() {

	$.getJSON('data.json', function(json) {

		var data = _.chain(json)
			.map(function(v, i) {
				var d = new Date(v);
				return new Date(d.getFullYear(), d.getMonth(), d.getDate());
			})
			.countBy(function(v, i) { return v; })
			.map(function(v, i) { return { date: new Date(i), count: v }; })
			.value();

		// var data = [0, 1, 2, 3, 8, 3, 1, 0, 2, 1, 0];

		var area = d3.select('#container')
			.append('svg')
			.chart('CountOverTimeAreaChart')
			.width(500)
			// .height(300)
			// .padding(10)
			.draw(data);

		// var bottomAxis = d3.select('#container')
		// 	.append('svg')
		// 	.chart('XAxisChart')
		// 	// .width(500)
		// 	// .height(300)
		// 	// .padding(10)
		// 	.draw(data);

	});

}());