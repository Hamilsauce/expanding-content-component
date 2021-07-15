import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js'

let charData;
let selectedOption;
const charSelect = ham.qs('#character-select')

console.log(charSelect);
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
		console.log(char);
		const opt = ham.createNewElement('option', `${char.id}-option`, ['character-option']);
		// const opt = document.createElement('div');
		opt.value = char.name;
		opt.textContent = char.name;
		return opt
		
	});
	optionElements.forEach(opt => charSelect.appendChild(opt))
	
	console.log(optionElements);
}


fetch('../data/character-data.json')
	.then(response => response.json())
	.then(data => {
		charData = data;
		createSelectOptions(charData)
		// this.setState({ data });
	});
	
charSelect.addEventListener('change', e => {
	console.log(e);
	console.log(e.target);
	selectedOption = e.target.selectedOptions[0]
	console.log(selectedOption);
})