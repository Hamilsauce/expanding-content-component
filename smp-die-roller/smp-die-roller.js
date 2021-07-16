import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import chart from './roll-chart.js';

let charData;
let selectedOption;
let selectedChar;
const charSelect = ham.qs('#character-select');

const handleLocalStorage = (action, key, data) => {
	if (action === 'set') localStorage.setItem('smpCharacterData', JSON.stringify(data))
	else return JSON.parse(localStorage.getItem(key))
}

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

;(() => {
	if (handleLocalStorage('get', 'smpCharacterData')) {
		charData = handleLocalStorage('get', 'smpCharacterData')

		createSelectOptions(charData)
	} else {
		fetch('../data/character-data.json')
			.then(response => response.json())
			.then(data => {
				handleLocalStorage('set', 'smpCharacterData', data)
				charData = handleLocalStorage('get', 'smpCharacterData')

				createSelectOptions(charData)
			});
	}
})()


const generateDieSideElement = (side, index) => {
	const sideEl =
		ham.createNewElement(
			'div',
			`side-${index}`,
			['die-side'], {
			dieSideValue: side,
			id: index
			}
		);
	sideEl.textContent = side;
	return sideEl
}

const updateCharacterDisplay = char => {
	const displayEl = ham.qs('.character-selection-display');
	const nameEl = ham.qs('.character-name');
	const imgEl = ham.qs('.character-image');
	const dieContainter = ham.qs('.character-die-container');
	const dieSideElements = char.die.map((side, i) => generateDieSideElement(side.value, i));

	imgEl.src = char.imgsrc;
	nameEl.textContent = char.name;

	// empty container and create new die sides
	while (dieContainter.firstChild) dieContainter.removeChild(dieContainter.firstChild);
	dieSideElements.forEach(el => dieContainter.appendChild(el))
}

const rollDie = dieSides => {
	const dieContainter = ham.qs('.character-die-container');
	const getRandomNumber = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	let randomIndex =getRandomNumber(0, 5)
	
	let resultSide = dieSides[randomIndex];
	resultSide.timesRolled++;
	resultSide.id = randomIndex;
	
	
	
	handleLocalStorage('set', 'smpCharacterData', charData);
	return [resultSide, randomIndex];
}

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
	console.log('detail', e.detail.char);
	updateCharacterDisplay(e.detail.char)
})

ham.qs('.roll-submit-button').addEventListener('click', e => {
	const dieContainter = ham.qs('.character-die-container');
const children =	[...dieContainter.children]
children.forEach(c => c.classList.remove('rolled'));
	

	const roll = rollDie(selectedChar.die)
	const rolledSideEl = children.find((c, i) =>  +c.dataset.id == roll[1] );
	rolledSideEl.classList.add('rolled')
console.log(rolledSideEl);
	chart('bar', selectedChar.die)
	ham.qs('.roll-result').textContent = roll[0].value
})