import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';

export const updateChart = (chart, die) => {
	const ctx = ham.qs('canvas').getContext('2d');

	chart.data.datasets[0].data = die.map(side => +side.timesRolled)
	chart.update();
};

export const createChart = (chartType = 'bar', die) => {
	const ctx = ham.qs('canvas').getContext('2d');

	const chart = new Chart(ctx, {
		type: chartType,
		data: {
			labels: die.map(side => side.value),
			datasets: [{
				label: 'Totals',
				//TODO replace w dynamic data
				data: die.map(side => +side.timesRolled),
				backgroundColor: ['#473876 ', '#AC4F46', '#358246', '#AC9A46', '#287670', '#A5754A'],
				borderColor: ['#ffffffe0 ', '#ffffffe0', '#ffffffe0', '#ffffffe0', '#ffffffe0', '#ffffffe0'],
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				display: false,
				position: 'bottom',
				labels: {
					boxWidth: 0,
					boxHeight: 0,
					color: '#ffffff00'
				}
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Die Side Value',
						fontColor: '#ffffff',
						fontSize: 12
					},
					ticks: {
						fontColor: '#ffffff',
						fontSize: 12
					},
					gridLines: {
						color: '#ffffff00'
					},
				}],
				yAxes: [{
					gridLines: {
						color: '#B9C7B090'
					},
					ticks: {
						fontColor: '#ffffff',
						stepSize: 1,
						beginAtZero: true,
						fontSize: 14
					}
				}]
			},
		}
	});
	return chart
}

{ createChart, updateChart }