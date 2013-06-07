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
			.chart('CountOverTimeAreaChartWithXAxis')
			.width(800);
			// .height(300)
			// .padding(10)
		
		area.draw(data);

		area.width(600);
		area.height(400);

		// var bottomAxis = d3.select('#container')
		// 	.append('svg')
		// 	.chart('CountOverTimeAreaChartWithXAxis')
		// 	.width(500)
		// 	// .height(300)
		// 	// .padding(10)
		// 	.draw(data);

	});

}());