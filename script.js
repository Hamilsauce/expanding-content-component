import {
	PlayerList
} from './components/PlayerList.js'
import {
	seriesArray
} from './series-data.js'
import {
	Game
} from './components/Game.js'

//UTILS
const $ = (targetEl, selector) => {
	const selectedEl = targetEl.querySelector(selector)
	return selectedEl;
}
const $$ = (targetEl, selector) => {
	const selectedEls = targetEl.querySelectorAll(selector)
	return selectedEls;
}



const findRelatedElement = (el, className) => {
	const relatedEl = [...$(document, `.${className}`)]
		.find(rel => {
			return el.dataset.series == relatedEl.dataset.series
		})
}

const scont = $(document, '.series-container')

const seriesContainers = $$(document, '.series-content')
const seriesButtons = $$(document, '.series-collapsible')
const gameColl = $$(document, '.game-collapsible')
const seriesMenuButton = $(document, ".series-menu-button");
const seriesMenu = $(document, ".series-menu");


seriesMenuButton.addEventListener('click', e => {
	e.target.nextElementSibling.classList.toggle('hide')
})

const expandSeries = (seriesContent, childScrollHeight) => {
	seriesContent.style.zIndex = 30;
	if (childScrollHeight) {
		seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(childScrollHeight)}px`;
	} else {
		seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
	}
}

seriesButtons.forEach(el => {
	el.addEventListener('click', e => {
		el.classList.toggle('active');
		const menubutton = $(el.parentElement, '.series-menu')
		menubutton.classList.add('hide')

		let content = el.nextElementSibling;
		if (content.style.maxHeight) {
			const childContents = [...$$(content, '.content')];

			childContents.forEach(ch => {
				ch.style.maxHeight = null
				ch.style.zIndex = 0
				ch.classList.add('hide')
			});
			content.style.maxHeight = null;
			content.style.zIndex = 0;
		} else {
			expandSeries(content)
		}
	});
});

// gameColl.forEach(gameBtn => {
// 	gameBtn.addEventListener('click', e => {
// 		e.target.classList.add('active')

// 		const seriesContent = e.target.parentElement.parentElement.parentElement;
// 		const gameContent = e.target.nextElementSibling;
// 		gameBtn.classList.toggle("active");
// 		gameContent.classList.toggle('hide');

// 		const menubutton = $(seriesContent, '.series-menu')
// 		menubutton.classList.add('hide')

// 		let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
// 		let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))

// 		if (gameHeight) {
// 			gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
// 			gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
// 		} else {
// 			gameContent.style.maxHeight = gameContent.scrollHeight + "px";
// 			gameContent.style.zIndex = 30;
// 			seriesContent.style.zIndex = 30;
// 			expandSeries(seriesContent, gameContent.scrollHeight)
// 		}
// 	})
// })


$(document, '.add-series-button')
	.addEventListener('click', e => {
		const seriesList = $(document, '.series-list')
		const gameContainer = document.createElement('div');

		gameContainer.innerText = 'new container'
		seriesList.appendChild(gameContainer)
	})

$(document, '.delete-series-button')
	.addEventListener('click', e => {
		const content = [...$$(document, '.series-container')]
			.find(cont => {
				return e.target.dataset.series == cont.dataset.series
			})
		content.remove()
	})


//TODO When a new game is added, recalculate series height!	
$(document, '.add-game-button')
	.addEventListener('click', e => {
		const content = [...$$(document, '.series-content')]
			.find(cont => {
				return e.target.dataset.series == cont.dataset.series
			})

		e.target.parentElement.classList.add('hide')
		const gameList = $(document, '.game-list')
		const gameContainer = document.createElement('div');

		gameContainer.innerText = 'new container'
		gameList.appendChild(gameContainer)
		expandSeries(content)
	})


$(document, '.edit-series-button')
	.addEventListener('click', e => {
		const targ = e.target
		const menuList = targ.parentElement;
		const seriesBtn = [...$$(document, '.series-collapsible')]
			.find(btn => {
				return menuList.dataset.series == btn.dataset.series
			});

		menuList.classList.add('hide');

		const title = $(seriesBtn, '.series-title')
		title.classList.add('editing')
		title.contentEditable = true;
		title.dataset.editing = 'true'
		seriesBtn.classList.add('editing')
		title.focus()
		
		const submitButton = $(seriesBtn, '.submit-series-name')
		submitButton.classList.remove('hide')

		let sel = window.getSelection();
		if (sel.toString() == '') { //no text selection
			window.setTimeout(function() {
				let range = document.createRange(); //range object
				range.selectNodeContents(title); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range); //add Range to a Selection.
			}, 100);
		}
	})

// $(document, '.series-title')
// 	.addEventListener('click', e => {
// 		const targ = e.target;
// 		const parent = e.target.parentElement;

// 		if (targ.dataset.editing == 'true') {
// 			e.stopPropagation()
// 			e.preventDefault()
// 			parent.classList.toggle('active')
// 		} else {
// 			parent.classList.toggle('active')
// 		}
// 	})

$(document, '.submit-series-name')
	.addEventListener('click', e => {
		e.stopPropagation()
		e.preventDefault()

		const saveBtn = e.target;
		const seriesBtn = saveBtn.parentElement.parentElement;
		const title = $(seriesBtn, '.series-title')
		saveBtn.classList.add('hide')
		title.classList.remove('editing')
		seriesBtn.classList.remove('editing')

		title.contentEditable = false;
		title.dataset.editing = 'false'

		let range = document.createRange(); //range object
		range.detach()
		let sel = window.getSelection();

		// sel.removeAllRanges(); //remove all ranges from selection
	})

const createSeries = () => {
	const seriesList = $(document, '.series-list')
	const newSeriesContainer = document.createElement('div');
	const newSeriesCollapsible = document.createElement('button');
	const newSeriesContent = document.createElement('div');
}


const newGame = new Game($(document, '.game-list'), seriesArray[0].games[0])
$(document, '.game-list').appendChild(newGame.render())
$$(document, '.player-container')
	.forEach((pl, i, pls) => {
		// pl.addEventListener('click', e => {
		// 	pl.classList.add('selected')

		// 	if (e.target != pls[i]) {
		// 		p.classList.remove('selected')
		// 	}
		// })
	})