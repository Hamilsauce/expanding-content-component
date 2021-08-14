import {
	PlayerList
} from './components1/PlayerList.js';
import {
	Game
} from './components1/Game.js';
import SeriesService from './services/series-service.js';
import CharacterService from './services/CharacterService.js';
import {
	$,
	$$,
	findRelatedElement
} from './services/utils-service.js';
// import {
// 	GameWC
// } from './components1/GameWC.js'

// console.log('sercice', CharacterService);

var firebaseConfig = {
	apiKey: "AIzaSyAjMD_N45O3uweJ3UvDCd5h1adkTwGebQs",
	authDomain: "mario-party-tracker.firebaseapp.com",
	databaseURL: "https://mario-party-tracker-default-rtdb.firebaseio.com",
	projectId: "mario-party-tracker",
	storageBucket: "mario-party-tracker.appspot.com",
	messagingSenderId: "691666648206",
	appId: "1:691666648206:web:0fd103d1ec7b6066221ddf",
	measurementId: "G-3XQKWC630M"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// const db = firebase.database().ref()
// console.log('fb', db)


// const setHistory = async () => {
// const snapshot = await firebase.database().ref('/gameHistory/').once('value');
// 	this.gameHistory = Object.values(snapshot.val())
// 		.sort((a, b) => {
// 			if (a.id > b.id) return -1;
// 			else if (a.id < b.id) return 1;
// 			else return 0;
// 		});
// 	sessionStorage.setItem('gameHistory', JSON.stringify(this.gameHistory));
// }


// const getHistory = async () => {
// 	const snapshot = await firebase.database().ref('/gameHistory/').once('value');
// 	this.gameHistory = Object.values(snapshot.val())
// 		.sort((a, b) => {
// 			if (a.id > b.id) return -1;
// 			else if (a.id < b.id) return 1;
// 			else return 0;
// 		});
// 	sessionStorage.setItem('gameHistory', JSON.stringify(this.gameHistory));
// }

const startData = JSON.parse(CharacterService.fetchCharacterLocal());
const output = $(document, ".json-output");
output.textContent = CharacterService.fetchCharacterLocal()

const outputData = startData
	.reduce((newObject, char) => {
		let key = char.name.replace(/ /g, "").toLowerCase();
		newObject[key] = char;
		return newObject
	}, {});



console.log('outputdata', JSON.stringify(outputData, null, 2));

const writeSeedData = (dataObject) => {
	firebase.database.ref("/" + 'characters').set(data);
}

// writeSeedData(outputData)

console.log('fb', firebase);


const seriesContainers = $$(document, '.series-content')
const seriesCollapsibles = $$(document, '.series-collapsible')
const gameColl = $$(document, '.game-collapsible')
const seriesMenuButton = $(document, ".series-menu-button");
const seriesMenu = $(document, ".series-menu");
const seriesMenus = $$(document, ".series-menu");
const app = $(document, ".app");


;
(async () => {
	const appJsonUrl = './data/app-data.json';

	const appData = await SeriesService.fetchSeriesJson(appJsonUrl);
	createGames(appData[0])
})();

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
};


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
	});

$(document, '.delete-series-button')
	.addEventListener('click', e => {
		const content = [...$$(document, '.series-container')]
			.find(cont => {
				return e.target.dataset.series == cont.dataset.series
			})
		content.remove()
	});

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
	});

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
	});

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
	});

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
			console.log('game', game);
			// const newGame = new Game($(document, '.game-list'), game)
			const template = document.getElementById('smp-game');
			// const newGame = document.createElement('smp-game')
			const newGame = template.content.firstElementChild.cloneNode(true);
			newGame.parent = gameList
			newGame.props = game;

			newGame.querySelector('.game-collapsible').textContent = `Game ${newGame.props.id}`;

			// console.log('g l', $(document, '.game-list'));
			// $(document, '.game-list').appendChild(newGame)
			newGame.querySelector('.collapsible').addEventListener('click', handleBtnClick, true)

			gameList.appendChild(newGame)
			$$(document, '.player-container')
				.forEach((pl, i, pls) => {})
		})
}


//  CREATE GAMES
const createGames2 = (seriesData) => {
	const gameList = $(document, '.game-list')
	seriesArray[0].games
		.forEach(game => {
			const newGame = new Game($(document, '.game-list'), game)
			// const template = document.getElementById('smp-game');
			// const newGame = document.createElement('smp-game')
			console.log('newGame2', newGame);
			console.log('game2', game);
			newGame.template = document.getElementById('smp-game').content.firstElementChild.cloneNode(true);
			const collapsible = newGame.querySelector('.collapsible');
			// collapsible.addEventListener('click', handleBtnClick, false);


			newGame.parent = gameList;
			newGame.props = game;
			console.log('ng tem0', newGame.template);
			newGame.id = game.id;
			newGame.mapName = game.map;
			newGame.setAttribute('map-name', game.map)
			newGame.dataset.shit = 'true';

			newGame.querySelector('.game-collapsible').textContent = `Game ${newGame.id}`;
			newGame.querySelector('.game-map-name').textContent = `Game ${newGame.mapName}`;
			console.log('ngame', newGame);

			game.playerRanks.forEach(player => {
				newGame.createPlayerElement(newGame.parent, player)
			})
			// console.log('g l', $(document, '.game-list'));
			// $(document, '.game-list').appendChild(newGame)
			// querySelector('.collapsible').addEventListener('click', handleBtnClick, true)
			gameList.appendChild(newGame)
			$$(document, '.player-container')
				.forEach((pl, i, pls) => {})
		})
}

const handleBtnClick = (e) => {
	console.log('clicker');
	const gameBtn = e.target;
	// gameBtn.addEventListener('click', e => {
	const seriesContent = e.target.parentElement.parentElement.parentElement;
	const gameContent = e.target.nextElementSibling;
	gameBtn.classList.toggle('active');
	gameContent.classList.toggle('hide');

	const menubutton = seriesContent.querySelector('.series-menu');
	// menubutton.classList.add('hide')

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