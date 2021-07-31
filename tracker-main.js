import {
	PlayerList
} from './components1/PlayerList.js'
import {
	seriesArray
} from './series-data.js'
import {
	Game
} from './components1/Game.js'
import {
	GameWC
} from './components1/GameWC.js'

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

// END UTILS

const seriesContainers = $$(document, '.series-content')
const seriesCollapsibles = $$(document, '.series-collapsible')
const gameColl = $$(document, '.game-collapsible')
const seriesMenuButton = $(document, ".series-menu-button");
const seriesMenu = $(document, ".series-menu");
const seriesMenus = $$(document, ".series-menu");
const app = $(document, ".app");

customElements.define('smp-game', GameWC);


let appData;
let seriesJsonUrl = './data/series-data.json';
let appJsonUrl = './data/app-data.json';

const fetchJson = async (url) => {
	const res = await fetch(url)
	appData = await res.json();
	createGames(appData[0])
};

fetchJson(appJsonUrl)

// APP CLICK LISTENER
app.addEventListener('click', e => {
	if (e.target.classList.contains('series-menu-button')) return;
	seriesMenus.forEach(m => m.classList.add('hide'));
})

seriesMenuButton.addEventListener('click', e => {
	e.target.nextElementSibling.classList.remove('hide');
})

const expandSeries = (seriesContent, childScrollHeight) => {
	seriesContent.style.zIndex = 30;
	if (childScrollHeight) {
		seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(childScrollHeight)}px`;
	} else {
		seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
	}
}


// Contains menu hide logic
seriesCollapsibles.forEach(el => {
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



//  CREATE GAMES
const createGames = (seriesData) => {
	// seriesArray[0].games
	const gameList = $(document, '.game-list')
	seriesData.games
		.forEach(game => {
			// console.log('game', game);
			// const newGame = new Game($(document, '.game-list'), game)
			const template = document.getElementById('smp-game');
			// const newGame = document.createElement('smp-game')
			const newGame = template.content.firstElementChild.cloneNode(true);
			newGame.parent = gameList
			newGame.props = game
			newGame.querySelector('.game-collapsible').textContent = `Game ${newGame.props.id}`; 
			
			// console.log('g l', $(document, '.game-list'));
			// $(document, '.game-list').appendChild(newGame)
			gameList.appendChild(newGame)
			$$(document, '.player-container')
				.forEach((pl, i, pls) => {})
		})

}