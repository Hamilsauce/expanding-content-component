const charTable = document.querySelector('.smp-char-table')
const tRows = [...charTable.rows];
const tableHeaders = [...tRows.shift().cells]

//* col names
const createRecordProperties = (headerCells) => {
	const propNames = headerCells.map(h => {
		const n = h.innerText.trim().toLowerCase()
		// const n = getColumnName(h).trim().toLowerCase()
		return n
	})
	propNames.unshift('id')
	propNames.splice(2, 0, 'imgsrc')
	console.log(propNames);
	return propNames;
}

createRecordProperties(tableHeaders);
//* end col names

const rowData = [...tRows]
	.map((r, i) => {
		const cellData = [...r.cells]
			.map(c => {
				if (c.children.length >= 2) {
					let charName = c.children[1].innerText
					let imgsrc = c.children[0].src
					return [charName, imgsrc]
				} else {
					return [c.innerText];
				}
			}).flat();
		return [++i].concat(cellData)
	}).reduce((sum, curr) => {
		console.log(curr);
	}, {})

console.log(rowData);