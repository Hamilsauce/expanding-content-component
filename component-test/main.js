import {
	GameWC
} from '../components1/GameWC.js'
import {
	GameListWC
} from './GameListWC.js'

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
let appData;

let appJsonUrl = '../data/app-data.json';

const fetchJson = async (url) => {
	const res = await fetch(url)
	appData = await res.json();

	const list = document.querySelector('smp-game-list');
	console.log('data', appData);
	list.data = appData[0];
	console.log('listdata', list.data);

	createGames(appData[0])
};

fetchJson(appJsonUrl)

const createGame = (gameData) => {
	// seriesArray[0].games
	// const gameList = $(document, '.game-list')

	const template = document.getElementById('smp-game-list');
	const gameTemplate = template.content.firstElementChild.cloneNode(true);
	const collapsible = gameTemplate.querySelector('.collapsible');

	gameTemplate.data = gameData;

	seriesData.games
		.forEach(game => {
			// const newGame = new Game($(document, '.game-list'), game)

			// collapsible.addEventListener('click', handleBtnClick, false);


			newGame.parent = gameList;
			newGame.props = game;
			console.log('ng props', newGame.props);
			newGame.id = game.id;
			newGame.mapName = game.map;
			newGame.setAttribute('map-name', game.map)
			newGame.dataset.shit = 'true';

			newGame.querySelector('.game-collapsible').textContent = `Game ${newGame.id}`;
			newGame.querySelector('.game-map-name').textContent = `Game ${newGame.mapName}`;
			console.log('ngame', newGame);

			game.playerRanks.forEach(player => {
				// newGame.createPlayerElement(newGame.parent, player)
			})
			// console.log('g l', $(document, '.game-list'));
			// $(document, '.game-list').appendChild(newGame)
			gameList.appendChild(newGame)
			$$(document, '.player-container')
				.forEach((pl, i, pls) => {})
		})
}


const createGames = (seriesData) => {
	// seriesArray[0].games
	const gameList = $(document, '.game-list')
	seriesData.games
		.forEach(game => {
			// const newGame = new Game($(document, '.game-list'), game)
			const template = document.getElementById('smp-game');
			// const newGame = document.createElement('smp-game')
			const newGame = template.content.firstElementChild.cloneNode(true);
			const collapsible = newGame.querySelector('.collapsible');
			// collapsible.addEventListener('click', handleBtnClick, false);


			newGame.parent = gameList;
			newGame.props = game;
			console.log('ng props', newGame.props);
			newGame.id = game.id;
			newGame.mapName = game.map;
			newGame.setAttribute('map-name', game.map)
			newGame.dataset.shit = 'true';

			newGame.querySelector('.game-collapsible').textContent = `Game ${newGame.id}`;
			newGame.querySelector('.game-map-name').textContent = `Game ${newGame.mapName}`;
			console.log('ngame', newGame);

			game.playerRanks.forEach(player => {
				// newGame.createPlayerElement(newGame.parent, player)
			})
			// console.log('g l', $(document, '.game-list'));
			// $(document, '.game-list').appendChild(newGame)
			gameList.appendChild(newGame)
			$$(document, '.player-container')
				.forEach((pl, i, pls) => {})
		})
}

const handleBtnClick = (e) => {
	const gameBtn = e.target;
	// gameBtn.addEventListener('click', e => {
	console.log('clicker');
	const seriesContent = e.target.parentElement.parentElement.parentElement;
	const gameContent = e.target.nextElementSibling;
	gameBtn.classList.toggle('active');
	gameContent.classList.toggle('hide');

	const menubutton = seriesContent.querySelector('.series-menu');
	menubutton.classList.add('hide')

	let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
	let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))

	if (gameHeight) {
		gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
		gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
	} else {
		gameContent.style.maxHeight = gameContent.scrollHeight + "px";
		gameContent.style.zIndex = 30;
		seriesContent.style.zIndex = 30;

		if (gameContent.scrollHeight) {
			seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(gameContent.scrollHeight)}px`;
		} else {
			seriesContent.style.maxHeight = `${seriesContent.scrollHeight}px`;
		}
	}
	// })
}