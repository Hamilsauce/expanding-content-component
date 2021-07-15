import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js'

let charData;
let selectedOption;
const charSelect = ham.qs('#character-select')

const charSelectTemplate = `
	<select name="character-select" class="character-select" id="character-select">
		<option value="wario" class="character-select-option">Wario</option>
		<option value="boo" class="character-select-option">Boo</option>
	</select>`;

const charSelectOptionTemplate = `
		<option value="wario" class="character-select-option">Wario</option>
	`;

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

	const dieSideElements = char.die.map((side, i) =>  generateDieSideElement(side, i));
	imgEl.src = char.imgsrc;
	nameEl.textContent = char.name;
	// empty container and create new die sides
	while (dieContainter.firstChild) dieContainter.removeChild(dieContainter.firstChild);
	dieSideElements.forEach(el => dieContainter.appendChild(el))
}


fetch('../data/character-data.json')
	.then(response => response.json())
	.then(data => {
		charData = data;
		createSelectOptions(charData)
	});

charSelect.addEventListener('change', e => {
	selectedOption = e.target.selectedOptions[0]

	const targetChar = charData.find(_ => _.id === +selectedOption.dataset.id)
	const evt = new CustomEvent('charSelectionChange', {
		bubbles: true,
		detail: {
			char: targetChar
		}
	})
	e.target.dispatchEvent(evt);
});



ham.qs('.app').addEventListener('charSelectionChange', e => {
	console.log(e.detail.char);

	//get char display container ref
	//get char name ref, update
	//get img ref, update img src
	//get dieside container ref,
	//	create new dieside for each in char die

	updateCharDisplay(e.detail.char)

})