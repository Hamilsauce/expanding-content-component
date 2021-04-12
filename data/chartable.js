const charTable = document.querySelector('.smp-char-table')
const tRows = [...charTable.rows];
const tableHeaders = [...tRows.shift().cells]

const getColumnName = (head) => {
	const txt = head.innerText
	return txt
}

const cnArray = tableHeaders.map(h => {
	const n = getColumnName(h).trim().toLowerCase()
	return n
})
console.log(cnArray);


[...tRows].forEach(r => {
	
	console.log(r.cells[0].children);
})