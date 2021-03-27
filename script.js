const seriesContainers = document.querySelectorAll(".series-content");
const seriesButtons = document.querySelectorAll(".series-collapsible");
const gameColl = document.querySelectorAll(".game-collapsible");

const seriesMenuButton = document.querySelector(".series-menu-button");
const seriesMenu = document.querySelector(".series-menu");

seriesMenuButton.addEventListener('click', e => {
	e.target.nextElementSibling.classList.toggle('hide')
})
// seriesContainers.forEach(elm => {
// 	elm.addEventListener('click', e => {
// 		console.log('curtar');
// 		console.log(e.currentTarget);
// 		let el = e.currentTarget
// 		e.target.classList.toggle("active");
// 		let content = e.target.nextElementSibling;
// 		if (el.style.maxHeight) {
// 			// el.style.maxHeight = null;
// 			el.style.zIndex = 30;
// 			el.style.maxHeight = content.scrollHeight + "px";
// 		} else {
// 			el.style.zIndex = 30;
// 			el.style.maxHeight = content.scrollHeight + "px";
// 		}
// 	});
// });

const calculateSeriesHeight = (seriesContent) => {
	// seriesContent.style.maxHeight = null;
	// if (seriesContent.style.maxHeight) {
	// 	seriesContent.style.zIndex = 0;
	// } else {
	seriesContent.style.zIndex = 30;
	seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
	// }
}


seriesButtons.forEach(el => {
	el.addEventListener('click', e => {
		e.target.classList.toggle("active");
		const menubutton = el.parentElement.querySelector('.series-menu')
		menubutton.classList.add('hide')
		let content = el.nextElementSibling;

		if (content.style.maxHeight) {
			const childContents = [...content.querySelectorAll('.content')];

			childContents.forEach(ch => {
				ch.style.maxHeight = null
				ch.style.zIndex = 0
				ch.classList.add('hide')
			});

			content.style.maxHeight = null;
			content.style.zIndex = 0;
		} else {
			calculateSeriesHeight(content)
		}
	});
});

gameColl.forEach(gameBtn => {
	gameBtn.addEventListener('click', e => {
		const seriesContent = e.target.parentElement.parentElement.parentElement;
		const gameContent = e.target.nextElementSibling;
		gameBtn.classList.toggle("active");
		gameContent.classList.toggle('hide');

		const menubutton = seriesContent.querySelector('.series-menu')
		menubutton.classList.add('hide')

		let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
		let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))

		if (gameHeight) {
			gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
			calculateSeriesHeight(seriesContent)
			gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
		} else {
			gameContent.style.maxHeight = gameContent.scrollHeight + "px";
			gameContent.style.zIndex = 30;
			seriesContent.style.zIndex = 30;
			seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(gameContent.scrollHeight)}px`;
			// calculateSeriesHeight(seriesContent)
		}
	})
})


document.querySelector('.add-series-button')
	.addEventListener('click', e => {
		const seriesList = document.querySelector('.series-list')
		const gameContainer = document.createElement('div');

		gameContainer.innerText = 'new container'

		seriesList.appendChild(gameContainer)
	})

document.querySelector('.delete-series-button')
	.addEventListener('click', e => {
		const content = [...document.querySelectorAll('.series-container')]
			.find(cont => {
				return e.target.dataset.series == cont.dataset.series
			})
		// const gameContainer = document.createElement('div');
		content.remove()
		// gameContainer.innerText = 'new container'

		// seriesList.appendChild(gameContainer)
	})


//TODO When a new game is added, recalculate series height!	
document.querySelector('.add-game-button')
	.addEventListener('click', e => {
		// const content = e.target.parentElement;

		const content = [...document.querySelectorAll('.series-content')]
			.find(cont => {
				return e.target.dataset.series == cont.dataset.series
			})

		e.target.parentElement.classList.add('hide')
		const gameList = document.querySelector('.game-list')
		const gameContainer = document.createElement('div');


		gameContainer.innerText = 'new container'
		gameList.appendChild(gameContainer)
		calculateSeriesHeight(content)
	})

const getRelatedElement = (el, className) => {
	const relatedEl = [...document.querySelectorAll(`.{className}`)]
		.find(rel => {
			return el.dataset.series == relatedEl.dataset.series
		})
}

document.querySelector('.edit-series-button')
	.addEventListener('click', e => {
		const targ = e.target
		const menuList = targ.parentElement;
		// const menuList = targ.parentElement;
		const seriesBtn = [...document.querySelectorAll('.series-collapsible')]
			.find(btn => {
				return menuList.dataset.series == btn.dataset.series
			})
		menuList.classList.add('hide')
		const title = seriesBtn.firstElementChild
		title.style.textDecoration = 'underline'
		title.contentEditable = true;
		title.style.backgroundColor = 'white';
		title.style.color = 'black';
		title.dataset.editing = 'true'
		title.focus()
		document.querySelector('.submit-series-name').classList.remove('hide')

		let sel = window.getSelection();
		if (sel.toString() == '') { //no text selection
			window.setTimeout(function() {
				let range = document.createRange(); //range object
				range.selectNodeContents(title); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range); //add Range to a Selection.
			}, 1);
		}


	})
	
document.querySelector('.series-title')
		.addEventListener('click', e => {
	if (e.target.dataset.editing == 'true') {
		
		e.stopPropagation()
		e.preventDefault()
	}


	})

document.querySelector('.submit-series-name')
	.addEventListener('click', e => {
		
		e.stopPropagation()
		e.preventDefault()

		const saveBtn = e.target;
		const seriesBtn = saveBtn.parentElement;
		console.log(seriesBtn);
		saveBtn.classList.add('hide')
		const title = seriesBtn.firstElementChild
		title.style.textDecoration = 'none'
		title.contentEditable = false;
		title.style.backgroundColor = '#ffffff00';
		title.style.color = 'white';
		title.dataset.editing = 'false'
	
		let range = document.createRange(); //range object
		range.detach()
		let sel = window.getSelection();

		sel.removeAllRanges(); //remove all ranges from selection
		// saveBtn.classList.add('hide')
		// seriesBtn.unfocus()


		document.querySelector('.submit-series-name')

	})


const createSeries = () => {
	const seriesList = document.querySelector('.series-list')
	const newSeriesContainer = document.createElement('div');
	const newSeriesCollapsible = document.createElement('button');
	const newSeriesContent = document.createElement('div');
}