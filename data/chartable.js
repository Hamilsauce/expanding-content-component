import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js'
const charTable = document.querySelector('.smp-char-table')
const jsonDisplay = document.querySelector('.json-output');

class TableRow {
	constructor() {
		this.rowElement = ham.createNewElement('tr', '',['table-row'])
		console.log('row', this.row);
	}
}

console.log(new TableRow);
console.log('b4 sp', charTable.rows);
const tRows = [...charTable.rows];
console.log('after sp', tRows);
const tableHeaders = [...tRows.shift().cells]

//* col names
const createRecordProperties = (headerCells) => {
	const propNames = headerCells
		.map(h => {
			const n = h.innerText.trim().toLowerCase()
			return n
		})
	propNames.splice(1, 0, 'imgsrc')
	console.log(propNames);
	return propNames;
}
const colNames = createRecordProperties(tableHeaders);
//* end col names

const characterData = [...tRows]
	.map((r, i) => {
		const cellData = [...r.cells]
			.map((c, ind) => {
				if (c.children.length >= 2) {
					const charName = c.children[1].innerText
					const imgsrc = c.children[0].src
					return [charName, imgsrc]
				} else {
					return [c.innerText];
				}
			}).flat()
			.reduce((sum, curr, index) => {
				sum[colNames[index]] = curr
				return sum;
			}, {});
		cellData.id = ++i
		cellData.die = cellData.die.split(' ')
		return cellData
	})



const createNewFile = () => {
	const newFile = new Blob(
		[charJson], { type: 'application/json' }
	);
	const fileUrl = URL.createObjectURL(newFile)

	const fileLink = document.createElement('a')
	fileLink.href = fileUrl
	fileLink.download = 'smp-character-data.json'
	fileLink.innerText = 'Download'
	const linkContainer = document.querySelector('.link-container')
	linkContainer.appendChild(fileLink)
}


const toggleButton = document.querySelector('.toggle-button')

toggleButton
	.addEventListener('click', e => {
		charTable.classList.toggle('hide')
		jsonDisplay.classList.toggle('hide')
	})

characterData.forEach(ch => {
	ch.die
		.forEach((roll, i, rolls) => {
			if (roll.charAt(0) == '-' || roll.charAt(0) == '+') {
				const newRoll = `${roll}c`;
				rolls[i] = newRoll
			}
		})
		console.log(ch);
})
let charJson = JSON.stringify(characterData, null, 2)
const jsonOutput = document.querySelector('.json-output')
jsonOutput.innerHTML = charJson

createNewFile()
