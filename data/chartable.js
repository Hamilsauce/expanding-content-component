const charTable = document.querySelector('.smp-char-table')
const tRows = [...charTable.rows];
const tableHeaders = [...tRows.shift().cells]

//* col names
const createRecordProperties = (headerCells) => {
	const propNames = headerCells
		.map(h => {
			const n = h.innerText.trim().toLowerCase()
			return n
		})
	// propNames.unshift('id')
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
					// if (ind = 3) {
					// 	console.log(c.innerText);
					// 	const dieVals = c.innerText.split(' ')
					// 	.map(el => {
					// 		return el
					// 	})
					// 	return dieVals
					// } else {
					return [c.innerText];

					// }
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

console.log(characterData);
let charJson = JSON.stringify(characterData, null, 2)
console.log(charJson);
// localStorage.setItem(charJson)

const jsonOutput = document.querySelector('.json-output')
jsonOutput.innerHTML = charJson

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

createNewFile()