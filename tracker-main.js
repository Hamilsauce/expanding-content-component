import {
	PlayerList
} from './components1/PlayerList.js'
import {
	seriesArray
} from './series-data.js'
import {
	Game
} from './components1/Game.js'

//UTILS
const $ = (targetEl, selector) => {
	const selectedEl = targetEl.querySelector(selector)
	return selectedEl;
}
const $$ = (targetEl, selector) => {
	const selectedEls = targetEl.querySelectorAll(selector)
	return selectedEls;
}

let url = 'http://localhost:3000/'

const fetchJson = () => {
	const myHeaders = new Headers({
		"Content-Type": "application/json",
		Accept: "application/json"
	});

	//FETCH

	fetch("http://localhost:3000", {
			headers: myHeaders,
		})
		.then(response => {
			console.log('res');
			console.log(response);
		})
		.then(data => {
			console.log(data);
		});
};
fetchJson()

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

$(document, '.add-series-button')
	.addEventListener('click', e => {
		const seriesList = $(document, '.series-list')
		const gameContainer = document.createElement('div');
		$(document, '.add-series-content').classList.toggle('hide')

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
	})

const createSeries = () => {
	const seriesList = $(document, '.series-list')
	const newSeriesContainer = document.createElement('div');
	const newSeriesCollapsible = document.createElement('button');
	const newSeriesContent = document.createElement('div');
}


seriesArray[0].games
	.forEach(game => {
		const newGame = new Game($(document, '.game-list'), game)
		$(document, '.game-list').appendChild(newGame.render())
		$$(document, '.player-container')
			.forEach((pl, i, pls) => {
			})
	})