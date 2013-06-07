(function() {

	$.getJSON('data.json', function(json) {

		var data = [0, 1, 2, 3, 8, 3, 1, 0, 2, 1, 0];

		var area = d3.select('#container')
			.append('svg')
			.chart('AreaChart')
			// .width(500)
			// .height(300)
			// .padding(10)
			.draw(data);

		var bottomAxis = d3.select('#container')
			.append('svg')
			.chart('XAxisChart')
			// .width(500)
			// .height(300)
			// .padding(10)
			.draw(data);

	});

}());