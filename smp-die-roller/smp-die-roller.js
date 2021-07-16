import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js'

let charData;
let selectedOption;
let selectedChar;
const charSelect = ham.qs('#character-select')

const createSelectOptions = chars => {
	const optionElements = chars
		.map((char, i) => {
			const opt = ham.createNewElement('option', `${char.id}-option`, ['character-option'], {
				id: char.id
			});
			opt.value = char.name;
			opt.textContent = char.name;
			return opt
		});

	optionElements.forEach(opt => charSelect.appendChild(opt))
}

const generateDieSideElement = (side, index) => {
	const sideEl =
		ham.createNewElement(
			'div',
			`die-${index}`,
			['die-side'], {
				dieSideValue: side
			}
		);
	sideEl.textContent = side;
	return sideEl
}

const updateCharDisplay = char => {
	const displayEl = ham.qs('.character-selection-display');
	const nameEl = ham.qs('.character-name');
	const imgEl = ham.qs('.character-image');
	const dieContainter = ham.qs('.character-die-container');
	const dieSideElements = char.die.map((side, i) => generateDieSideElement(side, i));

	imgEl.src = char.imgsrc;
	nameEl.textContent = char.name;

	// empty container and create new die sides
	while (dieContainter.firstChild) dieContainter.removeChild(dieContainter.firstChild);
	dieSideElements.forEach(el => dieContainter.appendChild(el))
}

const rollDie = dieSides => {
	const getRandomNumber = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	let dieSideIndex = getRandomNumber(0, 5);
	return dieSides[dieSideIndex]
}

fetch('../data/character-data.json')
	.then(response => response.json())
	.then(data => {
		charData = data;
		createSelectOptions(charData)
	});

charSelect.addEventListener('change', e => {
	selectedOption = e.target.selectedOptions[0]
	selectedChar = charData.find(_ => _.id === +selectedOption.dataset.id)
	const evt = new CustomEvent('charSelectionChange', {
		bubbles: true,
		detail: {
			char: selectedChar
		}
	})
	e.target.dispatchEvent(evt);
});

ham.qs('.app').addEventListener('charSelectionChange', e => {
	updateCharDisplay(e.detail.char)
})

ham.qs('.roll-submit-button').addEventListener('click', e => {
	const roll = rollDie(selectedChar.die)
	chart('bar', selectedChar.die)
	ham.qs('.roll-result').textContent = roll
})

const chart = (chartType = 'bar', die) => {
	const ctx = ham.qs('canvas').getContext('2d');
	const chart = new Chart(ctx, {
		type: chartType,
		data: {
			labels: die,
			datasets: [{
				label: 'Totals',
				//TODO replace w dynamic data
				data: [1, 2, 3, 4, 5, 6],
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
					},gridLines: {
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
						fontSize: 14
					}
				}]
			},
		}
	});
}